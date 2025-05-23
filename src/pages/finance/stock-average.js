import React, { useState } from 'react'
// import  './stock-average.module.css'


const StockAverage = () => {
  const [purchases, setPurchases] = useState([
    { price: 0, quantity: 0 },
    { price: 0, quantity: 0 },
  ]);

  const [averagePrice, setAveragePrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      return newMode;
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedPurchases = [...purchases];
    updatedPurchases[index][field] = parseFloat(value) || 0;
    setPurchases(updatedPurchases);
  };

  const addPurchase = (e) => {
    e.preventDefault();
    setPurchases([...purchases, { price: 0, quantity: 0 }]);
  };

  const removePurchase = (indexToRemove) => {
    const updatedPurchases = purchases.filter((_, index) => index !== indexToRemove);
    setPurchases(updatedPurchases);
  };


  const calculateAverage = () => {
    const totalQty = purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
    const totalAmt = purchases.reduce((sum, purchase) => sum + purchase.price * purchase.quantity, 0);

    const avgPrice = totalQty > 0 ? totalAmt / totalQty : 0;

    setTotalQuantity(totalQty);
    setTotalAmount(totalAmt);
    setAveragePrice(avgPrice);
  };

  const resetFields = () => {
    setPurchases([
      { price: 0, quantity: 0 },
      { price: 0, quantity: 0 },
    ]);
    setAveragePrice(0);
    setTotalQuantity(0);
    setTotalAmount(0);
  };
  return (
    <div className="container-fluid my-5">
      <div className="row">
        {/* Left Ad */}
        <div className="col-md-2 d-none d-md-block">
          <div className="p-3 bg-light border text-center sticky-top rounded">
            <strong>Ad: Left</strong>
            <p>Static ad content</p>
          </div>
        </div>

        {/* Main Calculator */}
        <div className="col-md-6">
          <div className="calc-container">
            {/* <h3 className="display-7 fw-bold title">Average Share Price</h3> */}
            <h4 className="fw-bold mb-4">Average Share Price</h4>

            {/* <p className="description">
              Calculate the average price you paid for a stock and your total cost.
            </p> */}

            <div className="card shadow card-container">
              <div className="card-body">
                <h3 className="h5 fw-semibold mb-4 subtitle">
                  Enter the details to calculate average share price
                </h3>

                {purchases.map((purchase, index) => (
                  <div className="mb-4" key={index}>
                    <label className="form-label fw-medium fw-bold">{`Purchase ${index + 1}`}</label>
                    <div className="row g-3">
                      <div className="col">
                        <div className="input-group">
                          <span className="input-group-text currency">₹</span>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            value={purchase.price === 0 ? '' : purchase.price}
                            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Quantity"
                          value={purchase.quantity === 0 ? '' : purchase.quantity}
                          onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                        />
                        {index >= 2 && (
                          <div className="col-auto mt-2">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removePurchase(index)}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center mb-4">
                  <a href="#" className="text-primary text-decoration-none" onClick={addPurchase}>
                    + Add new purchase
                  </a>
                </div>

                <div className="results p-3 rounded">
                  <div className="d-flex justify-content-between mb-2 fw-bold">
                    <span>Share price</span>
                    <span className="value">₹{averagePrice.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 fw-bold">
                    <span>Total quantity</span>
                    <span className="value">{totalQuantity}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>TOTAL AMOUNT</span>
                    <span className="value">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-primary" onClick={calculateAverage}>
                Calculate Average
              </button>
              <button className="btn btn-outline-primary" onClick={resetFields}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Ad */}
        <div className="col-md-4 d-md-block">
          <div className="calc-container">
            <h4 className=" fw-bold mb-4">Example for Calculation of Average Stock Price</h4>
            <div className="card shadow card-container">
              <div className="card-body">
                <p>
                  Suppose you purchased 20 shares of ABC at ₹120 per share in April. You then bought 10 more shares of the same company at ₹130 in May and 10 additional shares at ₹110 in June. Let’s calculate the average share price of ABC.
                </p>
                <p className="fw-medium mb-2">
                  <strong>Total cost of purchase</strong> = (20 × ₹120) + (10 × ₹130) + (10 × ₹110)<br />
                  = ₹2400 + ₹1300 + ₹1100<br />
                  = ₹4800
                </p>
                <p className="fw-medium mb-2">
                  <strong>Total number of shares bought</strong> = 20 + 10 + 10<br />
                  = 40
                </p>
                <p className="fw-medium mb-3">
                  <strong>Average cost price per share</strong> = ₹4800 / 40<br />
                  = ₹120
                </p>
                <p>
                  An average stock calculator simplifies this process, making it easier to track your investments without manual calculations. Use the calculator above to determine your average share price and make smarter investment decisions!
                </p>
              </div>
            </div>

          </div>
          {/* <div className="p-3 bg-light border text-center sticky-top rounded">
            <strong>Ad: Right</strong>
            <p>Static ad content</p>
          </div> */}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-2 d-none d-md-block">
          <div className="p-3 bg-light border text-center sticky-top rounded">
            <strong>Ad: Left</strong>
            <p>Static ad content</p>
          </div>
        </div>
        <div className="col-md-6">

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
        <div className="col-md-4">
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
  )
}

export default StockAverage