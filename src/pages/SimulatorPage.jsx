import React, { useEffect, useState } from 'react';
import CreditCard from '../components/CreditCard';
import './SimulatorPage.css';
import CreditService from "../services/CreditService";

const parseRateNumber = (rateStr = "") => {
  const m = rateStr.match(/[\d,.]+/);
  if (!m) return 0;
  return parseFloat(m[0].replace(',', '.'));
};

const parseAmountRange = (value) => {
  if (!value) return [0, Infinity];
  if (value.endsWith('+')) {
    const min = parseInt(value.replace('+',''), 10);
    return [min, Infinity];
  }
  const [a, b] = value.split('-').map(v => parseInt(v, 10));
  return [a, b];
};

const filterByAmountRange = (products, min, max) =>
  products.filter(product => {
    if (max === Infinity) return product.maxAmount >= min;
    return product.minAmount <= max && product.maxAmount >= min;
  });

const SimulatorPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [amountRange, setAmountRange] = useState('');
  const [rateOrder, setRateOrder] = useState(''); // '', 'asc', 'desc'
  const [displayProducts, setDisplayProducts] = useState([]);
  const allProducts = CreditService.getAll();

  useEffect(() => {
    let results = allProducts;

    if (searchTerm.trim()) {
      results = results.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (amountRange) {
      const [min, max] = parseAmountRange(amountRange);
      results = filterByAmountRange(results, min, max);
    }

    if (rateOrder) {
      results = results.slice().sort((a, b) => {
        const ra = parseRateNumber(a.rate);
        const rb = parseRateNumber(b.rate);
        return rateOrder === 'asc' ? ra - rb : rb - ra;
      });
    }

    setDisplayProducts(results);
  }, [searchTerm, amountRange, rateOrder, allProducts]);

  return (
    <div>
      <main className="simulator">
        <div className="simulator-header">
          <h2>Simulador de Crédito</h2>
          <p>Encuentra el crédito ideal para ti usando nuestros filtros de búsqueda</p>
        </div>

        <div className="search-container">
          <div className="field-group">
            <label htmlFor="search-input">Buscar por nombre del producto (tiempo real)</label>
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

          <div className="field-group">
            <label htmlFor="rate-order">Ordenar por tasa</label>
            <select
              id="rate-order"
              className="input-field"
              value={rateOrder}
              onChange={(e) => setRateOrder(e.target.value)}
            >
              <option value="">Sin orden</option>
              <option value="asc">Tasa: menor a mayor</option>
              <option value="desc">Tasa: mayor a menor</option>
            </select>
          </div>
        </div>

        <section className="results grid-container">
          {displayProducts.length === 0 ? (
            <p className="no-results">No hay créditos disponibles</p>
          ) : (
            displayProducts.map((product) => (
              <CreditCard
                key={product.id}
                image={product.image}
                title={product.title}
                rate={product.rate}
                amount={product.amount}
                term={product.term}
                description={product.description}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default SimulatorPage;
