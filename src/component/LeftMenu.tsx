import { memo } from "react";
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
import { DrawerWidth, MenuList } from "../common/config";


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface LeftMenuProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const LeftMenu = memo((props: LeftMenuProps) => {
  const theme = useTheme();

  const { open, handleDrawerClose } = props;

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
            <ListItemButton>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
});

LeftMenu.displayName = "LeftMenu";

export default LeftMenu;
