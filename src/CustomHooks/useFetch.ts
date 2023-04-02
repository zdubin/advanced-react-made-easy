import React, { useState, useEffect, useContext } from "react";

const useFetch = (url: string, iteration?: number):[{name: string}[] | null,  React.Dispatch<React.SetStateAction<{name: string}[] | null>>] => {
    const [data, setData] = useState<{name: string}[] | null>(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => setData([{name: `${url} ${error}`}]) );
    }, [url, iteration]);

    return [data,setData];
};

export default useFetch;
