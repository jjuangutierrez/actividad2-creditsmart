import React from "react";
import CreditCard from "../components/CreditCard";
import CreditService from "../services/CreditService";

import "./HomePage.css";

const HomePage = () => {
  const creditProducts = CreditService.getAll();

  return (
    <div>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">CreditSmart</h1>
            <p className="hero-subtitle">
              La solución financiera que necesitas para alcanzar tus metas
            </p>
            <a href="/solicitar" className="btn btn-primary hero-solicitar">
              Solicita tu crédito ahora
            </a>
          </div>
        </section>

        <section className="catalog">
          <div className="catalog-header">
            <h2 className="section-title">Nuestros Productos Financieros</h2>
            <p className="section-subtitle">
              Encuentra el crédito perfecto para ti con las mejores tasas del
              mercado
            </p>
          </div>

          <div className="grid-container">
            {creditProducts.map((product) => (
              <CreditCard
                key={product.id}
                image={product.image}
                title={product.title}
                rate={product.rate}
                amount={product.amount}
                term={product.term}
                description={product.description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
