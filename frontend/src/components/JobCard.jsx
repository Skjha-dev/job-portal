import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="bg-white shadow-md rounded-xl p-5 mb-4 hover:shadow-xl transition">
        <h2 className="text-xl font-bold">
          {job.title}
        </h2>

        <p>📍 {job.location}</p>

        <p>₹ {job.salary}</p>

        <p>🏢 {job.company?.name}</p>
      </div>
    </Link>
  );
}

export default JobCard;