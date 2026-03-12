# 🚀 Complete Supabase Setup Guide for Airo Waitlist

Follow these steps **exactly** to get your waitlist working!

---

## ✅ STEP 1: Get Your API Key

### 1.1 Go to your Supabase Dashboard

- Open this link in your browser: https://supabase.com/dashboard/project/jxqmblmpenzkgxizoasa

### 1.2 Find the API Settings

1. Look at the **left sidebar** (the menu on the left side)
2. Scroll down and click on the **⚙️ Settings** icon (looks like a gear)
3. In the Settings menu that appears, click on **API**

### 1.3 Copy Your API Key

1. You'll see a section called **Project API keys**
2. Find the key labeled **`anon` `public`** (NOT the `service_role` one!)
3. Click the **copy icon** 📋 next to the key
4. It should look something like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long)

### 1.4 Add the Key to Your HTML File

1. Open `landing-page.html` in your code editor
2. Press `Ctrl + F` (or `Cmd + F` on Mac) to search
3. Search for: `YOUR_ANON_KEY_HERE`
4. Replace it with the key you copied (keep the quotes!)

**Before:**

```javascript
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY_HERE";
```

**After:**

```javascript
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Your actual key
```

5. **Save the file** (`Ctrl + S` or `Cmd + S`)

---

## ✅ STEP 2: Create the Database Table

### 2.1 Open SQL Editor

1. Go back to your Supabase dashboard
2. Look at the **left sidebar** again
3. Click on **🗄️ SQL Editor** (looks like a database icon)

### 2.2 Create a New Query

1. You'll see a button that says **+ New query** at the top
2. Click it
3. A blank text editor will appear

### 2.3 Copy and Paste the SQL Code

1. **Copy ALL of this code** (click the copy button below):

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  interest TEXT,
  wants_updates BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reading count (for waitlist counter)
CREATE POLICY "Anyone can read count"
  ON waitlist
  FOR SELECT
  TO anon
  USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
```

2. **Paste it** into the SQL Editor (the blank text box)
3. Click the **▶️ Run** button (green button at the bottom right)
4. You should see "Success. No rows returned" - **this is good!**

### 2.4 Verify the Table Was Created

1. In the left sidebar, click on **📊 Table Editor**
2. You should now see a table called **waitlist**
3. Click on it to see the columns (name, email, interest, etc.)

---

## ✅ STEP 3: Test Your Waitlist

1. Open `landing-page.html` in your web browser (double-click the file)
2. Fill out the form with:
   - Your name
   - Your email
   - (Optional) What interests you
3. Click **"Join the Waitlist"**
4. You should see a success message! 🎉

### Verify It Worked

1. Go back to Supabase dashboard
2. Click **📊 Table Editor** → **waitlist**
3. You should see your entry in the table!

---

## 🐛 Troubleshooting

### "Invalid API key" Error

- ✅ Make sure you copied the **`anon`** key, NOT the `service_role` key
- ✅ Make sure you didn't accidentally copy extra spaces
- ✅ Make sure the key is inside the quotes: `'your-key-here'`
- ✅ Save the HTML file after making changes

### "Table does not exist" Error

- ✅ Make sure you ran the SQL code in Step 2
- ✅ Check that the table appears in Table Editor
- ✅ Try refreshing your browser

### Form Doesn't Submit

- ✅ Open browser console (F12) and check for errors
- ✅ Make sure you're connected to the internet
- ✅ Try a different browser

---

## 📧 Need More Help?

If you're still stuck:

1. Take a screenshot of the error message
2. Check the browser console (press F12, click "Console" tab)
3. Look for red error messages and share them

**Supabase Resources:**

- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
