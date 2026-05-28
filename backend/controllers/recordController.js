const prisma = require("../config/db");

const getAllRecords = async (req, res) => {
  try {
    const records = await prisma.emissionRecord.findMany({
      include: {
        company: true,
        source: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(records);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch records",
    });
  }
};

const reviewRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, activityValue } = req.body;

    const updatedRecord =
      await prisma.emissionRecord.update({
        where: {
          id: Number(id),
        },
        data: {
          status,
          isSuspicious:
            status === "Approved"
              ? false
              : true,
          ...(activityValue && { activityValue }),
        },
      });

    await prisma.auditLog.create({
      data: {
        action: `Record marked as ${status}`,
        changedBy: "Analyst",
        recordId: updatedRecord.id,
      },
    });

    res.json({
      message: "Record reviewed successfully",
      updatedRecord,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to review record",
    });
  }
};
module.exports = {
  getAllRecords, reviewRecord
};