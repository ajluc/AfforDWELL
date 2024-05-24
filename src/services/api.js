import Axios from "axios"

export const BASE_URL = 'https://affordwell-backend-902a0cda8a97.herokuapp.com'

const Client = Axios.create({ baseURL: BASE_URL })

export default Client