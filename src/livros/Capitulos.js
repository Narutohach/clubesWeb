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
import {onValue, ref, set} from "@firebase/database";
import {firestore, realtime} from "../firebase_setup/firebase";
import {doc, getDoc} from "@firebase/firestore";

const Capitulos = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
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


    const [livrosList, setLivrosList] = useState([]);
    const [value, setValue] = useState("0");


    useEffect(() => {


        const livros = ref(realtime, "QUESTOES/LIVROS2/" + sessionStorage.getItem('livroIdz'));


        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setLivrosList(ll)

        });


    }, []);

    const handleClickCapitulos = (id, questao, link) => {
        sessionStorage.setItem('capituloId', id);
        sessionStorage.setItem('questao', questao);
        sessionStorage.setItem('link', link);
        sessionStorage.setItem('caminho', "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/"
            + sessionStorage.getItem('id') + "/LIVROS2/" + sessionStorage.getItem('livroIdz') + "/" + id);
        navigate('/livros/capitulos/seletor');
    }

    useEffect(() => {
            const resposta = ref(realtime, "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') + "/LIVROS2/" + sessionStorage.getItem('livroIdz'));


            onValue(resposta, (s1) => {

                if (s1.exists()) {

                    let lx = 0;

                    s1.forEach(snap => {
                            const data = snap.val();


                            if (document.getElementById(data.id)) {
                                if (!data.aprovado && !data.reprovado) {
                                    document.getElementById(data.id).style.background = "yellow";
                                } else if (!data.aprovado && data.reprovado) {
                                    document.getElementById(data.id).style.background = "red";
                                } else {

                                    lx = lx + 1;
                                    document.getElementById(data.id).style.background = "#00dd0d";
                                }
                            }

                        }
                    )

                    var valor = ((lx * 100) / livrosList.length).toFixed(0);


                    if (document.getElementById("porcento")) {
                        document.getElementById("porcento").innerHTML = valor + "%"
                    }

                    if (valor == "100") {

                        const fetchPost = async () => {

                            const lly = []

                            const logins = doc(firestore, "LOGINS", sessionStorage.getItem('id'), "AUXILIAR", "AUXILIAR");

                            const data = await getDoc(logins);

                            if (data.data().amigo) {
                                lly.push(1)
                            }

                            if (data.data().companheiro) {
                                lly.push(2)
                            }

                            if (data.data().pesquisador) {
                                lly.push(3)
                            }

                            if (data.data().pioneiro) {
                                lly.push(4)
                            }

                            if (data.data().excursionista) {
                                lly.push(5)
                            }

                            if (data.data().guia) {
                                lly.push(6)
                            }

                            lly.forEach((i) => {

                                    const resposta = ref(realtime, "QUESTOES/CLASSES/" + i);


                                    onValue(resposta, (s1) => {

                                        if (s1.exists()) {

                                            s1.forEach(snap => {
                                                const data = snap.val();
                                                if (data.tipo === 13 && data.leitura === sessionStorage.getItem('livroIdz')) {

                                                    const referencia = ref(realtime, "RESPOSTAS/" +
                                                        sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
                                                        "/CLASSES/" + i + "/" + data.id);

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
                                                            id: data.id,
                                                            concluido: true,
                                                            data: hora,
                                                            tipo: 13,
                                                            aprovado: true,
                                                            reprovado: false
                                                        }
                                                    )

                                                }
                                            })

                                        }
                                    })


                                }
                            )
                        }

                        fetchPost();

                    }

                }
            })

        }, [livrosList]
    )


// useEffect(() => {
//     if (value === 25)
//     alert(value)
// }, [value])


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
                            Clube {clube} (Livro - {sessionStorage.getItem("nomeLivroz")})
                        </Typography>

                        <div>
                            <Typography id="porcento" variant="h6" component="div" sx={{flexGrow: 1}}>
                                0%
                            </Typography>
                        </div>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        {livrosList.map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={12} key={i}>
                                <Item id={livrox.id} className={"xx"} onClick={() => {
                                    handleClickCapitulos(livrox.id, livrox.questão, livrox.link)
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
export default Capitulos