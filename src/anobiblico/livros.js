import {AppBar, Box, Card, CardContent, CircularProgress, Fab, IconButton, Toolbar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import React from "react";
import nvi from "../biblia/nvi";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {equalTo, onValue, orderByChild, query, ref} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import {PictureAsPdf} from "@mui/icons-material";
import certificado from "../imagens/CertificadoBase64";

const TelaAnoBiblicoLivros = () => {


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
        sessionStorage.removeItem("idAno");

    }

    function getContagem(id, contagem) {
        const database = query(ref(realtime, 'RESPOSTAS/' + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id') +
            '/PLANOLEITURAX/' + sessionStorage.getItem('idAno')), orderByChild("livroId"), equalTo((id + 1).toString()));


        var retorno = 0
        onValue(database, (snapshot) => {
            const numFilhos = snapshot.size;
            retorno = numFilhos / contagem * 100
        })

        return retorno

    }

    const clube = sessionStorage.getItem("clube")

    function handleClick(id) {
        sessionStorage.setItem("idLivroB", id)
        navigate('/anobCaps');
    }

    const handleClickOpen = () => {

        const database = ref(realtime, 'RESPOSTAS/' + sessionStorage.getItem('clubeId') + '/'
            + sessionStorage.getItem('id') + "/PLANOLEITURAX/" + sessionStorage.getItem('idAno'));

        onValue(database, (snapshot) => {
            var ll = []

            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            const maxTime = Math.max(...ll.map(item => item.data.time));
            const minTime = Math.min(...ll.map(item => item.data.time));

            const formatDate = (timestamp) => {
                const date = new Date(timestamp);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Os meses começam do zero
                const year = date.getFullYear();
                return `${padNumber(day)}/${padNumber(month)}/${year}`;
            };

            function padNumber(number) {
                return number < 10 ? '0' + number : number;
            }


            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");

            var imagemExistente = new Image();
            imagemExistente.src = certificado; // Substitua pelo caminho real da sua imagem

            imagemExistente.onload = function () {

                canvas.width = imagemExistente.width;
                canvas.height = imagemExistente.height;

                // Adiciona a imagem ao canvas
                ctx.drawImage(imagemExistente, 0, 0);


                var texto = "Certificamos que\n" + sessionStorage.getItem('nome') + "\nconcluiu a leitura da bíblia, no aplicativo DBV Oeste ANC. \n" +
                    "Iniciado em " + formatDate(minTime) + " e terminado em " + formatDate(maxTime);
                ctx.font = "30px Arial"; // Defina o tamanho e a fonte do texto
                ctx.fillStyle = "black"; // Cor do texto
                ctx.textAlign = "center"; // Alinhamento centralizado
                ctx.textBaseline = "middle"; // Alinhamento centralizado verticalmente

                // Calcula a posição central do canvas para o texto
                var x = canvas.width / 2;
                var y = canvas.height / 2;

                // Adiciona o texto ao canvas com quebras de linha
                var lineHeight = 25; // Altura de cada linha
                var lines = texto.split('\n'); // Divide o texto em linhas

                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].includes(sessionStorage.getItem('nome'))) {
                        // Se a linha contiver o nome, adiciona em negrito
                        ctx.font = "bold 20px Arial"; // Tamanho e fonte em negrito
                    } else {
                        // Restaura para o padrão
                        ctx.font = "20px Arial";
                    }

                    // Desenha a linha
                    ctx.fillText(lines[i], x, y - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight);
                }


                // Convertendo o canvas para um formato de dados de imagem
                var dataURL = canvas.toDataURL("image/png");

                // Abrindo a imagem em outra página
                var novaPagina = window.open();
                novaPagina.document.write('<img src="' + dataURL + '" alt="">');
            };


        })

    }

    function getPorcentoGeral() {
        const database = ref(realtime, 'RESPOSTAS/' + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id') +
            '/PLANOLEITURAX/' + sessionStorage.getItem('idAno'));

        var retorno = 0
        onValue(database, (snapshot) => {
            const numFilhos = snapshot.size;
            retorno = numFilhos / 1187 * 100
        })

        console.log(retorno)

        return retorno

    }


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
                            Clube {clube} (Ano Bíblico)
                        </Typography>
                        <Typography variant="body1" sx={{marginRight: 2, color: "white"}}>
                            {getPorcentoGeral().toFixed(2)}%
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>


            <div>
                <Box sx={{maxHeight: '88vh', overflow: 'auto'}}>
                    <Box sx={{flexGrow: 1, margin: 2}}>

                        <Grid container spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 12, sm: 10, md: 8}}
                              color="inherit">
                            {nvi.map((livrox, i) => (
                                <Grid justifyContent="flex-end" item xs={12} sm={6} md={4} key={i}>
                                    <Card
                                        id={livrox.id}
                                        className={"xx"}
                                        style={{backgroundColor: getContagem(i, livrox.chapters.length) === 100 ? "#00dd0d" : "white"}}
                                        onClick={() => handleClick(i)}
                                    >
                                        <CardContent style={{position: 'relative'}} sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            height: "100%",
                                        }}>
                                            <div className="box"
                                                 style={{
                                                     display: "flex",
                                                     flexWrap: "wrap",
                                                     justifyContent: "space-between"
                                                 }}>
                                                <div className="title">{livrox.name}</div>
                                                <div className="title" id={"perc" + livrox.id}
                                                     style={{
                                                         justifyContent: "center",
                                                         alignItems: "center",
                                                         position: "relative",
                                                         display: "inline-block"
                                                     }}>
                                                    <Box sx={{position: 'relative', display: 'inline-flex'}}>
                                                        <CircularProgress sx={{color: '#227C70'}}
                                                                          style={{width: '60px', height: '60px'}}
                                                                          variant="determinate"
                                                                          value={getContagem(i, livrox.chapters.length)}/>
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
                                                            <Typography variant="caption" component="div"
                                                                        color="text.secondary"
                                                                        sx={{fontSize: '12px'}}>
                                                                {(() => {
                                                                    try {
                                                                        const contagemValue = Number(getContagem(i, livrox.chapters.length));
                                                                        return `${contagemValue ? contagemValue.toFixed(2) : '0'}%`;
                                                                    } catch (error) {
                                                                        console.error('Erro ao formatar a porcentagem:', error);
                                                                        return 'Erro';
                                                                    }
                                                                })()}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>

            </div>


            {(getPorcentoGeral() >= 100) &&
                <Fab id={"fab"} style={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed'
                }} color="primary" aria-label="add"
                     onClick={handleClickOpen}
                >
                    <PictureAsPdf/>
                </Fab>}


        </div>
    );

}

export default TelaAnoBiblicoLivros;