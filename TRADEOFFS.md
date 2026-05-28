# TRADEOFFS.md

## 1. Authentication and Role-Based Access

Authentication was intentionally excluded.

### Reason

The focus of the prototype was ESG ingestion and analyst workflows rather than user management.

In a production system, roles such as:

* analyst
* auditor
* admin
  would be required.

---

## 2. Real Emissions Factor Calculations

The system does not calculate actual carbon emissions.

### Reason

The prototype focuses on ingestion, normalization, suspicious detection, and review workflows.

A production system would integrate:

* emissions factor libraries
* regional emissions datasets
* unit conversion engines

---

## 3. PDF Parsing and Complex Source Integrations

Electricity PDF parsing and direct SAP integrations were intentionally excluded.

### Reason

Real-world SAP integrations and utility PDF parsing are highly complex and would significantly expand project scope.

The prototype instead focused on realistic CSV-based ingestion workflows commonly used operationally.
