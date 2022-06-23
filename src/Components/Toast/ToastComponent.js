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
          Fill out all fields
          </div>
        </Toast.Body>
      </Toast>
     
    </div>
  )
}