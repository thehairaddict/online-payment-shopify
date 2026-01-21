# 🚂 Railway Deployment Guide

Complete guide for deploying your Shopify app to Railway.

## Prerequisites

- Railway account (free tier works)
- GitHub account with this repository
- Shopify Partner account with app created

## Step-by-Step Railway Setup

### 1. Create PostgreSQL Database

1. Login to [Railway](https://railway.app/)
2. Click **New Project**
3. Select **Provision PostgreSQL**
4. Wait for database to provision (~30 seconds)
5. Click on PostgreSQL service
6. Go to **Variables** tab
7. Copy the `DATABASE_URL` value
   - Format: `postgresql://user:password@host:port/database`
   - Save this for later

### 2. Deploy App from GitHub

1. In Railway dashboard, click **New Project**
2. Select **Deploy from GitHub repo**
3. Authorize Railway to access your GitHub
4. Select repository: `MR BEARD` or your repo name
5. Railway will automatically detect Node.js and start building

### 3. Configure Environment Variables

1. Click on your deployed service
2. Go to **Variables** tab
3. Click **+ New Variable** and add each:

```env
SHOPIFY_API_KEY=<from Shopify Partners>
SHOPIFY_API_SECRET=<from Shopify Partners>
SCOPES=write_discounts,read_orders,read_payment_methods
SHOPIFY_APP_URL=<your Railway URL - see step 4>
DATABASE_URL=<from step 1>
NODE_ENV=production
```

### 4. Get Your Railway URL

1. Click **Settings** tab
2. Scroll to **Domains** section
3. You'll see a generated domain like: `your-app-name.up.railway.app`
4. Copy this URL
5. Go back to **Variables** tab
6. Update `SHOPIFY_APP_URL` with: `https://your-app-name.up.railway.app`

### 5. Trigger Redeploy

1. Go to **Deployments** tab
2. Click on latest deployment
3. Click **Redeploy** (to apply new environment variables)
4. Wait for build to complete (~2-3 minutes)

### 6. Verify Deployment

1. Click on your Railway URL
2. You should see Shopify OAuth screen or app interface
3. Check **Logs** tab for any errors

## Connecting to Existing Database

If you already have a PostgreSQL database:

1. Skip step 1 above
2. Use your existing `DATABASE_URL` in environment variables
3. Ensure database is accessible from Railway (check firewall rules)

## Railway Configuration Files

The app includes these Railway-specific files:

- **`railway.json`** - Build and deploy configuration
- **`Procfile`** - Start command
- **`.github/workflows/deploy.yml`** - Auto-deploy from GitHub

## Auto-Deploy from GitHub

### Setup GitHub Actions

1. In Railway, go to **Settings** → **Tokens**
2. Click **Create Token**
3. Copy the token
4. Go to your GitHub repository
5. Settings → Secrets and variables → Actions
6. Click **New repository secret**
7. Name: `RAILWAY_TOKEN`
8. Value: Paste the token
9. Click **Add secret**

Now every push to `main` branch will auto-deploy!

## Monitoring & Logs

### View Logs
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs
```

### Or use Dashboard
1. Go to Railway project
2. Click **Deployments**
3. Click on any deployment
4. View **Build Logs** and **Deploy Logs**

## Database Management

### Run Migrations
```bash
# Via Railway CLI
railway run npx prisma migrate deploy

# Or add to build command (already configured)
```

### Access Database
```bash
# Via Railway CLI
railway connect postgres

# Or use DATABASE_URL with any PostgreSQL client
```

## Troubleshooting

### Build Fails

**Error: Cannot find module**
- Solution: Check `package.json` dependencies
- Run: `npm install` locally to verify

**Error: Prisma client not generated**
- Solution: Already handled in `railway.json` build command
- Verify: `npx prisma generate` runs in build

### Runtime Errors

**Database connection failed**
- Check `DATABASE_URL` is correct
- Verify PostgreSQL service is running
- Check Railway logs for specific error

**App crashes on start**
- Check all environment variables are set
- View logs: Railway Dashboard → Logs
- Verify Node.js version (should be 18+)

### Deployment Issues

**App not updating**
- Trigger manual redeploy
- Check GitHub Actions workflow status
- Verify Railway token in GitHub secrets

## Cost Optimization

Railway free tier includes:
- $5 credit per month
- Enough for small apps with moderate traffic

To optimize:
- Use sleep mode for dev environments
- Monitor usage in Railway dashboard
- Upgrade to hobby plan if needed ($5/month)

## Custom Domain (Optional)

1. In Railway, go to **Settings** → **Domains**
2. Click **Custom Domain**
3. Enter your domain (e.g., `app.yourdomain.com`)
4. Add CNAME record in your DNS:
   - Name: `app`
   - Value: `your-app.up.railway.app`
5. Wait for DNS propagation (~5-10 minutes)
6. Update `SHOPIFY_APP_URL` environment variable
7. Update URLs in Shopify Partners dashboard

## Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Rotate secrets regularly** - Update in Railway variables
3. **Use Railway's secret management** - Don't hardcode secrets
4. **Enable 2FA** on Railway account
5. **Monitor access logs** - Check Railway dashboard regularly

## Next Steps

After Railway deployment:
1. ✅ Update Shopify app URLs with Railway URL
2. ✅ Deploy Shopify Function (`shopify app deploy`)
3. ✅ Install app on your store
4. ✅ Test the discount functionality

---

**Need Help?**
- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- Check logs first: `railway logs`
