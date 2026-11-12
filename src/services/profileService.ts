
import profileData from '../components/data/profile.json';
import type { ProfileData } from '../components/data/ProfileData';

// Simulasi pengambilan data profil dari mock API
export async function getProfile(): Promise<ProfileData | null> {
  // Simulasi waktu tunggu pengambilan data
  await new Promise(resolve => setTimeout(resolve, 700));

  const data = profileData as ProfileData;

  // Kondisi data kosong
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  // Validasi data wajib
  if (!data.nama || !data.nim) {
    throw new Error('Data profil tidak lengkap.');
  }

  return data;
}
