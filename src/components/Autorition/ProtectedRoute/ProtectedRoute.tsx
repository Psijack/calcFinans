import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AutoContext/AutoContext";

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Показываем загрузку пока проверяем авторизацию
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    // Если пользователь НЕ авторизован — отправляем на логин
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Если авторизован — показываем содержимое (Outlet)
    return <Outlet />;
};