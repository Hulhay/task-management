import {
  DatePicker,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  IComboBox,
  IDialogContentProps,
  IDropdownOption,
  IStackStyles,
  IStackTokens,
  Label,
  PrimaryButton,
  Stack,
  TextField,
  TimePicker,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  buildDueDate,
  formatDateString,
  getNow,
  getPriorityText,
  getStateText,
  stringToDateTime,
} from '../../helper';
import { ITask } from '../../interface';
import { lang } from '../../utils';

const stateOptions: IDropdownOption[] = [
  {
    key: 'todo',
    text: 'Todo',
  },
  {
    key: 'in-progress',
    text: 'In-progress',
  },
  {
    key: 'completed',
    text: 'Completed',
  },
];

const priorityOptions: IDropdownOption[] = [
  {
    key: 'low',
    text: 'Low',
  },
  {
    key: 'medium',
    text: 'Medium',
  },
  {
    key: 'high',
    text: 'High',
  },
];

const tagOptions: IDropdownOption[] = [
  {
    key: 'tag1',
    text: 'tag1',
  },
  {
    key: 'tag2',
    text: 'tag2',
  },
  {
    key: 'tag3',
    text: 'tag3',
  },
];

const buttonStackToken: IStackTokens = {
  childrenGap: 5,
};

const buttonStackStyle: IStackStyles = {
  root: {
    paddingTop: 10,
    justifyContent: 'end',
  },
};

interface IFormTask {
  task?: ITask;
}

const FormTask = ({ task }: IFormTask) => {
  const navigate = useNavigate();
  const today = getNow();
  const [description, setDescription] = useState<string>('');
  const [title, setTile] = useState<string>('');
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<Date>(today);
  const [state, setState] = useState<IDropdownOption>(stateOptions[0]);
  const [priority, setPriority] = useState<IDropdownOption>(priorityOptions[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: task ? lang('dialog.cancel_update_task') : lang('dialog.cancel_create_task'),
    subText: task
      ? lang('dialog.cancel_update_task_description')
      : lang('dialog.cancel_create_task_description'),
  };

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

  const onFormatDate = (date?: Date) => {
    return formatDateString(date?.toISOString(), 'YYYY-MM-DD');
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

  const onCancelCreate = () => {
    setTile('');
    setDescription('');
    setDate(today);
    setTime(today);
    setState(stateOptions[0]);
    setPriority(priorityOptions[0]);
    setTags([]);
    toggleHideDialog();
  };

  const onCancelEdit = () => {
    navigate(`/task/${task?.id}`);
  };

  const onCancel = () => {
    task ? onCancelEdit() : onCancelCreate();
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      title,
      description,
      due_date: buildDueDate(date, time),
      status: state.key,
      priority: priority.key,
      tags,
    });
  };

  useEffect(() => {
    if (task) {
      setTile(task?.title);
      setDescription(task.description);
      setDate(stringToDateTime(task?.due_date || ''));
      setTime(stringToDateTime(task?.due_date || ''));
      setState({ key: task.status, text: getStateText(task.status) });
      setPriority({ key: task.priority, text: getPriorityText(task.status) });
      setTags(task.tags);
    }
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          label={lang('form_task.title')}
          placeholder={lang('form_task.title_placeholder')}
          onChange={onTitleChange}
          value={title}
          required
        />
        <TextField
          label={lang('form_task.description')}
          placeholder={lang('form_task.description_placeholder')}
          onChange={onDescriptionChange}
          value={description}
          multiline
          rows={6}
        />
        <Stack>
          <Label>{lang('form_task.due_date')}</Label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridColumnGap: '15px',
            }}
          >
            <DatePicker
              placeholder={lang('form_task.date_picker_placeholder')}
              minDate={task ? undefined : today}
              formatDate={onFormatDate}
              onSelectDate={onDateChange}
              value={date}
            />
            <TimePicker
              placeholder={lang('form_task.time_picker_placeholder')}
              onChange={onTimeChange}
              value={time}
            />
          </div>
        </Stack>
        <Dropdown
          label={lang('form_task.state')}
          options={stateOptions}
          placeholder={lang('form_task.state_placeholder')}
          defaultSelectedKey={task?.status || 'todo'}
          onChange={onStateChange}
        />
        <Dropdown
          label={lang('form_task.priority')}
          options={priorityOptions}
          placeholder={lang('form_task.priority_placeholder')}
          defaultSelectedKey={task?.priority || 'low'}
          onChange={onPriorityChange}
        />
        <Dropdown
          label={lang('form_task.tags')}
          options={tagOptions}
          placeholder={lang('form_task.tags_placeholder')}
          onChange={onTagsChange}
          selectedKeys={tags}
          multiSelect
        />
        <Stack horizontal tokens={buttonStackToken} styles={buttonStackStyle}>
          <DefaultButton onClick={toggleHideDialog}>
            {lang('button.cancel')}
          </DefaultButton>
          <PrimaryButton type="submit">
            {task ? lang('button.edit') : lang('button.submit')}
          </PrimaryButton>
        </Stack>
      </form>

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog}>{lang('button.no')}</PrimaryButton>
          <DefaultButton onClick={onCancel}>{lang('button.yes')}</DefaultButton>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default memo(FormTask);
