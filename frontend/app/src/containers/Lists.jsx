import React, { Fragment, useEffect, useReducer } from 'react';


import {
  initialState as listsInitialState,
  listsActionTyps,
  listsReducer,
} from '../reducers/lists';

import DeleteIcon from '@material-ui/icons/Delete';

import FormDialog from '../components/ListAddDialog';

// apis
import { fetchLists } from '../apis/lists';

// constants
import { REQUEST_STATE } from '../constants';

export const Lists = ({
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
            <div key={list.id}>
              {list.name}
              <DeleteIcon />
            </div>
          )
      }
      <FormDialog />
    </Fragment>
  )
}
