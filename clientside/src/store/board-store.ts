import { BoardItem, List } from "@/lib/types";
import { create } from "zustand";

type BoardStore = {
    boardData: BoardItem | null;
    listData: List[] | null;
    setBoardData: (board: BoardItem) => void;
    setListData: (list: List[]) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
    boardData: null,
    listData: null,
    setBoardData: (board) => {
        set((state) => ({ ...state, board }))
    },
    setListData: (list) => {
        set((state) => ({ ...state, list }))
    }
}));

/*
Board
    data
    set board data
    delete board

List
    data
    set list data
    delete list

Card
    data
    set card data
    delete card

*/