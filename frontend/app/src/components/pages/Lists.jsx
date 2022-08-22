import { React, Fragment, useEffect, useReducer, useState, memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


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

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

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
      <Typography variant="h5" component="div">
        買い物リスト
      </Typography>
      <br />

      {
        // listsState.fetchState === REQUEST_STATE.LOADING ?
        //   <Fragment>
        //     <p>
        //       ロード中...
        //           </p>
        //   </Fragment>
        //   :
        listsState.buyList.map((list) => {
          const labelId = `checkbox-list-label-${list.id}`;
          return (
            <Grid container alignItems="center" justify="center">
              <Grid item xs={8}>
                <SList sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem
                    key={list.id}
                    secondaryAction={
                      <>
                        <IconButton>
                          <SDeleteIcon onClick={handleClickOpen} />
                        </IconButton>
                        <ListConfirmDialog id={list.id} user_id={list.user_id} setTrigger={setTrigger} open={confirm} setConfirm={setConfirm} />
                      </>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} dense>
                      {/* <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(list.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon> */}
                      <ListItemText id={labelId} primary={list.name} />
                    </ListItemButton>
                  </ListItem>
                </SList>
              </Grid>
            </Grid>
          )
        }
        )
      }
      <FormDialog user_id={usersId} setTrigger={setTrigger} />
    </DefaultLayout >
  )
})

const SList = styled(List)`
  border: 0.5px solid #e7e7e7;
`

const SDeleteIcon = styled(DeleteIcon)`
  &:hover {
    cursor: pointer;
  }
`
