import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    width: 200,
  },
}));

const SideListMenu = (props) => {
  const classes = useStyles();
  const { toggleDrawer, side, actions } = props;

  const listItems = actions.map((action, index) => {
        let Icon = action.icon || InboxIcon;
        return (
          <ListItem button onClick={action.onClick} key={action.text}>
            <ListItemIcon><Icon/></ListItemIcon>
            <ListItemText primary={action.text} />
          </ListItem>
        )
      });

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{ index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {listItems}
      </List>
    </div>
)};

export default SideListMenu;