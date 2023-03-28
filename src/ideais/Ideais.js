import * as React from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import imgLei from '../imagens/lei.jpg';
import imgVoto from '../imagens/voto.jpg';
import imgAlvo from '../imagens/alvo.jpg';
import imgLema from '../imagens/lema.jpg';
import imgObjetivo from '../imagens/objetivo.jpg';
import imgProposito from '../imagens/proposito.jpg';
import imgBiblia from '../imagens/voto_biblis.jpg';
import hino from '../videos/hino_desbravadores.mp4';
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Ideais = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
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
                                    sx={{ mr: 2, color: "white"}}
                                    onClick={goBack}>
                            <DeleteIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Clube {clube} (Ideais)
                        </Typography>




                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box sx={{flexGrow: 1, margin: 2}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        <Grid item xs={12} key={1}>
                            <a href={imgVoto}>
                                <Item className={"xx"}>
                                    <div className="desc">Voto</div>
                                </Item>
                            </a>
                        </Grid>

                        <Grid item xs={12} key={1}>
                            <a href={imgLei}>
                            <Item className={"xx"}>
                                <div class="desc">Lei</div>
                            </Item>
                            </a>
                        </Grid>

                        <Grid item xs={12}  key={1}>
                            <a href={imgAlvo}>
                                <Item className={"xx"}>
                                    <div className="desc">Alvo</div>
                                </Item>
                            </a>
                        </Grid>
                        <Grid item xs={12}  key={1}>
                            <a href={imgLema}>
                                <Item className={"xx"}>
                                    <div className="desc">Lema</div>
                                </Item>
                            </a>
                        </Grid>
                        <Grid item xs={12}  key={1}>
                            <a href={imgObjetivo}>
                                <Item className={"xx"}>
                                    <div className="desc">Objetivo</div>
                                </Item>
                            </a>
                        </Grid>
                        <Grid item xs={12}  key={1}>
                            <a href={imgProposito}>
                                <Item className={"xx"}>
                                    <div className="desc">Propósito</div>
                                </Item>
                            </a>
                        </Grid>
                        <Grid item xs={12}  key={1}>
                            <a href={imgBiblia}>
                                <Item className={"xx"}>
                                    <div className="desc">Voto de Fidelidade a Bíblia</div>
                                </Item>
                            </a>
                        </Grid>
                        <Grid item xs={12}  key={1}>
                            <a href={hino}>
                                <Item className={"xx"}>
                                    <div className="desc">Hino dos Desbravadores</div>
                                </Item>
                            </a>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default Ideais