const prisma = require("../config/db");

const getAuditLogs = async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: {
        record: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    res.json(logs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch audit logs",
    });
  }
};

module.exports = {
  getAuditLogs,
};