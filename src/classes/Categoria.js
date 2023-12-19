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
import {onValue, ref, query, orderByChild, equalTo} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from "prop-types";


const Categoria = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const classe = sessionStorage.getItem("classe")


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
    const [livrosList1, setLivrosList1] = useState([]);

    const [quests, setQuests] = useState([]);
    const [resp, setResp] = useState([]);


    useEffect(() => {

        const livros = ref(realtime, "QUESTOES/CLASSES/" + classe);

        // const qq = query(livros, orderByChild("categoria"), equalTo(i.unidade))


        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setQuests(ll);

        });

    }, [classe])


    useEffect(() => {

        const livros = ref(realtime, "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
            "/CLASSES/" + classe);

        // const qq = query(livros, orderByChild("categoria"), equalTo(i.unidade))


        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setResp(ll);

        });

    }, [quests])

    useEffect(() => {


        const livros = ref(realtime, "CATEGORIAS");


        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setLivrosList(ll)

        });


    }, [resp]);


    useEffect(() => {
        var ll = []
        livrosList.forEach((i) => {

            var j = i;

            if (quests.some(e => e.categoria === i.unidade)) {
                var questconta = quests.filter(e => (e.categoria === i.unidade));
                var respostt = quests.filter(e => resp.some(item => item.id === e.id && item.aprovado == true && e.categoria === i.unidade));

                j.qtde = ((respostt.length * 100) / questconta.length)
                ll.push(j)
            }

        })
        setLivrosList1(ll)
    }, [livrosList])


    // useEffect(() => {
    //     livrosList.forEach((i) => {
    //         const livros = ref(realtime, "QUESTOES/CLASSES/" + classe);
    //
    //         const qq = query(livros, orderByChild("categoria"), equalTo(i.unidade))
    //
    //
    //         onValue(qq, (snapshot) => {
    //             snapshot.forEach(snap => {
    //                 const data = snap.val();
    //                 i.ccq = snapshot.size;
    //
    //                 const respostax = ref(realtime, "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
    //                     "/CLASSES/" + classe);
    //
    //                 const qqx = query(respostax, orderByChild("aprovado"), equalTo(true))
    //
    //
    //                 if (!ll.includes(i)) {
    //                     ll.push(i)
    //                     setLlx(llx + 1)
    //                 }
    //             })
    //
    //         });
    //     })
    // }, [classe, livrosList])

    // useEffect(() => {
    //     setLivrosList1(ll)
    // }, [ll, llx])

    // useEffect(() => {
    //     livrosList1.forEach((i) => {
    //         const livros = ref(realtime, "QUESTOES/CLASSES/" + classe);
    //
    //         const qq = query(livros, orderByChild("categoria"), equalTo(i.unidade))
    //
    //         var xc = i
    //
    //         onValue(qq, (snapshot) => {
    //             xc.ccq = snapshot.size
    //
    //         });
    //     })
    //
    // }, [livrosList1])

    const handleClick = (livrox, nome) => {
        sessionStorage.setItem("categoriaId", livrox);
        sessionStorage.setItem("titulo", "Classe - " + nome)
        sessionStorage.setItem("veio", "classe")
        sessionStorage.setItem("classex", nome)
        sessionStorage.setItem("questionResponse", "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
            "/CLASSES/" + classe)
        sessionStorage.setItem("questionPatchy", "QUESTOES/CLASSES/" + classe)


        navigate('/especialidades/atividades');
    }


    const [qst, setQst] = useState(0);
    // calcula o tanto de questões
    useEffect(() => {
        const resposta = ref(realtime, "QUESTOES/CLASSES/" + classe);
        onValue(resposta, (s1) => {
            if (s1.exists()) {
                setQst(s1.size)
            }
        })

    }, [livrosList])

    // calcula as respostas
    useEffect(() => {
        const resposta = ref(realtime, "RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') +
            "/CLASSES/" + classe);

        const qq = query(resposta, orderByChild("aprovado"), equalTo(true))

        onValue(qq, (s1) => {
            if (s1.exists()) {
                if (document.getElementById("porcento")) {
                    document.getElementById("porcento").innerHTML = ((s1.size * 100) / qst).toFixed(0) + "%"
                }
            }
        })

    }, [classe, qst])


    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress sx={{color: '#227C70'}} variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    CircularProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate variant.
         * Value between 0 and 100.
         * @default 0
         */
        value: PropTypes.number.isRequired,
    };


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
                            Clube {clube} (Categoria das Classes)
                        </Typography>

                        <div>
                            <Typography id="porcento" variant="h6" component="div" sx={{flexGrow: 1}}>
                                0%
                            </Typography>
                        </div>

                        <div>

                        </div>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box sx={{maxHeight: '88vh', overflow: 'auto'}}>
                    <Box sx={{flexGrow: 1, margin: 2}}>
                        <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                            {livrosList1.map((livrox, i) => (
                                <Grid justifyContent="flex-end" item xs={12} key={i}>
                                    <Item id={livrox.id} className={"xx"} onClick={() => {
                                        handleClick(livrox.id, livrox.unidade)
                                    }}>
                                        <div className="box"
                                             style={{
                                                 display: "flex",
                                                 flexWrap: "wrap",
                                                 justifyContent: "space-between"
                                             }}>
                                            <div className="title">{livrox.unidade}</div>
                                            <div className="title" id={"perc" + livrox.id}
                                                 style={{
                                                     justifyContent: "center",
                                                     alignItems: "center",
                                                     position: "relative",
                                                     display: "inline-block"
                                                 }}>
                                                <CircularProgressWithLabel value={livrox.qtde}/>
                                            </div>

                                        </div>
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
export default Categoria