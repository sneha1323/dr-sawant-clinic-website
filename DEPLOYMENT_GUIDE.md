# Deployment Guide - Dr. Vaishnavi Sawant Homeopathic Clinic Website

## ✅ Production Build Ready
Your production build is complete and located in: `frontend/build/`

---

## 🚀 Option 1: Deploy to Vercel (Recommended - FREE & Fast)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `dr-sawant-clinic-website`
3. Keep it **Private** or **Public** (your choice)
4. **DO NOT** initialize with README (we already have code)
5. Click "Create repository"

### Step 2: Push to GitHub
Run these commands in your terminal (replace YOUR_USERNAME):

```powershell
cd d:\sawant\app
git remote add origin https://github.com/YOUR_USERNAME/dr-sawant-clinic-website.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/signup
2. Sign up with **GitHub** (easiest)
3. Click "Add New Project"
4. Import your `dr-sawant-clinic-website` repository
5. **Configure Project:**
   - Framework Preset: **Create React App**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Click **Deploy**

### Step 4: Connect Hostinger Domain
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add domain: `drvaishnavisawanthomeopathy.in`
4. Vercel will show DNS records

5. In Hostinger DNS settings, add:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

6. Wait 10-60 minutes for DNS propagation
7. ✅ Your site will be live at drvaishnavisawanthomeopathy.in

---

## 🌐 Option 2: Deploy to Hostinger Directly

### Step 1: Upload Build Files
1. Login to Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. **Delete all existing files** in public_html
5. Upload everything from `d:\sawant\app\frontend\build\` folder
6. Make sure `.htaccess` file is included (for routing)

### Step 2: Verify
- Your site should be live at drvaishnavisawanthomeopathy.in
- Test all pages and navigation

---

## 📊 Backend (Optional - Only if using contact forms)

### If Backend is Needed:
1. Deploy backend to **Render.com** (FREE):
   - Go to https://render.com/
   - Create new **Web Service**
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python server.py`
   
2. Update `frontend/src/config.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend.onrender.com';
   ```

3. Rebuild and redeploy frontend

---

## 🔧 Environment Variables (For Backend if used)

If deploying backend, set these in Render.com:
- `SMTP_HOST` = your email SMTP server
- `SMTP_PORT` = 587
- `SMTP_USER` = your email
- `SMTP_PASSWORD` = your email password
- `ADMIN_EMAIL` = clinic email for receiving inquiries

---

## 📱 Post-Deployment Checklist

After deployment, test:
- ✅ Homepage loads correctly
- ✅ All images display (no broken images)
- ✅ Mobile responsive navigation works
- ✅ "Call Now" and "WhatsApp" buttons work
- ✅ Google Maps links work for both branches
- ✅ All 16 reviews display correctly
- ✅ Services section loads all treatments
- ✅ Doctor profiles show all qualifications
- ✅ Smooth scrolling to sections works

---

## 🎯 Quick Deploy Commands

### If you want to deploy updates later:

```powershell
cd d:\sawant\app\frontend
npm run build
git add .
git commit -m "Update website"
git push
```

Vercel will **automatically redeploy** on every git push!

---

## 🆘 Troubleshooting

### "Page not found" on refresh
- Make sure `.htaccess` file is in public_html (for Hostinger)
- Vercel handles this automatically

### Images not loading
- Check image paths in App.js use `/image.jpg` format
- Verify all images exist in `frontend/public/` folder

### Site not updating
- Clear browser cache (Ctrl + Shift + R)
- Wait a few minutes for CDN to update

---

## 📞 Support

If you need help:
- Vercel: https://vercel.com/docs
- Hostinger: https://www.hostinger.com/tutorials/
- React Deployment: https://create-react-app.dev/docs/deployment/

---

**Your website is production-ready! Choose Option 1 (Vercel) for the easiest deployment.** 🚀
