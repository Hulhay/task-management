import { useRef } from 'react';
import { FormState, NewCardFormProps } from 'react-trello-ts/dist/components/NewCardForm';

interface ExtendedFormState extends FormState {
  assignee: string;
}

export const CustomNewCard: React.FC<NewCardFormProps> = ({
  onCancel,
  onAdd,
  laneId,
}) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const assigneeRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    const titleValue = titleRef.current?.value || '';
    const assigneeValue = assigneeRef.current?.value || '';

    const newCardData: ExtendedFormState = {
      label: '',
      laneId,
      title: titleValue,
      description: '',
      assignee: assigneeValue,
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
          <input type="text" placeholder="Title" ref={titleRef} style={{ padding: 5 }} />
          <input
            type="text"
            placeholder="Assignee"
            ref={assigneeRef}
            style={{ padding: 5 }}
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
