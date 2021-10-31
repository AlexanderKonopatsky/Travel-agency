import { CREATE_POST } from "./types"
import data from '../data'

const initialState = {
  posts: data.tours,
  fetchedPosts: []
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
     /*  return { ...state, posts: [...state.posts, action.payload]} */
      return { ...state, posts: state.posts.concat(action.payload)}
    default: return state
  } 
  

}