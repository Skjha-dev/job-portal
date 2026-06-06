import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/job");
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  return (

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">
          All Jobs
        </h1>

        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}
      </div>
  );
}

export default Jobs;