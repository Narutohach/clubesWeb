import * as React from 'react';
import './MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import espec from '../imagens/ic_especialidades.svg';
import logoIdeais from '../imagens/ic_ideais.svg';
import logoLivros from '../imagens/ic_livros.svg';
import logoLenco from '../imagens/lenco_removebg.png';
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar} from "@mui/material";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Logout';

const MenuPrincipal = () => {


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 10
    }));

    const navigate = useNavigate();
    const handleClickIdeais = () => navigate('/ideais');
    const handleClickLivros = () => navigate('/livros');
    const handleClickLenco = () => navigate('/lenco');
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
                        <Grid item xs={2} onClick={() => {
                            alert("ok")
                        }}>
                            <Item className={"x"}>
                                <img src={espec} alt="Especialidades" width="300" height="200"></img>
                                <div className="desc">Especialidades</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={2}>
                            <Item className={"x"} onClick={() => {
                                handleClickIdeais()
                            }}>
                                <img src={logoIdeais} alt="Ideais" width="300" height="200"></img>
                                <div className="desc">Ideais</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={3}>
                            <Item className={"x"} onClick={() => {
                                handleClickLivros()
                            }}>
                                <img src={logoLivros} alt="Livros" width="300" height="200"></img>
                                <div className="desc">Livros</div>
                            </Item>
                        </Grid>

                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickLenco()
                            }}>
                                <img src={logoLenco} alt="Lenço" width="300" height="200"></img>
                                <div className="desc">Prova do Lenço</div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default MenuPrincipal