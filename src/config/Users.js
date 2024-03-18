import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {AppBar, Dialog, DialogActions, DialogContent, Fab, Input, Menu, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import FilterIcon from "@mui/icons-material/FilterList";
import {useNavigate} from "react-router-dom";
import {firestore} from "../firebase_setup/firebase";
import {collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, where} from "@firebase/firestore";
import {loginConverter} from "../objetos/logins";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Users = (effect, deps) => {

    const funcao = sessionStorage.getItem("funcao");

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    if (sessionStorage.length === 0) {
        goBack()
    }

    const [unidadesList, setUnidadesList] = useState([]);

    useEffect(() => {


        const logins = query(collection(firestore, "LOGINS"), where("clubeId", "==", sessionStorage.getItem("clubeId")),
            orderBy("nome")).withConverter(loginConverter);
        const unsubscribe = onSnapshot(logins, (querySnapshot) => {
            const ll = [];
            querySnapshot.forEach((doc) => {
                ll.push(doc.data());
            });

            setUnidadesList(ll)

        });


    }, []);

    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    function getFuncao(i) {
        switch (i) {
            case 0: {
                return "Regional";
            }
            case 1: {
                return "Diretor";
            }
            case 2: {
                return "Diretor Associado";
            }
            case 3: {
                return "ADM";
            }
            case 4: {
                return "Conselheiro";
            }
            case 5: {
                return "Secretário do Clube";
            }
            case 6: {
                return "Instrutor";
            }
            case 7: {
                return "Capitão";
            }
            case 8: {
                return "Desbravador";
            }
        }
    }

    function retCor(i) {
        if (i) {
            return "none";
        } else {
            return "red";
        }
    }

    const [filtra, setFiltra] = useState(true);


    function filter(ativo) {
        return ativo.ativo === true
    }

    function retListaFilter(f) {
        if (f) {
            return unidadesList.filter(filter);
        } else {
            return unidadesList
        }
    }


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickItem = () => {
        setFiltra(!filtra);
        handleClose();
    };

    const [openx, setOpen] = React.useState(false);
    const [unit, setUnit] = React.useState("");
    const [loginx, setLoginx] = React.useState("");
    const [passx, setPassx] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [age, setAge] = React.useState('');


    const handleClickOpen = () => {
        setUnit("");
        setPassx("")
        setLoginx("")
        setAge("")
        setOpen(true);
    };

    const handleClosex = () => {
        setUnit("");
        setPassx("")
        setLoginx("")
        setAge("")
        setOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [ativo, setAtivo] = React.useState(true);
    useEffect(
        () => {
            setAtivo(unit.length < 4 || passx.length < 4 || loginx.length < 4 || age === "");
        }, [unit.length, passx.length, loginx.length, age]
    )


    const asyncFunc = async () => {
        const logins = query(collection(firestore, "LOGINS"), where("nome", "==", unit),
            where("clubeId", "==", sessionStorage.getItem("clubeId"))).withConverter(loginConverter);

        const querySnapshotLogins = await getDocs(logins);
        if (!querySnapshotLogins.empty) {
            alert("Já existe usuário cadastrado com esse nome")

        } else {

            const loginsx = query(collection(firestore, "LOGINS"), where("login", "==", loginx),
                where("clubeId", "==", sessionStorage.getItem("clubeId"))).withConverter(loginConverter);

            const querySnapshotLoginsx = await getDocs(loginsx);

            if (!querySnapshotLoginsx.empty) {
                alert("Já existe usuário cadastrado com esse Login")
            } else {


                const referencia = collection(firestore, "LOGINS");
                const ref = doc(collection(firestore, "LOGINS"));
                const id = ref.id;


                const CryptoJS = require('crypto-js');

                var base64EncodedKeyFromJava = 'YTJ3QFQjeTdmO3MndS1vdA==';
                var keyForCryptoJS = CryptoJS.enc.Base64.parse(base64EncodedKeyFromJava);


                var x = passx

                var remain = passx.length % 16;

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


                await setDoc(doc(referencia, id), {
                    loginId: id,
                    nome: unit,
                    senha: cipherString,
                    login: loginx,
                    funcao: age,
                    ativo: true,
                    clubeId: sessionStorage.getItem("clubeId"),
                    unidade: 0

                })

                handleClosex()
            }

        }
    }


    return (
        <div>

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" >
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
                            Clube {sessionStorage.getItem("clube")} (Unidades Membros)
                        </Typography>

                        <div>
                            <IconButton aria-label="sair" sx={{color: "white"}} onClick={handleClick}>
                                <FilterIcon/>
                            </IconButton>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {filtra && <MenuItem onClick={handleClickItem}>Todos</MenuItem>}
                                {!filtra && <MenuItem onClick={handleClickItem}>Somente Ativos</MenuItem>}
                            </Menu>

                        </div>


                    </Toolbar>
                </AppBar>
            </Box>

            <div>
                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2, maxHeight: 800, overflow: 'auto'}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        {retListaFilter(filtra).map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={12} key={i}>
                                <Item id={livrox.id} className={"xx"} onClick={() => {
                                    // handleClick(livrox.id)
                                }}>
                                    <div className="title"
                                         style={{color: retCor(livrox.getAtivo())}}>{livrox.getNome()}</div>
                                    <div>Função: {getFuncao(livrox.getFuncao())}</div>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>

            <Fab id={"fab"} style={style} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>


            <Dialog open={openx} onClose={handleClosex}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome Completo"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={unit}
                        onChange={(e) => {
                            setUnit(e.target.value.toUpperCase());
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Login"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={loginx}
                        onChange={(e) => {
                            setLoginx(e.target.value);
                        }}
                    />

                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <Input
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={passx}
                            onChange={(e) => {
                                setPassx(e.target.value);
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


                    <FormControl fullWidth variant="standard">
                        <InputLabel id="demo-simple-select-standard-label">Função</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Função"
                        >

                            {(funcao == 3 || funcao == 1) && <MenuItem value={1}>Diretor</MenuItem>}
                            {(funcao == 3 || funcao == 1) && <MenuItem value={2}>Diretor Associado</MenuItem>}
                            {funcao == 3 && <MenuItem value={3}>ADM</MenuItem>}
                            <MenuItem value={4}>Conselheiro</MenuItem>
                            {(funcao == 3 || funcao == 1) && <MenuItem value={5}>Secretário do Clube</MenuItem>}
                            <MenuItem value={6}>Instrutor</MenuItem>
                            <MenuItem value={7}>Capitão</MenuItem>
                            <MenuItem value={8}>Desbravador</MenuItem>
                        </Select>
                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosex}>Cancelar</Button>
                    <Button onClick={asyncFunc} disabled={ativo}>Salvar</Button>
                </DialogActions>
            </Dialog>


        </div>
    );

}
export default Users