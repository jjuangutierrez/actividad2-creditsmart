import React from 'react';
import CreditCard from '../components/CreditCard';
import './HomePage.css';

const HomePage = () => {
  const creditProducts = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/6963857/pexels-photo-6963857.jpeg",
      title: "Crédito Libre Inversión",
      rate: "14.4% anual",
      amount: "$1.000.000 - $50.000.000",
      term: "60 meses",
      description: "Financia tus proyectos personales con total libertad. Tasas competitivas y plazos flexibles."
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      title: "Crédito Vehículo",
      rate: "12.8% anual",
      amount: "$5.000.000 - $100.000.000",
      term: "72 meses",
      description: "Estrena el auto de tus sueños. Financiamos hasta el 90% del valor."
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
      title: "Crédito Vivienda",
      rate: "10.2% anual",
      amount: "$30.000.000 - $400.000.000",
      term: "240 meses",
      description: "Financia hasta el 80% del valor de tu vivienda y haz realidad tu hogar."
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg",
      title: "Crédito Educativo",
      rate: "9.5% anual",
      amount: "$500.000 - $20.000.000",
      term: "48 meses",
      description: "Invierte en tu educación superior o posgrado con tasas preferenciales."
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
      title: "Crédito Empresarial",
      rate: "15.0% anual",
      amount: "$10.000.000 - $500.000.000",
      term: "120 meses",
      description: "Impulsa tu negocio con capital flexible y condiciones diseñadas para emprendedores."
    }
  ];

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
              Encuentra el crédito perfecto para ti con las mejores tasas del mercado
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