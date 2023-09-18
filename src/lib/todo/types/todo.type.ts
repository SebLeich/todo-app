export type Todo =
{
    id: string;
    index: number;
    created: Date;
    title: string | null;
    description: string | null;
    isCompleted: boolean;
}