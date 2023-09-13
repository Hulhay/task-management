import { IComboBox, IDropdownOption } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormTask, Header } from '../../components';
import { buildDueDate, getNow, priorityOptions, stateOptions } from '../../helper';
import { taskService } from '../../service';
import { lang } from '../../utils';

const CreateTask = () => {
  const style: React.CSSProperties = {
    margin: '0px 15px',
    width: '100%',
  };
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>('');
  const [title, setTile] = useState<string>('');
  const [date, setDate] = useState<Date>(getNow());
  const [time, setTime] = useState<Date>(getNow());
  const [state, setState] = useState<IDropdownOption>(stateOptions[0]);
  const [priority, setPriority] = useState<IDropdownOption>(priorityOptions[0]);
  const [tags, setTags] = useState<string[]>([]);
  const { response, loading, request } = taskService.createTask({
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
    setTile('');
    setDescription('');
    setDate(getNow());
    setTime(getNow());
    setState(stateOptions[0]);
    setPriority(priorityOptions[0]);
    setTags([]);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    request();
  };

  useEffect(() => {
    if (response?.meta.code === 201) {
      navigate('/');
    }
  }, [response]);

  return (
    <div style={style}>
      <Header title={lang('add_task.header')} />
      <FormTask
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
        loading={loading}
      />
    </div>
  );
};

export default CreateTask;
