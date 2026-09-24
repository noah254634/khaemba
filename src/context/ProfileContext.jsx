import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { fetchProfile } from '../services/api';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProfile();
      if (mountedRef.current) setProfile(data);
    } catch (requestError) {
      if (mountedRef.current) setError(requestError);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadProfile();
    return () => { mountedRef.current = false; };
  }, [loadProfile]);

  return <ProfileContext.Provider value={{ profile, loading, error, retry: loadProfile }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  return useContext(ProfileContext);
}
