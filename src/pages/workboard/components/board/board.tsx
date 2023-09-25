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
import { getCardsMap, isEmptyObject, reorderCards, reorderColumns } from '../helper';
import { CardsMap, IBoard, IColumn, IDrag } from '../types';

const Board: React.FC<IBoard> = (props) => {
  const initialDefaultCards: CardsMap = useMemo(() => {
    return getCardsMap(
      props.defaultColumns || [],
      props.defaultCards || [],
      props.columnsProps?.keyField || '',
    );
  }, []);

  const controlledCards: CardsMap = useMemo(() => {
    return getCardsMap(
      props.columns || [],
      props.cards || [],
      props.columnsProps?.keyField || '',
    );
  }, [props.cards]);

  const [defaultColumns, setDefaultColumns] = useState<IColumn[]>(
    props.defaultColumns || [],
  );
  const columnsData = props.columns || defaultColumns;
  const [defaultCards, setDefaultCards] = useState<CardsMap>(initialDefaultCards);
  const cardsData = !isEmptyObject(defaultCards) ? defaultCards : controlledCards;

  const handleDragEnd = (result: DropResult) => {
    // type show droppable location
    const { type, source, destination } = result;

    if (type === 'COLUMN') {
      const newMapCards = reorderCards(result, cardsData);

      if (props.onCardDragEnd) {
        const card = cardsData[source.droppableId][source.index];
        const sourceCard: IDrag = {
          key: source.droppableId,
          index: source.index,
        };
        const destinationCard: IDrag = {
          key: destination?.droppableId || '',
          index: destination?.index || -1,
        };
        props.onCardDragEnd(newMapCards, card, sourceCard, destinationCard);
      }
      props.defaultCards && newMapCards && setDefaultCards(newMapCards);
    }

    if (type === 'BOARD') {
      const newOrderColumns = reorderColumns(result, columnsData);

      if (props.onColumnDragEnd) {
        const column = columnsData[source.index];
        props.onColumnDragEnd(newOrderColumns, column, source.index, destination?.index);
      }
      props.defaultColumns && newOrderColumns && setDefaultColumns(newOrderColumns);
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
      props.onCardDragStart?.(card);
    }

    if (type === 'BOARD') {
      const column = columnsData[source.index];
      props.onColumnDragStart?.(column);
    }
  };

  const handleDrag = (update: DragUpdate) => {
    // type show droppable location
    const { type, source } = update;

    if (type === 'COLUMN') {
      const card = cardsData[source.droppableId][source.index];
      props.onCardDrag?.(card);
    }

    if (type === 'BOARD') {
      const column = columnsData[source.index];
      props.onColumnDrag?.(column);
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
