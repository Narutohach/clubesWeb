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
import {equalTo, onValue, orderByChild, query, ref} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";

const Atividades = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome");
    const clube = sessionStorage.getItem("clube");
    const caminhoPergunta = sessionStorage.getItem("questionPatchy");
    const caminhoResposta = sessionStorage.getItem("questionResponse");


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
    const [ok, setOk] = useState(true);


    useEffect(() => {
        const resposta = ref(realtime, caminhoResposta);

        // alert("RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') + "/LIVROS2/" + sessionStorage.getItem('livroId') + "/" + data.id)


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

                })

            }
        })

    }, [livrosList])

    useEffect(() => {
        if (sessionStorage.getItem("veio") === "classe") {
            const qq = ref(realtime, caminhoPergunta);
            let livros = query(qq, orderByChild("categoria"), equalTo(sessionStorage.getItem("classex")))
            onValue(livros, (snapshot) => {
                var ll = []
                snapshot.forEach(snap => {
                    const data = snap.val();
                    ll.push(data)
                })

                setLivrosList(ll)

            });
        } else {
            let livros = ref(realtime, caminhoPergunta);
            onValue(livros, (snapshot) => {
                var ll = []
                snapshot.forEach(snap => {
                    const data = snap.val();
                    ll.push(data)
                })

                setLivrosList(ll)

            });
        }


    }, []);

    const handleClickCapitulos = (livrox) => {
        sessionStorage.setItem('capituloId', livrox.id);
        sessionStorage.setItem('questao', livrox.questão);
        sessionStorage.setItem('link', livrox.leitura);
        sessionStorage.setItem('tipo', livrox.tipo);
        sessionStorage.setItem('descricao', livrox.descricao);
        sessionStorage.setItem('minCaracteres', livrox.minCaracteres);
        sessionStorage.setItem('questionPatch', caminhoPergunta +
            "/" + livrox.id);
        sessionStorage.setItem('caminho', caminhoResposta +
            "/" + livrox.id);


        if (livrox.tipo === 1) {
            navigate('/respostas/escolha');
        }

        if (livrox.tipo === 2) {
            navigate('/respostas/texto');
        }

        if (livrox.tipo === 3) {
            navigate('/respostas/leitura');
        }

        if (livrox.tipo === 4) {
            navigate('/respostas/pontuacao');
        }

        if (livrox.tipo === 7) {
            sessionStorage.setItem("calcula", livrox.calculaIdade)
            sessionStorage.setItem("idade", livrox.idade)
            navigate('/respostas/data');
        }

        if (livrox.tipo === 8) {
            navigate('/respostas/video');
        }

        if (livrox.tipo === 9) {
            sessionStorage.setItem("descricao_biblia", livrosBiblicos[livrox.livro] + " " + (livrox.chapter + 1) + ":" + (livrox.de + 1) + "-" + (livrox.para + 1));
            sessionStorage.setItem('livro', livrox.livro);
            sessionStorage.setItem('chapter', livrox.chapter);
            sessionStorage.setItem('de', livrox.de);
            sessionStorage.setItem('para', livrox.para);
            navigate('/respostas/biblia');
        }

        if (livrox.tipo === 10) {
            sessionStorage.setItem("especIdE", livrox.leitura);
            sessionStorage.setItem("origemE", "edicao");
            sessionStorage.setItem("nomeLivroE", livrox.descricao);
            sessionStorage.setItem("tituloE", "Especialidade");
            sessionStorage.setItem("veioE", "especialidade");

            sessionStorage.setItem("questionResponseE", "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
                "/ESPECIALIDADES/" + livrox.livro + "/" + livrox.leitura)
            sessionStorage.setItem("questionPatchyE", "QUESTOES/ESPECIALIDADES/" + livrox.livro + "/" + livrox.leitura)
            navigate('/especialidades/atividadesespec')
        }

        if (livrox.tipo === 11) {
            navigate('/respostas/textoanexo', {state: {passa: livrox}});
        }

        if (livrox.tipo === 12) {
            sessionStorage.setItem("calcula", livrox.calculaIdade)
            sessionStorage.setItem("idade", livrox.idade)
            navigate('/respostas/datanexo');
        }

        if (livrox.tipo === 13) {
            sessionStorage.setItem("livroIdz", livrox.leitura);
            sessionStorage.setItem("origemz", "leitura");
            sessionStorage.setItem("nomeLivroz", livrox.descricao);
            navigate('/livros/capitulos', {state: {id: 7, color: 'green'}});
        }

        if (livrox.tipo === 14) {
            sessionStorage.setItem("especIdE", livrox.leitura);
            sessionStorage.setItem("origemE", "edicao");
            sessionStorage.setItem("nomeLivroE", livrox.descricao);
            sessionStorage.setItem("tituloE", "Especialidade");
            sessionStorage.setItem("veioE", "especialidade");

            sessionStorage.setItem("questionResponseE", "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
                "/ESPECIALIDADES/" + livrox.livro + "/" + livrox.leitura)
            sessionStorage.setItem("questionPatchyE", "QUESTOES/ESPECIALIDADES/" + livrox.livro + "/" + livrox.leitura)
            navigate('/respostas/multiespec')
        }


        if (livrox.tipo === 16) {
            navigate('/respostas/pdf');
        }

    }

    useEffect(() => {
        const resposta = ref(realtime, caminhoResposta);


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

                if (document.getElementById("porcento")) {
                    document.getElementById("porcento").innerHTML = ((lx * 100) / livrosList.length).toFixed(0) + "%"
                }

            }
        })

    }, [livrosList])


    return (
        <div style={{position: 'fixed', width: '100%'}}>

            <Box sx={{flexGrow: 1}} style={{width: '100%'}}>
                <AppBar position="static" enableColorOnDark style={{width: '100%'}}>
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
                            Clube {clube} ({sessionStorage.getItem("titulo")})
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
                <Box sx={{maxHeight: '88vh', overflow: 'auto'}}>
                    <Box sx={{flexGrow: 1, margin: 2}}>
                        <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                            {livrosList.map((livrox, i) => (
                                <Grid justifyContent="flex-end" item xs={12} key={i}>
                                    <Item id={livrox.id} className={"xx"} onClick={() => {
                                        handleClickCapitulos(livrox)
                                    }}>
                                        <div className="title">{livrox.questão}</div>
                                        <div className="desc">{livrox.descricao}</div>
                                        {livrox.tipo === 9 &&
                                            <div>
                                                {livrosBiblicos[livrox.livro]} {livrox.chapter + 1}:{livrox.de + 1}-{livrox.para + 1}
                                            </div>
                                        }
                                    </Item>
                                </Grid>
                            ))}

                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    );

}
export default Atividades


