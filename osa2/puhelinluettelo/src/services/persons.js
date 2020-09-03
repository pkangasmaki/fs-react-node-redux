import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

const remove = (id) => {
    console.log("removed")
    return axios.delete(baseUrl+`/${id}`)
}

const replaceNo = (id, data) => {
  console.log("id replaces:", id)
  console.log("data replaces:", data)
  return axios.put(baseUrl+`/${id}`, data)
}


export default { getAll, create, remove, replaceNo }