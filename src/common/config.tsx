export const MobileMaxWidth = 600;

export const MediaStyles = {
  isMobile: `@media (max-width: ${MobileMaxWidth}px)`,
  isPC: `@media (min-width: ${MobileMaxWidth}px)`,
};

export const DrawerWidth = 200;

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