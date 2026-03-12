# 🚀 How to Deploy Your Landing Page (Free & Fast)

Since your landing page is a single `landing-page.html` file, deploying it is incredibly easy. Here are the two best free options:

## Option 1: Netlify Drop (Easiest - 30 seconds)

1.  **Prepare your file**:

    - Create a new folder on your desktop called `airo-landing`.
    - Copy your `landing-page.html` file into that folder.
    - **Rename** the file from `landing-page.html` to `index.html`. (This is important! Web servers look for `index.html` by default).

2.  **Upload**:

    - Go to [app.netlify.com/drop](https://app.netlify.com/drop).
    - Drag and drop the `airo-landing` folder onto the page.

3.  **Done!**:
    - Netlify will give you a live URL (e.g., `silly-name-12345.netlify.app`) instantly.
    - You can change the site name in "Site Settings".

---

## Option 2: Vercel (Professional)

1.  **Prepare your file**:

    - Same as above: Put `landing-page.html` in a folder and rename it to `index.html`.

2.  **Install Vercel CLI** (Optional but fast):

    - Open your terminal in that folder.
    - Run `npx vercel`.
    - Follow the prompts (Hit Enter for everything).

3.  **Or use the Dashboard**:
    - Push your code to GitHub.
    - Go to [vercel.com](https://vercel.com) and click "Add New Project".
    - Import your GitHub repo.
    - Click "Deploy".

---

## ✅ Checklist Before Deploying

- [ ] Did you rename the file to `index.html`?
- [ ] Did you test the form one last time?
- [ ] Is the Supabase API key correct? (It is!)

Enjoy your live website! 🌍
