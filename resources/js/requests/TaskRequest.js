
import axios from "axios"
const TaskRequest = {}

TaskRequest.list = async (data) => {
    const response = await axios
        .get('/tasks', { params: data })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })

    return response;
}

TaskRequest.post = async (data) => {
    let response = '';
    if (data.id) {
        response = await axios
            .put('/tasks/' + data.id, data)
            .then(response => {
                $.notify({ message: "tasks Update" }, { type: "success" })
                return response.data;
            })
    } else {
        response = await axios
            .post('/tasks', data)
            .then(response => {
                $.notify({ message: "Tasks Created" }, { type: "success" });
                return response.data
            })
            .catch(error => {
                return error
            })
    }

    return response
}

TaskRequest.delete = async (data) => {
    const response = await axios
        .delete('/tasks/' + data.id, data)
        .then(response => {
            $.notify({ message: "Tasks Delete" }, { type: "success" });
            return response.data
        })
        .catch(error => {
            return error
        })
    return response
}

export default TaskRequest;