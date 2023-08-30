import { createContext, useState } from 'react';
import { User } from '../models/Types';



type Quantity = {
    id: string
    quantity: number
}

type Price = {
    id: string
    price: number
}

interface IContextProps {
    isMenuOpen: boolean,
    handleIsMenuOpen: () => void
    user?: User,
    getUser: (user: User) => void

    quantitiesProdutList: Quantity[]
    addToQuantitiesProdutList: (item: Quantity) => void

    pricesProdutList: Price[]
    addToPricesProdutList: (item: Price) => void

    clearQuantitesAndPrices: () => void
}


type Props = {
    children: JSX.Element[]
}


const MainContext = createContext({} as IContextProps);


const MainProvider = (props: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User>();

    const [quantitiesProdutList, setQuantitiesProdutList] = useState<Quantity[]>([])
    const [pricesProdutList, setPricesProdutList] = useState<Price[]>([])

    const addToQuantitiesProdutList = (qItem: Quantity) => {
        const newList = quantitiesProdutList.filter((item) => item.id !== qItem.id)
        setQuantitiesProdutList([...newList, qItem]);
    }

    const addToPricesProdutList = (pItem: Price) => {
        const newList = pricesProdutList.filter((item) => item.id !== pItem.id);
        setPricesProdutList([...newList, pItem]);
    }

    const clearQuantitesAndPrices = () => {
        setPricesProdutList([]);
        setQuantitiesProdutList([]);
    }

    const getUser = (user: User) => setUser(user);
    const handleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    return <MainContext.Provider value={{
        isMenuOpen, handleIsMenuOpen, user, getUser, quantitiesProdutList, pricesProdutList,
        addToQuantitiesProdutList, addToPricesProdutList,clearQuantitesAndPrices
    }} >{...props.children}</MainContext.Provider>
}


export { MainContext, MainProvider }