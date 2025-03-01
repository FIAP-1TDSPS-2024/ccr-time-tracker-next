"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";
import { CategoryList } from "@/components/pesquisa/CategoryList";
import { AddItemPopup } from "@/components/pesquisa/AddItemPopup";
import { Item } from "@/types/items";

export default function Pesquisa() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    slug: "",
    url: "",
  });

  useEffect(() => {
    const storedItems = localStorage.getItem("all-items");
    if (!storedItems) {
      const defaultItems = [
        {
          name: "TMP",
          icon: "clock.svg",
          url: "/tmp",
          favorite: true,
        },
      ];
      localStorage.setItem("all-items", JSON.stringify(defaultItems));
      setItems(defaultItems);
    } else {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredItems = items.filter(
    (item) => searchTerm === "" || item.name.toLowerCase().includes(searchTerm)
  );

  const favoriteItems = filteredItems.filter((item) => item.favorite);

  const toggleFavorite = (itemName: string) => {
    const updatedItems = items.map((item) =>
      item.name === itemName ? { ...item, favorite: !item.favorite } : item
    );
    setItems(updatedItems);
    localStorage.setItem("all-items", JSON.stringify(updatedItems));
  };

  const handleDelete = (itemName: string) => {
    const updatedItems = items.filter((item) => item.name !== itemName);
    setItems(updatedItems);
    localStorage.setItem("all-items", JSON.stringify(updatedItems));
  };

  const handleAddItem = () => {
    if (!newItem.slug || !newItem.url) return;

    const newItemData = {
      name: newItem.slug,
      icon: "train.svg",
      url: newItem.url,
      favorite: false,
    };

    const updatedItems = [...items, newItemData];
    setItems(updatedItems);
    localStorage.setItem("all-items", JSON.stringify(updatedItems));
    setShowAddPopup(false);
    setNewItem({ name: "", slug: "", url: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showSearch onSearch={handleSearch} showExitButton />

      <main className="flex-1 px-4 md:mx-8 mt-4">
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
