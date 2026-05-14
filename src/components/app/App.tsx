import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.sass';
import Menu from "../Menu/Menu"
import Category from '../Category/Category';
import Schedule from '../Schedule/Schedule';
import SpendingIncome from '../SpendingIncome/SpendingIncome';
import TotalCapital from '../TotalCapital/TotalCapital';
import Wallets from '../Wallets/Wallets';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Menu становится родителем, его Outlet будет показывать детей */}
        <Route path="/" element={<Menu />}>
          <Route path="Category" element={<Category />} />
          <Route path="Schedule" element={<Schedule />} />
          <Route path="TotalCapital" element={<TotalCapital />} />
          <Route path="Wallets" element={<Wallets />} />
          <Route path="SpendingIncome" element={<SpendingIncome />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
