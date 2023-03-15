import logo from './imagens/oestebest.png';
import './App.css';
import {TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {collection, getDocs, orderBy, query} from "@firebase/firestore"
import {firestore} from "./firebase_setup/firebase"
import {clubeConverter} from "./objetos/clubes"

function App() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [activeButton, setActiveButton] = useState(true);

  useEffect(() => {
    if (name.length > 3 && age.length > 1 && password.length > 3) {
      setActiveButton(false)
    } else {
      setActiveButton(true)
    }
  })


  

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [contador, setContador] = useState(0);
  const [snap, setSnap] = useState([]);





  const fetchPost = async () => {




    const q = query(collection(firestore, "CLUBE"), orderBy("clubeNome")).withConverter(clubeConverter);

    const querySnapshot = await getDocs(q);

    var x = []

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      x.push(doc.data());
    });

    setTodos(x)







  }

  useEffect(() => {
    fetchPost();
  }, [])








  








  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  


  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Box
          sx={{ display: 'flex', flexWrap: 'wrap' }}
        >
          <TextField fullWidth sx={{ m: 1 }}
            value={name}
            label="Username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />


          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">Clube</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Clube"
              onChange={handleChange}
            >
              {todos.map((name) => (
                <MenuItem
                  key={name.getName()}
                  value={name.getName()}
                >
                  {name.getName()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>




        </Box>

        <FormControl sx={{ m: 1 }}>
          <Button variant="contained" color="success" disabled = {activeButton}>LOGIN</Button>
        </FormControl>





      </header>
    </div>
  );



}

export default App;
