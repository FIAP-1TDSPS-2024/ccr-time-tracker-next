import { Item } from "@/types/items";
import { CategoryItem } from "./CategoryItem";

interface CategoryListProps {
  title: string;
  items: Item[];
  onFavoriteToggle: (name: string) => void;
  onDelete: (name: string) => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export function CategoryList({
  title,
  items,
  onFavoriteToggle,
  onDelete,
  showAddButton,
  onAddClick,
}: CategoryListProps) {
  return (
    <div className="category">
      <h2 className="text-2xl font-bold px-2 mb-4">{title}</h2>
      <div className="flex flex-col md:flex-row md:flex-wrap">
        {items.map((item) => (
          <CategoryItem
            key={item.abreviacao}
            item={item}
            onFavoriteToggle={onFavoriteToggle}
            onDelete={onDelete}
          />
        ))}
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="w-full md:w-[15.188rem] h-[8.5rem] bg-[#585858] text-white mb-4 md:m-4 rounded text-6xl font-bold shadow-md"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}
