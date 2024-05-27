import { Home, Info, LibraryBig } from "lucide-react";

export type PathsNav = {
  Icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
  path: string;
  label: string;
};

export const paths: PathsNav[] = [
  { Icon: Home,
    path: "/", 
    label: "Inicio" },
  {
    Icon: LibraryBig,
    path: "/library",
    label: "Cursos",
  },
  {
    Icon: Info,
    path: "/about",
    label: "Acerca de",
  },
];
