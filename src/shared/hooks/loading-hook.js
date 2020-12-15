import { useState } from 'react';

export const useLoadingHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, clearError, setIsLoading, setError };
};
