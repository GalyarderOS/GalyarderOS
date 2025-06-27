import { useState, useEffect } from 'react';

const ONBOARDING_COMPLETED_KEY = 'galyarder_onboarding_completed';

export const useFirstTimeUser = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
    if (onboardingCompleted === 'true') {
      setIsFirstTimeUser(false);
    } else {
      setIsFirstTimeUser(true); // Set to true for first-time users
    }
    setIsLoading(false);
  }, []);

  const markOnboardingCompleted = () => {
    setIsFirstTimeUser(false);
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
  };

  return {
    isFirstTimeUser,
    markOnboardingCompleted,
    isLoading,
  };
};
