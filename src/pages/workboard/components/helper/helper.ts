import { DraggableLocation } from '@hello-pangea/dnd';

import { Card, CardsMap, Lane } from '../types';

export const getCardsMap = (lanes: Lane[], cards: Card[]): CardsMap => {
  const cardsMap: CardsMap = {};
  lanes.forEach((lane) => {
    cardsMap[lane.id] = [];
  });

  cards.forEach((card) => {
    if (cardsMap[card.laneID]) {
      cardsMap[card.laneID].push(card);
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
