import { SEARCH_FUNC } from './_types'

const initialState = {
  posts: [],
  profiles: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FUNC:
      return {
        ...state,
        posts: action.payload.posts,
        profiles: action.payload.profiles
      }
    default:
      return state
  }
}
