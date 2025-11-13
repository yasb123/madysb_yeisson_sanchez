# Security Review – madysb_yeisson_sanchez

## Summary
- Safe to publish if you **avoid committing env files** and **service credentials**.
- Firebase Web `apiKey` is **not a secret**; protect access with **Firestore rules**.

## What was added
- `.gitignore` to exclude `node_modules`, env files, logs, and IDE files.
- `.env.example` with placeholder values for Firebase variables.

## Before pushing to GitHub
1. Create `.env.local` (not committed) using `.env.example` as a template.
2. Update **Firestore Security Rules** (example read-only for products):
   ```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{doc} {
      allow read;
      allow write: if false;
    }
  }
}
   ```
3. Optionally **restrict the Web API key** by domain in Google Cloud Console once you deploy.
4. Never commit service account keys (Admin SDK) or private keys.
