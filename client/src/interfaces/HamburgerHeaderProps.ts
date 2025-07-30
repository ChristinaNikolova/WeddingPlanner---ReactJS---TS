export interface HamburgerHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  setNavStyle: ({ isActive }: { isActive: boolean }) => string | undefined;
  setInitialCssStyles: () => void;
}
