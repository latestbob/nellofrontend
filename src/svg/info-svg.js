import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={`100%`}
    height={104}
    viewBox="0 0 100% 104"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="58" rx="0" ry="0" width="100%" height="6" /> 
    <rect x="0" y="39" rx="0" ry="0" width="80%" height="6" /> 
    <rect x="0" y="97" rx="0" ry="0" width="70%" height="6" /> 
    <rect x="0" y="0" rx="0" ry="0" width="30%" height="16" /> 
    <rect x="0" y="76" rx="0" ry="0" width="339" height="6" />
  </ContentLoader>
)

export default MyLoader