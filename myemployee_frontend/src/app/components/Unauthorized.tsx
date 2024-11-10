import Navbar from "@/app/components/Navbar";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="p-6 text-center mt-40">
        <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-4 text-lg">
          You do not have permission to access this page. Please contact your
          administrator for the necessary permissions.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
