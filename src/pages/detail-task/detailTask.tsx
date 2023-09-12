import { useParams } from 'react-router-dom';

import { Header } from '../../components';
import { lang } from '../../utils';

const DetailTask = () => {
  const { taskID } = useParams<{ taskID: string }>();

  return (
    <>
      <Header title={lang('detail_task.header', { task_name: taskID })} />
    </>
  );
};

export default DetailTask;
