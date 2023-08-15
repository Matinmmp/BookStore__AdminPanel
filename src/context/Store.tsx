import { createContext, useState } from 'react';
import { Theme, User } from '../models/Types';

interface IContextProps {
    isMenuOpen: boolean,
    handleIsMenuOpen: () => void

    user?: User,
    getUser: (user: User) => void

    theme: any;
    getTheme: (theme: string) => void
}

type Props = {
    children: JSX.Element[]
}


const MainContext = createContext({} as IContextProps);


const MainProvider = (props: Props) => {
    const savedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme'):'system';
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User>();
    const [theme, setTheme] = useState(savedTheme);

    const getUser = (user: User) => setUser(user);
    const getTheme = (theme: string) => {
        localStorage.setItem('theme', theme);
        setTheme(theme);
    }
    const handleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    return <MainContext.Provider value={{ isMenuOpen, handleIsMenuOpen, user, getUser, theme, getTheme }} >{...props.children}</MainContext.Provider>
}


export { MainContext, MainProvider }