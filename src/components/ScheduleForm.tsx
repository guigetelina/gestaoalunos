import React from 'react';
import { Schedule, Teacher, Student } from '../types';

interface ScheduleFormProps {
  onSubmit: (schedule: Omit<Schedule, 'id'>) => void;
  teachers: Teacher[];
  students: Student[];
  initialData?: Schedule;
}

export default function ScheduleForm({ onSubmit, teachers, students, initialData }: ScheduleFormProps) {
  const [formData, setFormData] = React.useState({
    teacherId: initialData?.teacherId || '',
    dayOfWeek: initialData?.dayOfWeek || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    studentIds: initialData?.studentIds || [],
  });

  const daysOfWeek = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Professor</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.teacherId}
          onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
        >
          <option value="">Selecione um professor</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dia da Semana</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.dayOfWeek}
          onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
        >
          <option value="">Selecione um dia</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora Início</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora Fim</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Alunos</label>
        <select
          multiple
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.studentIds}
          onChange={(e) => setFormData({
            ...formData,
            studentIds: Array.from(e.target.selectedOptions, option => option.value)
          })}
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        {initialData ? 'Atualizar Horário' : 'Adicionar Horário'}
      </button>
    </form>
  );
}