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

export default function Emi() {
    const toWords = new ToWords();
    const [principal, setPrincipal] = useState(100000); // monthly for SIP
    const [rate, setRate] = useState(6.5); // annual %
    const [time, setTime] = useState(5); // in years

    const monthlyRate = rate / 12 / 100;
    const months = time * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    const chartData = {
        labels: ['Principal Amount', 'Total Interest'],
        datasets: [
            {
                data: [principal, totalInterest],
                backgroundColor: ['	#498ae3', '	#3e9c35'],
                hoverOffset: 4,
            },
        ],
    };

    const TotalAmount = Math.round(principal+totalInterest);
    console.log("TotalAmount ------------ ",TotalAmount)
    const EmIInWords = toWords.convert(Math.round(emi));
    const PrincipalAmountInWords = toWords.convert(Math.round(principal))
    const estimatedReturnsWords = toWords.convert(Math.round(totalInterest));
    const TotalAmountInWords = toWords.convert(Math.round(TotalAmount));

    return (
        <div className="container-fluid my-5">
            <div className='row mt-5'>
                <div className="col-md-2 d-none d-md-block">
                    <div className="p-3 bg-light border text-center sticky-top rounded">
                        <strong>Ad: Left</strong>
                        <p>Static ad content</p>
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className="calc-container">

                        <div className='row'>
                            <div className='col-6'>
                                <h4 className="fw-bold mb-4">EMI Calculator
                                </h4>
                            </div>
                        </div>
                        <div className="card shadow card-container">

                            <div className="card-body shadow p-4">

                                <div className="row">
                                    <div className="col-md-6">
                                        {/* Investment */}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Loan Amount
                                            </label>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="100"
                                                max="1000000"
                                                step="500"
                                                value={principal}
                                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text currency text-success fw-bold">₹</span>
                                                <input
                                                    type="number"
                                                    className="form-control w-50 fw-bold text-success"
                                                    min="100"
                                                    max="1000000"
                                                    step="500"
                                                    value={principal}
                                                    onChange={(e) => setPrincipal(Number(e.target.value))}
                                                />
                                            </div>
                                            {/* <div className="fw-bold text-success">₹ {investment.toLocaleString()}</div> */}
                                        </div>

                                        {/* Return Rate */}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Rate of Interest (p.a)</label>

                                            <input
                                                type="range"
                                                className="form-range"
                                                min="1"
                                                max="15"
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
                                            <label className="form-label fw-bold">Loan Tender</label>
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
                                    <div className='col-2 mt-1'>
                                        <strong>Monthly EMI :</strong>
                                    </div>
                                    <div className='col-10'>
                                        <strong className='text-success'>₹ {emi.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ({EmIInWords})</strong>

                                    </div>
                                </div>
                                 <div className='row'>
                                    <div className='col-2 mt-1'>
                                        <strong>Loan Amount :</strong>
                                    </div>
                                    <div className='col-10'>
                                        <strong className='text-success'>₹ {principal.toLocaleString()} - ({PrincipalAmountInWords})</strong>

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2 mt-1'>

                                        <strong>Total Interest :</strong>
                                    </div>
                                    <div className='col-10'>
                                        <strong className='text-success'>

                                            ₹ {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ({estimatedReturnsWords})
                                        </strong>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-2 mt-1'>

                                        <strong>Total value :</strong>
                                    </div>
                                    <div className='col-10'>
                                        <strong className='text-success'>

                                            ₹ {TotalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} - ({TotalAmountInWords})
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <h4 className="fw-bold mb-4">Example for Calculation of SWP
                    </h4>

                    {/* <div className="calc-container"> */}
                    {/* <h4 className=" fw-bold mb-4">Example for Calculation of Average Stock Price</h4> */}
                    <div className="card shadow card-container">
                        <div className="card-body">
                            <p>
                                Suppose you invest ₹5,000 every month in a mutual fund SIP. Over a period of 6 months, the NAV (Net Asset Value) of the fund changes. Let's calculate your average NAV using the SIP method.
                            </p>
                            <p className="fw-medium mb-2">
                                <strong>Monthly investments and NAVs:</strong><br />
                                - Month 1: ₹5000 at ₹50 NAV → 100 units<br />
                                - Month 2: ₹5000 at ₹40 NAV → 125 units<br />
                                - Month 3: ₹5000 at ₹45 NAV → 111.11 units<br />
                                - Month 4: ₹5000 at ₹48 NAV → 104.17 units<br />
                                - Month 5: ₹5000 at ₹46 NAV → 108.70 units<br />
                                - Month 6: ₹5000 at ₹44 NAV → 113.64 units
                            </p>
                            <p className="fw-medium mb-2">
                                <strong>Total units purchased</strong> = 662.62<br />
                                <strong>Total amount invested</strong> = ₹30,000
                            </p>
                            <p className="fw-medium mb-3">
                                <strong>Average NAV</strong> = ₹30,000 / 662.62<br />
                                ≈ ₹45.27
                            </p>
                            <p>
                                A SIP calculator helps you determine how your regular investments grow over time, and what your average purchase cost per unit is. Use the calculator to plan your monthly contributions effectively!
                            </p>
                        </div>
                    </div>
                    {/* <div className="card shadow card-container">
                    <div className="card-body">
                        <p>
                            Suppose you invest ₹1,00,000 as a one-time lumpsum investment in a mutual fund. The NAV (Net Asset Value) at the time of investment is ₹50.
                        </p>
                        <p className="fw-medium mb-2">
                            <strong>Units purchased</strong> = ₹1,00,000 / ₹50<br />
                            = 2,000 units
                        </p>
                        <p className="fw-medium mb-2">
                            Let’s say after 2 years, the NAV becomes ₹75.
                        </p>
                        <p className="fw-medium mb-3">
                            <strong>Current value</strong> = 2,000 units × ₹75<br />
                            = ₹1,50,000
                        </p>
                        <p>
                            A lumpsum calculator helps you estimate the future value of your one-time investment based on expected returns. It's useful for long-term investors who want to invest a large amount upfront.
                        </p>
                    </div>
                </div> */}


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
