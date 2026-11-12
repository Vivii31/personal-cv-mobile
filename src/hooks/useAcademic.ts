
import { useCallback, useEffect, useState } from 'react';

import type { AcademicData } from '../components/data/AcademicData';
import { getAcademicData } from '../services/academicService';

export default function useAcademic() {
  const [academic, setAcademic] = useState<AcademicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount(previous => previous + 1);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadAcademic() {
      setLoading(true);
      setError(null);

      try {
        const result = await getAcademicData();

        if (isActive) {
          setAcademic(result);
        }
      } catch (err) {
        if (isActive) {
          setAcademic(null);

          setError(
            err instanceof Error
              ? err.message
              : 'Terjadi kesalahan saat mengambil data akademik.'
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadAcademic();

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  return {
    academic,
    loading,
    error,
    retry,
  };
}
