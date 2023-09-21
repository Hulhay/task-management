import { Header } from '../../components';
import { lang } from '../../utils';
import { Board } from './components';
import { cards, lanes } from './dummy';
import { cardsProps, columnProps } from './workboardProps';

const Workboard: React.FC = () => {
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
