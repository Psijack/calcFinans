import { useState } from 'react';
import { useAuth } from '../AutoContext/AutoContext';  // ← Поправь путь, если нужно
import { useNavigate, Link } from 'react-router-dom';

import './Login.sass'
const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const success = await login(email.trim(), password);

        if (success) {
            navigate('/TotalCapital', { replace: true }); // или просто navigate('/')
        } else {
            setError('Неверный email или пароль');
        }

        setIsLoading(false);
    };

    return (
        <div className="login-wrapper">
            <h2>Вход в аккаунт</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ваш пароль"
                        required 
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Входим...' : 'Войти'}
                </button>

                {error && <p className="error">{error}</p>}
            </form>

            <div className="links">
                <p>
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
                <p>
                    <Link to="/forgot-password">Забыли пароль?</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;