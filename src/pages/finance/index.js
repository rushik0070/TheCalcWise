import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';


const calculators = [
  {
    icon: '📈',
    title: 'SIP',
    description: 'Calculate investment returns with SIP return calculator to determine your maturity amount and returns.',
    link : '/finance/stock-average'
  },
  {
    icon: '📅',
    title: 'Yearly',
    description: 'Calculate returns easily on your annual or yearly SIP investment in MF, stocks and ETFs.',
    link : '/finance/stock-average'
  },
  {
    icon: '💰',
    title: 'Lumpsum',
    description: 'Calculate investment returns with lumpsum return calculator to determine your maturity amount over a period of time.',
    link : '/finance/stock-average'
  },
  {
    icon: '⬇️',
    title: 'SWP',
    description: 'Calculate fixed returns every month on your investments.',
    link : '/finance/stock-average'
  },
  {
    icon: '🎯',
    title: 'SIP Goal',
    description: 'Calculate your SIP amount with pre-determined financial goal amount.',
    link : '/finance/stock-average'
  },
  {
    icon: '📊',
    title: 'Step Up SIP',
    description: 'Calculate your returns with annual increment in SIP amount.',
    link : '/finance/stock-average'
  },
  {
    icon: '📉',
    title: 'MF Returns',
    description: 'Calculate potential gains on investments using mutual fund returns calculator.',
    link : '/finance/stock-average'
  },
  {
    icon: '📈',
    title: 'CAGR',
    description: 'Calculate the compounded annual growth rate (CAGR) of an investment over a specified period.',
    link : '/finance/stock-average'
  },
];

const FinancePage = () => {
  return (
    <>
    <h3>Calculators</h3>
    <div className={styles.wrapper}>
      {calculators.map((calc, index) => (
        // <Link href={calc.link} key={index} >

        <div className="calculator-card" key={index}>
          <div className={styles.icon}>{calc.icon}</div>
          <h3 className="title">{calc.title}</h3>
          <p className="description">{calc.description}</p>
        </div>
        // </Link>
      ))}
    </div>
    </>
  );
};

export default FinancePage;
