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
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  TimePicker,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { memo } from 'react';

import {
  formatDateString,
  getNow,
  priorityOptions,
  stateOptions,
  tagOptions,
} from '../../helper';
import { ITask } from '../../interface';
import { lang } from '../../utils';

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
  title: string;
  description: string;
  date: Date;
  time: Date;
  state: IDropdownOption;
  priority: IDropdownOption;
  tags: string[];
  onTitleChange: (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    title?: string,
  ) => void;
  onDescriptionChange: (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    description?: string,
  ) => void;
  onDateChange: (date?: Date | null) => void;
  onTimeChange: (_: React.FormEvent<IComboBox>, time: Date) => void;
  onStateChange: (_: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => void;
  onPriorityChange: (_: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => void;
  onTagsChange: (_: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => void;
  onCancel: () => void;
  onSubmit: (event: React.FormEvent) => void;
  loading: boolean;
  submitLabel: string;
}

const FormTask = ({
  task,
  title,
  description,
  date,
  time,
  state,
  priority,
  tags,
  onTitleChange,
  onDescriptionChange,
  onDateChange,
  onTimeChange,
  onStateChange,
  onPriorityChange,
  onTagsChange,
  onCancel,
  onSubmit,
  loading,
  submitLabel,
}: IFormTask) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: task ? lang('dialog.cancel_update_task') : lang('dialog.cancel_create_task'),
    subText: task
      ? lang('dialog.cancel_update_task_description')
      : lang('dialog.cancel_create_task_description'),
  };

  const onFormatDate = (date?: Date) => {
    return formatDateString(date?.toISOString(), 'YYYY-MM-DD');
  };

  const onCancelClick = () => {
    onCancel();
    toggleHideDialog();
  };

  // useEffect(() => {
  //   if (task) {
  //     setTile(task?.title);
  //     setDescription(task.description);
  //     setDate(stringToDateTime(task?.due_date || ''));
  //     setTime(stringToDateTime(task?.due_date || ''));
  //     setState({ key: task.status, text: getStateText(task.status) });
  //     setPriority({ key: task.priority, text: getPriorityText(task.status) });
  //     setTags(task.tags);
  //   }
  // }, []);

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
              minDate={task ? undefined : getNow()}
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
          selectedKey={state?.key}
          onChange={onStateChange}
        />
        <Dropdown
          label={lang('form_task.priority')}
          options={priorityOptions}
          placeholder={lang('form_task.priority_placeholder')}
          selectedKey={priority?.key}
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
            {loading ? <Spinner size={SpinnerSize.small} /> : submitLabel}
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
          <DefaultButton onClick={onCancelClick}>{lang('button.yes')}</DefaultButton>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default memo(FormTask);
