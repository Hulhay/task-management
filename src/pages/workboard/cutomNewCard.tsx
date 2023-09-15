import { useState } from 'react';
import { FormState, NewCardFormProps } from 'react-trello-ts/dist/components/NewCardForm';

interface ExtendedFormState extends FormState {
  assignee: string;
}

export const CustomNewCard: React.FC<NewCardFormProps> = ({
  onCancel,
  onAdd,
  laneId,
}) => {
  const [title, setTitle] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onAssigneeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssignee(event.target.value);
  };

  const handleAdd = () => {
    const newCardData: ExtendedFormState = {
      label: '',
      laneId,
      title: title,
      description: '',
      assignee: assignee,
    };

    onAdd(newCardData);
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 3,
        border: '1px solid #eee',
        padding: 5,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            style={{ padding: 5 }}
            onChange={onTitleChange}
          />
          <input
            type="text"
            placeholder="Assignee"
            value={assignee}
            style={{ padding: 5 }}
            onChange={onAssigneeChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 5 }}>
          <button
            onClick={onCancel}
            style={{
              padding: 9,
              border: 'none',
              backgroundColor: '#FFCCCB',
              borderRadius: 6,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            style={{
              padding: 9,
              border: 'none',
              backgroundColor: 'lightgreen',
              borderRadius: 6,
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
