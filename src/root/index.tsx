import { Fragment, memo, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { CustomTheme, MediaStyles } from "../common/config";
import Head from "../component/head_bar";
import LeftMenu from "../component/left_menu";
import MainRouter from "../component/main_router";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [MediaStyles.isMobile]: {
    marginLeft: `-${CustomTheme.DrawerWidth}px`,
  },
  marginLeft: `-${CustomTheme.DrawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [MediaStyles.isMobile]: {
    width: `100%`,
    marginLeft: `0px`,
  },
  ...(open && {
    width: `calc(100% - ${CustomTheme.DrawerWidth}px)`,
    marginLeft: `${CustomTheme.DrawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  minHeight: CustomTheme.HeaderHeight,
  [MediaStyles.isPC]: {
    minHeight: CustomTheme.HeaderHeight,
  },
}));

const Root = memo(() => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', height: '100%', }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Head open={open} handleDrawerOpen={handleDrawerOpen} />
        </AppBar>
        <Fragment key={'left'}>
          <LeftMenu open={open} handleDrawerClose={handleDrawerClose} />
        </Fragment>
        <Main open={open}>
          <DrawerHeader />
          <MainRouter />
        </Main>
      </Box>
    </BrowserRouter>
  );
});

Root.displayName = "Root";

export default Root;
