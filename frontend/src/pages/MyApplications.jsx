import React, { useEffect, useState } from "react";
import API from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await API.get("/job/my-applications");
      setApplications(res.data.applications);
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Applications</h2>

      {applications.map((app) => (
        <div key={app._id} className="border p-3 mb-2">
          <h3>{app.job.title}</h3>
          <p>{app.job.company}</p>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;