import { IMeta } from './base';

export interface ITask {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface IGetTaskRequest {
  keyword?: string;
  state?: string;
  priority?: string;
}

export interface IGetTaskResponse<T> {
  meta: IMeta;
  data: T;
}

export interface ICreateTaskRequest {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
  tags: string[];
}

export interface IUpdateTaskRequest {
  taskID: string;
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
  tags: string[];
}
