import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    Fab,
    IconButton,
    MaterialTheme,
    TextField,
    Toolbar
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import '../menu/MenuPrincipal.css';
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {onValue, push, ref, set} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";


const TelaAnoBiblico = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const [anoList, setAnoList] = useState([]);
    const [anoList1, setAnoList1] = useState([]);

    useEffect(() => {
        const database = ref(realtime, 'PLANOLEITURAX/' + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id'));

        onValue(database, (snapshot) => {
            var ll = []

            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setAnoList(ll)


        })

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const promises = anoList.map(async (i) => {
                return new Promise((resolve) => {
                    const database = ref(realtime, 'RESPOSTAS/' + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id') +
                        '/PLANOLEITURAX/' + i.id);

                    onValue(database, (snapshot) => {
                        const numFilhos = snapshot.size;
                        i.qtde = numFilhos / 1187 * 100;
                        resolve(i);
                    });
                });
            });

            const updatedAnoList = await Promise.all(promises);
            setAnoList1(updatedAnoList);
        };

        fetchData();
    }, [anoList]);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    function getContagem(id) {
        const database = ref(realtime, 'RESPOSTAS/' + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id') +
            '/PLANOLEITURAX/' + id);

        var retorno = 0
        onValue(database, (snapshot) => {
            const numFilhos = snapshot.size;
            retorno = numFilhos / 1187 * 100
        })

        return retorno

    }

    function formataData(jsonData) {
        var date = new Date(jsonData.year + 1900, jsonData.month, jsonData.date, jsonData.hours, jsonData.minutes, jsonData.seconds);

        var day = date.getDate();
        var month = date.getMonth() + 1; // Mês começa do zero, então adicionamos 1
        var year = date.getFullYear();

        return padNumber(day) + '/' + padNumber(month) + '/' + year

    }

    function padNumber(number) {
        return number < 10 ? '0' + number : number;
    }

    const [openx, setOpen] = React.useState(false);
    const [nomex, setNomex] = React.useState("");


    const handleClickOpen = () => {
        setNomex("")
        setOpen(true);
    };

    const handleClosex = () => {
        setNomex("")
        setOpen(false);
    };

    const handleConfirma = () => {

        const referencia = push(ref(realtime, "PLANOLEITURAX/" + sessionStorage.getItem('clubeId') + '/' + sessionStorage.getItem('id')))

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
                id: referencia.key,
                plano: nomex,
                dataInicial: dd
            })

        setNomex("")
        setOpen(false);
    };


    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress sx={{color: '#227C70'}} style={{width: '60px', height: '60px'}}
                                  variant="determinate" {...props} />
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
                    <Typography variant="caption" component="div" color="text.secondary" sx={{fontSize: '12px'}}>
                        {`${props.value.toFixed(2)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    function handleClick(id) {
        sessionStorage.setItem("idAno", id)
        navigate('/anoblivros');
    }

    const clube = sessionStorage.getItem("clube")

    return (
        <div>
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


            <div>
                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2, marginTop: "4px"}}>

                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">


                        {anoList1.map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={12} key={i}>
                                <Card id={livrox.id}
                                    // style={{backgroundColor: livrox.quantidade < livrox.estoqueMinimo ? "#D32F2F" : "white"}}
                                      className={"xx"}
                                      onClick={() => handleClick(livrox.id)}
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
                                            <div>
                                                <div className="title">{livrox.plano}</div>
                                                <div className="corpo">Data
                                                    Inicial: {formataData(livrox.dataInicial)}</div>
                                            </div>
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


                                    </CardContent>


                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>

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
                <AddIcon/>
            </Fab>


            <Dialog open={openx} onClose={handleClosex}>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome do Plano"
                        InputLabelProps={{
                            style: {color: '#D32F2F'},
                        }}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nomex}
                        onChange={(e) => {
                            setNomex(e.target.value.toUpperCase());
                        }}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosex}>Cancelar</Button>
                    <Button onClick={handleConfirma} disabled={nomex.length < 4}>Salvar</Button>
                </DialogActions>
            </Dialog>


        </div>


    );

}

export default TelaAnoBiblico;