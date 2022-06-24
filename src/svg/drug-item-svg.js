import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={`100%`}
    height={290}
    viewBox="0 0 100% 290"
    backgroundColor="#f5f5f5"
    foregroundColor="#e0e0e0"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="100%" height="190" /> 
    <rect x="0" y="204" rx="2" ry="2" width="100%" height="60" />
  </ContentLoader>
)

export default MyLoader