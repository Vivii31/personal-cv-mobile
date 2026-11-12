
import { useCallback, useEffect, useState } from 'react';

import type { PortfolioProject } from '../components/data/PortfolioData';
import { getPortfolio } from '../services/portfolioService';

export default function usePortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount(previous => previous + 1);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadPortfolio() {
      setLoading(true);
      setError(null);

      try {
        const result = await getPortfolio();

        if (isActive) {
          setProjects(result);
        }
      } catch (err) {
        if (isActive) {
          setProjects(null);

          setError(
            err instanceof Error
              ? err.message
              : 'Terjadi kesalahan saat mengambil data portofolio.'
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadPortfolio();

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  return {
    projects,
    loading,
    error,
    retry,
  };
}
