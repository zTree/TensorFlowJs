import { memo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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
import { CustomTheme, MediaStyles, MenuID, MenuItem, MenuList } from "../common/config";


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  minHeight: CustomTheme.HeaderHeight,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  [MediaStyles.isPC]: {
    minHeight: CustomTheme.HeaderHeight,
  },
}));

interface LeftMenuProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const LeftMenu = memo((props: LeftMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();
  const { open, handleDrawerClose } = props;

  console.log(location.pathname, MenuList);

  const handleClick = (item: MenuItem) => {
    switch (item.id) {
      case MenuID.Homepage:
        window.location.href = item.fullPath;
        break;
      case MenuID.DigitRecognition:
      default:
        navigate(item.fullPath);
        break;
    }
  }

  return (
    <Drawer
      sx={{
        width: CustomTheme.DrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: CustomTheme.DrawerWidth,
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
            <ListItemButton onClick={() => {handleClick(item);}} selected={location.pathname === item.fullPath}>
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
