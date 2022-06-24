import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={`100%`}
    height={261}
    viewBox="0 0 100% 261"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="50" /> 
    <rect x="0" y="70" rx="5" ry="5" width="100%" height="50" /> 
    <rect x="0" y="140" rx="5" ry="5" width="100%" height="50" /> 
    <rect x="0" y="210" rx="5" ry="5" width="100%" height="50" />
  </ContentLoader>
)

export default MyLoader