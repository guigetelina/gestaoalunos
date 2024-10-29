import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudentForm from './components/StudentForm';
import TeacherForm from './components/TeacherForm';
import ScheduleForm from './components/ScheduleForm';
import { Student, Teacher, Schedule } from './types';

function App() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [teachers, setTeachers] = React.useState<Teacher[]>([]);
  const [schedules, setSchedules] = React.useState<Schedule[]>([]);

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    setStudents([...students, { ...studentData, id: uuidv4() }]);
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    setTeachers([...teachers, { ...teacherData, id: uuidv4() }]);
  };

  const addSchedule = (scheduleData: Omit<Schedule, 'id'>) => {
    setSchedules([...schedules, { ...scheduleData, id: uuidv4() }]);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  students={students}
                  teachers={teachers}
                  schedules={schedules}
                />
              } 
            />
            <Route 
              path="/alunos" 
              element={
                <div className="p-6 max-w-md mx-auto">
                  <h1 className="text-2xl font-bold mb-6">Adicionar Aluno</h1>
                  <StudentForm onSubmit={addStudent} />
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Lista de Alunos</h2>
                    <div className="space-y-4">
                      {students.map((student) => (
                        <div key={student.id} className="bg-white p-4 rounded-lg shadow">
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.email}</p>
                          <p className="text-sm text-gray-600">{student.phone}</p>
                          <p className="text-sm font-medium text-indigo-600">
                            R$ {student.monthlyFee}/mês
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/professores" 
              element={
                <div className="p-6 max-w-md mx-auto">
                  <h1 className="text-2xl font-bold mb-6">Adicionar Professor</h1>
                  <TeacherForm onSubmit={addTeacher} />
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Lista de Professores</h2>
                    <div className="space-y-4">
                      {teachers.map((teacher) => (
                        <div key={teacher.id} className="bg-white p-4 rounded-lg shadow">
                          <h3 className="font-medium">{teacher.name}</h3>
                          <p className="text-sm text-gray-600">{teacher.email}</p>
                          <p className="text-sm text-gray-600">{teacher.phone}</p>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Disciplinas:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {teacher.subjects.map((subject, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/horarios" 
              element={
                <div className="p-6 max-w-md mx-auto">
                  <h1 className="text-2xl font-bold mb-6">Adicionar Horário</h1>
                  <ScheduleForm 
                    onSubmit={addSchedule}
                    teachers={teachers}
                    students={students}
                  />
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Lista de Horários</h2>
                    <div className="space-y-4">
                      {schedules.map((schedule) => {
                        const teacher = teachers.find(t => t.id === schedule.teacherId);
                        const classStudents = students.filter(s => 
                          schedule.studentIds.includes(s.id)
                        );
                        
                        return (
                          <div key={schedule.id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{schedule.dayOfWeek}</h3>
                                <p className="text-sm text-gray-600">
                                  {schedule.startTime} - {schedule.endTime}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{teacher?.name}</p>
                                <p className="text-sm text-gray-600">
                                  {classStudents.length} alunos
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/financeiro" 
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Visão Financeira</h1>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Receita Mensal</h2>
                    <div className="space-y-4">
                      {students.map((student) => (
                        <div key={student.id} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.email}</p>
                          </div>
                          <p className="font-medium text-green-600">
                            R$ {student.monthlyFee}
                          </p>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <p className="font-bold">Receita Mensal Total</p>
                          <p className="font-bold text-green-600">
                            R$ {students.reduce((sum, student) => sum + student.monthlyFee, 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;