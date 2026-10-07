---
title: "Handle file uploads as untrusted input"
description: "A safe upload flow for size and type limits, private object storage, authorization, download links, quotas, and deletion."
slug: file-uploads-and-storage
category: build
kind: article
tags: [file-storage, security, privacy]
audience: [independent builders, solo founders, small teams]
status: published
evidence: primary
confidence: moderate
lastVerified: 2026-10-07
related: [build, quality]
featured: false
seedSources: []
sources:
  - title: "File Upload Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
---

## Decide whether the product needs uploads

Uploads create storage cost, abuse paths, moderation work, and deletion obligations. Before adding them, write down which user job requires a file, allowed formats, maximum size, who can view it, how long it remains, and what happens when its owner is removed. If a link to an existing document solves the first use case, defer the upload system.

## Validate before making a file available

Treat filename, extension, declared MIME type, and file bytes as untrusted. Enforce a small allowlist of formats and a size limit at the server or storage boundary, not only in the browser. Check the detected content type where possible; an attacker can rename executable content to look like an image. Generate your own opaque storage key instead of using the supplied filename as a path. Normalize display names separately and escape them whenever rendered.

For image or document processing, use a maintained parser and consider malware scanning for the risk profile. Set limits on dimensions, decompression, and processing time; a small compressed file can expand into a huge workload. Store original files outside the web root or in a private object bucket. Serve user uploads from a separate origin when feasible so they cannot inherit application cookies or execute with the app’s privileges.

## Authorize both upload and download

Check that the user may add a file to the target record and that the record belongs to their account or workspace. Repeat the check on download; an unguessable URL is not a substitute for authorization. For private files, issue short-lived signed download links after a server-side permission check. Avoid public buckets for content users expect to be private.

Keep a database record connecting the opaque object key to its owner, parent record, size, detected type, and creation time. Enforce per-file and per-account quotas. Protect upload endpoints against request floods, and set storage lifecycle rules for abandoned uploads. If large files are uploaded directly to object storage, issue narrowly scoped, short-lived upload permissions for one generated key and enforce the same limits in storage policy.

## Make deletion real and observable

Deleting a file should remove the object, metadata, and derived thumbnails or previews. If deletion is asynchronous, show a pending state and retry failures. Define how backups and legal holds affect deletion promises. Provide a retention rule for abandoned drafts and a process to remove an account’s files. Do not keep public CDN copies after deleting the source; use cache invalidation or short-lived URLs based on sensitivity.

## Test abuse cases

Try a file just above the limit, a misleading extension, a mismatched MIME type, a huge image dimension, an unauthorized object ID, an expired link, repeated upload requests, and deletion while a preview job is running. Confirm that errors reveal no other customer’s filenames or records. Log file IDs and outcomes for debugging, not the file contents or signed URLs.

For a first release, keep the system narrow: a few allowed file types, modest limits, private storage, clear ownership, and a tested delete path. Expand formats and sharing only when real users need them.
