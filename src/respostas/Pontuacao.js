import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {AppBar, Fab, Rating, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {onValue, ref, set} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import AddIcon from "@mui/icons-material/Check";

const Pontuacao = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            navigate('/', { replace: true });
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const questao = sessionStorage.getItem("questao")


    const [value, setValue] = React.useState(0);



    useEffect(() => {


        const livros = ref(realtime, sessionStorage.getItem('caminho'));


        onValue(livros, (snapshot) => {

            if (snapshot.exists()) {
                const data = snapshot.val();
                setValue(data.nota)
            }

        });


    }, []);


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }


    const [livrosList, setLivrosList] = useState([]);



    useEffect(() => {
        const resposta = ref(realtime, sessionStorage.getItem("caminho"));

        // alert("RESPOSTAS/" + sessionStorage.getItem('clubeId') + "/" + sessionStorage.getItem('id') + "/LIVROS2/" + sessionStorage.getItem('livroId') + "/" + data.id)


        onValue(resposta, (s1) => {

            if (s1.exists()) {
                s1.forEach(snap => {
                    const data = snap.val();

                    document.getElementById(data.id)

                    if (document.getElementById(data.id)) {
                        document.getElementById(data.id).style.background = "#00dd0d"
                    }

                })

            }
        })

    }, [livrosList])


    function writeUserData() {

        const referencia = ref(realtime, sessionStorage.getItem('caminho'));

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

        set(referencia,
            {
                id: sessionStorage.getItem('capituloId'),
                concluido: true,
                data: hora,
                nota: value,
                tipo: 4,
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

    const style1 = {
        padding: 10
    };



    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    useEffect(() => {

        var doc = document.getElementById("fab")


        if (value==0) {
            doc.style.visibility = "hidden"
        } else {
            doc.style.visibility = "visible"

        }
    })

    if (document.getElementById("fab")) {
        document.getElementById("fab").onclick = function () {
            concluido()
        };
    }


    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()


    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])




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
                            Clube {clube} (Resposta de Pontuação)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <h3 style={style1}>
                    {questao}
                </h3>
            </div>

            <div style={style1}>


                <Rating
                    name="simple-controlled"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    size = {"large"}
                />
                <Typography component="legend">Nota: {value}</Typography>
            </div>


            <Fab id={"fab"} style={style} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

        </div>
    );

}
export default Pontuacao