import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TaskContext = createContext();

export const useTask = () => {
    return useContext(TaskContext);
};

const TaskProvider = ({ children }) => {
    // const [tokenData, setTokenData] = useState(null);
    const [activeCard, setActiveCard] = useState(false);
    const [cardItem, setCardItem] = useState(
        localStorage.getItem('activeCard') || []
    );

    const setCard = (card) => {
        setCardItem(card)
    };

    const setCardTrue = () => {
        setActiveCard(true);
    };

    const setCardFalse = () => {
        setActiveCard(false);
    };

    useEffect(() => {
        localStorage.setItem('activeCard', JSON.stringify(cardItem))
    }, [cardItem]);

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken')

    //     if (token) {
    //         const decodedToken = jwtDecode(token)
    //         setTokenData(decodedToken)
    //     }
    // }, [])

  return (
    <TaskContext.Provider value={{ cardItem, setCard, activeCard, setCardTrue, setCardFalse }}>
        { children }
    </TaskContext.Provider>
  )
}

export default TaskProvider