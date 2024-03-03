import { ListProps } from "@/lib/types";
import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";

interface CreateCard extends ListProps {
    cardName: string;
}

export const handleCreateCard = async ({ cardName, valueId, getData }: CreateCard) => {
    try {
      const response = await fetch(`${serverUrl}/user/cards/create/${valueId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardName })
    })
    if (response.ok) {
        const responseData = await response.json();
        toast(`Created card ${responseData.CardName}`);
        getData();
    } else {
        console.error(response.status, response.statusText);
        toast('Something went wrong!');
    }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};