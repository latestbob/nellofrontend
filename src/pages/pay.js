import React from 'react';
import { PaystackButton } from 'react-paystack';
//import './App.css';

const config = {
  reference: (new Date()).getTime(),
  email: "user@example.com",
  amount: 20000,
  publicKey: 'pk_test_8f0b4097219c38b030397351815e1d377418eae6',
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const componentProps = {
  ...config,
  text: 'Paystack Button Implementation',
  onSuccess: (reference) => onSuccess(reference),
  onClose: onClose,
};

function Apps() {
  return (
    <div className="App">
      <PaystackButton
        className="btn btn-secondary btn-block btn-lg"
        {...componentProps}
      />
    </div>
  );
}

export default Apps;