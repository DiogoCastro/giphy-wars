import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs'
});

Axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

export default axios;