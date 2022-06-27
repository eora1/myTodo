import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "../App";

type PropsType = {
    title: string
    tasks: PropsArrayType[]
    filter: FilterValuesType

    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export type PropsArrayType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<PropsType> = (props) => {

    const [title, setTitle] = useState<string>("")//локальный стейт для input
    const [error, setError] = useState<boolean>(false)//локальный стейт для валидации ввода символов в input

    const addTask = () => {
        const taskTitle = title.trim() //trim обрезает пробелы
        if (taskTitle) {// если таска без пробелов, то добавляем
            props.addTask(taskTitle)
        } else {
            setError(true) //ошибка есть и начинает отрисовывать <div>Title is required!</div>
        }
        //очищение поля ввода после добавления таски
        setTitle('')
    };

    const onChangeTask = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        if (error) setError(false)// если мы допустили ошибку и дальше начинаем печатать, то ошибка снимается
    };
    const onKeyPressTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    };
    //стили
    const allBtnClasses = props.filter === 'all' ? 'active-button' : '';
    const activeBtnClasses = props.filter === 'active' ? 'active-button' : '';
    const completedBtnClasses = props.filter === 'completed' ? 'active-button' : '';
    const errorInputStyle = error ? {border: '2px solid red', outline: 'none'} : undefined;


    const getTaskForRender = () => {
        let taskRender = props.tasks
        switch (props.filter) {
            case 'active':
                taskRender = props.tasks.filter(t => !t.isDone)
                break
            case 'completed':
                taskRender = props.tasks.filter(t => t.isDone)
                break
        }
        return taskRender
    };

    const taskRender = getTaskForRender()
    const taskJSXElements = taskRender.length//проверка на пустой массив
        ? taskRender.map((t) => {
            const taskClasses = t.isDone ? 'is-done' : '' //стиль спана
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(event) => props.changeTaskStatus(t.id, event.currentTarget.checked)}/>
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}>Deleted</button>
                </li>
            )
        })
        : <span>List is empty</span>;//если массив пустой, то выводит спан

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        style={errorInputStyle}
                        //синхронизация
                        value={title}
                        //отслеживаем написанное в инпут
                        onChange={onChangeTask}
                        //добавление таски по нажатию Enter
                        onKeyPress={onKeyPressTask}
                    />
                    <button onClick={addTask}>+</button>
                    {/*//если error true то отрисовывает div*/}
                    {error && <div style={{color: 'red', fontWeight: 'bold'}}>Title is required!</div>}
                </div>
                <ul>
                    {taskJSXElements}
                </ul>
                <div>
                    <button className={allBtnClasses} onClick={() => {
                        props.changeFilter("all")
                    }}>All
                    </button>
                    <button className={activeBtnClasses} onClick={() => {
                        props.changeFilter("active")
                    }}>Active
                    </button>
                    <button className={completedBtnClasses} onClick={() => {
                        props.changeFilter("completed")
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}