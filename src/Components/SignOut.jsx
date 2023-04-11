import React, { useState } from 'react'
import { Avatar, colors } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function SignOut() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const nagivate = useNavigate();

  const handelerOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handelerSignOut = () => {
    signOut(auth).then((em) => {
      console.log(em)
    }).then((err) => {
      console.log(err)
    })
    nagivate('/');
  }

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 1,
          boxShadow: '2px 5px gray',
          width: '99%',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h3" >
          DashBoard
        </Typography>
      </Box>
      <IconButton
        onClick={handelerOpen}
        size="small"
        style={{ position: 'absolute', top: 5, right: 35, fontSize: 24, backgroundColor: 'rgb(46 137 56)' }}
      >
        <Avatar style={{ color: 'white', fontSize: 24, backgroundColor: 'rgb(46 137 56)' }}>H</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
      >
        <MenuItem onClick={handelerSignOut} style={{ color: 'red' }}>
          <ListItemIcon>
            <Logout style={{ color: 'red' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default SignOut;