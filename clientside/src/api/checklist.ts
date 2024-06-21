import { Checklist, ListProps } from "@/lib/types";
import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";
// import { toast } from "sonner";

interface ChecklistProps extends ListProps {
    name?: string;
    checklistId?: string;
}

interface ChecklistItemProps extends ListProps {
    text?: string;
    checklistItemId?: string;
    completed?: boolean;
}

// CREATE CHECKLIST
export const handleCreateChecklist = async ({ valueId, name }: ChecklistProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/checklists/${valueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                name,
            }),
        });

        if (response.ok) {
            console.log("success")
        }
    } catch (error) {
        console.error(error);
    }
};

// UPDATE CHECKLIST
export const handleUpdateChecklist = async ({ valueId, name, checklistId }: ChecklistProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/checklists/${valueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                name,
                checklistId: checklistId
            }),
        });
        if (response.ok) {
            const data = await response.json();
            return data as Checklist;
        }
    } catch (error) {
        console.error(error);
    }
};

// DELETE CHECKLIST
export const handleDeleteChecklist = async ({ valueId }: ChecklistProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/checklists/delete/${valueId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        }
    } catch (error) {
        console.error(error);
    }
};

// CREATE CHECKLIST ITEM
export const handleCreateChecklistItem = async ({ valueId, text }: ChecklistItemProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/checklists/checklistItems/${valueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                text,
            }),
        });

        if (response.ok) {
            console.log("success")
        }
    } catch (error) {
        console.error(error);
    }
};

// UPDATE CHECKLIST ITEM
export const handleUpdateChecklistItem = async ({ valueId, text, completed, checklistItemId }: ChecklistItemProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/checklists/checklistItems/${valueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                text,
                checklistItemId,
                completed
            }),
        });
        if (response.ok) {
            const data = await response.json();
            return data as Checklist;
        }
    } catch (error) {
        console.error(error);
    }
};

// DELETE CHECKLIST ITEM
export const handleDeleteChecklistItem = async ({ valueId }: ChecklistItemProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/cards/checklists/checklistItems/delete/${valueId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const data = await response.json();
            toast(data.message);
        }
    } catch (error) {
        console.error(error);
    }
};