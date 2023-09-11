import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '../pages';

const Navigations = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigations;
