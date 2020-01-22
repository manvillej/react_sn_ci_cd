import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function DenseTable(props) {
  const classes = useStyles();
  const { data, fieldMapping, setFieldMapping, } = props;

  const [selected, setSelected] = React.useState([]);
  const isSelected = name => selected.indexOf(name) !== -1;
  const handleSelectClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.sys_id.value);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const fieldKeys = Object.keys(fieldMapping);

  const EnhancedTableHead = (props) => {
    const { fieldKeys, fieldMapping, rowCount, numSelected, onSelectAllClick } = props;
    return (
      <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all rows' }}
              />
            </TableCell>
            {fieldKeys.map((fieldName, index) => {return (<TableCell>{fieldMapping[fieldName].title}</TableCell>)})}
          </TableRow>
        </TableHead>
      )
  }
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <EnhancedTableHead
          numSelected={selected.length}
          rowCount={data.length}
          fieldMapping={fieldMapping}
          onSelectAllClick={handleSelectAllClick}
          fieldKeys={fieldKeys}/>
        <TableBody>      
          {data.map(row => {
            const isItemSelected = isSelected(row.sys_id.value);
            const labelID = `enhanced-table-checkbox-${row.sys_id.value}`;
            return (
              <TableRow
                hover
                onClick={event => handleSelectClick(event, row.sys_id.value)}
                role="checkbox"
                tabIndex={-1} 
                aria-checked={isItemSelected}
                selected={isItemSelected}
                key={row.sys_id.value}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby':  labelID}}
                  />
                </TableCell>
                {fieldKeys.map((fieldName, index) => {
                  if(index===0){
                    return (<TableCell value={row[fieldName].value} id={row.sys_id.value} component="th" scope="row">{row[fieldName].display_value}</TableCell>)
                  } else {
                    return (<TableCell value={row[fieldName].value} >{row[fieldName].display_value}</TableCell>) 
                  }
                })}
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const ExampleTable = () => {
  
  const fieldMapping = {
    name:{
      title:'Dessert (100g serving)',
    },
    calories:{
      title:'Calories',
    },
    fat:{
      title:'Fat\n(g)',
    },
    carbs:{
      title:'Carbs\n(g)',
    },
    protein:{
      title:'Protein\n(g)',
    },
  };
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <DenseTable fieldMapping={fieldMapping} data={rows}/>
  )
}

export default DenseTable;