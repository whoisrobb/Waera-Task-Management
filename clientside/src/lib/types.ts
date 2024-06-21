export type JwtPayload = {
    userId: string;
    firstName: string;
    lastName: string;
    initials: string;
    email: string;
}

export type BoardItem = {
  boardId: string;
  name: string;
  description: string;
  teamId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
//   CreatorUserID: string | null;
}

export type Attachment = {
  attachmentId?: string;
  CardCardID: string;
  filename: string;
  filepath: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ChecklistItem = {
  checklistItemId?: string;
  text: string;
  completed: boolean;
  // createdAt: Date;
  // updatedAt: Date;
}

export type Checklist = {
  checklistId: string;
  name: string;
  cardId: string;
  checklistItems: ChecklistItem[] | [];
  // createdAt: Date;
  // updatedAt: Date;
}

export type CardLabel = {
  cardId: string;
  labelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LabelItem = {
  CardLabels: CardLabel[];
  color: string;
  labelId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Card = {
  completed: boolean;
  cardId: string;
  name: string;
  checklists: any;
  Comments: any;
  attachments: Attachment[] | [];
  description: string | undefined;
  dueDate: Date | null;
  labels: LabelItem[] | [];
  listId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type List = {
  listId: string;
  cards: Card[] | [];
  boardId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ListProps = {
  valueId: string;
}

export type FilterProps = {
  valueId: string;
  order?: string;
}

export type User = {
  description: string | null;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | null;
  domain: string | null;
  initials: string;
}

export type cardLabels = {
  cardLabelsTable: {
    cardId: string | null;
    labelId: string | null;
  };
  labelTable: {
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    labelId: string;
    color: string;
  };
}