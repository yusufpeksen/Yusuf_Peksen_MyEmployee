import useUserInfo from "../hooks/useUserInfo";
import Unauthorized from "../components/Unauthorized";

const withRoleProtection = (
  WrappedComponent: React.FC,
  requiredRole: string
) => {
  return () => {
    const { role, loading } = useUserInfo();

    if (loading) return <div>Loading...</div>;

    if (role !== requiredRole) return <Unauthorized />;

    return <WrappedComponent />;
  };
};

export default withRoleProtection;
