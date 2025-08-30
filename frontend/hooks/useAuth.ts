import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export function useAuth() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Failed to decode token:', error);
        setRole(null);
      }
    }
  }, []);

  return { role };
}
