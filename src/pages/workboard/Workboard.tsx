import React, { useEffect, useState } from 'react';
import Board from 'react-trello-ts';
import { AddCardLinkComponent } from 'react-trello-ts/dist/components/AddCardLink';
import { BoardData, Card } from 'react-trello-ts/dist/types/Board';

import { Header, Loading } from '../../components';
import { taskService } from '../../service';
import { lang } from '../../utils';
import { CustomCard, CustomNewCard } from './components';
import { CustomLaneHeader } from './customLane';
import { boardData } from './workboardProps';

const Workboard: React.FC = () => {
  const [data, setData] = useState<BoardData>(boardData);
  const { response, loading, request } = taskService.getTasks({});

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

  const onCardMoveAcrossLanes = (
    fromLaneId: string,
    toLaneId: string,
    cardId: string,
  ) => {
    console.log(`card ${cardId} move from ${fromLaneId} to ${toLaneId}`);
  };

  const CustomAddCardLink: AddCardLinkComponent = ({ onClick }) => (
    <button onClick={onClick} style={{ padding: 5 }}>
      +
    </button>
  );

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    const mappedResponse = boardData.lanes.map((lane) => ({
      ...lane,
      cards: response?.data
        .filter((card) => card.status === lane.id)
        .map((card) => ({
          id: card.id,
          title: card.title,
          priority: card.priority,
          tags: card.tags.map((tag) => ({ title: tag })),
        })),
    }));
    setData({ lanes: mappedResponse });
  }, [response]);

  return (
    <div style={style}>
      <Header title={lang('workboard.header')} />
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Board
            data={data}
            editable
            cardDragClass="draggingCard"
            onCardAdd={onCardAdd}
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
        </React.Fragment>
      )}
    </div>
  );
};

export default Workboard;
