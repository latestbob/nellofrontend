import { useState } from 'react';
import { useToasts } from 'react-toast-notifications'


//handle error talse 

const useToast = () => {
    const { addToast } = useToasts();
    const [isEdit, setIsEdit] = useState(false);

    const setToast = (content) => addToast(content, {
        appearance: 'error',
        autoDismiss: false,
    });

    return [isEdit, setToast];
};

export default useToast;