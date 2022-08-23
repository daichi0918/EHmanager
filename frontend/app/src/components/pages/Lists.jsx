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
} from '../../reducers/lists';

import DeleteIcon from '@material-ui/icons/Delete';

import { FormDialog } from '../organisms/list/ListAddDialog';

// apis
import { fetchLists, destroyList } from '../../apis/lists';

// constants
import { REQUEST_STATE } from '../../constants';
import { HeaderOnly } from '../templates/HeaderOnly';
import { DefaultLayout } from '../templates/DefaultLayout';

export const Lists = memo(({
  match
}) => {

  const [listsState, dispatch] = useReducer(listsReducer, listsInitialState);
  const [trigger, setTrigger] = useState(false);

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
  }, [trigger])

  const { usersId } = useParams();

  return (
    <DefaultLayout>
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
              < DeleteIcon onClick={() => destroyList(list.user_id, list.id, setTrigger)} />
            </div>
          )
      }
      <FormDialog user_id={usersId} setTrigger={setTrigger} />
    </DefaultLayout>
  )
})
