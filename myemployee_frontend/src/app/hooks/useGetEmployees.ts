import React, { useEffect, useState } from "react";
import { Employee } from "../interfaces/interfaces";

const useGetEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Employee information not available");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, setEmployees, loading, error }; // setEmployees'i ekledik
};

export default useGetEmployees;
