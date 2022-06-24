import { useState, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";


const useQueryParams = (query) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [parameters, setParameters] = useState({});

  const params = query.split(',');
  const queryString = new URLSearchParams(useLocation().search);



  //console.log(params, 'params...');

  const setParams = useCallback((pr) => {
    //setParameters({...parameters, [key]: value})
    //setParameters(pr);
    console.log(pr, 'setParameters...')
    //setHeight(pr)
  }, [parameters]);

  

  useEffect(() => {
    //console.log(queryString, 'queryString...')
    /* params.map(qString => {
      const sd = ''+qString+'';
      //const str = queryString.get(String(sd));
      //const str = new URLSearchParams(useLocation().search).get(sd);
      console.log(ccc, 'queryString...');
    }) */
    let rrr = {}


    for (const param of queryString) {
      const key = param[0];
      const value = param[1];
      //console.log(param, 'param..');
      //setParams(key, value)
      //setParameters({...parameters, [key]: value});
      rrr = { ...rrr, [key]: value }
    }

    setParams(rrr);

    setTimeout(() => {
      setParams(rrr);
    }, 1000);

    
    //console.log(rrr, 'rrr...');

  }, [queryString])

  return parameters;
}

export default useQueryParams;