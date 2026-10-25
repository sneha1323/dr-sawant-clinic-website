# 📋 Deployment Checklist for drvaishnavisawanthomeopathy.in

## Before Deployment
- [x] Production build created (`npm run build`) ✅
- [x] .htaccess file added for routing ✅
- [x] All images using local paths ✅
- [x] Environment config created ✅

## Frontend Deployment (Hostinger)
- [ ] Login to Hostinger
- [ ] Access File Manager
- [ ] Navigate to public_html
- [ ] Delete existing files
- [ ] Upload all files from `frontend/build` folder
- [ ] Set folder permissions to 755
- [ ] Test website: https://drvaishnavisawanthomeopathy.in

## Backend Deployment (Render.com)
- [ ] Create Render.com account (free)
- [ ] Create new Web Service
- [ ] Upload backend folder
- [ ] Set build command: `pip install -r requirements.txt`
- [ ] Set start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] Deploy and wait for build
- [ ] Copy backend URL (e.g., https://xyz.onrender.com)

## Connect Frontend to Backend
- [ ] Update `.env.production` with backend URL
- [ ] Rebuild frontend: `npm run build`
- [ ] Re-upload build folder to Hostinger
- [ ] Test appointment booking functionality

## Final Testing
- [ ] Website loads on domain
- [ ] All 4 departments display correctly
- [ ] All images load properly
- [ ] WhatsApp booking works
- [ ] Phone numbers clickable
- [ ] Google Reviews link works
- [ ] Instagram link works
- [ ] All navigation works
- [ ] Mobile responsive (test on phone)

## Post-Deployment
- [ ] Clear browser cache
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Share with doctor for approval
- [ ] Monitor for any issues

---

## Files Locations

**Production Build**: `d:\sawant\app\frontend\build`
**Backend Files**: `d:\sawant\app\backend`

**Upload to Hostinger**: Everything inside `build` folder → `public_html`

---

## When You Get Hostinger Login:

Just say "I have login" and I'll guide you through each step! 🚀
