import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {AppBar, Tab, Tabs, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {query, ref, set, push, child, onValue, orderByChild} from "@firebase/database";
import {firestore, realtime} from "../firebase_setup/firebase";
import {collection, getDocs, orderBy, where} from "@firebase/firestore";
import {loginConverter} from "../objetos/logins";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import Button from "@mui/material/Button";


const Cantinho = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const classe = sessionStorage.getItem("classe")



    const Item = styled(Paper)(({theme}) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        disableElevation: true

    }));

    const Itemx = styled(Paper)(({theme}) => ({
        padding: theme.spacing(1),
        textAlign: 'right'
    }));

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const [isCantinho, setIsCantinho] = React.useState(false);


    const [loginsList, setLoginsList] = useState([]);
    // const [livrosList1, setLivrosList1] = useState([]);
    //
    // const [quests, setQuests] = useState([]);
    // const [resp, setResp] = useState([]);
    //
    //
    useEffect(() => {

        async function listaLogins() {


            const logins = query(collection(firestore, "LOGINS"), where("clubeId", "==", sessionStorage.getItem('clubeId')),
                where("ativo", "==", true), orderBy('nome'))
                .withConverter(loginConverter);

            const querySnapshotLogins = await getDocs(logins);

            var funcao = sessionStorage.getItem('funcao');


            var ll = []
            querySnapshotLogins.forEach((doc) => {


                var logins = doc.data();


                if (funcao == 1 || funcao == 2 || funcao == 3 || funcao == 5) {
                    if (logins.funcao == 7 || logins.funcao == 8)
                        ll.push(doc.data())
                } else if (funcao == 4) {
                    if (logins.unidade == sessionStorage.getItem('unidade')) {
                        if (logins.funcao == 7 || logins.funcao == 8) {
                            console.log(doc.data().nome)
                            ll.push(doc.data())
                        }
                    }
                }

            });

            setLoginsList(ll);
        }

        listaLogins();


    }, [])

    const [value, setValue] = React.useState(0);


    useEffect(() => {

        const referencia = query(ref(realtime, "AGENDA/" + sessionStorage.getItem("clubeId")));


        onValue(referencia, (snapshot) => {

            snapshot.forEach(snap => {
                const data = snap.val();


                const today = new Date();
                var mes = today.getMonth();
                var dia = today.getDate();
                var ano = today.getFullYear();

                const date = new Date((data.datade.year + 1900) + "-" + (data.datade.month + 1) + "-" + data.datade.date)
                const dateToday = new Date(ano + "-" + (mes + 1) + "-" + dia)


                if (date.getTime() === dateToday.getTime() && data.cantinho == true) {

                    setIsCantinho(true)
                }


            })


        });

    }, [value])


    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    const [presenca, setPresenca] = React.useState(0);
    const [pontualidade, setPontualidade] = React.useState(0);
    const [lenco, setLenco] = React.useState(0);
    const [material, setMaterial] = React.useState(0);
    const [classex, setClassex] = React.useState(0);
    const [idQ, setIdQ] = React.useState("SEMID");

    const handleChangex = (event, newAlignment) => {
        setPresenca(newAlignment);
        if (newAlignment == 10) {
            setPontos(10);
        } else {
            setPontos(0);
            setPontualidade(0);
            setLenco(0);
            setMaterial(0);
            setClassex(0);
        }
    };

    useEffect(() => {
        setPontos(presenca + pontualidade + lenco + material + classex)
    }, [pontualidade, material, lenco, classex])

    useEffect(() => {
        setPontos(0);
        setLenco(0);
        setPresenca(0);
        setPontualidade(0);
        setMaterial(0);
        setClassex(0);
        setIdQ("SEMID");
    }, [value])

    useEffect(() => {

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


        const referencia = query(ref(realtime, "CANTINHO/" + sessionStorage.getItem("clubeId") + "/" + today.getFullYear()), orderByChild("loginId"));


        onValue(referencia, (snapshot) => {

            snapshot.forEach(snap => {
                const data = snap.val();

                if (data.loginId == loginsList[value]?.loginId) {

                    const today = new Date();
                    var mes = today.getMonth();
                    var dia = today.getDate();
                    var ano = today.getFullYear();

                    const date = new Date((data.date.year + 1900) + "-" + (data.date.month + 1) + "-" + data.date.date)
                    const dateToday = new Date(ano + "-" + (mes + 1) + "-" + dia)


                    if (date.getTime() === dateToday.getTime()) {


                        setLenco(data.lenco);
                        setPresenca(data.presenca);
                        setPontualidade(data.pontualidade);
                        setMaterial(data.material);
                        setClassex(data.classe);
                        setIdQ(data.id);


                    }


                }
            })


        });


    }, [loginsList, value]);

    const handleChangePontualidade = (event, newAlignment) => {
        setPontualidade(newAlignment);
    };

    const handleChangeLenco = (event, newAlignment) => {
        setLenco(newAlignment);
    };

    const handleChangeMaterial = (event, newAlignment) => {
        setMaterial(newAlignment);
    };

    const handleChangeClasse = (event, newAlignment) => {
        setClassex(newAlignment);
    };

    const [pontos, setPontos] = React.useState(0);

    function writeUserData() {


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

        const referencia = ref(realtime, "CANTINHO/" + sessionStorage.getItem("clubeId") + "/" + today.getFullYear());

        let newPostKey = ""

        if (idQ == "SEMID") {
            newPostKey = push(referencia).key
        } else {
            newPostKey = idQ
        }
        ;

        const dd = {
            date: today.getDate(),
            day: today.getDay(),
            hours: today.getHours(),
            minute: today.getMinutes(),
            month: today.getMonth(),
            seconds: today.getSeconds(),
            time: today.getTime(),
            timezoneOffset: 180,
            year: today.getYear()
        }


        set(child(referencia, newPostKey),
            {
                id: newPostKey,
                loginId: loginsList[value].loginId,
                unidadeId: loginsList[value].unidade,
                presenca: presenca,
                pontualidade: pontualidade,
                lenco: lenco,
                material: material,
                classe: classex,
                biblia: 0,
                tarefa: 0,
                date: dd
            }
        )
    }

    const concluido = () => {
        writeUserData()
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
                            Clube {clube} (Cantinho da Unidade)
                        </Typography>


                        <div>

                        </div>


                    </Toolbar>
                </AppBar>
            </Box>
            {isCantinho &&
                <div>

                    <Box style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {loginsList.map((livrox, i) => (
                                <Tab label={livrox.getNome()}/>
                            ))}
                        </Tabs>
                    </Box>
                    <Box style={{padding: 10}}>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Item><h2>{loginsList[value]?.nome}</h2></Item>
                            </Grid>
                            <Grid item xs={8}>
                                <Itemx><h2>pontuação: {pontos}</h2></Itemx>
                            </Grid>
                        </Grid> </Box>

                    <div style={{padding: 10}}>Presença</div>

                    <ToggleButtonGroup
                        color="primary"
                        value={presenca}
                        exclusive
                        onChange={handleChangex}
                        aria-label="Platform"
                        style={{width: "95%", padding: 10}}
                    >
                        <ToggleButton value={0} style={{width: "50%"}}>0</ToggleButton>
                        <ToggleButton value={10} style={{width: "50%"}}>10</ToggleButton>
                    </ToggleButtonGroup>

                    {presenca == 10 &&
                        <div style={{padding: 10}}>Pontualidade</div>

                    }

                    {presenca == 10 &&
                        <ToggleButtonGroup
                            color="primary"
                            value={pontualidade}
                            exclusive
                            onChange={handleChangePontualidade}
                            aria-label="Platform"
                            style={{width: "95%", padding: 10}}
                        >
                            <ToggleButton value={0} style={{width: "50%"}}>0</ToggleButton>
                            <ToggleButton value={5} style={{width: "50%"}}>5</ToggleButton>
                            <ToggleButton value={10} style={{width: "50%"}}>10</ToggleButton>
                        </ToggleButtonGroup>
                    }

                    {presenca == 10 &&
                        <div style={{padding: 10}}>Lenço e Uniforme (se desbravador não for investido, considerar a
                            pontuação máxima):</div>

                    }

                    {presenca == 10 &&
                        <ToggleButtonGroup
                            color="primary"
                            value={lenco}
                            exclusive
                            onChange={handleChangeLenco}
                            aria-label="Platform"
                            style={{width: "95%", padding: 10}}
                        >
                            <ToggleButton value={0} style={{width: "50%"}}>0</ToggleButton>
                            <ToggleButton value={5} style={{width: "50%"}}>5</ToggleButton>
                            <ToggleButton value={10} style={{width: "50%"}}>10</ToggleButton>
                        </ToggleButtonGroup>
                    }

                    {presenca == 10 &&
                        <div style={{padding: 10}}>Trouxe o Material Solicitado?</div>

                    }

                    {presenca == 10 &&
                        <ToggleButtonGroup
                            color="primary"
                            value={material}
                            exclusive
                            onChange={handleChangeMaterial}
                            aria-label="Platform"
                            style={{width: "95%", padding: 10}}
                        >
                            <ToggleButton value={0} style={{width: "50%"}}>0</ToggleButton>
                            <ToggleButton value={5} style={{width: "50%"}}>5</ToggleButton>
                            <ToggleButton value={10} style={{width: "50%"}}>10</ToggleButton>
                        </ToggleButtonGroup>
                    }

                    {presenca == 10 &&
                        <div style={{padding: 10}}>Classe em Dia?</div>

                    }

                    {presenca == 10 &&
                        <ToggleButtonGroup
                            color="primary"
                            value={classex}
                            exclusive
                            onChange={handleChangeClasse}
                            aria-label="Platform"
                            style={{width: "95%", padding: 10}}
                        >
                            <ToggleButton value={0} style={{width: "50%"}}>0</ToggleButton>
                            <ToggleButton value={5} style={{width: "50%"}}>5</ToggleButton>
                            <ToggleButton value={10} style={{width: "50%"}}>10</ToggleButton>
                        </ToggleButtonGroup>
                    }

                    <div style={{padding: 10}}>
                        <Button variant="contained" style={{width: "95%", padding: 10}}
                                onClick={() => {
                                    concluido();
                                }}>Salvar</Button>
                    </div>

                </div>}
            {!isCantinho &&
                <div>
                    <h2 style={{position: "fixed", top: "50%", left: "49%", transform: "translate(-50%, -50%)", color: "red", border: 0}}>Cantinho da unidade indisponível! (Ele ficará disponível somente nos dias de reunião)</h2>
                </div>}


        </div>

    )
        ;

}
export default Cantinho