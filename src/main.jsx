import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ClipboardList,
  CreditCard,
  FileText,
  HeartPulse,
  Laptop,
  LockKeyhole,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  Target,
  UserRound,
  Video,
} from "lucide-react";
import heroImage from "./assets/telemedicine-hero.png";
import "./styles.css";

const charmHealthLinks = {
  booking: "https://phr.charmtracker.com/",
  portal: "https://phr.charmtracker.com/",
  intake: "https://phr.charmtracker.com/",
  payment: "https://phr.charmtracker.com/",
};

const services = [
  {
    icon: Stethoscope,
    title: "Primary Care",
    text: "Everyday visits, medication refills, lab review, and preventive care from home.",
  },
  {
    icon: HeartPulse,
    title: "Chronic Care",
    text: "Support for blood pressure, diabetes, asthma, thyroid care, and ongoing wellness goals.",
  },
  {
    icon: MessageCircle,
    title: "Quick Sick Visits",
    text: "Care for allergies, sinus symptoms, rashes, UTIs, mild infections, and common concerns.",
  },
];

const steps = [
  "Choose a visit time",
  "Meet securely by video",
  "Receive your care plan",
];

const weightLossFeatures = [
  {
    icon: ClipboardList,
    title: "Health Review",
    text: "Review your history, medications, goals, lifestyle, and risk factors before building a plan.",
  },
  {
    icon: Target,
    title: "Personalized Plan",
    text: "Get practical nutrition, activity, sleep, and behavior guidance tailored to your starting point.",
  },
  {
    icon: Activity,
    title: "Ongoing Support",
    text: "Track progress with follow-up visits and plan adjustments that keep your care realistic.",
  },
];

const depressionQuestions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble sleeping or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself",
  "Trouble concentrating",
  "Moving or speaking slowly, or being fidgety",
  "Thoughts that you would be better off dead or hurting yourself",
];

const medicationOptions = [
  "Metformin",
  "Lisinopril",
  "Losartan",
  "Amlodipine",
  "Hydrochlorothiazide",
  "Atorvastatin",
  "Levothyroxine",
  "Albuterol inhaler",
  "Omeprazole",
  "Sertraline",
  "Fluoxetine",
  "Bupropion",
  "Gabapentin",
  "Insulin",
  "Semaglutide",
  "Tirzepatide",
  "Phentermine",
  "Topiramate",
  "Other",
];

const dosageOptions = [
  "2.5 mg",
  "5 mg",
  "10 mg",
  "20 mg",
  "25 mg",
  "50 mg",
  "75 mg",
  "100 mg",
  "150 mg",
  "200 mg",
  "250 mg",
  "300 mg",
  "400 mg",
  "500 mg",
  "600 mg",
  "700 mg",
  "800 mg",
  "850 mg",
  "900 mg",
  "1000 mg",
  "1 tablet",
  "2 tablets",
  "1 capsule",
  "1 injection",
  "Other / type below",
];

const medicationTimeOptions = [
  "Morning",
  "Afternoon",
  "Evening",
  "Bedtime",
  "Once daily",
  "Twice daily",
  "Three times daily",
  "With meals",
  "Before meals",
  "After meals",
  "Weekly",
  "As needed",
  "Other / type below",
];

const allergenOptions = [
  "Penicillin",
  "Sulfa drugs",
  "Aspirin",
  "Ibuprofen / NSAIDs",
  "Codeine",
  "Morphine",
  "Latex",
  "Iodine / contrast dye",
  "Shellfish",
  "Peanuts",
  "Tree nuts",
  "Eggs",
  "Milk",
  "Soy",
  "Wheat",
  "Other",
];

const allergyReactionOptions = ["Mild", "Moderate", "Anaphylactic"];

const pharmacyOptions = [
  "CVS Pharmacy - Arizona",
  "Walgreens - Arizona",
  "Walmart Pharmacy - Arizona",
  "Fry's Pharmacy - Arizona",
  "Safeway Pharmacy - Arizona",
  "Albertsons Pharmacy - Arizona",
  "Bashas' Pharmacy - Arizona",
  "Costco Pharmacy - Arizona",
  "Sam's Club Pharmacy - Arizona",
  "CVS Pharmacy - Nevada",
  "Walgreens - Nevada",
  "Walmart Pharmacy - Nevada",
  "Smith's Pharmacy - Nevada",
  "Albertsons Pharmacy - Nevada",
  "Vons Pharmacy - Nevada",
  "Costco Pharmacy - Nevada",
  "Sam's Club Pharmacy - Nevada",
  "CVS Pharmacy - New Mexico",
  "Walgreens - New Mexico",
  "Walmart Pharmacy - New Mexico",
  "Smith's Pharmacy - New Mexico",
  "Albertsons Market Pharmacy - New Mexico",
  "Costco Pharmacy - New Mexico",
  "Sam's Club Pharmacy - New Mexico",
];

const pharmacyAddressOptions = [
  "Phoenix, AZ 85001",
  "Scottsdale, AZ 85251",
  "Mesa, AZ 85201",
  "Tempe, AZ 85281",
  "Glendale, AZ 85301",
  "Tucson, AZ 85701",
  "Flagstaff, AZ 86001",
  "Las Vegas, NV 89101",
  "Henderson, NV 89012",
  "North Las Vegas, NV 89030",
  "Reno, NV 89501",
  "Sparks, NV 89431",
  "Carson City, NV 89701",
  "Albuquerque, NM 87101",
  "Santa Fe, NM 87501",
  "Las Cruces, NM 88001",
  "Rio Rancho, NM 87124",
  "Roswell, NM 88201",
  "Farmington, NM 87401",
];

const portalActions = [
  {
    icon: CalendarCheck,
    title: "Book a Visit",
    text: "Request a telemedicine appointment for primary care, sick visits, follow-ups, or weight loss care.",
    action: "Start Booking",
    href: "#book",
  },
  {
    icon: FileText,
    title: "Complete Intake",
    text: "Share your visit reason, medication list, allergies, and medical history before your appointment.",
    action: "Open Intake",
    href: "#intake",
  },
  {
    icon: MessageCircle,
    title: "Patient Portal",
    text: "Access visit preparation steps, messages, forms, and follow-up instructions from one place.",
    action: "Portal Access",
    href: "#portal",
  },
  {
    icon: Video,
    title: "Start Telehealth Visit",
    text: "Enter the secure Doxy.me waiting room when it is time for your video appointment.",
    action: "Open Doxy.me",
    href: "https://doxy.me/telednpnow",
    external: true,
  },
  {
    icon: CreditCard,
    title: "Pay Invoice",
    text: "Open the secure CharmHealth/Bluefin payment portal after your invoice or payment link is ready.",
    action: "Pay by Card",
    href: charmHealthLinks.payment,
    external: true,
  },
];

