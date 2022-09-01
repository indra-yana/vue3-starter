import axios from "@src/plugin/axios";

export default {
    changePassword: async (payloads) => {
        let success, failure = null;

        await axios.put(`/api/v1/user/password/change`, payloads)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);
        
        return { success, failure }
    },
    create: async (payloads, callback = null) => {
        let success, failure = null;

        await axios.post(`/api/v1/user/create`, payloads, { headers: {'Content-Type': 'multipart/form-data' }})
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        if (callback) {
            return callback(success, failure); 
        }

        return { success, failure }
    },
    update: async (payloads, callback = null) => {
        let success, failure = null;

        await axios.put(`/api/v1/user/update`, payloads, { headers: {'Content-Type': 'multipart/form-data' }})
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        if (callback) {
            return callback(success, failure); 
        }

        return { success, failure }
    },
    delete: async (payloads) => {
        let success, failure = null;

        await axios.delete(`/api/v1/user/delete`, { data: payloads })
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    show: async (payloads) => {
        let success, failure = null;

        await axios.get(`/api/v1/user/show/${payloads.id}`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    list: async () => {
        let success, failure = null;

        await axios.get(`/api/v1/user/list`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
}