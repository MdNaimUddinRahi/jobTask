import React, { useState, useEffect } from 'react'
// import { ReactDOM } from 'react-dom'
import * as ReactDOM from 'react-dom';
import TaskRequest from '../requests/TaskRequest';
import TaskForm from './TaskForm'
import TaskTable from './TaskTable';
export const Task = () => {
    const [task, settask] = useState({})

    useEffect(() => {
        taskList()
    }, [])

    const taskList = async () => {
        const taskList = await TaskRequest.list({ tasks: 'task' })
        settask(taskList)
    }
    // console.log(`task`, task)
    let taskTable = task.length > 0 ? <TaskTable data={ task } /> : '';
    return (
        <div className="tasks">
            <TaskForm taskList={ taskList } />
            { taskTable }
        </div>
    )
}

export default Task;

if (document.getElementById('root')) {
    ReactDOM.render(<Task />, document.getElementById('root'));
}