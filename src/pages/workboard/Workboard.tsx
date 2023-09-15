import { PrimaryButton } from '@fluentui/react';
import { useState } from 'react';
import Board from 'react-trello-ts';
import { BoardData, Card } from 'react-trello-ts/dist/types/Board';

import { Header } from '../../components';
import { lang } from '../../utils';
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

  const onAddCard = () => {
    const newCard: Card = {
      id: Math.random().toString(),
      title: 'dumm Buy milk',
      assignee: 'D',
      priority: 'low',
      description: '2 Gallons of milk at the Deli store',
      tags: [
        {
          title: 'tag1',
        },
        {
          title: 'tag2',
        },
      ],
    };

    const updatedBoardData: BoardData = {
      ...boardData,
      lanes: boardData.lanes.map((lane) => {
        if (lane.id === 'TODO') {
          const updatedCards = lane.cards ? [...lane.cards, newCard] : [newCard];
          // Update cards in the 'To Do' lane (adjust the lane ID as needed)
          return {
            ...lane,
            cards: updatedCards,
          };
        }
        // For other lanes, keep them as they are
        return lane;
      }),
    };
    setBoardData(updatedBoardData);
  };

  return (
    <div style={style}>
      <Header title={lang('workboard.header')} />
      <PrimaryButton style={{ width: '25%' }} onClick={onAddCard}>
        Add New Card
      </PrimaryButton>
      <Board
        data={boardData}
        draggable
        editable
        cardDragClass="draggingCard"
        laneDragClass="draggingLabel"
        onCardClick={onCardClick}
        onDataChange={onDataChange}
        onCardMoveAcrossLanes={onCardMoveAcrossLanes}
        components={{
          Card: CustomCard,
          LaneHeader: CustomLaneHeader,
        }}
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
