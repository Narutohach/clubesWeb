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


const Agenda = () => {


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

        const livros = ref(realtime, "AGENDA/" + sessionStorage.getItem('clubeId'));




        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setLivrosList1(ll);

        });

    }, [])







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
                            Clube {clube} (Agenda)
                        </Typography>


                        <div>

                        </div>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        {livrosList1.map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={12} key={i}>
                                <Item id={livrox.id} className={"xx"}>
                                    <div className="title">{livrox.titulo}</div>
                                    <div className="title">Data Inicial: {livrox.datade.date}/{livrox.datade.month + 1}/{livrox.datade.year + 1900}</div>
                                    <div className="title">Data Final: {livrox.datapara.date}/{livrox.datapara.month + 1}/{livrox.datapara.year + 1900}</div>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default Agenda