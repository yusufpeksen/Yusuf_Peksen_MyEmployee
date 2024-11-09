import Link from "next/link";
import React from "react";
import useUserInfo from "../hooks/useUserInfo";

const Navbar = () => {
  const { role, loading } = useUserInfo();

  if (loading) {
    return null;
  }

  return (
    <div className="w-full border border-white fixed top-0 py-4 bg-black">
      <ul className="w-full flex justify-center items-center gap-16 text-3xl">
        <Link href={"/"}>Home</Link>
        <Link href={"/employees"}>Employees</Link>
        {role === "[ADMIN]" && <Link href={"/newEmployee"}>New Employee</Link>}
      </ul>
    </div>
  );
};

export default Navbar;
