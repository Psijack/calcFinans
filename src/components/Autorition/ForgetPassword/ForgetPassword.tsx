import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../fetch/fetch';

import './ForgotPassword.sass'
import '../authMedia.sass'

interface User{
    userId: number;
    email:string;
    name: string;
    password: string;
}

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ user, setUser] = useState<User[]>()

    useEffect(()=>{
        getUser().then((users:User[])=>{
            setUser(users)
        })        
    },[])

    console.log(user);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        if(email === ''){
            setMessage('Вы не ввели email')
        }else{
            if(user?.some(user=>user.email === email)){
                setMessage(`На email ${email} отправлена ссылка для восстановления пароля.`);
            }else{
                setMessage('Ваше email нету в базе, пожалуйста зарегистрируйтесь')
            }
        }
    }


    return (
        <div className="auth__forgot-wrapper">
            <h2>Восстановление пароля</h2>
            <p>Введите email, на который мы отправим ссылку для сброса пароля</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required 
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Отправка...' : 'Отправить ссылку'}
                    </button>
                </div>
                
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
            </form>

            <p>
                <Link to="/login">← Вернуться ко входу</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;