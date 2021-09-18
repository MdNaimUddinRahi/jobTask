import React, { useReducer } from 'react'
import TaskRequest from '../requests/TaskRequest'
export const TaskForm = (props) => {
    const [state, setState] = useReducer(
        (state, setState) => ({ ...state, ...setState }),
        {
            name: '',
            description: '',
            deadline: '',
        })

    const onChangeData = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({ [name]: value })
    }

    const submitData = async (event) => {
        event.preventDefault();
        const data = await TaskRequest.post(state);
        return props.taskList();
    }
    return (
        <div className="container">
            <form onSubmit={ submitData } method="post">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"
                        className="form-control" name="name" onChange={ onChangeData } id="name" placeholder="Enter name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" onChange={ onChangeData } name="description" id="description" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">Task Deadline</label>
                    <input type="date"
                        className="form-control" name="deadline" onChange={ onChangeData } id="deadline" placeholder="Task Deadline" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default TaskForm
