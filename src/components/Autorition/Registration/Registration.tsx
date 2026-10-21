import { useState ,useEffect} from 'react';
import { useAuth } from '../AutoContext/AutoContext'; // ← поправь путь если нужно
import { useNavigate, Link } from 'react-router-dom';

import { getUser } from '../../fetch/fetch';

import './Registration.sass'
import '../authMedia.sass'
interface User{
    userId: number;
    email:string;
    name: string;
    password: string;
}

const Register =() => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [user,setUser] = useState<User[]>();

    const { register} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
            getUser().then((users: User[])=>{
                setUser(users) 
            })
            
    },[])

    console.log(user);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (password.length < 6) {
            setError('Пароль должен быть минимум 6 символов');
            return;
        }


        if (user?.some(item => item.password === password)) {
            setError('Такой пароль существует');
            return;
        }
        if (user?.some(item => item.name === name)) { 
            setError('Такое имя уже существует');
            return;
        }

        if (user?.some(item => item.email === email)) { 
            setError('Такое email уже существует');
            return;
        }

        setIsLoading(true);

        const success = await register(name, email, password);

        if (success) {
            alert('Регистрация успешна! Теперь можете войти.');
            navigate('/login');
        } else {
            setError('Попробуй-те позже');
        }

        setIsLoading(false);
    };

    return (
        <div className="auth-wrapper">
            <h2>Регистрация</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        required 
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required 
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Минимум 6 символов"
                        required 
                    />
                </div>

                

                <div>
                    <label>Повторите пароль:</label>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Повторите пароль"
                        required 
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>

                {error && <p className="error">{error}</p>}
            </form>

            <p>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default Register;