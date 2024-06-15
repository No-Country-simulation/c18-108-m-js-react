import type { RolesUsersTypes, SidebarLink } from "@/types";
import { BookIcon, Home, Users } from "lucide-react";

export const sidebarLinks: SidebarLink[] = [
  {
    icon: Home,
    route: "/lms",
    label: "Dashboard",
  },
  {
    icon: BookIcon,
    route: "/lms/courses",
    label: "Cursos",
  },
  {
    icon: Users,
    route: "/lms/teachers",
    label: "Profesores",
  },
  {
    icon: Users,
    route: "/lms/students",
    label: "Alumnos",
  },
];

export enum RoleUserEnum {
  Admin = "ADMIN",
  Teacher = "TEACHER",
  Student = "STUDENT",
  Parent = "PARENT",
}

export const RoleUser: RolesUsersTypes[] = [
  { value: "ADMIN", name: "Admin" },
  { value: "TEACHER", name: "Teacher" },
  { value: "STUDENT", name: "Student" },
  { value: "PARENT", name: "Parent" },
];
