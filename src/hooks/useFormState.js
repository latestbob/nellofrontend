import { useState, useEffect } from 'react';

//handle form states

const useFormState = (id) => {
    const form = document.getElementById(id);
    const btn = document.querySelector(`#${id} .btn-main`);
    const [initBtnText, setInitBtnText] = useState(null);
    const [iel] = useState('<span className="btn-loading-icon"><i className="bx bx-spin dripicons-loading"></i></span>');

    const [formState, setFormState] = useState(null);
    const [loadingText, setLoadingText] = useState(null);

    const toggleFormState = (state, loadingText = null) => {
        //console.log(state, 'toggleFormState...');
        setFormState(state);
        if (loadingText) setLoadingText(loadingText);
    }

    const toggleDisableForm = (form, formState) => {
        const allElements = form?.elements;
        if (allElements && allElements.length > 0) {
            for (let i = 0, l = allElements.length; i < l; ++i) {
                if (formState === true)
                    allElements[i].disabled = true;
                else
                    allElements[i].disabled = false;
            }
        }
    }

    useEffect(() => {
        (async () => {
            if ((formState === true || formState === false) && form && btn) {
                if (formState === true) {
                    const currentBtnText = await Promise.resolve(btn.innerHTML);
                    setInitBtnText(currentBtnText);
                }
                toggleDisableForm(form, formState);

                if (formState === true) {
                    if (!btn.classList.contains('btn-block')) {
                        btn.classList.add('btn-loading-icon-pad');
                    }

                    if (loadingText) {
                        btn.innerHTML = `${loadingText} ${iel}`
                    } else {
                        btn.insertAdjacentHTML('beforeend', iel);
                    }

                } else {
                    //console.log(initBtnText, 'initBtnText false...');
                    if (!btn.classList.contains('btn-block')) {
                        btn.classList.remove('btn-loading-icon-pad');
                    }

                    if (loadingText) {
                        btn.innerHTML = initBtnText;
                    } else {
                        const rel = document.querySelector(`#${id} .btn-main .btn-loading-icon`);
                        if (rel) rel.remove();
                    }
                }
            }
        })()

        return () => {
            toggleDisableForm(form, false);
        }
    }, [formState, form, btn, loadingText]);

    return { toggleFormState };
};

export default useFormState;