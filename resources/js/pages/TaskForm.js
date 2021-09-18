import React, { useReducer, useEffect } from 'react'
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
        console.log(`state`, state)
        const data = await TaskRequest.post(state);
        return props.taskList();
    }

    useEffect(() => {
        setState(props.updateTask)
    }, [props.updateTask])
    console.log(`state`, state)
    return (
        <div className="container">
            <form onSubmit={ submitData } method="post">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"
                        className="form-control" name="name" onChange={ onChangeData } value={ state.name } id="name" placeholder="Enter name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" onChange={ onChangeData } value={ state.description } name="description" id="description" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">Task Deadline</label>
                    <input type="date"
                        className="form-control" name="deadline" onChange={ onChangeData } value={ state.deadline } id="deadline" placeholder="Task Deadline" />
                </div>
                { props.updatebtn ?
                    <button type="submit" className="btn btn-success">Update</button> :
                    <button type="submit" className="btn btn-primary">submit</button> }
            </form>
        </div>
    )
}

export default TaskForm
