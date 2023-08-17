import { createContext, useState } from 'react';
import { User } from '../models/Types';

interface IContextProps {
    isMenuOpen: boolean,
    handleIsMenuOpen: () => void

    user?: User,
    getUser: (user: User) => void

}

type Props = {
    children: JSX.Element[]
}


const MainContext = createContext({} as IContextProps);


const MainProvider = (props: Props) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User>();
    const getUser = (user: User) => setUser(user);
    const handleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    return <MainContext.Provider value={{ isMenuOpen, handleIsMenuOpen, user, getUser, }} >{...props.children}</MainContext.Provider>
}


export { MainContext, MainProvider }