import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const calculators = [
  {
    icon: '📈',
    title: 'SIP Calculator',
    description: 'Calculate investment returns with SIP return calculator to determine your maturity amount and returns.',
  },
  {
    icon: '📅',
    title: 'Yearly SIP Calculator',
    description: 'Calculate returns easily on your annual or yearly SIP investment in MF, stocks and ETFs.',
  },
  {
    icon: '💰',
    title: 'Lumpsum Calculator',
    description: 'Calculate investment returns with lumpsum return calculator to determine your maturity amount over time.',
  },
  {
    icon: '⬇️',
    title: 'SWP Calculator',
    description: 'Calculate fixed returns every month on your investments.',
  },
  {
    icon: '🎯',
    title: 'SIP Goal Calculator',
    description: 'Calculate your SIP amount with pre-determined financial goal amount.',
  },
  {
    icon: '📊',
    title: 'Step Up SIP Calculator',
    description: 'Calculate your returns with annual increment in SIP amount.',
  },
  {
    icon: '📉',
    title: 'MF Returns Calculator',
    description: 'Calculate potential gains on investments using mutual fund returns calculator.',
  },
  {
    icon: '📈',
    title: 'CAGR Calculator',
    description: 'Calculate the compounded annual growth rate (CAGR) of an investment over a specified period.',
  },
];


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };
  return (
    <div className={`home-container ${darkMode ? 'dark' : ''}`}>
      <header className="text-center py-4">
        <h1 className="fw-bold">Global Financial & Health Calculators</h1>
        <p className="lead">Free online tools for finance, health, and daily life used by users worldwide.</p>
      </header>

      <section className="calculator-grid container mt-5">
        <div className="row">
          {calculators.map((calc, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className="me-2">{calc.icon}</span>
                    {calc.title}
                  </h5>
                  <p className="card-text">{calc.description}</p>
                  <a href="#" className="btn btn-outline-primary btn-sm">Use Calculator</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
