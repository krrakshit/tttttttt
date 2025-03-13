import axios from "axios"

export const axiosinstance = axios.create({
    baseURl : import.meta.env.mode === "development" ? "http://localhost:5001/api" : "/api",
    withCrdentials : true,
})