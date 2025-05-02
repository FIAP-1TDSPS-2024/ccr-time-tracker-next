"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";
import { CategoryList } from "@/components/pesquisa/CategoryList";
import { AddItemPopup } from "@/components/pesquisa/AddItemPopup";
import { Item, ApiResponse } from "@/types/items";
import { UserData } from "@/types/user";

export default function Pesquisa() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    slug: "",
    url: "",
  });
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get user ID from localStorage
    const getUserId = async () => {
      try {
        // Check if user is logged in
        const isLogged = localStorage.getItem("logged") === "true";

        if (!isLogged) {
          throw new Error("User not logged in");
        }

        // Get user data from localStorage
        const userDataStr = localStorage.getItem("userData");

        if (!userDataStr) {
          throw new Error("User data not found");
        }

        const userData: UserData = JSON.parse(userDataStr);
        setUserId(userData.id_funcionario);
        return userData.id_funcionario;
      } catch (error) {
        console.error("Error getting user ID:", error);
        setError("Failed to authenticate user. Please log in again.");
        return null;
      }
    };

    const fetchItems = async (id: number) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/itens/funcionario/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }

        const responseData: ApiResponse<Item[]> = await response.json();

        if (responseData.slug !== "success") {
          throw new Error(`API error: ${responseData.message}`);
        }

        // Transform API data to match our Item interface
        const transformedItems = responseData.data.map((item: Item) => ({
          ...item,
          icon: "train.svg", // Default icon
        }));

        setItems(transformedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to load items");

        // Fallback to default items if API fails
        const defaultItems = [
          {
            id_item: 1,
            nome: "Tempo médio de percurso",
            abreviacao: "TMP",
            icon: "train.svg",
            url: "https://example.com/item1",
            favorito: true,
            id_funcionario: id,
          },
        ];
        setItems(defaultItems);
      } finally {
        setIsLoading(false);
      }
    };

    getUserId().then((id) => {
      if (id) fetchItems(id);
    });
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredItems = items.filter(
    (item) => searchTerm === "" || item.nome.toLowerCase().includes(searchTerm)
  );

  const favoriteItems = filteredItems.filter((item) => item.favorito);

  const toggleFavorite = async (itemSlug: string) => {
    const item = items.find((item) => item.abreviacao === itemSlug);

    if (!item || !item.id_item) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/itens/${item.id_item}/favoritar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update favorite status: ${response.status}`);
      }

      // Update local state
      const updatedItems = items.map((i) =>
        i.id_item === item.id_item ? { ...i, favorito: !i.favorito } : i
      );

      setItems(updatedItems);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Fallback to local update if API fails
      const updatedItems = items.map((i) =>
        i.abreviacao === itemSlug ? { ...i, favorite: !i.favorito } : i
      );
      setItems(updatedItems);
    }
  };

  const handleDelete = async (itemSlug: string) => {
    const item = items.find((item) => item.abreviacao === itemSlug);

    if (!item || !item.id_item) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/itens/${item.id_item}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
      }

      // Remove item from local state
      const updatedItems = items.filter((i) => i.id_item !== item.id_item);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
      // Fallback to local delete if API fails
      const updatedItems = items.filter((i) => i.abreviacao !== itemSlug);
      setItems(updatedItems);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.slug || !newItem.url || !userId) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/itens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: newItem.name || newItem.slug,
          abreviacao: newItem.slug,
          url: newItem.url,
          favorito: false,
          id_funcionario: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create item: ${response.status}`);
      }

      const responseData: ApiResponse<boolean> = await response.json();

      if (responseData.slug !== "created") {
        throw new Error(`API error: ${responseData.message}`);
      }

      // Refetch items to get the newly created item with its ID
      if (userId) {
        const fetchResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/itens/funcionario/${userId}`
        );

        if (fetchResponse.ok) {
          const fetchData: ApiResponse<Item[]> = await fetchResponse.json();

          if (fetchData.slug === "success") {
            const transformedItems = fetchData.data.map((item: Item) => ({
              ...item,
              icon: "train.svg", // Default icon
            }));

            setItems(transformedItems);
            setShowAddPopup(false);
            setNewItem({ name: "", slug: "", url: "" });
            return;
          }
        }
      }

      // If refetch fails, add a temporary item
      const newItemForState: Item = {
        id_item: 0,
        nome: newItem.slug,
        icon: "train.svg",
        url: newItem.url,
        abreviacao: newItem.slug,
        favorito: false,
        id_funcionario: userId,
      };

      setItems([...items, newItemForState]);
      setShowAddPopup(false);
      setNewItem({ name: "", slug: "", url: "" });
    } catch (error) {
      console.error("Error adding item:", error);

      // Fallback to local add if API fails
      const newItemData = {
        id_item: 0,
        id_funcionario: userId,
        abreviacao: newItem.slug,
        nome: newItem.slug,
        icon: "train.svg",
        url: newItem.url,
        favorito: false,
      };

      setItems([...items, newItemData]);
      setShowAddPopup(false);
      setNewItem({ name: "", slug: "", url: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showSearch onSearch={handleSearch} showExitButton />

      <main className="flex-1 px-4 md:mx-8 mt-4">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <>
            <CategoryList
              title="Favoritos"
              items={favoriteItems}
              onFavoriteToggle={toggleFavorite}
              onDelete={handleDelete}
            />

            <hr className="my-8" />

            <CategoryList
              title="Todos"
              items={filteredItems}
              onFavoriteToggle={toggleFavorite}
              onDelete={handleDelete}
              showAddButton
              onAddClick={() => setShowAddPopup(true)}
            />
          </>
        )}
      </main>

      {showAddPopup && (
        <AddItemPopup
          newItem={newItem}
          setNewItem={setNewItem}
          onAdd={handleAddItem}
          onClose={() => setShowAddPopup(false)}
        />
      )}

      <Footer />
    </div>
  );
}
