import { ListProps } from "@/lib/types";
import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";

interface CreateCard extends ListProps {
    cardName: string;
}

interface CardProps extends ListProps {
    cardName?: string;
    description?: string;
    dueDate?: Date;
}

export const handleCreateCard = async ({ cardName, valueId }: CreateCard) => {
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
    } else {
        console.error(response.status, response.statusText);
        toast('Something went wrong!');
    }
    } catch (err) {
        console.error(err);
        toast('Something went wrong!');
    }
};

export const deleteCard = async ({ valueId }: ListProps) => {
    try {
        await fetch(`${serverUrl}/user/cards/delete/${valueId}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
                toast('Deleted Card successfully!');
            } else {
                toast('Something went wrong!');
            }
        })
    } catch (err) {
        console.error(err);
    }
};

export const handleUpdateCard = async ({ description, dueDate, valueId }: CardProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/updateCardDetails/${valueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                // cardName: ,
                dueDate: dueDate,
                description: description,
            }),
        });
        if (response.ok) {
            console.log("success")
        }
    } catch (error) {
        console.error(error);
    }
};

export const handleUpdateDnd = async ({ valueId, listId }: { valueId: string, listId: string }) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/updateCardDnd/${valueId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listId }),
        });
        if (!response.ok) {
            toast('Failed to update Drag & drop data!');
        }
    } catch (error) {
        console.error(error);
    }
};