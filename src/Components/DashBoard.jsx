import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SignOut from './SignOut';


function DashBoard() {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .then((err) => {
        console.log(err)
      })
  }, [])


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
              {data && <p>load</p> ?
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((post) => {
                    return (
                      <TableRow hover role="checkbox" key={post.code}>
                        <TableCell style={{ fontSize: 20 }} >{post.id}</TableCell>
                        <TableCell style={{ fontSize: 20 }}>{post.title}</TableCell>
                        <TableCell style={{ fontSize: 20 }} >{post.body}</TableCell>
                      </TableRow>
                    );
                  }) : null}
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