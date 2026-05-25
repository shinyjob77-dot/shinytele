const patientPortalUrl =
  "https://accounts.charmtracker.com/signin?hide_signup=true&hide_secure=true&hide_gsignup=true&servicename=charmphr&serviceurl=https%3A%2F%2Fphr2.charmtracker.com%2Fmain.do";

const bookVisitLink = "#book";

const standardSafetyText =
  "TeleDNPnow is for non-emergency medical concerns only. If you have chest pain, severe shortness of breath, stroke symptoms, severe allergic reaction, suicidal thoughts, or any life-threatening symptom, call 911 or go to the nearest emergency room immediately.";

export const teleDnpVisitTypes = [
  { name: "Brief sick visit", price: "$40", keywords: "sick visit quick care cold flu cough sore throat sinus uri uti rash minor illness" },
  { name: "Initial primary care telehealth visit", price: "$60", keywords: "primary care new patient general health chronic care follow up" },
  { name: "Follow-up visit", price: "$40", keywords: "follow up follow-up recheck ongoing care" },
  { name: "Weight loss initial consult", price: "$70", keywords: "weight loss obesity management glp-1 semaglutide tirzepatide lifestyle" },
  { name: "Medication refill visit", price: "$30", keywords: "medication refill prescription refill routine medicine non-controlled" },
];

export const teleDnpWorkingHours = [
  { day: "Sunday", hours: "11:00 AM-6:00 PM" },
  { day: "Monday", hours: "Holiday / Closed" },
  { day: "Tuesday", hours: "Holiday / Closed" },
  { day: "Wednesday", hours: "9:00 AM-6:00 PM" },
  { day: "Thursday", hours: "9:00 AM-6:00 PM" },
  { day: "Friday", hours: "9:00 AM-6:00 PM" },
  { day: "Saturday", hours: "9:00 AM-6:00 PM" },
];

const workingHoursText = teleDnpWorkingHours
  .map((item) => `${item.day}: ${item.hours}`)
  .join("; ");

export const teleDnpServiceParameters = [
  {
    service: "Quick sick visits",
    url: "/quick-sick-visits.html",
    keywords:
      "quick sick visit sick visit same day same-day cough cold flu sinus sore throat allergies rash uti urinary symptoms medication refill nausea diarrhea minor illness urgent concern",
  },
  {
    service: "Primary care",
    url: "/primary_care.html",
    keywords:
      "primary care general health preventive care wellness hypertension diabetes asthma cholesterol medication review fatigue headache dizziness follow up",
  },
  {
    service: "Women's health",
    url: "/Women_health.html",
    keywords:
      "women womens health birth control contraception menstrual period menopause vaginal symptoms yeast infection bv urinary symptoms wellness",
  },
  {
    service: "Chronic care",
    url: "/chronic_care.html",
    keywords:
      "chronic care chronic condition hypertension diabetes high cholesterol asthma thyroid gerd medication monitoring home monitoring",
  },
  {
    service: "Medication refills",
    url: "/medication_refills.html",
    keywords:
      "medication refill prescription refill non-controlled blood pressure diabetes cholesterol asthma inhaler gerd allergy routine refill",
  },
  {
    service: "Lab review",
    url: "/lab_leview.html",
    keywords:
      "lab review results blood work abnormal high low a1c cholesterol thyroid cbc cmp urinalysis imaging report diagnostic test",
  },
  {
    service: "Mental health screening",
    url: "/mental_health_screening.html",
    keywords:
      "mental health screening anxiety stress low mood depression sleep burnout concentration guidance referral 988 crisis",
  },
  {
    service: "Skin and dermatology",
    url: "/skin_dermatology.html",
    keywords:
      "skin dermatology rash acne itching eczema fungal rash ringworm cellulitis skin infection bites redness irritation photo review",
  },
  {
    service: "Sexual health / STI",
    url: "/sexual_health_sti.html",
    keywords:
      "sexual health sti std exposure testing burning discharge itching genital rash partner exposure private confidential",
  },
  {
    service: "Medical weight loss",
    url: "/medical_weight_loss_options.html",
    keywords:
      "medical weight loss obesity management glp-1 semaglutide tirzepatide nutrition lifestyle metabolism bmi weight scale",
  },
];

