import { LabelItem, ListProps } from "@/lib/types";
import { randomColor, serverUrl } from "@/lib/utils";

interface LabelProps extends ListProps {
    labels: LabelItem[];
}

export const handleAddLabel = async ({ valueId, labels }: LabelProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/updateLabels/${valueId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ labels }),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error updating card:', error);
    }
};

export const fetchLabels = async () => {
    try {
        const response = await fetch(`${serverUrl}/user/labels`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const fetchCardLabels = async (cardId: string) => {
    try {
        const response = await fetch(`${serverUrl}/user/labels/card/${cardId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const handleLabelSubmit = async (labelName: string) => {
    try {
        const response = await fetch(`${serverUrl}/user/label`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ labelName, color: randomColor() })
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (err) {
        console.error(err);
    }
};