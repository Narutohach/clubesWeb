import * as React from 'react';
import './MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import espec from '../imagens/ic_especialidades.svg';
import classes from '../imagens/ic_classes.svg';
import AnoB from '../imagens/book_24.svg';
import logoIdeais from '../imagens/ic_ideais.svg';
import logoLivros from '../imagens/ic_livros.svg';
import logoLenco from '../imagens/lenco_removebg.png';
import logoCavaleiro from '../imagens/escudocvfdesbrava.png';
import logoConfig from '../imagens/ic_configuracoes_1.svg';
import logoAgenda from '../imagens/ic_agenda_1.svg';
import logoCantinho from '../imagens/cantinho.png';
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar} from "@mui/material";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect} from "react";

const MenuPrincipal = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const funcao = sessionStorage.getItem("funcao");


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: "10px 6px 5px grey"
    }));

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

    return (
        <div>

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" enableColorOnDark>
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
                <Box sx={{flexGrow: 1, margin: 2}}>

                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">

                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickConfig()
                            }}>
                                <img src={logoConfig} alt="Cavaleiro Fiel" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Configurações</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2}>
                            <Item className={"x"} onClick={() => {
                                handleClickClasses()
                            }}>
                                <img src={classes} alt="Especialidades" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Classes</div>
                            </Item>
                        </Grid>


                        <Grid item xs={2}>
                            <Item className={"x"} onClick={() => {
                                handleClickEspecialidades()
                            }}>
                                <img src={espec} alt="Especialidades" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Especialidades</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={2}>
                            <Item className={"x"} onClick={() => {
                                handleClickIdeais()
                            }}>
                                <img src={logoIdeais} alt="Ideais" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Ideais</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={3}>
                            <Item className={"x"} onClick={() => {
                                handleClickLivros()
                            }}>
                                <img src={logoLivros} alt="Livros" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Livros</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickLenco()
                            }}>
                                <img src={logoLenco} alt="Lenço" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Prova do Lenço</div>
                            </Item>
                        </Grid>


                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickCavaleiro()
                            }}>
                                <img src={logoCavaleiro} alt="Cavaleiro Fiel" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Cavaleiro Fiel</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickAgenda()
                            }}>
                                <img src={logoAgenda} alt="Agenda" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Agenda do Clube</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickAnoB()
                            }}>
                                <img src={AnoB} alt="Agenda" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Ano Bíblico</div>
                            </Item>
                        </Grid>

                        {(funcao == 1 || funcao == 2 || funcao == 3 || funcao == 4 || funcao == 5) &&
                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickCantinho()
                            }}>
                                <img src={logoCantinho} alt="Agenda" width="300" height="200"
                                     style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "60%"}}></img>
                                <div className="desc">Cantinho da Unidade</div>
                            </Item>
                        </Grid>}


                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default MenuPrincipal