export const teleDnpQuickAnswers = [
  {
    title: "Greeting",
    keywords: [
      "hi",
      "hello",
      "hey",
      "help",
      "start",
      "question",
      "questions",
      "info",
      "information",
      "support",
      "good morning",
      "good afternoon",
      "good evening",
      "thanks",
      "thank you",
      "ok",
      "okay",
      "yes",
      "no",
    ],
    phrases: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "can you help",
      "i need help",
      "need help",
      "help me",
      "what can you do",
      "what do you do",
      "tell me more",
      "more information",
      "i have a question",
      "i want to ask a question",
      "thank you",
      "thanks",
    ],
    answer:
      "Hi, welcome to TeleDNPnow. I can help with services, self-pay prices, booking, the patient portal, contact information, and general website articles. Please do not enter private medical details here.",
    links: [
      { label: "Book Visit", url: bookVisitLink },
      { label: "Patient Portal Login", url: patientPortalUrl },
    ],
  },
  {
    title: "Book a telehealth visit",
    keywords: [
      "book",
      "booking",
      "schedule",
      "appointment",
      "calendar",
      "visit",
      "same day",
      "same-day",
      "today",
      "available",
      "availability",
      "open appointment",
      "make appointment",
      "set appointment",
      "reserve",
      "tele visit",
      "televisit",
      "virtual visit",
      "see provider",
      "see doctor",
      "see nurse practitioner",
      "need visit",
      "want appointment",
      "open calendar",
      "calendar not opening",
      "book now",
      "booking link",
    ],
    phrases: [
      "how do i book",
      "how can i schedule",
      "book a visit",
      "schedule a visit",
      "same day appointment",
      "need appointment today",
      "i need a visit",
      "i want to see the provider",
      "how soon can i be seen",
      "can i be seen today",
      "open the calendar",
    ],
    answer:
      "You can book a TeleDNPnow telehealth visit online using the Book Visit button. TeleDNPnow offers convenient virtual visits for Arizona patients for non-emergency concerns.",
    links: [{ label: "Book Visit", url: bookVisitLink }],
  },
  {
    title: "Patient portal",
    keywords: [
      "portal",
      "patient portal",
      "register",
      "registration",
      "login",
      "sign in",
      "signin",
      "charm",
      "charmhealth",
      "charm health",
      "charmtracker",
      "charm tracker",
      "phr",
      "ehr",
      "forms",
      "intake",
      "questionnaire",
      "secure message",
      "patient account",
      "account",
      "password",
      "forgot password",
      "reset password",
      "new patient",
      "existing patient",
      "sign up",
      "signup",
      "paperwork",
      "pre appointment",
      "pre-appointment",
      "questionnaires",
    ],
    phrases: [
      "where do i login",
      "how do i register",
      "patient portal login",
      "charmhealth login",
      "fill intake form",
      "complete forms",
      "i need to login",
      "where is the portal",
      "how do i fill forms",
      "new patient registration",
    ],
    answer:
      "TeleDNPnow uses CharmHealth/CharmTracker as the secure EHR patient portal for registration, visit information, forms, and patient communication.",
    links: [
      {
        label: "Patient Portal Login",
        url: patientPortalUrl,
      },
    ],
  },
  {
    title: "Self-pay prices",
    keywords: [
      "price",
      "prices",
      "pricing",
      "cost",
      "costs",
      "how much",
      "self pay",
      "self-pay",
      "cash",
      "cash pay",
      "no insurance",
      "without insurance",
      "uninsured",
      "fee",
      "fees",
      "payment",
      "affordable",
      "cheap",
      "credit card",
      "card payment",
      "bluefin",
      "pay",
      "pay online",
      "card",
      "credit",
      "debit",
      "invoice",
      "bill",
      "billing",
      "charge",
      "charges",
    ],
    phrases: [
      "services pricing",
      "service pricing",
      "how much is a visit",
      "how much does it cost",
      "do i need insurance",
      "no insurance",
      "self pay price",
      "cash pay price",
      "how much for sick visit",
      "how much for refill",
      "how much for weight loss",
      "what are your prices",
      "what is the fee",
    ],
    answer:
      "TeleDNPnow offers transparent self-pay prices. Brief sick visit: $40. Initial primary care telehealth visit: $60. Follow-up visit: $40. Weight loss initial consult: $70. Medication refill visit: $30.",
  },
  {
    title: "Services",
    keywords: [
      "service",
      "services",
      "what do you treat",
      "what can you help",
      "telehealth",
      "telemedicine",
      "virtual care",
      "online care",
      "nurse practitioner",
      "provider",
      "np",
      "dnp",
      "primary care",
      "urgent",
      "quick care",
      "sick visit",
      "women",
      "skin",
      "lab",
      "weight loss",
      "sti",
      "std",
      "chronic",
      "uti",
      "std testing",
      "rash",
      "acne",
      "lab results",
      "blood pressure",
      "diabetes",
      "birth control",
      "menopause",
      "sinus",
      "cold",
      "flu",
      "weight",
      "obesity",
    ],
    phrases: [
      "what services do you offer",
      "what can telednpnow help with",
      "what do you see patients for",
      "do you provide telehealth",
      "can you help with uti",
      "can you help with rash",
      "can you help with weight loss",
      "can you help with medication refill",
      "can you help with lab results",
    ],
    answer:
      "TeleDNPnow offers sick visits, primary care follow-up, chronic care support, medication refill visits, women's health, skin concerns, lab review, sexual health/STI concerns, mental health screening, and medical weight loss management.",
    links: [{ label: "Services", url: "#services" }],
  },
  {
    title: "Medication refills",
    keywords: [
      "refill",
      "refills",
      "prescription",
      "prescriptions",
      "medication",
      "medications",
      "medicine",
      "non controlled",
      "non-controlled",
      "controlled",
      "controlled substance",
      "opioid",
      "narcotic",
      "pain medication",
      "stimulant",
      "behavioral health medication",
      "inhaler",
      "blood pressure medication",
      "diabetes medication",
      "cholesterol medication",
      "gerd medication",
      "allergy medication",
    ],
    phrases: [
      "can i get a refill",
      "do you refill medication",
      "prescription refill",
      "controlled substances",
      "pain medication",
    ],
    answer:
      "TeleDNPnow can review routine non-controlled medication refill requests when clinically appropriate. TeleDNPnow does not prescribe narcotic pain medications, controlled substances, chronic opioid therapy, or certain behavioral health medications through routine telehealth visits.",
    links: [{ label: "Medication Refill Details", url: "/medication_refills.html" }],
  },
  {
    title: "Arizona patients",
    keywords: [
      "arizona",
      "az",
      "state",
      "location",
      "where",
      "serve",
      "service area",
      "florence",
      "phoenix",
      "tucson",
      "mesa",
      "scottsdale",
      "maricopa",
      "pinal",
      "pima",
      "out of state",
      "california",
      "texas",
      "nevada",
    ],
    phrases: [
      "do you see arizona patients",
      "what state do you serve",
      "can i use telehealth outside arizona",
      "i live in arizona",
    ],
    answer:
      "TeleDNPnow is currently accepting Arizona patients only at this time. Patients should be physically located in Arizona during the telehealth visit.",
  },
  {
    title: "Emergency warning",
    keywords: [
      "emergency",
      "911",
      "er",
      "emergency room",
      "urgent",
      "urgent care",
      "chest pain",
      "stroke",
      "suicidal",
      "suicide",
      "self harm",
      "severe shortness",
      "severe breathing",
      "shortness of breath",
      "blue lips",
      "fainting",
      "confusion",
      "life threatening",
      "severe allergic reaction",
      "anaphylaxis",
      "severe abdominal pain",
      "uncontrolled bleeding",
    ],
    phrases: [
      "should i call 911",
      "is this an emergency",
      "chest pain",
      "stroke symptoms",
      "severe shortness of breath",
      "suicidal thoughts",
    ],
    answer:
      standardSafetyText,
  },
  {
    title: "Contact",
    keywords: [
      "phone",
      "email",
      "contact",
      "call",
      "number",
      "telephone",
      "reach",
      "message",
      "support",
      "customer service",
      "care@telednpnow.org",
      "480",
      "626",
      "5571",
    ],
    phrases: [
      "what is your phone number",
      "how can i contact",
      "what is your email",
      "call telednpnow",
    ],
    answer:
      "You can contact TeleDNPnow by phone at (480) 626-5571 or by email at care@telednpnow.org.",
    links: [
      { label: "Call", url: "tel:+14806265571" },
      { label: "Email", url: "mailto:care@telednpnow.org" },
    ],
  },
  {
    title: "Working hours",
    keywords: [
      "hours",
      "hour",
      "working hours",
      "business hours",
      "open",
      "opening",
      "opening time",
      "close",
      "closing",
      "closing time",
      "available",
      "availability",
      "today",
      "tomorrow",
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "weekend",
      "weekday",
      "holiday",
    ],
    phrases: [
      "what time are you open",
      "what are your hours",
      "opening time",
      "business hours",
      "are you open today",
      "are you open on sunday",
      "are you open on saturday",
      "when do you close",
      "when are appointments available",
    ],
    answer: `TeleDNPnow - Telemedicine facility working hours are: ${workingHoursText}. Visits are by appointment and availability may depend on the schedule.`,
    links: [{ label: "Book Visit", url: bookVisitLink }],
  },
  {
    title: "Provider information",
    keywords: [
      "provider",
      "doctor",
      "dr shiny",
      "shiny",
      "shiny job",
      "shinyjob",
      "dr shiny job",
      "dnp",
      "fnp-c",
      "family nurse practitioner",
      "board certified",
      "experience",
      "about",
      "about me",
      "founder",
    ],
    phrases: [
      "who is the provider",
      "who is shiny",
      "who is shiny job",
      "who is dr shiny",
      "who is dr shiny job",
      "who will see me",
      "about dr shiny job",
      "is the provider board certified",
    ],
    answer:
      "Care is provided by Shiny Job, DNP, FNP-C, a board-certified Family Nurse Practitioner and founder of TeleDNPnow with experience in primary care, chronic care, urgent care, correctional healthcare, and telehealth.",
    links: [{ label: "About Me", url: "/about_me.html" }],
  },
  {
    title: "Privacy and security",
    keywords: [
      "privacy",
      "hipaa",
      "secure",
      "security",
      "private",
      "confidential",
      "phi",
      "medical information",
      "payment security",
      "bluefin",
      "charmhealth",
    ],
    phrases: [
      "is this secure",
      "is it hipaa compliant",
      "do you store my card",
      "privacy policy",
    ],
    answer:
      "TeleDNPnow uses secure clinical systems including CharmHealth/CharmTracker for patient portal and EHR-related communication. Card numbers are not collected or stored directly on the website.",
    links: [{ label: "Privacy Policy", url: "/privacy-policy.html" }],
  },
  {
    title: "Terms and policies",
    keywords: [
      "terms",
      "terms of service",
      "policy",
      "policies",
      "disclaimer",
      "telemedicine disclaimer",
      "limitations",
      "legal",
    ],
    phrases: [
      "terms of service",
      "telehealth disclaimer",
      "telemedicine limitations",
      "what are your policies",
    ],
    answer:
      "TeleDNPnow provides telehealth services for non-emergency medical concerns only. Telehealth has limitations and may not be appropriate for every condition. Some concerns may require in-person care, labs, imaging, specialist referral, urgent care, or emergency care.",
    links: [
      { label: "Terms of Service", url: "/terms-of-service.html" },
      { label: "Privacy Policy", url: "/privacy-policy.html" },
    ],
  },
  ...teleDnpServiceParameters.map((service) => ({
    title: service.service,
    keywords: service.keywords.split(" "),
    phrases: [service.service.toLowerCase()],
    answer: `${service.service} is available through TeleDNPnow when telehealth is clinically appropriate. This information is general only and does not replace a provider visit.`,
    links: [{ label: `${service.service} Details`, url: service.url }],
  })),
];

