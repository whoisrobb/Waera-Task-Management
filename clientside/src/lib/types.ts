export type BoardItem = {
    BoardID: string;
    BoardName: string;
    Description: string;
    TeamTeamID: any;
    UserUserID: string;
    createdAt: string;
    updatedAt: string;
}

export type Attachment = {
    AttachmentID: string;
    CardCardID: string;
    FileName: string;
    FilePath: string;
    createdAt: string;
    updatedAt: string;
}

export type ChecklistItem = {
    // ChecklistItemID: string;
    ChecklistItemText: string;
    ItemComplete: Boolean;
    // createdAt: string;
    // updatedAt: string;
}

export type Checklist = {
    ChecklistID: string;
    ChecklistName: string;
    // CardCardID: string;
    ChecklistItems: ChecklistItem[];
    // createdAt: string;
    // updatedAt: string;
}

export type CardLabel = {
    CardCardID: string;
    LabelLabelID: string;
    createdAt: string;
    updatedAt: string;
}

export type LabelItem = {
    CardLabels: CardLabel[];
    Color: string;
    LabelID: string;
    LabelName: string;
    createdAt: string;
    updatedAt: string;
}

export type Card = {
    CardID: string;
    CardName: string;
    Checklists: any;
    Comments: any;
    Attachments: Attachment[] | [];
    Description: string | null;
    DueDate: string | null;
    Labels: LabelItem[] | [];
    ListListID: string;
    createdAt: string;
    updatedAt: string;
}

export type List = {
    ListID: string;
    Cards: Card[] | [];
    BoardBoardID: string;
    ListName: string;
    createdAt: string;
    updatedAt: string;
}