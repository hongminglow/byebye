import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/types/auth";

export const Dashboard = () => {
  //   const user = useUser();
  const { can } = usePermissions();

  return (
    <div className="text-white">
      <h1>Dashboard</h1>

      {can(PERMISSIONS.DASHBOARD_EDIT) && <button>Edit Dashboard</button>}

      {can([PERMISSIONS.REPORTS_VIEW]) && <div>Advanced Analytics</div>}
    </div>
  );
};
