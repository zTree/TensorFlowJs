export const MobileMaxWidth = 600;

export const MediaStyles = {
  isMobile: `@media (max-width: ${MobileMaxWidth}px)`,
  isPC: `@media (min-width: ${MobileMaxWidth}px)`,
};

export const DrawerWidth = 200;

export const MenuList = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
]