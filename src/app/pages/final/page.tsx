'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
        // Verificar se estamos no cliente antes de acessar o localStorage
        if (typeof window !== "undefined") {
            // Recupera os dados da página de personalização (se houver)
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
        }
    }, []); // Executa apenas uma vez, após o componente ser montado

    return (
        <div>
            <div className="infoBox-confirm">
                <div className="confirm">
                    <Image src="/assets/Confirm.svg" alt="Confirm" width={200} height={200} />
                    <h1>Pedido confirmado!</h1>
                    <p>Agora é só aguardar, pois em até 1 hora o engajamento solicitado será processado.</p>
                    <p style={{ fontSize: '14px', width: '100%', textAlign: 'center', }}>Entre em contato: <a style={{ all: 'unset' }} href="mailto:contato@tikdark.online">contato@tikdark.online</a></p>
                </div>

                <div className="textSesion-confirm">
                    <h1>Vídeo:</h1>
                    {videoLinks.length > 0 ? (
                        videoLinks.map((link, index) => (
                            <input
                                key={index}
                                type="text"
                                value={link}
                                readOnly
                                placeholder="https://www.tiktok.com"
                            />
                        ))
                    ) : (
                        <p>Nenhum link de vídeo foi encontrado.</p>
                    )}
                </div>

                <div className="button-container">
                    <div
                        className="button filled"
                        id="verOutrosPlanos"
                        onClick={() => router.push("/pages/planos")}
                    >
                        Confirmar
                    </div>
                    <div
                        className={`button ${videoLinks.every(link => link.trim() === "") ? "empty" : "filled"}`}
                        onClick={() => router.push("/pages/planos")}
                    >
                        Novo Pedido
                    </div>
                </div>
            </div>
        </div>
    );
}
