import { fetchBoard } from "@/api/board";
import { fetchFilteredLists } from "@/api/list";
import { BoardItem, List } from "@/lib/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

type BoardContextProps = {
    boardData: BoardItem | null;
    listsData: List[] | null;
    // setBoardData: (board: BoardItem) => void;
    setListsData: (list: List[]) => void;
    fetchData: () => void;
};

const BoardContext = createContext<BoardContextProps>({
    boardData: null,
    listsData: null,
    // setBoardData: () => {},
    setListsData: () => {},
    fetchData: () => {},
})

type BoardProviderProps = {
    children: ReactNode;
}

export const useBoardStore = () => {
    return useContext(BoardContext);
}

const BoardProvider = ({ children }: BoardProviderProps) => {
    const { boardId } = useParams();
    const [searchParams] = useSearchParams();
    const [boardData, setBoardData] = useState<BoardItem | null>(null);
    const [listsData, setListsData] = useState<List[] | null>(null);
  
    const order = searchParams.get("order");
    // const orderBy = searchParams.get("orderBy");
    
    // const getData = async () => {
    const fetchData = async () => {
        const [boardData, listsData] = await Promise.all([fetchBoard(boardId as string), fetchFilteredLists({ valueId: boardId as string, order: order as string })]);
        setBoardData(boardData);
        setListsData(listsData);
    };
    
    useEffect(() => {
      fetchData();
    }, []);
    
    // const fetchData = useCallback(() => {
    //   getData();
    // }, [getData]);
  return (
    <BoardContext.Provider value={{ boardData, listsData, fetchData, setListsData }}>
      { children }
    </BoardContext.Provider>
  )
}

export default BoardProvider;