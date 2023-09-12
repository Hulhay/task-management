import { IMeta } from './base';

export interface ITask {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  tags: string[];
}

export interface IGetTaskResponse {
  meta: IMeta;
  data: ITask[];
}

export interface IGetTaskDetailResponse {
  meta: IMeta;
  data: ITask;
}
