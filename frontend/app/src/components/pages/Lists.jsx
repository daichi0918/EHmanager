import { React, Fragment, useEffect, useReducer, useState, memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';


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
import { DefaultLayout } from '../templates/DefaultLayout';
import { ListConfirmDialog } from '../organisms/list/ListConfirmDialog';

export const Lists = memo(({
  match
}) => {

  const [listsState, dispatch] = useReducer(listsReducer, listsInitialState);
  const [trigger, setTrigger] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleClickOpen = () => {
    setConfirm(true);
  };

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
              <DeleteIcon onClick={handleClickOpen} />
              <ListConfirmDialog id={list.id} user_id={list.user_id} setTrigger={setTrigger} open={confirm} setConfirm={setConfirm} />
            </div>
          )
      }
      <FormDialog user_id={usersId} setTrigger={setTrigger} />
    </DefaultLayout>
  )
})
