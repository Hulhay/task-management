import { DetailsList, SelectionMode } from '@fluentui/react';
import React from 'react';

import { FilterBox, Header } from './components';
import { dummyResponse } from './dummy';
import { Columns } from './homeProps';

const Home = () => {
  const data = dummyResponse;
  const style: React.CSSProperties = {
    margin: '0px 15px',
    width: '100%',
  };

  return (
    <div style={style}>
      <Header />
      <FilterBox />
      <DetailsList
        items={data.data}
        columns={Columns}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default Home;
