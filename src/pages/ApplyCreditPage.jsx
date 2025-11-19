import React, { useState } from 'react';
import './ApplyCreditPage.css';

const ApplyCreditPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    tipoCredito: '',
    monto: '',
    plazo: '12',
    destino: '',
    empresa: '',
    cargo: '',
    ingresos: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Solicitud enviada exitosamente');
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      cedula: '',
      email: '',
      telefono: '',
      tipoCredito: '',
      monto: '',
      plazo: '12',
      destino: '',
      empresa: '',
      cargo: '',
      ingresos: ''
    });
  };

  return (
    <div>
      <main className="form-page">
        <section className="form-container">
          <h2 className="section-title">Solicitud de Crédito</h2>
          <p className="form-intro">
            Completa el formulario con tus datos para iniciar la solicitud de tu crédito.
          </p>

          <form className="credit-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Datos Personales</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    className="input-field"
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="cedula">Cédula</label>
                  <input
                    type="number"
                    id="cedula"
                    className="input-field"
                    placeholder="Ej: 1000123456"
                    value={formData.cedula}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="Ej: example@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    className="input-field"
                    placeholder="Ej: 3001234567"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Datos del Crédito</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="tipoCredito">Tipo de crédito</label>
                  <select
                    id="tipoCredito"
                    className="input-field"
                    value={formData.tipoCredito}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option>Crédito Libre Inversión</option>
                    <option>Crédito Vehículo</option>
                    <option>Crédito Vivienda</option>
                    <option>Crédito Educativo</option>
                    <option>Crédito Empresarial</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="monto">Monto solicitado</label>
                  <input
                    type="number"
                    id="monto"
                    className="input-field"
                    placeholder="Ej: 20000000"
                    value={formData.monto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="plazo">Plazo (meses)</label>
                  <select
                    id="plazo"
                    className="input-field"
                    value={formData.plazo}
                    onChange={handleChange}
                  >
                    <option>12</option>
                    <option>24</option>
                    <option>36</option>
                    <option>48</option>
                    <option>60</option>
                  </select>
                </div>

                <div className="field-group full">
                  <label htmlFor="destino">Destino del crédito</label>
                  <textarea
                    id="destino"
                    className="input-field"
                    rows="4"
                    placeholder="Describe el destino del crédito..."
                    value={formData.destino}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Datos Laborales</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="empresa">Empresa donde trabaja</label>
                  <input
                    type="text"
                    id="empresa"
                    className="input-field"
                    placeholder="Ej: ABC S.A."
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="cargo">Cargo</label>
                  <input
                    type="text"
                    id="cargo"
                    className="input-field"
                    placeholder="Ej: Analista Financiero"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="ingresos">Ingresos mensuales</label>
                  <input
                    type="number"
                    id="ingresos"
                    className="input-field"
                    placeholder="Ej: 3500000"
                    value={formData.ingresos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Enviar Solicitud
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Limpiar Formulario
              </button>
            </div>
          </form>
        </section>
      </main>

    </div>
  );
};

export default ApplyCreditPage;