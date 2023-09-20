import { Label } from '@fluentui/react';

import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, ICardProps } from './components';
import { cards, lanes } from './dummy';

export type borderColorByPriority = {
  [x: string]: string;
};
export interface ICustomCard {
  cardTitle: string;
  cardPriority: string;
}

export const CustomCard: React.FC<ICustomCard> = ({ cardTitle, cardPriority }) => {
  const borderColor: borderColorByPriority = {
    low: 'red',
    medium: 'purple',
    high: 'orange',
  };

  return (
    <>
      <div
        style={{ borderLeft: `8px solid ${borderColor[cardPriority]}`, paddingLeft: 5 }}
      >
        <Label>{cardTitle}</Label>
      </div>
    </>
  );
};

const Workboard: React.FC = () => {
  const cardsProps: ICardProps = {
    onRender: (card: any) => {
      return <CustomCard cardTitle={card.title} cardPriority={card.priority} />;
    },
  };

  return (
    <>
      <Header title={lang('workboard.header')} />
      <Board
        columns={lanes}
        cards={cards}
        columnProps={{ key: 'status' }}
        cardProps={cardsProps}
      />
    </>
  );
};

export default Workboard;
