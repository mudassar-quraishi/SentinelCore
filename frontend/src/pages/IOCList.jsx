import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function IOCList() {

    const navigate = useNavigate();

    const [iocs, setIOCs] = useState([]);
    const [search, setSearch] = useState("");
    const [riskFilter, setRiskFilter] = useState("All");

    useEffect(() => {
        fetchIOCs();
    }, []);

    const fetchIOCs = async () => {

        try {

            const response = await api.get("/ioc");

            setIOCs(response.data);

        } catch (error) {

            console.log(error);

        }

    };
        const deleteIOC = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this IOC?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/ioc/${id}`);

            alert("IOC Deleted Successfully");

            fetchIOCs();

        } catch (error) {

            console.log(error);

            alert("Failed to Delete IOC");

        }

    };

    const filteredIOCs = iocs.filter((ioc) => {

        const matchesSearch =
            ioc.type.toLowerCase().includes(search.toLowerCase()) ||
            ioc.value.toLowerCase().includes(search.toLowerCase());

        const matchesRisk =
            riskFilter === "All" ||
            ioc.riskLevel === riskFilter;

        return matchesSearch && matchesRisk;

    });

    const getRiskBadge = (risk) => {

        switch (risk) {

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

        switch (status) {

            case "Active":
                return "bg-green-100 text-green-700";

            case "Blocked":
                return "bg-red-100 text-red-700";

            case "Investigating":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    return (

        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <h1 className="text-3xl font-bold mb-6">
                    IOC List
                </h1>

                <div className="mb-6 flex gap-4">

                    <input
                        type="text"
                        placeholder="Search IOC..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-80 border rounded-lg px-4 py-2"
                    />

                    <select
                        value={riskFilter}
                        onChange={(e) => setRiskFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >

                        <option value="All">All Risk</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>

                    </select>

                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="p-4">ID</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Value</th>
                                <th className="p-4">Risk</th>
                                <th className="p-4">Source</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredIOCs.length > 0 ? (

                                filteredIOCs.map((ioc) => (

                                    <tr
                                        key={ioc.id}
                                        className="border-b hover:bg-gray-50 text-center"
                                    >

                                        <td className="p-4">{ioc.id}</td>

                                        <td className="p-4">{ioc.type}</td>

                                        <td className="p-4">{ioc.value}</td>

                                        <td className="p-4">

                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskBadge(ioc.riskLevel)}`}>
                                                {ioc.riskLevel}
                                            </span>

                                        </td>

                                        <td className="p-4">{ioc.source}</td>

                                        <td className="p-4">

                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(ioc.status)}`}>
                                                {ioc.status}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                           <button
                                                onClick={() => navigate(`/edit-ioc/${ioc.id}`)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                           <button
                                                onClick={() => deleteIOC(ioc.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No IOC Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </main>

        </>

    );

}

export default IOCList;