import { Method } from 'axios';

import { useService } from '../hooks';
import {
  ICreateTaskRequest,
  IGetTaskRequest,
  IGetTaskResponse,
  ITask,
  IUpdateTaskRequest,
} from '../interface';

export default {
  getTasks: ({ keyword, state, priority }: IGetTaskRequest) => {
    const { response, loading, request } = useService<IGetTaskResponse<ITask[]>>({
      path: 'api/v1/tasks',
      options: {
        method: 'GET' as Method,
        params: {
          keyword,
          status: state,
          priority,
        },
      },
      loadOnStart: false,
    });

    return { response, loading, request };
  },
  getTaskByID: (taskID: string) => {
    const { response, loading, request } = useService<IGetTaskResponse<ITask>>({
      path: `api/v1/tasks/${taskID}`,
      options: {
        method: 'GET' as Method,
      },
      loadOnStart: false,
    });

    return { response, loading, request };
  },
  deleteTaskByID: (taskID: string) => {
    const { response, loading, request } = useService<IGetTaskResponse<ITask>>({
      path: `api/v1/tasks/${taskID}`,
      options: {
        method: 'DELETE' as Method,
      },
      loadOnStart: false,
    });

    return { response, loading, request };
  },
  createTask: (data: ICreateTaskRequest) => {
    const { response, loading, request } = useService<IGetTaskResponse<ITask>>({
      path: `api/v1/tasks`,
      options: {
        method: 'POST' as Method,
        data: {
          title: data.title,
          description: data.description,
          due_date: data.due_date,
          status: data.status,
          priority: data.priority,
          tags: data.tags,
        },
      },
      loadOnStart: false,
    });

    return { response, loading, request };
  },
  updateTaskByID: (data: IUpdateTaskRequest) => {
    const { response, loading, request } = useService<IGetTaskResponse<ITask>>({
      path: `api/v1/tasks/${data.taskID}`,
      options: {
        method: 'PATCH' as Method,
        data: {
          title: data.title,
          description: data.description,
          due_date: data.due_date,
          status: data.status,
          priority: data.priority,
          tags: data.tags,
        },
      },
      loadOnStart: false,
    });

    return { response, loading, request };
  },
};
