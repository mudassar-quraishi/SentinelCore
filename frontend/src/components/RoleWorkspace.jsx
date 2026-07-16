import { useNavigate } from "react-router-dom";
import { FaBell, FaChartBar, FaEye, FaPlusCircle, FaShieldAlt, FaUsers } from "react-icons/fa";

const workspaceByRole = {
  ADMIN: {
    title: "Administrator workspace",
    description: "Control access, manage users, and oversee all security operations.",
    tone: "border-red-500/30 bg-red-500/10",
    actions: [
      { label: "Manage Users", path: "/users", icon: <FaUsers /> },
      { label: "Add Threat", path: "/add-threat", icon: <FaPlusCircle /> },
      { label: "View Reports", path: "/reports", icon: <FaChartBar /> },
    ],
  },
  ANALYST: {
    title: "Analyst workspace",
    description: "Investigate threats and maintain threat, IOC, and alert intelligence.",
    tone: "border-cyan-500/30 bg-cyan-500/10",
    actions: [
      { label: "Add Threat", path: "/add-threat", icon: <FaShieldAlt /> },
      { label: "Add IOC", path: "/add-ioc", icon: <FaPlusCircle /> },
      { label: "Add Alert", path: "/add-alert", icon: <FaBell /> },
    ],
  },
  VIEWER: {
    title: "Viewer workspace",
    description: "Read-only access: review security intelligence and reports without changing data.",
    tone: "border-blue-500/30 bg-blue-500/10",
    actions: [
      { label: "View Threats", path: "/threat-list", icon: <FaEye /> },
      { label: "View Alerts", path: "/alert-list", icon: <FaEye /> },
      { label: "View Reports", path: "/reports", icon: <FaChartBar /> },
    ],
  },
};

function RoleWorkspace({ role }) {
  const navigate = useNavigate();
  const workspace = workspaceByRole[role] ?? workspaceByRole.VIEWER;

  return (
    <section className={`mt-8 rounded-2xl border p-6 ${workspace.tone}`}>
      <h2 className="text-2xl font-bold text-white">{workspace.title}</h2>
      <p className="mt-2 text-slate-300">{workspace.description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {workspace.actions.map((action) => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            {action.icon} {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default RoleWorkspace;
