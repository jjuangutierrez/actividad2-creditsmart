# CreditSmart — Actividad S30 - EA2

Este repositorio contiene la implementación de la actividad "S30 - EA2: Desarrollo de Aplicación Web Dinámica con React – CreditSmart". La aplicación fue evolucionada para usar React con manejo de estado, componentes reutilizables y funcionalidades interactivas en memoria.

# Descripción del proyecto

CreditSmart es una pequeña aplicación web que muestra productos crediticios y permite simular cuotas y solicitar créditos. Los datos se manejan en memoria y los componentes están pensados para ser reutilizables.

# Cambios y objetivos de la actividad

- Inicio - Lista Dinámica de Créditos: Los productos crediticios provienen de un array de objetos. Se creó el componente CreditCard.jsx reutilizable, y se usa .map() para renderizar los créditos pasando datos vía props.
- Simulador - Búsqueda y Filtros: Búsqueda por nombre en tiempo real; filtro por rango de monto (select/slider); filtro por tasa de interés (ordenación de menor a mayor). Si no hay resultados, se muestra "No hay créditos disponibles".
- Solicitar Crédito - Formulario: Formulario funcional usando useState para capturar datos, validaciones en tiempo real, cálculo de cuota mensual estimada al cambiar monto o plazo, resumen antes de enviar, almacenamiento de la solicitud en un array (solo en memoria), mensaje de éxito y limpieza automática del formulario.

# Tecnologías

- React con Vite
- JavaScript
- HTML / CSS

# Resumen de la estructura del proyecto 

- index.html — HTML base
- src/main.jsx — Entrada de la app
- src/App.jsx — Componente raíz
- src/components/CreditCard.jsx — Componente reutilizable para mostrar un crédito
- src/pages/HomePage.jsx — Página de inicio con la lista dinámica
- src/pages/SimulatorPage.jsx — Página del simulador con búsqueda y filtros
- src/pages/ApplyCreditPage.jsx — Página con el formulario de solicitud
- src/services/CreditService.jsx — Servicio (o mock) con datos y utilidades
- public/ — Archivos estáticos

Nota: la lista completa de archivos y carpetas está en el repositorio.

# Requisitos previos

- Node.js
- npm o pnpm/yarn

# Instalación y ejecución en windows PowerShell

1. Clonar el repositorio:

git clone https://github.com/jjuangutierrez/actividad2-creditsmart.git
cd "actividad2-creditsmart"

2. Instalar dependencias:

npm install

3. Ejecutar en modo desarrollo (Vite):

npm run dev

4. Abrir la app en el navegador. Vite normalmente servirá en http://localhost:5173 PowerShell mostrará la URL.

5. Generar build de producción:

npm run build

6. Previsualizar el build (opcional):

npm run preview

Si usas yarn o pnpm, sustituye los comandos npm por yarn/pnpm correspondientes.

# Cómo usar la aplicación

- **Inicio:** Revisa la lista de créditos. Los items se cargan desde un array y cada tarjeta se renderiza con CreditCard.
- **Simulador:** Usa el campo de búsqueda para filtrar por nombre en tiempo real. Ajusta el rango de monto y ordena por tasa para ver resultados actualizados. Si no hay coincidencias, verás "No hay créditos disponibles".
- **Solicitar Crédito:** Completa el formulario; las validaciones son en tiempo real. Al ajustar monto o plazo se recalcula la cuota estimada. Antes de enviar verás un resumen; al enviar la solicitud se añade al array en memoria y verás un mensaje de éxito. El formulario se limpia automáticamente.

# Notas de desarrollo

- Los datos y solicitudes se guardan solamente en memoria (no hay backend ni persistencia, se implementara en la 3 tercera actividad). Esto facilita pruebas rápidas y se adapta a la actividad académica.


**Contacto / Autor**

Proyecto desarrollado como parte de la actividad por: Juan Miguel Guiterrez (repositorio actividad2-creditsmart) y mi compa;eras de equipo Liliana Rivas RIvas y Mariluz David Martinez.
