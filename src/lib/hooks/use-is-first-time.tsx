import { useEffect, useState } from 'react';

import { getItem, setItem } from '../storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTimeState] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFirstTimeStatus = async () => {
      try {
        const storedValue = await getItem<boolean>(IS_FIRST_TIME);
        setIsFirstTimeState(storedValue ?? true);
      } catch (error) {
        console.error('Error loading first time status:', error);
        setIsFirstTimeState(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadFirstTimeStatus();
  }, []);

  const setIsFirstTime = async (value: boolean) => {
    try {
      await setItem(IS_FIRST_TIME, value);
      setIsFirstTimeState(value);
    } catch (error) {
      console.error('Error setting first time status:', error);
    }
  };

  return [isFirstTime, setIsFirstTime, isLoading] as const;
};
