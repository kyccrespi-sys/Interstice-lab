# Interstice Lab

The website for Interstice Lab — where branching fields reconnect.

---

## Put it online (about 20 minutes, no coding)

### 1. Upload this folder to GitHub

1. Unzip `interstice-lab.zip` on your computer.
2. Go to **github.com** → click **+** (top right) → **New repository**.
3. Name it `interstice-lab`, leave everything else as is, click **Create repository**.
4. On the next page, click the link **"uploading an existing file"**.
5. Open the unzipped `interstice-lab` folder, select **everything inside it** (not the folder itself), and drag it into the browser window.
6. Scroll down and click **Commit changes**. Wait for the upload to finish.

### 2. Publish with Vercel

1. Go to **vercel.com** → **Sign Up** → **Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find `interstice-lab` in the list and click **Import**.
4. Vercel detects Astro automatically. Click **Deploy**.
5. About a minute later you'll get a live address like `interstice-lab.vercel.app`. 🎉

### 3. Connect your domain (after you buy it)

1. In Vercel, open your project → **Settings → Domains**.
2. Type your domain (e.g. `intersticelab.com`) and click **Add**.
3. Vercel shows one or two records to copy into your domain registrar's DNS settings (Porkbun, Namecheap or Cloudflare). Paste them there.
4. It usually starts working within a few hours.
5. Open `astro.config.mjs` and change the `site:` address to your domain.

---

## Everyday editing

You can edit any file directly on github.com: open the file, click the **pencil icon**, make your change, and click **Commit changes**. Vercel republishes the site automatically within a minute.

### Change your name, season or newsletter

Edit **`src/data/site.ts`**. Everything is labelled.

**To switch on the newsletter:** create a free account at Buttondown or Beehiiv, find your "embed form" address, and paste it between the quotes after `newsletterAction:`.

### Publish a new framework

Every framework is one file in **`src/content/frameworks/`**.

- **To finish a forthcoming one:** open it (e.g. `pollinator-capital.md`), write the essay below the second `---` line, and change `status: "forthcoming"` to `status: "published"`.
- **To add a brand-new one:** copy `viable-doughnut.md`, rename it (lowercase, hyphens, e.g. `soil-as-infrastructure.md`; this becomes its web address), and change the details at the top.

The section between the two `---` lines holds the structured parts of the page (title, lineage, table, principles, sources). Below it, write the essay in plain text:

```
### I · SECTION LABEL
## A heading
A paragraph. *Italic words* use single asterisks.
```

Leave out any part you don't need (for example `threads` or `principles`) and that section simply won't appear.

### Edit the Doughnut figure text

The four stage captions live at the top of `src/components/DoughnutFigure.astro`.

---

## For developers

```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
```

Built with [Astro](https://astro.build). Static output; no server or database needed.
