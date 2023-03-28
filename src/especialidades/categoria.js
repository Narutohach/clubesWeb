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
import {onValue, ref} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";

const CategoriaEspecialidade = () => {

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


    useEffect(() => {


        const livros = ref(realtime, "CATEGORIAS ESPECIALIDADES");


        onValue(livros, (snapshot) => {
            var ll = []
            snapshot.forEach(snap => {
                const data = snap.val();
                ll.push(data)
            })

            setLivrosList(ll)

        });


    }, []);

    const handleClick = (livrox) => {
        sessionStorage.setItem("categoriaId", livrox);
        navigate('/especialidades/especialidades');
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
                            Clube {clube} (Categoria de Especialidades)
                        </Typography>

                        <div>

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
                                    handleClick(livrox.id)
                                }}>
                                    <div className="title">{livrox.categoria}</div>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </div>
        </div>
    );

}
export default CategoriaEspecialidade