import { useEffect, useState } from 'react';

export type FetchDataResponse<T> = {
  data: T ;
  error: Error | null | unknown;
  isLoading: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

// A generic hook to call multiple APIs simultaneously with strong typing per each result set
export const useFetchAllData = <T>(urls: string[]): FetchDataResponse<T> => {
  const initialData = Array.from(Array(urls.length), () => []);

  const [data, setData] = useState<T>( initialData as T );
  const [error, setError] = useState<Error | null | unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count,setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((resp) => resp.json()))
        );

        setData(responses as T);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        setData(initialData as T);
      }
    };

    fetchData();
  }, [urls,count]);  

  return { data, error, isLoading, setCount }; // result set, any error encountered, in loading state T/F, 
                                              // calling setCount with a new value will cause a requery of the APIs, even if the urls haven't changed
};
