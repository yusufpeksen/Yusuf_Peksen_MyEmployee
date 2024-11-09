"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { Address, AddressType } from "../interfaces/interfaces";
import useGetAddressTypes from "../hooks/useGetAddressTypes";

const NewEmployeePage = () => {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    jobTitle: "",
    startDate: "",
    photoPath: "",
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      addressTypeId: 0,
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  ]);

  const [newAddressType, setNewAddressType] = useState("");

  const { addressTypes, error, setError, setAddressTypes } =
    useGetAddressTypes();

  const handleEmployeeChange = (e: any) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (index: any, field: any, value: any) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setAddresses(updatedAddresses);
  };

  const addAddress = () => {
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        addressTypeId: 0,
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const employeeResponse = await fetch(
        "http://localhost:8080/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(employeeData),
        }
      );

      if (!employeeResponse.ok) {
        throw new Error("Failed to create employee");
      }

      const newEmployee = await employeeResponse.json();
      const newEmployeeId = newEmployee.id;

      for (const address of addresses) {
        await fetch("http://localhost:8080/api/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...address, employeeId: newEmployeeId }),
        });
      }

      router.push("/employees");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddAddressType = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/address-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ typeName: newAddressType }),
      });

      if (!response.ok) {
        throw new Error("Failed to add address type");
      }

      const newType = await response.json();
      setAddressTypes((prevTypes) => [...prevTypes, newType]);
      setNewAddressType("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-10 my-5">
        <h1 className="text-2xl font-bold mb-4 mt-24">Add New Employee</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form className="space-y-4 w-1/2">
          <div>
            <label className="block mb-1 text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleEmployeeChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleEmployeeChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Birth Date</label>
            <input
              type="date"
              name="birthdate"
              value={employeeData.birthdate}
              onChange={handleEmployeeChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={employeeData.jobTitle}
              onChange={handleEmployeeChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={employeeData.startDate}
              onChange={handleEmployeeChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Photo Path</label>
            <input
              type="text"
              name="photoPath"
              value={employeeData.photoPath}
              onChange={handleEmployeeChange}
              className="w-full border p-2 rounded text-black"
            />
          </div>

          <h2 className="text-xl font-bold mt-6">Addresses</h2>
          {addresses.map((address, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block mb-1 text-white">Address Type</label>
                <select
                  value={address.addressTypeId}
                  onChange={(e) =>
                    handleAddressChange(
                      index,
                      "addressTypeId",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full border p-2 rounded text-black"
                >
                  <option value="">Select Address Type</option>
                  {addressTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.typeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-white">Street Address</label>
                <input
                  type="text"
                  value={address.streetAddress}
                  onChange={(e) =>
                    handleAddressChange(index, "streetAddress", e.target.value)
                  }
                  className="w-full border p-2 rounded text-black"
                />
              </div>
              <div>
                <label className="block mb-1 text-white">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    handleAddressChange(index, "city", e.target.value)
                  }
                  className="w-full border p-2 rounded text-black"
                />
              </div>
              <div>
                <label className="block mb-1 text-white">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    handleAddressChange(index, "state", e.target.value)
                  }
                  className="w-full border p-2 rounded text-black"
                />
              </div>
              <div>
                <label className="block mb-1 text-white">Postal Code</label>
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) =>
                    handleAddressChange(index, "postalCode", e.target.value)
                  }
                  className="w-full border p-2 rounded text-black"
                />
              </div>
              <div>
                <label className="block mb-1 text-white">Country</label>
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    handleAddressChange(index, "country", e.target.value)
                  }
                  className="w-full border p-2 rounded text-black"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addAddress}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Add More Address
          </button>

          <h2 className="text-xl font-bold mt-6">Add New Address Type</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={newAddressType}
              onChange={(e) => setNewAddressType(e.target.value)}
              className="w-full border p-2 rounded text-black"
              placeholder="Enter new address type"
            />
            <button
              type="button"
              onClick={handleAddAddressType}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Address Type
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white block rounded"
          >
            Save Employee and Addresses
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEmployeePage;
