import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={`100%`}
    height={300}
    viewBox="0 0 100% 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="25" /> 
    <rect x="0" y="41" rx="3" ry="3" width="30%" height="17" /> 
    <rect x="0" y="96" rx="0" ry="0" width="95%" height="10" /> 
    <rect x="0" y="125" rx="0" ry="0" width="80%" height="10" /> 
    <rect x="0" y="153" rx="0" ry="0" width="70%" height="10" /> 
    <rect x="0" y="194" rx="25" ry="25" width="163" height="50" />
  </ContentLoader>
)

export default MyLoader