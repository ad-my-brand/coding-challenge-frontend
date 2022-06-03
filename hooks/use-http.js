import axios from 'axios';
import { useCallback, useState } from 'react';

/**
 * useHttp hook handle request management by fetching data and maintaining isLoading and error state
 * @returns {Object} isLoading, error, sendRequest
 */

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Sends post request to the given url and calls callback
   * @param {String} url url of the server
   * @param {Function} callback function that needs to be run when data is fetched
   * @async
   */

  const sendRequest = useCallback(async (url, data, validate) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(url, data);

      setSuccess(validate(res));
    } catch (err) {
      setError({ ...err, message: err.message || 'Something went wrong!' });
    }

    setIsLoading(false);
  }, []);

  return { isLoading, error, success, sendRequest };
};

export default useHttp;
