import { IStackTokens, Stack } from '@fluentui/react';
import { memo } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import { titleCase } from '../../../../helper';
import pallete from '../../../../utils/theme/default';
import { labelStyle } from './stateLabelStyle';

interface IStateLabel {
  state: string;
}

const StateLabel: React.FC<IStateLabel> = ({ state }) => {
  const stateColor = (state: string) => {
    switch (state) {
      case 'todo':
        return pallete.state.todo;
      case 'in-progress':
        return pallete.state.inProgress;
      case 'completed':
        return pallete.state.completed;
    }
  };

  const gapStackTokens: IStackTokens = {
    childrenGap: 5,
  };

  return (
    <Stack horizontal tokens={gapStackTokens} verticalAlign="center">
      <Stack.Item>
        <BsCircleFill color={stateColor(state)} />
      </Stack.Item>
      <Stack.Item style={labelStyle}>{titleCase(state)}</Stack.Item>
    </Stack>
  );
};

export default memo(StateLabel);
