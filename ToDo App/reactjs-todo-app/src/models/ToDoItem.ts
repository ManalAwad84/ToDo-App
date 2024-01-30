import { ItemStatus } from "./ItemStatus";

export interface ToDoItem {
    id: number;
    description: string;
    dueDate: string;
    statusId: number;
    status?: ItemStatus;
}