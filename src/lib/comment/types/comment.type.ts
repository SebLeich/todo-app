export type Comment =
{
    id: string;
    created: Date;
    index: number;
    title: string | null;
    content: string | null;
    todoId: string;
    x: number;
    y: number;
}