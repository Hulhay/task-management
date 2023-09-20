import { DraggableLocation } from '@hello-pangea/dnd';

import { CardsMap, IColumn } from '../types';

export const getCardsMap = (columns: IColumn[], cards: any[], key: string): CardsMap => {
  const cardsMap: CardsMap = {};
  columns.forEach((column) => {
    cardsMap[column.key] = [];
  });

  cards.forEach((card) => {
    if (cardsMap[card[key]]) {
      card.draggableID = Math.random().toString(16).slice(2);
      cardsMap[card[key]].push(card);
    }
  });

  return cardsMap;
};

export const reorder = <T>(
  list: T[],
  sourceIndex: number,
  destinationIndex: number,
): T[] => {
  const result = [...list];
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};

export const reorderCardMap = (
  cardsData: CardsMap,
  source: DraggableLocation,
  destination: DraggableLocation,
) => {
  const newCardsData = { ...cardsData };

  if (source.droppableId === destination.droppableId) {
    newCardsData[source.droppableId] = reorder(
      cardsData[source.droppableId],
      source.index,
      destination.index,
    );
    return newCardsData;
  }

  const sourceLaneCards = [...cardsData[source.droppableId]];
  const destinationLaneCards = [...cardsData[destination.droppableId]];

  const [movedCard] = sourceLaneCards.splice(source.index, 1);
  destinationLaneCards.splice(destination.index, 0, movedCard);

  newCardsData[source.droppableId] = sourceLaneCards;
  newCardsData[destination.droppableId] = destinationLaneCards;

  return newCardsData;
};
