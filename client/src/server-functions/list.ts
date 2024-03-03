import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";

export const fetchLists = async (boardId: string) => {
    try {
        const response = await fetch(`${serverUrl}/user/lists/${boardId}`);
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