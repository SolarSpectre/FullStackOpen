import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const config = { headers: { Authorization: token } }
  try {
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error creating blog:', error)
    throw error
  }
}
const update = async (blogId, updateObject) => {
  const config = { headers: { Authorization: token } }
  try {
    const response = await axios.put(
      `${baseUrl}/${blogId}`,
      updateObject,
      config,
    )
    return response.data
  } catch (error) {
    console.error('Error updating blog:', error)
    throw error
  }
}
const deleteBlog = async (blogId) => {
  const config = { headers: { Authorization: token } }
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw error
  }
}

export default { getAll, setToken, create, update, deleteBlog }
