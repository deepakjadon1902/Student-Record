import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Student } from './types';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import { GraduationCap, History } from 'lucide-react';

function App() {
  const [activeStudents, setActiveStudents] = useState<Student[]>([]);
  const [archivedStudents, setArchivedStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load students from localStorage on initial render
  useEffect(() => {
    const savedActiveStudents = localStorage.getItem('activeStudents');
    const savedArchivedStudents = localStorage.getItem('archivedStudents');
    
    if (savedActiveStudents) {
      setActiveStudents(JSON.parse(savedActiveStudents));
    }
    if (savedArchivedStudents) {
      setArchivedStudents(JSON.parse(savedArchivedStudents));
    }
  }, []);

  // Save students to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('activeStudents', JSON.stringify(activeStudents));
    localStorage.setItem('archivedStudents', JSON.stringify(archivedStudents));
  }, [activeStudents, archivedStudents]);

  const handleAddStudent = (student: Student) => {
    const newStudent = {
      ...student,
      id: crypto.randomUUID(),
    };
    setActiveStudents([...activeStudents, newStudent]);
    setIsFormVisible(false);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    if (showHistory) {
      setArchivedStudents(archivedStudents.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    } else {
      setActiveStudents(activeStudents.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    }
    setEditingStudent(null);
    setIsFormVisible(false);
  };

  const handleDeleteStudent = (id: string) => {
    // Find the student to be archived
    const studentToArchive = activeStudents.find(s => s.id === id);
    if (studentToArchive) {
      // Add to archived students
      setArchivedStudents(prev => [...prev, { ...studentToArchive, archivedDate: new Date().toISOString() }]);
      // Remove from active students
      setActiveStudents(activeStudents.filter(s => s.id !== id));
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setIsFormVisible(true);
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setIsFormVisible(false);
    setSelectedStudent(null);
  };

  const currentStudents = showHistory ? archivedStudents : activeStudents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="glass-morphism rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-lg shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Student Records
                </h1>
                <p className="text-slate-600 mt-1">Manage your student database with ease</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={toggleHistory}
                className={`px-6 py-3 flex items-center space-x-2 ${
                  showHistory 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                } text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <History className="h-5 w-5" />
                <span>{showHistory ? 'Show Active Students' : 'View Archived Students'}</span>
              </button>
              {!showHistory && (
                <button
                  onClick={() => {
                    setEditingStudent(null);
                    setIsFormVisible(!isFormVisible);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  {isFormVisible ? 'Close Form' : 'Add New Student'}
                </button>
              )}
            </div>
          </div>

          {showHistory ? (
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Archived Students</h2>
              <StudentList
                students={currentStudents}
                onEdit={handleEditClick}
                onDelete={() => {}} // Disable deletion for archived students
                onViewDetails={handleViewDetails}
                isArchived={true}
              />
              {currentStudents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">No archived student records found.</p>
                </div>
              )}
            </div>
          ) : (
            isFormVisible ? (
              <div className="mb-8">
                <StudentForm
                  onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
                  initialData={editingStudent || undefined}
                  isEditing={!!editingStudent}
                />
              </div>
            ) : (
              <StudentList
                students={currentStudents}
                onEdit={handleEditClick}
                onDelete={handleDeleteStudent}
                onViewDetails={handleViewDetails}
                isArchived={false}
              />
            )
          )}

          {selectedStudent && (
            <StudentDetails
              student={selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;