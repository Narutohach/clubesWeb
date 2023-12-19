import * as React from 'react';
import {useEffect} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import logoConfig from '../imagens/password.svg';
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar, useMediaQuery} from "@mui/material";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/ArrowBack';
import Group from '@mui/icons-material/Group';
import User from '@mui/icons-material/AccountCircle';
import {AccountCircle, Password, People} from "@mui/icons-material";

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

    const handleClickUsers = () => navigate('/config/users');

    const matches = useMediaQuery('(max-width:600px)');

    return (
        <div style={{position: 'fixed', width: '100%'}}>

            <Box sx={{flexGrow: 1}} style={{ width: '100%' }}>
                <AppBar position="static" enableColorOnDark style={{ width: '100%' }}>
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
                <Box sx={{maxHeight: '88vh', overflow: 'auto'}}>
                    <Box sx={{flexGrow: 1, margin: 2}}>

                        <Grid container spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 12, sm: 10, md: 8}}
                              color="inherit">

                            <Grid item xs={6} sm={6} md={2} key={1}>
                                <Item className={"x"} onClick={() => {
                                    handleClickSenha()
                                }}>
                                    <Password src={logoConfig} alt="Alterar Senha" width="300" height="200"
                                         style={{
                                             display: "block",
                                             marginLeft: "auto",
                                             marginRight: "auto",
                                             width: "60%",
                                             height: matches ? "100px" : "200px",
                                             maxWidth: "100%",
                                             color: "black"
                                         }}></Password>
                                    <div className="desc">Alterar Senha</div>
                                </Item>
                            </Grid>

                            {(funcao == 1 || funcao == 2 || funcao == 3 || funcao == 5) &&
                                <Grid item xs={6} sm={6} md={2} key={2}>
                                    <Item className={"x"} onClick={() => {
                                        handleClickUnidades()
                                    }}>
                                        <People alt="Alterar Senha" width="300" height="200" sx={{
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            width: "60%",
                                            height: matches ? "100px" : "200px",
                                            maxWidth: "100%",
                                            color: "black"
                                        }}><Group/></People>
                                        <div className="desc">Unidades</div>
                                    </Item>
                                </Grid>}

                            {(funcao == 1 || funcao == 2 || funcao == 3 || funcao == 5) &&
                                <Grid item xs={6} sm={6} md={2} key={3}>
                                    <Item className={"x"} onClick={() => {
                                        handleClickUsers()
                                    }}>
                                        <AccountCircle alt="Alterar Senha" width="300" height="200" sx={{
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            width: "60%",
                                            height: matches ? "100px" : "200px",
                                            maxWidth: "100%",
                                            color: "black"
                                        }}><User/></AccountCircle>
                                        <div className="desc">Usuários</div>
                                    </Item>
                                </Grid>}


                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    );

}
export default Configuracoes