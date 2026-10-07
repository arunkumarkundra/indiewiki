---
title: "Run a safe production database migration"
description: "Plan and deploy schema or data changes while protecting existing records, keeping application versions compatible, and preparing a recovery path."
slug: run-a-safe-production-database-migration
category: operate
kind: recipe
tags: [database, migrations, deployment, reliability]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck database-engine behavior, migration-tool deployment guidance, or recovery practice after a major version, hosting, schema, or data-volume change."
related: [operate, build, ship]
featured: false
seedSources: []
sources:
  - title: "Using the expand and contract pattern"
    url: https://www.prisma.io/dataguide/types/relational/expand-and-contract-pattern
    publisher: "Prisma Data Guide"
    accessed: 2026-10-07
  - title: "Modifying Tables"
    url: https://www.postgresql.org/docs/current/ddl-alter.html
    publisher: "PostgreSQL Global Development Group"
    accessed: 2026-10-07
  - title: "Explicit Locking"
    url: https://www.postgresql.org/docs/current/explicit-locking.html
    publisher: "PostgreSQL Global Development Group"
    accessed: 2026-10-07
  - title: "Versioned migrations"
    url: https://documentation.red-gate.com/fd/versioned-migrations-273973333.html
    publisher: "Redgate Flyway Documentation"
    accessed: 2026-10-07
  - title: "Rolling out updates from a single schema to multiple production databases"
    url: https://documentation.red-gate.com/flyway/deploying-database-changes-using-flyway/rolling-out-updates-from-a-single-schema-to-multiple-production-databases
    publisher: "Redgate Flyway Documentation"
    accessed: 2026-10-07
---

## Treat a production migration as an application release

A migration changes the structure or meaning of durable customer data. A SQL statement that works against an empty local database can block writes, take much longer on a populated table, or leave deployed code unable to read its own records. Plan the database change together with the application versions, workers, scheduled tasks, and recovery steps that will run around it.

