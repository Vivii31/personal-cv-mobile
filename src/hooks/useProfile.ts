
import { useCallback, useEffect, useState } from 'react';

import type { ProfileData } from '../components/data/ProfileData';
import { getProfile } from '../services/profileService';

export default function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount(previous => previous + 1);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadProfile() {
      setLoading(true);
      setError(null);

      try {
        const result = await getProfile();

        if (isActive) {
          setProfile(result);
        }
      } catch (err) {
        if (isActive) {
          const message =
            err instanceof Error
              ? err.message
              : 'Terjadi kesalahan saat mengambil data profil.';

          setError(message);
          setProfile(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  return {
    profile,
    loading,
    error,
    retry,
  };
}
