import { FormHandles } from "@unform/core"
import { useCallback, useRef } from "react"


export const useVForm = () => {

    const formRef = useRef<FormHandles>(null);

    const isSavingAndClose = useRef(false);
    const isSavingAndNew = useRef(false);

    const handleSave = useCallback(() => {
        isSavingAndNew.current = false;
        isSavingAndClose.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndNew = useCallback(() => {
        isSavingAndNew.current = true;
        isSavingAndClose.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndClose = useCallback(() => {
        isSavingAndNew.current = false;
        isSavingAndClose.current = true;
        formRef.current?.submitForm();
    }, []);

    const handleIsSaveAndNew = useCallback(() => {
        return isSavingAndNew.current;
    }, []);

    const handleIsSaveAndClose = useCallback(() => {
        return isSavingAndClose.current;
    }, []);

    return { formRef, 
        save: handleSave, 
        saveAndNew: handleSaveAndNew, 
        saveAndClose: handleSaveAndClose, 
        isSaveAndNew: handleIsSaveAndNew, 
        isSaveAndClose: handleIsSaveAndClose 
     }

}