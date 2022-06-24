import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={355}
    height={220}
    viewBox="0 0 355 220"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="2" rx="3" ry="3" width="164" height="32" /> 
    <rect x="190" y="2" rx="3" ry="3" width="164" height="32" /> 
    <rect x="0" y="47" rx="3" ry="3" width="164" height="32" /> 
    <rect x="190" y="47" rx="3" ry="3" width="164" height="32" /> 
    <rect x="0" y="95" rx="3" ry="3" width="164" height="32" /> 
    <rect x="190" y="95" rx="3" ry="3" width="164" height="32" /> 
    <rect x="0" y="142" rx="3" ry="3" width="164" height="32" /> 
    <rect x="190" y="142" rx="3" ry="3" width="164" height="32" /> 
    <rect x="0" y="192" rx="0" ry="0" width="355" height="1" /> 
    <rect x="0" y="211" rx="3" ry="3" width="330" height="10" />
  </ContentLoader>
)

export default MyLoader