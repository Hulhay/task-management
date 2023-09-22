import { Icon, Label, Stack } from '@fluentui/react';
import { useState } from 'react';

const AddColumn: React.FC = () => {
  const [bcAddColumn, setBcAddColumn] = useState<string>('#ffffff');

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{
        root: {
          border: '2px dashed #454545',
          padding: 10,
          cursor: 'pointer',
          backgroundColor: bcAddColumn,
        },
      }}
      onMouseEnter={() => setBcAddColumn('#eeeeee')}
      onMouseLeave={() => setBcAddColumn('#ffffff')}
    >
      <Label styles={{ root: { cursor: 'pointer' } }}>
        <Icon iconName="Add" />
      </Label>
      <Label styles={{ root: { cursor: 'pointer' } }}>Add Column</Label>
    </Stack>
  );
};

export default AddColumn;