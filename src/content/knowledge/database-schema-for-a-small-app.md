---
title: "Design a database schema that can change safely"
description: "A practical path from product workflows to tables, constraints, migrations, indexes, and recoverable backups for a small application."
slug: database-schema-for-a-small-app
category: build
kind: article
tags: [database, data-modeling, migrations]
audience: [independent builders, solo founders, small teams]
status: published
evidence: primary
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [build]
featured: false
seedSources: []
sources:
  - title: "PostgreSQL Constraints"
    url: https://www.postgresql.org/docs/current/ddl-constraints.html
    publisher: "PostgreSQL Global Development Group"
    accessed: 2026-10-07
  - title: "PostgreSQL Transactions"
    url: https://www.postgresql.org/docs/current/tutorial-transactions.html
    publisher: "PostgreSQL Global Development Group"
    accessed: 2026-10-07
---

## Start from actions and invariants

Model the work the product must do, not a speculative picture of every future feature. List the first three user journeys and the records each creates, changes, and reads. For a booking product, that might be users, offerings, bookings, and payments. Write the rules in plain language: a booking belongs to one customer; its start must precede its end; a payment reference must not be applied twice.

These rules are invariants. Put each invariant in the strongest practical layer. A database unique constraint prevents duplicate records even when two requests race. A foreign key prevents a booking pointing to a missing user. Application validation can give a friendly message, but should not be the only protection for rules that must always hold.

## Sketch tables before writing migrations

For each entity, record its identifier, required fields, optional fields, owner, timestamps, and relationships. Choose stable identifiers and explicit types. Store money as integer minor units with a currency code, not floating-point values. Store instants in a consistent timezone-aware form and display them in the user’s locale. Decide whether deletion means hard deletion, archival, or a retained minimal record; the right answer depends on product and legal needs.

Use a relationship diagram or a simple table before coding:

| Table | Example fields | Important rule |
|---|---|---|
| `workspaces` | `id`, `name`, `created_at` | A workspace has one owner |
| `memberships` | `workspace_id`, `user_id`, `role` | One membership per user and workspace |
| `projects` | `id`, `workspace_id`, `name` | Every project belongs to a workspace |

When users can belong to multiple organizations, ownership belongs on the membership relationship, not in a single `user.organization_id` field. Every read and write must then be scoped through a verified membership. This is a security boundary as much as a data-modeling choice.

## Make schema changes in small, reversible steps

Use versioned migrations committed with the application. Before a destructive change, ask what currently deployed code expects and how to recover. A safer column rename often takes two releases: add the new column, write both, backfill, switch reads, then remove the old column after checking no version needs it. Adding a required field to a populated table similarly needs a default or a staged backfill.

Try migrations against a realistic copy of the schema and representative data. Measure large backfills; a migration that locks a table for seconds locally may lock it much longer in production. Keep a documented restore path. A backup is only useful if you have tested restoring it into a separate database and confirmed the application can read it.

## Add indexes for measured queries

Begin with primary and unique keys. Add indexes when a real query filters, joins, or sorts by a field and the table size makes the query costly. For a common workspace feed, an index on `(workspace_id, created_at)` may help more than separate indexes on both columns. Check the query plan and workload before adding indexes: each index consumes storage and slows writes.

Use transactions when a user action must update multiple records together. If charging a card and recording an order span separate systems, a database transaction cannot make the remote charge atomic. Model the workflow as explicit states, use idempotency keys, and reconcile uncertain outcomes rather than assuming one transaction covers both.

Before launch, test the most important reads and writes, duplicate submission behavior, authorization scoping, migration from an empty database and an existing one, backup restoration, and a safe deletion path. Revisit the schema when actual workflows create pressure; do not prebuild a generalized platform for hypothetical future tenants.
