import axios from "@src/plugin/axios";
import { responseFormat } from "@src/plugin/helper";

const changePassword = async (payloads) => {
    const res = await axios.put(`/v1/user/password/change`, payloads)
                        .then(({ data }) => success = data)
                        .catch(({ response: { data } }) => failure = data);
    
    return responseFormat(res);
}

const create = async (payloads, callback = null) => {
    const res = await axios.post(`/v1/user/create`, payloads, { headers: {'Content-Type': 'multipart/form-data' }})
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

    if (callback) {
        return callback(success, failure); 
    }

    return responseFormat(res);
}

const update = async (payloads, callback = null) => {
    const res = await axios.put(`/v1/user/update`, payloads, { headers: {'Content-Type': 'multipart/form-data' }})
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

    if (callback) {
        return callback(success, failure); 
    }

    return responseFormat(res);
}

const destroy = async (payloads) => {
    const res = await axios.delete(`/v1/user/delete`, { data: payloads })
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

    return responseFormat(res);
}

const show = async (payloads) => {
    const res = await axios.get(`/v1/user/show/${payloads.id}`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

    return responseFormat(res);
}

const list = async () => {
    const res = await axios.get(`/v1/user/list`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

    return responseFormat(res);
}

export {
    changePassword,
    create,
    update,
    destroy,
    show,
    list,
}