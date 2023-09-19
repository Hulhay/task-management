import { Header } from '../../components';
import { lang } from '../../utils';
import { Board } from './components';
import { cards, lanes } from './dummy';

const Workboard: React.FC = () => {
  // const onDragEnd = () => {
  //   console.log('from optional dragEnd');
  // };

  return (
    <>
      <Header title={lang('workboard.header')} />
      <Board lanes={lanes} cards={cards} draggableLanes />
    </>
  );
};

export default Workboard;
