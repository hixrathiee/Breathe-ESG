import UploadSection from "../components/UploadSection";
import RecordsTable from "../components/RecordsTable";
import AuditLogs from "../components/AuditLogs";
import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
  total: 0,
  suspicious: 0,
  approved: 0,
});

const fetchStats = async () => {
  try {
    const res = await API.get("/records");

    const records = res.data;

    const total = records.length;

    const suspicious = records.filter(
      (record) => 
        record.status === "Needs Review"
    ).length;

    const approved = records.filter(
      (record) =>
        record.status === "Approved"
    ).length;

    setStats({
      total,
      suspicious,
      approved,
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchStats();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold ">
            Breathe ESG Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            ESG ingestion, normalization, and analyst review workflow
          </p>
        </div>

<div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <p className="text-gray-500 text-sm">
      Total Records
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {stats.total}
    </h2>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <p className="text-gray-500 text-sm">
      Needs Review
    </p>

    <h2 className="text-3xl font-bold mt-2 text-yellow-600">
      {stats.suspicious}
    </h2>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <p className="text-gray-500 text-sm">
      Approved
    </p>

    <h2 className="text-3xl font-bold mt-2 text-green-600">
      {stats.approved}
    </h2>
  </div>

</div>
        <UploadSection />

        <RecordsTable />

        <AuditLogs />
      </div>
    </div>
  );
};

export default Dashboard;