# 🚀 Deploying with GitHub & Vercel (Recommended)

This is the most professional way to deploy. It gives you automatic updates whenever you change your code.

## Prerequisites

1.  **GitHub Account**: [Sign up here](https://github.com/)
2.  **Vercel Account**: [Sign up here](https://vercel.com/) (Login with GitHub)
3.  **Git Installed**: You likely already have this.

---

## Step 1: Prepare Your Code

1.  Create a new folder on your computer (e.g., `airo-landing-page`).
2.  Copy your `landing-page.html` file into this folder.
3.  **Rename** `landing-page.html` to `index.html`.

## Step 2: Push to GitHub

1.  Go to [GitHub.com](https://github.com) and click the **+** icon (top right) -> **New repository**.
2.  Name it `airo-landing`.
3.  Make it **Public** (or Private, Vercel works with both).
4.  Click **Create repository**.
5.  Follow the instructions to "upload an existing file" OR use the command line in your folder:

```bash
cd airo-landing-page
git init
git add index.html
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/HRI249/airo-landing.git
git push -u origin main
```

_(Replace `YOUR_USERNAME` with your actual GitHub username)_

## Step 3: Connect to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  You should see your `airo-landing` repository in the list (Import Git Repository).
4.  Click **"Import"**.
5.  **Project Name**: Leave as is or change it.
6.  **Framework Preset**: Select "Other" (since it's just HTML).
7.  Click **"Deploy"**.

## 🎉 Success!

Vercel will build your site in a few seconds and give you a live URL (e.g., `airo-landing.vercel.app`).

### Why is this better?

Now, whenever you edit `index.html` on your computer and push it to GitHub (`git push`), Vercel will **automatically** update your live website!

---

## 🔧 Troubleshooting: 404 NOT_FOUND Error

If you see a **404: NOT_FOUND** error on your deployed site, it means Vercel can't find your `index.html` file. Here's how to fix it:

### Solution 1: Add vercel.json Configuration

Create a `vercel.json` file in your project root with this content:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This tells Vercel to serve your `index.html` file for all routes.

### Solution 2: Verify File Structure

Make sure your repository structure looks like this:

```
airo-landing/
├── index.html
├── vercel.json
└── .gitignore
```

### After Making Changes

1. Commit and push your changes:

   ```bash
   git add .
   git commit -m "Fix 404 error with vercel.json"
   git push
   ```

2. Vercel will automatically redeploy your site.
3. Wait 30-60 seconds and refresh your browser.

Your site should now work! 🎉
