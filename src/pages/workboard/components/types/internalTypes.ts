// can only be accessed internally

import { ICardProps, IColumn, IColumnProps } from './externalTypes';

export interface CardsMap {
  [x: string]: any[];
}

export interface CardProps {
  card: any;
  index: number;
  cardsProps?: ICardProps;
}

export interface ColumnProps {
  index: number;
  column: IColumn;
  cards: any[];
  cardsProps?: ICardProps;
  columnProps?: IColumnProps;
}
