import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from '../Autorition/AutoContext/AutoContext';
import { ProtectedRoute } from '../Autorition/ProtectedRoute/ProtectedRoute';

import Login from '../Autorition/Login/Login';
import Register from '../Autorition/Registration/Registration';
import ForgotPassword from '../Autorition/ForgetPassword/ForgetPassword';

import './App.sass';
import Menu from "../Menu/Menu"
import SpendingIncome from '../SpendingIncome/SpendingIncome';
import TotalCapital from '../TotalCapital/TotalCapital';
import Reports from '../Report/Report';

function App() {
  return (
    <>
   <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Публичный маршрут логина */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Защищённая зона */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Menu />}>
                            <Route index element={<Navigate to="/TotalCapital" replace />} />
                            <Route path="TotalCapital" element={<TotalCapital />} />
                            <Route  path="SpendingIncome" element={<SpendingIncome/>} />
                            <Route path="Reports" element={<Reports />} />
                        </Route>
                    </Route>

                    {/* Если пользователь зашёл на любой неизвестный путь — на логин */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
