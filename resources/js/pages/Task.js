import React, { useState, useEffect } from 'react'
// import { ReactDOM } from 'react-dom'
import * as ReactDOM from 'react-dom';
import TaskRequest from '../requests/TaskRequest';
import TaskForm from './TaskForm'
import TaskTable from './TaskTable';
export const Task = () => {
    const [task, settask] = useState({})
    const [updateTask, setUpdateTask] = useState({})
    const [updatebtn, setUpdatebtn] = useState(false)

    useEffect(() => {
        taskList()
    }, [])

    const taskList = async () => {
        const taskList = await TaskRequest.list({ tasks: 'task' })
        settask(taskList)
    }

    const getUpdateTask = (data) => {
        console.log(`getupdatedata`, data)
        setUpdateTask(data)
        setUpdatebtn(true)
    }

    const deleteTask = async (data) => {
        const deleteData = await TaskRequest.delete(data)
        return taskList
    }
    let taskTable = task.length > 0 ? <TaskTable data={ task } getUpdateTask={ getUpdateTask } deleteTask={ deleteTask } /> : '';
    return (
        <div className="tasks">
            <TaskForm taskList={ taskList } updateTask={ updateTask } updatebtn={ updatebtn } />
            { taskTable }
        </div>
    )


}

export default Task;

if (document.getElementById('root')) {
    ReactDOM.render(<Task />, document.getElementById('root'));
}