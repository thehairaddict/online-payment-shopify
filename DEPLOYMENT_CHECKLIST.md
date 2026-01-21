# 🚀 Deployment Checklist

Follow this checklist to deploy your Payment Gateway Discount app.

## ✅ Pre-Deployment

- [ ] Shopify Partner account created
- [ ] Railway account created
- [ ] GitHub account ready
- [ ] Rust installed (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)
- [ ] Shopify CLI installed (`npm install -g @shopify/cli`)

## ✅ Shopify App Setup

- [ ] Created new app in Shopify Partners
- [ ] Copied API Key
- [ ] Copied API Secret
- [ ] Set app name: "Payment Gateway Discount"

## ✅ Railway Setup

- [ ] Created new Railway project
- [ ] Provisioned PostgreSQL database
- [ ] Copied DATABASE_URL
- [ ] Connected GitHub repository
- [ ] Added environment variables:
  - [ ] `SHOPIFY_API_KEY`
  - [ ] `SHOPIFY_API_SECRET`
  - [ ] `SCOPES=write_discounts,read_orders,read_payment_methods`
  - [ ] `SHOPIFY_APP_URL`
  - [ ] `DATABASE_URL`
  - [ ] `NODE_ENV=production`
- [ ] Copied Railway app URL
- [ ] Verified deployment successful

## ✅ Update Shopify App URLs

- [ ] Updated App URL in Shopify Partners
- [ ] Updated Allowed redirection URLs
- [ ] Added `/auth/callback` to redirect URLs

## ✅ Update Configuration Files

- [ ] Updated `shopify.app.toml` with:
  - [ ] `client_id` (API Key)
  - [ ] `application_url` (Railway URL)
  - [ ] `dev_store_url` (your store URL)

## ✅ Deploy Shopify Function

- [ ] Installed Rust wasm32-wasi target: `rustup target add wasm32-wasi`
- [ ] Ran `npm install`
- [ ] Ran `shopify app deploy`
- [ ] Selected your app
- [ ] Function deployed successfully
- [ ] Copied Function ID

## ✅ Install & Test

- [ ] Installed app on test store
- [ ] Granted permissions
- [ ] Opened app in Shopify admin
- [ ] Clicked "Activate Discount"
- [ ] Tested with online payment (discount applied ✓)
- [ ] Tested with cash on delivery (no discount ✓)

## ✅ GitHub Actions (Optional)

- [ ] Created Railway token
- [ ] Added `RAILWAY_TOKEN` to GitHub secrets
- [ ] Pushed to main branch
- [ ] Verified auto-deployment works

## ✅ Production Ready

- [ ] All tests passed
- [ ] Discount working correctly
- [ ] Railway app running stable
- [ ] Database connected
- [ ] Monitoring setup (Railway dashboard)

## 📝 Important URLs to Save

```
Shopify App URL: https://partners.shopify.com/[YOUR_ORG]/apps/[APP_ID]
Railway Project: https://railway.app/project/[PROJECT_ID]
Live App URL: https://[YOUR_APP].up.railway.app
Store Admin: https://[YOUR_STORE].myshopify.com/admin
```

## 🎉 You're Done!

Your payment gateway discount app is now live and automatically applying 50% discounts to online payment orders!
