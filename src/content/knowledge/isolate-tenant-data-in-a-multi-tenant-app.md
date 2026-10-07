---
title: "Isolate tenant data across a multi-tenant app"
description: "Design and verify tenant boundaries across requests, database rows, files, caches, and background jobs in a small SaaS product."
slug: isolate-tenant-data-in-a-multi-tenant-app
category: quality
kind: recipe
tags: [multi-tenancy, authorization, data-isolation, security]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: high
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after changes to OWASP multi-tenant guidance, PostgreSQL row-security behavior, identity or storage architecture, or a reported cross-tenant incident."
related: [build, quality, operate]
featured: false
seedSources: []
sources:
  - title: "Multi-Tenant Application Security Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html
    publisher: "OWASP Cheat Sheet Series"
    accessed: 2026-10-07
  - title: "Authorization Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
    publisher: "OWASP Cheat Sheet Series"
    accessed: 2026-10-07
  - title: "SaaS partitioning models"
    url: https://docs.aws.amazon.com/whitepapers/latest/multi-tenant-saas-storage-strategies/saas-partitioning-models.html
    publisher: "AWS Whitepapers"
    accessed: 2026-10-07
  - title: "Row Security Policies"
    url: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
    publisher: "PostgreSQL Global Development Group"
    accessed: 2026-10-07
  - title: "Row-level security recommendations"
    url: https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-managed-postgresql/rls.html
    publisher: "AWS Prescriptive Guidance"
    accessed: 2026-10-07
---

## Treat tenant boundaries as an end-to-end security property

A tenant is the customer boundary inside a shared product. It might be a company, workspace, household, or account. A person may belong to several tenants, and roles can differ in each one. A tenant ID in a URL, header, form, database row, or job message is only a label. It does not prove that the current person or service is allowed to act for that tenant.

Isolation is correct only if one tenant cannot read, change, infer, or disrupt another tenant’s protected resources beyond the product’s explicit sharing rules. The boundary must hold in every path that touches tenant data: API requests, database reads and writes, uploads and downloads, search, caches, exports, support tools, scheduled work, and queued jobs. OWASP’s [multi-tenant security guidance](https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html) treats context injection, object-level authorization, pooled connections, file storage, caches, and asynchronous work as related isolation risks.

This guide focuses on a pooled web application, where tenants share application code and often tables. The same identity and authorization rules still apply if you use a separate database or schema per customer.

## 1. Define the boundary and choose a storage model

First write down what counts as a tenant, which records belong to it, which resources are intentionally shared, and which actions may cross the boundary. A public product catalog, for example, may be globally readable while its drafts, orders, invoices, and customer list are tenant-scoped. Mark that distinction in the data model and policy; do not depend on an engineer remembering that a table is “probably public.”

Choose a partitioning model based on isolation needs, customer promises, operating capacity, and recovery needs:

| Model | Data layout | Useful when | Costs and risks to plan for |
| --- | --- | --- | --- |
| **Silo** | Separate database or infrastructure per tenant | A customer needs a dedicated footprint, independent recovery, or separately controlled resources | More provisioning, migrations, monitoring, backups, and configuration drift to manage |
| **Bridge** | Shared application with some tenant-specific databases or schemas | You need more separation for selected tenants or data while sharing other services | More routing and operational paths; each path needs isolation and migration coverage |
| **Pool** | Multiple tenants share tables and rows are partitioned by a tenant key | You need efficient onboarding and cross-tenant reporting, and can reliably enforce row scope | A missing tenant predicate or policy can expose many customers; tenant-level restore and noisy-neighbor control need deliberate design |

