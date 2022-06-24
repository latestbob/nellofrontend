import { useState, useEffect } from 'react';

const useModal = () => {
    const [modalState, setToggleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const setModalState = (status) => setToggleModal(status ? true : false);
    const closeModal = () => setToggleModal(false);
    const showModal = () => setToggleModal(true);

    useEffect(() => {

        return () => {
            setModalTitle('');
            setToggleModal(false);
        }
    }, [])


    return { modalState, setModalState, modalTitle, setModalTitle, closeModal, showModal };
};

export default useModal;