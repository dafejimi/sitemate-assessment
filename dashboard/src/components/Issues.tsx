import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Issue {
  id: number; // Changed from string to number based on the API response
  title: string;
  description: string;
}

const Issues: React.FC = () => {
  const [btnToggle, setBtnToggle] = useState(false);
  const [state, setState] = useState({
    limit: 12,
    isLoading: true,
  });

  const [issues, setIssues] = useState<Issue[]>([]);

  const btnClick = () => {
    setState(prevState => ({
      ...prevState,
      limit: btnToggle ? 12 : issues.length,
    }));
    setBtnToggle(!btnToggle);
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:8000/issues');
        // Ensure the response data is an array of issues
        if (Array.isArray(response.data)) {
          setIssues(response.data);
        } else {
          console.error('Unexpected response format', response.data);
        }
      } catch (error) {
        console.error('Error fetching issues', error);
      } finally {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
        }));
      }
    };

    fetchIssues();
  }, []);

  return (
    <div>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
            {`Issues Count: ${issues.length}`}
          </h2>
          {/* Show loading spinner while loading is true */}
          {state.isLoading ? (
            <div className="text-center text-gray-500 py-6">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {issues.slice(0, state.limit).map(issue => (
                <div key={issue.id} className="p-4 border rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">{issue.title}</h3>
                  <p>{issue.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <button
          onClick={btnClick}
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          {btnToggle ? 'View Less Issues' : 'View More Issues'}
        </button>
      </section>
    </div>
  );
};

export default Issues;
