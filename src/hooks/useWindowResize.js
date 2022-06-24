import { useState, useEffect } from 'react';

const useWindowResize = () => {
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const [windowHeight, setHeight] = useState(window.innerHeight);

  useEffect(() => {

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      //console.log(window.innerHeight, window.innerWidth, 'window.innerHeight..')
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return { windowWidth, windowHeight }
}

export default useWindowResize;