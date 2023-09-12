import { FormTask, Header } from '../../components';
import { lang } from '../../utils';

const CreateTask = () => {
  const style: React.CSSProperties = {
    margin: '0px 15px',
    width: '100%',
  };

  return (
    <div style={style}>
      <Header title={lang('add_task.header')} />
      <FormTask />
    </div>
  );
};

export default CreateTask;
