import {useEffect, useState} from "react";

export default function useFetch(url) {
    const [data , setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const usefetch = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);
                if (!res.ok){
                    throw new Error(res.statusText);
                }
                const json = await res.json();
                setData(json)
                setLoading(false);
            }catch (error) {
                setError(error.message);
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        }
        usefetch();
    }, [url]);
    return {data, loading, error};
}