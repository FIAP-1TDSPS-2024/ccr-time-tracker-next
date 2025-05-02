"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginResponse } from "@/types/api";

interface LoginFormProps {
  onShowPopup: (title: string, message: string) => void;
}

export function LoginForm({ onShowPopup }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return email !== "" && password !== "";
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/funcionarios/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha: password,
          }),
        }
      );

      if (!response.ok) {
        onShowPopup("Email ou senha incorretos.", "Corriga e tente novamente.");
        return;
      }

      const responseData: LoginResponse = await response.json();

      if (responseData.slug === "success") {
        // Store user data in localStorage
        localStorage.setItem("logged", "true");
        localStorage.setItem("userData", JSON.stringify(responseData.data));
        document.cookie = "logged=true; path=/";
        router.push("/pesquisa");
        return;
      }

      if (responseData.slug === "bad_request") {
        onShowPopup("Email ou senha incorretos.", "Corriga e tente novamente.");
        return;
      }

      onShowPopup("Erro", "Ocorreu um erro inesperado ao tentar fazer login.");
    } catch (e) {
      console.error(e);
      onShowPopup("Erro", "Ocorreu um erro inesperado ao tentar fazer login.");
      return;
    }
  };

  return (
    <div className="bg-[#8b8b8b] w-[32.625rem] p-8 rounded-3xl shadow-md flex flex-col items-center">
      <Image src="/ccr.svg" alt="CCR" width={200} height={87} />
      <h3 className="mt-9 text-xl font-bold">Entrar no sistema</h3>

      <input
        type="text"
        placeholder="Email"
        className="w-80 h-11 px-4 my-2 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-80 h-11 px-4 my-2 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      <button
        className={`w-64 h-10 rounded-lg mt-2 font-semibold ${
          validateForm()
            ? "bg-[#476087] text-white cursor-pointer"
            : "bg-[#6e7d95] text-white cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!validateForm()}
      >
        Conectar
      </button>

      <button
        className="mt-4 hover:text-white"
        onClick={() =>
          onShowPopup(
            "Esqueci minha senha",
            "Entre em contato com o time de suporte ou com seu gestor para recuperar sua senha."
          )
        }
      >
        Esqueci minha senha
      </button>
    </div>
  );
}
