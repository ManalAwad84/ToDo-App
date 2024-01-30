import { useState, useEffect } from "react";
import ListGroup from './components/ListGroup';
import todoService from '../src/services/todo-service';

function App() {
    const [tasks, setItems] = useState([]);

    useEffect(() => {
        const fetchData = todoService.getAllTasks();
        fetchData.then((res) => {
            setItems(res);
        });
    }, []);

    const heading = "To Do App";

    return (<div>
        <ListGroup heading={heading} items={tasks}></ListGroup>
    </div>);

}

export default App;