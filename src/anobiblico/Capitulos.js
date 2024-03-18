import {AppBar, Box, Card, CardContent, CircularProgress, IconButton, Toolbar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import nvi from "../biblia/nvi";
import {equalTo, onValue, orderByChild, query, ref} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";

const TelaAnoBiblicoCapitulos = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const clube = sessionStorage.getItem("clube")
    const livro = sessionStorage.getItem("idLivroB")

    console.log(livro)

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
        sessionStorage.removeItem("idLivroB");

    }

    function getLido(id) {
        const database = ref(realtime, 'RESPOSTAS/' + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id') +
            '/PLANOLEITURAX/' + sessionStorage.getItem('idAno') +
            '/L' + (Number(livro) + 1) + 'C' + id);


        var retorno = false
        onValue(database, (snapshot) => {

            retorno = snapshot.exists()
        })

        return retorno

    }

    function handleClick(id) {
        sessionStorage.setItem("idCapituloB", id)
        navigate('/anobLeitura');
    }

    return (
        <div style={{position: 'fixed', width: '100%'}}>
            <Box sx={{flexGrow: 1, width: '100%'}}>
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


            <div>
                <Box sx={{maxHeight: '92vh', overflow: 'auto'}}>
                    <Box id={"corpo"} sx={{flexGrow: 1, margin: 2, marginTop: "4px"}}>
                        <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 16}} color="inherit"
                              sx={{width: '100%'}}>
                            {nvi[Number(livro)].chapters.map((livrox, i) => (

                                <Grid justifyContent="flex-end" item xs={12} sm={6} md={4} key={i}>
                                    <Card
                                        id={livrox.id}
                                        className={"xx"}
                                        style={{backgroundColor: getLido(i + 1) ? "#006D31" : "none"}}
                                        onClick={() => handleClick(i)}
                                    >
                                        <CardContent style={{position: 'relative'}} sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}>
                                            <div className="box"
                                                 style={{
                                                     display: "flex",
                                                     flexWrap: "wrap",
                                                     justifyContent: "space-between"
                                                 }}>
                                                <div className="title">{i + 1}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>

            </div>

        </div>
    )
        ;
}

export default TelaAnoBiblicoCapitulos;