import { useState, useEffect } from 'react';
//handle the page title




const usePageTitle = (title) => {
    const [baseTitle] = useState(process.env.REACT_APP_TITLE);
    const [pageTitle] = useState(title);

    useEffect(() => {
        document.title = `${title && `${title} - `}${baseTitle}`;
        return () => {
            document.title = baseTitle;
        }
    }, [])


    return pageTitle;
};

export default usePageTitle;