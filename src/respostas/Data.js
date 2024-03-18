import * as React from 'react';
import '../menu/MenuPrincipal.css';
import Box from '@mui/material/Box';
import {AppBar, Fab, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {DatePicker} from "react-datepicker";
import {useEffect, useState} from "react";
import moment from 'moment';
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Check";
import {onValue, ref, set} from "@firebase/database";
import {realtime} from "../firebase_setup/firebase";

const Data = () => {

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            window.location = '/';
        }
    }, [])


    const nome = sessionStorage.getItem("nome")
    const clube = sessionStorage.getItem("clube")
    const questao = sessionStorage.getItem("questao")
    const descricao = sessionStorage.getItem("descricao")
    const minCaracteres = sessionStorage.getItem("minCaracteres")
    const tipo = sessionStorage.getItem("tipo")
    const calcula = sessionStorage.getItem("calcula")
    const idade = sessionStorage.getItem("idade")


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    let [value, setValue] = useState("");
    const [agex, setAgex] = useState(0);
    const [texto, setTexto] = useState("");


    const style = {
        width: "98.5%",
        height: "30px",
        padding: 10,
        margin: "8px 0"
    }

    const style1 = {
        padding: 10
    }

    const style2 = {
        padding: 10
    }

    const style3 = {
        width: "100%",
        height: "90%"
    };

    const style4 = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    function getAge(date = "") {

        try {

            var dob = new Date(date.value);
            //calculate month difference from current date in time
            var month_diff = Date.now() - dob.getTime();

            //convert the calculated difference in date format
            var age_dt = new Date(month_diff);

            //extract year from date
            var year = age_dt.getUTCFullYear();

            //now calculate the age of the user
            var age = Math.abs(year - 1970);
            return age;

        } catch (error) {
            return "" + error;
        }
    }

    useEffect(() => {
        var idadex = getAge(value)
        setAgex(idadex);

        var doc = document.getElementById("fab")

        if (calcula && idadex >= idade && idadex < 100) {
            doc.style.visibility = "visible"
        } else if (!isNaN(new Date(value.value).getTime()) && idadex < 100) {
            doc.style.visibility = "visible"
        } else {
            doc.style.visibility = "hidden"
        }


    }, [value])

    useEffect(() => {


        var dtre = document.getElementById("dtre");
        const livros = ref(realtime, sessionStorage.getItem('caminho'));


        onValue(livros, (snapshot) => {

            if (snapshot.exists()) {
                const data = snapshot.val();
                setTexto("" + data.texto)
                if (dtre) {
                    var sp = data.calendario.split("/")
                    dtre.value = sp[2] + "-" + sp[1] + "-" + sp[0]
                }
            }

        });


    }, []);

    function retData(data) {
        const dt = new Date(data);
        var mes = 0;
        var dia = 0;

        if ((dt.getMonth() + 1) < 10) {
            mes = "0" + (dt.getMonth() + 1)
        } else {
            mes = (dt.getMonth() + 1)
        }
        if ((dt.getDate()) < 10) {
            dia = "0" + (dt.getDate())
        } else {
            dia = (dt.getDate())
        }

        var tr = data.split('-')
        console.log(tr[0], tr[1], tr[2])

        var hh = tr[2] + "/" + tr[1] + "/" + tr[0];
        return hh;
    }

    if (document.getElementById("fab")) {
        document.getElementById("fab").onclick = function () {
            concluido()
        };
    }

    const concluido = () => {
        writeUserData()
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
                tipo: 7,
                calendario: retData(value.value),
                texto: texto,
                aprovado: false,
                reprovado: false
            }
        )
    }


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
                            Clube {clube} (Resposta de Data)
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>

            <div>
                <h3 style={style2}>
                    {questao}
                </h3>
            </div>

            <div style={style2}>
                {descricao}
            </div>

            <div style={style1}>
                <input id="dtre" style={style} type="date" name="bday"
                       onChange={(event) => setValue({value: event.target.value})}/>

            </div>

            {calcula === "true" &&
                <div style={{padding: 10}}>
                    Idade atual: {agex}</div>
            }

            <div style={style1}>
                <TextField style={style3}
                           id="outlined-basic"
                           value={texto}
                           label={"Observação"}
                           onChange={(e) => {
                               setTexto(e.target.value);
                           }}
                           multiline={5}
                           rows={20}
                           variant="outlined"/>
            </div>

            <Fab id={"fab"} style={style4} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

        </div>
    );

}
export default Data