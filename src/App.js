import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import MenuPrincipal from "./menu/MenuPrincipal";
import Ideais from "./ideais/Ideais";
import Livros from "./livros/LivrosSelector";
import Capitulos from "./livros/Capitulos"
import Seletor from "./livros/Seletor"
import Video from "./respostas/Video"
import Pdf from "./respostas/Pdf"
import Lenco from "./prova_lenco/ProvaLenco"

const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/menu" element={<MenuPrincipal />} />
            <Route path="/ideais" element={<Ideais />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/livros/capitulos" element={<Capitulos />} />
            <Route path="/livros/capitulos/seletor" element={<Seletor />} />
            <Route path="/respostas/video" element={<Video />} />
            <Route path="/respostas/pdf" element={<Pdf />} />
            <Route path="/lenco" element={<Lenco />} />
        </Routes>
    </Router>
);

export default App;
