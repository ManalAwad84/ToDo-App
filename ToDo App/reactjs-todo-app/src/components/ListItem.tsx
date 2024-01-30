import { ToDoItem } from "../models/ToDoItem";
import todoService from '../services/todo-service';

type Props = {
    items: ToDoItem[];
    handleRemove: (event: React.MouseEvent<HTMLElement>, id: number) => void
};

function ListItem(props: Props) {
    const MarkDone = async function (event, task: ToDoItem) {

        await todoService.markDone(task.id);

        // Toggle statuses between active and done

        if (task.statusId === 2) {
            task.statusId = 3;
            event.target.checked = false;
        }
        else if (task.statusId === 3) {
            task.statusId = 2;
            event.target.checked = true;
        }
    }

    const handleDelete = (id: number) => {
        props.handleRemove(event, id);
    };
    return (
        <>
            <thead>
                <tr>
                    <th scope="col">Mark Done</th>
                    <th scope="col">Task</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item =>
                    <tr key={item.id} className={new Date(item.dueDate).toLocaleDateString() < new Date().toLocaleDateString() ? 'overdue' : ''}>
                        <td><input className="form-check-input" type="checkbox" checked={item.statusId === 2 ? true : false} onChange={e => MarkDone(e, item)} /></td>
                        <td>{item.description}</td>
                        <td>{new Date(item.dueDate).toDateString()}</td>
                        <td><button type="button" className="btn-close" aria-label="Remove" onClick={() => handleDelete(item.id)}></button></td>
                    </tr>
                )}
            </tbody>
        </>
    );
}

export default ListItem;