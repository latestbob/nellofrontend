import React from "react"
import ContentLoader from "react-content-loader"

const PaymentSvg = (props) => (
  <ContentLoader 
    speed={2}
    width={`100%`}
    height={400}
    viewBox="0 0 100% 400"
    backgroundColor="#f5f5f5"
    foregroundColor="#e0e0e0"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="100%" height="34" /> 
    <rect x="0" y="58" rx="2" ry="2" width="100%" height="17" /> 
    <rect x="0" y="92" rx="2" ry="2" width="100%" height="17" /> 
    <rect x="0" y="127" rx="2" ry="2" width="100%" height="17" /> 
    <rect x="0" y="161" rx="2" ry="2" width="100%" height="17" /> 
    <rect x="0" y="223" rx="2" ry="2" width="100%" height="34" /> 
    <rect x="0" y="281" rx="2" ry="2" width="100%" height="17" /> 
    <rect x="0" y="315" rx="2" ry="2" width="100%" height="17" /> 
    <rect x="0" y="350" rx="2" ry="2" width="100%" height="17" /> 
    <rect x="0" y="384" rx="2" ry="2" width="100%" height="17" />
  </ContentLoader>
)

export default PaymentSvg