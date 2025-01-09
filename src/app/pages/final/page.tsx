'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import './style.css';

interface CounterData {
    Curtidas: number;
    Visualizações: number;
    Compartilhamentos: number;
    Salvamentos: number;
}

export default function Checkout() {
    const router = useRouter();

    const [videoLinks, setVideoLinks] = useState<string[]>([]);
    const [counter, setCounter] = useState<CounterData>({
        Curtidas: 0,
        Visualizações: 0,
        Compartilhamentos: 0,
        Salvamentos: 0,
    });

    useEffect(() => {
        const storedData = localStorage.getItem("pageData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setVideoLinks(parsedData.videoLinks || []);
            setCounter(parsedData.counter || {
                Curtidas: 0,
                Visualizações: 0,
                Compartilhamentos: 0,
                Salvamentos: 0,
            });
        }
    }, []);

    return (
        <div>
            <div className="infoBox-confirm">
                <div className="confirm">
                    <Image src="/assets/Confirm.svg" alt="Curtidas" width={200} height={200} />
                    <h1>Pedido confirmado!</h1>
                    <p>Agora é só aguardar, pois em até 1 hora o engajamento solicitado será processado.</p>
                </div>

                <div className="textSesion-confirm">
                    <h1>Vídeo:</h1>
                    {videoLinks.length > 0 && (
                        videoLinks.map((link, index) => (
                            <input
                                key={index}
                                type="text"
                                value={link} 
                                readOnly
                                placeholder="https://www.tiktok.com"
                            />
                        ))
                    )}
                </div>

                <div className="button-container">
                    <div
                        className="button filled"
                        id="verOutrosPlanos"
                        onClick={() => router.push("/")}
                    >
                        Confirmar
                    </div>
                    <div
                        className={`button ${videoLinks.every(link => link.trim() === "") ? "empty" : "filled"}`}
                        onClick={() => router.push("/pages/personalizado")}
                    >
                        Novo Pedido
                    </div>
                </div>
            </div>
        </div>
    );
}
