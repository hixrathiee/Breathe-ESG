import { useState } from "react";
import API from "../services/api";

const UploadSection = () => {
  const [sapFile, setSapFile] = useState(null);
  const [electricityFile, setElectricityFile] = useState(null);

  const [travelData, setTravelData] = useState({
    employee: "",
    from: "",
    to: "",
    mode: "",
  });

  const uploadSAP = async () => {
    if (!sapFile) return;

    const formData = new FormData();
    formData.append("file", sapFile);

    try {
      await API.post("/upload/sap", formData);

      alert("SAP data uploaded successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to upload SAP data");
    }
  };

  const uploadElectricity = async () => {
    if (!electricityFile) return;

    const formData = new FormData();
    formData.append("file", electricityFile);

    try {
      await API.post("/upload/electricity", formData);

      alert("Electricity data uploaded successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to upload electricity data");
    }
  };

  const uploadTravel = async () => {
    try {
      await API.post("/upload/travel", travelData);

      alert("Travel data uploaded successfully");
     window.location.reload();
      setTravelData({
        employee: "",
        from: "",
        to: "",
        mode: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to upload travel data");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      
      {/* SAP Upload */}
      <div className="bg-white shadow-md rounded-xl p-5 border">
        <h2 className="text-xl font-semibold mb-4">
          SAP Fuel Upload
        </h2>

       <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-black transition mb-4">

  <p className="font-medium">
    Upload SAP CSV
  </p>

  <p className="text-sm text-gray-500 mt-1">
    Click to choose file
  </p>

  <input
    type="file"
    accept=".csv"
    onChange={(e) => setSapFile(e.target.files[0])}
    className="hidden"
  />
</label>

        {sapFile && (
  <p className="text-sm text-green-600 mb-2">
    Selected: {sapFile.name}
  </p>
)}

        <button
  onClick={uploadSAP}
  disabled={!sapFile}
  className={`px-4 py-2 rounded-lg w-full text-white transition
  ${
    sapFile
      ? "bg-black hover:bg-gray-800"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
          Upload SAP CSV
        </button>
      </div>

      {/* Electricity Upload */}
      <div className="bg-white shadow-md rounded-xl p-5 border">
        <h2 className="text-xl font-semibold mb-4">
          Electricity Upload
        </h2>

        <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-black transition mb-4">

  <p className="font-medium">
    Upload Electricity CSV
  </p>

  <p className="text-sm text-gray-500 mt-1">
    Click to choose file
  </p>

  <input
    type="file"
    accept=".csv"
    onChange={(e) =>
      setElectricityFile(e.target.files[0])
    }
    className="hidden"
  />
</label>

{electricityFile && (
  <p className="text-sm text-green-600 mb-2">
    Selected: {electricityFile.name}
  </p>
)}
        
        <button
  onClick={uploadElectricity}
  disabled={!electricityFile}
  className={`px-4 py-2 rounded-lg w-full text-white transition
  ${
    electricityFile
      ? "bg-black hover:bg-gray-800"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
          Upload Electricity CSV
        </button>
      </div>

      {/* Travel Upload */}
      <div className="bg-white shadow-md rounded-xl p-5 border">
        <h2 className="text-xl font-semibold mb-4">
          Travel Entry
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Employee"
            value={travelData.employee}
            onChange={(e) =>
              setTravelData({
                ...travelData,
                employee: e.target.value,
              })
            }
            className="border p-2 rounded-lg w-full"
          />

          <input
            type="text"
            placeholder="From"
            value={travelData.from}
            onChange={(e) =>
              setTravelData({
                ...travelData,
                from: e.target.value,
              })
            }
            className="border p-2 rounded-lg w-full"
          />

          <input
            type="text"
            placeholder="To"
            value={travelData.to}
            onChange={(e) =>
              setTravelData({
                ...travelData,
                to: e.target.value,
              })
            }
            className="border p-2 rounded-lg w-full"
          />

          <input
            type="text"
            placeholder="Mode"
            value={travelData.mode}
            onChange={(e) =>
              setTravelData({
                ...travelData,
                mode: e.target.value,
              })
            }
            className="border p-2 rounded-lg w-full"
          />

          <button
            onClick={uploadTravel}
            className="bg-black text-white px-4 py-2 rounded-lg w-full"
          >
            Add Travel Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
