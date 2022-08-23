import { React, memo, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';

import { createList } from '../../../apis/lists';

export const FormDialog = memo((props) => {
  const { user_id, trigger, setTrigger } = props;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(props)

  return (
    <div>
      <Fab color="success" aria-label="add" >
        <AddIcon onClick={handleClickOpen} />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { createList(props.user_id, text, setTrigger) }}>登録</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
