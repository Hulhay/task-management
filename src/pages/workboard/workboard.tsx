import { Header } from '../../components';
import { lang } from '../../utils';
import { Board, IDrag } from './components';
import { cards, columns } from './dummy';
import { cardsProps, columnProps } from './workboardProps';

const Workboard: React.FC = () => {
  const onCardDragEnd = (cardItem: any, source?: IDrag, destination?: IDrag) => {
    console.log(`${cardItem.id} move from ${source?.key} to ${destination?.key}`);
  };

  const onColumnDragEnd = (
    columnItem: any,
    sourceIndex?: number,
    destinationIndex?: number,
  ) => {
    console.log(
      `${columnItem.key} move from index ${sourceIndex} to ${destinationIndex}`,
    );
  };

  return (
    <>
      <Header title={lang('workboard.header')} />
      <Board
        defaultColumns={columns}
        defaultCards={cards}
        columnOrientation="horizontal"
        dragColumnEnabled={false}
        columnsProps={columnProps}
        cardsProps={cardsProps}
        onCardDragEnd={onCardDragEnd}
        onColumnDragEnd={onColumnDragEnd}
      />
    </>
  );
};

export default Workboard;
