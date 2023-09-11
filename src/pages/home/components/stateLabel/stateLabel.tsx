import { memo } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import { titleCase } from '../../../../helper';
import pallete from '../../../../utils/theme/default';
import { stateLabelStyle } from './stateLabelStyle';

interface IStateLabel {
  state: string;
}

const StateLabel = ({ state }: IStateLabel) => {
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

  return (
    <div style={stateLabelStyle}>
      <BsCircleFill color={stateColor(state)} />
      <p>{titleCase(state)}</p>
    </div>
  );
};

export default memo(StateLabel);
