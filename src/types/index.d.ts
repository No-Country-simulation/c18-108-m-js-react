export interface SidebarLink {
  icon: ComponentType<{ isActive: boolean }>;
  route: string;
  label: string;
}

export interface LeftSidebarIconProps {
  isActive: boolean;
}

export interface RolesUsersTypes {
  name: string;
  value: string;
}
