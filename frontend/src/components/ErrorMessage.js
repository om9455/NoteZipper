import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = ({variant="danger",children}) => {
  return (
      <Alert varient={variant} style={{ fontSize: 20 }} className='alert-danger'> 
          <strong>{children }</strong>
</Alert>
  )
}

export default ErrorMessage
