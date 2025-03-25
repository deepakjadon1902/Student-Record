import React from 'react';
import { Student } from '../types';
import { Pencil, Trash2, Eye, Archive } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onViewDetails: (student: Student) => void;
  isArchived: boolean;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete, onViewDetails, isArchived }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">
          {isArchived ? 'No archived students found.' : 'No active students found. Add your first student to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Profile</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Email</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Course</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Semester</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/50">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-white/30 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-12 w-12 flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                      src={student.profilePicture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'}
                      alt=""
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-slate-900">{`${student.firstName} ${student.lastName}`}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-600">{student.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-600">{student.course}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-600">{student.semester}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onViewDetails(student)}
                    className="text-emerald-600 hover:text-emerald-900 transition-colors duration-150"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="text-teal-600 hover:text-teal-900 transition-colors duration-150"
                    title="Edit"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  {!isArchived && (
                    <button
                      onClick={() => onDelete(student.id)}
                      className="text-rose-600 hover:text-rose-900 transition-colors duration-150"
                      title="Archive Student"
                    >
                      <Archive className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;