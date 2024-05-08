import { useState, useEffect } from "react";

export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export const useFetch = (url: string) => {
  const [data, setData] = useState<IProduct[]>([]);

  //6 - Loading
  const [loading, setLoading] = useState(false);

  //7 - Handling Errors
  const [error, setError] = useState<string| null >(null);

  //5 - Refatorando o POST
  const [config, setConfig] = useState<{
    method: 'POST';
    headers:{
      'Content-Type': 'application/json'
    };
    body: BodyInit;
  }>();
  const [method, setMethod] = useState<string | null>(null);
  const [callFetch, setCallFetch] = useState(false);

  const httpConfig = (data: unknown, method: string) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      //6 - Loading
      setLoading(true);
      try {
        const res = await fetch(url);

      const json = await res.json();

      setData(json);
      } catch (error) {
        setError("Houve algum erro ao carregar os dados!");
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  //5 - Refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {

        const res = await fetch(url, config);

        const json = await res.json();

        setCallFetch(json);
      }
    };

    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
