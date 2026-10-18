# Maintaining IndieWiki

Everything here is done on github.com in a browser. No terminal needed.

---

## 1. First-time setup (about 30 minutes)

### 1.1 Create the repository

1. On GitHub, click **+** (top right) → **New repository**.
2. Name: `indiewiki`. Visibility: **Public** (free GitHub accounts can only publish Pages from public repositories).
3. Leave "Add a README", ".gitignore" and "license" **unticked**. Click **Create repository**.

### 1.2 Upload the files in two batches

GitHub's website accepts at most 100 files per upload, and this project has a little more. Unzip the delivery zip on your computer first.

> **Mac users:** folders starting with a dot (`.github`) are hidden in Finder. Press **Cmd + Shift + .** in the Finder window to show them.
> **Windows users:** they show normally.

**Batch 1: the content.**
1. On the empty repository page, click **uploading an existing file**.
2. Drag the folders **`content`** and **`data`** from the unzipped folder onto the page.
3. Wait until every file is listed, write the message `Add content`, and click **Commit changes**.

**Before batch 2, turn on Pages:**
4. **Settings** → **Pages** (left menu) → under **Build and deployment**, set **Source** to **GitHub Actions**.

**Batch 2: everything else.**
5. Go back to the **Code** tab → **Add file** → **Upload files**.
6. Drag in all remaining items: the folders `.github`, `docs`, `src`, `static`, `test`, and the files `.editorconfig`, `.gitignore`, `.nvmrc`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `LICENSE`, `LICENSE-CONTENT.md`, `package.json`, `package-lock.json`, `README.md`, `SECURITY.md`.
7. Message `Add site engine`, then **Commit changes**.

### 1.3 Watch the first build

1. Open the **Actions** tab. A run called **Build and publish** starts by itself.
2. After two to four minutes both jobs show a green tick. The **deploy** job shows the address, for example `https://your-username.github.io/indiewiki/`.
3. Open it. The site should load fully, with search working.

If a run fails, open it and read the red step. The most common cause is that Pages was not set to **GitHub Actions** (step 4). Fix it, then on the failed run click **Re-run all jobs**.

### 1.4 Connect indie.pi3.in

1. **At your DNS provider for pi3.in**, add a record:
   - Type: **CNAME**
   - Host / Name: **indie**
   - Value / Target: **your-github-username.github.io** (your username, not the repository name)
2. **On GitHub**: **Settings** → **Pages** → **Custom domain** → type `indie.pi3.in` → **Save**. Wait for the DNS check to pass (a few minutes to an hour).
3. Tick **Enforce HTTPS** when it becomes available (the certificate can take up to an hour).
4. **Rebuild once** so every link uses the new address: **Actions** → **Build and publish** → **Run workflow** → **Run workflow**.
5. Recommended: verify the domain so nobody else can claim a subdomain of `pi3.in` on GitHub. Your profile picture → **Settings** → **Pages** → **Add a domain** → `pi3.in`, then add the TXT record GitHub shows at your DNS provider and click **Verify**.

### 1.5 Contact email

The site shows `indie@pi3.in` (assembled by JavaScript so bots cannot harvest it). Create that address or a forward to your inbox. To use a different address, edit `email:` in `data/site.yml`.

### 1.6 Safety settings (5 minutes)

In **Settings**:
- **Security / Advanced Security**: turn on **Dependabot alerts**, **Dependabot security updates**, **Secret scanning** with **Push protection**, and **Private vulnerability reporting**.
- **Rules → Rulesets → New branch ruleset** for `main`: tick **Require a pull request before merging** and **Require status checks to pass** (add the check named **check**). Add **Repository admin** to the **Bypass list** so you can still edit directly.
- **General → Features**: keep **Issues** on. Optionally turn on **Discussions** for community questions.

Optional: create the labels `correction`, `tool suggestion` and `guide request` under **Issues → Labels** so the contribution forms tag issues automatically.

### 1.7 Search engines

1. In [Google Search Console](https://search.google.com/search-console), add a **Domain** property for `indie.pi3.in`, add the TXT record it gives you at your DNS provider, and verify.
2. Submit the sitemap: `sitemap.xml`.
3. In [Bing Webmaster Tools](https://www.bing.com/webmasters), import the property from Google Search Console.

---

## 2. Everyday work

### Reviewing a contribution (pull request)

1. Open **Pull requests** and pick one.
2. The **Checks** at the bottom must be green. Red means the contributor must fix something; the log explains what.
3. Open **Files changed**. Check: facts are linked to official sources, dates were updated, the writing is plain and original, any company connection is disclosed.
4. To suggest a wording change, click a line, then the **±** icon, and type the suggestion.
5. When happy: **Merge pull request** → **Confirm merge**. The site updates in a few minutes.

### Editing yourself

Open the page on the live site and click **Edit this page**, or open the file in the **Code** tab and click the pencil. Commit to `main` (or create a branch to run the checks first). If the build fails, the **Actions** tab shows a red run with the list of problems; fix them in the same file.

### Handling issues

- **Report a problem**: check the source, fix the page (update `updated:`), and close the issue with a thank-you.
- **Suggest a tool**: check it against the rules in `CONTRIBUTING.md`, add it to `data/tools/<category>.yml` with `checked:` set to this month, or explain why not.
- **Request a guide**: label it and leave it open for contributors, or write it.

---

## 3. Keeping facts fresh

- Each build log ends with **"Due for a fact check"**: tools checked six or more months ago and pages reviewed a year or more ago. Open the latest **Build and publish** run in **Actions** to see it.
- Once a quarter, work through that list: open each tool's pricing page, update the entry and its `checked:` month.
- **Broken outside links**: on the 1st of each month, the **Check outside links** workflow tests every link to other websites. If any fail, it opens (or updates) an issue called **Broken links found** listing them. Open each link in your browser: if it is really gone, search the repository for the address (press **/** on the **Code** tab) and fix it; if it opens fine, that site just blocks robots and you can ignore it. You can also run it any time: **Actions** → **Check outside links** → **Run workflow**.
- Watch for big changes in the indie world (a provider changing free plans, app store rule changes, new privacy laws) and update the affected pages first.
- **Dependabot** opens a monthly pull request for software updates. If its checks are green, merge it.
- The site rebuilds every Monday by itself, which also renews the expiry date in `security.txt`.

---

## 4. Adding things

- **A new page**: in the **Code** tab, open the stage folder (for example `content/ship/`), **Add file** → **Create new file**, name it `my-new-page.md`, and copy the front matter from a similar page. See `CONTRIBUTING.md`.
- **A new Toolbox category**: create `data/tools/<category-id>.yml` by copying an existing one; set `id` to the file name and `stage` to the stage number it belongs to.
- **A glossary term**: add an entry to `data/glossary.yml`.
- **Home page search suggestions** and the site name, tagline and email: `data/site.yml`.
- **Sharing images** are made automatically for every page when the site builds (1200 by 630 pixels, showing the page title and its stage), so there is nothing to design for a new page. The home page uses the hand-made `static/img/og-default.png`.

---

## 5. Things GitHub Pages cannot do (and what to do later)

- **HTTP security headers** (HSTS, frame protection, nosniff): GitHub Pages does not allow custom headers. The site already uses a strict Content-Security-Policy and referrer policy via meta tags. To add the rest, put Cloudflare in front of the domain and add a response-header Transform Rule; the steps are in the wiki page `/ship/security-headers/`.
- **Commercial use**: GitHub Pages is free for this non-commercial wiki. If IndieWiki ever sells products or runs ads, move hosting to Cloudflare Pages (the same build works there).
