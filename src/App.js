import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import MenuPrincipal from "./menu/MenuPrincipal";
import Ideais from "./ideais/Ideais";
import Classes from "./classes/Classes";
import ClassCateg from "./classes/Categoria";
import Livros from "./livros/LivrosSelector";
import CategEspec from "./especialidades/categoria";
import Especialidades from "./especialidades/especialidades";
import EspecActiviti from "./especialidades/atividades";
import Capitulos from "./livros/Capitulos"
import Seletor from "./livros/Seletor"
import Video from "./respostas/Video"
import TextoBiblico from "./respostas/TextoBiblico"
import Pdf from "./respostas/Pdf"
import Texto from "./respostas/Text"
import TextoAnexo from "./respostas/TextAnex"
import Leitura from "./respostas/Leitura"
import Data from "./respostas/Data"
import DataAnexo from "./respostas/DataAnexo"
import Pontuacao from "./respostas/Pontuacao"
import Escolha from "./respostas/Escolha"
import Lenco from "./prova_lenco/ProvaLenco"

const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/menu" element={<MenuPrincipal />} />
            <Route path="/ideais" element={<Ideais />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/categoria" element={<ClassCateg />} />
            <Route path="/categoriaespecialidade" element={<CategEspec />} />
            <Route path="/especialidades/especialidades" element={<Especialidades />} />
            <Route path="/especialidades/atividades" element={<EspecActiviti />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/livros/capitulos" element={<Capitulos />} />
            <Route path="/livros/capitulos/seletor" element={<Seletor />} />
            <Route path="/respostas/video" element={<Video />} />
            <Route path="/respostas/pdf" element={<Pdf />} />
            <Route path="/respostas/texto" element={<Texto />} />
            <Route path="/respostas/textoanexo" element={<TextoAnexo />} />
            <Route path="/respostas/leitura" element={<Leitura />} />
            <Route path="/respostas/data" element={<Data />} />
            <Route path="/respostas/datanexo" element={<DataAnexo />} />
            <Route path="/respostas/pontuacao" element={<Pontuacao />} />
            <Route path="/respostas/biblia" element={<TextoBiblico />} />
            <Route path="/respostas/escolha" element={<Escolha />} />
            <Route path="/lenco" element={<Lenco />} />
        </Routes>
    </Router>
);

export default App;
