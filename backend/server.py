from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB setup with fallback
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'sawant_clinic_db')

in_memory_appointments = []
in_memory_contacts = []
in_memory_status_checks = []

client = None
db = None

try:
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
    db = client[db_name]
except Exception as err:
    logger.warning(f"MongoDB connection failed: {err}. Using in-memory fallback store.")

# Create the main app
app = FastAPI(title="Dr Sawant's Advanced Homeopathic Clinic API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AppointmentCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    service: str
    date: str
    time: str
    notes: Optional[str] = None

class Appointment(AppointmentCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str

class ContactMessage(ContactMessageCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Routes
@api_router.get("/")
async def root():
    return {
        "clinic": "Dr Sawant’s Advanced Homeopathic Clinic",
        "doctors": [
            {
                "name": "Dr. Vaishnavi Sawant Parab",
                "qualifications": "M.D. Hom, P.G.D.P.C., P.G.D.C.C., P.G.D.T.",
                "registration": "Reg. No. 68944",
                "role": "Consulting Homeopathic Physician | Clinical Cosmetologist & Trichologist"
            },
            {
                "name": "Dr. Anil Soma Parab",
                "qualifications": "M.D. Hom, P.G.D.P.C., P.G.D.C.C., P.G.D.T., F.M.C.",
                "registration": "Reg. No. 68785",
                "role": "Consulting Homeopathic Physician | Clinical Cosmetologist & Trichologist"
            }
        ],
        "stats": {
            "practice_years": "9+ Years",
            "patients_treated": "2500+"
        },
        "timings": "12.00 PM - 2.00 PM & 5.30 PM - 9.00 PM | Thursday Closed",
        "phone": "8446121943",
        "message": "Welcome to Dr Sawant's Advanced Homeopathic Clinic API",
        "status": "online"
    }

@api_router.get("/health")
async def health_check():
    db_status = "connected"
    if db is not None:
        try:
            await client.admin.command('ping')
        except Exception:
            db_status = "in_memory_fallback"
    else:
        db_status = "in_memory_fallback"

    return {
        "status": "healthy",
        "database": db_status,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    saved = False
    if db is not None:
        try:
            await db.status_checks.insert_one(doc)
            saved = True
        except Exception as e:
            logger.warning(f"MongoDB write failed: {e}")
    
    if not saved:
        in_memory_status_checks.append(status_obj)
        
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is not None:
        try:
            status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
            for check in status_checks:
                if isinstance(check.get('timestamp'), str):
                    check['timestamp'] = datetime.fromisoformat(check['timestamp'])
            return status_checks
        except Exception as e:
            logger.warning(f"MongoDB read failed: {e}")
            
    return in_memory_status_checks

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(input_data: AppointmentCreate):
    appointment_obj = Appointment(**input_data.model_dump())
    doc = appointment_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    saved = False
    if db is not None:
        try:
            await db.appointments.insert_one(doc)
            saved = True
        except Exception as e:
            logger.warning(f"MongoDB write error: {e}")

    if not saved:
        in_memory_appointments.append(appointment_obj)

    return appointment_obj

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    if db is not None:
        try:
            records = await db.appointments.find({}, {"_id": 0}).to_list(1000)
            for rec in records:
                if isinstance(rec.get('created_at'), str):
                    rec['created_at'] = datetime.fromisoformat(rec['created_at'])
            return records
        except Exception as e:
            logger.warning(f"MongoDB read error: {e}")

    return in_memory_appointments

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(input_data: ContactMessageCreate):
    msg_obj = ContactMessage(**input_data.model_dump())
    doc = msg_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    saved = False
    if db is not None:
        try:
            await db.contact_messages.insert_one(doc)
            saved = True
        except Exception as e:
            logger.warning(f"MongoDB write error: {e}")

    if not saved:
        in_memory_contacts.append(msg_obj)

    return msg_obj

@api_router.get("/services")
async def get_services():
    return [
        {
            "id": "homeopathy",
            "name": "Homeopathic Care",
            "tagline": "Root-cause constitutional healing for chronic & acute ailments",
            "icon": "Stethoscope",
            "conditions": ["Chronic Allergies", "Asthma & Respiratory Issue", "PCOS & Hormonal Imbalance", "Arthritis & Joint Pain", "Pediatric Health"]
        },
        {
            "id": "skin",
            "name": "Skin & Face Treatments",
            "tagline": "Advanced clinical cosmetology, facial rejuvenation & skin therapies",
            "icon": "Sparkles",
            "skin_conditions": ["Wart Removal", "Tattoo Removal", "Skin Lightening Therapy"],
            "face_conditions": ["Hydrafacial", "Carbon Laser", "Melasma Treatment", "Scar Treatment", "PRP / GFC Face", "Microneedling / Vampire Facial", "HIFU", "Peels", "Under Eye Peel", "LIFTOX Therapy"],
            "conditions": [
                "Wart Removal", "Tattoo Removal", "Skin Lightening Therapy",
                "Hydrafacial", "Carbon Laser", "Melasma Treatment", "Scar Treatment",
                "PRP / GFC Face", "Microneedling / Vampire Facial", "HIFU", "Peels",
                "Under Eye Peel", "LIFTOX Therapy"
            ]
        },
        {
            "id": "hair",
            "name": "Hair Treatments",
            "tagline": "Holistic scalp therapy & clinical trichology to stop hair loss",
            "icon": "Zap",
            "conditions": ["Hair PRP / GFC", "Hair Microneedling", "Dandruff Treatment", "Alopecia Areata", "Pattern Hair Loss"]
        },
        {
            "id": "laser",
            "name": "Laser Department",
            "tagline": "FDA-approved painless laser technology for aesthetic precision",
            "icon": "ShieldCheck",
            "conditions": ["Laser Hair Reduction", "Carbon Laser", "IPL Laser"]
        }
    ]

# Google Reviews endpoint
@api_router.get("/google-reviews")
async def get_google_reviews():
    """
    Fetch real Google reviews from Dr. Sawant's Advanced Homeopathic Clinic
    Google Place ID: ChIJQVGJ5z7f5zsRjeiKHb10Aqo (from the provided link)
    """
    try:
        # Get API key from environment
        google_api_key = os.environ.get('GOOGLE_PLACES_API_KEY')
        
        if not google_api_key:
            logger.error("GOOGLE_PLACES_API_KEY not found in environment variables")
            raise HTTPException(
                status_code=500, 
                detail="Google API key not configured. Please contact administrator."
            )
        
        # The Place ID extracted from the share link
        place_id = "ChIJQVGJ5z7f5zsRjeiKHb10Aqo"
        
        # Google Places API - Place Details endpoint
        url = "https://maps.googleapis.com/maps/api/place/details/json"
        params = {
            "place_id": place_id,
            "fields": "name,rating,user_ratings_total,reviews,url",
            "key": google_api_key
        }
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get("status") != "OK":
            logger.error(f"Google API error: {data.get('status')} - {data.get('error_message', 'Unknown error')}")
            raise HTTPException(
                status_code=500,
                detail=f"Google API returned: {data.get('status')}"
            )
        
        result = data.get("result", {})
        reviews = result.get("reviews", [])
        
        # Format reviews for frontend
        formatted_reviews = []
        for review in reviews[:5]:  # Google returns max 5 reviews
            formatted_reviews.append({
                "author_name": review.get("author_name"),
                "rating": review.get("rating"),
                "text": review.get("text"),
                "time": review.get("time"),  # Unix timestamp
                "relative_time_description": review.get("relative_time_description"),
                "profile_photo_url": review.get("profile_photo_url"),
                "author_url": review.get("author_url")
            })
        
        return {
            "success": True,
            "place_name": result.get("name"),
            "overall_rating": result.get("rating"),
            "total_ratings": result.get("user_ratings_total"),
            "google_maps_url": result.get("url"),
            "reviews": formatted_reviews,
            "note": "Google Places API returns a maximum of 5 reviews per request."
        }
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Network error fetching Google reviews: {str(e)}")
        raise HTTPException(status_code=503, detail="Unable to connect to Google Places API")
    except Exception as e:
        logger.error(f"Error fetching Google reviews: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include router
app.include_router(api_router)

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
