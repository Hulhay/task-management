import Board from 'react-trello-ts';

import { Header } from '../../components';
import { lang } from '../../utils';
import { CustomCard } from './customCard';
import { dummyData } from './dummy';

const Workboard: React.FC = () => {
  const data = dummyData;
  const style: React.CSSProperties = {
    margin: '0px 0px 0px 15px',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const onCardClick = (cardId: string) => {
    console.log(`${cardId} clicked`);
  };

  const onCardMoveAcrossLanes = (
    fromLaneId: string,
    toLaneId: string,
    cardId: string,
  ) => {
    console.log(`card ${cardId} move from ${fromLaneId} to ${toLaneId}`);
  };

  return (
    <div style={style}>
      <Header title={lang('workboard.header')} />
      <Board
        data={data}
        draggable
        cardDragClass="draggingCard"
        laneDragClass="draggingLabel"
        onCardClick={onCardClick}
        onCardMoveAcrossLanes={onCardMoveAcrossLanes}
        components={{ Card: CustomCard }}
      />
      <style>
        {`
          .react-trello-lane {
            background-color: lightgreen;
            padding-bottom: 50px;
          }
          .react-trello-lane.todo {
            background-color: lightblue;
          }
        `}
      </style>
    </div>
  );
};

export default Workboard;
