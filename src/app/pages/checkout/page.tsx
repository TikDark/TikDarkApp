'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './style.css';
import { loadStripe } from '@stripe/stripe-js';

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
    const [totalValue, setTotalValue] = useState<string>("0.00");

    useEffect(() => {
        // Verificar se estamos no cliente antes de acessar o localStorage
        if (typeof window !== "undefined") {
            // Recuperar dados do localStorage
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
    
            // Recuperar valor total
            const storedTotalValue = localStorage.getItem("totalValue");
            if (storedTotalValue) {
                setTotalValue(storedTotalValue);
            }
        }
    }, []); // Executa apenas uma vez, após o componente ser montado

    // Função para enviar os dados para a API e criar a sessão de checkout
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'https://api-tik-dark.vercel.app/api/checkout',
                {
                    videoLink: videoLinks[0], // Pegando o primeiro vídeo, se houver
                    likes: counter.Curtidas,
                    views: counter.Visualizações,
                    shares: counter.Compartilhamentos,
                    saves: counter.Salvamentos,
                    total: parseFloat(totalValue),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.id) {
                // Carregar Stripe.js
                const stripe = await loadStripe('pk_test_51PO8B8HxYCLCBFu8Pl8mw2IMlmtGENjRA9DREhuwyjZy6ZuESybZKgw6Pi33z0G8IP80bLaDYLUTaaffGAZ7XwGp00QpS7sQHz');
                
                // Redireciona para o Stripe Checkout com o session ID retornado
                const { error } = await stripe!.redirectToCheckout({
                    sessionId: response.data.id,
                });

                if (error) {
                    console.error('Stripe checkout error:', error.message);
                    alert('Erro ao redirecionar para o pagamento');
                }
            }
        } catch (error: any) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Ocorreu um erro');
        }
    };

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
                    <p>R${totalValue}</p>
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
                        onClick={handleSubmit}
                    >
                        Fazer Pedido
                    </div>
                </div>
            </div>
        </div>
    );
}
