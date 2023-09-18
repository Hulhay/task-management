import { useEffect, useState } from 'react';
import Board from 'react-trello-ts';
import { AddCardLinkComponent } from 'react-trello-ts/dist/components/AddCardLink';
import { BoardData, Card } from 'react-trello-ts/dist/types/Board';

import { Header } from '../../components';
import { lang } from '../../utils';
import { CustomNewCard } from './components';
import { CustomCard } from './customCard';
import { CustomLaneHeader } from './customLane';
import { dummyData } from './dummy';

const Workboard: React.FC = () => {
  const data = dummyData;
  const [boardData, setBoardData] = useState<BoardData>(data);

  const style: React.CSSProperties = {
    margin: '0px 0px 0px 15px',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  const onCardAdd = (card: Card) => {
    console.log(`${card.id} created with assignee ${card.assignee}`);
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

  const onDataChange = (newData: BoardData) => {
    setBoardData(newData);
  };

  const CustomAddCardLink: AddCardLinkComponent = ({ onClick }) => (
    <button onClick={onClick} style={{ padding: 5 }}>
      +
    </button>
  );

  useEffect(() => {
    onDataChange(boardData);
  }, [boardData]);

  return (
    <div style={style}>
      <Header title={lang('workboard.header')} />
      <Board
        data={boardData}
        editable
        cardDragClass="draggingCard"
        onCardClick={onCardClick}
        onCardAdd={onCardAdd}
        onDataChange={onDataChange}
        onCardMoveAcrossLanes={onCardMoveAcrossLanes}
        components={{
          Card: CustomCard,
          LaneHeader: CustomLaneHeader,
          AddCardLink: CustomAddCardLink,
          NewCardForm: CustomNewCard,
        }}
        style={{ backgroundColor: 'white' }}
      />
      <style>
        {`
          .react-trello-lane {
            background-color: lightblue;
            padding-bottom: 50px;
          }
          .todo > div:nth-child(2) {
            display: flex;
            flex-direction: column-reverse;
            gap: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Workboard;
