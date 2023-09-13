import { Method } from 'axios';

import { useService } from '../hooks';
import { IGetTaskListResponse, IGetTaskRequest, IGetTaskResponse } from '../interface';

export default {
  getTasks: ({ keyword, state, priority }: IGetTaskRequest) => {
    const { response, loading, request } = useService<IGetTaskListResponse>({
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
  getTasksByID: (taskID: string) => {
    const { response, loading, request } = useService<IGetTaskResponse>({
      path: `api/v1/tasks/${taskID}`,
      options: {
        method: 'GET' as Method,
      },
      loadOnStart: false,
    });

    return { response, loading, request };
  },
};
