
export interface LearningProgressData {
  nama: string;
  persentase: number;
}

export interface AcademicData {
  nama: string;
  nim: string;
  programStudi: string;
  semester: number;
  mataKuliah: string;
  dosen: string;
  nilai: number;
  predikat: string;
  progress: LearningProgressData[];
}
