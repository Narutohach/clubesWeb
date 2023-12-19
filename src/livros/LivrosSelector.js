import * as React from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {AppBar, Toolbar, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {getDatabase, ref, onValue} from "@firebase/database"
import {realtime} from "../firebase_setup/firebase"
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";


const LivrosSelector = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")


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


    const [livrosList, setLivrosList] = useState([]);


    const livros = ref(realtime, "LIVROS2/");
    useEffect(() => {
        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setLivrosList(ll)

        }, {
            onlyOnce: true
        });
    }, []);

    const handleClickCapitulos = (id, nome) => {
        sessionStorage.setItem("livroIdz", id);
        sessionStorage.setItem("origemz", "leitura");
        sessionStorage.setItem("nomeLivroz", nome);
        navigate('/livros/capitulos');
    }


    const matches = useMediaQuery('(max-width:600px)');


    return (
        <div style={{position: 'fixed', width: '100%'}}>

            <Box sx={{flexGrow: 1}} style={{width: '100%'}}>
                <AppBar position="static" enableColorOnDark style={{width: '100%'}}>
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
                            Clube {clube} (Livros)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box sx={{maxHeight: '88vh', overflow: 'auto'}}>
                    <Box sx={{flexGrow: 1, margin: 2}}>
                        <Grid container spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 12, sm: 12, md: 12}}
                              color="inherit">
                            {livrosList.map((livrox, i) => (
                                <Grid justifyContent="flex-end" item xs={6} sm={6} md={2} key={i} style={{
                                    display: "flex",
                                    flexWrap: "wrap"
                                }}>
                                    <Item className={"x"} onClick={() => {
                                        handleClickCapitulos(livrox.id, livrox.nome)
                                    }}>
                                        <img src={livrox.enderecoImagem} alt="Ideais" width="250" height="300"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "130px" : "200px",
                                                 maxWidth: "100%",
                                             }}></img>
                                        <div className="desc">{livrox.nome}</div>
                                    </Item>
                                </Grid>
                            ))}

                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    );

}
export default LivrosSelector