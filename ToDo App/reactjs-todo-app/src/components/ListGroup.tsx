import { SetStateAction, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { ToDoItem } from "../models/ToDoItem";
import todoService from '../services/todo-service';
interface Props {
    items: ToDoItem[];
    heading: string;
}

function ListGroup(props: Props) {

    const [taskValue, setTaskValue] = useState('');
    const [dueDateValue, setDueDateValue] = useState('');
    const [validationError, setValidationError] = useState({});
    const [todos, updateTodos] = useState<ToDoItem[]>([]);

    useEffect(() => {
        updateTodos(props.items);
    }, [props.items]);

    const validationErrors = { task: '', taskLength: '', dueDate: '' };

    function formValidation(task: string, taskLength: number, dueDate: string) {

        let isValid: boolean = true;

        if (!task) {
            validationErrors.task = 'Please insert a task!';
            isValid = false;
        }

        if (task.length < taskLength) {
            validationErrors.taskLength = 'Task minimum length is 10 characters!';
            isValid = false;
        }

        if (!dueDate) {
            validationErrors.dueDate = 'Please insert a task due date!';
            isValid = false;
        }

        setValidationError(validationErrors);

        return isValid;
    }

    function handleTaskChange(e: { target: { value: SetStateAction<string>; }; }) {
        setTaskValue(e.target.value);
    }
    function handleDueDateChange(e: { target: { value: SetStateAction<string>; }; }) {
        setDueDateValue(e.target.value);
    }

    function handleRemoveTodo(e: React.MouseEvent<HTMLElement>, id: number) {
        e.preventDefault();
        todoService.deleteTask(id);

        const index = props.items.findIndex((x) => x.id === id);
        props.items.splice(index, 1);

        updateTodos((todos) => todos.filter((item) => item.id !== id));
    }

    const AddNewTodoHandler = async function (e: { preventDefault: () => void; }) {
        e.preventDefault();

        if (!formValidation(taskValue, 10, dueDateValue))
            return false;

        const newItem = {
            id: 0, description: taskValue, dueDate: dueDateValue, statusId: 3
        };

        const response = await todoService.addTask(newItem);
        props.items.push(response);
        setTaskValue('');
        setDueDateValue('');
    }


    return (
        <>
            <div className="todoApp">
                <h1>{props.heading}</h1>

                <label>Todo<span className="required">*</span></label>
                <input type="text" name="task" value={taskValue} onChange={handleTaskChange} required placeholder="Enter your todo"></input>
                <span className="error">{validationError && validationError.taskLength ? validationError.taskLength : ''}</span>
                <br />
                <span className="error">{validationError && validationError.task != '' ? validationError.task : ''}</span>
                <br />
                <label>Due Date<span className="required">*</span></label>
                <input type="date" name="dueDate" value={dueDateValue} onChange={handleDueDateChange} required></input>
                <br />
                <span className="error">{validationError && validationError.dueDate ? validationError.dueDate : ''}</span>
                <br />
                <button className="btn btn-primary" onClick={AddNewTodoHandler}>Add Todo</button>
                <br />
                <br />

                <table className="table table-success table-striped table-hover tableWidth" hidden={todos.length == 0}>
                    <ListItem items={props.items} handleRemove={handleRemoveTodo}></ListItem>
                </table>
                <h3 hidden={todos.length > 0}>Add new Todo to display here!</h3>
            </div>
        </>
    );
}

export default ListGroup;