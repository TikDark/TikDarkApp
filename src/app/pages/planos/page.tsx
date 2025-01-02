'use client';
import Navbar from "@/components/navbar/navbar";
import "@/app/pages/planos/style.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [activeButton, setActiveButton] = useState<number>(0); 
  const router = useRouter();
  

  const plans = [
    {
      label: "Influencer Iniciante",
      curtidas: 5000,
      visualizacoes: 5000,
      compartilhamento: 200,
      salvamento: 100,
    },
    {
      label: "Criador em Ascensão",
      curtidas: 10000,
      visualizacoes: 50000,
      compartilhamento: 500,
      salvamento: 200,
    },
    {
      label: "Estrela Digital",
      curtidas: 20000,
      visualizacoes: 100000,
      compartilhamento: 2000,
      salvamento: 1000,
    },
  ];

  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
  };

  const handlePlanSubscription = async () => {
    const selectedPlan = plans[activeButton];

    const requestData = {
      likes: selectedPlan.curtidas,
      views: selectedPlan.visualizacoes,
      shares: selectedPlan.compartilhamento,
      saves: selectedPlan.salvamento,
      videos: 1,
    };

    try {
      const response = await axios.post(
        "https://api-tik-dark.vercel.app/api/calculate",
        requestData
      );

      const totalValue = response.data.total;
      console.log("Valor total calculado:", totalValue);

      localStorage.setItem("totalValue", totalValue.toString());
      console.log("Valor total salvo");

      router.push("./personalizado");
    } catch (error) {
      console.error("Erro ao calcular o valor total:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="Session-1">
          <div className="textSession">
            <h1>Escolha o plano ideal</h1>
            <p>Descubra nossos planos criados para atender suas necessidades de engajamento.</p>
            <div className="buttons">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`button ${activeButton === index ? "active" : ""}`}
                  onClick={() => handleButtonClick(index)}
                >
                  {plan.label}
                </div>
              ))}
            </div>
          </div>
          <p>
            Os planos são aplicados por vídeo, garantindo engajamento direcionado para o conteúdo que você escolher.
            Além disso, todos os planos podem ser renovados automaticamente a cada mês, mantendo seu crescimento
            constante no TikTok!
          </p>
        </div>
        {activeButton !== null && (
          <div className="infoBox">
            <div className="textSesion">
              <h1>{plans[activeButton].label}</h1>
              <p>Ideal para quem está começando no TikTok e deseja ganhar visibilidade inicial.</p>
            </div>
            <div className="plans">
              <p>
                {plans[activeButton].curtidas} <span>curtidas</span>
              </p>
              <p>
                {plans[activeButton].visualizacoes} <span>Visualizações</span>
              </p>
              <p>
                {plans[activeButton].compartilhamento} <span>Compartilhamento</span>
              </p>
              <p>
                {plans[activeButton].salvamento} <span>Salvamento</span>
              </p>
            </div>
            <div className="button" onClick={handlePlanSubscription}>
              Assinar plano
            </div>
          </div>
        )}
      </section>
    </>
  );
}
