import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HOME } from "@/constants/testIds";
import "@/App.css";
import {
  Stethoscope,
  Sparkles,
  Zap,
  ShieldCheck,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  User,
  ChevronDown,
  ChevronUp,
  X,
  Award,
  HeartHandshake,
  Activity,
  ArrowRight,
  Menu,
  Star,
  Quote,
  ThumbsUp,
  Instagram,
  BookOpen,
  ArrowLeft,
  Grid,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const CLINIC_PHONE = "8446121943";
const CLINIC_PHONE_SECONDARY = "8983529842";
const WHATSAPP_NUMBER = "918446121943";
const ADDRESS = "Shop No 1, Shantinath Plaza CHS, Virar West, Maharashtra 401303";
const CONSULTING_HOURS = "12.00 PM - 2.00 PM & 5.30 PM - 9.00 PM";
const CLOSED_DAY = "Thursday Closed";
const GOOGLE_REVIEWS_LINK = "https://share.google/GxoxtVylJ3eiqe1KU";
const INSTAGRAM_LINK = "https://www.instagram.com/drsawant_and_drparab?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==";

// Kandivali Branch Details
const KANDIVALI_ADDRESS = "539 D, 7, RSC Rd Number 55, Sector 5, Sector 5 Charkop, Kandivali West, Mumbai, Maharashtra 400067";
const KANDIVALI_PHONE = "7021281679";

// DOCTOR QUALIFICATIONS & CREDENTIALS (Referenced from Clinic Signboard)
const DR_VAISHNAVI_NAME = "Dr. Vaishnavi Sawant Parab";
const DR_VAISHNAVI_QUALIFICATIONS = "M.D. (Hom), P.G.D.P.C., P.G.D. Clinical Cosmetology, P.G.D. Trichology";
const DR_VAISHNAVI_ROLE = "Consulting Homeopathic Physician | Clinical Cosmetologist & Trichologist";
const DR_VAISHNAVI_REGD = "Reg. No. 68944";

const DR_ANIL_NAME = "Dr. Anil Soma Parab";
const DR_ANIL_QUALIFICATIONS = "M.D. (Hom), P.G.D.P.C., P.G.D. Clinical Cosmetology, P.G.D. Trichology";
const DR_ANIL_ROLE = "Consulting Homeopathic Physician";
const DR_ANIL_REGD = "Reg. No. 68785";

// CLINICAL STATS UPDATED
const PATIENTS_TREATED = "2500+";
const YEARS_PRACTICE = "9+ Years";

// 📸 DOCTOR PHOTO & SIGNBOARD URLS
const DOCTOR_PHOTO_URL = "/dr_sawant.jpeg";
const DOCTOR_CONSULT_PHOTO_URL = "/doctor_url.jpeg";
const DR_ANIL_PHOTO_URL = "/dr_anil.jpg";
const CLINIC_BANNER_URL = "/clinic_banner.jpg";

// Official Lotus Symbol provided by Clinic (from shared clinic emblem)
const OfficialLotusSymbol = ({ className = "h-9 w-auto", isDark = false }) => {
  return (
    <img
      src="/lotus_symbol.png"
      alt="Dr. Sawant Clinic Symbol"
      className={`${className} object-contain shrink-0 ${isDark ? "drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]" : ""}`}
    />
  );
};


// Helper function to handle WhatsApp-only appointment bookings
const openWhatsAppBooking = (treatmentName = "") => {
  let text = "Hello Dr. Sawant's Clinic, I would like to book an appointment for consultation.";
  if (treatmentName) {
    text = `Hello Dr. Sawant's Clinic, I would like to book an appointment for ${treatmentName}.`;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

// Department Overview Data & Department Specific Conditions
const SERVICES = [
  {
    id: "homeopathy",
    testId: HOME.serviceTabHomeopathy,
    name: "Homeopathic Care",
    countBadge: "12 Experienced Conditions",
    icon: Stethoscope,
    coverImage: "/respi.jfif",  // ✓ reusing respiratory for homeopathy cover
    tagline: "Root-cause constitutional healing for chronic & acute ailments",
    description: "Personalized, side-effect-free homeopathic remedies tailored to your unique physical & emotional disposition.",
    history: "Founded by Dr. Samuel Hahnemann in 1796, Homeopathy is a 200+ year old medical science based on the natural principle 'Similia Similibus Curentur' (Like Cures Like). It stimulates the body's intrinsic immune and self-healing mechanisms through highly diluted, safe, natural remedies without causing chemical toxicity or drug dependence.",
    items: [
      {
        title: "PCOS & Hormonal Imbalance",
        image: "/pcod.jpg",  // ✓ reusing migraine for PCOS
        desc: "Natural constitutional remedies to regulate menstrual cycles and restore hormonal harmony.",
        tag: "Experienced"
      },
      {
        title: "Chronic Allergies & Rhinitis",
        image: "/chronic.jfif",  // ✓ reusing respiratory
        desc: "Long-term immunity boosting to permanently eliminate sneezing, dust allergy & congestion.",
        tag: "Experienced"
      },
      {
        title: "Asthma & Respiratory Care",
        image: "/respi.jfif",  // ✓ exists
        desc: "Gentle lung capacity improvement without reliance on heavy steroid inhalers.",
        tag: "Experienced"
      },
      {
        title: "Kidney Stones & Renal Health",
        image: "/kidney.jpg",  // ✓ reusing arthritis
        desc: "Non-surgical dissolution and prevention of recurrent renal calculi.",
        tag: "Experienced"
      },
      {
        title: "Migraine & Chronic Headaches",
        image: "/migraune.jfif",  // ✓ exists
        desc: "Addressing nerve tension and vascular triggers for lasting headache relief.",
        tag: "Experienced"
      },
      {
        title: "Gastritis & IBS (Digestive Health)",
        image: "/gastritis.jfif",  // ✓ exists
        desc: "Balancing stomach mucosal health and relieving hyperacidity, bloating & IBS.",
        tag: "Experienced"
      },
      {
        title: "Arthritis & Joint Pain Relief",
        image: "/arthritis.jfif",  // ✓ exists
        desc: "Reducing joint stiffness, swelling, and gout without painkiller toxicity.",
        tag: "Experienced"
      },
      {
        title: "Thyroid Disorders (Hypo/Hyper)",
        image: "/thyroid.jfif",  // ✓ reusing gastritis
        desc: "Metabolic stabilization remedies to improve energy, weight & TSH levels.",
        tag: "Experienced"
      },
      {
        title: "Pediatric Immunity & Growth",
        image: "/pedi.jpg",  // ✓ reusing respiratory
        desc: "Sweet, safe, non-bitter pills to build robust immunity against frequent colds.",
        tag: "Experienced"
      },
      {
        title: "Stress, Anxiety & Mood Balance",
        image: "/stress.jpg",  // ✓ reusing migraine
        desc: "Holistic mind-body remedies for insomnia, panic, and mental fatigue.",
        tag: "Experienced"
      },
      {
        title: "Eczema & Chronic Skin Allergies",
        image: "/eczema.jfif",  // ✓ reusing acne for skin allergies
        desc: "Soothing deep-seated skin itchiness and preventing scaling & rashes.",
        tag: "Experienced"
      },
      
    ]
  },
  {
    id: "skin",
    testId: HOME.serviceTabSkin,
    name: "Skin & Face Treatments",
    countBadge: "13 Specializations",
    icon: Sparkles,
    coverImage: "/hydra.jpg",  // ✓ reusing hydrafacial for cover
    tagline: "Advanced clinical cosmetology, facial rejuvenation & skin therapies",
    description: "Combining modern clinical cosmetology procedures, high-precision laser facials, and anti-aging therapies with constitutional homeopathy for clear, glowing skin.",
    history: "Cosmetological clinical therapy targets superficial and deep dermal conditions without downtime. Coupled with internal homeopathic constitutional remedies, it safely eliminates skin tags, warts, acne scars, melasma, and fine lines at the root level.",
    items: [
      {
        title: "Wart Removal",
        category: "Skin",
        image: "/wart.jpg",  // ✓ exists
        desc: "Safe, swift, and scar-free clinical removal of viral warts, skin tags, and benign skin lesions.",
        tag: "Skin Cosmetology"
      },
      {
        title: "Tattoo Removal",
        category: "Skin",
        image: "/tattoo.jfif",  // ✓ reusing wart removal
        desc: "Advanced high-precision Q-switched laser pigment fragmentation for safe fading and progressive complete tattoo clearance.",
        tag: "Skin Cosmetology"
      },
      {
        title: "Skin Lightening Therapy",
        category: "Skin",
        image: "/skinlight.jfif",  // ✓ reusing melasma
        desc: "Specialized clinical skin brightening, melanin inhibition, and antioxidant infusion for an even-toned luminous complexion.",
        tag: "Skin Cosmetology"
      },
      {
        title: "Hydrafacial",
        category: "Face",
        image: "/hydra.jpg",  // ✓ exists
        desc: "Multi-action vortex extraction, deep pore vacuum cleansing, and intense hyaluronic hydration for an instant radiant glow.",
        tag: "Face Treatment"
      },
      {
        title: "Carbon Laser",
        category: "Face",
        image: "/carbon.jpg",  // ✓ exists
        desc: "Hollywood carbon peel facial to minimize enlarged pores, reduce sebum, and brighten dull facial complexion.",
        tag: "Face Treatment"
      },
      {
        title: "Melasma Treatment",
        category: "Face",
        image: "/melasma.jpg",  // ✓ exists
        desc: "Multi-layered dermal pigmentation correction combining depigmentation serums with internal constitutional healing.",
        tag: "Face Treatment"
      },
      {
        title: "Scar Treatment",
        category: "Face",
        image: "/scar.jfif",  // ✓ reusing acne
        desc: "Specialized scar revision, collagen induction, and texture resurfacing for post-acne marks and skin indentations.",
        tag: "Face Treatment"
      },
      {
        title: "PRP / GFC Face",
        category: "Face",
        image: "/face.jpg",  // ✓ exists
        desc: "Autologous Platelet-Rich Plasma & concentrated Growth Factor therapy for cellular anti-aging and natural radiance.",
        tag: "Face Treatment"
      },
      {
        title: "Microneedling / Vampire Facial",
        category: "Face",
        image: "/microneedling.jpg",  // ✓ exists
        desc: "Micro-fine collagen induction paired with regenerative factors to tighten fine lines, firm skin, and smooth skin texture.",
        tag: "Face Treatment"
      },
      {
        title: "HIFU (High-Intensity Focused Ultrasound)",
        category: "Face",
        image: "/hifu.jfif",  // ✓ reusing face.jpg
        desc: "Non-invasive high-intensity ultrasound for non-surgical face lift, jawline contouring, and deep structural tightening.",
        tag: "Face Treatment"
      },
      {
        title: "Peels",
        category: "Face",
        image: "/peels.jpg",  // ✓ exists
        desc: "Customized medical chemical & botanical peels to treat active acne, uneven skin tone, and promote fresh cell renewal.",
        tag: "Face Treatment"
      },
      {
        title: "Under Eye Peel",
        category: "Face",
        image: "/1745352189819.jpg",  // ✓ reusing face.jpg
        desc: "Ultra-gentle formulation specifically designed to lighten dark circles, fatigue shadows, and periorbital fine lines.",
        tag: "Face Treatment"
      },
      {
        title: "LIFTOX Therapy",
        category: "Face",
        image: "/liftox.png",  // ✓ exists
        desc: "Premium peptide anti-wrinkle and lifting therapy delivering visible firmness, facial muscle smoothing, and volume plumping.",
        tag: "Face Treatment"
      }
    ]
  },
  {
    id: "hair",
    testId: HOME.serviceTabHair,
    name: "Hair Treatments",
    countBadge: "5 Specialized Trichology Therapies",
    icon: Zap,
    coverImage: "/prp_hairloss.jpg",  // ✓ reusing PRP for hair cover
    tagline: "Holistic scalp therapy & clinical trichology to stop hair loss and boost density",
    description: "Targeted scalp rejuvenation and internal nutrient alignment to restore healthy, thick, and voluminous hair.",
    history: "Trichological clinical care addresses root follicle micro-circulation, cellular growth factors, and hormonal triggers like DHT. It revives dormant roots naturally without drug dependency.",
    items: [
      {
        title: "Hair PRP / GFC",
        image: "/prp_hairloss.jpg",  // ✓ exists
        desc: "Autologous Platelet-Rich Plasma & concentrated Growth Factor therapy to stop shedding and reactivate dormant hair follicles.",
        tag: "Trichology"
      },
      {
        title: "Hair Microneedling",
        image: "/micron.jpg",  // ✓ exists
        desc: "Scalp microneedling infused with potent hair peptides to dramatically stimulate microcirculation to the hair roots.",
        tag: "Trichology"
      },
      {
        title: "Dandruff Treatment",
        image: "/high_frequency_haiur.jpg",  // ✓ reusing hair microneedling
        desc: "Deep clarifying scalp peeling and constitutional homeopathic care to permanently eliminate stubborn flaking and fungal irritation.",
        tag: "Trichology"
      },
      {
        title: "Alopecia Areata (Patchy Loss)",
        image: "/hair_patch.jfif",  // ✓ exists
        desc: "Targeted autoimmune balancing remedies to halt sudden coin-sized bald spots and regenerate natural hair follicles.",
        tag: "Trichology"
      },
      {
        title: "Pattern Hair Loss & Thinning",
        image: "/pattern_loss.jpg",  // ✓ reusing alopecia
        desc: "DHT-blocking constitutional remedies and holistic scalp nutrition for men and women facing progressive crown thinning.",
        tag: "Trichology"
      }
    ]
  },
  {
    id: "laser",
    testId: HOME.serviceTabLaser,
    name: "Laser Department",
    countBadge: "3 FDA Approved Therapies",
    icon: ShieldCheck,
    coverImage: "/laser_hair.jpg",  // ✓ reusing laser hair for cover
    tagline: "FDA-approved painless laser technology for aesthetic precision",
    description: "State-of-the-art non-invasive laser procedures performed under expert clinical cosmetology supervision.",
    history: "Modern aesthetic laser technology utilizes medical-grade, US-FDA approved selective photothermolysis. It precisely targets hair follicles and pigment particles while protecting surrounding tissue safely.",
    items: [
      {
        title: "Laser Hair Reduction",
        image: "/laser_hair.jpg",  // ✓ exists
        desc: "Painless triple-wavelength medical laser technology for long-lasting, smooth hair-free face & body.",
        tag: "FDA Approved"
      },
      {
        title: "Carbon Laser",
        image: "/carbon.jpg",  // ✓ exists
        desc: "Advanced carbon peel laser for deep pore cleansing, acne reduction, and instantaneous porcelain skin glow.",
        tag: "Carbon Peel"
      },
      {
        title: "IPL Laser",
        image: "/ipl_laser.jpg",  // ✓ exists
        desc: "Intense Pulsed Light therapy for stubborn freckles, photo-aging, redness, and non-invasive facial rejuvenation.",
        tag: "Photofacial"
      }
    ]
  }
];

// Patient Reviews & Real Cured Cases Data
// Google Maps listing for reviews
const GOOGLE_MAPS_LISTING_URL = "https://share.google/clOAttqXBirdkejWj";

// GENUINE GOOGLE REVIEWS - Manually transcribed from actual Google Maps reviews
// These are real reviews from real patients of Dr. Vaishnavi Sawant's Virar clinic
// Source: https://share.google/clOAttqXBirdkejWj
const VIRAR_GOOGLE_REVIEWS = [
  {
    reviewerName: "Sneha Doshi",
    rating: 5,
    reviewText: "I've been taking treatment from Dr. Vaishnavi for almost 20 months now for PCOD and migraines, and my experience has been really good so far. She's very kind, friendly and understanding, and always listens to my concerns patiently. Homeopathy does take time , but I've been seeing positive changes with my treatment and with zero side effects. I really appreciate her care and the way she makes her patient feel comfortable ❤️."
  },
  {
    reviewerName: "Riddhesh Pawar",
    rating: 5,
    reviewText: "I was suffering from acne issue and visited to Dr. Vaishnavi she helped to cure this issue, actually homeopathy takes time but it works and genuinely I have seen that happening. So I strongly recommend do trust homeopathy treatment it really works.\n\nAbout Dr. Vaishnavi she is not only a skilled professional but also compassionate. I felt genuinely cared for during my visit.\n\nThank you Doctor"
  },
  {
    reviewerName: "Harshith Kotian",
    rating: 5,
    reviewText: "My name is Harshith Kotian, and I was facing the problem of alopecia areata. I underwent many treatments for several months and even continued for a year, but unfortunately, there was no improvement. However, after visiting this clinic, my alopecia areata was successfully treated. The bald patch healed, and my hair started growing back. I am very satisfied with the results and thankful for the effective treatment I received by vaishnavi mam"
  },
  {
    reviewerName: "Aruna Murchawade",
    rating: 5,
    reviewText: "I had a allergic cough for almost more than 1 year...did a lot of medicine, did a lot of doctors..did everything but the cough didn't go away, the allergic cough turned into asthma, Had to take an inhaler. going through a very bad situation. Started treatment with Dr. Vaishnavi Sawant in February 2023 and gave me confidence that I will get you out of this completely and my asthma and allergic cough is completely gone within 6 months. I am living an asthma free life. Thank you so much doctor 😊\n\nShe is a great doctor and great person. They are very humble. Dr. Vaishnavi's treatment is very beneficial. I have had a very good experience, my entire family goes to Dr. Vaishnavi for treatment...\n\nThose who have never experienced homeopathy should definitely experience it...\n\n🙏 🙏 🙏"
  },
  {
    reviewerName: "Kasturi Oulkar",
    rating: 5,
    reviewText: "I have known Vaishnavi on a personal level so I connected to her when I got a skin condition on my face causing hypersensitivity. I couldn't eat well as I would get reactions.. makeup was out of question.. even exposure to sun would cause redness & rashes. But Doctor helped me with my diet, the sessions were helpful & with proper timely medicines it took hardly 2-3 months to cure it altogether.. and it hasn't returned till date. Thanks.\n\nAlso, on a personal level Doc is responsive & considerate. Wish you all the success."
  },
  {
    reviewerName: "Neha Jha",
    rating: 5,
    reviewText: "I have consulted Dr. Vaishnavi and been under her treatment for a few health issues over the years and she's taken extremely good care of me. I suffered with chronic migraine headaches and post her treatment, my migraines have completely stopped. Firstly, she is a great listener and deeply empathetic and takes the time to understand the patients history in depth. She has a very friendly demeanor and explains the diagnosis in detail with the treatment options that immediately put me at ease. Highly recommended."
  },
  {
    reviewerName: "Manisha Patel",
    rating: 5,
    reviewText: "Hiii.., this is manisha firstly thanks to Dr.Vaishnavi sawant she is really very good at her job...I had been going through irregular periods since last 2 years....I have taken allopatic medicines but it's not worked for me than my friend has told me about homeopathic treatment so with her suggestion i had taken consultation from dr. Vaishanavi.....so after sonography i got to know that i had a big cyst in my left ovary which is 59mm(113.4 CC )then within the treatment of 4months i glad to see that the cyst is fully desolved which brings me a confidence that a homeopathic treatment can give such a good results, so I like to suggest to consult Dr. Vaishanavi as she is too friendly in giving honest advice.\n\nThankyou 😊"
  },
  {
    reviewerName: "shweta misra",
    rating: 5,
    reviewText: "Thank you So much Dr. Vaishnavi. I connected on 28th Feb 2024 for my kid. He was having constipation issue and was getting Viral on monthly basis... So thought let me try for homeopathy\n\n.....\n\nI am grateful 🙏 I tried it . With in one week his constipation issue resolved and even since February to till now he even did not get a single sneeze...\n\nJo bachcha every month antibiotic leta tha for high fever cough and cold... Now he is absolutely fine...\n\nThank you so much Doctor...."
  },
  {
    reviewerName: "subhajit sarkar",
    rating: 5,
    reviewText: "We visited the doctor post lockdown. Due to the aftermath of lockdown and recovering from COVID-19, me and my wife were facing some chronic health issues and having relationship issues.\n\nBut after counselling Dr. Vaishnavi, there was a huge difference in our health and relationship.\n\nEarlier I had stress-related health issues, post consultation and medication my reports got better.\n\nAlong with medicines the doctor gives tips and health advices related to lifestyle changes which helps immensely.\n\nWe have also started homeopathic treatment for our child, he is hyperactive but since we started visiting the doctor we have seen some major improvements in his behaviour.\n\nThe doctor is professional and friendly.\n\nHighly recommended."
  },
  {
    reviewerName: "Deep Patel",
    rating: 5,
    reviewText: "I had an side effects of allopathy medicines due to which my digestion was heavily affected. Dr. Vaishnavi Sawant maam has really helped me to resolve my overall health issues. Happy to find a positive doctor who supports me and my family whenever in need. Thankyou Maam ✨"
  },
  {
    reviewerName: "Priyanka Gandhi",
    rating: 5,
    reviewText: "I had faced pcod problems from 5-6years and had treatment from several doctors. I visited Dr. Sawant's homeopathic clinic. she is a very great listener and takes the time to understand the patients history in depth. I always felt good after visiting her clinic and sharing my problems with her. Now i had cured with my pcod issue withing an year. I would surely recommend everyone to visit her clinic for any treatment."
  },
  {
    reviewerName: "Maitry Mewada",
    rating: 5,
    reviewText: "I had white spots on face for which I had visited Dr. Vaishnavi and her medication really helped. Would highly recommend people to visit her in any problem as she is highly professional and really a good doctor to have your checkups done, very supportive throughout the treatment and gave proper guidance to the medicine as well as the diet. Thanku Dr. Vaishnavi"
  },
  {
    reviewerName: "Raju Nalband",
    rating: 5,
    reviewText: "I was advised for the immediate surgery for kidney stone of 20mm but Dr vaishnavi Sawant helped us a lot.she take care of patients as if we r family. Her treatment is superb 👍.thank you Dr vaishnavi Sawant."
  },
  {
    reviewerName: "Harsha Raut",
    rating: 5,
    reviewText: "After visiting Dr. Vaishnavi's clinic, i started believing in homeopathic. Very kind hearted and my few family members recovered quickly having homeopathic medicines instead of allopathic medicine.. i suggest to visit her clinic for medication."
  },
  {
    reviewerName: "Smita Parab",
    rating: 5,
    reviewText: "Very humble doctor. My son had corns on his feet other child specialist guided me to a surgeon\n\nWhile his corn and pain was vanished after Doctor Sawants dose of Homeo Medicine. We are blessed to find a doctor like this."
  },
  {
    reviewerName: "Keval Main",
    rating: 5,
    reviewText: "Dr. Vaishnavi is extremely professional. Takes good care of her patients and also takes efforts in educating them."
  }
];

// Conditions Quick Grid
const CONDITIONS = [
  { name: "Wart & Tattoo Removal", icon: ShieldCheck, category: "Skin Treatments" },
  { name: "Hydrafacial & Peels", icon: Sparkles, category: "Face Treatments" },
  { name: "Hair PRP / GFC", icon: Zap, category: "Hair Treatments" },
  { name: "Laser Hair Reduction", icon: ShieldCheck, category: "Laser Department" },
  { name: "Melasma & Pigmentation", icon: Sparkles, category: "Cosmetology" },
  { name: "Allergies & Asthma", icon: Stethoscope, category: "Homeopathy" },
  { name: "PCOS & Hormonal Care", icon: Activity, category: "Homeopathy" },
  { name: "Carbon & IPL Laser", icon: Sparkles, category: "Laser Department" },
  { name: "Dandruff & Scalp Care", icon: Zap, category: "Hair Treatments" },
  { name: "HIFU & LIFTOX Therapy", icon: Award, category: "Face Treatments" },
  { name: "Acne Scar Resurfacing", icon: Sparkles, category: "Cosmetology" },
  { name: "Kidney Stones & Joint Pain", icon: Stethoscope, category: "Homeopathy" }
];

// FAQs
const FAQS = [
  {
    question: "Is homeopathy effective for chronic skin, face, and hair issues?",
    answer: "Yes! Homeopathy treats the internal constitutional cause of skin, face, and hair conditions (such as hormonal imbalance, stress, or immune triggers) ensuring long-term prevention rather than temporary suppression, while clinical cosmetology provides safe topical rejuvenation."
  },
  {
    question: "Are laser treatments safe and painless?",
    answer: "Absolutely. We utilize FDA-approved, medical-grade laser equipment (Laser Hair Reduction, Carbon Laser, and IPL Laser) equipped with advanced skin cooling technology to ensure maximum comfort and safety."
  },
  {
    question: "How soon can I expect results from homeopathic remedies?",
    answer: "Acute conditions often respond within days. For chronic issues like PCOS, eczema, or hair loss, noticeable improvement typically begins within 3 to 6 weeks of starting constitutional medicine."
  },
  {
    question: "Can I combine homeopathic treatment with clinical cosmetology and laser therapies?",
    answer: "Yes, our clinic specializes in dual-action healing where clinical cosmetology and laser procedures provide visible aesthetic enhancement while constitutional homeopathy cures the internal root cause."
  },
  {
    question: "Where is the clinic located and what are the consultation hours?",
    answer: `We are located at ${ADDRESS}. Consulting Time: 12.00 PM - 2.00 PM & 5.30 PM - 9.00 PM | THURSDAY CLOSED. You can book an appointment via WhatsApp or call us at 8446121943.`
  }
];

// Navbar Component
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* TOP ANNOUNCEMENT STRIP — navy + gold */}
      <div className="bg-gradient-to-r from-navy-950 via-blue-950 to-navy-950 text-white text-[11px] font-bold py-1.5 px-3 sm:px-6 border-b border-amber-400/30 shadow-inner" style={{background:"linear-gradient(to right,#0f172a,#1e2d5a,#0f172a)"}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="flex text-amber-400 gap-0.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </span>
            <span className="text-amber-300 font-black tracking-wider uppercase drop-shadow-sm">
              डॉ. सावंत &bull; DR. SAWANT'S ADVANCED CLINIC
            </span>
            <span className="hidden md:inline text-blue-200">
              &bull; 9+ Years Clinical Practice &bull; 2500+ Patients Treated &bull; Virar West
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-blue-100">
            <span className="hidden sm:flex items-center gap-1.5 text-blue-200 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>12:00-2:00 PM &bull; 5:30-9:00 PM (Thu Closed)</span>
            </span>
            <a
              href={`tel:${CLINIC_PHONE}`}
              className="text-amber-300 hover:text-white font-extrabold flex items-center gap-1 transition bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 {CLINIC_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/97 backdrop-blur-md border-b border-amber-200/60 shadow-[0_4px_20px_rgba(30,58,138,0.07)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 py-1 group shrink-0 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-amber-50/90 via-white to-blue-50/40 px-2 sm:px-3.5 py-1.5 rounded-2xl border-2 border-amber-300/80 shadow-md group-hover:border-amber-400 group-hover:shadow-lg transition-all">
              <span className="font-black text-blue-950 text-[10px] sm:text-base tracking-tight font-serif">
                डॉ. सावंत
              </span>
              <OfficialLotusSymbol className="h-6 w-auto sm:h-9" />
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-blue-950 text-[11px] sm:text-base tracking-tight">
                  Dr. Sawant's
                </span>
                <span className="text-[7px] sm:text-[9.5px] text-amber-700 font-extrabold tracking-wider uppercase">
                  Advanced Clinic
                </span>
              </div>
            </div>
            <div className="hidden xl:flex flex-col text-[9px] font-bold text-blue-400 uppercase tracking-widest pl-2.5 border-l-2 border-amber-200/80 leading-tight">
              <span className="text-blue-900 font-black">Homeopathy &bull; Skin</span>
              <span className="text-amber-700 font-black">Hair &bull; Laser</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-blue-900 text-sm">
            <Link to="/" data-testid={HOME.navHome} className="hover:text-amber-600 transition hover:scale-105">Home</Link>
            <a href="#about" data-testid={HOME.navAbout} className="hover:text-amber-600 transition hover:scale-105">About Doctors</a>
            <a href="#services" data-testid={HOME.navServices} className="hover:text-amber-600 transition hover:scale-105">Departments</a>
            <a href="#reviews" className="hover:text-amber-600 transition hover:scale-105 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Reviews</span>
            </a>
            <a href="#branches" className="hover:text-amber-600 transition hover:scale-105">Branches</a>
            <a href="#faq" data-testid={HOME.navFaq} className="hover:text-amber-600 transition hover:scale-105">FAQ</a>
            <a href="#contact" data-testid={HOME.navContact} className="hover:text-amber-600 transition hover:scale-105">Contact</a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Instagram — only colorful element */}
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Instagram"
              className="instagram-btn flex items-center justify-center w-9 h-9 rounded-xl text-white shadow-sm transition"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={`tel:${CLINIC_PHONE}`}
              data-testid={HOME.callBtn}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-blue-900 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>{CLINIC_PHONE}</span>
            </a>

            <button
              onClick={() => openWhatsAppBooking()}
              data-testid={HOME.whatsappBtn}
              className="whatsapp-pulse flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl transition shadow-lg active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book on WhatsApp</span>
            </button>
          </div>

          {/* Mobile buttons and hamburger menu */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <a href={`tel:${CLINIC_PHONE}`} className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 active:scale-95 transition">
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>Call</span>
            </a>
            <button onClick={() => openWhatsAppBooking()} className="whatsapp-pulse flex items-center gap-1 px-2 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md active:scale-95 transition">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 text-blue-900 hover:bg-amber-50 rounded-lg active:scale-95 transition" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Tablet menu toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="hidden sm:inline-flex lg:hidden p-2 text-blue-900 hover:bg-amber-50 rounded-lg shrink-0" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-blue-100 px-6 py-4 space-y-3 font-medium text-blue-900">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            Home
          </Link>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            About Doctor
          </a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            Services & Conditions
          </a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            Reviews & Cured Cases
          </a>
          <a href="#branches" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            Our Branches
          </a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            FAQ
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            Contact Us
          </a>

          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-btn flex items-center gap-2 py-2 px-3 rounded-xl font-semibold text-sm"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow on Instagram (@drsawant_and_drparab)</span>
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); openWhatsAppBooking(); }}
              className="w-full text-center bg-gradient-to-r from-blue-900 to-blue-950 text-amber-300 py-2.5 rounded-xl font-bold shadow flex items-center justify-center gap-2 border border-amber-400/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Appointment on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile dept sub-strip */}
      <div className="sm:hidden text-white px-3 py-1.5 flex items-center justify-between text-[11px] font-bold tracking-wide border-t border-amber-400/30" style={{background:"linear-gradient(to right,#0f172a,#1e2d5a,#0f172a)"}}>
        <span className="text-amber-400 flex items-center gap-1.5 shrink-0">
          <OfficialLotusSymbol className="h-4 w-auto" isDark={true} />
          <span>4 DEPARTMENTS:</span>
        </span>
        <span className="text-blue-200 truncate text-[10.5px]">Homeopathy &bull; Skin &amp; Face &bull; Hair &bull; Laser</span>
      </div>
    </>
  );
};

