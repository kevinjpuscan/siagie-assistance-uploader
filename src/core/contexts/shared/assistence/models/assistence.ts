interface Student {
  dni: string;
  first_names: string;
  last_names: string;
}
interface Assistence {
  id: number;
  is_late: boolean;
  entry_time: Date;
  student: Student;
}
