import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface APICallerState {
    data: any;
    error: boolean;
}

const APICallerContext = createContext<Partial<APICallerState>>({});
export const useAPICallerContext = () => useContext(APICallerContext);

interface APICallerContextProviderProps {
    url: string;
    children?: React.ReactNode;
}

export default function APICallerContextProvider(props: APICallerContextProviderProps) {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const promise = axios.get(props.url);

        promise.then((resp) => {
            const data = resp.data;
            if (data) setData(data);
        });

        promise.catch((err: unknown) => setError(true));
    }, [props]);

    const value = {
        data,
        error,
    };

    return <APICallerContext.Provider value={value}>{props.children}</APICallerContext.Provider>;
}
