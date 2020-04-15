import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/',
})

export const createPost = (name, postContent, group) => api.post('/post/?&content='+ postContent+ '&group='+ group + '&name='+ name )
export const createGroup = (name, groupname, key) => api.post('/group/?&members='+ name+ '&name='+ groupname + '&key='+ key )
export const getAllPosts = () => api.get(`/post`)
export const authUser = (username, pass) => api.get('/auth/?name='+ username +'&password=' + pass);
export const addToGroup = (name, group) => api.patch('/group/?name='+ name +'&group=' + group);
export const getGroups = name => api.get('/group/?name='+ name);
export const getGroup = name => api.get('/groupmem/?name='+ name);
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    createPost,
    getAllPosts,
    authUser,
    addToGroup,
    createGroup,
    getGroups,
    getGroup,
    // updateMovieById,
    // deleteMovieById,
    // getMovieById,
}

export default apis
