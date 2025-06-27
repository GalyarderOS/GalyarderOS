import React from 'react';
import { useAuthState } from './auth/useAuthState';
import { signUpUser, signInUser, signInWithGoogleUser, updateUserProfile, uploadAvatar } from './auth/authService';
import { AuthContext } from './auth/useAuth';

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  transaction_date: string;
  cashflow_categories: {
    name: string;
    color: string;
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authState = useAuthState();

  const value = {
    ...authState,
    signUp: signUpUser,
    signIn: signInUser,
    signInWithGoogle: signInWithGoogleUser,
    updateProfile: updateUserProfile,
    uploadAvatar: uploadAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

