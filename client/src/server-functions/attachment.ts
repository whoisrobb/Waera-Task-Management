import { Checklist, ListProps } from "@/lib/types";
import { serverUrl } from "@/lib/utils";

interface ChecklistProps extends ListProps {
    checklists: Checklist[];
}

export const handleFileSubmit = async ({ cardId, files }: { cardId: string, files: File[] }) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('file', file);
    });

    try {
        await fetch(`${serverUrl}/user/cards/attachments/${cardId}`, {
            method: 'POST',
            body: formData,
    });
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