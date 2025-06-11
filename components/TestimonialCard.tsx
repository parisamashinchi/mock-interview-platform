import React from 'react';

interface TestimonialCardProps {
  name: string;
  feedback: string;
  role?: string;
  avatarUrl?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  feedback,
  role = 'Frontend Developer',
  avatarUrl = 'https://i.pravatar.cc/100?u=' + name, // fallback avatar
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-sm w-full border border-gray-100">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full object-cover mr-4"
          src={avatarUrl}
          alt={`${name} avatar`}
        />
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">“{feedback}”</p>
    </div>
  );
};
