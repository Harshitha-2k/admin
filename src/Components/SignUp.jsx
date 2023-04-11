import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const nagivate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [error, setError] = useState('');
  const [current, setCurrent] = useState('');

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (current) {
        setCurrent(user.email)
        console.log({
          userem: user.email,
        })
      }
      else {
        setCurrent(null)
        console.log(current)
      }
    })
  }, [])

  const handlerSignup = () => {
    if (email && password) {
      setEmail(email);
      setPasword(password);
      setError('');
      createUserWithEmailAndPassword(auth, email, password).then((user) => {
        console.log(user)
      }).then((err) => {
        console.log(err)
      })
    }
    else {
      return setError('please enter all the detalis')
    }
  }
  const handlerSignin = () => {
    if (email && password) {
      setEmail(email);
      setPasword(password);
      signInWithEmailAndPassword(auth, email, password).then((user) => {
        console.log(user)
      }).then((err) => {
        console.log(err)
      })
      nagivate('/dashboard');
    }
    else {
      return setError('invalid user or password')
    }

  }

  return (
    <Box
      sx={{
        width: '500px',
        height: '50vh',
        margin: '25px 25px',
        padding: '6px 13px',
        backgroundColor: '#dbdce7',
        borderRadius: 4,
        boxShadow: '5px 8px'
      }}
    >
      <Typography variant="h3" className='sign-up'>
        Sign-up
      </Typography>
      <InputAdornment position="start">
        <AccountCircle style={{ position: 'relative', fontSize: 40, width: 140, top: 46, }} />
      </InputAdornment>
      <TextField
        className='input'
        label="Email"
        variant="standard"
        style={{ margin: '20px 100px', width: 300, fontSize: '50px', color: 'black' }}
        onChange={(e) => { setEmail(e.target.value) }}
        value={email}
      />
      <InputAdornment position="start">
        <VisibilityIcon style={{ position: 'relative', fontSize: 35, width: 140, top: 46 }} />
      </InputAdornment>
      <TextField
        className='input'
        label='Password'
        variant='standard'
        type='password'
        style={{ margin: '20px 100px', width: 300, fontSize: '50px' }}
        onChange={(e) => { setPasword(e.target.value) }}
        value={password}
      />
      <Button variant="outlined" style={{ margin: 25, border: '1px solid black', color: 'black', left: 100 }} onClick={handlerSignup} >Sign-Up</Button>
      <Button variant="outlined" style={{ margin: 25, border: '1px solid black', color: 'black', left: 100 }} onClick={handlerSignin}>Sign-In</Button>
      <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
    </Box>
  );
}