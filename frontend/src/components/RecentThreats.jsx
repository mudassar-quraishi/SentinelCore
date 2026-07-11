import { useEffect, useState } from "react";
import api from "../services/api";

function RecentThreats() {

    const [threats, setThreats] = useState([]);

    useEffect(() => {
        fetchRecentThreats();
    }, []);

    const fetchRecentThreats = async () => {
        try {
            const response = await api.get("/dashboard/recent-threats");
            setThreats(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSeverityBadge = (severity) => {

        switch (severity) {

            case "Critical":
                return "bg-red-600 text-white";

            case "High":
                return "bg-orange-500 text-white";

            case "Medium":
                return "bg-yellow-400 text-black";

            case "Low":
                return "bg-green-500 text-white";

            default:
                return "bg-gray-500 text-white";
        }
    };

    const getStatusBadge = (status) => {

        switch (status.toLowerCase()) {

            case "open":
                return "bg-blue-100 text-blue-700";

            case "resolved":
            case "close":
            case "closed":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (

        <div className="bg-white rounded-xl shadow-lg mt-8 p-6">

            <h2 className="text-2xl font-bold mb-4">
                Recent Threats
            </h2>

            <table className="w-full">

                <thead className="bg-slate-800 text-white">

                    <tr>

                        <th className="p-3">ID</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Severity</th>
                        <th className="p-3">Source</th>
                        <th className="p-3">Status</th>

                    </tr>

                </thead>

                <tbody>

                    {threats.length > 0 ? (

                        threats.map((threat) => (

                            <tr
                                key={threat.id}
                                className="border-b text-center hover:bg-gray-50"
                            >

                                <td className="p-3">{threat.id}</td>

                                <td className="p-3">{threat.title}</td>

                                <td className="p-3">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityBadge(
                                            threat.severity
                                        )}`}
                                    >
                                        {threat.severity}
                                    </span>

                                </td>

                                <td className="p-3">{threat.source}</td>

                                <td className="p-3">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                                            threat.status
                                        )}`}
                                    >
                                        {threat.status}
                                    </span>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center p-5 text-gray-500"
                            >
                                No Recent Threats
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );
}

export default RecentThreats;