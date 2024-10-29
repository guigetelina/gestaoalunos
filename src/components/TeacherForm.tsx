import React from 'react';
import { Teacher } from '../types';

interface TeacherFormProps {
  onSubmit: (teacher: Omit<Teacher, 'id'>) => void;
  initialData?: Teacher;
}

export default function TeacherForm({ onSubmit, initialData }: TeacherFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    subjects: initialData?.subjects || [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSubject = () => {
    setFormData({ ...formData, subjects: [...formData.subjects, ''] });
  };

  const updateSubject = (index: number, value: string) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Disciplinas</label>
        {formData.subjects.map((subject, index) => (
          <input
            key={index}
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mb-2"
            value={subject}
            onChange={(e) => updateSubject(index, e.target.value)}
            placeholder={`Disciplina ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={addSubject}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          + Adicionar Disciplina
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        {initialData ? 'Atualizar Professor' : 'Adicionar Professor'}
      </button>
    </form>
  );
}