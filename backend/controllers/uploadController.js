const csv = require("csv-parser");
const fs = require("fs");

const prisma = require("../config/db");

const uploadSAPData = async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      try {
        let company = await prisma.company.findFirst({
          where: {
            name: "Demo Company",
          },
        });

        if (!company) {
          company = await prisma.company.create({
            data: {
              name: "Demo Company",
            },
          });
        }

        const dataSource = await prisma.dataSource.create({
          data: {
            sourceType: "SAP",
            fileName: req.file.originalname,
            companyId: company.id,
          },
        });

        for (const row of results) {
          const quantity = parseFloat(row.quantity);

          const isSuspicious =
            !row.unit || quantity < 0 || quantity > 100000;

          await prisma.emissionRecord.create({
            data: {
              category: row.fuel || "Fuel",
              scope: "Scope 1",
              activityValue: quantity || 0,
              unit: row.unit || "unknown",
              status: isSuspicious
                ? "Needs Review"
                : "Approved",
              isSuspicious,
              companyId: company.id,
              sourceId: dataSource.id,
            },
          });
        }

        fs.unlinkSync(req.file.path);

        res.json({
          message: "SAP CSV uploaded successfully",
          rowsProcessed: results.length,
        });
      } catch (error) {
        console.log(error);

        res.status(500).json({
          error: "Error processing CSV",
        });
      }
    });
};

const uploadElectricityData = async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      try {
        let company = await prisma.company.findFirst({
          where: {
            name: "Demo Company",
          },
        });

        if (!company) {
          company = await prisma.company.create({
            data: {
              name: "Demo Company",
            },
          });
        }

        const dataSource = await prisma.dataSource.create({
          data: {
            sourceType: "Electricity",
            fileName: req.file.originalname,
            companyId: company.id,
          },
        });

        for (const row of results) {
          const usage = parseFloat(row.kwh);

          const isSuspicious =
            !row.kwh || usage < 0 || usage > 500000;

          await prisma.emissionRecord.create({
            data: {
              category: "Electricity",
              scope: "Scope 2",
              activityValue: usage || 0,
              unit: "kWh",
              status: isSuspicious
                ? "Needs Review"
                : "Approved",
              isSuspicious,
              companyId: company.id,
              sourceId: dataSource.id,
            },
          });
        }

        fs.unlinkSync(req.file.path);

        res.json({
          message: "Electricity CSV uploaded successfully",
          rowsProcessed: results.length,
        });
      } catch (error) {
        console.log(error);

        res.status(500).json({
          error: "Error processing electricity CSV",
        });
      }
    });
};
const uploadTravelData = async (req, res) => {
  try {
    const { employee, from, to, mode } = req.body;

    let company = await prisma.company.findFirst({
      where: {
        name: "Demo Company",
      },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: "Demo Company",
        },
      });
    }

    const dataSource = await prisma.dataSource.create({
      data: {
        sourceType: "Travel",
        fileName: "API Import",
        companyId: company.id,
      },
    });

    const isSuspicious =
      !employee ||
      !from ||
      !to ||
      !mode;

    const record =
      await prisma.emissionRecord.create({
        data: {
          category: "Business Travel",
          scope: "Scope 3",
          activityValue: 1,
          unit: "trip",
          status: isSuspicious
            ? "Needs Review"
            : "Approved",
          isSuspicious,
          companyId: company.id,
          sourceId: dataSource.id,
        },
      });

    res.json({
      message: "Travel data added",
      record,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Travel upload failed",
    });
  }
};
module.exports = {
  uploadSAPData, uploadElectricityData, uploadTravelData
};