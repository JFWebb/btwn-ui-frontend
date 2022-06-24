import React from 'react'
import { useState } from 'react';
import { Toast, Button } from 'react-bootstrap'
import './Toast.styles.css'


export default function ToastComponent() {
  const [showToast, setShow] = useState(true)
  return (
    <div className='toast-container'>
    
      <Toast
        onClose={() => setShow(false)}
        show={showToast}
        // transition={ToastFade}
        // delay={50000}
        animation={true}
        bg='light'
      >
        <Toast.Header>
          <strong className="me-auto"> Getting Started </strong>
          <small>2 sec ago</small>
        </Toast.Header>
        <Toast.Body>
          <div>
            <p>🏠 Add in two addresess (you and a friend 👯)</p>
            <p>👀 What are you looking to do? Resturant? Museum? Park? Type it in!</p>
            <p>⏱ Specify your max detour time-- anywhere between 1 and 60 minutes</p>
            <p>🔎 Hit search and find the perfect place to meet</p>
            <p>✨ But wait... there's more! Login with google and save your favorite addresss</p>
          </div>
        </Toast.Body>
      </Toast>
     
    </div>
  )
}