import React from 'react'

function Loader() {
  console.log("loadder is caleld")
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
    <div className="spinner-border text-success" role="status" style={{ width: '4rem', height: '4rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  )
}

export default Loader