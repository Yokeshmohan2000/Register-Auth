import React, { createContext, useState, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';

interface AuthContextProps {
  user: User | null;
  message: string;
  register: (name: string, email: string, password: string) => Promise<void>;
}

interface User {
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
  };
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
      setUser(response.data.user);
      setMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setMessage(axiosError.response?.data.error || 'An unknown error occurred');
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, message, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

