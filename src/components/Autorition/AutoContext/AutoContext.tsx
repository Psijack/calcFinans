import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    userId: number | null;
}

interface AuthContextType {
    user: User |null;
    userId: number |null;
    login: (email:string, password:string) => Promise<boolean>;
    register: (name:string, email: string, password: string) => Promise<boolean>;
    logout: ()=> void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userId = user?.userId || null;

    // Проверка авторизации при загрузке
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email:string, password: string): Promise<boolean>=>{
        try{
            const res = await fetch('http://localhost:3000/users');
            const user = await res.json();

            const foundUser = user.find((u:any)=> u.email === email && u.password === password);

            if(foundUser){
                const userData = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    userId: foundUser.userId,
                }
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return true;
            };
            return false;
        }catch (error) {
            console.error(error);
            return false;
            }
    }

    const register = async (name:string, email:string, password: string): Promise<boolean> =>{
        try{
            const foundReg = await fetch('http://localhost:3000/users');
            const users = await foundReg.json();
            const userLength = users.length;
            console.log(userLength);
            if (users.some((u:any)=> u.email === email)) {
                return false;
            }

            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                userId: userLength+1,
            };

            await fetch('http://localhost:3000/users',{
                method:'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })
            return true;
        }catch (error){
            console.error(error);
            return false;
        }
    }
    const logout = () =>{
        setUser(null);
        localStorage.removeItem('user'); 
    }
    return (
        <AuthContext.Provider value={{
            user,
            userId,
            login,
            register,
            logout,
            isAuthenticated: !!user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
};