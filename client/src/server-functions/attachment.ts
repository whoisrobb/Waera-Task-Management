import { Checklist, ListProps } from "@/lib/types";
import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";

interface ChecklistProps extends ListProps {
    checklists: Checklist[];
}

export const handleFileSubmit = async ({ cardId, files, fetchAttachments }: { cardId: string, files: File[], fetchAttachments: (to: string) => void }) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('file', file);
    });

    try {
        const response = await fetch(`${serverUrl}/user/cards/attachments/${cardId}`, {
            method: 'POST',
            body: formData,
    });
    if (response.ok) {
        fetchAttachments(cardId)
    }
    } catch (err) {
        console.error(err);
    }
};

export const getCardAttachments = async (cardId: string) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/attachments/${cardId}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            toast('Failed to fetch Attachments!');
        }
    } catch (err) {
        console.error(err);
    }
};

export const handleUpdateChecklists = async ({ valueId, checklists, getData }: ChecklistProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/updateChecklists/${valueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                checklists: checklists,
            }),
        });

        if (response.ok) {
            getData();
        }
    } catch (error) {
        console.error(error);
    }
};