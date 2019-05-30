import { searchFuncService } from './_services'
import { SEARCH_FUNC } from './_types'

export const searchFunc = searchString => dispatch => {
  searchFuncService(searchString)
    .then(res =>
      dispatch({
        type: SEARCH_FUNC,
        payload: res.data
      })
    )
    .catch(err => console.log(err))
}
