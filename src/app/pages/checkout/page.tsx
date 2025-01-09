'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
            <div className="infoBox-chk">
                <div className="numbers">
                    <p>{counter.Curtidas} <span>Curtidas</span></p>
                    <p>{counter.Visualizações} <span>Visualizações</span></p>
                    <p>{counter.Compartilhamentos} <span>Compartilhamentos</span></p>
                    <p>{counter.Salvamentos} <span>Salvamentos</span></p>
                </div>
                <div className="textSesion">
                    <h1>O valor total é:</h1>
                    <p>R$12</p>
                </div>
                <div className="button-container">
                    <div
                        className="button filled"
                        id="verOutrosPlanos"
                        onClick={() => router.push("/pages/planos")}
                    >
                        Cancelar
                    </div>
                    <div
                        className={`button ${videoLinks.every(link => link.trim() === "") ? "empty" : "filled"}`}
                        onClick={() => router.push("/pages/final")}
                    >
                        Fazer Pedido
                    </div>
                </div>
            </div>
        </div>
    );
}
