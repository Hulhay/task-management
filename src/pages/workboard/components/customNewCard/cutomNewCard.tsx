import {
  DefaultButton,
  Dropdown,
  IDropdownOption,
  IStackStyles,
  IStackTokens,
  Label,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
} from '@fluentui/react';
import { memo, useState } from 'react';
import { FormState, NewCardFormProps } from 'react-trello-ts/dist/components/NewCardForm';

import {
  formatDateString,
  getNow,
  priorityOptions,
  stateOptions,
} from '../../../../helper';
import { taskService } from '../../../../service';
import { lang } from '../../../../utils';

interface ExtendedFormState extends FormState {
  priority: IDropdownOption;
}

const style: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 3,
  border: '1px solid #eee',
  padding: 5,
};

const stackToken: IStackTokens = {
  childrenGap: 5,
};

const buttonStackStyle: IStackStyles = {
  root: {
    justifyContent: 'end',
  },
};

const CustomNewCard: React.FC<NewCardFormProps> = ({ onCancel, onAdd, laneId }) => {
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<IDropdownOption>(priorityOptions[0]);
  const { loading, request } = taskService.createTask({
    title,
    description: '-',
    due_date: formatDateString(getNow().toISOString(), 'YYYY-MM-DD HH:mm:ss'),
    priority: priority.key as string,
    status: stateOptions[0].key as string,
    tags: [],
  });

  const onTitleChange = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    title?: string,
  ) => {
    if (!title || title.length <= 100) {
      setTitle(title || '');
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

  const handleAdd = () => {
    const newCardData: ExtendedFormState = {
      label: '',
      laneId,
      title: title,
      description: '',
      priority: priority,
    };

    request();
    onAdd(newCardData);
  };
  return (
    <div style={style}>
      <Stack tokens={stackToken}>
        <Label>{lang('add_task.header')}</Label>
        <Stack tokens={stackToken}>
          <TextField
            placeholder={lang('form_task.title')}
            onChange={onTitleChange}
            value={title}
          />
          <Dropdown
            options={priorityOptions}
            placeholder={lang('form_task.priority_placeholder')}
            selectedKey={priority?.key}
            onChange={onPriorityChange}
          />
        </Stack>
        <Stack horizontal tokens={stackToken} styles={buttonStackStyle}>
          <DefaultButton onClick={onCancel}>{lang('button.cancel')}</DefaultButton>
          <PrimaryButton onClick={handleAdd}>
            {loading ? <Spinner size={SpinnerSize.small} /> : lang('button.submit')}
          </PrimaryButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default memo(CustomNewCard);
