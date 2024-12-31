'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import '@/app/pages/video/style.css'
import Image from "next/image";
import Add from '../../../../public/assets/add-button.svg'
import Remove from '../../../../public/assets/remove-button.svg'

export default function Videos() {
    const [videoLinks, setVideoLinks] = useState<string[]>([""]); // Inicializa com 1 input vazio
    const router = useRouter();

    const handleAddInput = () => {
        setVideoLinks([...videoLinks, ""]); // Adiciona um novo input
    };

    const handleRemoveInput = (index: number) => {
        if (videoLinks.length > 1) {
            const updatedLinks = videoLinks.filter((_, i) => i !== index); // Remove o input específico
            setVideoLinks(updatedLinks);
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedLinks = [...videoLinks];
        updatedLinks[index] = value; // Atualiza o valor do link no input correspondente
        setVideoLinks(updatedLinks);
    };

    const handleSubmit = () => {
        // Aqui você pode processar os links ou realizar outra ação
        console.log("Links dos vídeos:", videoLinks);
        // Se necessário, redireciona para outra página ou faz algo com os links
        router.push("/outra-pagina"); // Exemplo de redirecionamento
    };

    // Função para verificar se todos os inputs estão vazios
    const isAllInputsEmpty = videoLinks.every(link => link.trim() === "");

    return (
        <>
            <Navbar />
            <div className="videoSection">
                <div className="id-1">
                    <div className="inputs">
                        {videoLinks.map((link, index) => (
                            <div key={index} className="inputContainer">
                                <div className="input-">
                                    <p>{`Vídeo ${index + 1}`}</p>
                                    <input
                                        type="text"
                                        placeholder="https://www.instagram.com/p/id"
                                        value={link}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
                                </div>
                                <div className="buttons">
                                    {/* Exibe os botões de Remover e Adicionar apenas no último input */}
                                    {index === videoLinks.length - 1 && videoLinks.length > 1 && (
                                        <div className="remove-button" onClick={() => handleRemoveInput(index)}>
                                            <Image src={Remove} alt='add' />
                                        </div>
                                    )}

                                    {/* O botão de Adicionar fica sempre abaixo do último input */}
                                    {index === videoLinks.length - 1 && videoLinks.length < 5 && (
                                        <div className="add-button" onClick={handleAddInput}>
                                            <Image src={Add} alt='add' />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="infoBox">
                    <div className="textSesion">
                        <h1>Escolha os vídeos para impulsionar</h1>
                        <p>Insira os links dos vídeos que deseja destacar e veja o engajamento crescer. Certifique-se de que os links estão corretos para garantir resultados precisos.</p>
                    </div>
                    <div
                        className={`button ${isAllInputsEmpty ? "empty" : "filled"}`}
                        onClick={handleSubmit}
                    >
                        Continuar
                    </div>
                </div>
            </div>
        </>
    );
}
