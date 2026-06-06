function Home() {
  return (

      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Find Your Dream Job
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Discover thousands of opportunities from top companies.
        </p>

        <a
          href="/jobs"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Browse Jobs
        </a>
      </section>
  );
}

export default Home;