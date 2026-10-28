# 🔧 Google Reviews Setup Guide

## ✅ What Was Changed

### Files Modified:

1. **`backend/server.py`** - Added `/api/google-reviews` endpoint to fetch real reviews
2. **`frontend/src/App.js`** - Replaced fake hardcoded reviews with real Google reviews
3. **`frontend/src/config.js`** - Already has API_BASE_URL configuration

### What Was Removed:

- ❌ All 8 fake hardcoded reviews with fabricated patient names
- ❌ Fake categories and filtering
- ❌ Fabricated testimonials

### What Was Added:

- ✅ Real Google reviews from your official clinic listing
- ✅ Google Places API integration
- ✅ Proper attribution and links to original reviews
- ✅ "Read ALL Reviews on Google Maps" button
- ✅ Loading and error states
- ✅ Reviewer profile photos from Google
- ✅ Links to individual reviews on Google

---

## 🔑 Required: Google Places API Setup

To display real Google reviews, you MUST set up a Google Places API key:

### Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click "Create Project"
3. Name it: `dr-sawant-clinic-website`
4. Click "Create"

### Step 2: Enable Places API

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for: **"Places API"**
3. Click on "Places API"
4. Click "Enable"

### Step 3: Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "API Key"
3. Copy the API key (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### Step 4: Restrict API Key (IMPORTANT for Security)

1. Click "Edit API Key" (pencil icon)
2. Under "API restrictions":
   - Select "Restrict key"
   - Check ONLY "Places API"
3. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add these referrers:
     ```
     http://localhost:3000/*
     http://localhost:8000/*
     https://drvaishnavisawanthomeopathy.in/*
     https://*.vercel.app/*
     ```
4. Click "Save"

### Step 5: Set Up Billing (REQUIRED)

Google Places API requires billing to be enabled, BUT:
- ✅ **First $200/month is FREE**
- ✅ Your website will use ~0.01 requests per visitor
- ✅ Even with 10,000 visitors/month, cost is ~$0
- ⚠️ **You still need to add a credit card** (won't be charged unless you exceed free tier)

To enable billing:
1. Go to "Billing" in Google Cloud Console
2. Click "Link a billing account"
3. Add payment method
4. Enable billing for your project

---

## 🔐 Add API Key to Backend

### For Local Development:

Create `backend/.env` file:

```env
# Google Places API Key
GOOGLE_PLACES_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX

# MongoDB (optional)
MONGO_URL=mongodb://localhost:27017
DB_NAME=sawant_clinic_db

# CORS
CORS_ORIGINS=http://localhost:3000,https://drvaishnavisawanthomeopathy.in
```

### For Production (Render.com):

When deploying backend to Render:

1. Go to Render dashboard → Your Web Service
2. Click "Environment" tab
3. Add environment variable:
   - **Key**: `GOOGLE_PLACES_API_KEY`
   - **Value**: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX`
4. Click "Save Changes"
5. Service will auto-redeploy

---

## 🧪 Testing Locally

### 1. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

### 2. Start backend:

```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

### 3. Test API directly:

Open browser: http://localhost:8000/api/google-reviews

You should see JSON response with real reviews!

### 4. Start frontend:

```bash
cd frontend
npm start
```

### 5. View website:

Open: http://localhost:3000

Scroll to "Reviews" section - should show real Google reviews!

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend API returns real reviews: http://localhost:8000/api/google-reviews
- [ ] Frontend shows Google reviews (not fake ones)
- [ ] Each review shows:
  - [ ] Real reviewer name from Google
  - [ ] Real review text from Google
  - [ ] Correct star rating
  - [ ] Profile photo (if available)
  - [ ] "View on Google" link
  - [ ] Time posted (e.g., "2 months ago")
- [ ] "Read ALL Reviews on Google Maps" button links to: https://share.google/clOAttqXBirdkejWj
- [ ] Attribution text states: "Reviews retrieved from Google Places API"
- [ ] API note states: "Google returns a maximum of 5 reviews per request"

---

## 📊 What Google Returns

Google Places API returns:
- **Maximum 5 reviews** per request (Google limitation)
- **Most helpful/recent reviews** (Google's algorithm)
- **Original review text** (cannot be modified)
- **Reviewer name and photo**
- **Rating (1-5 stars)**
- **Time posted**
- **Link to review on Google**

If you have 50+ reviews, only 5 will show on your website. The button links to ALL reviews on Google Maps.

---

## 🔒 Security Notes

✅ **API Key is ONLY in backend** (never exposed to frontend)  
✅ **API key is restricted** to only Places API  
✅ **HTTP referrer restrictions** prevent unauthorized use  
✅ **Environment variables** keep secrets safe  
✅ **CORS configured** to only allow your domains  

❌ **NEVER commit `.env` file to Git**  
❌ **NEVER expose API key in frontend code**  
❌ **NEVER share API key publicly**  

---

## 🚨 Troubleshooting

### "Unable to load Google reviews"

1. Check backend logs for errors
2. Verify API key is set in `backend/.env`
3. Verify Places API is enabled in Google Cloud
4. Verify billing is enabled
5. Check API key restrictions aren't too strict

### "GOOGLE_PLACES_API_KEY not configured"

- API key not in `backend/.env` file
- Restart backend after adding `.env`

### "Google API returned: REQUEST_DENIED"

- Places API not enabled
- Billing not enabled
- API key restrictions too strict

### "Reviews not showing on website"

1. Check browser console for errors (F12)
2. Verify backend is running: http://localhost:8000/api/google-reviews
3. Check CORS settings in backend
4. Verify frontend `API_BASE_URL` in `frontend/src/config.js`

---

## 📝 Place ID Confirmation

The Google Place ID used is: **ChIJQVGJ5z7f5zsRjeiKHb10Aqo**

This was extracted from your provided link: https://share.google/clOAttqXBirdkejWj

You can verify this is correct by visiting:
https://www.google.com/maps/search/?api=1&query=Dr.+Vaishnavi+Sawant+Virar&query_place_id=ChIJQVGJ5z7f5zsRjeiKHb10Aqo

---

## ✅ Summary

**Removed**: 8 fake reviews  
**Added**: Real Google reviews via API  
**Cost**: $0/month (within free tier)  
**Setup Time**: 15-20 minutes  
**Compliance**: ✅ Fully compliant with Google's terms

**Next Steps**:
1. Get Google API key (15 min)
2. Add to backend .env (1 min)
3. Test locally (5 min)
4. Deploy to production (add env var on Render)
5. ✅ Done!

---

Need help? The API key setup is the only required step!
