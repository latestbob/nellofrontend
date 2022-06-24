import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={`100%`}
    height={13}
    viewBox="0 0 100% 13"
    backgroundColor="#f5f5f5"
    foregroundColor="#e0e0e0"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="100" height="13" /> 
    <rect x="374" y="0" rx="2" ry="2" width="100" height="13" /> 
    <rect x="480" y="0" rx="19" ry="19" width="13" height="13" />
  </ContentLoader>
)

export default MyLoader