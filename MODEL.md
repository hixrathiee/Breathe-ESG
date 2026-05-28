# MODEL.md

## Data Model Overview

The application uses a normalized relational data model designed to support multi-source ESG ingestion, analyst review workflows, and auditability.

The goal was to normalize different incoming data formats into a common structure while preserving source tracking and review history.

---

# Entities

## Company

Represents a client organization whose ESG data is being ingested.

### Fields

* id
* name
* createdAt

### Purpose

Supports multi-tenancy by allowing multiple companies to exist independently within the platform.

---

## DataSource

Tracks where the data originated from.

### Fields

* id
* sourceType
* fileName
* uploadedAt
* companyId

### Purpose

Provides source-of-truth tracking for ingestion events.

Examples:

* SAP fuel export
* Electricity utility CSV
* Travel platform/manual travel entry

This allows analysts and auditors to trace every emission record back to its origin.

---

## EmissionRecord

Core normalized ESG activity record.

### Fields

* id
* category
* scope
* activityValue
* unit
* status
* isSuspicious
* companyId
* sourceId
* createdAt

### Purpose

Stores normalized ESG activity data regardless of original source format.

Examples:

* Fuel consumption
* Electricity usage
* Business travel activity

The model supports:

* Scope 1 emissions
* Scope 2 emissions
* Scope 3 emissions

Normalization ensures all records follow a consistent structure even when incoming formats differ.

---

## AuditLog

Tracks analyst review activity.

### Fields

* id
* action
* changedBy
* timestamp
* recordId

### Purpose

Provides audit trail support.

Examples:

* Record approved
* Record rejected
* Record updated by analyst

This helps support auditability and analyst accountability.

---

# Suspicious Record Detection

The system flags potentially invalid records during ingestion.

Examples:

* Missing unit
* Negative values
* Extremely high values

Flagged records are marked as:

* Needs Review

This allows analysts to manually review suspicious records before approval.

---

# Scope Categorization

The application supports ESG scope categorization:

* Scope 1 → Fuel / direct emissions
* Scope 2 → Electricity usage
* Scope 3 → Business travel

This categorization is stored directly in normalized records.

---

# Source Tracking

Each emission record maintains references to:

* company
* ingestion source
* upload timestamp

This enables complete traceability from dashboard record back to original source.

---

# Auditability

The system maintains:

* ingestion source history
* review history
* analyst review actions

This provides a lightweight audit workflow suitable for ESG analyst review processes.
