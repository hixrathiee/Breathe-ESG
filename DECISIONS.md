# DECISIONS.md

## Overview

This prototype focuses on building a realistic ESG ingestion and analyst review workflow rather than a feature-heavy platform.

Several implementation decisions were intentionally simplified to prioritize clarity, auditability, and normalization.

---

# Backend Stack Decision

The assignment requested Django REST, but Node.js + Express was used instead.

### Reason

I was significantly more comfortable with the Node.js ecosystem and wanted to prioritize building a clean, understandable system within the limited timeline.

The core architecture and workflow requirements remain unchanged:

* ingestion
* normalization
* review workflow
* audit trail

---

# Database Choice

PostgreSQL was selected because:

* relational structure fits audit workflows well
* supports normalized ESG data modeling
* strong compatibility with Prisma ORM

Neon PostgreSQL was used for cloud hosting.

---

# SAP Ingestion Decision

A simplified CSV-based SAP export workflow was implemented.

### Reason

Real SAP integrations are highly complex and commonly involve:

* IDocs
* BAPIs
* OData services

For the prototype, CSV exports were chosen because flat-file exports are common in enterprise operational workflows.

The implementation focused on:

* fuel/procurement style data
* inconsistent units
* suspicious data detection

---

# Electricity Ingestion Decision

Electricity data ingestion was implemented using utility-style CSV uploads.

### Reason

Many facilities teams export electricity usage data from utility portals as spreadsheets or CSV files.

The implementation focused on:

* kWh usage
* billing-style utility data
* suspicious usage detection

PDF parsing was intentionally excluded due to time constraints.

---

# Travel Data Decision

Travel data was implemented as manual/API-style form ingestion.

### Reason

Corporate travel systems such as Concur or Navan often expose structured APIs.

The form simulates:

* travel event ingestion
* business travel categorization
* Scope 3 handling

This simplified the prototype while still demonstrating travel ingestion workflow.

---

# Suspicious Record Logic

Records are flagged when:

* values are negative
* units are missing
* unusually high activity values are detected

### Reason

The prototype focuses on analyst review workflow rather than precise emissions calculation.

---

# Analyst Workflow Decision

Records are not automatically trusted after ingestion.

Analysts can:

* approve records
* reject records
* update suspicious values

Every review action generates an audit log entry.

This was prioritized because auditability is critical in ESG workflows.

---

# UI Decision

The frontend was intentionally designed as:

* clean
* operational
* analyst-focused

The goal was to resemble internal enterprise tooling rather than a marketing-style dashboard.
