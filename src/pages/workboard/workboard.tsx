import { Label } from '@fluentui/react';

import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, ICardProps, IColumnProps } from './components';
import { cards, lanes } from './dummy';

export type borderColorByPriority = {
  [x: string]: string;
};
export interface ICustomCard {
  cardTitle: string;
  cardPriority: string;
}

export interface ICustomGlobalFooterColumn {
  maxCard: number;
}

export const CustomCard: React.FC<ICustomCard> = ({ cardTitle, cardPriority }) => {
  const borderColor: borderColorByPriority = {
    low: 'blue',
    medium: 'purple',
    high: 'orange',
  };

  return (
    <div
      style={{
        borderLeft: `8px solid ${borderColor[cardPriority]}`,
        paddingLeft: 5,
        backgroundColor: 'white',
      }}
    >
      <Label>{cardTitle}</Label>
    </div>
  );
};

export const CustomGlobalFooterColumn: React.FC<ICustomGlobalFooterColumn> = ({
  maxCard,
}) => {
  return <div style={{ textAlign: 'center' }}>max card: {maxCard}</div>;
};

const Workboard: React.FC = () => {
  const cardsProps: ICardProps = {
    onRender: (card: any) => {
      return <CustomCard cardTitle={card.title} cardPriority={card.priority} />;
    },
  };

  const columnProps: IColumnProps = {
    key: 'status',
    onRenderFooter: (column: any) => {
      return <CustomGlobalFooterColumn maxCard={column.data.max} />;
    },
  };

  return (
    <>
      <Header title={lang('workboard.header')} />
      <Board
        columns={lanes}
        cards={cards}
        columnProps={columnProps}
        cardProps={cardsProps}
      />
    </>
  );
};

export default Workboard;
