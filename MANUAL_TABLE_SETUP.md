# 🛠️ How to Create the Table Manually (No Code!)

Yes! You can absolutely create the table by clicking buttons instead of using code. Here is exactly how to do it:

1.  Go to your **Supabase Dashboard**.
2.  Click on **Table Editor** (the icon that looks like a spreadsheet/table on the left sidebar).
3.  Click the big green **"New Table"** button.

### Fill in these details:

- **Name**: `waitlist`
- **Description**: (Leave empty)
- **Enable Row Level Security (RLS)**: ✅ **Check this box** (Important!)

### Add these Columns:

You will see a list of columns. Add these one by one:

1.  **id** (Already there) -> Keep as `int8` or `bigint`, Primary Key.
2.  **created_at** (Already there) -> Keep as `timestamptz`.
3.  Click **"Add Column"**:
    - **Name**: `name`
    - **Type**: `text`
    - **Default Value**: `NULL` (unchecked)
4.  Click **"Add Column"**:
    - **Name**: `email`
    - **Type**: `text`
    - **Default Value**: `NULL` (unchecked)
5.  Click **"Add Column"**:
    - **Name**: `interest`
    - **Type**: `text`
    - **Default Value**: `NULL` (unchecked)

### Click "Save"

---

## ⚠️ CRITICAL STEP: Permissions (RLS Policies)

Since you checked "Enable RLS", **nobody can write to the table yet**. You must add a rule to let people sign up.

1.  In the Table Editor, look at the top bar for **"RLS Policies"** (or go to Authentication > Policies).
2.  Find your `waitlist` table.
3.  Click **"New Policy"**.
4.  Choose **"For full customization"**.
5.  **Policy Name**: "Allow public insert"
6.  **Allowed Operation**: Select **INSERT**.
7.  **Target roles**: Select **anon** and **authenticated** (or just leave default).
8.  **WITH CHECK expression**: Type `true`
9.  Click **"Review"** then **"Save"**.

**That's it!** Now your form will work.
