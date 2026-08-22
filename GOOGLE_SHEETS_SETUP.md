# Connect orders to Google Sheets

Sheet: https://docs.google.com/spreadsheets/d/1xakbFslkwt3yEgC3s2nVvnCGXjR3Osj7yQu6kLosrF4/edit?gid=0#gid=0

The site is static (no server), so orders reach the Sheet via a free Google Apps Script
"Web App" attached directly to that Sheet. Nothing to host, nothing to pay for.

## One-time setup (do this in your Google account)

1. Open the Sheet above, then **Extensions → Apps Script**.
2. Delete any starter code in `Code.gs`, then paste the contents of
   `google-apps-script.gs` (in this repo) in its place.
3. Click **Deploy → New deployment**.
4. Click the gear icon next to "Select type" → choose **Web app**.
5. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize the permissions Google asks for (it's your own script,
   accessing your own sheet).
7. Copy the **Web app URL** it gives you (ends in `/exec`).
8. Send me that URL, or paste it yourself into `assets/js/script.js` — replace the
   placeholder:
   ```
   const SHEETS_WEBHOOK_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```

That's it. Every order submitted on the site will now also append a row to an
"Orders" tab in that Sheet (Timestamp, Name, Phone, Address, City, State, PIN,
Quantity, Landmark) — in addition to the existing WhatsApp message, which still
fires the same way as before.

## Notes

- If you ever need to redeploy the script (edit the code later), use
  **Deploy → Manage deployments → Edit → New version**, otherwise the live URL
  keeps running the old code.
- The site fires this in the background (`fetch` with `no-cors`) so it never blocks
  or breaks the WhatsApp/order flow even if the Sheet is temporarily unreachable.
