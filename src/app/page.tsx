'use client'
import { useEffect, useState } from "react";
import Container from "@/components/containerHome/container";
import Copy from "@/components/Copyright/copy";
import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import "./style.css"

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Definido como 'true' após a montagem no cliente
  }, []);

  if (!isClient) return null; // Não renderiza nada até o código ser executado no cliente

  return (
    <>
      <Navbar />
      <Copy />
      <Container />
    </>
  );
}
