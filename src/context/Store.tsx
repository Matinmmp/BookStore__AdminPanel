import { createContext, useState } from 'react';

interface IContextProps {
    isMenuOpen: boolean,
    handleIsMenuOpen: () => void
}

type Props = {
    children:JSX.Element
}


const MainContext = createContext({} as IContextProps);

const MainProvider = (props:Props) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    return <MainContext.Provider value={{ isMenuOpen, handleIsMenuOpen }} >{props.children}</MainContext.Provider>
}


export { MainContext, MainProvider }