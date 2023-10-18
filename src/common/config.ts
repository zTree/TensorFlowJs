export const CustomTheme = {
  MobileMaxWidth: 600,
  DrawerWidth: 200,
  HeaderHeight: 56,
};

export const MediaStyles = {
  isMobile: `@media (max-width: ${CustomTheme.MobileMaxWidth}px)`,
  isPC: `@media (min-width: ${CustomTheme.MobileMaxWidth}px)`,
};

export enum MenuID {
  Homepage = 'leftMenu.homepage',
  Test = 'leftMenu.test',
}

export enum WebPath {
  Homepage = '/',
  Test = '/test',
}

export interface MenuItem {
  id: MenuID;
  path: WebPath;
  fullPath: string;
}

export const BasePath = process.env.VITE_BASE_PATH || '/';

export const MenuList: MenuItem[] = [
  {
    id: MenuID.Homepage,
    path: WebPath.Homepage,
    fullPath: WebPath.Homepage,

  },
  {
    id: MenuID.Test,
    path: WebPath.Test,
    fullPath: `${BasePath}${WebPath.Test}`,
  },

]