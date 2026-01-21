# Payment Gateway Discount - Shopify App

This Shopify app automatically applies a **50% discount** when customers select online payment methods (excluding cash on delivery).

## 🚀 Features

- ✅ Automatic 50% discount on online payments
- ✅ Excludes cash on delivery orders
- ✅ Works with Shopify Grow plan
- ✅ No checkout editing required
- ✅ Deployed on Railway with PostgreSQL

## 📋 Prerequisites

1. **Shopify Partner Account** - [Create one here](https://partners.shopify.com/)
2. **Railway Account** - [Sign up here](https://railway.app/)
3. **GitHub Account** - For version control and deployment
4. **Rust** (for building Shopify Functions) - [Install Rust](https://rustup.rs/)

## 🛠️ Setup Instructions

### Step 1: Create Shopify App

1. Go to [Shopify Partners Dashboard](https://partners.shopify.com/)
2. Click **Apps** → **Create app**
3. Choose **Custom app** or **Public app**
4. Fill in app details:
   - **App name**: Payment Gateway Discount
   - **App URL**: `https://your-railway-app.up.railway.app` (get this after Railway setup)
   - **Allowed redirection URL(s)**: `https://your-railway-app.up.railway.app/auth/callback`

5. Copy your **API Key** and **API Secret**

### Step 2: Setup Railway Database

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **New Project** → **Provision PostgreSQL**
3. Copy the **DATABASE_URL** connection string
4. Keep this tab open for later

### Step 3: Deploy to Railway

1. **Push code to GitHub:**
   ```bash
   cd "/Users/mostafa/Desktop/Windsurf/MR BEARD"
   git init
   git add .
   git commit -m "Initial commit - Payment Gateway Discount App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Connect Railway to GitHub:**
   - In Railway, click **New Project** → **Deploy from GitHub repo**
   - Select your repository
   - Railway will auto-detect and deploy

3. **Add Environment Variables in Railway:**
   - Go to your Railway project
   - Click **Variables** tab
   - Add these variables:
     ```
     SHOPIFY_API_KEY=your_api_key_from_step1
     SHOPIFY_API_SECRET=your_api_secret_from_step1
     SCOPES=write_discounts,read_orders,read_payment_methods
     SHOPIFY_APP_URL=https://your-railway-app.up.railway.app
     DATABASE_URL=postgresql://... (from Step 2)
     NODE_ENV=production
     ```

4. **Get your Railway URL:**
   - Click **Settings** → **Domains**
   - Copy the generated URL (e.g., `your-app.up.railway.app`)
   - Update `SHOPIFY_APP_URL` variable with this URL

### Step 4: Update Shopify App URLs

1. Go back to Shopify Partners Dashboard
2. Edit your app
3. Update:
   - **App URL**: `https://your-railway-app.up.railway.app`
   - **Allowed redirection URL(s)**: `https://your-railway-app.up.railway.app/auth/callback`

### Step 5: Build and Deploy Shopify Function

1. **Install Rust** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   rustup target add wasm32-wasi
   ```

2. **Build the function:**
   ```bash
   cd "/Users/mostafa/Desktop/Windsurf/MR BEARD"
   npm install
   shopify app deploy
   ```

3. Follow the prompts to deploy the discount function

### Step 6: Install App on Your Store

1. In Shopify Partners, go to your app
2. Click **Test on development store** or **Select store**
3. Choose your store and install
4. Grant the requested permissions

### Step 7: Activate the Discount

1. Open the app in your Shopify admin
2. Click **Activate Discount** button
3. The 50% discount is now live!

## 🔧 Configuration

### Update shopify.app.toml

Edit `shopify.app.toml` with your details:

```toml
name = "payment-gateway-discount"
client_id = "YOUR_API_KEY"
application_url = "https://your-railway-app.up.railway.app"

[build]
dev_store_url = "your-store.myshopify.com"
```

## 📊 How It Works

1. **Customer adds items to cart**
2. **At checkout, selects payment method**
3. **Shopify Function checks payment type:**
   - If online payment (credit card, PayPal, etc.) → Apply 50% discount
   - If cash on delivery → No discount
4. **Discount automatically applied to order total**

## 🧪 Testing

1. Go to your store
2. Add products to cart
3. Proceed to checkout
4. Select an online payment method
5. Verify 50% discount is applied
6. Try with cash on delivery (no discount should apply)

## 🔄 GitHub Actions Auto-Deploy

The app includes GitHub Actions workflow for automatic deployment:

1. **Add Railway Token to GitHub:**
   - Get token from Railway: Settings → Tokens → Create Token
   - In GitHub repo: Settings → Secrets → New repository secret
   - Name: `RAILWAY_TOKEN`
   - Value: Your Railway token

2. **Auto-deploy on push:**
   - Every push to `main` branch triggers deployment
   - Railway automatically rebuilds and deploys

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SHOPIFY_API_KEY` | Your Shopify app API key | `abc123def456` |
| `SHOPIFY_API_SECRET` | Your Shopify app secret | `shpss_xyz789` |
| `SCOPES` | Required API scopes | `write_discounts,read_orders` |
| `SHOPIFY_APP_URL` | Your Railway app URL | `https://app.up.railway.app` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `NODE_ENV` | Environment mode | `production` |

## 🐛 Troubleshooting

### App won't install
- Verify all URLs in Shopify Partners match your Railway URL
- Check that redirect URLs include `/auth/callback`

### Discount not applying
- Ensure the function is deployed: `shopify app deploy`
- Check that discount is activated in the app dashboard
- Verify payment method is not cash on delivery

### Database connection errors
- Confirm `DATABASE_URL` is correct in Railway
- Run migrations: `npx prisma migrate deploy`

### Build failures
- Install Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- Add wasm target: `rustup target add wasm32-wasi`

## 📚 Additional Resources

- [Shopify Functions Documentation](https://shopify.dev/docs/api/functions)
- [Railway Documentation](https://docs.railway.app/)
- [Shopify App Development](https://shopify.dev/docs/apps)

## 🆘 Support

If you encounter issues:
1. Check Railway logs: `railway logs`
2. Check Shopify app logs in Partners Dashboard
3. Verify all environment variables are set correctly

## 📄 License

MIT License - Feel free to modify and use as needed.
