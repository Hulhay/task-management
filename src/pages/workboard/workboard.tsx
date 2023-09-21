import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, ICardProps, IColumnProps } from './components';
import { cards, lanes } from './dummy';
import { CustomCard, CustomGlobalFooterColumn } from './workboardProps';

const Workboard: React.FC = () => {
  const cardsProps: ICardProps = {
    onRender: (card: any) => {
      return <CustomCard cardTitle={card.title} cardPriority={card.priority} />;
    },
  };

  const columnProps: IColumnProps = {
    key: 'status',
    onRenderFooter: (column: any, cards: any) => {
      return (
        <CustomGlobalFooterColumn cardCount={cards.length} maxCard={column.data.max} />
      );
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
