'use client';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { AuthProvider } from './auth-provider';
import ReactQueryProvider from './react-query-provider';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
