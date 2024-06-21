import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";

export const handleFileSubmit = async ({ cardId, files }: { cardId: string, files: File[] }) => {
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
        const data = await response.json();
        return data;
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