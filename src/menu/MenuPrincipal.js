import * as React from 'react';
import {useEffect} from 'react';
import './MenuPrincipal.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import espec from '../imagens/ic_especialidades.svg';
import especWhite from '../imagens/ic_especialidades_white.svg';
import classes from '../imagens/ic_classes.svg';
import classesWhite from '../imagens/ic_classes_white.svg';
import AnoB from '../imagens/book_24.svg';
import AnoBWhite from '../imagens/book_24_white.svg';
import logoIdeais from '../imagens/ic_ideais.svg';
import logoIdeaisWhite from '../imagens/ic_ideais_white.svg';
import logoLivros from '../imagens/ic_livros.svg';
import logoLivrosWhite from '../imagens/ic_livros_white.svg';
import logoLenco from '../imagens/lenco_removebg.png';
import logoCavaleiro from '../imagens/escudocvfdesbrava.png';
import logoConfig from '../imagens/ic_configuracoes_1.svg';
import logoConfigWhite from '../imagens/ic_configuracoes_white.svg';
import logoAgenda from '../imagens/ic_agenda_1.svg';
import logoAgendaWhite from '../imagens/ic_agenda_white.svg';
import logoCantinho from '../imagens/cantinho.png';
import {useNavigate} from "react-router-dom";
import {AppBar, Card, CardActionArea, CardContent, Toolbar, useMediaQuery} from "@mui/material";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Logout';
import {ThemeContext} from "@emotion/react";

const MenuPrincipal = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const funcao = sessionStorage.getItem("funcao");


    const navigate = useNavigate();

    const handleClickEspecialidades = () => navigate('/categoriaespecialidade');

    const handleClickClasses = () => navigate('/classes');
    const handleClickIdeais = () => navigate('/ideais');
    const handleClickLivros = () => navigate('/livros');
    const handleClickLenco = () => navigate('/lenco');

    const handleClickAgenda = () => navigate('/agenda');
    const handleClickAnoB = () => navigate('/anob');
    const handleClickCantinho = () => navigate('/Cantinho');

    const handleClickConfig = () => navigate('/config');

    const handleClickCavaleiro = () => {
        sessionStorage.setItem('classe', 15);
        navigate('/classes/Categoria');
    }
    const goBack = () => {
        navigate(-1);
    }

    if (sessionStorage.length === 0) {
        goBack()
    }

    const matches = useMediaQuery('(max-width:600px)');

    const theme = React.useContext(ThemeContext);


    return (
        <div style={{position: 'fixed'}}>

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>

                        {/*<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>*/}
                        {/*    <MenuIcon />*/}
                        {/*</IconButton>*/}

                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Clube {clube}
                        </Typography>

                        <div>
                            <IconButton aria-label="sair" sx={{color: "white"}} onClick={goBack}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>


                    </Toolbar>
                </AppBar>
            </Box>

            <div className="nome">Olá {nome}</div>
            <div>
                <Box sx={{maxHeight: '83vh', overflow: 'auto'}}>
                    <Box sx={{flexGrow: 1, margin: 2}}>

                        <Grid container spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 12, sm: 10, md: 8}}
                              color="inherit">

                            <Grid item xs={6} sm={3} md={2} key={1}>

                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickConfig()
                                    }}>
                                        <img src={theme.palette.mode === 'dark' ? logoConfigWhite : logoConfig} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Configurações
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={2}>

                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickClasses()
                                    }}>
                                        <img src={theme.palette.mode === 'dark' ? classesWhite : classes} alt="Especialidades" width="300"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 fill: 'white',
                                                 color: 'white',
                                                 stroke: 'white',
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Classes
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>


                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={3}>


                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickEspecialidades()
                                    }}>
                                        <img src={theme.palette.mode === 'dark' ? especWhite : espec} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Especialidades
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={4}>

                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickIdeais()
                                    }}>
                                        <img src={theme.palette.mode === 'dark' ? logoIdeaisWhite : logoIdeais} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Ideais
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={5}>

                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickLivros()
                                    }}>
                                        <img src={theme.palette.mode === 'dark' ? logoLivrosWhite : logoLivros} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Livros
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={6}>

                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickLenco()
                                    }}>
                                        <img src={logoLenco} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Prova do Lenço
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>


                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={7}>


                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickCavaleiro()
                                    }}>
                                        <img src={logoCavaleiro} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Cavaleiro Fiel
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>


                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={8}>

                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickAgenda()
                                    }}>
                                        <img src={theme.palette.mode === 'dark' ? logoAgendaWhite : logoAgenda} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Agenda do Clube
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>

                            <Grid item xs={6} sm={3} md={2} key={9}>

                                <Card sx={{width: '100%', height: '100%'}}>
                                    <CardActionArea style={{height: '100%'}} onClick={() => {
                                        handleClickAnoB()
                                    }}>
                                        <img src={theme.palette.mode === 'dark' ? AnoBWhite : AnoB} alt="Cavaleiro Fiel"
                                             style={{
                                                 display: "block",
                                                 marginLeft: "auto",
                                                 marginRight: "auto",
                                                 width: "60%",
                                                 height: matches ? "100px" : "200px",
                                                 maxWidth: "100%",
                                                 marginTop: '20px'
                                             }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" align="center"
                                                        style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                Ano Bíblico
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>

                            {/* eslint-disable-next-line eqeqeq */}
                            {(funcao == 1 || funcao == 2 || funcao == 3 || funcao == 4 || funcao == 5) &&
                                <Grid item xs={6} sm={3} md={2} key={10}>


                                    <Card sx={{width: '100%', height: '100%'}}>
                                        <CardActionArea style={{height: '100%'}} onClick={() => {
                                            handleClickCantinho()
                                        }}>
                                            <img src={logoCantinho} alt="Cavaleiro Fiel"
                                                 style={{
                                                     display: "block",
                                                     marginLeft: "auto",
                                                     marginRight: "auto",
                                                     width: "60%",
                                                     height: matches ? "100px" : "200px",
                                                     maxWidth: "100%",
                                                     marginTop: '20px'
                                                 }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" align="center"
                                                            style={{fontSize: 'calc(10px + 2vmin)'}}>
                                                    Cantinho da Unidade
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>}


                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    );

}
export default MenuPrincipal