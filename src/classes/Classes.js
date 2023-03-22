import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {collection, getDoc, query, where, doc} from "@firebase/firestore";
import {loginConverter} from "../objetos/logins";
import {firestore} from "../firebase_setup/firebase"

import amigo from '../imagens/boton_amigo.png';
import companheiro from '../imagens/companheiros.png';
import pesquisador from '../imagens/pesquisador.png';
import pioneiro from '../imagens/pioneiros.png';
import excursionista from '../imagens/excursionistas.png';
import guia from '../imagens/guia.png';
import Grid from "@mui/material/Grid";


const Classes = () => {


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

    const [classes, setClasses] = useState([]);


    const fetchPost = async () => {
        const logins = doc(firestore, "LOGINS", sessionStorage.getItem('id'), "AUXILIAR", "AUXILIAR");

        const data = await getDoc(logins);

        var ll = []

        if (data.data().amigo) {
            ll.push(1)
        }

        if (data.data().companheiro) {
            ll.push(2)
        }

        if (data.data().pesquisador) {
            ll.push(3)
        }

        if (data.data().pioneiro) {
            ll.push(4)
        }

        if (data.data().excursionista) {
            ll.push(5)
        }

        if (data.data().guia) {
            ll.push(6)
        }

        setClasses(ll)


        // querySnapshotLogins.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //
        // });
    }

    useEffect(() => {
        fetchPost();
    }, [])

    const getNome = (id) => {
        switch (id) {
            case 1: {
                return "Amigo";
                break;
            }
            case 2: {
                return "Companheiro";
                break;
            }
            case 3: {
                return "Pesquisador";
                break;
            }
            case 4: {
                return "Pioneiro";
                break;
            }
            case 5: {
                return "Excursionista";
                break;
            }
            case 6: {
                return "Guia";
                break;
            }
        }
        return "sem classe"
    }

    const getImagem = (id) => {
        switch (id) {
            case 1: {
                return amigo;
                break;
            }
            case 2: {
                return companheiro;
                break;
            }
            case 3: {
                return pesquisador;
                break;
            }
            case 4: {
                return pioneiro;
                break;
            }
            case 5: {
                return excursionista;
                break;
            }
            case 6: {
                return guia;
                break;
            }
        }
    }

    const handleClickAtividades = (livrox) => {
        sessionStorage.setItem('classe', livrox);
        navigate('/classes/Categoria');
    }


    const handleClickCapitulos = (id, nome) => {
        sessionStorage.setItem("livroId", id);
        sessionStorage.setItem("origem", "leitura");
        sessionStorage.setItem("nomeLivro", nome);
        navigate('/livros/capitulos');
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
                            Clube {clube} (Classes)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>

                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        {classes.map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={2} key={i}>
                                <Item className={"x"} onClick={() => {
                                    handleClickAtividades(livrox)
                                }}>
                                    <img src={getImagem(livrox)} alt="Ideais" width="250" height="300"></img>
                                    <div className="desc">{getNome(livrox)}</div>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </Box>

            </div>
        </div>
    );

}
export default Classes