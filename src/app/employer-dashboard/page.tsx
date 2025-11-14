import { getCurrentUser } from "@/features/auth/server/auth.queries";

const EmployerDashboard = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
    </div>
  );
};

export default EmployerDashboard;
