import React from 'react';
import { Users, GraduationCap, Calendar, DollarSign, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  
  const links = [
    { icon: LayoutDashboard, label: 'Painel', path: '/' },
    { icon: Users, label: 'Alunos', path: '/alunos' },
    { icon: GraduationCap, label: 'Professores', path: '/professores' },
    { icon: Calendar, label: 'Horários', path: '/horarios' },
    { icon: DollarSign, label: 'Financeiro', path: '/financeiro' },
  ];

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="w-8 h-8" />
        <h1 className="text-xl font-bold">EduGestão</h1>
      </div>
      <nav>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 p-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-indigo-800'
                  : 'hover:bg-indigo-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}