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

import {collection, getDocs, orderBy, query, where} from "@firebase/firestore"
import {firestore} from "./firebase_setup/firebase"
import {clubeConverter} from "./objetos/clubes"
import {loginConverter} from "./objetos/logins";
import {useNavigate} from "react-router-dom";

const Login = () => {

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
        window.history.go(1);
    }


    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [clube, setClube] = React.useState('');
    const [activeButton, setActiveButton] = useState(true);

    useEffect(() => {

        if (name.length > 3 && clube.length > 1 && password.length > 3) {
            setActiveButton(false)
        } else {
            setActiveButton(true)
        }
    }, [name.length, clube.length, password.length])

    const navigate = useNavigate();
    const handleClick = () => navigate('/menu');



    const [todos, setTodos] = useState([]);


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


    function removeNullBytes(str) {
        return str.split("").filter(char => char.codePointAt(0)).join("")
    }
    async function listaLogins() {
        var selecionado = age.getId()
        var clubeNome = age.getName()


        var nn = name;
        var pp = password;

        console.log("aqui", selecionado, clubeNome, nn)

        const logins = query(collection(firestore, "LOGINS"), where("clubeId", "==", selecionado), where("login", "==", nn), where("ativo", "==", true)).withConverter(loginConverter);

        const querySnapshotLogins = await getDocs(logins);



        var valida = 0

        querySnapshotLogins.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            console.log("aqui", doc.data().getNome())





            const CryptoJS = require('crypto-js');

            var base64EncodedKeyFromJava = 'YTJ3QFQjeTdmO3MndS1vdA==';
            var keyForCryptoJS = CryptoJS.enc.Base64.parse(base64EncodedKeyFromJava);

            var encryptString = doc.data().getSenha()
            var decodeBase64 = CryptoJS.enc.Hex.parse(encryptString)

            var decryptedData = CryptoJS.AES.decrypt(
                {
                    ciphertext: decodeBase64
                },
                keyForCryptoJS,
                {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7

                }
            );

            var nome = doc.data().getNome();
            var id = doc.data().getLoginnId();
            var clubeId = doc.data().getClubeId();
            var funcao = doc.data().getFuncao();
            var unidade = doc.data().getUnidade();




            var decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);


            if (removeNullBytes(decryptedText) == pp) {
                sessionStorage.setItem('nome', nome)
                sessionStorage.setItem('id', id)
                sessionStorage.setItem('clubeId', clubeId)
                sessionStorage.setItem('funcao', funcao)
                sessionStorage.setItem('unidade', unidade)
                sessionStorage.setItem('clube', clubeNome)

                // window.location.href = "menu.html";
                handleClick()

            } else {
                alert("Login ou Senha inválidos")
            }




            valida = 1




        });

        if (valida == 0) {
            alert("Login ou Senha inválidos")
        }
    }


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setAge(event.target.value);
        setClube(event.target.value.getName());
    };


    return (

        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>

                <Box
                    sx={{display: 'flex', flexWrap: 'wrap'}}
                >
                    <TextField fullWidth sx={{m: 1}}
                               value={name}
                               label="Username"
                               onChange={(e) => {
                                   setName(e.target.value);
                               }}
                    />


                    <FormControl fullWidth sx={{m: 1}} variant="outlined">
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
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{m: 1}}>
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
                                    value={name}
                                >
                                    {name.getName()}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                </Box>

                <FormControl sx={{m: 1}}>
                    <Button variant="contained" color="success"  onClick={() => {
                        listaLogins()
                    }} disabled = {activeButton}>LOGIN</Button>
                </FormControl>


            </header>
        </div>
    );


}

export default Login;