Use a single migration when the change is compatible with every application version that can be live during deployment and the database can safely apply it at the expected size. For a rename, type conversion, large backfill, or destructive cleanup, use staged expand-and-contract releases: introduce the new shape, move code and data gradually, then remove the old shape only after nothing relies on it. This pattern is described in the [Prisma Data Guide](https://www.prisma.io/dataguide/types/relational/expand-and-contract-pattern); its examples use relational databases, but the compatibility reasoning applies more broadly.

## Write down the compatibility and recovery plan

Before editing the migration, answer:

| Question | Record |
| --- | --- |
| What changes? | Tables, columns, constraints, indexes, data conversion, and affected records |
| Who reads or writes it? | Web app, workers, scheduled jobs, admin scripts, integrations, reports |
| Which versions may overlap? | Current release, next release, rollback candidate, long-running jobs |
| What can fail? | Lock wait, table rewrite, invalid data, disk growth, timeout, partial backfill |
| How will you detect success? | Explicit data predicates, constraints, error rates, latency, support reports |
| How do you recover? | Stop condition, forward correction, tested restore/PITR steps, owner and communications |

Estimate affected row counts and data size from production metadata. Check constraints, nulls, duplicates, foreign keys, and the old-to-new mapping before writing the conversion. A migration that changes meaning needs a stated rule for ambiguous or invalid rows; do not silently invent a default that changes customers’ status or permissions.

Database engines and versions differ in whether a schema operation rewrites a table, how long it holds locks, whether DDL participates in a transaction, and how indexes are built. For example, [PostgreSQL documents](https://www.postgresql.org/docs/current/ddl-alter.html) different costs for adding defaults and changing column types, while [its locking guide](https://www.postgresql.org/docs/current/explicit-locking.html) notes that many table changes can acquire an exclusive lock. Read the documentation for the engine, major version, hosting configuration, and exact operation you will run; “migration” does not imply non-blocking.

## Make migrations repeatable and reviewable

Keep versioned migration files in source control and apply them through the project’s controlled deployment process. Do not edit a migration after it has been applied to a permanent environment; create a new migration that corrects or advances the state. Flyway documents checksums for detecting changes to applied migrations and recommends rolling forward with a new versioned migration.

Read the generated SQL or migration plan. Look for implicit drops or renames, defaults applied to every existing row, full table rewrites, unbounded updates, index creation that blocks writes, lock acquisition, and constraints that will immediately scan old records. Add explicit preconditions and postconditions when the tool supports them. Do not treat “the migration command exited successfully” as evidence that records still mean the right thing.

Test the migration on an isolated database whose schema and data distribution resemble production. Use a sanitized copy or synthetic records where customer data is not essential. Measure duration, locks, disk use, and batch rate at a realistic scale. Confirm how your migration tool handles failure: some operations may roll back atomically, while others or other database engines can leave earlier steps applied. Never assume a failed command restored the old state.

Take a recoverable backup or confirm the provider’s point-in-time recovery window before a high-impact change. Check [the restore procedure](/wiki/make-backups-you-can-restore/) and who can perform it. A backup is not a rollback button: restoring may discard valid writes made after that recovery point, so agree on how to preserve or reconcile them before choosing that path.

## Expand, migrate, switch, and contract

For a change that old and new application code cannot both use, split it into releases. Example: replacing `published` with a more expressive `status` field.

### 1. Expand the schema

Add the new nullable column or table while retaining the existing one. Avoid a rename or drop while any deployed app, worker, report, or rollback release still expects the old field. Make additive defaults and constraints match the actual data semantics; a default for future inserts does not necessarily mean existing records were correctly converted.

### 2. Deploy code that can coexist

Deploy a version that understands both shapes. For a replacement field, write the new representation while continuing to support old readers. If you dual-write, define which field is authoritative during the transition and how partial failures are repaired. A transaction within one database can keep both fields aligned for a single write; external systems or asynchronous jobs need explicit retry and reconciliation.

### 3. Backfill in bounded, resumable batches

For a large table, avoid one unbounded update unless rehearsal shows it is safe at production size. Select a stable key range, update a bounded batch, commit, record the checkpoint, and continue. Make the operation idempotent so it can resume after timeout or restart. Pace batches to protect normal query latency and watch locks, replication lag, disk use, and error rates. The correct batch size is a measured property of the database and workload, not a universal number.

Account for rows changing during the backfill. If the application writes both representations, the backfill should only fill rows that still need conversion and should not overwrite newer values. If you cannot safely maintain both, pause writes for the affected workflow or use a carefully designed change-capture process; a naive copy can lose a concurrent user update.

### 4. Verify the converted data

Check a predicate that directly represents the invariant: no active record has a missing new value; each old status maps to the intended new state; references resolve; uniqueness holds. Compare mismatch counts and inspect representative edge cases. Matching total row counts alone cannot prove a correct conversion. Add and validate constraints only after existing records satisfy them.

### 5. Switch all readers and writers

After the backfill is complete and checked, deploy the version that reads the new field. Include workers, cron jobs, dashboards, exports, internal scripts, and any older app instances still serving requests. Monitor real traffic and application errors. Keep the old field until you no longer need the prior application version as a rollback target.

### 6. Contract in a later release

Only after old code and delayed jobs are gone, the new path is stable, and the rollback window has passed, remove the old column or table in a separate migration. Dropping a column destroys that column’s stored values; PostgreSQL’s documentation makes that consequence explicit. Preserve an export first if the data still has retention, audit, or customer-support value.

For a small table and a truly compatible change, the stages may be combined after testing. The purpose is to manage compatibility and recovery risk, not to add releases for their own sake.

## Deploy with one migration runner and clear stop conditions

Run schema migrations from one controlled deployment step, not concurrently from every web process starting up. Use the migration tool’s lock or deployment serialization. If a lock wait exceeds your safe window, stop and investigate rather than repeatedly retrying a blocking operation. Set database-appropriate statement and lock timeouts where supported, and test their effect in staging.

Before production, define a stop condition such as sustained write errors, unacceptable query latency, failed postcondition, unexpected row count, or growing replication lag. Decide who can stop the backfill or disable the feature. Keep an application rollback candidate compatible with the expanded schema; code rollback cannot restore data removed by a destructive migration.

After rollout, record the migration identifier, start and finish times, affected row counts, validation results, deployment versions, and any follow-up. Continue monitoring after the command finishes; deferred jobs and user workflows may expose issues later.

Use [database schema design](/wiki/database-schema-for-a-small-app/) for invariants and constraints, [backup restoration](/wiki/make-backups-you-can-restore/) for recovery, and [maintainable build workflow](/wiki/maintainable-build-workflow/) for reviewable releases.
