import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {AppBar, Card, CardMedia, Fab, Toolbar} from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {onValue, ref, set} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import AddIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import {Stack} from "@mui/system";
import Grid from "@mui/material/Grid";

const TextoBiblico = () => {


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const questao = sessionStorage.getItem("questao")
    const descricao = sessionStorage.getItem("descricao")
    const minCaracteres = sessionStorage.getItem("minCaracteres")
    const tipo = sessionStorage.getItem("tipo")

    const [texto, setTexto] = useState([]);


    useEffect(() => {


        const livros = ref(realtime, "BIBLIA/" + sessionStorage.getItem("livro") + "/chapters/" + sessionStorage.getItem("chapter"));


        onValue(livros, (snapshot) => {

            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                const lx = new Object();
                lx.versiculo = snap.key;
                lx.texto = data;

                if (parseInt(snap.key) >= parseInt(sessionStorage.getItem("de")) && parseInt(snap.key) <= parseInt(sessionStorage.getItem("para")))
                    ll.push(lx);
            })
            setTexto(ll)

        });


    }, []);


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


    function writeUserData() {

        const referencia = ref(realtime, sessionStorage.getItem('caminho'));

        const today = new Date();
        var mes = 0;
        var dia = 0;

        if ((today.getMonth() + 1) < 10) {
            mes = "0" + (today.getMonth() + 1)
        } else {
            mes = (today.getMonth() + 1)
        }
        if ((today.getDate()) < 10) {
            dia = "0" + (today.getDate())
        } else {
            dia = (today.getDate())
        }

        var hora = dia + "" + mes + "" + today.getFullYear() + "_" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()

        set(referencia,
            {
                id: sessionStorage.getItem('capituloId'),
                concluido: true,
                data: hora,
                tipo: 9,
                aprovado: true,
                reprovado: false
            }
        )
    }

    const concluido = () => {
        writeUserData()
        navigate(-1);
    }

    const style1 = {
        padding: 10
    };

    const style2 = {
        padding: 1
    };

    const style3 = {
        position: "relative",
    };

    const style = {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 10
    };


    if (document.getElementById("fab")) {
        document.getElementById("fab").onclick = function () {
            concluido()
        };
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            console.log("bottom")
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
                            Clube {clube} (Resposta de Texto Bíblico)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <h3 style={style1}>
                    {sessionStorage.getItem("descricao_biblia")}
                </h3>
            </div>


            <div style={style1} onScroll={handleScroll}>
                {texto.map((livrox, i) => (
                    <div style={{padding: 5, fontSize: "25px"}}>
                        <b><small><sup>{parseInt(livrox.versiculo) + 1}</sup></small></b>
                        {" " + livrox.texto}
                    </div>
                ))}
            </div>


            <div style={style3}>
                <br/>
                <br/>
                <br/>
                <div style={style}>
                    <Fab id={"fab"} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </div>
            </div>

        </div>
    );

}
export default TextoBiblico