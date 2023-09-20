export interface Card {
  id: string;
  content: string;
  laneID: string;
}

export interface CardProps {
  index: number;
  card: Card;
}

export type Lane = {
  id: string;
  title: string;
};

export type LaneProps = {
  index: number;
  lane: Lane;
  draggableLanes: boolean;
  verticalLanes: boolean;
  cards: Card[];
};

export type CardsMap = Record<string, Card[]>;

export interface IBoard {
  lanes: Lane[];
  cards: Card[];
  draggableLanes?: boolean;
  verticalLanes?: boolean;
  onDragEnd?: () => void;
}