export const teleDnpArticleLibrary = [
  ["AWV and When Telehealth Can Help", "/article/AWV.html", "annual wellness visit medicare preventive care health risk assessment"],
  ["Asthma and When Telehealth Can Help", "/article/Asthma.html", "asthma wheezing inhaler respiratory breathing"],
  ["COVID-19 and When Telehealth Can Help", "/article/COVID_19.html", "covid covid-19 testing antiviral paxlovid"],
  ["URIs and When Telehealth Can Help", "/article/URIs.html", "uri upper respiratory infection cold cough congestion"],
  ["Allergies and When Telehealth Can Help", "/article/allergies.html", "allergy allergies seasonal allergic rhinitis hives"],
  ["Antibiotics and When Telehealth Can Help", "/article/antibiotics.html", "antibiotics infection bacterial viral resistance"],
  ["Antidepressants and When Telehealth Can Help", "/article/antidepressants.html", "antidepressants ssri depression medication"],
  ["Antihistamines and When Telehealth Can Help", "/article/antihistamines.html", "antihistamine allergy itching hives"],
  ["Antivirals and When Telehealth Can Help", "/article/antivirals.html", "antiviral flu covid herpes"],
  ["Anxiety Medication and When Telehealth Can Help", "/article/anxiety_medication.html", "anxiety medication ssri buspirone"],
  ["Arthritis and When Telehealth Can Help", "/article/arthritis.html", "arthritis joint pain osteoarthritis"],
  ["What Is a Migraine?", "/article/article_migraine.html", "migraine headache aura triggers"],
  ["Back Pain and When Telehealth Can Help", "/article/back_pain.html", "back pain low back strain sciatica"],
  ["Bacterial Vaginosis and When Telehealth Can Help", "/article/bacterial_vaginosis.html", "bacterial vaginosis bv vaginal odor discharge"],
  ["Beta Blockers and When Telehealth Can Help", "/article/beta_blockers.html", "beta blocker blood pressure heart rate metoprolol propranolol"],
  ["Birth Control and When Telehealth Can Help", "/article/birth+control.html", "birth control contraception refill emergency contraception"],
  ["Boils and When Telehealth Can Help", "/article/boils.html", "boil furuncle abscess skin infection"],
  ["Cellulitis and When Telehealth Can Help", "/article/cellulitis.html", "cellulitis red swollen skin infection"],
  ["Chronic Condition Management and When Telehealth Can Help", "/article/chronic_condition_management.html", "chronic condition management diabetes hypertension follow up"],
  ["Cold & Flu and When Telehealth Can Help", "/article/cold_flu.html", "cold flu cough fever sore throat"],
  ["Contact Dermatitis and When Telehealth Can Help", "/article/contact_dermatitis.html", "contact dermatitis poison ivy itchy rash"],
  ["Dandruff and When Telehealth Can Help", "/article/dandruff.html", "dandruff flaky itchy scalp seborrheic dermatitis"],
  ["Diabetes Follow-Up by Telehealth", "/article/diabetes_follow-up_by_telehealth.html", "diabetes follow up a1c glucose blood sugar"],
  ["Diarrhea and When Telehealth Can Help", "/article/diarrhea.html", "diarrhea dehydration stomach illness"],
  ["Eczema and When Telehealth Can Help", "/article/eczema.html", "eczema atopic dermatitis itchy dry skin rash"],
  ["Erectile Dysfunction and When Telehealth Can Help", "/article/erectile_dysfunction.html", "erectile dysfunction ed male sexual health"],
  ["Food Poisoning and When Telehealth Can Help", "/article/food_poisoning.html", "food poisoning vomiting diarrhea nausea"],
  ["Gynecology and When Telehealth Can Help", "/article/gynecology.html", "gynecology women vaginal menstrual birth control sti"],
  ["Hair Loss and When Telehealth Can Help", "/article/hair_loss.html", "hair loss alopecia thinning hair"],
  ["Hemorrhoids and When Telehealth Can Help", "/article/hemorrhoids.html", "hemorrhoids rectal bleeding constipation"],
  ["High Blood Pressure and Home Monitoring", "/article/high_blood_pressure.html", "high blood pressure hypertension home monitoring bp"],
  ["High Blood Pressure Follow-Up", "/article/high_blood_pressure_follow_up.html", "blood pressure follow up hypertension medication"],
  ["Hypertension and When Telehealth Can Help", "/article/hypertension.html", "hypertension high blood pressure bp medication refill"],
  ["Lab Results: What Do They Mean?", "/article/lab_results_what_do_they_mean.html", "lab results abnormal blood work a1c cholesterol thyroid"],
  ["Medication Refills by Telehealth", "/article/medication_refills.html", "medication refill prescription refill telehealth"],
  ["Menopause and When Telehealth Can Help", "/article/menopause.html", "menopause perimenopause hot flashes night sweats"],
  ["Migraine and When Telehealth Can Help", "/article/migraine.html", "migraine headache symptoms medication review"],
  ["Premature Ejaculation and When Telehealth Can Help", "/article/premature_ejaculation.html", "premature ejaculation male sexual health"],
  ["Rash and When Telehealth Can Help", "/article/rash.html", "rash itchy allergic eczema heat rash"],
  ["Rash, Acne, and Skin Concerns", "/article/rash_acne_and_skin_concerns.html", "rash acne skin itching redness irritation"],
  ["Ringworm and When Telehealth Can Help", "/article/ringworm.html", "ringworm tinea fungal rash athlete foot"],
  ["Rosacea and When Telehealth Can Help", "/article/rosacea.html", "rosacea facial redness flare"],
  ["Sinus Infection and When Telehealth Can Help", "/article/sinus_infection.html", "sinus infection sinusitis congestion pressure"],
  ["Skin Infections and When Telehealth Can Help", "/article/skin_infections.html", "skin infection cellulitis infected bite impetigo fungal"],
  ["Strep Throat and When Telehealth Can Help", "/article/strep_throat.html", "strep throat sore throat strep test antibiotics"],
  ["Type 2 Diabetes and When Telehealth Can Help", "/article/type2_diabetes.html", "type 2 diabetes blood sugar a1c medication"],
  ["UTI Symptoms and When Telehealth Can Help", "/article/urinary_tract_infection.html", "uti urinary tract infection burning urination frequency urgency"],
  ["Urinary Tract Infections and When Telehealth Can Help", "/article/urinary_tract_infections.html", "urinary tract infection uti bladder infection"],
  ["Weight Loss Options and GLP-1 Medications", "/article/weight_loss_options_and_GLP-1.html", "weight loss glp-1 semaglutide tirzepatide obesity"],
  ["When to Go to Urgent Care vs Telehealth", "/article/when_to_go_to_urgent_care_vs_telehealth.html", "urgent care vs telehealth emergency warning signs"],
  ["Yeast Infections and When Telehealth Can Help", "/article/yeast_infections.html", "yeast infection vaginal itching candidiasis"],
].map(([title, url, keywords]) => ({ title, url, keywords }));

