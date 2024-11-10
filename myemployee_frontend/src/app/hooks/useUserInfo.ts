import { useEffect, useState } from "react";

const useUserInfo = () => {
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/info", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const data = await response.json();
        setRole(data.roles);
        setUsername(data.username);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { role, username, loading, error };
};

export default useUserInfo;
