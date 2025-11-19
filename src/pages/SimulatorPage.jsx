import React, { useState } from 'react';
import CreditCard from '../components/CreditCard';
import './SimulatorPage.css';

const SimulatorPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [amountRange, setAmountRange] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const allProducts = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/6963857/pexels-photo-6963857.jpeg",
      title: "Crédito Libre Inversión",
      rate: "14.4% anual",
      amount: "$1.000.000 - $50.000.000",
      term: "60 meses",
      description: "Financia tus proyectos personales con total libertad. Tasas competitivas y plazos flexibles.",
      minAmount: 1000000,
      maxAmount: 50000000
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      title: "Crédito Vehículo",
      rate: "12.8% anual",
      amount: "$5.000.000 - $100.000.000",
      term: "72 meses",
      description: "Estrena el auto de tus sueños con tasas especiales.",
      minAmount: 5000000,
      maxAmount: 100000000
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
      title: "Crédito Vivienda",
      rate: "10.2% anual",
      amount: "$30.000.000 - $400.000.000",
      term: "240 meses",
      description: "Financia hasta el 80% del valor de tu vivienda y haz realidad tu hogar.",
      minAmount: 30000000,
      maxAmount: 400000000
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg",
      title: "Crédito Educativo",
      rate: "9.5% anual",
      amount: "$500.000 - $20.000.000",
      term: "48 meses",
      description: "Invierte en tu educación superior o posgrado con tasas preferenciales.",
      minAmount: 500000,
      maxAmount: 20000000
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
      title: "Crédito Empresarial",
      rate: "15.0% anual",
      amount: "$10.000.000 - $500.000.000",
      term: "120 meses",
      description: "Impulsa tu negocio con capital flexible y condiciones diseñadas para emprendedores.",
      minAmount: 10000000,
      maxAmount: 500000000
    }
  ];

  const handleSearch = () => {
    let results = allProducts;

    if (searchTerm) {
      results = results.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (amountRange) {
      const [min, max] = amountRange.split('-').map(v => 
        v.endsWith('+') ? [parseInt(v), Infinity] : parseInt(v)
      );
      
      results = results.filter(product => {
        if (max === Infinity) {
          return product.maxAmount >= min;
        }
        return (product.minAmount <= max && product.maxAmount >= min);
      });
    }

    setFilteredProducts(results);
  };

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts;

  return (
    <div>
      <main className="simulator">
        <div className="simulator-header">
          <h2>Simulador de Crédito</h2>
          <p>Encuentra el crédito ideal para ti usando nuestros filtros de búsqueda</p>
        </div>

        <div className="search-container">
          <div className="field-group">
            <label htmlFor="search-input">Buscar por nombre del producto</label>
            <input
              type="text"
              id="search-input"
              className="input-field"
              placeholder="Ej: Crédito Vehículo, Vivienda, Educativo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="amount-range">Rango de monto</label>
            <select 
              id="amount-range" 
              className="input-field"
              value={amountRange}
              onChange={(e) => setAmountRange(e.target.value)}
            >
              <option value="">Todos los montos</option>
              <option value="0-5000000">Hasta $5.000.000</option>
              <option value="5000000-20000000">$5.000.000 - $20.000.000</option>
              <option value="20000000-50000000">$20.000.000 - $50.000.000</option>
              <option value="50000000-100000000">$50.000.000 - $100.000.000</option>
              <option value="100000000+">Más de $100.000.000</option>
            </select>
          </div>

          <button className="btn btn-primary search-btn" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        <section className="results grid-container">
          {displayProducts.map((product) => (
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
        </section>
      </main>

    </div>
  );
};

export default SimulatorPage;