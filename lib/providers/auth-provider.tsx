'use client';

import type { TUserProfile } from '@/app/types';
import { profileOptions } from '@/query-options/profile';
import type { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, type PropsWithChildren } from 'react';

type AuthContextProps = {
  profile: TUserProfile | undefined | null;
  user: User | null | undefined;
  isLoading: boolean;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading } = useQuery(profileOptions());

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        profile: data?.profile,
        user: data?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
