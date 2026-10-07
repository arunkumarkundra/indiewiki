---
title: "Separate authentication from authorization"
description: "Design login, sessions, and access checks as distinct responsibilities, with practical rules for protecting each resource and action."
slug: authentication-and-authorization
category: build
kind: article
tags: [authentication, authorization, security]
audience: [independent builders, solo founders, small teams]
status: published
evidence: primary
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [build, quality]
featured: false
seedSources: []
sources:
  - title: "OWASP Authentication Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
  - title: "OWASP Authorization Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
  - title: "OWASP Session Management Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
---

## Answer two different questions

Authentication answers “who is making this request?” Authorization answers “may that identity do this action on this object right now?” A successful login does not grant access to every account, project, or administrative action. Treating these as separate checks prevents a common class of bugs: a user changes an ID in a URL and sees another customer’s record.

For a small product, begin with a managed identity provider or a framework’s well-maintained authentication layer. Avoid inventing password storage, recovery flows, and session cryptography. If you handle passwords yourself, use a modern password hashing function recommended by current security guidance; never store plaintext or reversible passwords. Require verified recovery paths and make account recovery at least as carefully designed as login.

## Write an access matrix

List roles, resources, and actions before implementing checks. Example:

| Role | Read project | Edit project | Invite member | Change billing |
|---|---:|---:|---:|---:|
| Viewer | Yes | No | No | No |
| Editor | Yes | Yes | No | No |
| Owner | Yes | Yes | Yes | Yes |

Then add the object relationship. An editor may edit only projects in a workspace where they have an active editor membership. Role alone is insufficient; the request must be scoped to the correct tenant or owner. Centralize this policy in a small number of server-side functions such as `canEditProject(user, project)` rather than scattering assumptions through UI components.

## Enforce checks on every server request

Hide buttons for clarity, but never rely on the browser to enforce access. For every endpoint that reads or changes private data:

1. Resolve the authenticated identity from a trusted session or token.
2. Load the target object using an owner or tenant scope where possible.
3. Check the action against current membership and role.
4. Reject by default when identity, object, or policy is missing.
5. Avoid returning sensitive details in errors that reveal whether another user’s object exists.

Do this for list queries as well as individual records. A detail route can be protected while a search or export endpoint leaks the same data. Re-check permission for destructive and money-related actions at the time they execute; an old page being open is not proof that a role is still valid.

## Protect the session lifecycle

Use HTTPS in production. Configure session cookies as `Secure`, `HttpOnly`, and an appropriate `SameSite` policy. Rotate session identifiers after login and privilege changes. Expire sessions based on the sensitivity of the product, provide logout that actually invalidates the session, and offer a way to revoke other sessions after account recovery. Do not put long-lived secrets in local storage merely to simplify client code.

Add rate limits and monitoring to login, password reset, invitation, and verification flows. Responses should not disclose whether an email is registered. Keep recovery tokens short-lived, single-use, and tied to the intended account. For products with sensitive data, consider multi-factor authentication for owners and administrators.

## Test authorization like a feature

Create tests for each role and object boundary: anonymous user, wrong workspace, removed member, downgraded role, guessed identifier, and a permitted action. Try the same checks through UI, API, exports, and background jobs. Log denied actions without recording credentials or private payloads. See [privacy by default](/wiki/privacy-by-default/) and [secure an AI-built app](/wiki/secure-an-ai-built-app/) for related data-handling and review practices.
