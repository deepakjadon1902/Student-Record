import React from 'react';
import { Student } from '../types';
import { X } from 'lucide-react';

interface StudentDetailsProps {
  student: Student;
  onClose: () => void;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 transition-colors duration-150"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center mb-8">
          <img
            src={student.profilePicture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'}
            alt={`${student.firstName} ${student.lastName}`}
            className="h-24 w-24 rounded-2xl object-cover shadow-lg ring-4 ring-emerald-500/20"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {`${student.firstName} ${student.lastName}`}
            </h2>
            <p className="text-slate-600 mt-1">{student.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-emerald-700 mb-4">Personal Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">Date of Birth</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.dateOfBirth}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Gender</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.gender}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Blood Group</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.bloodGroup || 'Not specified'}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-teal-700 mb-4">Contact Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.phoneNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Emergency Contact</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.emergencyContact || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Address</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.address || 'Not specified'}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-emerald-700 mb-4">Academic Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">Course</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.course}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Semester</dt>
                <dd className="mt-1 text-sm text-slate-900">{student.semester}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-teal-700 mb-4">Hobbies</h3>
            <div className="flex flex-wrap gap-2">
              {student.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="px-3 py-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 rounded-full text-sm font-medium border border-emerald-500/20"
                >
                  {hobby}
                </span>
              ))}
              {student.hobbies.length === 0 && (
                <span className="text-sm text-slate-500">No hobbies specified</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;