import { useEffect, useState } from "react";
import API from "../services/api";

const RecordsTable = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecords = async () => {
        try {
            const res = await API.get("/records");

            setRecords(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const reviewRecord = async (
        id,
        status,
        currentValue
    ) => {
        try {
            await API.patch(`/records/${id}/review`, {
                status,
                activityValue: currentValue,
            });

            fetchRecords();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <div className="mt-10 text-gray-500">
                Loading records...
            </div>
        );
    }

    return (
        <div className="mt-10 bg-white rounded-2xl shadow-md border p-6">
            <h2 className="text-2xl font-semibold mb-6">
                Emission Records
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Category</th>
                            <th className="p-3">Scope</th>
                            <th className="p-3">Value</th>
                            <th className="p-3">Unit</th>
                            <th className="p-3">Source</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Review</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((record) => (
                            <tr
                                key={record.id}
                                className="border-b hover:bg-gray-100 transition"
                            >
                                <td className="p-3">
                                    {record.category}
                                </td>

                                <td className="p-3">
                                    {record.scope}
                                </td>

                                <td className="p-3">
                                    <input
                                        type="number"
                                        defaultValue={
                                            record.activityValue
                                        }
                                        className="border rounded-lg p-2 w-24"
                                        onChange={(e) =>
                                        (record.activityValue =
                                            Number(e.target.value))
                                        }
                                    />
                                </td>

                                <td className="p-3">
                                    {record.unit}
                                </td>

                                <td className="p-3">
                                    {record.source.sourceType}
                                </td>

                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
${record.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : record.status === "Rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {record.status}
                                    </span>
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() =>
                                            reviewRecord(
                                                record.id,
                                                "Approved",
                                                record.activityValue
                                            )
                                        }
                                        className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded-lg"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() =>
                                            reviewRecord(
                                                record.id,
                                                "Rejected",
                                                record.activityValue
                                            )
                                        }
                                        className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded-lg"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecordsTable;