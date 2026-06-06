import React, { useEffect, useState } from "react";
import API from "../services/api";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await API.get("/job/recruiter/jobs");
      setJobs(res.data.jobs);
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Recruiter Dashboard</h2>

      {jobs.map((job) => (
        <div key={job._id} className="border p-3 mb-2">
          <h3>{job.title}</h3>
          <p>Applicants: {job.applicants.length}</p>

          <button className="bg-blue-500 text-white px-3 py-1">
            View Applicants
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecruiterDashboard;