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

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SetGoal() {
    const toWords = new ToWords();
    const [mode, setMode] = useState('sip'); // 'lumpsum' or 'sip'
    const [goal, SetGoal] = useState('sip'); // 'lumpsum' or 'sip'
    const [inflationrate , Setinflationrate] = useState(7)

    const [investment, setInvestment] = useState(1000); // monthly for SIP
    const [rate, setRate] = useState(12); // annual %
    const [time, setTime] = useState(1); // in years

    const r = (1 + rate / 100) ** (1 / 12) - 1
    const n = time * 12;
    let estimatedReturns = 0;
    let totalValue = 0;
    let investedAmount = investment * n;

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
        <div className="container-fluid my-5">
            <div className='row mt-5'>
                <div className="col-md-3 d-none d-md-block">

                    <h4 className="fw-bold mb-4">Example for Calculation of SWP
                    </h4>

                    {/* <div className="calc-container"> */}
                    {/* <h4 className=" fw-bold mb-4">Example for Calculation of Average Stock Price</h4> */}
                    <div className="card shadow card-container">
                        <div className="card-body">
                            <div className="col-md-12">
                                {/* Investment */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        {/* {mode === 'sip' ? 'Monthly Investment' : 'Total Investment'} */}
                                        🎯 Goal Amount
                                    </label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="100000"
                                        max="10000000"
                                        step="500"
                                        value={goal}
                                        onChange={(e) => SetGoal(Number(e.target.value))}
                                    />
                                    <div className="input-group">
                                        <span className="input-group-text currency text-success fw-bold">₹</span>
                                        <input
                                            type="number"
                                            className="form-control w-50 fw-bold text-success"
                                            min="100"
                                            max="1000000"
                                            step="500"
                                            value={goal}
                                            onChange={(e) => SetGoal(Number(e.target.value))}
                                        />
                                    </div>
                                    {/* <div className="fw-bold text-success">₹ {investment.toLocaleString()}</div> */}
                                </div>

                                {/* Return Rate */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">📈 Expected Annual Return</label>

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
                                    <label className="form-label fw-bold">📅 Time Horizon</label>
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

                                <div className="mb-3">
                                    <label className="form-label fw-bold">📉 Inflation Rate</label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="1"
                                        max="100"
                                        value={inflationrate}
                                        onChange={(e) => Setinflationrate(Number(e.target.value))}
                                    />
                                    <div className="input-group">
                                        <span className="input-group-text text-success fw-bold">% </span>
                                        <input
                                            type="number"
                                            className="form-control w-50 fw-bold text-success"
                                            min="1"
                                            max="100"
                                        // value={inflationrate}
                                        // onChange={(e) => Setinflationrate(Number(e.target.value))}
                                        />
                                    </div>
                                    {/* <div className="fw-bold text-success">{time} Yr</div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-md-7'>
                    <div className="calc-container">

                        <div className='row'>
                            <div className='col-6'>
                                <h4 className="fw-bold mb-4">SIP Calculation</h4>

                            </div>
                            <div className='col-6 text-end'>
                                {/* <div> */}

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
                                                {mode === 'sip' ? 'Monthly Investment' : 'Total Investment'}
                                            </label>
                                            <input
                                                type="range"
                                                readOnly={true}
                                                className="form-range"
                                                min="100"
                                                max="1000000"
                                                step="500"
                                                value={investedAmount}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text currency text-success fw-bold">₹</span>
                                                <label className="form-control w-50 fw-bold text-success">{investedAmount}</label>
                                            </div>

                                        </div>

                                        {/* Return Rate */}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Expected Return Rate (p.a)</label>

                                            <input
                                                type="range"
                                                readOnly={true}
                                                className="form-range"
                                                min="1"
                                                max="50"
                                                value={rate}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text text-success fw-bold">%</span>
                                                <label className="form-control w-50 fw-bold text-success">{rate}</label>

                                            </div>
                                            {/* <div className="fw-bold text-success">{rate}%</div> */}
                                        </div>

                                        {/* Time Period */}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Time Period</label>
                                            <input
                                                type="range"
                                                readOnly={true}
                                                className="form-range"
                                                min="1"
                                                max="100"
                                                value={time}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text text-success fw-bold">Yr.</span>
                                                <label className="form-control w-50 fw-bold text-success">{time}</label>

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
                                    <div className='col-3'>
                                        <strong>Invested amount:</strong>
                                    </div>
                                    <div className='col-9'>
                                        <strong className='text-success'>₹ {investedAmount.toLocaleString()} - ({investedAmountWords})</strong>

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>

                                        <strong>Est. returns:</strong>
                                    </div>
                                    <div className='col-9'>
                                        <strong className='text-success'>

                                            ₹ {estimatedReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ({estimatedReturnsWords})
                                        </strong>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>

                                        <strong>Total value:</strong>
                                    </div>
                                    <div className='col-9'>
                                        <strong className='text-success'>

                                            ₹ {goal.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ({totalValueWords})
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className="p-3 bg-light border text-center sticky-top rounded">
                        <strong>Ad: Left</strong>
                        <p>Static ad content</p>
                    </div>


                </div>
                <div className="row mt-5">
                    <div className="col-md-2 d-none d-md-block">
                        <div className="p-3 bg-light border text-center sticky-top rounded">
                            <strong>Ad: Left</strong>
                            <p>Static ad content</p>
                        </div>
                    </div>
                    <div className="col-md-7">

                        {/* <div className="col-md-9"> */}

                        {/* <div className="container my-5"> */}
                        <div className="calc-container">

                            <h4 className="mt-2 fw-bold mb-2">FAQS</h4>

                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            What is a Stock Average Calculator?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            What is the Average Price of a Stock?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How Do I Use the Stock Average Calculator?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="col-md-3">
                        <h4 className="mt-2 fw-bold mb-3">Recommended Tools</h4>

                        <div className="card">
                            <div className="card-body">
                                <h6 className="fw-semibold mb-1">📈 SIP Calculator</h6>
                                <p className="mb-2 small">Calculate investment returns with SIP returns calculator.</p>
                            </div>
                            <div className="card-body border-top">
                                <h6 className="fw-semibold mb-1">💰 Lumpsum Calculator</h6>
                                <p className="mb-2 small">Determine your returns from one-time investments over time.</p>
                            </div>
                            <div className="card-body border-top">
                                <h6 className="fw-semibold mb-1">📉 SWP Calculator</h6>
                                <p className="mb-0 small">Calculate fixed monthly withdrawals from your investments.</p>
                            </div>
                            <div className="card-body border-top">
                                <h6 className="fw-semibold mb-1">📉 SWP Calculator</h6>
                                <p className="mb-0 small">Calculate fixed monthly withdrawals from your investments.</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div >
    );
}
