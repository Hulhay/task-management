export type Card = {
  id: string;
  content: string;
};

export type CardProps = {
  index: number;
  card: Card;
};

export type Cards = Record<string, Card>;

export type Lane = {
  id: string;
  title: string;
  cardIDs: string[];
};

export type LaneProps = {
  index: number;
  lane: Lane;
  draggableLanes: boolean;
  verticalLanes: boolean;
  cards: Record<string, Card>;
};

export type Lanes = Record<string, Lane>;

export interface IBoard {
  lanes: Lanes;
  cards: Cards;
  draggableLanes?: boolean;
  verticalLanes?: boolean;
  onDragEnd?: () => void;
}
