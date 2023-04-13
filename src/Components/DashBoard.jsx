import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import SignOut from './SignOut';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';




function DashBoard() {
  const [item, setItem] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0)
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloser = () => {
    setOpens(false)
  }
  const handleClickOpener = () => {
    setOpens(true)
  }

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data)
        setItem(res.data)
      })
      .then((err) => {
        console.log(err)
      })
  }, [])

  const handlerEdit = async () => {
    const up = { id, title, body }
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`, up)
    const updatedItem = response.data;
    const updatedItems = item.map((items) => (items.id == updatedItem.id ? updatedItem : items));
    console.log(updatedItems)
    setItem(updatedItems);
    handleClose();
  }

  const handlerDelete = async (post) => {
    const deleteItem = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
    const removedItem = item.filter(it=>it.id !== post.id)
    setItem(removedItem)
  }


  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  return (
    <>
      <SignOut />
      <Paper sx={{ width: '90%', height: '80vh' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: 31 }} >
                  Id
                </TableCell>
                <TableCell style={{ fontSize: 31 }}>
                  Title
                </TableCell>
                <TableCell style={{ fontSize: 31 }}>
                  Body
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((post, index) => {
                  return (
                    <TableRow hover role="checkbox" key={post.code}>
                      <TableCell style={{ fontSize: 20 }} key={post.id} >{post.id}</TableCell>
                      <TableCell style={{ fontSize: 20 }} key={post.titile}>{post.title}</TableCell>
                      <TableCell style={{ fontSize: 20 }} key={post.body}>{post.body}</TableCell>
                      <TableCell>
                        <Button style={{ color: 'black', border: '1px solid black' }} onClick={handleClickOpen} variant="outlined" startIcon={<EditIcon />}>Edit</Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogContent>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Id"
                              type="number"
                              fullWidth
                              variant="standard"
                              onChange={(e) => { setId(e.target.value) }}
                              value={id}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label=" Title"
                              type="text"
                              fullWidth
                              variant="standard"
                              onChange={(e) => { setTitle(e.target.value) }}
                              value={title}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Body"
                              type="text"
                              fullWidth
                              variant="standard"
                              onChange={(e) => { setBody(e.target.value) }}
                              value={body}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handlerEdit}>Save</Button>
                            <Button onClick={handleClose}>cancel</Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                      <TableCell><Button style={{ color: 'black', border: '1px solid black' }} variant="outlined" onClick={handleClickOpener} startIcon={<DeleteIcon />}>Delete</Button>
                        <Dialog open={opens} onClick={handleCloser}>
                          <DialogContent>
                            Are you sure Delete 
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => handlerDelete(post)}>yes</Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ fontSize: 20 }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={100}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default DashBoard;