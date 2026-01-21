# ⚡ Quick Start Guide

Get your app running in 15 minutes!

## 1️⃣ Create Shopify App (3 min)

1. Go to https://partners.shopify.com/
2. Apps → Create app → Custom app
3. Name: "Payment Gateway Discount"
4. Save **API Key** and **API Secret**

## 2️⃣ Setup Railway (5 min)

1. Go to https://railway.app/
2. New Project → Provision PostgreSQL
3. Copy **DATABASE_URL**
4. New Project → Deploy from GitHub repo
5. Select this repository
6. Add environment variables in Railway:

```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SCOPES=write_discounts,read_orders,read_payment_methods
SHOPIFY_APP_URL=https://your-app.up.railway.app
DATABASE_URL=postgresql://...
NODE_ENV=production
```

7. Copy your Railway URL from Settings → Domains

## 3️⃣ Update Shopify URLs (2 min)

1. Back to Shopify Partners → Edit your app
2. Update:
   - App URL: `https://your-railway-app.up.railway.app`
   - Redirect URLs: `https://your-railway-app.up.railway.app/auth/callback`

## 4️⃣ Update Config File (1 min)

Edit `shopify.app.toml`:

```toml
client_id = "YOUR_API_KEY"
application_url = "https://your-railway-app.up.railway.app"
dev_store_url = "your-store.myshopify.com"
```

## 5️⃣ Deploy Function (4 min)

```bash
# Install Rust (if needed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi

# Deploy
cd "/Users/mostafa/Desktop/Windsurf/MR BEARD"
npm install
shopify app deploy
```

## 6️⃣ Install & Activate

1. Shopify Partners → Test on development store
2. Install app
3. Open app in admin
4. Click "Activate Discount"

## ✅ Done!

Test it:
- Add products to cart
- Go to checkout
- Select online payment → See 50% discount! 🎉

---

**Need help?** Check `README.md` for detailed instructions.
