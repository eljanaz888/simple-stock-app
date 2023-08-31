import axios from "axios";

const TOKEN = "cjmqh59r01qmdd9q58g0cjmqh59r01qmdd9q58gg";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})