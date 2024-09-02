import React from 'react';
import { Link } from 'react-router-dom';

interface IssueProps {
    id: string;
    title: string;
    description: string;
}

const IssueCard: React.FC<IssueProps> = ({ id, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-xl font-bold">{id}</h3>
        </div>

        <div className="mb-5">
          <div>{title}</div>
        </div>


        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div
            className="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
