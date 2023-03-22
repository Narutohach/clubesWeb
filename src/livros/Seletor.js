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

const Seletor = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            navigate('/', { replace: true });
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

    const handleClickVideo = () => {
        navigate('/respostas/video');
    }

    const handleClickPdf = () => {
        navigate('/respostas/pdf');
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
                            Clube {clube} (Livro
                            - {sessionStorage.getItem("nomeLivro")} - {sessionStorage.getItem("questao")})
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box sx={{flexGrow: 1, margin: 2}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        <Grid item xs={12} key={1}>

                                <Item className={"xx"} onClick={() => {
                                    handleClickPdf()
                                }}>
                                    <div className="desc">Leitura</div>
                                </Item>

                        </Grid>

                        <Grid item xs={12} key={2}>
                            <Item className={"xx"} onClick={() => {
                                handleClickVideo()
                            }}>
                                <div class="desc">Audio Livro (Vídeo Youtube)</div>
                            </Item>
                        </Grid>


                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default Seletor