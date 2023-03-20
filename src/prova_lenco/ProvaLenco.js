import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {onValue, ref} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";

const ProvaLenco = () => {


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


    useEffect(() => {
        const resposta = ref(realtime, "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
            "/LENCO");

        // alert("RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') + "/LIVROS2/" + sessionStorage.getItem('livroId') + "/" + data.id)


        onValue(resposta, (s1) => {

            if (s1.exists()) {
                s1.forEach(snap => {
                    const data = snap.val();

                    document.getElementById(data.id)

                    if (document.getElementById(data.id)) {
                        if (!data.aprovado && !data.reprovado) {
                            document.getElementById(data.id).style.background = "yellow"
                        } else if (!data.aprovado && data.reprovado) {
                            document.getElementById(data.id).style.background = "red"
                        } else {

                            document.getElementById(data.id).style.background = "#00dd0d"
                        }
                    }

                })

            }
        })

    }, [livrosList])

    useEffect(() => {


        const livros = ref(realtime, "QUESTOES/LENCO");


        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setLivrosList(ll)

        });


    }, []);

    const handleClick = (livrox) => {
        sessionStorage.setItem('capituloId', livrox.id);
        sessionStorage.setItem('questao', livrox.questão);
        sessionStorage.setItem('link', livrox.leitura);
        sessionStorage.setItem('tipo', livrox.tipo);
        sessionStorage.setItem('descricao', livrox.descricao);
        sessionStorage.setItem('minCaracteres', livrox.minCaracteres);
        sessionStorage.setItem('questionPatch', "QUESTOES/LENCO/" + livrox.id);

        if (livrox.tipo === 1) {
            sessionStorage.setItem('caminho', "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/"
                + sessionStorage.getItem('id') + "/LENCO/" + livrox.id);
            navigate('/respostas/escolha');
        }

        if (livrox.tipo === 2 || livrox.tipo === 11) {
            sessionStorage.setItem('caminho', "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/"
                + sessionStorage.getItem('id') + "/LENCO/" + livrox.id);
            navigate('/respostas/texto');
        }

        if (livrox.tipo === 4) {
            sessionStorage.setItem('caminho', "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/"
                + sessionStorage.getItem('id') + "/LENCO/" + livrox.id);
            navigate('/respostas/pontuacao');
        }

        if (livrox.tipo === 8) {
            sessionStorage.setItem('caminho', "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/"
                + sessionStorage.getItem('id') + "/LENCO/" + livrox.id);
            navigate('/respostas/video');
        }

        if (livrox.tipo === 16) {
            sessionStorage.setItem('caminho', "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/"
                + sessionStorage.getItem('id') + "/LENCO/" + livrox.id);
            navigate('/respostas/pdf');
        }


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
                            Clube {clube} (Prova do Lenço)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        {livrosList.map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={12} key={i}>
                                <Item id={livrox.id} className={"xx"} onClick={() => {
                                    handleClick(livrox)
                                }}>
                                    <div className="title">{livrox.questão}</div>
                                    <div className="desc">{livrox.descricao}</div>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default ProvaLenco