import React, { useEffect, useState } from "react";
import { AddressType } from "../interfaces/interfaces";

const useGetAddressTypes = () => {
  const [addressTypes, setAddressTypes] = useState<AddressType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddressTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/address-types",
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch address types");
        }
        const data = await response.json();
        setAddressTypes(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAddressTypes();
  }, []);
  return { addressTypes, error, setError, setAddressTypes };
};

export default useGetAddressTypes;
