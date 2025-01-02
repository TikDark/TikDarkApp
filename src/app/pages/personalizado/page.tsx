'use client'

import Navbar from '@/components/navbar/navbar'
import { useState } from "react";
import './style.css'
import Image from "next/image";
import Add from '../../../../public/assets/add-button.svg'
import Remove from '../../../../public/assets/remove-button.svg'

export default function Personalizado() {

    // Estados para contadores
    const [counter, setCounter] = useState<Record<string, number>>({
        Curtidas: 0,
        Visualizações: 0,
        Compartilhamentos: 0,
        Salvamentos: 0,
    });

    // Estados para links de vídeos
    const [videoLinks, setVideoLinks] = useState<string[]>([""]);

    // Funções de contador
    const incrementCounter = (key: string) => {
        setCounter((prev) => ({ ...prev, [key]: prev[key] + 10 }));
    };

    const decrementCounter = (key: string) => {
        setCounter((prev) => ({ ...prev, [key]: Math.max(prev[key] - 10, 0) }));
    };

    // Funções para manipulação de links
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

    const isAllInputsEmpty = videoLinks.every(link => link.trim() === "");

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
                                            <div  onClick={() => handleRemoveInput(index)}>
                                            </div>
                                        )}
                                        {index === videoLinks.length - 1 && videoLinks.length < 5 && (
                                            <div  onClick={handleAddInput}>
                                            </div>
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
                                    <button onClick={() => decrementCounter(label)} className='remove-button'>
                                        <Image src={Remove} alt='Remove' />
                                    </button>
                                    <button onClick={() => incrementCounter(label)} className='add-button'>
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
                    <div
                        className={`button ${isAllInputsEmpty ? "empty" : "filled"}`}
                        onClick={handleSubmit}
                    >
                        Ver outros planos
                    </div>

                    <div
                        className={`button ${isAllInputsEmpty ? "empty" : "filled"}`}
                        onClick={handleSubmit}
                    >
                        Revisar
                    </div>
                </div>
            </div>
        </div>
    )
}
