import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddIOC() {

    const navigate = useNavigate();

    const [ioc, setIOC] = useState({
        type: "",
        value: "",
        riskLevel: "",
        source: "",
        status: "",
    });

    const saveIOC = async () => {

        try {

            await api.post("/ioc", ioc);

            alert("IOC Added Successfully");

            navigate("/ioc-list");

        } catch (error) {

            console.log(error);

            alert("Failed to Add IOC");

        }

    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl">

                    <h1 className="text-3xl font-bold mb-6">
                        Add IOC
                    </h1>

                    <input
                        type="text"
                        placeholder="IOC Type (IP, Domain, URL...)"
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                type: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="IOC Value"
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                value: e.target.value,
                            })
                        }
                    />

                    <select
                        className="w-full border p-3 rounded mb-4"
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
                        type="text"
                        placeholder="Source"
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setIOC({
                                ...ioc,
                                source: e.target.value,
                            })
                        }
                    />

                    <select
                        className="w-full border p-3 rounded mb-6"
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
                        onClick={saveIOC}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
                    >
                        Save IOC
                    </button>

                </div>

            </main>

        </>
    );
}

export default AddIOC;