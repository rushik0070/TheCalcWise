import React from 'react'
import NavBar from './Components/NavBar/NavBar'

const App = () => {
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
      description: 'Calculate investment returns with lumpsum return calculator to determine your maturity amount over a period of time.',
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
      description: "Calculate your returns with annual increment in SIP amount.",
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
  
  return (
    <div>
      <NavBar/>
      <div className="calculator-wrapper">
      {calculators.map((calc, index) => (
        <div className="calculator-card" key={index}>
          <div className="icon">{calc.icon}</div>
          <h3>{calc.title}</h3>
          <p>{calc.description}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default App