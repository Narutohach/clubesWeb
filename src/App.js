import * as React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './Login';
import MenuPrincipal from "./menu/MenuPrincipal";
import Ideais from "./ideais/Ideais";
import Classes from "./classes/Classes";
import Agenda from "./agenda/Agenda";
import ClassCateg from "./classes/Categoria";
import Livros from "./livros/LivrosSelector";
import CategEspec from "./especialidades/categoria";
import Especialidades from "./especialidades/especialidades";
import EspecActiviti from "./especialidades/atividades";
import EspecActivitiX from "./especialidades/EspecActivitiX";
import Capitulos from "./livros/Capitulos"
import Seletor from "./livros/Seletor"
import Cantinho from "./cantinho/Cantinho"
import Video from "./respostas/Video"
import TextoBiblico from "./respostas/TextoBiblico"
import MultiEspec from "./respostas/MultiEspec"
import Pdf from "./respostas/Pdf"
import Texto from "./respostas/Text"
import TextoAnexo from "./respostas/TextAnex"
import Leitura from "./respostas/Leitura"
import Data from "./respostas/Data"
import DataAnexo from "./respostas/DataAnexo"
import Pontuacao from "./respostas/Pontuacao"
import Escolha from "./respostas/Escolha"
import Lenco from "./prova_lenco/ProvaLenco"
import Config from "./config/Configuracoes"
import AltSenha from "./config/Senha"
import Unidades from "./config/Unidades"
import UnidadesMember from "./config/UnidadesMember"
import Users from "./config/Users"
import AnoB from "./anobiblico/AnoBiblico"
import AnoBLivros from "./anobiblico/livros"
import TelaAnoBiblicoCapitulos from "./anobiblico/Capitulos"
import TelaAnoBiblicoLeitura from "./anobiblico/Leitura"
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import {CssBaseline, useMediaQuery} from "@mui/material";
import {useEffect} from "react";


const App = () => {


    const getDesignTokens = (mode) => {

        return {
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                        // palette values for light mode
                        primary: {main: '#006D31'},
                        secondary: {
                            main: '#506351',
                            contrastText: '#FFFFFF',
                        },
                        error: {
                            main: '#BA1A1A',
                            contrastText: '#FFFFFF',
                        },
                        background: {
                            default: '#FCFDF7',
                            paper: '#DADDDF',
                        },
                    }
                    : {
                        // palette values for dark mode
                        primary: {main: '#59DF89'},
                        secondary: {
                            main: '#80D998',
                            contrastText: '#00391A',
                        },
                        error: {
                            main: '#FFB4AB',
                            contrastText: '#FFFFFF',
                        },
                        background: {
                            default: '#373837',
                            paper: '#373837',
                        },
                    }),
            },
        }
    };


    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


    const theme = React.useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')), [prefersDarkMode]);

    useEffect(() => {
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme.palette.background.default]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route path="/menu" element={<MenuPrincipal/>}/>
                        <Route path="/ideais" element={<Ideais/>}/>
                        <Route path="/classes" element={<Classes/>}/>
                        <Route path="/agenda" element={<Agenda/>}/>
                        <Route path="/classes/categoria" element={<ClassCateg/>}/>
                        <Route path="/categoriaespecialidade" element={<CategEspec/>}/>
                        <Route path="/especialidades/especialidades" element={<Especialidades/>}/>
                        <Route path="/especialidades/atividades" element={<EspecActiviti/>}/>
                        <Route path="/especialidades/atividadesespec" element={<EspecActivitiX/>}/>
                        <Route path="/livros" element={<Livros/>}/>
                        <Route path="/cantinho" element={<Cantinho/>}/>
                        <Route path="/livros/capitulos" element={<Capitulos/>}/>
                        <Route path="/livros/capitulos/seletor" element={<Seletor/>}/>
                        <Route path="/respostas/video" element={<Video/>}/>
                        <Route path="/respostas/pdf" element={<Pdf/>}/>
                        <Route path="/respostas/texto" element={<Texto/>}/>
                        <Route path="/respostas/textoanexo" element={<TextoAnexo/>}/>
                        <Route path="/respostas/leitura" element={<Leitura/>}/>
                        <Route path="/respostas/data" element={<Data/>}/>
                        <Route path="/respostas/datanexo" element={<DataAnexo/>}/>
                        <Route path="/respostas/pontuacao" element={<Pontuacao/>}/>
                        <Route path="/respostas/biblia" element={<TextoBiblico/>}/>
                        <Route path="/respostas/escolha" element={<Escolha/>}/>
                        <Route path="/respostas/multiespec" element={<MultiEspec/>}/>
                        <Route path="/lenco" element={<Lenco/>}/>
                        <Route path="/config" element={<Config/>}/>
                        <Route path="/config/Pass" element={<AltSenha/>}/>
                        <Route path="/config/unidade" element={<Unidades/>}/>
                        <Route path="/config/unidade/membros" element={<UnidadesMember/>}/>
                        <Route path="/config/users" element={<Users/>}/>
                        <Route path="/anob" element={<AnoB/>}/>
                        <Route path="/anoblivros" element={<AnoBLivros/>}/>
                        <Route path="/anobCaps" element={<TelaAnoBiblicoCapitulos/>}/>
                        <Route path="/anobLeitura" element={<TelaAnoBiblicoLeitura/>}/>
                    </Routes>
                </Router>
            </CssBaseline>
        </ThemeProvider>);
};

export default App;
