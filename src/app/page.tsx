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
    setIsClient(true); 
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Navbar />
      <Copy />
      <Container />
    </>
  );
}
