import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={200}
    viewBox="0 0 400 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="36" rx="0" ry="0" width="400" height="1" /> 
    <rect x="0" y="0" rx="0" ry="0" width="252" height="6" /> 
    <rect x="0" y="17" rx="0" ry="0" width="200" height="6" /> 
    <rect x="0" y="89" rx="4" ry="4" width="400" height="80" /> 
    <circle cx="390" cy="7" r="7" /> 
    <circle cx="357" cy="7" r="7" /> 
    <rect x="0" y="55" rx="0" ry="0" width="372" height="4" /> 
    <rect x="0" y="68" rx="0" ry="0" width="338" height="4" /> 
    <rect x="0" y="182" rx="0" ry="0" width="400" height="1" />
  </ContentLoader>
)

export default MyLoader