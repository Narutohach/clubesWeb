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
import {firestore} from "../firebase_setup/firebase";
import {collection, getDocs, query, where, orderBy} from "@firebase/firestore";
import {loginConverter} from "../objetos/logins";

const UnidadesMember = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


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

    if (sessionStorage.length === 0) {
        goBack()
    }

    const [unidadesList, setUnidadesList] = useState([]);

    useEffect(() => {


        async function obtem() {
            const logins = query(collection(firestore, "LOGINS"), where("clubeId", "==", sessionStorage.getItem("clubeId")),
                where("unidade", "==", parseInt(sessionStorage.getItem("unidade"))),
                where("ativo", "==", true), orderBy("nome")).withConverter(loginConverter);

            const querySnapshotLogins = await getDocs(logins);

            var ll = []
            querySnapshotLogins.forEach((doc) => {
                ll.push(doc.data())
            })
            setUnidadesList(ll)

        }

        obtem()


    }, []);

    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    function getFuncao(i) {
        switch (i) {
            case 1: {
                return "Diretor";
            }
            case 2: {
                return "Diretor Associado";
            }
            case 3: {
                return "ADM";
            }
            case 4: {
                return "Conselheiro";
            }
            case 5: {
                return "Secretário do Clube";
            }
            case 6: {
                return "Instrutor";
            }
            case 7: {
                return "Capitão";
            }
            case 8: {
                return "Desbravador";
            }
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
                            Clube {sessionStorage.getItem("clube")} (Unidades Membros)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>

            <div>
                <Box id={"corpo"} sx={{flexGrow: 1, margin: 2, maxHeight: 800, overflow: 'auto'}}>
                    <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 2, sm: 8, md: 12}} color="inherit">
                        {unidadesList.map((livrox, i) => (
                            <Grid justifyContent="flex-end" item xs={12} key={i}>
                                <Item id={livrox.id} className={"xx"} onClick={() => {
                                    // handleClick(livrox.id)
                                }}>
                                    <div className="title">{livrox.getNome()}</div>
                                    <div>Função: {getFuncao(livrox.getFuncao())}</div>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>


        </div>
    );

}
export default UnidadesMember