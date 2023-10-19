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
  DigitRecognition = 'leftMenu.digitRecognition',
}

export enum WebPath {
  Homepage = '/',
  DigitRecognition = '/digit_recognition',
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
    id: MenuID.DigitRecognition,
    path: WebPath.DigitRecognition,
    fullPath: `${BasePath}${WebPath.DigitRecognition}`,
  },

]