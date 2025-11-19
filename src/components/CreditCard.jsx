import React from 'react';
import './CreditCard.css';

const CreditCard = ({ 
  image, 
  title, 
  rate, 
  amount, 
  term, 
  description,
  onSolicitar 
}) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-rate"><strong>Tasa:</strong> {rate}</p>
        <p className="card-amount"><strong>Monto:</strong> {amount}</p>
        <p className="card-term"><strong>Plazo máximo:</strong> {term}</p>
        <p className="card-desc">{description}</p>
        <a 
          href="/solicitar" 
          className="btn btn-primary card-btn"
          onClick={onSolicitar}
        >
          Solicitar
        </a>
      </div>
    </div>
  );
};

export default CreditCard;