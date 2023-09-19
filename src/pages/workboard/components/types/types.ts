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
  cards: Record<string, Card>;
};

export type Lanes = Record<string, Lane>;

export interface IBoard {
  lanes: Lanes;
  cards: Cards;
  onDragEnd?: () => void;
}
