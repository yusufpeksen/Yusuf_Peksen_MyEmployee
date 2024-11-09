"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import useUserInfo from "../hooks/useUserInfo";
import useGetEmployees from "../hooks/useGetEmployees";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { role, loading: loadingUser } = useUserInfo();
  const { employees, setEmployees, loading, error } = useGetEmployees();

  if (loadingUser) {
    return null;
  }

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortByStartDate = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/employees/startDate",
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to sort employees by start date");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortByLastName = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/employees/lastName",
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to sort employees by last name");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-4xl mt-44">All Employees</h1>
      {role === "[ADMIN]" && (
        <div className="flex justify-center mt-5">
          <button
            className="px-4 py-2 bg-blue-400 text-white rounded-xl"
            onClick={handleSortByStartDate}
          >
            Sort by Start Date
          </button>
          <button
            className="px-4 py-2 bg-blue-400 text-white rounded-xl ml-3"
            onClick={handleSortByLastName}
          >
            Sort by Last Name
          </button>
        </div>
      )}
      {employees.length > 0 ? (
        <div className="mt-10">
          <ul>
            {currentEmployees.map((employee) => (
              <li
                key={employee.id}
                className="border border-gray-500 p-4 flex items-center justify-between mb-5 px-40"
              >
                <div className="flex-1">
                  {employee.firstName} {employee.lastName}
                </div>
                <div className="flex-1 text-center">{employee.jobTitle}</div>
                <div className="flex-1 text-center">
                  {String(employee.startDate)}
                </div>
                {role === "[ADMIN]" && (
                  <div className="flex gap-4">
                    <Link
                      className="px-4 py-2 bg-blue-400 text-white rounded-xl"
                      href={`/employees/${employee.id}`}
                    >
                      Details
                    </Link>
                    <Link
                      className="px-4 py-2 bg-green-400 text-white rounded-xl"
                      href={`/editEmployee/${employee.id}`}
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-5">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No employee found.</p>
      )}
    </div>
  );
};

export default Page;
