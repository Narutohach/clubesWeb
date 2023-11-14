import * as React from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import YouTube from "react-youtube";
import {realtime} from "../firebase_setup/firebase";
import {ref, set} from "@firebase/database";
import {useEffect, useState } from "react";

const Video = () => {



    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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

    function youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    const link = youtube_parser(sessionStorage.getItem('link'))


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    function writeUserData() {

        const referencia = ref(realtime, sessionStorage.getItem('caminho'));

        const today = new Date();
        var mes = 0;
        var dia = 0;

        if ((today.getMonth() + 1) < 10) { mes = "0" + (today.getMonth() + 1) } else { mes = (today.getMonth() + 1) }
        if ((today.getDate()) < 10) { dia = "0" + (today.getDate()) } else { dia = (today.getDate()) }

        var hora = dia + "" + mes + "" + today.getFullYear() + "_" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()

        set(referencia,
            {
                id: sessionStorage.getItem('capituloId'),
                concluido: true,
                data: hora,
                tipo: 3,
                calendario: "",
                texto: "",
                aprovado: true,
                reprovado: false
            }

        )
    }

    const concluido = () => {
        writeUserData()
        navigate(-1);
    }

    const opts = {
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 1,
          modestbranding: 1,
          showinfo: 0,
        },
        width: "100%", // Definir a largura como 100%
        height: screenHeight + "px", // Definir a altura como 100%
      };

    return (
        
        <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}>
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
                            Clube {clube} (Video - {sessionStorage.getItem("questao")})
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            
            <div style={{
        position: "relative",
        height: "100%",
      }}>
                <YouTube videoId={link}
                         onEnd={
                             () => {
                                 concluido()
                             }
                         }
                         opts={opts}
                         />
            </div>
        </div>
    );

}
export default Video