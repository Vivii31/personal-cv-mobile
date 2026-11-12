
import portfolioData from '../components/data/portfolio.json';
import type { PortfolioProject } from '../components/data/PortfolioData';

export async function getPortfolio(): Promise<PortfolioProject[] | null> {
  // Simulasi proses pengambilan data
  await new Promise(resolve => setTimeout(resolve, 700));

  const data = portfolioData as PortfolioProject[];

  // Kondisi data kosong
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  // Validasi data proyek
  const invalidProject = data.some(project =>
    !project.id ||
    !project.judul ||
    !project.kategori ||
    !project.deskripsi ||
    !Array.isArray(project.teknologi)
  );

  if (invalidProject) {
    throw new Error('Terdapat data proyek yang belum lengkap.');
  }

  return data;
}
