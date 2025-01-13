'use client';

import Navbar from '@/components/navbar/navbar';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import './style.css';
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

    // Recupera os valores do plano salvo no localStorage
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

    const calculateTotal = () => {
        return (
            counter.Curtidas * 0.002 +
            counter.Visualizações * 0.00006 +
            counter.Compartilhamentos * 0.0016 +
            counter.Salvamentos * 0.002
        ).toFixed(2);
    };

    const handleAddInput = () => {
        if (videoLinks.length < 5) {
            setVideoLinks([...videoLinks, ""]);
        }
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

    const incrementCounter = (key: string) => {
        setCounter((prev) => ({ ...prev, [key]: prev[key] + 10 }));
    };

    const decrementCounter = (key: string) => {
        setCounter((prev) => ({ ...prev, [key]: Math.max(prev[key] - 10, 0) }));
    };

    const startIncrement = (key: string) => {
        const id = setInterval(() => incrementCounter(key), 100);
        setIntervalId(id);
    };

    const startDecrement = (key: string) => {
        const id = setInterval(() => decrementCounter(key), 100);
        setIntervalId(id);
    };

    const stopChanging = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const handleReview = () => {
        if (videoLinks.every(link => link.trim() === "")) {
            alert("Preencha pelo menos um link de vídeo.");
            return;
        }

        const dataToStore = {
            videoLinks,
            counter,
            totalValue: calculateTotal(),
        };
        localStorage.setItem("pageData", JSON.stringify(dataToStore));
        router.push("/pages/checkout");
    };

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
                                            required 
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
                                    <input
                                        type="number"
                                        className="counter-value"
                                        value={counter[label] || 0}
                                        onChange={(e) => setCounter({ ...counter, [label]: Number(e.target.value) })}
                                    />
                                    <div className="buttons">
                                        <button
                                            onMouseDown={() => startDecrement(label)}
                                            onMouseUp={stopChanging}
                                            onMouseLeave={stopChanging}
                                            onClick={() => decrementCounter(label)}
                                            className='remove-button'
                                        >
                                            <Image src={Remove} alt='Remove' />
                                        </button>
                                        <button
                                            onMouseDown={() => startIncrement(label)}
                                            onMouseUp={stopChanging}
                                            onMouseLeave={stopChanging}
                                            onClick={() => incrementCounter(label)}
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

                <div className="infoBox-perso">
                    <div className="textSesion-perso">
                        <h1>O valor total é:</h1>
                        <p>R${calculateTotal()}</p>
                    </div>
                    <div className="button-container-perso">
                        <div
                            className="button filled" id='verOutrosPlanos'
                            onClick={() => router.push("/pages/planos")}
                        >
                            Ver outros planos
                        </div>
                        <div
                            className={`button ${videoLinks.every(link => link.trim() === "") ? "empty" : "filled"}`}
                            onClick={handleReview}
                        >
                            Revisar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
