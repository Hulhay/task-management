import { Stack } from '@fluentui/react';
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd';
import React, { useMemo, useState } from 'react';

import { AddColumn } from '../addColumn';
import { ColumnComponent } from '../column';
import { getCardsMap, reorder, reorderCardsMap } from '../helper';
import { CardsMap, IBoard, IColumn } from '../types';

const Board: React.FC<IBoard> = (props) => {
  const initialCards: CardsMap = useMemo(() => {
    return getCardsMap(
      props.defaultColumns || [],
      props.defaultCards || [],
      props.columnsProps?.keyField || '',
    );
  }, []);

  const [columnsData, setColumnsData] = useState<IColumn[]>(props.defaultColumns || []);
  const [cardsData, setCardsData] = useState<CardsMap>(initialCards);

  const reorderColumns = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newLanesData = reorder(columnsData, source.index, destination.index);
    setColumnsData(newLanesData);
  };

  const reorderCards = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newCardsData = reorderCardsMap(cardsData, source, destination);
    setCardsData(newCardsData);
  };

  const handleDragEnd = (result: DropResult) => {
    // type show droppable location
    const { type, source, destination } = result;

    if (type === 'COLUMN') {
      reorderCards(result);
      const card = cardsData[source.droppableId][source.index];
      if (props.onCardDragEnd) {
        props.onCardDragEnd(
          card,
          { key: source.droppableId, index: source.index },
          {
            key: destination?.droppableId || '',
            index: destination?.index || -1,
          },
        );
      }
    }

    if (type === 'BOARD') {
      reorderColumns(result);
      if (props.onColumnDragEnd) {
        props.onColumnDragEnd(
          columnsData[source.index],
          source.index,
          destination?.index,
        );
      }
    }
  };

  const handleCardClick = (event: React.MouseEvent, card: any) => {
    event.stopPropagation();
    props.onCardClick?.(card);
  };

  const handleCardDoubleClick = (event: React.MouseEvent, card: any) => {
    event.stopPropagation();
    props.onCardDoubleClick?.(card);
  };

  const handleColumnClick = (event: React.MouseEvent, column: any) => {
    props.onColumnClick?.(column);
  };

  const handleDragStart = (start: DragStart) => {
    // type show droppable location
    const { type, source } = start;

    if (type === 'COLUMN') {
      const card = cardsData[source.droppableId][source.index];
      if (props.onCardDragStart) {
        props.onCardDragStart(card);
      }
    }

    if (type === 'BOARD') {
      const column = columnsData[source.index];
      if (props.onColumnDragStart) {
        props.onColumnDragStart(column);
      }
    }
  };

  const handleDrag = (update: DragUpdate) => {
    // type show droppable location
    const { type, source } = update;

    if (type === 'COLUMN') {
      const card = cardsData[source.droppableId][source.index];
      if (props.onCardDrag) {
        props.onCardDrag(card);
      }
    }

    if (type === 'BOARD') {
      const column = columnsData[source.index];
      if (props.onColumnDrag) {
        props.onColumnDrag(column);
      }
    }
  };

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <Droppable
        droppableId="board"
        type="BOARD"
        direction={props.columnOrientation === 'horizontal' ? 'vertical' : 'horizontal'}
      >
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack
              className="board"
              tokens={{ childrenGap: 5 }}
              horizontal={props.columnOrientation === 'horizontal' ? false : true}
            >
              {Object.values(columnsData).map((column, index) => (
                <ColumnComponent
                  key={column.key}
                  index={index}
                  column={column}
                  cards={cardsData[column.key]}
                  columnProps={props.columnsProps}
                  cardsProps={props.cardsProps}
                  isDraggable={props.dragColumnEnabled}
                  columnOrientation={props.columnOrientation}
                  onCardClick={handleCardClick}
                  onCardDoubleClick={handleCardDoubleClick}
                  onColumnClick={handleColumnClick}
                />
              ))}
              {provided.placeholder}
              {props.addColumnEnabled === false ? null : props.onRenderAddColumnButton ? (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div onClick={props.onAddColumnClick}>
                  {props.onRenderAddColumnButton()}
                </div>
              ) : (
                <AddColumn onAddColumnClick={props.onAddColumnClick} />
              )}
            </Stack>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
