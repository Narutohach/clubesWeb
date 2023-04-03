import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {AppBar, Dialog, DialogActions, DialogContent, Fab, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {onValue, ref, set} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Unidades = () => {

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


        const livros = ref(realtime, "UNIDADES/" + sessionStorage.getItem("clubeId"));


        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

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


    const [open, setOpen] = React.useState(false);
    const [unit, setUnit] = React.useState("");

    const handleClickOpen = () => {
        setUnit("");
        setOpen(true);
    };

    const handleClose = () => {
        setUnit("");
        setOpen(false);
    };

    const handleSave = () => {
        const referencia = ref(realtime, "UNIDADES/" + sessionStorage.getItem("clubeId") + "/" + (unidadesList.length + 1));

        set(referencia,
            {
                id: (unidadesList.length + 1),
                unidade: unit
            }

        )
        setOpen(false);
    }

    const handleClick = (l) => {
        sessionStorage.setItem("unidade", l)
        navigate('/config/unidade/membros')
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
                            Clube {sessionStorage.getItem("clube")} (Unidades)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>

            <div>
                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        {unidadesList.map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={12} key={i}>
                                <Item id={livrox.id} className={"xx"} onClick={() => {
                                    handleClick(livrox.id)
                                }}>
                                    <div className="title">{livrox.unidade}</div>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>

            <Fab id={"fab"} style={style} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da Unidade"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={unit}
                        onChange={(e) => {
                            setUnit(e.target.value.toUpperCase());
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} disabled = {unit.length < 4 }>Salvar</Button>
                </DialogActions>
            </Dialog>

        </div>
    );

}
export default Unidades