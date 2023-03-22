import * as React from 'react';
import '../menu/MenuPrincipal.css';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {AppBar, Fab, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {realtime, storage} from "../firebase_setup/firebase";
import {onValue, ref, set} from "@firebase/database";

import {useEffect, useState} from "react";
import {getDownloadURL, ref as xref} from "firebase/storage";
import AddIcon from '@mui/icons-material/Check';
import Button from "@mui/material/Button";
import {Stack} from "@mui/system";
import {pdfjs, Document, Page} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Pdf = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            navigate('/', { replace: true });
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const capitulo = sessionStorage.getItem('capituloId')


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




    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState('');

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );

    console.log("passou aqui")

    useEffect(() => {
        getDownloadURL(xref(storage, capitulo + ".pdf"))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                console.log(url)
                // Or inserted into an <img> element
                setFile(url)

            })
            .catch((error) => {
                // Handle any errors
            });
    }, [])

    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    const style1 = {
        padding: 10
    };

    useEffect(() => {
        var doc = document.getElementById("fab")
        if (pageNumber == numPages) {
            doc.style.visibility = "visible"
        } else {
            doc.style.visibility = "hidden"
        }
    })

    const livros = ref(realtime, "POSICOES/" + sessionStorage.getItem('clubeId') + "/" +
        sessionStorage.getItem('id') + "/" + capitulo);

    useEffect(() => {



        onValue(livros, (snapshot) => {

                const data = snapshot.val();
                setPageNumber(data + 1)

        });


    }, []);

    useEffect(() => {
        set(livros, pageNumber-1
        )
    }, [pageNumber])

    if (document.getElementById("fab")) {
        document.getElementById("fab").onclick = function () {
            concluido()
        };
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
                            Clube {clube} (Pdf - {sessionStorage.getItem("questao")})
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <div>

                <div>
                    <Fab id={"fab"} style={style} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>

                    <Stack style={style1} direction="row" spacing={2} xs={12}>
                        <Button variant="contained" onClick={goToPrevPage}>Prev</Button>
                        <Button variant="contained" onClick={goToNextPage}>Next</Button>
                    </Stack>

                    <div style={style1}>
                        <p>
                            Página {pageNumber} de {numPages}
                        </p></div>

                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={console.error}
                    >
                        <Page pageNumber={pageNumber}/>
                    </Document>

                </div>

            </div>
        </div>
    );

}
export default Pdf