const faqs = [
  {
    question: "What services does TeleDNP Now offer?",
    answer:
      "TeleDNP Now offers virtual primary care, sick visits, chronic care follow-up, medication refill visits, patient intake, booking support, and medical weight loss care.",
  },
  {
    question: "Who provides care at TeleDNP Now?",
    answer:
      "Care is provided by Dr. Shiny Job, DNP, FNP-C, a Nurse Practitioner offering secure telemedicine visits.",
  },
  {
    question: "Can I book a weight loss appointment online?",
    answer:
      "Yes. Patients can request a telemedicine appointment for the weight loss program and complete intake details before the visit.",
  },
];

function App() {
  const signatureCanvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("book");
  const [isSigning, setIsSigning] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState("Signature not saved");
  const [selectedMedication, setSelectedMedication] = useState("");
  const [currentMedications, setCurrentMedications] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [conditionYears, setConditionYears] = useState("");
  const [conditionStatus, setConditionStatus] = useState("");
  const [pastSurgicalHistory, setPastSurgicalHistory] = useState("");
  const [selectedSurgicalProcedure, setSelectedSurgicalProcedure] = useState("");
  const [surgeryYear, setSurgeryYear] = useState("");
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const [allergyReaction, setAllergyReaction] = useState("");
  const [allergies, setAllergies] = useState("");
  const [pharmacyState, setPharmacyState] = useState("");
  const [pharmacyCity, setPharmacyCity] = useState("");
  const [pharmacyZip, setPharmacyZip] = useState("");
  const [pharmacySearch, setPharmacySearch] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");
  const [pharmacyAddressSuggestions, setPharmacyAddressSuggestions] = useState([]);
  const [pharmacyAddressStatus, setPharmacyAddressStatus] = useState(
    "OpenStreetMap autocomplete ready",
  );
  const [preferredPharmacy, setPreferredPharmacy] = useState("");
  const [medicationDetails, setMedicationDetails] = useState({
    dosage: "",
    time: "",
  });
  const [depressionScores, setDepressionScores] = useState(
    Array(depressionQuestions.length).fill(0),
  );

  const depressionTotal = depressionScores.reduce((sum, score) => sum + score, 0);
  const depressionLabel =
    depressionTotal >= 20
      ? "Severe"
      : depressionTotal >= 15
        ? "Moderately severe"
        : depressionTotal >= 10
          ? "Moderate"
          : depressionTotal >= 5
            ? "Mild"
            : "Minimal";

  const updateDepressionScore = (index, value) => {
    setDepressionScores((scores) =>
      scores.map((score, scoreIndex) =>
        scoreIndex === index ? Number(value) : score,
      ),
    );
  };

  const medicationEntryPreview = [
    selectedMedication,
    medicationDetails.dosage,
    medicationDetails.time,
  ]
    .filter(Boolean)
    .join(" - ");

  const addCommonMedication = () => {
    if (
      !selectedMedication ||
      selectedMedication === "None" ||
      !medicationDetails.dosage ||
      !medicationDetails.time
    ) {
      return;
    }

    const medicationEntry = {
      id: `${Date.now()}-${selectedMedication}`,
      name: selectedMedication,
      dosage: medicationDetails.dosage,
      time: medicationDetails.time,
    };

    setCurrentMedications((medications) => {
      if (
        medications.some(
          (medication) =>
            medication.name === medicationEntry.name &&
            medication.dosage === medicationEntry.dosage &&
            medication.time === medicationEntry.time,
        )
      ) {
        return medications;
      }

      return [...medications, medicationEntry];
    });
  };

  const removeMedication = (medicationId) => {
    setCurrentMedications((medications) =>
      medications.filter((medication) => medication.id !== medicationId),
    );
  };

  const updateMedication = (id, field, value) => {
    setCurrentMedications((medications) =>
      medications.map((medication) =>
        medication.id === id ? { ...medication, [field]: value } : medication,
      ),
    );
  };

  const conditionEntryPreview = [
    selectedCondition,
    conditionStatus,
    conditionYears,
  ]
    .filter(Boolean)
    .join(" - ");

  const addMedicalCondition = () => {
    if (
      !selectedCondition ||
      selectedCondition === "None" ||
      !conditionStatus ||
      !conditionYears
    ) {
      return;
    }

    const conditionEntry = `${selectedCondition} - ${conditionStatus}, ${conditionYears}`;

    setMedicalConditions((conditions) => {
      const conditionList = conditions
        .split("\n")
        .map((condition) => condition.trim())
        .filter(Boolean);

      if (
        conditionList.includes(conditionEntry) ||
        conditionList.some((condition) =>
          condition.startsWith(`${selectedCondition} -`),
        )
      ) {
        return conditions;
      }

      return [...conditionList, conditionEntry].join("\n");
    });
  };

  const surgicalEntryPreview = [selectedSurgicalProcedure, surgeryYear]
    .filter(Boolean)
    .join(" - ");

  const addSurgicalProcedure = () => {
    if (
      !selectedSurgicalProcedure ||
      selectedSurgicalProcedure === "None" ||
      !surgeryYear
    ) {
      return;
    }

    const procedureEntry = `${selectedSurgicalProcedure} - ${surgeryYear}`;

    setPastSurgicalHistory((history) => {
      const surgicalList = history
        .split("\n")
        .map((procedure) => procedure.trim())
        .filter(Boolean);

      if (
        surgicalList.includes(procedureEntry) ||
        surgicalList.some((procedure) =>
          procedure.startsWith(`${selectedSurgicalProcedure} -`),
        )
      ) {
        return history;
      }

      return [...surgicalList, procedureEntry].join("\n");
    });
  };

  const allergyEntryPreview = [selectedAllergen, allergyReaction]
    .filter(Boolean)
    .join(" - ");

  const addAllergy = () => {
    if (!selectedAllergen || !allergyReaction) return;

    const allergyEntry = `${selectedAllergen} - ${allergyReaction}`;

    setAllergies((currentAllergies) => {
      const allergyList = currentAllergies
        .split("\n")
        .map((allergy) => allergy.trim())
        .filter(Boolean);

      if (
        allergyList.includes(allergyEntry) ||
        allergyList.some((allergy) => allergy.startsWith(`${selectedAllergen} -`))
      ) {
        return currentAllergies;
      }

      return [...allergyList, allergyEntry].join("\n");
    });
  };

  const filteredPharmacies = pharmacyOptions.filter((pharmacy) => {
    const matchesState = !pharmacyState || pharmacy.endsWith(pharmacyState);
    const matchesSearch = pharmacy
      .toLowerCase()
      .includes(pharmacySearch.toLowerCase());
    return matchesState && matchesSearch;
  });

  const filteredPharmacyAddresses = pharmacyAddressOptions.filter((address) => {
    const stateCode =
      pharmacyState === "Arizona"
        ? "AZ"
        : pharmacyState === "Nevada"
          ? "NV"
          : pharmacyState === "New Mexico"
            ? "NM"
            : "";
    const matchesState = !stateCode || address.includes(`, ${stateCode} `);
    const matchesCity =
      !pharmacyCity ||
      address.toLowerCase().startsWith(pharmacyCity.toLowerCase());
    const matchesZip = !pharmacyZip || address.includes(pharmacyZip);
    const matchesSearch = address
      .toLowerCase()
      .includes(pharmacyAddress.toLowerCase());
    return matchesState && matchesCity && matchesZip && matchesSearch;
  });
  const pharmacyMapUrl = pharmacyAddress
    ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(
        pharmacyAddress,
      )}`
    : "";

  const syncPharmacyAddressFields = (value) => {
    setPharmacyAddress(value);

    const match = value.match(/(?:^|,\s*)([^,]+),\s*(AZ|NV|NM)\s+(\d{5})/);
    if (!match) return;

    const [, city, stateCode, zip] = match;
    const stateName =
      stateCode === "AZ"
        ? "Arizona"
        : stateCode === "NV"
          ? "Nevada"
          : "New Mexico";

    setPharmacyCity(city);
    setPharmacyState(stateName);
    setPharmacyZip(zip);
  };

  useEffect(() => {
    const query = [pharmacySearch, pharmacyAddress, pharmacyState]
      .filter(Boolean)
      .join(" ")
      .trim();

    if (query.length < 3) {
      setPharmacyAddressSuggestions([]);
      setPharmacyAddressStatus("Type at least 3 characters for suggestions");
      return undefined;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      setPharmacyAddressStatus("Searching OpenStreetMap");
      const params = new URLSearchParams({
        addressdetails: "1",
        countrycodes: "us",
        format: "jsonv2",
        limit: "5",
        q: query,
      });

      fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((results) => {
          const filteredResults = results.filter((result) => {
            const state = result.address?.state;
            return (
              !pharmacyState ||
              state === pharmacyState ||
              (pharmacyState === "New Mexico" && state === "NM")
            );
          });
          setPharmacyAddressSuggestions(filteredResults);
          setPharmacyAddressStatus(
            filteredResults.length
              ? "OpenStreetMap suggestions"
              : "No OpenStreetMap suggestions found",
          );
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setPharmacyAddressStatus("OpenStreetMap search unavailable");
          }
        });
    }, 450);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [pharmacyAddress, pharmacySearch, pharmacyState]);

  const selectPharmacyAddressSuggestion = (suggestion) => {
    const address = suggestion.address || {};
    const city =
      address.city || address.town || address.village || address.hamlet || "";
    const state = address.state || pharmacyState;
    const zip = address.postcode || "";
    const displayName = suggestion.display_name || "";

    setPharmacyAddress(displayName);
    if (city) setPharmacyCity(city);
    if (state) setPharmacyState(state);
    if (zip) setPharmacyZip(zip);
    setPharmacyAddressSuggestions([]);
    setPharmacyAddressStatus("Address selected from OpenStreetMap");
  };

  const updatePharmacyLocationField = (field, value) => {
    const nextLocation = {
      state: pharmacyState,
      city: pharmacyCity,
      zip: pharmacyZip,
      address: pharmacyAddress,
      pharmacy: pharmacySearch,
      [field]: value,
    };
    const combinedAddress = [
      nextLocation.pharmacy,
      nextLocation.address
        .replace(new RegExp(`^${nextLocation.pharmacy}\\s*-?\\s*`, "i"), "")
        .replace(new RegExp(`,?\\s*${nextLocation.city}$`, "i"), "")
        .replace(new RegExp(`,?\\s*${nextLocation.state}$`, "i"), "")
        .replace(new RegExp(`,?\\s*${nextLocation.zip}$`, "i"), "")
        .trim(),
      nextLocation.city,
      nextLocation.state,
      nextLocation.zip,
    ]
      .filter(Boolean)
      .join(", ");

    if (field === "state") setPharmacyState(value);
    if (field === "city") setPharmacyCity(value);
    if (field === "zip") setPharmacyZip(value);
    if (field === "pharmacy") setPharmacySearch(value);
    setPharmacyAddress(combinedAddress);
  };

  const addPreferredPharmacy = () => {
    const pharmacy = pharmacySearch.trim();
    const address = pharmacyAddress.trim();
    const city = pharmacyCity.trim();
    const zip = pharmacyZip.trim();
    if (!pharmacy && !address) return;
    const location = [address, city, pharmacyState, zip]
      .filter(Boolean)
      .join(", ");
    const pharmacyEntry =
      pharmacy && location
        ? `${pharmacy} - ${location}`
        : pharmacy || location;

    setPreferredPharmacy((currentPharmacy) => {
      const pharmacyList = currentPharmacy
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      if (pharmacyList.includes(pharmacyEntry)) {
        return currentPharmacy;
      }

      return [...pharmacyList, pharmacyEntry].join("\n");
    });
  };

  const getSignaturePoint = (event) => {
    const canvas = signatureCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const beginSignature = (event) => {
    const canvas = signatureCanvasRef.current;
    const context = canvas.getContext("2d");
    const point = getSignaturePoint(event);

    canvas.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
    setIsSigning(true);
    setSignatureStatus("Signing in progress");
  };

  const drawSignature = (event) => {
    if (!isSigning) return;

    const canvas = signatureCanvasRef.current;
    const context = canvas.getContext("2d");
    const point = getSignaturePoint(event);

    context.lineWidth = 2.6;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#10201f";
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const finishSignature = () => {
    if (!isSigning) return;
    setIsSigning(false);
    setSignatureStatus("Signature captured");
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureStatus("Signature cleared");
  };

  const showCareSection = (sectionId) => {
    setActiveSection(sectionId);
    window.requestAnimationFrame(() => {
      document
        .getElementById("care-sections")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const careSectionClass = (sectionId, baseClass) =>
    `${baseClass} action-section ${
      activeSection === sectionId ? "is-active" : ""
    }`;

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="TeleDNP Now home">
          <span className="brand-mark">
            <Video size={20} aria-hidden="true" />
          </span>
          <span>TeleDNP Now</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#weight-loss" onClick={() => showCareSection("weight-loss")}>
            Weight Loss
          </a>
          <a href="#portal" onClick={() => showCareSection("portal")}>
            Portal
          </a>
          <a href="#intake" onClick={() => showCareSection("intake")}>
            Intake
          </a>
          <a href="#consent" onClick={() => showCareSection("consent")}>
            Consent
          </a>
          <a href="#process">How it works</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="nav-action"
          type="button"
          onClick={() => showCareSection("book")}
        >
          Book Visit
        </button>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            <ShieldCheck size={15} aria-hidden="true" />
            Secure virtual care
          </span>
          <h2>Telemedicine care that meets you where you are.</h2>
          <p>
            Connect with Dr. Shiny Job, DNP, FNP-C for convenient primary care,
            urgent concerns, and ongoing health support without the waiting room.
          </p>
          <div className="provider-line">
            <UserRound size={18} aria-hidden="true" />
            <span>
              <strong>Dr. Shiny Job, DNP, FNP-C</strong>
              <small>Nurse Practitioner</small>
            </span>
          </div>
          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => showCareSection("book")}
            >
              Schedule a Visit
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <a className="secondary-button" href="tel:+11234567890">
              <Phone size={18} aria-hidden="true" />
              Call Now
            </a>
            <a
              className="secondary-button"
              href="https://doxy.me/telednpnow"
              target="_blank"
              rel="noreferrer"
            >
              <Video size={18} aria-hidden="true" />
              Start Telehealth Visit
            </a>
          </div>
          <div className="trust-row" aria-label="Care highlights">
            <span>
              <CheckCircle2 size={18} aria-hidden="true" />
              Same-week appointments
            </span>
            <span>
              <CheckCircle2 size={18} aria-hidden="true" />
              Private video visits
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={heroImage}
            alt="Patient having a telemedicine video visit from home"
          />
          <div className="visit-card" aria-label="Next available visit">
            <Clock3 size={20} aria-hidden="true" />
            <div>
              <strong>Next opening</strong>
              <span>Today at 3:30 PM</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-band" id="services">
        <div className="section-heading">
          <span className="section-kicker">Care options</span>
          <h2>Virtual visits for real-life health needs.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.title}>
                <span className="service-icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-copy">
          <span className="section-kicker">Simple process</span>
          <h2>Start care in three easy steps.</h2>
          <p>
            Book online, join your secure video visit, and leave with a clear
            plan for prescriptions, labs, follow-up, or next steps.
          </p>
        </div>
        <div className="steps-list">
          {steps.map((step, index) => (
            <div className="step-row" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="section-switcher" id="care-sections">
        <div>
          <span className="section-kicker">Choose next step</span>
          <h2>Open the section you need.</h2>
        </div>
        <div className="section-switcher-actions" role="group" aria-label="Care sections">
          <button
            type="button"
            className={activeSection === "book" ? "is-active" : ""}
            onClick={() => showCareSection("book")}
          >
            Book Visit
          </button>
          <button
            type="button"
            className={activeSection === "weight-loss" ? "is-active" : ""}
            onClick={() => showCareSection("weight-loss")}
          >
            Weight Loss
          </button>
          <button
            type="button"
            className={activeSection === "intake" ? "is-active" : ""}
            onClick={() => showCareSection("intake")}
          >
            Intake
          </button>
          <button
            type="button"
            className={activeSection === "portal" ? "is-active" : ""}
            onClick={() => showCareSection("portal")}
          >
            Portal
          </button>
          <button
            type="button"
            className={activeSection === "consent" ? "is-active" : ""}
            onClick={() => showCareSection("consent")}
          >
            Consent
          </button>
        </div>
      </div>

      <section className={careSectionClass("weight-loss", "weight-loss-page")} id="weight-loss">
        <div className="weight-loss-hero">
          <div>
            <span className="section-kicker">Weight loss program</span>
            <h2>Medical weight loss with virtual support.</h2>
            <p>
              Work with Dr. Shiny Job, DNP, FNP-C to create a sustainable plan
              for weight management, metabolic health, and long-term wellness.
            </p>
          </div>
          <button
            className="primary-button"
            type="button"
            onClick={() => showCareSection("book")}
          >
            Start Weight Loss Visit
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="weight-loss-grid">
          {weightLossFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="weight-card" key={feature.title}>
                <span className="service-icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
        </div>

        <div className="program-details">
          <div>
            <h3>What the program may include</h3>
            <ul>
              <li>Initial telemedicine consultation</li>
              <li>Medication and health history review</li>
              <li>Nutrition and lifestyle coaching</li>
              <li>Lab discussion when clinically appropriate</li>
              <li>Follow-up visits for accountability and adjustments</li>
            </ul>
          </div>
          <div className="program-note">
            <ShieldCheck size={24} aria-hidden="true" />
            <p>
              Weight loss care is personalized. Treatment options depend on your
              health history, goals, clinical needs, and provider assessment.
            </p>
          </div>
        </div>

        <div className="bmi-panel">
          <div className="bmi-heading">
            <span className="section-kicker">CDC BMI calculator</span>
            <h3>Adult body mass index widget.</h3>
            <p>
              Use the CDC Adult BMI Calculator widget to estimate BMI and view
              the corresponding adult BMI category.
            </p>
          </div>

          <iframe
            className="cdc-bmi-widget"
            src="https://www.cdc.gov/bmi/adult-calculator/calculator.html"
            title="Adult BMI Calculator"
            height="640"
          />

          <p className="bmi-source">
            Source: CDC Adult BMI Calculator widget. This calculator is for
            adults 20 years and older and is not a substitute for professional
            medical advice.
          </p>
        </div>

        <div className="waist-panel">
          <div className="waist-heading">
            <span className="section-kicker">Waist circumference</span>
            <h3>Weight loss body measurement.</h3>
            <p>
              Track waist circumference as a separate weight loss measurement.
              Use the NHLBI iliac crest method and record the reading at the
              end of a normal breath out.
            </p>
          </div>

          <figure className="waist-measurement-guide">
            <img
              src="/nhlbi-waist-circumference-figure-3.jpg"
              alt="Figure 3 showing National Heart, Lung, and Blood Institute waist circumference measurement at the iliac crest"
            />
            <figcaption>
              Figure 3. National Heart, Lung, and Blood Institute waist
              circumference measurement at the iliac crest. Source: NCHS,
              National Health and Nutrition Examination Survey, 2016.
            </figcaption>
          </figure>

          <div className="waist-grid">
            <label>
              Waist circumference
              <input
                type="number"
                min="0"
                name="waistCircumference"
                placeholder="Example: 38"
              />
            </label>
            <label>
              Measurement unit
              <select name="waistUnit" defaultValue="inches">
                <option value="inches">Inches</option>
                <option value="centimeters">Centimeters</option>
              </select>
            </label>
            <label>
              Measurement date
              <input type="date" name="waistMeasurementDate" />
            </label>
          </div>

          <div className="screening-note">
            <ShieldCheck size={20} aria-hidden="true" />
            <p>
              Waist circumference can help monitor cardiometabolic risk and
              progress, but it should be reviewed with other health measures.
            </p>
          </div>
        </div>

        <div className="depression-score-panel">
          <div className="depression-score-heading">
            <span className="section-kicker">Depression score</span>
            <h3>PHQ-9 screening score.</h3>
            <p>
              This screening tool can help document mood symptoms during weight
              loss care. It does not replace a clinical evaluation.
            </p>
          </div>

          <div className="score-summary" aria-live="polite">
            <strong>{depressionTotal}</strong>
            <span>{depressionLabel}</span>
          </div>

          <div className="depression-question-list">
            {depressionQuestions.map((question, index) => (
              <label className="score-row" key={question}>
                <span>
                  {index + 1}. {question}
                </span>
                <select
                  value={depressionScores[index]}
                  onChange={(event) =>
                    updateDepressionScore(index, event.target.value)
                  }
                >
                  <option value="0">0 - Not at all</option>
                  <option value="1">1 - Several days</option>
                  <option value="2">2 - More than half the days</option>
                  <option value="3">3 - Nearly every day</option>
                </select>
              </label>
            ))}
          </div>

          <div className="screening-note">
            <ShieldCheck size={20} aria-hidden="true" />
            <p>
              If a patient reports thoughts of self-harm or feels unsafe, they
              should seek emergency help immediately or contact local crisis
              support.
            </p>
          </div>
        </div>

        <form className="weight-consent-form" id="weight-loss-consent">
          <div className="weight-consent-heading">
            <span className="section-kicker">Medication consent</span>
            <h3>Weight loss medication consent.</h3>
            <p>
              Review and acknowledge that medication decisions require a
              clinical evaluation, medical history review, and ongoing follow-up
              with Dr. Shiny Job, DNP, FNP-C.
            </p>
          </div>

          <div className="consent-text">
            <p>
              I understand that weight loss medications may not be appropriate
              for every patient and that treatment options depend on my health
              history, current medications, allergies, lab results when needed,
              and provider assessment.
            </p>
            <p>
              I understand that possible risks, side effects, medication
              interactions, contraindications, expected benefits, alternatives,
              and follow-up needs should be discussed before starting or
              changing any medication.
            </p>
          </div>

          <div className="consent-checks">
            <label>
              <input type="checkbox" name="weightMedicationReview" />
              I agree to provide accurate medical history, medication list,
              allergy information, and weight loss history.
            </label>
            <label>
              <input type="checkbox" name="weightMedicationRisks" />
              I understand that weight loss medications can have side effects
              and may require monitoring or follow-up visits.
            </label>
            <label>
              <input type="checkbox" name="weightMedicationNoGuarantee" />
              I understand results are not guaranteed and treatment may be
              changed or stopped based on clinical safety.
            </label>
            <label>
              <input type="checkbox" name="weightMedicationEmergency" />
              I understand urgent symptoms or severe side effects may require
              emergency or in-person care.
            </label>
          </div>

          <div className="form-grid">
            <label>
              Patient name
              <input
                type="text"
                name="weightConsentName"
                placeholder="Full name"
              />
            </label>
            <label>
              Consent date
              <input type="date" name="weightConsentDate" />
            </label>
            <label className="full-width">
              Electronic signature
              <input
                type="text"
                name="weightConsentSignature"
                placeholder="Type your full legal name"
              />
            </label>
          </div>

          <button type="button">
            Save Weight Loss Consent
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </form>
      </section>

      <section className={careSectionClass("book", "booking-section")} id="book">
        <div className="booking-copy">
          <span className="section-kicker">Book online</span>
          <h2>Request a telemedicine appointment.</h2>
          <p>
            Book through the secure CharmHealth/CharmTracker scheduling portal.
            Patients can choose a visit time and enter appointment information
            directly in CharmHealth.
          </p>
          <div className="feature-list">
            <span>
              <Laptop size={18} aria-hidden="true" />
              Phone, tablet, or computer
            </span>
            <span>
              <UserRound size={18} aria-hidden="true" />
              Personalized care plan
            </span>
            <span>
              <CalendarCheck size={18} aria-hidden="true" />
              Flexible scheduling
            </span>
          </div>
        </div>
        <form className="booking-form">
          <label>
            Full name
            <input type="text" name="name" placeholder="Jane Smith" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="jane@example.com" />
          </label>
          <label>
            Visit reason
            <select name="reason" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Primary care</option>
              <option>Medication refill</option>
              <option>Sick visit</option>
              <option>Chronic care follow-up</option>
            </select>
          </label>
          <label>
            Payment option
            <select name="paymentOption" defaultValue="">
              <option value="" disabled>
                Select payment option
              </option>
              <option>Insurance</option>
              <option>Self-pay</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <a
            className="primary-button form-button"
            href={charmHealthLinks.booking}
            target="_blank"
            rel="noreferrer"
          >
            Open CharmHealth Booking
            <ChevronRight size={18} aria-hidden="true" />
          </a>
          <div className="charm-calendar-embed full-width">
            <iframe
              title="TeleDNPNow appointment calendar"
              width="100%"
              height="1000"
              src="https://ehr.charmtracker.com/publicCal.sas?method=getCal&digest=8e0b9864de414b6e13f96d8257763cf5a8c456c327218389c9641f027c2ac896ef59d40e1bb127afa7c934a1881fa51ad95fcbc3b76e32a2"
              style={{ overflow: "hidden" }}
              frameBorder="0"
            />
          </div>
          <div className="secure-payment-panel full-width">
            <div>
              <h3>Pay by card through CharmHealth/Bluefin</h3>
              <p>
                After an invoice or payment link is created in CharmHealth,
                patients can pay securely by card through Bluefin. Card numbers
                are not collected or stored on this website.
              </p>
            </div>
            <a
              className="secondary-button"
              href={charmHealthLinks.payment}
              target="_blank"
              rel="noreferrer"
            >
              Pay Self-Pay by Card
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          </div>
        </form>
      </section>

      <section className={careSectionClass("portal", "portal-section")} id="portal">
        <div className="portal-intro">
          <span className="section-kicker">Patient portal / booking</span>
          <h2>Your virtual care hub.</h2>
          <p>
            Give patients one clear place to book a visit, complete intake, and
            prepare for secure telemedicine care with TeleDNP Now.
          </p>
        </div>

        <div className="portal-grid">
          {portalActions.map((item) => {
            const Icon = item.icon;
            return (
              <article className="portal-card" key={item.title}>
                <span className="portal-icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  onClick={(event) => {
                    if (!item.external) {
                      event.preventDefault();
                      showCareSection(item.href.replace("#", ""));
                    }
                  }}
                >
                  {item.action}
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="portal-panel">
          <div>
            <LockKeyhole size={24} aria-hidden="true" />
            <h3>Secure portal connection</h3>
            <p>
              This section is ready to connect to a real patient portal or
              scheduling system when you choose your platform.
            </p>
          </div>
          <a
            className="secondary-button"
            href={charmHealthLinks.portal}
            target="_blank"
            rel="noreferrer"
          >
            Open CharmHealth Portal
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={careSectionClass("intake", "intake-section")} id="intake">
        <div className="intake-heading">
          <span className="section-kicker">Telehealth intake</span>
          <h2>Patient intake form for virtual visits.</h2>
          <p>
            Collect visit details, medical background, and patient preferences
            before a telemedicine appointment with Dr. Shiny Job, DNP, FNP-C.
          </p>
        </div>

        <form className="intake-form">
          <fieldset>
            <legend>
              <FileText size={20} aria-hidden="true" />
              Patient information
            </legend>
            <div className="form-grid">
              <label>
                Legal name
                <input type="text" name="legalName" placeholder="Full name" />
              </label>
              <label>
                Date of birth
                <input type="date" name="dateOfBirth" />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" placeholder="(123) 456-7890" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="name@email.com" />
              </label>
              <label>
                Country
                <input type="text" name="country" placeholder="Country" />
              </label>
              <label>
                Ethnic group
                <select name="ethnicGroup" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>American Indian or Alaska Native</option>
                  <option>Asian</option>
                  <option>Black or African American</option>
                  <option>Hispanic or Latino</option>
                  <option>Middle Eastern or North African</option>
                  <option>Native Hawaiian or Pacific Islander</option>
                  <option>White</option>
                  <option>Multiracial</option>
                  <option>Prefer not to say</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <ShieldCheck size={20} aria-hidden="true" />
              Insurance and self-pay
            </legend>
            <div className="form-grid">
              <label>
                Payment preference
                <select name="intakePaymentPreference" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Use insurance</option>
                  <option>Self-pay</option>
                  <option>Need help deciding</option>
                </select>
              </label>
              <label>
                Insurance company
                <input
                  type="text"
                  name="insuranceCompany"
                  placeholder="Insurance plan name"
                />
              </label>
              <label>
                Member ID
                <input
                  type="text"
                  name="memberId"
                  placeholder="Member or subscriber ID"
                />
              </label>
              <label>
                Group number
                <input
                  type="text"
                  name="groupNumber"
                  placeholder="Group number if available"
                />
              </label>
              <label>
                Policy holder name
                <input
                  type="text"
                  name="policyHolderName"
                  placeholder="If different from patient"
                />
              </label>
              <label>
                Relationship to policy holder
                <select name="policyHolderRelationship" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Self</option>
                  <option>Spouse</option>
                  <option>Parent</option>
                  <option>Guardian</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="full-width">
                Insurance or payment notes
                <textarea
                  name="paymentNotes"
                  placeholder="Add insurance questions, secondary insurance, prior authorization notes, or self-pay questions."
                />
              </label>
              <div className="self-pay-menu full-width">
                <h3>Self-pay price menu</h3>
                <ul>
                  <li>
                    <span>Brief sick visit</span>
                    <strong>$40</strong>
                  </li>
                  <li>
                    <span>Initial general telehealth visit</span>
                    <strong>$50</strong>
                  </li>
                  <li>
                    <span>Initial primary care telehealth visit</span>
                    <strong>$70</strong>
                  </li>
                  <li>
                    <span>Follow-up visit</span>
                    <strong>$60</strong>
                  </li>
                  <li>
                    <span>Weight loss initial consult</span>
                    <strong>$90</strong>
                  </li>
                  <li>
                    <span>Medication refill visit</span>
                    <strong>$30</strong>
                  </li>
                </ul>
              </div>
              <label>
                Self-pay option
                <select name="selfPayOption" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Brief sick visit - $40</option>
                  <option>Initial general telehealth visit - $50</option>
                  <option>Initial primary care telehealth visit - $70</option>
                  <option>Follow-up visit - $60</option>
                  <option>Weight loss initial consult - $90</option>
                  <option>Medication refill visit - $30</option>
                  <option>Request cash price before scheduling</option>
                </select>
              </label>
              <div className="secure-payment-panel full-width">
                <div>
                  <h3>Self-pay card payment</h3>
                  <p>
                    Patients can pay by card through a secure payment portal.
                    Card details are not collected or stored on this website.
                  </p>
                </div>
                <a
                  className="primary-button"
                  href={charmHealthLinks.payment}
                  target="_blank"
                  rel="noreferrer"
                >
                  Pay Securely by Card
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <Stethoscope size={20} aria-hidden="true" />
              Visit details
            </legend>
            <div className="form-grid">
              <label>
                Reason for visit
                <select name="visitReason" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Primary care</option>
                  <option>Sick visit</option>
                  <option>Medication refill</option>
                  <option>Weight loss program</option>
                  <option>Chronic care follow-up</option>
                </select>
              </label>
              <div className="pharmacy-panel full-width">
                <div className="pharmacy-row">
                  <label>
                    Pharmacy state
                    <select
                      name="pharmacyState"
                      value={pharmacyState}
                      onChange={(event) =>
                        updatePharmacyLocationField("state", event.target.value)
                      }
                    >
                      <option value="">All states</option>
                      <option>Arizona</option>
                      <option>Nevada</option>
                      <option>New Mexico</option>
                    </select>
                  </label>
                  <label>
                    Search pharmacy
                    <input
                      type="search"
                      name="pharmacySearch"
                      list="pharmacy-options"
                      placeholder="Search CVS, Walgreens, Walmart..."
                      value={pharmacySearch}
                      onChange={(event) =>
                        updatePharmacyLocationField(
                          "pharmacy",
                          event.target.value,
                        )
                      }
                    />
                    <datalist id="pharmacy-options">
                      {filteredPharmacies.map((pharmacy) => (
                        <option key={pharmacy} value={pharmacy} />
                      ))}
                    </datalist>
                  </label>
                  <label>
                    Pharmacy address
                    <span className="pharmacy-address-control">
                      <input
                        type="search"
                        name="pharmacyAddress"
                        list="pharmacy-address-options"
                        placeholder="Street, city, state, ZIP"
                        value={pharmacyAddress}
                        onChange={(event) =>
                          syncPharmacyAddressFields(event.target.value)
                        }
                      />
                      <a
                        className={pharmacyMapUrl ? "" : "disabled"}
                        href={pharmacyMapUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!pharmacyMapUrl}
                      >
                        Map
                      </a>
                    </span>
                    <datalist id="pharmacy-address-options">
                      {filteredPharmacyAddresses.map((address) => (
                        <option key={address} value={address} />
                      ))}
                    </datalist>
                    <small className="places-status">
                      {pharmacyAddressStatus}
                    </small>
                    {pharmacyAddressSuggestions.length > 0 && (
                      <div className="address-suggestions">
                        {pharmacyAddressSuggestions.map((suggestion) => (
                          <button
                            type="button"
                            key={suggestion.place_id}
                            onClick={() =>
                              selectPharmacyAddressSuggestion(suggestion)
                            }
                          >
                            {suggestion.display_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </label>
                </div>
                <div className="pharmacy-actions">
                  <span>
                    {pharmacySearch
                      ? [pharmacyAddress, pharmacyCity, pharmacyState, pharmacyZip]
                          .filter(Boolean).length
                        ? `${pharmacySearch} - ${[
                            pharmacyAddress,
                            pharmacyCity,
                            pharmacyState,
                            pharmacyZip,
                          ]
                            .filter(Boolean)
                            .join(", ")}`
                        : pharmacySearch
                      :
                      "Search Arizona, Nevada, or New Mexico pharmacies."}
                  </span>
                  <button
                    type="button"
                    onClick={addPreferredPharmacy}
                    disabled={!pharmacySearch.trim() && !pharmacyAddress.trim()}
                  >
                    Add Pharmacy Address
                  </button>
                </div>
                <label>
                  Preferred pharmacy
                  <textarea
                    name="pharmacy"
                    rows="3"
                    placeholder="Selected pharmacy will appear here. You can edit the pharmacy name, address, or phone number."
                    value={preferredPharmacy}
                    onChange={(event) => setPreferredPharmacy(event.target.value)}
                  />
                </label>
              </div>
              <label className="full-width">
                Main concern
                <textarea
                  name="concern"
                  rows="4"
                  placeholder="Briefly describe what you would like help with"
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <HeartPulse size={20} aria-hidden="true" />
              Health history
            </legend>
            <div className="form-grid">
              <div className="medication-row full-width">
                <label>
                  Common medication
                  <select
                    name="commonMedication"
                    value={selectedMedication}
                    onChange={(event) => setSelectedMedication(event.target.value)}
                  >
                    <option value="" disabled>
                      Select common medication
                    </option>
                    <option>None</option>
                    {medicationOptions.map((medication) => (
                      <option key={medication}>{medication}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Dosage
                  <select
                    name="commonMedicationDosage"
                    value={medicationDetails.dosage}
                    onChange={(event) =>
                      setMedicationDetails((details) => ({
                        ...details,
                        dosage: event.target.value,
                      }))
                    }
                  >
                    <option value="">Select dosage</option>
                    {dosageOptions.map((dosage) => (
                      <option key={dosage}>{dosage}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Time of medication
                  <select
                    name="commonMedicationTime"
                    value={medicationDetails.time}
                    onChange={(event) =>
                      setMedicationDetails((details) => ({
                        ...details,
                        time: event.target.value,
                      }))
                    }
                  >
                    <option value="">Select time</option>
                    {medicationTimeOptions.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="medication-actions full-width">
                <span>
                  {medicationEntryPreview ||
                    "Select medication, dosage, and time before adding."}
                </span>
                <button
                  type="button"
                  onClick={addCommonMedication}
                  disabled={
                    !selectedMedication ||
                    selectedMedication === "None" ||
                    !medicationDetails.dosage ||
                    !medicationDetails.time
                  }
                >
                  Add Medication
                </button>
              </div>
              {currentMedications.length > 0 && (
                <div className="medication-list full-width">
                  <strong>Medication entry</strong>
                  {currentMedications.map((medication, index) => (
                    <div className="medication-chip" key={medication.id}>
                      <input
                        type="text"
                        aria-label={`Medication name ${index + 1}`}
                        value={medication.name}
                        onChange={(event) =>
                          updateMedication(medication.id, "name", event.target.value)
                        }
                      />
                      <input
                        type="text"
                        aria-label={`Medication dosage ${index + 1}`}
                        value={medication.dosage}
                        onChange={(event) =>
                          updateMedication(
                            medication.id,
                            "dosage",
                            event.target.value,
                          )
                        }
                      />
                      <input
                        type="text"
                        aria-label={`Medication time ${index + 1}`}
                        value={medication.time}
                        onChange={(event) =>
                          updateMedication(medication.id, "time", event.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeMedication(medication.id)}
                        aria-label={`Remove ${medication.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="full-width">
                Additional medications
                <textarea
                  name="medications"
                  rows="3"
                  placeholder="List medications, supplements, and doses not shown above"
                />
              </label>
              <label className="full-width">
                Allergies
                <div className="allergy-row">
                  <label>
                    Common allergen
                    <select
                      name="commonAllergen"
                      value={selectedAllergen}
                      onChange={(event) => setSelectedAllergen(event.target.value)}
                    >
                      <option value="">Select allergen</option>
                      {allergenOptions.map((allergen) => (
                        <option key={allergen}>{allergen}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Reaction
                    <select
                      name="allergyReaction"
                      value={allergyReaction}
                      onChange={(event) => setAllergyReaction(event.target.value)}
                    >
                      <option value="">Select reaction</option>
                      {allergyReactionOptions.map((reaction) => (
                        <option key={reaction}>{reaction}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="allergy-actions">
                  <span>
                    {allergyEntryPreview ||
                      "Select allergen and reaction before adding."}
                  </span>
                  <button
                    type="button"
                    onClick={addAllergy}
                    disabled={!selectedAllergen || !allergyReaction}
                  >
                    Add Allergy
                  </button>
                </div>
                <textarea
                  name="allergies"
                  rows="3"
                  placeholder="List medication, food, or environmental allergies"
                  value={allergies}
                  onChange={(event) => setAllergies(event.target.value)}
                />
              </label>
              <div className="condition-row full-width">
                <label>
                  Common medical condition
                  <select
                    name="commonMedicalCondition"
                    value={selectedCondition}
                    onChange={(event) => setSelectedCondition(event.target.value)}
                  >
                    <option value="" disabled>
                      Select common condition
                    </option>
                    <option>None</option>
                    <option>High blood pressure</option>
                    <option>High cholesterol</option>
                    <option>Type 2 diabetes</option>
                    <option>Prediabetes</option>
                    <option>Asthma</option>
                    <option>COPD</option>
                    <option>Sleep apnea</option>
                    <option>GERD / acid reflux</option>
                    <option>Thyroid disease</option>
                    <option>Depression</option>
                    <option>Anxiety</option>
                    <option>Heart disease</option>
                    <option>Kidney disease</option>
                    <option>Liver disease</option>
                    <option>PCOS</option>
                    <option>Migraine</option>
                    <option>Arthritis</option>
                     <option>Cancer</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  Present / Past
                  <select
                    name="conditionStatus"
                    value={conditionStatus}
                    onChange={(event) => setConditionStatus(event.target.value)}
                  >
                    <option value="">Select status</option>
                    <option>Present</option>
                    <option>Past</option>
                  </select>
                </label>
                <label>
                  Years
                  <select
                    name="conditionYears"
                    value={conditionYears}
                    onChange={(event) => setConditionYears(event.target.value)}
                  >
                    <option value="">Select years</option>
                    <option>Less than 1 year</option>
                    <option>1 year</option>
                    <option>2 years</option>
                    <option>3 years</option>
                    <option>4 years</option>
                    <option>5 years</option>
                    <option>6-10 years</option>
                    <option>More than 10 years</option>
                    <option>Unknown</option>
                  </select>
                </label>
              </div>
              <div className="condition-actions full-width">
                <span>
                  {conditionEntryPreview ||
                    "Select condition and years before adding."}
                </span>
                <button
                  type="button"
                  onClick={addMedicalCondition}
                  disabled={
                    !selectedCondition ||
                    selectedCondition === "None" ||
                    !conditionStatus ||
                    !conditionYears
                  }
                >
                  Add Condition
                </button>
              </div>
              <label className="full-width">
                Present and past medical history
                <textarea
                  name="conditions"
                  rows="3"
                  placeholder="List any diagnosed conditions or recent concerns"
                  value={medicalConditions}
                  onChange={(event) => setMedicalConditions(event.target.value)}
                />
              </label>
              <label>
                Common surgical procedure
                <select
                  name="commonSurgicalProcedure"
                  value={selectedSurgicalProcedure}
                  onChange={(event) =>
                    setSelectedSurgicalProcedure(event.target.value)
                  }
                >
                  <option value="" disabled>
                    Select common procedure
                  </option>
                  <option>None</option>
                  <option>Appendectomy</option>
                  <option>Cholecystectomy / gallbladder removal</option>
                  <option>Cesarean section</option>
                  <option>Hysterectomy</option>
                  <option>Tonsillectomy</option>
                  <option>Hernia repair</option>
                  <option>Knee replacement</option>
                  <option>Hip replacement</option>
                  <option>Back surgery</option>
                  <option>Heart bypass surgery</option>
                  <option>Coronary stent placement</option>
                  <option>Bariatric surgery</option>
                  <option>Breast surgery</option>
                  <option>Thyroid surgery</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Surgery year
                <select
                  name="pastSurgicalYear"
                  value={surgeryYear}
                  onChange={(event) => setSurgeryYear(event.target.value)}
                >
                  <option value="" disabled>
                    Select year
                  </option>
                  <option>Never had surgery</option>
                  <option>Unknown</option>
                  {Array.from({ length: 70 }, (_, index) => 2026 - index).map(
                    (year) => (
                      <option key={year}>{year}</option>
                    ),
                  )}
                </select>
              </label>
              <div className="surgery-actions full-width">
                <span>
                  {surgicalEntryPreview ||
                    "Select surgical procedure and year before adding."}
                </span>
                <button
                  type="button"
                  onClick={addSurgicalProcedure}
                  disabled={
                    !selectedSurgicalProcedure ||
                    selectedSurgicalProcedure === "None" ||
                    !surgeryYear
                  }
                >
                  Add Surgery
                </button>
              </div>
              <label className="full-width">
                Past surgical history notes
                <textarea
                  name="pastSurgicalHistory"
                  rows="3"
                  placeholder="List prior surgeries, dates, complications, or anesthesia concerns"
                  value={pastSurgicalHistory}
                  onChange={(event) => setPastSurgicalHistory(event.target.value)}
                />
              </label>
            </div>
          </fieldset>

          <div className="consent-row">
            <label>
              <input type="checkbox" name="telehealthConsent" />
              I understand this is a telehealth intake form and urgent symptoms
              may require emergency or in-person care.
            </label>
          </div>

          <button type="button">
            Save Intake Details
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </form>
      </section>

      <section className={careSectionClass("consent", "consent-section")} id="consent">
        <div className="consent-heading">
          <span className="section-kicker">Telemedicine consent</span>
          <h2>Consent for virtual care.</h2>
          <p>
            Review and acknowledge the basics of telemedicine care before a
            virtual visit with Dr. Shiny Job, DNP, FNP-C.
          </p>
        </div>

        <form className="consent-form">
          <div className="consent-text">
            <h3>Patient acknowledgement</h3>
            <p>
              I understand that telemedicine uses secure audio, video, and
              electronic communication to provide healthcare services when an
              in-person visit may not be required.
            </p>
            <p>
              I understand that telemedicine has benefits and limitations, and
              that technical issues, privacy risks, or clinical concerns may
              require rescheduling, phone communication, urgent care, emergency
              care, or an in-person visit.
            </p>
          </div>

          <div className="consent-checks">
            <label>
              <input type="checkbox" name="telemedicineConsent" />
              I consent to receive care through telemedicine.
            </label>
            <label>
              <input type="checkbox" name="privacyConsent" />
              I understand that my visit information should be shared only
              through secure clinical systems.
            </label>
            <label>
              <input type="checkbox" name="emergencyConsent" />
              I understand telemedicine is not for medical emergencies.
            </label>
            <label>
              <input type="checkbox" name="locationConsent" />
              I agree to provide my current location during the visit if needed
              for safety or emergency planning.
            </label>
          </div>

          <div className="form-grid">
            <label>
              Patient name
              <input type="text" name="consentName" placeholder="Full name" />
            </label>
            <label>
              Consent date
              <input type="date" name="consentDate" />
            </label>
            <label className="full-width">
              Typed signature
              <input
                type="text"
                name="signature"
                placeholder="Type your full legal name"
              />
            </label>
          </div>

          <div className="signature-pad">
            <div className="signature-pad-header">
              <div>
                <strong>Draw signature</strong>
                <span>{signatureStatus}</span>
              </div>
              <button type="button" onClick={clearSignature}>
                Clear
              </button>
            </div>
            <canvas
              ref={signatureCanvasRef}
              width="900"
              height="240"
              aria-label="Draw electronic signature"
              onPointerDown={beginSignature}
              onPointerMove={drawSignature}
              onPointerUp={finishSignature}
              onPointerCancel={finishSignature}
              onPointerLeave={finishSignature}
            />
            <small>
              Draw with a mouse, finger, or stylus. This preview does not submit
              patient information until connected to a secure clinical system.
            </small>
          </div>

          <button type="button">
            Save Consent
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </form>
      </section>

      <section className="seo-section" id="faq">
        <div className="seo-heading">
          <span className="section-kicker">Common questions</span>
          <h2>Telemedicine care, booking, and weight loss support.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <div>
          <strong>TeleDNP Now</strong>
          <p>Care provided by Dr. Shiny Job, DNP, FNP-C.</p>
        </div>
        <div className="footer-links">
          <a href="tel:+11234567890">(123) 456-7890</a>
          <a href="mailto:care@telednpnow.com">care@telednpnow.com</a>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