These are architectural trade-offs, not a ladder where one choice is always correct. AWS’s [partitioning model overview](https://docs.aws.amazon.com/whitepapers/latest/multi-tenant-saas-storage-strategies/saas-partitioning-models.html) describes silo, bridge, and pool as valid models whose fit depends on business, regulatory, and legacy constraints. A mixed model is possible: most customers can share a pool while a documented subset receives a silo for a specific requirement. Do not promise “dedicated” isolation unless you can say which resources are dedicated and verify that they are.

## 2. Establish tenant context from a trusted identity

For each request, follow this chain on the server:

1. Authenticate the principal using the session or token validation already established by your application.
2. Determine the requested tenant. A user may select a workspace in the UI, but that submitted ID is only a selector.
3. Verify that the principal currently has an active membership or service authorization for that tenant.
4. Resolve the user’s role and permissions for that membership, not from a global user role unless the policy really is global.
5. Create a request-scoped tenant context that downstream code cannot replace with an unverified header, query parameter, body field, or object property.
6. Reject missing, expired, or invalid context. Never fall back to an unscoped query.

If membership or role changes should take effect immediately, check current server-side membership for the operation or use a revocation strategy with a known, short validity window. A long-lived token claim may identify a tenant, but it can become stale after the user is removed or downgraded. OWASP recommends binding tenant context to a server-verified identity and current membership; it also notes that opaque IDs reduce enumeration risk but do not authorize access.

Keep role checks and tenant checks distinct. “Editor” should mean an editor in *this* workspace, not a person who is an editor somewhere in the product. Define an access matrix and enforce deny-by-default, per-request authorization as described in [authentication and authorization](/wiki/authentication-and-authorization/).

## 3. Put tenant scope into the data model and every query

For a pooled relational model, add a non-null `tenant_id` to every tenant-owned record. Set it from the verified request context on the server; reject or ignore a client-supplied tenant ID on create and update. Include tenant scope in lookups, not only in the final permission check:

```sql
SELECT id, name, status
FROM projects
WHERE tenant_id = :verified_tenant_id
  AND id = :requested_project_id;
```

For writes, use the same scope in the mutation predicate. Do not load an arbitrary record by ID, mutate it, and hope every caller remembers the separate check. A zero-row result for a non-member or other tenant’s record can avoid disclosing that the record exists. OWASP describes this class of bug as insecure direct object reference (IDOR) and recommends looking up records in the authenticated principal’s permitted dataset; random or UUID identifiers are defense in depth, not a substitute for authorization.

Make it difficult for related rows to cross tenant boundaries accidentally. In a relational database, a common pattern is a unique key on `(tenant_id, id)` for a tenant-owned parent and a composite foreign key from child `(tenant_id, parent_id)` to that parent pair. This lets the database reject a child row that points to a parent from another tenant. Add indexes that begin with the tenant key for frequent scoped access paths, such as `(tenant_id, created_at)` for a tenant’s activity feed. Keep global uniqueness only where the rule is truly global; otherwise scope uniqueness to the tenant.

Apply the scope to all access shapes: list and detail queries, nested resources, bulk actions, search results, exports, analytics, admin views, and generated download links. When a resource is intentionally shareable across tenants, model the share or grant explicitly with its recipient, scope, expiry, and revocation behavior. Do not create an implicit cross-tenant exception in a general-purpose query.

For related constraints, indexes, and migrations, see [database schema design](/wiki/database-schema-for-a-small-app/).

## 4. Consider database row-level security as defense in depth

Application-level scoped queries are still required: they express the product’s access rules and limit what a route can do. In a pooled PostgreSQL design, row-level security (RLS) can add a second enforcement layer so a query that forgets a tenant predicate still cannot read or change another tenant’s rows.

At a high level, a policy compares each protected row’s `tenant_id` with a tenant context established by trusted server code. AWS provides a [PostgreSQL RLS example](https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-managed-postgresql/rls.html) using an application-set runtime variable and recommends enabling RLS on every table containing tenant data. Use the pattern supported by your database and framework; the example is PostgreSQL-specific, not portable SQL.

With PostgreSQL, do not assume that turning on RLS automatically protects every connection. The official [row security documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) states that table owners normally bypass policies; superusers and roles with `BYPASSRLS` always bypass them. Use a restricted runtime role for tenant-scoped traffic, review `USING` and `WITH CHECK` behavior for reads and writes, and reserve privileged maintenance access for explicit, audited operations. RLS does not apply to every table-wide operation, such as `TRUNCATE`.

When using a connection pool, set the tenant value transaction-locally for every transaction and complete the transaction before returning the connection. OWASP warns that session-scoped tenant state can leak into the next request if a pooled database session is reused without a reset. Fail closed if tenant context is absent. Test using the same database role and pooling configuration as production; an administrator connection can bypass RLS and give a misleading result.

RLS is useful defense in depth, but it does not correct a forged tenant context, unsafe privileged query, unscoped cache, public object URL, or cross-tenant job. Keep application authorization and database isolation independently reviewable.

## 5. Carry the boundary beyond the database

Use a tenant-aware key or enforceable access policy for each stored file. Before issuing a signed URL, authorize the exact object and operation; keep the link limited to that object, method, and a short justified lifetime. An unguessable object path is not an access check. See [file uploads and storage](/wiki/file-uploads-and-storage/).

Include the tenant and relevant authorization version in cache keys for private data. Clear or invalidate affected cached content after membership removal, role changes, data deletion, or tenant transfer. Test the same key pattern with two tenants so a response cached for one cannot satisfy the other’s request.

Treat each asynchronous message as a new authorization boundary. Classify work as global, tenant-scoped, or explicitly cross-tenant. For tenant-scoped work, bind verified tenant context to the message when an authorized producer enqueues it; at the consumer, re-establish context and authorize the operation and target again. Delayed jobs may run after membership or permissions change. Scope idempotency keys, retries, dead-letter access, and ordering when their effects differ by tenant. A shared queue does not itself isolate messages. See [background jobs and retries](/wiki/background-jobs-and-retries/).

Apply the same rule to scheduled jobs, search indexes, generated reports, email attachments, support tooling, audit views, and exports. A service credential that can read all tenants should not be passed to code paths that need only one tenant. If a genuinely global maintenance task needs broader access, make that mode explicit, narrow its permissions where possible, and record the actor, reason, and affected scope.

## 6. Verify both allowed and forbidden paths

Build a test fixture with two tenants and principals who have different roles in each. For every tenant-owned object type and operation, verify both the positive case and the boundary:

| Scenario | Expected result |
| --- | --- |
| Member reads or changes an allowed record in the active tenant | Allowed only for the membership’s role |
| Member substitutes another tenant’s record ID in a URL, body, or API call | Denied; no record data or existence details leak |
| Member lists, searches, exports, or downloads records | Results contain only authorized tenant data |
| User switches tenants | Context changes only after server verifies membership; prior data and cache entries do not carry over |
| Membership is removed or role downgraded while a session is open | Next protected request follows the product’s documented revocation window |
| Create or update supplies a different `tenant_id` | Rejected or ignored; row remains in the verified tenant |
| Parent and child rows from different tenants are combined | Database constraint or authorization policy rejects the relationship |
| Pooled database connection serves tenant A and then tenant B | B never inherits A’s tenant context, and a missing context fails closed |
| Background job or retry targets a tenant not authorized by its producer | Consumer rejects it; queue metadata cannot override trusted context |
| File URL, cache key, or search result is reused across tenants | Access remains scoped to the authorized tenant |

Run these checks through actual deployed roles and routes, including API endpoints, internal admin tools, import/export, search, and workers. OWASP recommends testing with multiple accounts and manipulating object references across read, create, update, delete, export, and administrative actions. Record expected behavior before the test and preserve the cases as regression checks; see [security review for an AI-built app](/wiki/secure-an-ai-built-app/).

Treat any cross-tenant result as a security incident: restrict the affected path, determine what data and tenants were exposed, preserve relevant logs without copying private content unnecessarily, correct the boundary at all affected layers, and review whether notification or legal duties apply in the relevant jurisdiction. Do not assume a database fix also repaired cached, exported, or previously issued file access.
