'use client';
import Navbar from "@/components/navbar/navbar";
import "@/app/pages/planos/style.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Timer from "@/components/timerdesconto/timer";

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
      description: "Ideal para quem está começando no TikTok e deseja ganhar visibilidade inicial.",
    },
    {
      label: "Criador em Ascensão",
      curtidas: 10000,
      visualizacoes: 50000,
      compartilhamento: 500,
      salvamento: 200,
      description: "Perfeito para criadores que buscam alavancar seu engajamento e aumentar sua base de seguidores.",
    },
    {
      label: "Estrela Digital",
      curtidas: 20000,
      visualizacoes: 100000,
      compartilhamento: 2000,
      salvamento: 1000,
      description: "Para aqueles que desejam se tornar estrelas digitais e liderar nas tendências do TikTok.",
    },
  ];

  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
  };

  const handlePlanSubscription = () => {
    const selectedPlan = plans[activeButton];

    // Simulando o cálculo do valor total localmente
    const totalValue = selectedPlan.curtidas * 0.001 + selectedPlan.visualizacoes * 0.0001;

    console.log("Valor total calculado:", totalValue);

    // Armazenando os valores do plano no localStorage
    localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
    localStorage.setItem("totalValue", totalValue.toString());
    console.log("Plano e valor total salvos");

    router.push("./personalizado");
  };

  return (
    <>
      <Timer />
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
              <div className="promo">
                <button>Entrega em até 1h</button>
                <button className="promo-red">50% de desconto</button>
              </div>

              <h1>{plans[activeButton].label}</h1>
              <p>{plans[activeButton].description}</p>
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
