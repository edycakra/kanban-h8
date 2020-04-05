import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://blooming-waters-14525.herokuapp.com'
})

export default instance