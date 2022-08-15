import { React, Fragment, useEffect, useReducer, useState, memo } from 'react';

import {
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';

import {
  initialState as listsInitialState,
  listsActionTyps,
  listsReducer,
} from '../reducers/lists';

import DeleteIcon from '@material-ui/icons/Delete';

import { FormDialog } from '../components/ListAddDialog';

// apis
import { fetchLists, destroyList } from '../apis/lists';

// constants
import { REQUEST_STATE } from '../constants';

export const Lists = memo(({
  match
}) => {

  const [listsState, dispatch] = useReducer(listsReducer, listsInitialState);

  useEffect(() => {
    dispatch({ type: listsActionTyps.FETCHING });
    fetchLists(match.params.usersId)
      .then((data) => {
        dispatch({
          type: listsActionTyps.FETCH_SUCCESS,
          payload: {
            lists: data.lists
          }
        });
      })
  }, [])

  const url = useLocation();

  const path = url.pathname

  const path_array = path.match(/\/users\/(.*)\/lists/);

  const user_id = path_array[1]

  return (
    <Fragment>
      {
        listsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <p>
              ロード中...
                  </p>
          </Fragment>
          :
          listsState.buyList.map(list =>
            < div key={list.id}>
              {list.name}
              < DeleteIcon onClick={() => destroyList(list.user_id, list.id)} />
            </div>
          )
      }
      <FormDialog user_id={user_id} />
    </Fragment >
  )
})
