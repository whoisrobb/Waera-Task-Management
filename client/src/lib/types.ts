export type JwtPayload = {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    initials: string;
    email: string;
}

export type BoardItem = {
  BoardID: string;
  BoardName: string;
  Description: string;
  TeamTeamID: string | null;
  UserUserID: string;
  createdAt: Date;
  updatedAt: Date;
//   CreatorUserID: string | null;
}

export type Attachment = {
  AttachmentID: string;
  CardCardID: string;
  FileName: string;
  FilePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ChecklistItem = {
  ChecklistItemID?: string;
  ChecklistItemText: string;
  ItemComplete: boolean;
  // createdAt: Date;
  // updatedAt: Date;
}

export type Checklist = {
  // ChecklistID: string;
  ChecklistName: string;
  // CardCardID: string;
  ChecklistItems: ChecklistItem[] | [];
  // createdAt: Date;
  // updatedAt: Date;
}

export type CardLabel = {
  CardCardID: string;
  LabelLabelID: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LabelItem = {
  CardLabels: CardLabel[];
  Color: string;
  LabelID: string;
  LabelName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Card = {
  CardID: string;
  CardName: string;
  Checklists: any;
  Comments: any;
  Attachments: Attachment[] | [];
  Description: string | undefined;
  DueDate: Date | null;
  Labels: LabelItem[] | [];
  ListListID: string;
  createdAt: Date;
  updatedAt: Date;
}

export type List = {
  ListID: string;
  Cards: Card[] | [];
  BoardBoardID: string;
  ListName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ListProps = {
  valueId: string;
  getData: () => void;
}