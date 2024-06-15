import { FaHome,FaRocketchat,FaQuestionCircle  } from "react-icons/fa";
import { PiNotepadFill } from "react-icons/pi";

import { type SidebarLink } from "@/types";

export const sidebarLinks: SidebarLink[]=[
  {
    icon: FaHome,
    route: '/dashboard',
    label:'Dashboard'
  },
  {
    icon: FaRocketchat,
    route:'/chat',
    label: "Chat"
  },
  {
    icon: PiNotepadFill,
    route:'/grades',
    label:"Notas"
  },
  {
    icon:FaQuestionCircle,
    route:'/questions',
    label:'Preguntas'
  }
]
