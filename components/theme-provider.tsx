'use client';

import * as React from 'react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {type ThemeProviderProps} from 'next-themes/dist/types';
import { AuthProvider } from '@/app/context/AuthContext';
import { OccurrencesProvider } from '@/app/context/OccurrencesContext'

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
  return (
    <AuthProvider>
      <OccurrencesProvider>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </OccurrencesProvider>      
    </AuthProvider>
  )
}
