import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Input, List } from 'semantic-ui-react';
import { NavBar } from '../components';

const QueryTab: React.FC = () => {
    const [method, setMethod] = useState('');
    const [issue, setIssue] = useState({ id: 0, title: '', description: '' });
    const [issues, setIssues] = useState<any[]>([]);
    const [response, setResponse] = useState<string>('');
    const [latestId, setLatestId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let result;
            if (method === 'post') {
                result = await axios.post('http://localhost:8000/issues', issue);
            } else if (method === 'get') {
                result = await axios.get(`http://localhost:8000/issues/${issue.id}`);
                setIssues([result.data]);
            } else if (method === 'put') {
                result = await axios.put(`http://localhost:8000/issues/${issue.id}`, issue);
            } else if (method === 'delete') {
                result = await axios.delete(`http://localhost:8000/issues/${issue.id}`);
            }

            if (result && result.data) {
                setResponse(`Success: ${JSON.stringify(result.data)}`);
            } else {
                setResponse('No data returned');
            }
        } catch (error: any) {
            setResponse(`Error: ${error.message}`);
        }
    };

     // Fetch all issues when the component mounts
     useEffect(() => {
        const fetchIssues = async () => {
            try {
                const result = await axios.get('http://localhost:8000/issues');
                setIssues(result.data);
                // Optionally set the latest ID if needed
                if (result.data.length > 0) {
                    setLatestId(result.data[result.data.length - 1].id);
                }
            } catch (error) {
                setResponse(`Error fetching issues`);
            }
        };

        fetchIssues();
    }, []); 

    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center min-h-screen p-2 bg-white">
                <div className="max-w-3xl w-full bg-white p-8 shadow-md">
                    <div className="text-center text-4xl font-semibold bg-clip-text text-transparent bg-green-700">
                        Query Form
                    </div>
                    <form className="pt-8" onSubmit={handleSubmit}>
                        <div className='pb-9'>
                            <label className="block text-lg font-medium text-gray-700">Select Method</label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                            >
                                <option value=''>Select Method</option>
                                <option value='get'>Get</option>
                                <option value='post'>Post</option>
                                <option value='put'>Put</option>
                                <option value='delete'>Delete</option>
                            </select>
                        </div>
                        <div className="flex gap-8 mb-8">
                            <div className="relative flex-1 h-10">
                                <input
                                    type="text"
                                    required
                                    className="w-full h-full border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 peer"
                                    onChange={(e) => setIssue({ ...issue, id: parseInt(e.target.value, 10) })}
                                />
                                <label className="absolute left-0 bottom-2 text-gray-500 text-lg transition-transform duration-300 transform -translate-y-2 scale-75 origin-left peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:translate-y-[-20px] peer-focus:scale-75 peer-focus:text-blue-500">
                                    ID
                                </label>
                                <div className="absolute bottom-0 h-0.5 w-full bg-blue-500 transform scale-x-0 transition-transform duration-300 peer-focus:scale-x-100"></div>
                            </div>
                            <div className="relative flex-1 h-10">
                                <input
                                    type="text"
                                    
                                    className="w-full h-full border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 peer"
                                    onChange={(e) => setIssue({ ...issue, title: e.target.value })}
                                />
                                <label className="absolute left-0 bottom-2 text-gray-500 text-lg transition-transform duration-300 transform -translate-y-2 scale-75 origin-left peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:translate-y-[-20px] peer-focus:scale-75 peer-focus:text-blue-500">
                                    Title
                                </label>
                                <div className="absolute bottom-0 h-0.5 w-full bg-blue-500 transform scale-x-0 transition-transform duration-300 peer-focus:scale-x-100"></div>
                            </div>
                        </div>
                        <div className="relative mb-8">
                            <textarea
                                
                                className="w-full border-b-2 border-gray-300 text-lg focus:outline-none focus:border-blue-500 resize-none pt-2 peer"
                                onChange={(e) => setIssue({ ...issue, description: e.target.value })}
                            ></textarea>
                            <label className="absolute left-0 bottom-10 text-gray-500 text-lg transition-transform duration-300 transform -translate-y-2 scale-75 origin-left peer-placeholder-shown:translate-y-12 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:translate-y-[-20px] peer-focus:scale-75 peer-focus:text-blue-500">
                                Description
                            </label>
                            <div className="absolute bottom-0 h-0.5 w-full bg-blue-500 transform scale-x-0 transition-transform duration-300 peer-focus:scale-x-100"></div>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Submit Request
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-100">
                        <h3 className="text-lg font-semibold">Latest ID:</h3>
                        <p className="text-lg">{latestId !== null ? latestId : 'No ID available'}</p>
                    </div>

                    {response && (
                        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-100">
                        <h3 className="text-lg font-semibold">Response:</h3>
                        <pre style={{overflowWrap: "break-word", wordBreak: "break-word", whiteSpace: "pre-wrap"}}>{response}</pre>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QueryTab;
