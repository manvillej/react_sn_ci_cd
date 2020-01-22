import React, { useState, useEffect, } from 'react';
import axios from 'axios'

import { makeStyles, } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import MailIcon from '@material-ui/icons/Mail';

import { Route, Switch, } from 'react-router-dom';

import ButtonAppBar from './AppBar.js';
import SideListMenu from './SideListMenu.js';

import DenseTable from './RecordList.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    width: 200,
  },
}));

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });  


  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const [loading, setLoading] = React.useState(false);
  const [table, setTable] = React.useState('incident');
  const [incidentData, setIncidents] = useState([])
  useEffect(()=>{
    setLoading(true);
    axios.get(`/api/now/table/${table}?sysparm_limit=40&sysparm_display_value=all`)
      .then(res => {
      setLoading(false);
      setIncidents(res.data.result)
    })
  },[table]);

  const [fieldMapping, setFieldMapping] = useState({
    number:{
      title:'Number',
    },
    short_description:{
      title:'Short Description',
    },
    state:{
      title:'State',
    },
    priority:{
      title:'Priority',
    },
    assigned_to:{
      title:'Assigned To',
    },
  });

  const [snackState, setSnackState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    message: '',
    action: null,
  });
  const { vertical, horizontal, open, message, action } = snackState;

  const handleClick = newState => () => {
    setSnackState({ open: true, ...newState });
  };
  const handleClose = () => {
    setSnackState({ ...snackState, open: false });
  };


  const actions = [
    {
      text:'Incident',
      onClick:()=>{
        if(table!=='incident'){
          setTable('incident')
        }
      },
      icon:MailIcon,
    },
    {
      text:'Problem',
      onClick:()=>{
        if(table!=='problem'){
          setTable('problem')
        }
      },
    },
    {
      text:'snacks',
      onClick:handleClick({ 
        vertical: 'bottom', 
        horizontal: 'right', 
        message:'I love snacks',
        action:(<Button color="secondary" size="small" children={'lorem'}/>),
      }),
      icon:MailIcon,
    },
  ];
  const MainRoute = () =>  (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DenseTable 
            data={incidentData} 
            fieldMapping={fieldMapping} 
            setFieldMapping={setFieldMapping}/>
        </Grid>
      </Grid>
    )  


  return (
    <div>
      <ButtonAppBar menuButtonOnClick={toggleDrawer('left', true)} loading={loading}/>

      <main>
        <Switch>
          <Route path="/" component={MainRoute} exact />
        </Switch>
      </main>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        <SideListMenu side='left' toggleDrawer={toggleDrawer} actions={actions}/>
      </Drawer>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}

export default App;
