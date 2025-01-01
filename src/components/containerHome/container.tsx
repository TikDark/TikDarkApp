"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "./container.module.css";

function Container() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const response = await fetch("/api/criar-conta", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("Erro ao criar conta");
        }

        const data = await response.json();
        console.log("Conta criada com sucesso:", data);
        } catch (error) {
        console.error("Erro ao criar conta:", error);
        }
    };

    return (
        <div className={styles.lowcontainer}>
        <div className={styles.rightTEXT}>
            <h2>TikDark</h2>
            <h1>Conta do TikDark</h1>
            <p>Transforme sua presença no TikTok com nossos pacotes de engajamento personalizados.</p>
        </div>

        <div className={styles.CreateTikDark}>
            <p className={styles.text}>Abra sua conta do TikDark</p>
            <form onSubmit={handleSubmit}>
            <div className={styles["input-container"]}>
                
                <input
                className={styles["input-email"]}
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={handleEmailChange}
                aria-label="Digite seu email"
                />

                <button
                className={styles["btn-submit"]}
                type="submit"
                aria-label="Enviar email para criação de conta"
                >
                <Image src="/assets/Vector.svg" alt="Enviar" width={16} height={16} />
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }

export default Container;
