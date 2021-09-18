
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
    const response = await axios
        .post('/tasks', data)
        .then(response => {
            $.notify({ message: "Tasks Created" }, { type: "success" });
            return response.data
        })
        .catch(error => {
            return error
        })
    return response
}

export default TaskRequest;