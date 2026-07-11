import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditIOC() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ioc, setIOC] = useState({
        type: "",
        value: "",
        riskLevel: "",
        source: "",
        status: "",
    });

    useEffect(() => {
        loadIOC();
    }, []);

    const loadIOC = async () => {

        try {

            const response = await api.get(`/ioc/${id}`);

            setIOC(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to Load IOC");

        }

    };

    const updateIOC = async () => {

        try {

            await api.put(`/ioc/${id}`, ioc);

            alert("IOC Updated Successfully");

            navigate("/ioc-list");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl">

                    <h1 className="text-3xl font-bold mb-6">
                        Edit IOC
                    </h1>

                    <input
                        className="w-full border p-3 rounded mb-4"
                        value={ioc.type}
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                type: e.target.value,
                            })
                        }
                    />

                    <input
                        className="w-full border p-3 rounded mb-4"
                        value={ioc.value}
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                value: e.target.value,
                            })
                        }
                    />

                    <select
                        className="w-full border p-3 rounded mb-4"
                        value={ioc.riskLevel}
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                riskLevel: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Risk Level</option>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <input
                        className="w-full border p-3 rounded mb-4"
                        value={ioc.source}
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                source: e.target.value,
                            })
                        }
                    />

                    <select
                        className="w-full border p-3 rounded mb-6"
                        value={ioc.status}
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Status</option>
                        <option>Active</option>
                        <option>Blocked</option>
                        <option>Investigating</option>
                    </select>

                    <button
                        onClick={updateIOC}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
                    >
                        Update IOC
                    </button>

                </div>

            </main>
        </>
    );
}

export default EditIOC;