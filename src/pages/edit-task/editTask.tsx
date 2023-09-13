import { IComboBox, IDropdownOption } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FormTask, Header, Loading } from '../../components';
import {
  buildDueDate,
  getNow,
  getPriorityText,
  getStateText,
  priorityOptions,
  stateOptions,
  stringToDateTime,
} from '../../helper';
import { taskService } from '../../service';
import { lang } from '../../utils';

const EditTask = () => {
  const navigate = useNavigate();
  const { taskID } = useParams<{ taskID: string }>();
  const style: React.CSSProperties = {
    margin: '0px 15px',
    width: '100%',
  };
  const [title, setTile] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(getNow());
  const [time, setTime] = useState<Date>(getNow());
  const [state, setState] = useState<IDropdownOption>(stateOptions[0]);
  const [priority, setPriority] = useState<IDropdownOption>(priorityOptions[0]);
  const [tags, setTags] = useState<string[]>([]);
  const { response, loading, request } = taskService.getTaskByID(taskID as string);
  const {
    response: responseUpdate,
    loading: loadingUpdate,
    request: requestUpdate,
  } = taskService.updateTaskByID({
    taskID: taskID as string,
    title,
    description,
    due_date: buildDueDate(date, time),
    priority: priority.key as string,
    status: state.key as string,
    tags,
  });

  const onTitleChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    title?: string,
  ) => {
    if (!title || title.length <= 100) {
      setTile(title || '');
    }
  };

  const onDescriptionChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    description?: string,
  ) => {
    if (!description || description.length <= 1000) {
      setDescription(description || '');
    }
  };

  const onDateChange = (date?: Date | null) => {
    if (date) {
      setDate(date);
    }
  };

  const onTimeChange = (_: React.FormEvent<IComboBox>, time: Date) => {
    setTime(time);
  };

  const onStateChange = (_: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
    if (item) {
      setState(item);
    }
  };

  const onPriorityChange = (
    _: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
  ) => {
    if (item) {
      setPriority(item);
    }
  };

  const onTagsChange = (_: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
    if (item) {
      setTags(
        item.selected
          ? [...tags, item.key as string]
          : tags.filter((key) => key !== item.key),
      );
    }
  };

  const onCancel = () => {
    navigate(`/task/${taskID}`);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    requestUpdate();
  };

  useEffect(() => {
    request();
  }, [taskID]);

  useEffect(() => {
    setTimeout(() => {
      setTile(response?.data.title || '');
      setDescription(response?.data.description || '');
      setDate(stringToDateTime(response?.data.due_date || ''));
      setTime(stringToDateTime(response?.data.due_date || ''));
      setState({
        key: response?.data.status as string,
        text: getStateText(response?.data.status || ''),
      });
      setPriority({
        key: response?.data.priority as string,
        text: getPriorityText(response?.data.status || ''),
      });
      setTags(response?.data.tags || []);
    }, 10);
  }, [response]);

  useEffect(() => {
    if (responseUpdate?.meta.code === 200) {
      navigate('/');
    }
  }, [responseUpdate]);

  return (
    <div style={style}>
      <Header title={lang('edit_task.header')} />
      {loading ? (
        <Loading />
      ) : (
        <FormTask
          task={response?.data}
          title={title}
          description={description}
          date={date}
          time={time}
          state={state}
          priority={priority}
          tags={tags}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
          onStateChange={onStateChange}
          onPriorityChange={onPriorityChange}
          onTagsChange={onTagsChange}
          onCancel={onCancel}
          onSubmit={onSubmit}
          loading={loadingUpdate}
          submitLabel={lang('button.edit')}
        />
      )}
    </div>
  );
};

export default EditTask;
