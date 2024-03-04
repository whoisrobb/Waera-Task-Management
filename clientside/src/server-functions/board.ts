import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";

type formData = {
    boardName: string;
    description: string;
    userId: string;
}


export const fetchUserBoards = async (userId: string) => {
    try {
        const response = await fetch(`${serverUrl}/user/boards/${userId}`)
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            toast('Something went wrong!')
        }
    } catch (err) {
        console.error(err);
    }
};


export const handleBoardCreate = async ({ formData, navigate }: { formData: formData, navigate: (to: string) => void }) => {
    try {
        const response = await fetch(`${serverUrl}/user/boards/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            const responseData = await response.json();
            toast(`Successfully created board ${responseData.BoardName}`)
            navigate(`/workspace/boards/${responseData.BoardID}`);
        } else {
            console.error(response.status, response.statusText);
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
    }
};

export const fetchBoard = async (boardId: string) => {
    try {
        const response = await fetch(`${serverUrl}/user/boards/board/${boardId}`);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            toast('Something went wrong!');
        }
    } catch (err) {
        console.error(err);
    }
};

export const deleteBoard = async ({ boardId, userId, navigate }: { boardId: string, userId: string, navigate: (to: string) => void }) => {
    try {
        await fetch(`${serverUrl}/user/boards/delete/${boardId}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
                toast('Deleted Board successfully');
                navigate(`/workspace/${userId}`);
            } else {
                toast('Something went wrong!');
            }
        })
    } catch (err) {
        console.error(err);
    }
};