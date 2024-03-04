import { LabelItem, ListProps } from "@/lib/types";
import { serverUrl } from "@/lib/utils";

interface LabelProps extends ListProps {
    cardLabels: LabelItem[];
}

export const handleUpdateLabels = async ({ valueId, cardLabels, getData }: LabelProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/updateLabels/${valueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                labelIds: cardLabels.map((label) => label.LabelID)
            }),
        });
        if (response.ok) {
            getData();
        }
    } catch (error) {
        console.error('Error updating card:', error);
    }
};