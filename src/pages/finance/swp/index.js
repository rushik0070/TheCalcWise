// import BlogSlider from '@/components/pages/BlogSlider'
import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const swp = () => {

    const [totalinvestment, SetTotalInvestment] = useState(120000)
    const [withdrawalpermonth, SetWithdrawalPerMonth] = useState(10000)
    const [expectedreturn, SetExpectedReturn] = useState(7)
    const [timeperiod, SetTimePeriod] = useState(1)


    let total_month = timeperiod * 12;
    let monthly_return_rate = Math.pow(1 + expectedreturn / 100, 1 / 12) - 1;
    let balance = totalinvestment;
    let monthsUntilZero = 0;

    for (let i = 1; i <= total_month; i++) {
        const interest = balance * monthly_return_rate;
        balance += interest;
        balance -= withdrawalpermonth;

        if (balance <= 0) {
            monthsUntilZero = i;
            balance = 0;
            break;
        }
    }
    let totalWithdrawal = withdrawalpermonth * (monthsUntilZero || total_month);
    let finalvalue = balance;
    // let message = monthsUntilZero > 0
    //     ? `You can withdraw for ${monthsUntilZero} month(s) before your balance becomes zero.`
    //     : `Your balance will not run out in the given period.`;

    let message = `You can withdraw for ${monthsUntilZero} month(s) before your balance becomes zero.`;


    const chartData = {
        labels: ['Final Value', 'Total Withdrawal', 'Total Investment'],
        datasets: [
            {
                data: [balance, totalWithdrawal, totalinvestment],
                backgroundColor: ['#FFD700', '	#3e9c35', '	#498ae3'],
                hoverOffset: 4,
            },
        ],
    };


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
                        <h4 className="fw-bold mb-4">SWP Calculation</h4>

                        <div className="card shadow card-container">


                            <div className="card-body shadow p-4">

                                <div className="row">
                                    <div className="col-md-7">
                                        {/* Investment */}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Total Investment
                                            </label>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="10000"
                                                max="1000000"
                                                step="500"
                                                value={totalinvestment}
                                                onChange={(e) => SetTotalInvestment(Number(e.target.value))}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text currency text-success fw-bold">₹</span>
                                                <input
                                                    type="number"
                                                    className="form-control w-50 fw-bold text-success"
                                                    min="10000"
                                                    max="1000000"
                                                    step="500"
                                                    value={totalinvestment}
                                                    onChange={(e) => SetTotalInvestment(Number(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        {/* Return Rate */}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Withdrawal per month</label>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="1000"
                                                step="500"
                                                max="5000000"
                                                value={withdrawalpermonth}
                                                onChange={(e) => SetWithdrawalPerMonth(Number(e.target.value))}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text currency text-success fw-bold">₹</span>
                                                <input
                                                    type="number"
                                                    className="form-control w-50 fw-bold text-success"
                                                    min="1000"
                                                    max="500"
                                                    step="5000000"
                                                    value={withdrawalpermonth}
                                                    onChange={(e) => SetWithdrawalPerMonth(Number(e.target.value))}
                                                />
                                            </div>
                                            {/* <div className="fw-bold text-success">₹ {withdrawalpermonth.toLocaleString()}</div> */}
                                        </div>

                                        {/* Time Period */}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Expected return rate (p.a)</label>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="1"
                                                max="50"
                                                value={expectedreturn}
                                                onChange={(e) => SetExpectedReturn(Number(e.target.value))}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text text-success fw-bold">%</span>
                                                <input
                                                    type="number"
                                                    className="form-control w-50 fw-bold text-success"
                                                    min="1"
                                                    max="50"
                                                    value={expectedreturn}
                                                    onChange={(e) => SetExpectedReturn(Number(e.target.value))}
                                                />
                                            </div>
                                            {/* <div className="fw-bold text-success">{expectedreturn} %</div> */}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Time period </label>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="1"
                                                max="100"
                                                value={timeperiod}
                                                onChange={(e) => SetTimePeriod(Number(e.target.value))}
                                            />
                                            <div className="input-group">
                                                <span className="input-group-text text-success fw-bold">%</span>
                                                <input
                                                    type="number"
                                                    className="form-control w-50 fw-bold text-success"
                                                    min="1"
                                                    max="100"
                                                    value={timeperiod}
                                                    onChange={(e) => SetTimePeriod(Number(e.target.value))}
                                                />
                                            </div>
                                            {/* <div className="fw-bold text-success">{timeperiod} Yr</div> */}
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="card card-container">
                                            <div className='card-body'>
                                                <div className='row mt-2 text-left'>
                                                    <div className='col-12'>
                                                        <strong>Final Value: </strong>
                                                        {finalvalue > 0 ? (
                                                            <strong className='text-success'>
                                                                ₹  {finalvalue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                            </strong>
                                                        ) : (
                                                            <strong className='text-danger'>
                                                                {message}
                                                            </strong>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className='row mt-3 text-left'>
                                                    <div className='col-12'>
                                                        <strong>Total Investment : </strong>
                                                        <strong className='text-success'>₹ {totalinvestment.toLocaleString()}</strong>
                                                    </div>
                                                </div>
                                                <div className='row mt-3 text-left'>
                                                    <div className='col-12'>
                                                        <strong>Total Withdrawal : </strong>
                                                        <strong className='text-success'>₹ {totalWithdrawal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                                                    </div>
                                                </div>
                                                <div className='mt-3' style={{ width: '300px', height: '300px', }}>
                                                    <Doughnut data={chartData} />
                                                </div>
                                            </div>
                                        </div>
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
                <div className='text-center mt-2'>
                    <h5>Google Ad</h5>
                </div>
                {/* <BlogSlider/> */}
            </div>
        </div>
    )
}

export default swp