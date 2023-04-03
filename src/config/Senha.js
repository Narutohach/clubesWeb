import Box from "@mui/material/Box";
import {AppBar, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import '../App.css';
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { doc, updateDoc } from "firebase/firestore";
import {firestore} from "../firebase_setup/firebase";

const AltSenha = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }


    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [activeButton, setActiveButton] = useState(true);

    const [password1, setPassword1] = useState("");
    const [showPassword1, setShowPassword1] = React.useState(false);


    const [password2, setPassword2] = useState("");
    const [showPassword2, setShowPassword2] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    useEffect(() => {

        if (password.length > 3 && password1.length > 3 && password2.length > 3) {
            setActiveButton(false)
        } else {
            setActiveButton(true)
        }

    }, [password, password1, password2])

    const alterSenha = (event) => {
        const CryptoJS = require('crypto-js');

        var base64EncodedKeyFromJava = 'YTJ3QFQjeTdmO3MndS1vdA==';
        var keyForCryptoJS = CryptoJS.enc.Base64.parse(base64EncodedKeyFromJava);


        var x = password2

        var remain = 4 % 16;

        if (remain != 0) {
            remain = 16 - remain

            for (let i = 0; i < remain; i++) {
                x = x + String.fromCharCode(0)
            }
        }


        const cipherResult = CryptoJS.AES.encrypt(x, keyForCryptoJS, {
            mode: CryptoJS.mode.ECB
        });
        const cipherString = CryptoJS.enc.Hex.stringify(cipherResult.ciphertext);


        var pass = sessionStorage.getItem('pass');

        if (pass === password) {
            if (password1 === password2) {

                async function atualiza() {
                    const logins = doc(firestore, "LOGINS", sessionStorage.getItem("id"));
                    await updateDoc(logins, {
                        senha: cipherString
                    });

                    window.location = '/';
                }

                atualiza()

            } else {
                alert("novas senhas não conferem")
            }
        } else {
            alert("Senha Errada ")
        }

    }

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" enableColorOnDark>
                    <Toolbar>

                        <IconButton size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{mr: 2, color: "white"}}
                                    onClick={goBack}>
                            <DeleteIcon/>
                        </IconButton>


                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Alterar Senha
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div className="App">
                <header className="App-header">

                    <Box
                        sx={{display: 'flex', flexWrap: 'wrap'}}
                    >
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
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


                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Nova Senha</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword1 ? 'text' : 'password'}
                                value={password1}
                                onChange={(e) => {
                                    setPassword1(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword1}
                                            edge="end"
                                        >
                                            {showPassword1 ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Repita Nova Senha</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword2 ? 'text' : 'password'}
                                value={password2}
                                onChange={(e) => {
                                    setPassword2(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                            edge="end"
                                        >
                                            {showPassword2 ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>


                    </Box>

                    <FormControl sx={{m: 1}}>
                        <Button variant="contained" color="success" onClick={() => {
                            alterSenha()
                        }} disabled={activeButton}>ALTERAR SENHA</Button>
                    </FormControl>


                </header>
            </div>
        </div>
    );
}
export default AltSenha