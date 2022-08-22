import { React, Fragment, useEffect, useReducer, useState, memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClose = () => {
    setConfirm(false);
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
              <Dialog
                open={confirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"確認"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    削除してよろしいですか？
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>キャンセル</Button>
                  <Button onClick={() => destroyList(list.user_id, list.id, setTrigger, setConfirm)} autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )
      }
      <FormDialog user_id={usersId} setTrigger={setTrigger} />
    </DefaultLayout>
  )
})
