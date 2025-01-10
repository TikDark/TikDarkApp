'use client';

import Navbar from '@/components/navbar/navbar';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Hook para redirecionamento
import './style.css'
import Image from "next/image";
import Add from '../../../../public/assets/add-button.svg';
import Remove from '../../../../public/assets/remove-button.svg';

export default function Personalizado() {
    const router = useRouter();

    const [counter, setCounter] = useState<Record<string, number>>({
        Curtidas: 0,
        Visualizações: 0,
        Compartilhamentos: 0,
        Salvamentos: 0,
    });

    const [videoLinks, setVideoLinks] = useState<string[]>([""]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // Função para incrementar o contador
    const incrementCounter = (key: string) => {
        setCounter((prev) => ({ ...prev, [key]: prev[key] + 10 }));
    };

    // Função para decrementar o contador
    const decrementCounter = (key: string) => {
        setCounter((prev) => ({ ...prev, [key]: Math.max(prev[key] - 10, 0) }));
    };

    // Iniciar incremento contínuo
    const startIncrement = (key: string) => {
        const id = setInterval(() => incrementCounter(key), 100);
        setIntervalId(id);
    };

    // Iniciar decremento contínuo
    const startDecrement = (key: string) => {
        const id = setInterval(() => decrementCounter(key), 100);
        setIntervalId(id);
    };

    // Parar incremento ou decremento contínuo
    const stopChanging = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const handleAddInput = () => {
        setVideoLinks([...videoLinks, ""]);
    };

    const handleRemoveInput = (index: number) => {
        if (videoLinks.length > 1) {
            const updatedLinks = videoLinks.filter((_, i) => i !== index);
            setVideoLinks(updatedLinks);
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedLinks = [...videoLinks];
        updatedLinks[index] = value;
        setVideoLinks(updatedLinks);
    };

    const handleSubmit = () => {
        console.log("Links dos vídeos:", videoLinks);
    };

    // Recuperar os valores do plano do localStorage
    useEffect(() => {
        const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan") || "{}");

        if (selectedPlan) {
            setCounter({
                Curtidas: selectedPlan.curtidas,
                Visualizações: selectedPlan.visualizacoes,
                Compartilhamentos: selectedPlan.compartilhamento,
                Salvamentos: selectedPlan.salvamento,
            });
        }
    }, []);

    return (
        <div className='personalizado'>
            <Navbar />

            <div className="MainSection">
                <div className="videoSection">
                    <div className="id-1">
                        <div className="inputs">
                            {videoLinks.map((link, index) => (
                                <div key={index} className="inputContainer">
                                    <div className="input-">
                                        <p>{`Cole o Link do vídeo`}</p>
                                        <input
                                            type="text"
                                            placeholder="https://www.tiktok.com"
                                            value={link}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {index === videoLinks.length - 1 && videoLinks.length > 1 && (
                                            <div onClick={() => handleRemoveInput(index)}></div>
                                        )}
                                        {index === videoLinks.length - 1 && videoLinks.length < 5 && (
                                            <div onClick={handleAddInput}></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="counters">
                        {["Curtidas", "Visualizações", "Compartilhamentos", "Salvamentos"].map((label, index) => (
                            <div key={index} className="counter-item">
                                <p>{label}</p>
                                <div className="buttons-container">
                                    <div className="counter-value">{counter[label] || 0}</div>
                                    <div className="buttons">
                                        <button
                                            onMouseDown={() => startDecrement(label)} // Pressionamento contínuo
                                            onMouseUp={stopChanging} // Para o incremento ou decremento
                                            onMouseLeave={stopChanging} // Para se o mouse sair da área
                                            onClick={() => decrementCounter(label)} // Clique simples
                                            className='remove-button'
                                        >
                                            <Image src={Remove} alt='Remove' />
                                        </button>
                                        <button
                                            onMouseDown={() => startIncrement(label)} // Pressionamento contínuo
                                            onMouseUp={stopChanging} // Para o incremento ou decremento
                                            onMouseLeave={stopChanging} // Para se o mouse sair da área
                                            onClick={() => incrementCounter(label)} // Clique simples
                                            className='add-button'
                                        >
                                            <Image src={Add} alt='Add' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="infoBox">
                    <div className="textSesion">
                        <h1>O valor total é:</h1>
                        <p>R$12</p>
                    </div>
                    <div className="button-container">
                        <div
                            className="button filled" id='verOutrosPlanos' 
                            onClick={() => router.push("/pages/planos")} 
                        >
                            Ver outros planos
                        </div>
                        <div
                            className={`button ${videoLinks.every(link => link.trim() === "") ? "empty" : "filled"}`}
                            onClick={() => {
                                const dataToStore = {
                                    videoLinks,
                                    counter,
                                };
                                localStorage.setItem("pageData", JSON.stringify(dataToStore));
                                router.push("/pages/checkout");
                            }}
                        >
                            Revisar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
