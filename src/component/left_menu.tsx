import { memo } from "react";
import { useTranslation } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DrawerWidth, MediaStyles, MenuItem, MenuList } from "../common/config";


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  minHeight: '56px',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  [MediaStyles.isPC]: {
    minHeight: '56px',
  },
}));

interface LeftMenuProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const LeftMenu = memo((props: LeftMenuProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { open, handleDrawerClose } = props;

  const handleClick = (item: MenuItem) => {
    if (item.id === 'leftMenu.homepage') {
      window.location.href = '/';
    }
  }

  return (
    <Drawer
      sx={{
        width: DrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DrawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {MenuList.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton onClick={() => {handleClick(item);}}>
              <ListItemText primary={t(item.id)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
});

LeftMenu.displayName = "LeftMenu";

export default LeftMenu;
