import { useEffect, useState } from "react";
import API from "../services/api";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/audit-logs");

      setLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-md border p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Audit Logs
      </h2>

      <div className="space-y-4 ">
        {logs.map((log) => (
          <div
            key={log.id}
            className="border rounded-xl p-4 flex justify-between items-center "
          >
            <div>
              <p className="font-medium">
                {log.action}
              </p>

              <p className="text-sm text-gray-500 ">
                Record: {log.record.category}
              </p>
            </div>

            <div className="text-sm text-gray-400">
              {new Date(
                log.timestamp
              ).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;