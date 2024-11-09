"use client";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { Address, Employee } from "@/app/interfaces/interfaces";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid employee ID");
      setLoading(false);
      return;
    }

    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employees/${id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Çalışan bilgileri alınamadı");
        }
        const data = await response.json();
        setEmployee(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/addresses/${id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Unable to retrieve address details");
        }
        const data = await response.json();
        setAddresses(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    Promise.all([fetchEmployee(), fetchAddresses()]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>No employee found.</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Navbar />
      <div className="p-6 text-center mt-40">
        <h1 className="text-4xl font-bold">
          {employee.firstName} {employee.lastName}
        </h1>
        <p>Job Title: {employee.jobTitle}</p>
        <p>Birth Date: {String(employee.birthdate)}</p>
        <p>Start Date: {String(employee.startDate)}</p>
        <h2 className="text-2xl font-bold mt-4">Addresses:</h2>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={index} className="mt-2 text-left">
              <p className="text-red-500">Adress {index}</p>
              <p>Street Address: {address.streetAddress}</p>
              <p>City: {address.city}</p>
              <p>State: {address.state}</p>
              <p>Postal Code: {address.postalCode}</p>
              <p>Country: {address.country}</p>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
