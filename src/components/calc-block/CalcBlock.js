'use client';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { ToWords } from 'to-words';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const CalcBlock = ({ page }) => {
    console.log("calc block is called ---------", page)
    const toWords = new ToWords();
    const [mode, setMode] = useState('sip');
    const [investment, setInvestment] = useState(1000);
    const [rate, setRate] = useState(12);
    const [time, setTime] = useState(1);

    const r = (1 + rate / 100) ** (1 / 12) - 1
    const n = time * 12;
    let estimatedReturns = 0;
    let totalValue = 0;
    let investedAmount = investment * n;

    useEffect(() => {
        if (page === 'Inflation Calcluatro') {
            setMode('lumpsum');
        }
    }, [page]);

    if (mode === 'lumpsum') {
        totalValue = investment * Math.pow(1 + rate / 100, time);
        investedAmount = investment;
        estimatedReturns = totalValue - investedAmount;
    } else {
        let fv = investment * (((1 + r) ** n - 1) / r) * (1 + r)
        estimatedReturns = fv - investedAmount
    }
    totalValue = estimatedReturns + investedAmount

    const chartData = {
        labels: ['Invested Amount', 'Est. Returns'],
        datasets: [
            {
                data: [investedAmount, estimatedReturns],
                backgroundColor: ['	#498ae3', '	#3e9c35'],
                hoverOffset: 4,
            },
        ],
    };

    const totalValueWords = toWords.convert(Math.round(totalValue));
    const estimatedReturnsWords = toWords.convert(Math.round(estimatedReturns));
    const investedAmountWords = toWords.convert(Math.round(investedAmount));
    return (
        <>
            <div className="calc-container">

                <div className='row'>
                    <div className='col-6'>
                        <h4 className="fw-bold mb-4">
                            {
                                page
                            }
                        </h4>

                    </div>
                    <div className='col-6 text-end'>
                        {/* <div> */}

                        {
                            page !== 'Inflation Calcluatro' && (
                                <div className="btn-group border">
                                    <button
                                        className={`btn btn-${mode === 'sip' ? 'light' : 'success'}`}
                                        onClick={() => setMode('lumpsum')}
                                    >
                                        Lumpsum
                                    </button>
                                    <button
                                        className={`btn btn-${mode === 'sip' ? 'success' : 'light'}`}
                                        onClick={() => setMode('sip')}
                                    >
                                        SIP
                                    </button>
                                </div>

                            )
                        }

                        {/* </div> */}
                    </div>
                </div>
                <div className="card shadow card-container">

                    <div className="card-body shadow p-4">

                        <div className="row">
                            <div className="col-md-6">
                                {/* Investment */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        {
                                            page === 'Inflation Calcluatro'
                                                ? 'Current Cost'
                                                : (mode === 'sip' ? 'Monthly Investment' : 'Total Investment')
                                        }
                                    </label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="100"
                                        max="1000000"
                                        step="500"
                                        value={investment}
                                        onChange={(e) => setInvestment(Number(e.target.value))}
                                    />
                                    <div className="input-group">
                                        <span className="input-group-text currency text-success fw-bold">₹</span>
                                        <input
                                            type="number"
                                            className="form-control w-50 fw-bold text-success"
                                            min="100"
                                            max="1000000"
                                            step="500"
                                            value={investment}
                                            onChange={(e) => setInvestment(Number(e.target.value))}
                                        />
                                    </div>
                                    {/* <div className="fw-bold text-success">₹ {investment.toLocaleString()}</div> */}
                                </div>

                                {/* Return Rate */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        {
                                            page === 'Inflation Calcluatro'
                                                ? 'Inflation rate'
                                                : 'Expected Return Rate (p.a)'
                                        }
                                    </label>

                                    <input
                                        type="range"
                                        className="form-range"
                                        min="1"
                                        max="50"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                    />
                                    <div className="input-group">
                                        <span className="input-group-text text-success fw-bold">%</span>
                                        <input
                                            type="number"
                                            className="form-control w-50 fw-bold text-success"
                                            min="1"
                                            max="50"
                                            value={rate}
                                            onChange={(e) => setRate(Number(e.target.value))}
                                        />
                                    </div>
                                    {/* <div className="fw-bold text-success">{rate}%</div> */}
                                </div>

                                {/* Time Period */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Time Period</label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="1"
                                        max="100"
                                        value={time}
                                        onChange={(e) => setTime(Number(e.target.value))}
                                    />
                                    <div className="input-group">
                                        <span className="input-group-text text-success fw-bold">Yr.</span>
                                        <input
                                            type="number"
                                            className="form-control w-50 fw-bold text-success"
                                            min="1"
                                            max="100"
                                            value={time}
                                            onChange={(e) => setTime(Number(e.target.value))}
                                        />
                                    </div>
                                    {/* <div className="fw-bold text-success">{time} Yr</div> */}
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="col-md-6 d-flex align-items-center justify-content-center">

                                <div style={{ width: '300px' }}>
                                    <Doughnut data={chartData} />
                                </div>

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-5'>
                                <strong>
                                    {
                                        page === 'Inflation Calcluatro'
                                            ? 'Curent Cost'
                                            : 'Invested amount:'
                                    }
                                </strong>
                            </div>
                            <div className='col-5'>
                                <strong className='text-success'>₹ {investedAmount.toLocaleString()} - ({investedAmountWords})</strong>

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-5'>

                                <strong>
                                    {
                                        page === 'Inflation Calcluatro'
                                            ? 'Cost Increase'
                                            : 'Est. returns:'
                                    }
                                </strong>
                            </div>
                            <div className='col-5'>
                                <strong className='text-success'>

                                    ₹ {estimatedReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ({estimatedReturnsWords})
                                </strong>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-5'>

                                <strong>
                                    {
                                        page === 'Inflation Calcluatro'
                                            ? 'Future Cost'
                                            : 'Total value:'
                                    }
                                </strong>
                            </div>
                            <div className='col-5'>
                                <strong className='text-success'>

                                    ₹ {totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ({totalValueWords})
                                </strong>
                            </div>
                        </div>

                        {
                            page === 'Inflation Calcluatro' && (
                                <div className='row mt-1'>
                                    <div className='col-mt-12'>

                                        <strong className='text-danger'>  💸 Due to inflation, your money will lose ₹{estimatedReturns.toLocaleString()} 
                                            ({toWords.convert(totalValue)}) of value in {time} year{time > 1 ? 's' : ''}.</strong>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalcBlock