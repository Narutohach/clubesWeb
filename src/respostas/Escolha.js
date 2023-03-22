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
import Grid from "@mui/material/Grid";

const Escolha = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            navigate('/', { replace: true });
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const questao = sessionStorage.getItem("questao")
    const descricao = sessionStorage.getItem("descricao")
    const caminhoQ = sessionStorage.getItem("questionPatch")
    // const listaQ = JSON.parse(lista)


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }));

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

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


    const [livrosList, setLivrosList] = useState("");
    const [listaTrue, setListaTrue] = useState("");


    useEffect(() => {


        const livros = ref(realtime, caminhoQ);


        onValue(livros, (snapshot) => {


            const data = snapshot.val();

            var ll = []
            ll = data.listaItem

            var tt = []

            ll.forEach((l, i) => {
                if (l.check) {
                    tt.push(i)
                }
            })


            setListaTrue(tt)
            setLivrosList(data)


        });


    }, []);

    const [selecionados, setSelecionados] = useState([]);


    function updateSelect(i) {

        var selectNew = [];

        if (selecionados.includes(i)) {

            selecionados.splice(selecionados.indexOf(i), 1);
            document.getElementById("itemx" + i).style.background = "#FFFFFF";


        } else {
            selecionados.push(i);
            document.getElementById("itemx" + i).style.background = "#00dd0d";
        }


        var doc = document.getElementById("fab")

        if (selecionados.length > 0) {
            doc.style.visibility = "visible";
        } else {
            doc.style.visibility = "hidden";

        }

    }


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
                tipo: 1,
                aprovado: true,
                reprovado: false
            }
        )
    }

    const concluido = () => {
        const array2Sorted = selecionados.slice().sort();
        var bateu = listaTrue.length === selecionados.length && listaTrue.slice().sort().every(function (value, index) {
            return value === array2Sorted[index];
        });

        if (bateu) {
            writeUserData()
            navigate(-1);
        } else {
            alert("Resposta errada, tente novamente");
            navigate(-1);
        }


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
                            Clube {clube} (Resposta de Multipla Escolha)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <h3 style={style1}>
                    {questao}
                </h3>
                <div style={style1}>
                    {descricao}
                </div>
            </div>

            <div style={style1}>

                {livrosList !== "" &&
                    livrosList.listaItem.map((livrox, i) => (
                        <Grid justifyContent="flex-end" item xs={12} key={i}>
                            <Item id={"itemx" + i} className={"xx"} onClick={() => {
                                updateSelect(i)
                            }}>
                                <div className="title">{livrox.escolha}</div>
                            </Item>
                        </Grid>
                    ))}

                {/*{livrosList.listaItem[1].escolha}*/}


            </div>


            <Fab id={"fab"} style={style} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

        </div>
    );

}
export default Escolha