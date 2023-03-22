import * as React from 'react';
import {useEffect, useState} from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {AppBar, Card, CardMedia, Fab, Toolbar} from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useLocation, useNavigate} from "react-router-dom";
import {onValue, ref, set} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";
import AddIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import {Stack} from "@mui/system";

const TextoAnexo = () => {


    const {state} = useLocation();
    const {passa} = state;


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")

    useEffect(() => {
        if (!sessionStorage.getItem("clubesadasd")) {
            navigate('/', { replace: true });
        }
    }, [])


    const [texto, setTexto] = useState("");
    const [base64, setBase64] = useState("");
    const [textoErro, setTextoErro] = useState("");

    useEffect(() => {

        var doc = document.getElementById("fab")


        if (texto.length < passa.minCaracteres) {
            setTextoErro("O texto precisa conter mais de " + passa.minCaracteres + " caracteres.     " + texto.length + " de " + passa.minCaracteres);
            doc.style.visibility = "hidden"
        } else {
            setTextoErro("")
            if (base64.length > 5)
                doc.style.visibility = "visible"

        }
    })

    useEffect(() => {


        const livros = ref(realtime, sessionStorage.getItem('caminho'));


        onValue(livros, (snapshot) => {

            if (snapshot.exists()) {
                const data = snapshot.val();
                setTexto("" + data.texto)
                setBase64("data:image/png;base64," + data.imagem)
            }

        });


    }, []);


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
    const [ok, setOk] = useState(true);


    useEffect(() => {
        const resposta = ref(realtime, sessionStorage.getItem("caminho"));


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
                id: passa.id,
                concluido: true,
                data: hora,
                tipo: 11,
                calendario: "",
                texto: texto,
                imagem: base64.split(",")[1],
                aprovado: false,
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

    const style2 = {
        width: "100%",
        height: "90%"
    };

    const style3 = {
        width: "190px"
    };

    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };


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


    function getBase64(file) {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object

                baseURL = reader.result;
                setBase64(baseURL);
            };
        });
    }


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple

        getBase64(e.target.files[0])

        setSelectedFile(e.target.files[0])
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
                            Clube {clube} (Resposta de Texto)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <h3 style={style1}>
                    {passa.questão}
                </h3>
            </div>

            <div style={style1}>
                <TextField style={style2}
                           error={texto.length < passa.minCaracteres}
                           helperText={textoErro}
                           id="outlined-basic"
                           value={texto}
                           label={passa.descricao}
                           onChange={(e) => {
                               setTexto(e.target.value);
                           }}
                           multiline={5}
                           rows={20}
                           variant="outlined"/>
                <Stack style={style1} direction="row" spacing={2} xs={12}>
                    <div>
                        <input type='file' onChange={onSelectFile}/>

                    </div>
                    {base64.length > 5 && <img src={base64} style={style3}/>}
                </Stack>
            </div>


            <Fab id={"fab"} style={style} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

        </div>
    );

}
export default TextoAnexo