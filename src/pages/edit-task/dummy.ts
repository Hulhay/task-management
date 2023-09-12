import { IGetTaskDetailResponse } from '../../interface';

export const dummyResponse: IGetTaskDetailResponse = {
  meta: {
    code: 200,
    message: 'success',
    pagination: null,
  },
  data: {
    id: '8ec29262-3b2c-44df-b9f2-c3b0a2f988f0',
    title: 'task 5',
    description: 'desc task 5',
    due_date: '2023-09-02 07:15:00',
    priority: 'medium',
    status: 'in-progress',
    tags: ['tag2', 'tag3'],
  },
};
