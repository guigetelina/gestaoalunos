export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  monthlyFee: number;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
}

export interface Schedule {
  id: string;
  teacherId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  studentIds: string[];
}