// Home Main Page
const MainHome = () => {
  // activeService is "all" by default (renders 4 department cards). When clicked, switches to "homeopathy", "skin", "hair", or "laser"
  const [activeService, setActiveService] = useState("all");
  const [skinSubFilter, setSkinSubFilter] = useState("all"); // "all", "face", "skin"
  const [openFaq, setOpenFaq] = useState(0);
  const [deptIndex, setDeptIndex] = useState(0);

  // Step through the 4 departments one after another (wraps around)
  const goToDept = (next) =>
    setDeptIndex((i) => (next ? (i + 1) % SERVICES.length : (i - 1 + SERVICES.length) % SERVICES.length));

  return (
    <div className="flex-1 space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative maximalist-canvas pt-12 pb-20 lg:py-28 overflow-hidden border-b border-slate-200/80">
        {/* Background glows — gold + blue */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-gradient-to-br from-amber-300/15 to-blue-200/10 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-blue-200/20 to-amber-200/15 rounded-full blur-3xl -z-0 -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl -z-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Pill badge */}
            <div className="gold-badge inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase shadow-md">
              <Award className="w-4 h-4 text-amber-800" />
              <span>{YEARS_PRACTICE} CLINICAL PRACTICE &bull; {PATIENTS_TREATED} PATIENTS TREATED &bull; VIRAR WEST</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[54px] font-black text-blue-950 tracking-tight leading-[1.12]">
              Holistic Healing Meets{" "}
              <span className="shimmer-text">
                Advanced Cosmetology
              </span>{" "}
              &amp; Laser Science
            </h1>

            <p className="text-base sm:text-xl text-blue-800 max-w-2xl leading-relaxed font-medium">
              Personalized, side-effect-free homeopathic remedies combined with FDA-approved laser technology and clinical cosmetology for lasting skin, face, hair &amp; constitutional health.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                onClick={() => openWhatsAppBooking()}
                data-testid={HOME.heroBookBtn}
                className="whatsapp-pulse w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white px-9 py-4 rounded-2xl font-black text-base shadow-xl hover:shadow-emerald-300/50 transition-all transform active:scale-95 flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Book Appointment on WhatsApp</span>
              </button>

              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-btn w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2.5"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram Profile</span>
              </a>
            </div>

            {/* Quick trust pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <span className="gold-badge flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>{YEARS_PRACTICE} Practice</span>
              </span>
              <span className="sapphire-badge flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                <span>{PATIENTS_TREATED} Patients Treated</span>
              </span>
              <span className="sapphire-badge flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>FDA-Approved Lasers</span>
              </span>
              <span className="gold-badge flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                <span>Zero Side Effects</span>
              </span>
            </div>
          </div>

          {/* Doctor Hero Images - Two Doctors */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-3 h-full">

              {/* ─── Dr. Vaishnavi Sawant Parab ─── */}
              <div className="maximalist-doctor-card rounded-3xl overflow-hidden flex flex-col group">
                {/* Photo — tall, face-centred */}
                <div className="relative overflow-hidden" style={{height: "340px"}}>
                  <img
                    src={DOCTOR_PHOTO_URL}
                    alt={DR_VAISHNAVI_NAME}
                    className="w-full h-full object-cover dr-photo-vaishnavi-standing group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Soft gradient only at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent"></div>
                  {/* Top badge */}
                  <span className="absolute top-2.5 left-2.5 right-2.5 bg-white/92 backdrop-blur-md text-stone-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md border border-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">Verified Physician</span>
                  </span>
                  {/* Bottom credential bar */}
                  <div className="photo-credential-bar absolute inset-x-0 bottom-0 px-3 py-3">
                    <div className="text-[10px] font-black text-amber-300 leading-tight mb-1">{DR_VAISHNAVI_NAME}</div>
                    <div className="text-[8.5px] text-slate-200 font-bold leading-relaxed">
                      M.D. (Hom), P.G.D.P.C.,<br/>
                      P.G.D. Clinical Cosmetology,<br/>
                      P.G.D. Trichology
                    </div>
                  </div>
                </div>
                {/* Info panel */}
                <div className="flex-1 p-3.5 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">MD (Hom)</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-800 font-bold leading-tight">Homeopathic Physician, Clinical Cosmetologist &amp; Trichologist</p>
                  <p className="text-[10px] text-stone-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{DR_VAISHNAVI_REGD}</span>
                  </p>
                  <button
                    onClick={() => openWhatsAppBooking()}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-2 rounded-xl text-[10px] transition flex items-center justify-center gap-1 shadow-md mt-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Book on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* ─── Dr. Anil Soma Parab ─── */}
              <div className="maximalist-doctor-card rounded-3xl overflow-hidden flex flex-col group">
                <div className="relative overflow-hidden" style={{height: "340px"}}>
                  <img
                    src={DR_ANIL_PHOTO_URL}
                    alt={DR_ANIL_NAME}
                    className="w-full h-full object-cover dr-photo-anil group-hover:scale-105 transition-transform duration-700 bg-stone-100"
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-teal-50 to-emerald-50 items-center justify-center">
                    <User className="w-16 h-16 text-teal-300" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent"></div>
                  <span className="absolute top-2.5 left-2.5 right-2.5 bg-white/92 backdrop-blur-md text-stone-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md border border-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">M.D. (Hom) Certified</span>
                  </span>
                  <div className="photo-credential-bar absolute inset-x-0 bottom-0 px-3 py-3">
                    <div className="text-[10px] font-black text-teal-300 leading-tight mb-1">{DR_ANIL_NAME}</div>
                    <div className="text-[8.5px] text-slate-200 font-bold leading-relaxed">
                      M.D. (Hom), P.G.D.P.C.,<br/>
                      P.G.D.C.C.
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-3.5 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">MD (Hom)</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-800 font-bold leading-tight">Consulting Homeopathic Physician</p>
                  <p className="text-[10px] text-stone-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{DR_ANIL_REGD}</span>
                  </p>
                  <button
                    onClick={() => openWhatsAppBooking("Consultation")}
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black py-2 rounded-xl text-[10px] transition flex items-center justify-center gap-1 shadow-md mt-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Book on WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* OFFICIAL CLINIC SIGNBOARD DISPLAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="maximalist-dark-canvas rounded-3xl p-6 sm:p-10 text-white border-2 border-amber-400/50 shadow-[0_25px_60px_-10px_rgba(30,58,138,0.5)] relative overflow-hidden">
          {/* Luminous ambient glow */}
          <div className="absolute -right-10 -top-10 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="gold-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md">
                <OfficialLotusSymbol className="h-4 w-auto" isDark={true} />
                <span>OFFICIAL CLINIC SIGNBOARD &bull; ACCREDITED CREDENTIALS</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-black text-white drop-shadow">डॉ. सावंत</span>
                <OfficialLotusSymbol className="h-10 w-auto" isDark={true} />
                <span className="text-3xl sm:text-4xl font-black text-white drop-shadow">Dr. Sawant's</span>
              </div>
              <div className="text-emerald-400 font-black text-base sm:text-lg tracking-wider uppercase drop-shadow">
                ADVANCED HOMEOPATHIC CLINIC
              </div>
              <div className="text-xs sm:text-sm text-amber-300 font-black tracking-widest uppercase">
                HOMEOPATHY | SKIN | HAIR | LASER
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200">
                <span className="bg-slate-900/90 text-white px-3.5 py-2 rounded-xl border border-slate-700 font-bold flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>CONSULTING: {CONSULTING_HOURS}</span>
                </span>
                <span className="bg-red-950/80 text-red-200 px-3.5 py-2 rounded-xl border border-red-800/60 font-black shadow-sm">
                  THURSDAY CLOSED
                </span>
                <span className="gold-badge px-3.5 py-2 rounded-xl font-black flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-900" />
                  <span>REG: 68944 &bull; 68785</span>
                </span>
                <a
                  href={`tel:${CLINIC_PHONE}`}
                  className="bg-emerald-950/80 text-emerald-300 hover:text-white px-3.5 py-2 rounded-xl border border-emerald-700/60 font-black flex items-center gap-1.5 shadow-sm transition"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{CLINIC_PHONE}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-400 shadow-[0_15px_35px_rgba(0,0,0,0.5)] bg-white group">
                <img
                  src={CLINIC_BANNER_URL}
                  alt="Dr Sawant Clinic Official Signboard"
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <p className="text-[11.5px] text-center text-amber-200/90 font-bold mt-2.5">
                Official Clinic Signboard &bull; Registered Homeopathic Physicians &amp; Clinical Cosmetologists
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST POINTS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="medical-card grid grid-cols-2 md:grid-cols-5 gap-0 divide-x divide-slate-100 p-0 rounded-2xl border border-slate-200/90 shadow-md overflow-hidden">
          {[
            { icon: Award,          label: "MD(Hom) Certified",    sub: "Regd. Physicians",       color: "bg-amber-50 text-amber-800 border-b-2 border-amber-300" },
            { icon: Calendar,       label: `${YEARS_PRACTICE} Practice`,    sub: "Clinical Excellence",    color: "bg-blue-50 text-blue-800 border-b-2 border-blue-300" },
            { icon: HeartHandshake, label: `${PATIENTS_TREATED} Treated`,   sub: "Satisfied Patients",     color: "bg-teal-50 text-teal-800 border-b-2 border-teal-300" },
            { icon: Sparkles,       label: "Clinical Cosmetology", sub: "Skin & Face Aesthetics", color: "bg-pink-50 text-pink-800 border-b-2 border-pink-300" },
            { icon: ShieldCheck,    label: "FDA-Approved Lasers",  sub: "Painless Tech",           color: "bg-indigo-50 text-indigo-800 border-b-2 border-indigo-300" },
          ].map(({ icon: Icon, label, sub, color }) => (
            <div key={label} className={`flex flex-col items-center text-center gap-2 p-5 hover:bg-white transition ${color}`}>
              <Icon className="w-6 h-6 opacity-80" />
              <div>
                <div className="font-extrabold text-sm leading-tight">{label}</div>
                <div className="text-[11px] opacity-70 leading-tight pt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DYNAMIC SERVICES & DEPARTMENT CONDITIONS SHOWCASE */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-8">
          <h2 className="section-heading text-3xl font-extrabold text-slate-900">Clinical Departments &amp; Treatments</h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Select a department below to explore its specific conditions, medical philosophy, and treatment options.
          </p>
        </div>

        {/* Department Selector Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mb-12">
          <button
            onClick={() => setActiveService("all")}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
              activeService === "all"
                ? "bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-xl scale-105 border-2 border-amber-400"
                : "bg-white hover:bg-blue-50 text-blue-900 border-2 border-blue-100 shadow-sm hover:border-amber-300"
            }`}
          >
            <Grid className={`w-4 h-4 ${activeService === "all" ? "text-amber-400" : "text-blue-700"}`} />
            <span>All 4 Departments</span>
          </button>

          {SERVICES.map((s) => {
            const Icon = s.icon;
            const isActive = activeService === s.id;
            return (
              <button
                key={s.id}
                data-testid={s.testId}
                onClick={() => setActiveService(s.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-xl scale-105 border-2 border-amber-400"
                    : "bg-white hover:bg-blue-50 text-blue-900 border-2 border-blue-100 shadow-sm hover:border-amber-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-blue-700"}`} />
                <span>{s.name} ({s.items.length})</span>
              </button>
            );
          })}
        </div>

        {/* CONDITION VIEW 1: DEPARTMENT CAROUSEL (When activeService === "all") */}
        {/* Browse the 4 departments one at a time using the < > arrow controls */}
        {activeService === "all" && (() => {
          const s = SERVICES[deptIndex];
          const Icon = s.icon;
          return (
            <div
              className="max-w-4xl mx-auto animate-fadeIn focus:outline-none"
              tabIndex={0}
              role="group"
              aria-roledescription="carousel"
              aria-label="Clinical departments"
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") goToDept(false);
                if (e.key === "ArrowRight") goToDept(true);
              }}
            >
              <div className="relative">
                {/* Previous department arrow */}
                <button
                  type="button"
                  aria-label="Previous department"
                  onClick={() => goToDept(false)}
                  className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-blue-950 shadow-xl border border-slate-200 flex items-center justify-center transition hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next department arrow */}
                <button
                  type="button"
                  aria-label="Next department"
                  onClick={() => goToDept(true)}
                  className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-blue-950 shadow-xl border border-slate-200 flex items-center justify-center transition hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Active department overview card */}
                <div
                  key={s.id}
                  className="medical-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-slate-200/90 animate-fadeIn"
                >
                  <div>
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                      <img
                        src={s.coverImage}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent"></div>
                      <span className="absolute top-4 right-4 bg-white/95 text-blue-950 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-md border border-slate-200/80">
                        {s.countBadge}
                      </span>
                      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/90 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30 shadow-sm">
                        <Icon className="w-4 h-4 text-amber-400" />
                        <span>{s.name}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-4">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-blue-900 transition">
                        {s.tagline}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{s.description}</p>
                      {s.history && (
                        <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed italic border-l-2 border-amber-300 pl-3">
                          {s.history}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setActiveService(s.id)}
                      className="flex-1 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
                    >
                      <span>Explore {s.items.length} Treatments</span>
                      <ArrowRight className="w-4 h-4 transition transform group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => openWhatsAppBooking(s.name)}
                      className="flex-1 bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-800 font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 border border-amber-200 shadow-sm hover:shadow group-hover:border-amber-400"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dot indicators + position counter */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <span className="text-xs font-black text-slate-500 tabular-nums">
                  {deptIndex + 1} / {SERVICES.length}
                </span>
                <div className="flex items-center gap-2">
                  {SERVICES.map((dept, i) => (
                    <button
                      key={dept.id}
                      type="button"
                      aria-label={`Go to ${dept.name}`}
                      aria-current={i === deptIndex}
                      onClick={() => setDeptIndex(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === deptIndex
                          ? "w-8 bg-gradient-to-r from-blue-900 to-indigo-950"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* CONDITION VIEW 2: SPECIFIC DEPARTMENT CONDITIONS (When activeService !== "all") */}
        {activeService !== "all" && (() => {
          const service = SERVICES.find((s) => s.id === activeService);
          if (!service) return null;
          const Icon = service.icon;

          return (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Back to All Departments Button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveService("all")}
                  className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold px-4 py-2 rounded-xl text-xs transition border border-blue-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Back to All Departments</span>
                </button>
                <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                  Showing {service.items.length} Conditions
                </span>
              </div>

              {/* Selected Department Overview & History Box */}
              <div className="maximalist-dark-canvas text-white rounded-3xl p-6 sm:p-10 space-y-5 shadow-2xl border-2 border-indigo-500/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                  <div className="gold-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                    <Icon className="w-4.5 h-4.5 text-amber-900" />
                    <span>{service.name}</span>
                  </div>
                  <button
                    onClick={() => openWhatsAppBooking(service.name)}
                    className="whatsapp-pulse shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-xl transition flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Book {service.name.split(' ')[0]} on WhatsApp</span>
                  </button>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black relative z-10">{service.tagline}</h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium relative z-10">{service.description}</p>

                {/* 3-4 Lines History & Medical Concept Box */}
                {service.history && (
                  <div className="pt-4 border-t border-indigo-700/60 flex items-start gap-3.5 text-xs sm:text-sm text-indigo-100 leading-relaxed bg-indigo-950/60 p-5 rounded-2xl border border-indigo-500/30 relative z-10 shadow-inner">
                    <BookOpen className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black text-amber-300 block mb-1 uppercase tracking-wide text-xs">Medical Science &amp; Clinical Philosophy:</span>
                      {service.history}
                    </div>
                  </div>
                )}
              </div>

              {/* Department Specific Condition Cards Grid */}
              <div>
                {/* For Skin & Face Department: Show sub-filter tabs clearly organizing Face treatments under Skin */}
                {service.id === "skin" && (
                  <div className="bg-gradient-to-r from-blue-50 via-amber-50/40 to-teal-50 border-2 border-blue-200/90 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                    <div>
                      <div className="text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Skin &amp; Face Department Sub-Categories</span>
                      </div>
                      <div className="text-xs text-slate-700 font-medium pt-0.5">
                        All Face &amp; Aesthetic treatments are handled under our specialized Clinical Cosmetology &amp; Skin department.
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSkinSubFilter("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                          skinSubFilter === "all"
                            ? "bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-lg scale-105 border-2 border-amber-400"
                            : "bg-white hover:bg-blue-50 text-blue-900 border-2 border-blue-100 shadow-xs"
                        }`}
                      >
                        All (13)
                      </button>
                      <button
                        onClick={() => setSkinSubFilter("face")}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                          skinSubFilter === "face"
                            ? "bg-gradient-to-r from-blue-800 to-blue-950 text-white shadow-lg scale-105 border-2 border-amber-300"
                            : "bg-white hover:bg-blue-50 text-blue-900 border-2 border-blue-100 shadow-xs"
                        }`}
                      >
                        Face Treatments (10)
                      </button>
                      <button
                        onClick={() => setSkinSubFilter("skin")}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                          skinSubFilter === "skin"
                            ? "bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-lg scale-105 border-2 border-amber-300"
                            : "bg-white hover:bg-blue-50 text-blue-900 border-2 border-blue-100 shadow-xs"
                        }`}
                      >
                        Skin Treatments (3)
                      </button>
                    </div>
                  </div>
                )}

                {(() => {
                  const displayedItems = (service.id === "skin" && skinSubFilter !== "all")
                    ? service.items.filter(item => (skinSubFilter === "face" ? item.category === "Face" : item.category === "Skin"))
                    : service.items;

                  return (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                          Conditions We Address Under {service.name} ({displayedItems.length})
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">Click any card to book via WhatsApp</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayedItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="medical-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-200/90"
                          >
                            <div>
                              {/* Treatment Image */}
                              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                                <span className="absolute top-3 right-3 bg-white/95 text-blue-950 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm border border-slate-200/80">
                                  {item.tag}
                                </span>
                              </div>

                              {/* Content */}
                              <div className="p-5 space-y-2">
                                <h5 className="font-extrabold text-slate-900 text-base group-hover:text-blue-900 transition">
                                  {item.title}
                                </h5>
                                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                              </div>
                            </div>

                            {/* Card Footer WhatsApp CTA */}
                            <div className="p-5 pt-0">
                              <button
                                onClick={() => openWhatsAppBooking(item.title)}
                                className="w-full bg-blue-50 hover:bg-blue-900 hover:text-white text-blue-900 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-blue-100 shadow-xs group-hover:shadow group-hover:border-amber-300"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Consult on WhatsApp</span>
                                <ArrowRight className="w-3 h-3 transition transform group-hover:translate-x-0.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>

            </div>
          );
        })()}
      </section>

      {/* GENUINE GOOGLE REVIEWS SECTION - VIRAR CLINIC */}
      <section id="reviews" className="maximalist-canvas py-20 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="gold-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <Star className="w-4 h-4 fill-amber-700 text-amber-700" />
              <span>GENUINE GOOGLE REVIEWS &bull; VIRAR CLINIC</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight drop-shadow-xs">
              What Our Patients Say <span className="shimmer-text">About Us</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Real reviews from real patients, manually transcribed from our Google Maps listing.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <span className="font-black text-slate-900">5.0/5.0</span>
              <span className="text-slate-600">({VIRAR_GOOGLE_REVIEWS.length} reviews shown)</span>
            </div>
          </div>

          {/* Google Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIRAR_GOOGLE_REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="maximalist-card bg-white rounded-3xl border-2 border-slate-200/90 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-lg group hover:border-amber-400 transition-all duration-300"
              >
                <div className="space-y-3 px-6 pt-6">
                  {/* Google Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full border border-blue-200">
                      GOOGLE REVIEW
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400' : 'fill-gray-200'}`} />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-sm leading-relaxed relative min-h-[120px] whitespace-pre-line">
                    <Quote className="w-5 h-5 text-blue-200 absolute -top-2 -left-2 -z-10" />
                    "{review.reviewText}"
                  </p>
                </div>

                {/* Reviewer Info */}
                <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm">{review.reviewerName}</div>
                    <div className="text-[11px] text-slate-500">Verified Patient</div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" title="Verified Google Review" />
                </div>
              </div>
            ))}
          </div>

          {/* Source Attribution */}
          <div className="text-center text-xs text-slate-500 italic space-y-2 pt-4">
            <p>Reviews manually transcribed from our official Google Maps listing.</p>
            <p>Source: Dr. Vaishnavi Sawant – Dr. Sawant's Advanced Homeopathic Clinic, Virar</p>
          </div>

          {/* Read All Reviews Button */}
          <div className="text-center pt-4">
            <a
              href={GOOGLE_MAPS_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-amber-300 border border-amber-400/50 font-black px-7 py-3.5 rounded-2xl shadow-xl text-sm transition hover:scale-105"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Read ALL Reviews on Google Maps</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </a>
            <p className="mt-3 text-xs text-slate-500">
              Opens: Dr. Vaishnavi Sawant — Dr. Sawant's Advanced Homeopathic Clinic, Virar
            </p>
          </div>

        </div>
      </section>

      {/* CONDITIONS WE ADDRESS */}
      <section id="conditions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <div className="sapphire-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <Activity className="w-4 h-4 text-blue-900" />
            <span>CLINICAL SCOPE OF PRACTICE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">Health Concerns We Treat</h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Get targeted, gentle constitutional healing for your specific medical &amp; aesthetic concerns.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CONDITIONS.map((cond, idx) => {
            const Icon = cond.icon;
            return (
              <div
                key={idx}
                onClick={() => openWhatsAppBooking(cond.name)}
                className="maximalist-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all text-center cursor-pointer space-y-3 hover:border-amber-400 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 text-amber-300 flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-sm text-blue-950 group-hover:text-blue-900">{cond.name}</div>
                <span className="inline-block text-[10px] uppercase tracking-wider font-black text-blue-500 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {cond.category}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT DOCTORS SECTION */}
      <section id="about" className="maximalist-dark-canvas text-white py-20 border-y-2 border-amber-400/30 relative overflow-hidden">
        {/* Luminous ambient glows */}
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center space-y-3">
            <div className="gold-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              <User className="w-4 h-4 text-amber-900" />
              <span>ACCREDITED CLINICAL PHYSICIANS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white drop-shadow">Meet Our Expert Medical Doctors</h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Over 9+ years of clinical excellence combining classical constitutional homeopathy with advanced clinical cosmetology and trichology.
            </p>
          </div>

          {/* Dr. Vaishnavi Sawant */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-amber-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                <img
                  src={DOCTOR_CONSULT_PHOTO_URL}
                  alt="Dr Vaishnavi Sawant consultation"
                  className="w-full h-[440px] object-cover dr-photo-vaishnavi-seated group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="gold-badge text-[11px] font-black px-3 py-1 rounded-full shadow-sm inline-block">
                    {DR_VAISHNAVI_REGD} &bull; Maharashtra Council
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow">{DR_VAISHNAVI_NAME}</h2>
              <div className="text-amber-300 font-black text-base sm:text-lg tracking-wide bg-amber-400/10 px-3.5 py-1.5 rounded-xl border border-amber-400/30 inline-block">
                {DR_VAISHNAVI_QUALIFICATIONS}
              </div>
              <div className="text-sm sm:text-base text-teal-200 font-bold">
                {DR_VAISHNAVI_ROLE}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="gold-badge text-xs font-black px-3 py-1 rounded-full shadow-xs">
                  {DR_VAISHNAVI_REGD}
                </span>
                <span className="emerald-badge text-xs font-black px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{YEARS_PRACTICE} Clinical Practice</span>
                </span>
                <span className="sapphire-badge text-xs font-black px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{PATIENTS_TREATED} Treated Patients</span>
                </span>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                {DR_VAISHNAVI_NAME} is a Consulting Homeopathic Physician, Clinical Cosmetologist, and Trichologist with over <span className="text-amber-300 font-black">{YEARS_PRACTICE}</span> of dedicated medical practice. Having treated <span className="text-emerald-300 font-black">{PATIENTS_TREATED} patients</span> across Virar and Mumbai, she specializes in constitutional homeopathy, chronic skin disorders, facial rejuvenation, and trichology.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="bg-gradient-to-br from-slate-900/90 to-blue-950/80 rounded-2xl px-5 py-3.5 border border-amber-400/30 shadow-md">
                  <div className="text-3xl font-black text-amber-300">{YEARS_PRACTICE}</div>
                  <div className="text-xs text-slate-300 font-bold pt-0.5">Clinical Practice</div>
                </div>
                <div className="bg-gradient-to-br from-slate-900/90 to-emerald-950/80 rounded-2xl px-5 py-3.5 border border-emerald-400/30 shadow-md">
                  <div className="text-3xl font-black text-emerald-300">{PATIENTS_TREATED}</div>
                  <div className="text-xs text-slate-300 font-bold pt-0.5">Patients Treated</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-slate-200">
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>{YEARS_PRACTICE} Clinical Practice</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Consulting Homeopathic Physician</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Clinical Cosmetologist &amp; Trichologist</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>{DR_VAISHNAVI_REGD}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openWhatsAppBooking()}
                  className="whatsapp-pulse bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black px-7 py-3.5 rounded-2xl shadow-xl transition flex items-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Schedule Consultation on WhatsApp</span>
                </button>

                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-btn font-black px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 text-sm"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider with gold accent */}
          <div className="border-t-2 border-amber-400/30"></div>

          {/* Dr. Anil Soma Parab */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-teal-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-gradient-to-br from-teal-900 to-slate-800 relative group">
                <img
                  src={DR_ANIL_PHOTO_URL}
                  alt={DR_ANIL_NAME}
                  className="w-full h-[440px] object-cover dr-photo-anil group-hover:scale-105 transition duration-700"
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
                <div className="hidden w-full h-[440px] bg-gradient-to-br from-teal-900 to-slate-800 items-center justify-center flex-col gap-4">
                  <User className="w-24 h-24 text-teal-400" />
                  <p className="text-teal-300 text-sm font-semibold">{DR_ANIL_NAME}</p>
                  <p className="text-slate-400 text-xs">Consulting Physician &amp; Clinical Cosmetologist</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="emerald-badge text-[11px] font-black px-3 py-1 rounded-full shadow-sm inline-block">
                    {DR_ANIL_REGD} &bull; F.M.C. Fellowship
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
              <div className="emerald-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md">
                <Sparkles className="w-4 h-4 text-emerald-900" />
                <span>Cosmetology &amp; Trichology Specialist</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow">{DR_ANIL_NAME}</h2>
              <div className="text-teal-300 font-black text-base sm:text-lg tracking-wide bg-teal-400/10 px-3.5 py-1.5 rounded-xl border border-teal-400/30 inline-block">
                {DR_ANIL_QUALIFICATIONS}
              </div>
              <div className="text-sm sm:text-base text-teal-200 font-bold">
                {DR_ANIL_ROLE}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="emerald-badge text-xs font-black px-3 py-1 rounded-full shadow-xs">
                  {DR_ANIL_REGD}
                </span>
                <span className="gold-badge text-xs font-black px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-900" />
                  <span>Fellowship in Medical Cosmetology (F.M.C.)</span>
                </span>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                {DR_ANIL_NAME} is a Consulting Homeopathic Physician, Clinical Cosmetologist, and Trichologist with Fellowship in Medical Cosmetology (F.M.C.). He provides advanced clinical treatments for skin, face rejuvenation, hair restoration, and laser aesthetic procedures.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>M.D. Hom, P.G.D.P.C.</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>P.G.D.C.C. (Clinical Cosmetology)</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>P.G.D.T. (Trichology)</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>F.M.C. (Fellowship in Medical Cosmetology)</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openWhatsAppBooking("Cosmetology & Trichology Consultation")}
                  className="whatsapp-pulse bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-500 hover:to-emerald-500 text-white font-black px-7 py-3.5 rounded-2xl shadow-xl transition flex items-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Book Cosmetology/Hair Visit on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STEP PATIENT JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
          <div className="gold-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span>PATIENT-CENTRIC CLINICAL PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">Your 4-Step Healing Journey</h2>
          <p className="text-slate-600 text-sm font-medium">Empathetic care and systematic clinical diagnosis every step of the way</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Comprehensive Consult", desc: "Detailed analysis of health history, constitutional disposition, and active symptoms.", badge: "Step 01" },
            { step: "02", title: "Root Cause Diagnosis", desc: "Evaluating internal immunity, skin state, and hormonal triggers.", badge: "Step 02" },
            { step: "03", title: "Personalized Remedy", desc: "Custom homeopathic medicines & non-invasive laser therapies.", badge: "Step 03" },
            { step: "04", title: "Progress & Follow-Up", desc: "Regular evaluation to ensure permanent wellness & satisfaction.", badge: "Step 04" }
          ].map((item, idx) => (
            <div key={idx} className="maximalist-card bg-white rounded-3xl p-6 border-2 border-slate-200/90 shadow-md space-y-4 relative group hover:border-amber-400 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-serif text-blue-900/20 group-hover:text-amber-500 transition-colors">
                  {item.step}
                </span>
                <span className="gold-badge text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </div>
              <h3 className="font-black text-lg text-slate-900 group-hover:text-blue-950">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-3 mb-10">
          <div className="sapphire-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-blue-900" />
            <span>TRANSPARENT CLINICAL GUIDANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-sm font-medium">Clear answers to your healthcare, homeopathic, and cosmetic queries</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden shadow-sm ${
                openFaq === idx
                  ? "border-amber-400 bg-amber-50/30 shadow-md"
                  : "border-blue-100 bg-white hover:border-amber-200"
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full text-left px-6 py-4.5 font-bold text-sm sm:text-base text-blue-950 flex justify-between items-center gap-4 hover:bg-blue-50/50 transition"
              >
                <span className="font-extrabold">{faq.question}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-amber-200/60 font-medium">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & LOCATION SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="maximalist-dark-canvas text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-2xl border-2 border-amber-400/40 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="lg:col-span-6 space-y-6 relative z-10">
            <div className="emerald-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block"></span>
              <span>CLINIC OPEN TODAY &bull; WALK-INS &amp; APPOINTMENTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow">
              Visit Our Clinic in Virar West
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              Conveniently located at Doctor's Colony, Virar West with ample parking and a serene, sterile clinical environment.
            </p>

            <div className="space-y-4 text-sm text-slate-200">
              <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="font-medium text-xs sm:text-sm">{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <div className="flex flex-wrap items-center gap-2">
                  <a href={`tel:${CLINIC_PHONE}`} className="hover:underline font-black text-amber-300 text-sm sm:text-base">
                    +91 {CLINIC_PHONE}
                  </a>
                  <span className="text-slate-400 text-xs font-bold">/ +91 {CLINIC_PHONE_SECONDARY}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <button
                  onClick={() => openWhatsAppBooking()}
                  className="hover:underline text-left font-black text-emerald-300 text-sm"
                >
                  WhatsApp Booking: +91 {CLINIC_PHONE}
                </button>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <Instagram className="w-5 h-5 text-pink-400 shrink-0" />
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-slate-200">
                  Instagram: @drsawant_and_drparab
                </a>
              </div>
              <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-black text-white text-xs sm:text-sm">Consulting Hours:</div>
                  <div className="text-xs text-amber-300 font-bold">{CONSULTING_HOURS}</div>
                  <div className="text-xs text-rose-400 font-black uppercase mt-0.5 tracking-wider">{CLOSED_DAY}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-7 flex flex-col justify-between space-y-6 border-2 border-amber-400/30 relative z-10 shadow-xl">
            <div className="space-y-3">
              <span className="gold-badge text-[11px] font-black px-3 py-1 rounded-full inline-block">
                PRIORITY CLINIC BOOKING
              </span>
              <h3 className="font-black text-2xl text-white">Direct Medical Consultation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with Dr. Vaishnavi Sawant &amp; Dr. Anil Parab. Same-day appointments available for acute conditions and specialized skin/hair procedures.
              </p>
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                <div className="text-amber-400 font-black">Official Medical Reg. Nos:</div>
                <div className="text-slate-200">&bull; {DR_VAISHNAVI_NAME}: <span className="font-bold text-white">{DR_VAISHNAVI_REGD}</span></div>
                <div className="text-slate-200">&bull; {DR_ANIL_NAME}: <span className="font-bold text-white">{DR_ANIL_REGD}</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${CLINIC_PHONE}`}
                className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-black py-3.5 rounded-2xl text-center text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Phone className="w-4 h-4" /> Call Clinic (+91 {CLINIC_PHONE})
              </a>
              <button
                onClick={() => openWhatsAppBooking()}
                className="whatsapp-pulse flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-3.5 rounded-2xl text-center text-sm flex items-center justify-center gap-2 shadow-xl transition"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OUR CLINIC BRANCHES SECTION */}
      <section id="branches" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4 mb-12">
          <div className="sapphire-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <MapPin className="w-4 h-4 text-blue-900" />
            <span>MULTIPLE LOCATIONS TO SERVE YOU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Visit Our Clinic Branches
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            We operate two state-of-the-art homeopathic clinics offering comprehensive care for all your health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* BRANCH 1 - VIRAR WEST */}
          <div className="maximalist-card bg-white rounded-3xl border-2 border-slate-200/90 overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300 group">
            {/* Branch Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="gold-badge text-xs font-black px-3 py-1 rounded-full">
                    MAIN BRANCH
                  </span>
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2 text-amber-300">
                  Virar West
                </h3>
                <p className="text-sm text-slate-300 font-bold">
                  Dr. Vaishnavi Sawant – Dr. Sawant's Advanced Homeopathic Clinic
                </p>
              </div>
            </div>

            {/* Branch Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-1">Location</div>
                  <div className="text-slate-600 leading-relaxed">
                    Shop No 1, Shantinath Plaza CHS, Virar West, Maharashtra 401303
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-1">Consulting Hours</div>
                  <div className="text-slate-600">{CONSULTING_HOURS}</div>
                  <div className="text-rose-600 font-black text-xs mt-1">{CLOSED_DAY}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 mb-1">Contact</div>
                  <a href={`tel:${CLINIC_PHONE}`} className="text-blue-600 hover:text-blue-800 font-bold hover:underline">
                    +91 {CLINIC_PHONE}
                  </a>
                  <span className="text-slate-500 mx-1">/</span>
                  <a href={`tel:${CLINIC_PHONE_SECONDARY}`} className="text-blue-600 hover:text-blue-800 font-bold hover:underline">
                    +91 {CLINIC_PHONE_SECONDARY}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://share.google/clOAttqXBirdkejWj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition group-hover:scale-105"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://share.google/clOAttqXBirdkejWj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white hover:bg-blue-50 text-blue-900 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 border-2 border-blue-200 transition"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* BRANCH 2 - KANDIVALI WEST */}
          <div className="maximalist-card bg-white rounded-3xl border-2 border-slate-200/90 overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300 group">
            {/* Branch Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="emerald-badge text-xs font-black px-3 py-1 rounded-full">
                    BRANCH
                  </span>
                  <MapPin className="w-6 h-6 text-amber-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2 text-amber-300">
                  Kandivali West
                </h3>
                <p className="text-sm text-slate-200 font-bold">
                  Prakriti Advanced Homeopathic Clinic
                </p>
              </div>
            </div>

            {/* Branch Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-1">Location</div>
                  <div className="text-slate-600 leading-relaxed">
                    {KANDIVALI_ADDRESS}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 mb-1">Contact</div>
                  <a href={`tel:${KANDIVALI_PHONE}`} className="text-emerald-600 hover:text-emerald-800 font-bold hover:underline">
                    +91 {KANDIVALI_PHONE}
                  </a>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm">
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-emerald-900">
                    <div className="font-black text-xs uppercase tracking-wider mb-1">Professional Care</div>
                    <div className="text-xs leading-relaxed">
                      Comprehensive homeopathic treatments in a modern clinical setting
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.app.goo.gl/ziDyuLZmhaveXNBL7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition group-hover:scale-105"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://maps.app.goo.gl/ziDyuLZmhaveXNBL7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white hover:bg-emerald-50 text-emerald-900 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 border-2 border-emerald-200 transition"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MOBILE STICKY ACTION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/97 backdrop-blur-md border-t-2 border-amber-300/60 px-4 py-2.5 flex items-center justify-between gap-2 shadow-[0_-5px_25px_rgba(30,58,138,0.12)]">
        <a
          href={`tel:${CLINIC_PHONE}`}
          data-testid={HOME.mobileCallBtn}
          className="flex-1 py-2.5 bg-blue-50 text-blue-900 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 border border-blue-100 active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-blue-800" />
          <span>Call</span>
        </a>
        {/* Instagram — colorful */}
        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-btn flex-1 py-2.5 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <Instagram className="w-4 h-4" />
          <span>Instagram</span>
        </a>
        <button
          onClick={() => openWhatsAppBooking()}
          data-testid={HOME.mobileBookBtn}
          className="whatsapp-pulse flex-1 py-2.5 bg-emerald-600 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-14 border-t-2 border-amber-400/30 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="font-serif font-black text-xl text-white">डॉ. सावंत</span>
            <OfficialLotusSymbol className="h-10 w-auto" isDark={true} />
            <span className="font-black text-xl text-white">Dr. Sawant's</span>
          </div>
          <div className="text-amber-400 font-black text-sm sm:text-base tracking-widest uppercase">
            ADVANCED HOMEOPATHIC CLINIC &bull; CLINICAL COSMETOLOGY
          </div>
          <div className="text-xs text-indigo-300 font-black tracking-widest uppercase bg-indigo-950/60 max-w-md mx-auto py-1.5 rounded-full border border-indigo-800/40">
            4 DEPARTMENTS: HOMEOPATHY | SKIN &amp; FACE | HAIR | LASER
          </div>
          <div className="text-amber-300 text-xs font-bold tracking-wide">
            {YEARS_PRACTICE} Clinical Practice &middot; {PATIENTS_TREATED} Treated Patients &middot; Virar West
          </div>
          <div className="text-slate-400 text-xs">
            {DR_VAISHNAVI_NAME} ({DR_VAISHNAVI_REGD}) &bull; {DR_ANIL_NAME} ({DR_ANIL_REGD})
          </div>
          <p className="max-w-2xl mx-auto text-slate-300 font-medium">
            {ADDRESS} &bull; Consulting Hours: {CONSULTING_HOURS} &bull; <span className="text-rose-400 font-black">{CLOSED_DAY}</span>
          </p>
          <p className="text-slate-300 font-semibold">
            Phone / WhatsApp: <a href={`tel:${CLINIC_PHONE}`} className="text-amber-300 hover:underline font-bold">+91 {CLINIC_PHONE}</a> / +91 {CLINIC_PHONE_SECONDARY}
          </p>
          <div className="flex justify-center items-center gap-4 py-1">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span>@drsawant_and_drparab</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-500 italic max-w-3xl mx-auto pt-2">
            Medical Disclaimer: Information on this website is for educational purposes and should not substitute professional medical diagnosis. For emergency health situations, consult an emergency physician immediately.
          </p>
          <div className="pt-4 text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} Dr. Sawant's Advanced Homeopathic Clinic &middot; All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App font-sans text-slate-900 bg-white min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

