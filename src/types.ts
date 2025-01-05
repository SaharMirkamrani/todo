export type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  isComplete: boolean;
};

export type ApiTask = {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  is_completed: boolean;
};

export interface CreateTaskPayload {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
