"use client";
import { useParams, useRouter } from "next/navigation"; // useParams ve useRouter hook'ları
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { Employee } from "@/app/interfaces/interfaces";

const EditEmployeePage: React.FC = () => {
  const { id: employeeId } = useParams(); // useParams'tan employeeId'yi al
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/employees/${employeeId}`,
            { credentials: "include" }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch employee data");
          }
          const data = await response.json();
          setEmployeeData(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (employeeData) {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/${employeeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(employeeData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update employee");
      }
      router.push("/employees");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employeeData) {
    return <div>No employee data found.</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-10 my-5">
        <h1 className="text-2xl font-bold mb-4 mt-24">Edit Employee</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Birth Date</label>
            <input
              type="date"
              name="birthdate"
              value={String(employeeData.birthdate)}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={employeeData.jobTitle}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={String(employeeData.startDate)}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Photo Path</label>
            <input
              type="text"
              name="photoPath"
              value={employeeData.photoPath}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