const livrosBiblicos = [
    "Gênesis",
    "Êxodo",
    "Levítico",
    "Números",
    "Deuteronômio",
    "Josué",
    "Juízes",
    "Rute",
    "1 Samuel",
    "2 Samuel",
    "1 Reis",
    "2 Reis",
    "1 Crônicas",
    "2 Crônicas",
    "Esdras",
    "Neemias",
    "Ester",
    "Jó",
    "Salmos",
    "Provérbios",
    "Eclesiastes",
    "Cânticos",
    "Isaías",
    "Jeremias",
    "Lamentações de Jeremias",
    "Ezequiel",
    "Daniel",
    "Oséias",
    "Joel",
    "Amós",
    "Obadias",
    "Jonas",
    "Miquéias",
    "Naum",
    "Habacuque",
    "Sofonias",
    "Ageu",
    "Zacarias",
    "Malaquias",
    "Mateus",
    "Marcos",
    "Lucas",
    "João",
    "Atos",
    "Romanos",
    "1 Coríntios",
    "2 Coríntios",
    "Gálatas",
    "Efésios",
    "Filipenses",
    "Colossenses",
    "1 Tessalonicenses",
    "2 Tessalonicenses",
    "1 Timóteo",
    "2 Timóteo",
    "Tito",
    "Filemom",
    "Hebreus",
    "Tiago",
    "1 Pedro",
    "2 Pedro",
    "1 João",
    "2 João",
    "3 João",
    "Judas",
    "Apocalipse"]