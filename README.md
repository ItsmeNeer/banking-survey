# What Keeps You With Your Bank?

Survey site for our DECA Finance Operations Research project. One question per screen, with real branching: business owners answer Q1 to Q22, everyone else answers Q1 and Q23 to Q29. Answers are saved to a Google Sheet through a small Apps Script.

## Files

- `index.html`: the page
- `assets/app.js`: every question, the branching, and the code that sends answers
- `assets/styles.css`: the design, light and dark
- `assets/config.js`: the Apps Script URL (`endpoint`) and an optional contact email
- `apps-script/Code.gs`: paste this into the responses sheet's Apps Script

## Connecting the response sheet

1. Open the **FOR Survey Responses** Google Sheet, then Extensions > Apps Script.
2. Delete what's there, paste in `apps-script/Code.gs`, and save.
3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Deploy.
4. Google warns the app isn't verified. Click Advanced, then Go to the project, then Allow.
5. Copy the Web app URL (it ends in `/exec`) into `endpoint` in `assets/config.js`.

Opening the `/exec` URL in a browser should show `{"ok":true,"status":"Survey endpoint is running"}`.

## Hosting

Cloudflare Pages, connected to this repo. Framework preset: None. Build command: empty. Output directory: `/`. Every push to `main` redeploys in a minute or two.

## Tracking where responses come from

Add `?s=` to the link to tag the channel, for example `?s=email`, `?s=chamber`, or `?s=qr`. It's saved in the Source column. Links without it are saved as `direct`.

## Sheet columns

Submitted at, Response ID, Path, Source, Seconds to complete, then one column per question (Q12 gets one column per row). Multi-select answers are separated by semicolons. Very short "Seconds to complete" values are worth checking before analysis.
