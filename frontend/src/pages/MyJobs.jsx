import React, { useEffect, useState } from "react";
import API from "../services/api";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await API.get("/job/recruiter/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 mb-3 rounded shadow-sm hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm">Location: {job.location}</p>

            <div className="mt-2 flex justify-between items-center">
              <span className="text-blue-600 font-medium">
                Applicants: {job.applicants.length}
              </span>

              <button className="bg-green-500 text-white px-3 py-1 rounded">
                View Applicants
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyJobs;