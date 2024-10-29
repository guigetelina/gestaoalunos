import React from 'react';
import { Student, Teacher, Schedule } from '../types';
import { Users, GraduationCap, Calendar, DollarSign } from 'lucide-react';

interface DashboardProps {
  students: Student[];
  teachers: Teacher[];
  schedules: Schedule[];
}

export default function Dashboard({ students, teachers, schedules }: DashboardProps) {
  const totalRevenue = students.reduce((sum, student) => sum + student.monthlyFee, 0);

  const stats = [
    {
      title: 'Total de Alunos',
      value: students.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total de Professores',
      value: teachers.length,
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      title: 'Aulas Ativas',
      value: schedules.length,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-md p-6 flex items-center"
            >
              <div className={`${stat.color} p-4 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}