
import academicData from '../components/data/academic.json';
import type { AcademicData } from '../components/data/AcademicData';

export async function getAcademicData(): Promise<AcademicData | null> {
  // Simulasi proses pengambilan data
  await new Promise(resolve => setTimeout(resolve, 700));

  const data = academicData as AcademicData;

  // Memeriksa apakah data kosong
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  // Memeriksa informasi akademik wajib
  if (
    !data.nama ||
    !data.nim ||
    !data.programStudi ||
    !data.mataKuliah
  ) {
    throw new Error('Informasi akademik belum lengkap.');
  }

  // Memeriksa format nilai
  if (
    typeof data.nilai !== 'number' ||
    data.nilai < 0 ||
    data.nilai > 100
  ) {
    throw new Error('Data nilai akademik tidak valid.');
  }

  // Memeriksa data progress
  if (!Array.isArray(data.progress)) {
    throw new Error('Data progress pembelajaran tidak valid.');
  }

  return data;
}
