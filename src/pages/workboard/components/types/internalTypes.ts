// can only be accessed internally

import { ICardsProps, IColumn, IColumnsProps } from './externalTypes';

export interface CardsMap<T = any> {
  [x: string]: T[];
}

export interface CardKanbanProps {
  card: any;
  index: number;
  cardsProps?: ICardsProps;
}

export interface ColumnKanbanProps {
  cards: any[];
  index: number;
  column: IColumn;
  isDraggable?: boolean;
  columnOrientation?: 'vertical' | 'horizontal';
  cardsProps?: ICardsProps;
  columnProps?: IColumnsProps;
}
