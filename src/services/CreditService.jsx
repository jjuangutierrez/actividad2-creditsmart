const creditProducts = [
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
    description: "Financia hasta el 80% del valor de tu vivienda.",
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
    description: "Invierte en tu educación superior o posgrado.",
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
    description: "Impulsa tu negocio con capital flexible.",
    minAmount: 10000000,
    maxAmount: 500000000
  }
];

const CreditService = {
  getAll: () => creditProducts,

  getById: (id) => creditProducts.find(p => p.id === id),

  search: (term) =>
    creditProducts.filter(p =>
      p.title.toLowerCase().includes(term.toLowerCase())
    ),

  filterByAmountRange: (min, max) =>
    creditProducts.filter(product => {
      if (max === Infinity) return product.maxAmount >= min;
      return product.minAmount <= max && product.maxAmount >= min;
    })
};

export default CreditService;
