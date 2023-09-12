import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { BaseURL } from '../config';

export interface IPromise<T> {
  path: string;
  options: AxiosRequestConfig;
  loadOnStart: boolean;
  response?: T;
  error?: string;
  loading?: boolean;
  request?: () => void;
}

export const useService = <T>({ path, options, loadOnStart }: IPromise<T>) => {
  const url = `${BaseURL}/${path}`;
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  options = {
    ...options,
    headers: {
      ...options.headers,
    },
  };

  const sendRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios<T>(url, options);
      setResponse(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.meta.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const request = async () => {
    await sendRequest();
  };

  useEffect(() => {
    if (loadOnStart) {
      sendRequest();
    }
  }, [url, options, loadOnStart]);

  return {
    response,
    error,
    loading,
    request,
  };
};
