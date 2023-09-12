import { FormTask, Header } from '../../components';
import { lang } from '../../utils';
import { dummyResponse } from './dummy';

const EditTask = () => {
  const data = dummyResponse;
  const style: React.CSSProperties = {
    margin: '0px 15px',
    width: '100%',
  };

  return (
    <div style={style}>
      <Header title={lang('edit_task.header')} />
      <FormTask task={data.data} />
    </div>
  );
};

export default EditTask;
