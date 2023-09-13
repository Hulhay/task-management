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

export interface IGetTaskRequest {
  keyword?: string;
  state?: string;
  priority?: string;
}

export interface IGetTaskListResponse {
  meta: IMeta;
  data: ITask[];
}

export interface IGetTaskResponse {
  meta: IMeta;
  data: ITask;
}

export interface ICreateTaskRequest {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
  tags: string[];
}
