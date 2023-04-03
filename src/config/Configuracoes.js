import * as React from 'react';
import {useEffect} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import logoConfig from '../imagens/password.svg';
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar} from "@mui/material";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/ArrowBack';
import Group from '@mui/icons-material/Group';

const Configuracoes = () => {

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
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: "10px 6px 5px grey"
    }));

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    if (sessionStorage.length === 0) {
        goBack()
    }

    const handleClickSenha = () => navigate('/config/Pass');

    const handleClickUnidades = () => navigate('/config/unidade');

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
                            Configurações
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box sx={{flexGrow: 1, margin: 2}}>

                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">

                        <Grid item xs={2} key={4}>
                            <Item className={"x"} onClick={() => {
                                handleClickSenha()
                            }}>
                                <img src={logoConfig} alt="Alterar Senha" width="300" height="200"
                                     style={{
                                         display: "block",
                                         marginLeft: "auto",
                                         marginRight: "auto",
                                         width: "60%"
                                     }}></img>
                                <div className="desc">Alterar Senha</div>
                            </Item>
                        </Grid>

                        {(funcao == 1 || funcao == 2 || funcao == 3 || funcao == 5) &&
                            <Grid item xs={2} key={4}>
                                <Item className={"x"} onClick={() => {
                                    handleClickUnidades()
                                }}>
                                    <svg alt="Alterar Senha" width="300" height="200" color="black" sx={{
                                        fontSize: 40,
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "60%",
                                        color: "black"
                                    }}><Group/></svg>
                                    <div className="desc">Unidades</div>
                                </Item>
                            </Grid>}


                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default Configuracoes