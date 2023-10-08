import { Fragment, memo, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { DrawerWidth, MediaStyles } from "../common/config";
import Head from "../component/Head";
import LeftMenu from "../component/LeftMenu1";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [MediaStyles.isMobile]: {
    marginLeft: `-${DrawerWidth}px`,
  },
  marginLeft: `-${DrawerWidth}px`,
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
    width: `calc(100% - ${DrawerWidth}px)`,
    marginLeft: `${DrawerWidth}px`,
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Head open={open} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <Fragment key={'left'}>
        <LeftMenu open={open} handleDrawerClose={handleDrawerClose} />
      </Fragment>
      <Main open={open}>
        <DrawerHeader />
        <div>
          aaaa
        </div>
      </Main>
    </Box>
  );
});

Root.displayName = "Root";

export default Root;
