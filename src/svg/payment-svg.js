import React from "react"
import ContentLoader from "react-content-loader"

const PaymentSvg = (props) => (
  <ContentLoader 
    speed={1}
    width={`100%`}
    height={340}
    viewBox="0 0 400 340"
    backgroundColor="#f3f3f3"
    foregroundColor="#e0e0e0"
    {...props}
  >
    <rect x="0" y="36" rx="2" ry="2" width="140" height="11" /> 
    <rect x="0" y="0" rx="0" ry="0" width="188" height="25" /> 
    <rect x="0" y="83" rx="0" ry="0" width="380" height="5" /> 
    <rect x="0" y="100" rx="0" ry="0" width="223" height="5" /> 
    <rect x="0" y="125" rx="0" ry="0" width="380" height="15" /> 
    <rect x="0" y="156" rx="0" ry="0" width="331" height="15" /> 
    <rect x="0" y="188" rx="0" ry="0" width="248" height="15" /> 
    <rect x="0" y="283" rx="25" ry="25" width="336" height="50" /> 
    <rect x="0" y="237" rx="0" ry="0" width="306" height="19" />
  </ContentLoader>
)

export default PaymentSvg