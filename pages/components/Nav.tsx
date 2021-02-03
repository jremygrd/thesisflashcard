import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';


export default function ButtonAppBar() {

  return (
    <div className="mybar" style={{width:'100%', minWidth:'100%'}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Flashcard
          </Typography>
          <Link href="/login">
          <Button color="inherit">Login</Button>
          </Link>
          <Link href="/">
          <Button color="inherit">Accueil</Button>
          </Link>  
          <Link href="/myprofile">
          <Button color="inherit">Mon profil</Button>
          </Link> 
          <Link href="/test">
          <Button color="inherit">Test</Button>
          </Link>  
          <Link href="/decks/details/08c6859f-eeb4-49c3-ba0c-e4aef1b1d46c">
          <Button color="inherit">ok</Button>
          </Link> 
          <Link href="/testCards">
          <Button color="inherit">CardTest</Button>
          </Link> 
        </Toolbar>
      </AppBar>
    </div>
  );
}