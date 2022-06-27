import React, {useState} from 'react';
import './App.css';
import {TodoList, PropsArrayType} from "./components/TodoList";
import {v1} from 'uuid'

export type FilterValuesType = "all" | "completed" | "active"
const App = () => {
    console.log(v1())

    const toToListTitle: string = "What to learn";

    //данные для отрисовки
    const [tasks, setTasks] = useState<Array<PropsArrayType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    );
    //добавление нового объекта в массив(добавление новой таски)
    const addTask = (title: string) => {

        const newTask: PropsArrayType = {
            id: v1(), title: title, isDone: false
        };

        setTasks([newTask, ...tasks])
    };
    //удаление таски
    const removeTask = (taskID: string) => {
        let remove = tasks.filter(t => t.id !== taskID)
        setTasks(remove)
    };

    //фильтрация тасок
    const [filter, setFilter] = useState<FilterValuesType>("all");
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    };
    //управлением чекс боксом
    const changeTaskStatus = (taskID:string, isDone:boolean) => {
      setTasks(tasks.map(t=>t.id===taskID ? {...t, isDone: isDone} : t))
    };

    return (
        <div className="App">
            <TodoList
                title={toToListTitle}
                tasks={tasks}
                filter={filter}

                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
