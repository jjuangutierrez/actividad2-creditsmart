import React, { useEffect, useState } from "react";
import "./ApplyCreditPage.css";
import CreditService from "../services/CreditService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const parseRateNumber = (rateStr = "") => {
  const m = rateStr.match(/[\d,.]+/);
  if (!m) return 0;
  return parseFloat(m[0].replace(',', '.'));
};

const calcularCuotaMensual = (principal = 0, tasaAnual = 0, meses = 1) => {
  const r = tasaAnual / 12 / 100;
  if (!principal || !meses) return 0;
  if (r === 0) return principal / meses;
  const cuota = (principal * r) / (1 - Math.pow(1 + r, -meses));
  return cuota;
};

const ApplyCreditPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    tipoCredito: "",
    monto: "",
    plazo: "12",
    destino: "",
    empresa: "",
    cargo: "",
    ingresos: "",
  });

  const [errors, setErrors] = useState({});
  const [cuota, setCuota] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  const credits = CreditService.getAll();

  useEffect(() => {
    const newErrors = {};

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }
    if (formData.telefono && formData.telefono.length < 7) {
      newErrors.telefono = "Teléfono muy corto";
    }
    if (formData.cedula && String(formData.cedula).length < 6) {
      newErrors.cedula = "Cédula inválida";
    }
    if (formData.monto && Number(formData.monto) <= 0) {
      newErrors.monto = "Monto debe ser mayor a 0";
    }
    const selected = credits.find(c => c.title === formData.tipoCredito);
    if (selected && formData.monto) {
      const montoNum = Number(formData.monto);
      if (montoNum < selected.minAmount) {
        newErrors.monto = `Monto mínimo para este crédito: ${selected.minAmount.toLocaleString()}`;
      } else if (montoNum > selected.maxAmount) {
        newErrors.monto = `Monto máximo para este crédito: ${selected.maxAmount.toLocaleString()}`;
      }
    }

    setErrors(newErrors);
  }, [formData, credits]);

  useEffect(() => {
    const selected = credits.find(c => c.title === formData.tipoCredito);
    const tasa = selected ? parseRateNumber(selected.rate) : 0;
    const principal = Number(formData.monto) || 0;
    const meses = parseInt(formData.plazo, 10) || 0;
    const calc = calcularCuotaMensual(principal, tasa, meses);
    setCuota(Number.isFinite(calc) ? calc : 0);
  }, [formData.monto, formData.plazo, formData.tipoCredito, credits]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      cedula: "",
      email: "",
      telefono: "",
      tipoCredito: "",
      monto: "",
      plazo: "12",
      destino: "",
      empresa: "",
      cargo: "",
      ingresos: "",
    });
    setErrors({});
    setCuota(0);
    setShowSummary(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Por favor corrige los errores antes de continuar.");
      return;
    }
    setShowSummary(true);
  };

  const confirmSubmit = () => {
    setSolicitudes(prev => [...prev, { ...formData, cuota: Math.round(cuota) }]);
    alert("Solicitud enviada exitosamente");
    handleReset();
    console.log("Solicitudes (en memoria):", solicitudes.concat({ ...formData, cuota: Math.round(cuota) }));
  };

  const selectedCredit = credits.find(c => c.title === formData.tipoCredito);

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
                  {errors.cedula && <small className="error">{errors.cedula}</small>}
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
                  {errors.email && <small className="error">{errors.email}</small>}
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
                  {errors.telefono && <small className="error">{errors.telefono}</small>}
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

                    {credits.map((credito) => (
                      <option key={credito.id} value={credito.title}>
                        {credito.title}
                      </option>
                    ))}
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
                  {errors.monto && <small className="error">{errors.monto}</small>}
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

                <div className="field-group full">
                  <p>Cuota estimada: <strong>{cuota ? `$ ${Math.round(cuota).toLocaleString()}` : '-'}</strong></p>
                  {selectedCredit && (
                    <p>Tasa aplicada: <strong>{selectedCredit.rate}</strong></p>
                  )}
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
                Ver resumen
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Limpiar Formulario
              </button>
            </div>
          </form>

          {showSummary && (
            <aside className="summary-card">
              <h3>Resumen de la solicitud</h3>
              <p><strong>Nombre:</strong> {formData.nombre}</p>
              <p><strong>Tipo de crédito:</strong> {formData.tipoCredito}</p>
              <p><strong>Monto:</strong> ${Number(formData.monto || 0).toLocaleString()}</p>
              <p><strong>Plazo:</strong> {formData.plazo} meses</p>
              <p><strong>Cuota estimada:</strong> ${Math.round(cuota).toLocaleString()}</p>
              {selectedCredit && <p><strong>Tasa:</strong> {selectedCredit.rate}</p>}
              <p><strong>Correo:</strong> {formData.email}</p>

              <div className="summary-actions">
                <button className="btn btn-primary" onClick={confirmSubmit}>Confirmar y Enviar</button>
                <button className="btn btn-secondary" onClick={() => setShowSummary(false)}>Editar</button>
              </div>
            </aside>
          )}

          {solicitudes.length > 0 && (
            <section className="saved-requests">
              <h3>Solicitudes guardadas (memoria)</h3>
              <ul>
                {solicitudes.map((s, idx) => (
                  <li key={idx}>
                    {s.nombre} - {s.tipoCredito} - ${Number(s.monto || 0).toLocaleString()} - Cuota: ${s.cuota?.toLocaleString()}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </main>
    </div>
  );
};

export default ApplyCreditPage;
