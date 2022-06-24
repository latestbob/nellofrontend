import { useState } from 'react';

const useEditState = ({ modalTitle= ''}) => {
    const [isEdit, setIsEdit] = useState(false);

    const toggle = () => setIsEdit((isedit) => !isedit);

    return [isEdit, toggle];
};

export default useEditState;