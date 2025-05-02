"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "./styles.css";

interface HeaderProps {
  showSearch?: boolean;
  showBackButton?: boolean;
  showExitButton?: boolean;
  pageName?: string;
  onSearch?: (value: string) => void;
}

export function Header({
  showSearch = false,
  showBackButton = false,
  showExitButton = false,
  pageName,
  onSearch,
}: HeaderProps) {
  const router = useRouter();

  const handleExit = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("userData");
    document.cookie = "logged=false; path=/";
    router.push("/home");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="w-full bg-[#616161] flex flex-col">
      <div className="flex items-center justify-between px-4 pb-4 mt-4">
        <h3 className="text-2xl text-white font-bold">Olá, Wendell</h3>
        <div className="flex gap-2">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="w-24 h-12 rounded bg-[#b3b3b3] text-white font-bold shadow-md"
            >
              Voltar
            </button>
          )}
          {showExitButton && (
            <button
              onClick={handleExit}
              className="w-24 h-12 rounded bg-[#b3b3b3] text-white font-bold shadow-md"
            >
              Sair
            </button>
          )}
        </div>
      </div>
      {showSearch && (
        <div className="bg-[#b3b3b3] rounded-lg mx-4 h-12 flex items-center px-4 shadow-md my-4">
          <Image src="/search.svg" alt="Search" width={24} height={24} />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-[#b3b3b3] w-full h-[90%] pl-5 text-xl text-white"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}
      {pageName && (
        <div
          className={`pageName text-white text-2xl rounded w-[45%] h-12 ml-4 flex items-center`}
        >
          {pageName}
        </div>
      )}
    </header>
  );
}
