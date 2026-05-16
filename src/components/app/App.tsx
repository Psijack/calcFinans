import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.sass';
import Menu from "../Menu/Menu"
import SpendingIncome from '../SpendingIncome/SpendingIncome';
import TotalCapital from '../TotalCapital/TotalCapital';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Menu становится родителем, его Outlet будет показывать детей */}
        <Route path="/" element={<Menu />}>
          <Route path="TotalCapital" element={<TotalCapital />} />
          <Route path="SpendingIncome" element={<SpendingIncome />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
