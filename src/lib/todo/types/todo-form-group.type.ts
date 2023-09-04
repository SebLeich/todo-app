import { Todo } from "./todo.type";
import { FormControl, FormGroup } from "@angular/forms";

export type TodoFormGroup = FormGroup<{
    [key in keyof Todo]: FormControl<Todo[key]>;
}>;