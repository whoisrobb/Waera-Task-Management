import { FilterProps, ListProps } from "@/lib/types";
import { serverUrl } from "@/lib/utils";
import { toast } from "sonner";

interface CreateList extends ListProps {
    listName: string;
}

export const fetchFilteredLists = async ({ dateFrom, dateTo, order, valueId }: FilterProps) => {
    try {
        const response = await fetch(`${serverUrl}/user/lists/filtered/${valueId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateFrom, dateTo, order }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        toast('Something went wrong!');
    }
    } catch (err) {
        console.error(err);
    }
};

export const handleCreateList = async ({ listName, valueId, getData}: CreateList) => {
    try {
      const response = await fetch(`${serverUrl}/user/lists/create/${valueId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ listName })
    })
    if (response.ok) {
        const responseData = await response.json();
        toast(`Created list ${responseData.ListName}`);
        getData();
    } else {
        console.error(response.status, response.statusText);
        toast('Something went wrong!');
    }
    } catch (err) {
      console.error(err);
    }
};

export const deleteList = async ({ valueId, getData }: ListProps) => {
    try {
        await fetch(`${serverUrl}/user/lists/delete/${valueId}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
                toast('Deleted List successfully');
                getData();
            } else {
                toast('Something went wrong!');
            }
        })
    } catch (err) {
        console.error(err);
    }
};