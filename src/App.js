import React, { useState, useEffect } from 'react';
import axios from 'axios'


import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import ButtonAppBar from './AppBar.js';
import SideListMenu from './SideListMenu.js';


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

  const [incidentData, setIncidents] = useState([])

  useEffect(()=>{
     axios.get('/api/now/table/incident?sysparm_limit=10')
          .then(res => {
            setIncidents(res.data.result)
          })
  },[])

  const Incidents = (props) => {
    const incidents = props.data;
    return (
      <ul>
        {incidents.map( (i)=>(<li key={i.sys_id}>{i.number}: {i.short_description}</li>)) }
      </ul>
    )
  }

  const buttonAction = (
    <Button color="secondary" size="small">
      lorem
    </Button>
  );

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
      text:'All mail',
      onClick:()=>{alert('All mail');}
    },
    {
      text:'Trash',
      onClick:()=>{alert('Trash');}
    },
    {
      text:'Spam',
      onClick:()=>{alert('Spam');}
    },
    {
      text:'Snack',
      onClick:handleClick({ 
        vertical: 'bottom', 
        horizontal: 'right', 
        message:'I love snacks',
        action:buttonAction,
      })
    },
    {
      text:'SNACKSSSS',
      onClick:handleClick({
        vertical: 'bottom',
        horizontal: 'right',
        message:'I really love snacks',
        action:buttonAction,
      })
    },
  ];

  return (
    <div>
      <ButtonAppBar menuButtonOnClick={toggleDrawer('left', true)}/>
      <Grid container spacing={3}>
        {[0,1,2].map(()=>{return (
          <Grid item xs={4}>
            <Paper>
              <Incidents data={incidentData}/>
            </Paper>
          </Grid>
        )})}
      </Grid>
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
