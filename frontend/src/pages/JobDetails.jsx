import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
  try {
    console.log("Job ID:", id);

    const res = await api.get(`/job/${id}`);

    console.log(res.data);

    setJob(res.data.job);
  } catch (error) {
    console.log(error);
  }
};
  if (!job) {
    return <h1>Loading...</h1>;
  }

  return (
    

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">
          {job.title}
        </h1>

        <p className="mb-2">
          📍 {job.location}
        </p>

        <p className="mb-2">
          💰 ₹ {job.salary}
        </p>

        <p className="mb-2">
          🏢 {job.company?.name}
        </p>

        <p className="mb-6">
          📈 Experience: {job.experience} Years
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Description
        </h2>

        <p>{job.description}</p>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
          Apply Now
        </button>
      </div>
    
  );
}

export default JobDetails;