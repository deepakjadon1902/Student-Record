import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { Student } from '../types';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (student: Student) => void;
  initialData?: Student;
  isEditing?: boolean;
}

const bloodGroups = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
];

const hobbiesOptions = [
  { value: 'reading', label: 'Reading' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'art', label: 'Art' },
  { value: 'travel', label: 'Travel' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'photography', label: 'Photography' },
  { value: 'dancing', label: 'Dancing' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'writing', label: 'Writing' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'painting', label: 'Painting' },
  { value: 'singing', label: 'Singing' },
  { value: 'meditation', label: 'Meditation' },
  { value: 'chess', label: 'Chess' },
  { value: 'volunteering', label: 'Volunteering' }
];

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, initialData, isEditing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Student>>(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      address: '',
      course: '',
      semester: '',
      enrollmentDate: '',
      bloodGroup: '',
      emergencyContact: '',
      hobbies: [],
      profilePicture: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData?.profilePicture) {
      setImagePreview(initialData.profilePicture);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData as Student);
      toast.success(isEditing ? 'Student updated successfully!' : 'Student added successfully!');
    } else {
      toast.error('Please fill all required fields correctly');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, profilePicture: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 flex justify-center">
          <div className="relative group">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div 
              onClick={triggerImageUpload}
              className="cursor-pointer relative w-32 h-32 rounded-2xl overflow-hidden group border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-200"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50">
                  <Upload className="w-8 h-8 text-emerald-500" />
                  <span className="text-sm text-slate-500 mt-2">Upload Photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <span className="text-white text-sm">Change Photo</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.lastName ? 'border-red-500' : ''
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.dateOfBirth ? 'border-red-500' : ''
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.gender ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.phoneNumber ? 'border-red-500' : ''
            }`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course *</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.course ? 'border-red-500' : ''
            }`}
          />
          {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Semester *</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.semester ? 'border-red-500' : ''
            }`}
          />
          {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
          <Select
            options={bloodGroups}
            value={bloodGroups.find(bg => bg.value === formData.bloodGroup)}
            onChange={(option) => setFormData(prev => ({ ...prev, bloodGroup: option?.value || '' }))}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hobbies</label>
          <Select
            isMulti
            options={hobbiesOptions}
            value={hobbiesOptions.filter(hobby => formData.hobbies?.includes(hobby.value))}
            onChange={(options) => setFormData(prev => ({ ...prev, hobbies: options.map(opt => opt.value) }))}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {isEditing ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;