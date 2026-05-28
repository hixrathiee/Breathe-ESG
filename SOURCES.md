# SOURCES.md

# SAP Fuel and Procurement Data

## Research

I researched common SAP export approaches including:

* flat-file exports
* IDoc formats
* OData integrations

For this prototype, CSV-style flat file exports were selected because they are commonly used operationally by enterprise teams for reporting workflows.

---

## Sample Data Structure

The SAP sample data included:

* fuel type
* quantity
* units

Examples:

* diesel
* petrol
* coal

The dataset intentionally included:

* negative values
* unusually large quantities
* missing units

This was done to simulate data quality issues analysts may encounter in real ESG ingestion pipelines.

---

# Electricity Utility Data

## Research

Utility data commonly comes from:

* utility portals
* spreadsheet exports
* billing systems

CSV ingestion was selected for the prototype.

---

## Sample Data Structure

The electricity sample data included:

* meter usage
* kWh values
* billing-style energy records

Suspicious values were intentionally added to simulate:

* bad exports
* missing fields
* unrealistic consumption values

---

# Corporate Travel Data

## Research

Corporate travel systems such as:

* Concur
* Navan

commonly expose structured travel data through APIs.

Travel records may include:

* employee travel
* flights
* hotels
* transport modes

---

## Prototype Decision

The prototype implemented simplified manual/API-style travel ingestion.

The system captures:

* employee
* origin
* destination
* travel mode

This demonstrates Scope 3 ingestion workflow while keeping the implementation lightweight.

---

# What Would Break in Production

Several areas would require expansion in a production environment:

* real SAP integrations
* emissions factor calculations
* authentication and permissions
* PDF parsing
* data deduplication
* advanced unit normalization
* airport-distance calculations
* large-scale ingestion pipelines
