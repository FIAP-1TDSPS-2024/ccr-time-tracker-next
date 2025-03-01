import Image from "next/image";
import Link from "next/link";
import { Item } from "@/types/items";

interface CategoryItemProps {
  item: Item;
  onFavoriteToggle: (name: string) => void;
  onDelete: (name: string) => void;
}

export function CategoryItem({
  item,
  onFavoriteToggle,
  onDelete,
}: CategoryItemProps) {
  return (
    <Link href={item.url} className="block">
      <div className="w-full md:w-[15.188rem] h-[8.5rem] bg-[#e6e6e6] mb-4 md:m-4 rounded shadow-md relative">
        <Image
          src={item.icon}
          alt={item.name}
          width={48}
          height={48}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavoriteToggle(item.name);
          }}
          className="absolute top-2 left-2"
        >
          <Image
            src={item.favorite ? "/star.svg" : "/star-disabled.svg"}
            alt="Favorite"
            width={24}
            height={24}
          />
        </button>
        {item.name !== "TMP" && item.name !== "TEPP" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(item.name);
            }}
            className="absolute top-2 right-2"
          >
            <Image src="/trash.svg" alt="Delete" width={24} height={24} />
          </button>
        )}
        <div className="absolute bottom-0 bg-[#585858] text-white font-bold w-full h-[1.938rem] px-2">
          {item.name}
        </div>
      </div>
    </Link>
  );
}
