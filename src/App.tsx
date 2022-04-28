import React from 'react';
import './App.css';
import {TodoList,PropsArrayType} from "./components/TodoList";


const App=()=> {
    const tasks:Array<PropsArrayType>=[
        {id:1, title:"HTML&CSS", isDone:true},
        {id:1, title:"JS", isDone:false},
        {id:1, title:"ReactJS", isDone:false}
    ]

    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasks}
            />
        </div>
    );
}

export default App;
