import { useCallback, useEffect, useState } from "react";

export function useFetch(fetchFunction, options = {}) {
  const { immediate = true, initialData = null, deps = [] } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction(...args);
      setData(result);

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (immediate) {
      execute().catch(() => {});
    }
  }, [execute, immediate, ...deps]);

  return {
    data,
    loading,
    error,
    refetch: execute,
    setData,
  };
}