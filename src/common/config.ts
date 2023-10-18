export const CustomTheme = {
  MobileMaxWidth: 600,
  DrawerWidth: 200,
  HeaderHeight: 56,
};

export const MediaStyles = {
  isMobile: `@media (max-width: ${CustomTheme.MobileMaxWidth}px)`,
  isPC: `@media (min-width: ${CustomTheme.MobileMaxWidth}px)`,
};

export interface MenuItem {
  id: string;
  path: string;
}

export const MenuList: MenuItem[] = [
  {
    id: "leftMenu.homepage",
    path: "/",
  }
]