import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CircularProgress,
  Column,
  Container,
  FloatingActionButton,
  Icon,
  IconButton,
  LazyColumn,
  MaterialTheme,
  PaddingValues,
  Row,
  Scaffold,
  Text,
  TopAppBar
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import '../menu/MenuPrincipal.css';
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";


const TelaAnoBiblico = () => {
    

  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adicionar, setAdicionar] = useState(false);

//   useEffect(() => {
//     const databaseRef = ref(database, `PLANOLEITURAX/${sessionStorage.getItem('clubeId')}/${sessionStorage.getItem('id')}`);
//     const listener = databaseRef.on('value', (snapshot) => {
//       const unidadesData = snapshot.val();
//       if (unidadesData) {
//         const unidadesArray = Object.values(unidadesData);
//         setUnidades(unidadesArray);
//       }
//       setLoading(false);
//     });

//     return () => {
//       databaseRef.off('value', listener);
//     };
//   }, [id]);

  

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" enableColorOnDark>
          <Toolbar>
            

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Clube  (Ano Bíblico)
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default TelaAnoBiblico;