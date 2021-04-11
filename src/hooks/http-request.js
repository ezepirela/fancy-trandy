import {useState, useCallback, useRef, useEffect} from 'react';
export const  useHttpClient = ()  => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorBa, SetError] = useState();
    const activeHttpRequests = useRef([]);
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        console.log(body)
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method, 
                body,
                headers,
                signal: httpAbortCtrl.signal
            });
            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => 
                reqCtrl !== httpAbortCtrl
            );
            if(!response.ok){
                console.log(response);
                throw new Error(response.message);
            }
            setIsLoading(false);
            return responseData;
        } catch (e) {
            setIsLoading(false);
            console.log(e.message)
            SetError(e.message);
            throw e;
        }
    }, []);
    const clearError = () => {
        SetError(null);
    }
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        };
    }, [])
    return {errorBa, isLoading, sendRequest, clearError};
};