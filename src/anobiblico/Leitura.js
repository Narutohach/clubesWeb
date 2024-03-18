import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {AppBar, Fab, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Check";
import * as React from "react";
import nvi from "../biblia/nvi";
import {push, ref, set} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import {useEffect} from "react";

const TelaAnoBiblicoLeitura = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const clube = sessionStorage.getItem("clube")
    const livro = sessionStorage.getItem("idLivroB")
    const capitulo = sessionStorage.getItem("idCapituloB")

    const style1 = {
        padding: 10
    };

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            console.log("bottom")
        }
    }

    function concluido(id) {
        const referencia = ref(realtime, "RESPOSTAS/" + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id') +
            "/PLANOLEITURAX/" + sessionStorage.getItem('idAno') + "/L" + (Number(livro) + 1) + "C" + (Number(capitulo) + 1))

        const today = new Date();

        const dd = {
            date: today.getDate(),
            day: today.getDay(),
            hours: today.getHours(),
            minutes: today.getMinutes(),
            month: today.getMonth(),
            seconds: today.getSeconds(),
            time: today.getTime(),
            timezoneOffset: 180,
            year: today.getYear()
        }

        set(referencia,
            {
                id: "L" + (Number(livro) + 1) + "C" + (Number(capitulo) + 1),
                data: dd,
                livroId: (Number(livro) + 1).toString()
            })

        navigate(-1);

    }

    return (
        <div style={{position: 'fixed', width: '100%'}}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" >
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
                            Clube {clube} (Ano Bíblico)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>


            <div style={{maxHeight: '92vh', overflow: 'auto', padding: 10}} onScroll={handleScroll}>
                {nvi[Number(livro)].chapters[Number(capitulo)].map((livrox, i) => (
                    <div style={{padding: 5, fontSize: "25px"}}>
                        <b><small><sup>{parseInt(i) + 1}</sup></small></b>
                        {" " + livrox}
                    </div>
                ))}
                <div style={{position: "relative"}}>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        padding: 10
                    }}>

                        <Fab id={"fab"} color="primary" aria-label="add" onClick={() => concluido()}>
                            <AddIcon/>
                        </Fab>
                    </div>
                </div>
            </div>


        </div>
    );

}

export default TelaAnoBiblicoLeitura;