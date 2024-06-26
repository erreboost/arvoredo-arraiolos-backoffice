import {
  BarChart4,
  Building2,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar,
  Shield,
} from 'lucide-react';

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Building2,
    label: 'Árvores',
    href: '/arvores',
  },
  {
    icon: Calendar,
    label: 'Calendar',
    href: '/task',
  },
];

export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: 'Faqs',
    href: '/faqs',
  },
  {
    icon: BarChart4,
    label: 'Dados',
    href: '/dados',
  },
];

export const dataSupportSidebar = [
  {
    icon: Settings,
    label: 'Opções',
    href: '/opcoes',
  },
  {
    icon: ShieldCheck,
    label: 'Segurança',
    href: '/seguranca',
  },
];
