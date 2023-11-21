import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useToast = () => {
    
    const addToast = useCallback((toastProps) => {
        const {type, message, ...otherProps} = toastProps
        switch(type) {
            case 'success': 
                toast.success(message, {
                    ...otherProps
                })
                break;
            case 'error':
                toast.error(message, {
                    ...otherProps
                })
                break;
            case 'warn': 
                toast.warn(message, {
                    ...otherProps
                })
                break;
            default: 
                toast(message)
                break;
        }
    }, [])

    return {
        addToast
    }
}