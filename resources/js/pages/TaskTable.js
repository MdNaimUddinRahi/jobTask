import React from 'react'
import Moment from 'react-moment';
// import 'moment-timezone';

export const TaskTable = (props) => {

    let tasks = null
    tasks = props.data.map(task => {
        return <tr key={ task.id }>
            <td scope="row">{ task.name }</td>
            <td>{ task.description }</td>
            <td><Moment fromNow>{ task.deadline }</Moment></td>
            <td><button onClick={ (e) => props.getUpdateTask(task) } className="btn btn-success">Update</button></td>
            <td><button onClick={ (e) => props.deleteTask(task) } className="btn btn-danger">Delete</button></td>
        </tr>
    })
    return (
        <div className="mt-3">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks }
                </tbody>
            </table>

        </div>
    )
}

export default TaskTable