const normalizeText = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toKeywordList = (keywords) => {
  if (Array.isArray(keywords)) return keywords;
  if (typeof keywords === "string") return keywords.split(/\s+/);
  return [];
};

const scoreEntry = (question, entry) => {
  const normalizedQuestion = normalizeText(question);
  const words = normalizedQuestion.split(" ").filter((word) => word.length > 2);
  const keywords = toKeywordList(entry.keywords);
  const haystack = normalizeText(
    `${entry.title} ${keywords.join(" ")} ${(entry.phrases || []).join(" ")} ${entry.answer || ""}`,
  );

  const phraseScore = (entry.phrases || []).reduce((score, phrase) => {
    if (normalizedQuestion.includes(normalizeText(phrase))) return score + 8;
    return score;
  }, 0);

  const keywordScore = keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) return score;
    if (normalizedQuestion === normalizedKeyword) return score + 8;
    if (normalizedQuestion.includes(normalizedKeyword)) return score + 4;
    return score;
  }, 0);

  const wordScore = words.reduce((score, word) => {
    if (haystack.includes(word)) return score + 1;
    return score;
  }, 0);

  return phraseScore + keywordScore + wordScore;
};

export function findChatKnowledgeAnswer(question) {
  const normalizedQuestion = normalizeText(question);

  if (!normalizedQuestion) return null;

  const emergency = teleDnpQuickAnswers.find((entry) => entry.title === "Emergency warning");
  if (
    [
      "chest pain",
      "stroke",
      "suicidal",
      "suicide",
      "self harm",
      "severe shortness",
      "severe breathing",
      "blue lips",
      "fainting",
      "911",
      "emergency",
    ].some(
      (term) => normalizedQuestion.includes(term),
    )
  ) {
    return { type: "quick", ...emergency };
  }

  const quickMatches = teleDnpQuickAnswers
    .map((entry) => ({ ...entry, score: scoreEntry(question, entry) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (quickMatches[0]?.score >= 2) {
    return { type: "quick", ...quickMatches[0] };
  }

  const articleMatches = teleDnpArticleLibrary
    .map((entry) => ({ ...entry, score: scoreEntry(question, entry) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (articleMatches.length > 0) {
    return {
      type: "articles",
      title: "Helpful TeleDNPnow articles",
      answer:
        "I found TeleDNPnow education articles that may help. These are general education only and do not replace a telehealth visit or emergency care.",
      links: articleMatches.map((article) => ({
        label: article.title.replace(" | TeleDNPnow", ""),
        url: article.url,
      })),
    };
  }

  return null;
}

export const teleDnpKnowledgeContext = [
  `Safety: ${standardSafetyText}`,
  `Working hours: ${workingHoursText}`,
  `Visit prices: ${teleDnpVisitTypes
    .map((visit) => `${visit.name} ${visit.price}`)
    .join("; ")}`,
  ...teleDnpServiceParameters.map(
    (service) => `${service.service}: ${service.keywords}. URL: ${service.url}`,
  ),
  ...teleDnpQuickAnswers.map((entry) => `${entry.title}: ${entry.answer}`),
  ...teleDnpArticleLibrary.map(
    (article) => `${article.title}: ${article.keywords}. URL: ${article.url}`,
  ),
].join("\n");
