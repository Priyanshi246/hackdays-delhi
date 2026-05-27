"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface BRDSection {
  id: string;
  title: string;
  content: string;
}

export interface UserStory {
  id: string;
  title: string;
  actor: string;
  action: string;
  benefit: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "Done";
}

export interface Risk {
  id: string;
  category: string;
  description: string;
  impact: "Critical" | "High" | "Medium" | "Low";
  mitigation: string;
}

export interface Milestone {
  id: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  field: string;
  answered: boolean;
  answer?: string;
}

export interface BRD {
  id: string;
  title: string;
  createdAt: string;
  status: "draft" | "processing" | "clarification" | "completed";
  originalInput: string;
  language: string;
  targetLang?: string;
  templateType: string;
  sections: BRDSection[];
  userStories: UserStory[];
  risks: Risk[];
  timeline: Milestone[];
  diagramCode: string; // Mermaid markdown flowchart code
  questions: ClarificationQuestion[];
  budgetEstimate: {
    low: number;
    high: number;
    currency: string;
    details: string;
  };
}

interface BRDContextType {
  brds: BRD[];
  activeBrdId: string | null;
  activeBrd: BRD | null;
  user: { name: string; email: string; avatar: string } | null;
  isAuthenticated: boolean;
  apiKey: string;
  setApiKey: (key: string) => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  createNewBRD: (title: string, input: string, templateType: string, customAudioTranscript?: string) => Promise<string>;
  updateBrdSection: (brdId: string, sectionId: string, content: string) => void;
  updateBrdStatus: (brdId: string, status: BRD["status"]) => void;
  submitClarificationAnswer: (brdId: string, questionId: string, answer: string) => Promise<void>;
  translateActiveBRD: (targetLang: string) => Promise<void>;
  deleteBRD: (brdId: string) => void;
  loadDemoProject: () => void;
  updateStoryStatus: (brdId: string, storyId: string, status: UserStory["status"]) => void;
}

const BRDContext = createContext<BRDContextType | undefined>(undefined);

const PREBUILT_TEMPLATES_CONTENT: Record<string, { sections: BRDSection[]; stories: UserStory[]; risks: Risk[]; timeline: Milestone[]; diagramCode: string; questions: ClarificationQuestion[]; budget: BRD["budgetEstimate"] }> = {
  "E-commerce App": {
    sections: [
      { id: "exec", title: "Executive Summary", content: "A high-performance, mobile-first E-Commerce web application featuring a fast, headless checkout, personalized catalog recommendations, and advanced multi-vendor logistics integrations designed to maximize conversation rates and reduce cart abandonment." },
      { id: "problem", title: "Problem Statement", content: "Existing legacy e-commerce sites suffer from sluggish page speeds (averaging > 4s load times), confusing checkout flows, and poor mobile responsive design, leading to high cart abandonment rates of over 74% and limited SEO organic ranking potential." },
      { id: "objectives", title: "Objectives", content: "1. Achieve average page loading speed under 1.5 seconds.\n2. Reduce cart abandonment rate from 74% to under 45%.\n3. Increase user checkout conversion by 25% within three months of release.\n4. Support modern Indian payment protocols including UPI AutoPay, credit/debit networks, and netbanking." },
      { id: "scope", title: "Scope", content: "Included:\n- Headless storefront API and Next.js reactive frontend.\n- Global cart state with local resilience.\n- Razorpay, Stripe, and UPI checkout routing.\n- Merchant dashboard for order tracking and inventory management.\n\nExcluded:\n- Global cold storage warehousing inventory system integrations." },
      { id: "functional", title: "Functional Requirements", content: "1. **User Auth**: Secure verification via SMS, Google OAuth, and OTP.\n2. **Product Directory**: Dynamic instant filtering by category, pricing, ratings, and tag clusters.\n3. **Smart Cart**: Auto-applied promo vouchers, multi-currency support, and persistent state.\n4. **Merchant Panel**: Real-time notifications on new orders, inventory reordering sheets, and shipping tracking updates." }
    ],
    stories: [
      { id: "us-1", title: "Checkout Flow", actor: "Shopper", action: "complete checkout using UPI dynamic scan", benefit: "I don't have to input my long credit card numbers repeatedly", priority: "High", status: "In Progress" },
      { id: "us-2", title: "Search Autocomplete", actor: "Shopper", action: "see visual product suggestions as I type in the search bar", benefit: "I can find rare products without typing full names", priority: "Medium", status: "To Do" }
    ],
    risks: [
      { id: "rk-1", category: "Security", description: "Payment gateway downtime during high-traffic shopping festivals.", impact: "Critical", mitigation: "Implement multi-gateway redundancy routing (Razorpay + Stripe fallback mechanisms)." }
    ],
    timeline: [
      { id: "ms-1", title: "Sprint 1: Architecture & DB Layout", duration: "2 weeks", description: "Set up Prisma schemas, next auth pathways, and core Vercel pipeline.", deliverables: ["Complete DB diagram", "Working signup API endpoint"] }
    ],
    diagramCode: `graph TD
  User[User / Client Storefront] -->|OAuth / OTP| Auth[Authentication Service]
  User -->|Browse Products| Catalog[Catalog & Recommendation Engine]
  User -->|Process Checkout| PayGateway[Multi-Gateway Payment Controller]
  PayGateway -->|Webhook updates| Db[(PostgreSQL DB)]
  Catalog -->|Query Index| Elastic[Search Index & Cache]`,
    questions: [
      { id: "q-1", question: "Do you require a multi-vendor multi-warehouse inventory split, or is the stock centralized in one primary location?", field: "inventory", answered: false },
      { id: "q-2", question: "Should we support recurring subscription-based products (like monthly snack boxes), or is it purely single purchases?", field: "subscription", answered: false }
    ],
    budget: { low: 15000, high: 28000, currency: "USD", details: "Includes frontend build, payment integrations, merchant dashboards, and 3 months post-launch support." }
  },
  "Food Delivery App": {
    sections: [
      { id: "exec", title: "Executive Summary", content: "An on-demand localized food ordering and delivery pipeline. Connects customers, restaurants, and freelance delivery gig-workers in real time with automated route optimizations and automated dispatching." }
    ],
    stories: [],
    risks: [],
    timeline: [],
    diagramCode: `graph TD
  Customer -->|Order| Server[Core Dispatch API]
  Server -->|Ping| Restaurant[Kitchen Dashboard]
  Server -->|Assign Route| Driver[Driver Mobile App]`,
    questions: [],
    budget: { low: 22000, high: 45000, currency: "USD", details: "Includes custom iOS & Android driver applications, restaurant manager portal, and core real-time socket server." }
  }
};

export const BRDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brds, setBrds] = useState<BRD[]>([]);
  const [activeBrdId, setActiveBrdId] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    // Load state from local storage on mount
    const savedBrds = localStorage.getItem("autobrd_projects");
    if (savedBrds) {
      try {
        setBrds(JSON.parse(savedBrds));
      } catch (e) {
        console.error("Error parsing saved BRDs", e);
      }
    }

    const savedUser = localStorage.getItem("autobrd_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Error parsing user state", e);
      }
    }

    const savedApiKey = localStorage.getItem("autobrd_apikey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const saveToLocalStorage = (newBrds: BRD[]) => {
    setBrds(newBrds);
    localStorage.setItem("autobrd_projects", JSON.stringify(newBrds));
  };

  const login = (email: string, name: string) => {
    const defaultUser = {
      name: name || "Demo Innovator",
      email: email || "innovator@autobrd.ai",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || "innovator")}`
    };
    setUser(defaultUser);
    setIsAuthenticated(true);
    localStorage.setItem("autobrd_user", JSON.stringify(defaultUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("autobrd_user");
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem("autobrd_apikey", key);
  };

  const createNewBRD = async (title: string, input: string, templateType: string, customAudioTranscript?: string): Promise<string> => {
    const id = "brd-" + Math.random().toString(36).substring(2, 9);
    
    // Create initially in "processing" state
    const newBrd: BRD = {
      id,
      title: title || `Project ${templateType}`,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "processing",
      originalInput: customAudioTranscript || input,
      language: "English",
      templateType,
      sections: [],
      userStories: [],
      risks: [],
      timeline: [],
      diagramCode: "",
      questions: [],
      budgetEstimate: { low: 0, high: 0, currency: "USD", details: "" }
    };

    const updatedBrds = [newBrd, ...brds];
    saveToLocalStorage(updatedBrds);
    setActiveBrdId(id);

    // Simulate AI extraction and analysis lag (3.5 seconds)
    setTimeout(() => {
      // Look up our baseline templates, fallback to E-commerce style if missing
      const templateData = PREBUILT_TEMPLATES_CONTENT[templateType] || PREBUILT_TEMPLATES_CONTENT["E-commerce App"];
      
      const populatedBrd: BRD = {
        ...newBrd,
        status: "clarification", // Moves to clarification step next
        sections: templateData.sections.map(s => ({
          ...s,
          content: s.content + `\n\n[Contextual Addition]: Tailored specifically based on user requirement details: "${input.substring(0, 100)}..."`
        })),
        userStories: templateData.stories.length > 0 ? templateData.stories : [
          { id: "us-10", title: "Auth", actor: "Client", action: "sign in quickly", benefit: "access the personalized UI", priority: "High", status: "To Do" }
        ],
        risks: templateData.risks.length > 0 ? templateData.risks : [
          { id: "rk-10", category: "Timeline", description: "Integrations could delay final milestones.", impact: "Medium", mitigation: "Establish early staging integration sandboxes." }
        ],
        timeline: templateData.timeline.length > 0 ? templateData.timeline : [
          { id: "ms-10", title: "Sprint 1: Core API & DB Setup", duration: "1 week", description: "Design underlying schema layouts.", deliverables: ["Working database models"] }
        ],
        diagramCode: templateData.diagramCode,
        questions: templateData.questions,
        budgetEstimate: templateData.budget
      };

      const finalBrds = brds.map(b => b.id === id ? populatedBrd : b);
      // If the list changed concurrently, append/overwrite
      const isStillInList = finalBrds.some(b => b.id === id);
      const finalSaveList = isStillInList ? finalBrds : [populatedBrd, ...brds.filter(b => b.id !== id)];
      saveToLocalStorage(finalSaveList);
    }, 3500);

    return id;
  };

  const updateBrdSection = (brdId: string, sectionId: string, content: string) => {
    const updated = brds.map(brd => {
      if (brd.id === brdId) {
        return {
          ...brd,
          sections: brd.sections.map(s => s.id === sectionId ? { ...s, content } : s)
        };
      }
      return brd;
    });
    saveToLocalStorage(updated);
  };

  const updateBrdStatus = (brdId: string, status: BRD["status"]) => {
    const updated = brds.map(brd => {
      if (brd.id === brdId) {
        return { ...brd, status };
      }
      return brd;
    });
    saveToLocalStorage(updated);
  };

  const updateStoryStatus = (brdId: string, storyId: string, status: UserStory["status"]) => {
    const updated = brds.map(brd => {
      if (brd.id === brdId) {
        return {
          ...brd,
          userStories: brd.userStories.map(s => s.id === storyId ? { ...s, status } : s)
        };
      }
      return brd;
    });
    saveToLocalStorage(updated);
  };

  const submitClarificationAnswer = async (brdId: string, questionId: string, answer: string) => {
    const updated = brds.map(brd => {
      if (brd.id === brdId) {
        // Mark the question as answered and add the response
        const newQuestions = brd.questions.map(q => 
          q.id === questionId ? { ...q, answered: true, answer } : q
        );

        // Dynamically append or inject the user's answer into relevant sections of the BRD!
        const questionObj = brd.questions.find(q => q.id === questionId);
        let updatedSections = [...brd.sections];
        
        if (questionObj) {
          const mapping: Record<string, string> = {
            "inventory": "functional",
            "subscription": "scope",
            "payment": "functional",
            "mobile": "scope"
          };
          const targetSectionId = mapping[questionObj.field] || "exec";
          updatedSections = brd.sections.map(sec => {
            if (sec.id === targetSectionId) {
              return {
                ...sec,
                content: sec.content + `\n\n[Clarification Refinement]: Regarding the inquiry on "${questionObj.question}", the decision made is: "${answer}".`
              };
            }
            return sec;
          });
        }

        return {
          ...brd,
          questions: newQuestions,
          sections: updatedSections
        };
      }
      return brd;
    });

    saveToLocalStorage(updated);
  };

  const translateActiveBRD = async (targetLang: string) => {
    if (!activeBrdId) return;

    // Translation mapping dictionary for Indian languages
    const translationTable: Record<string, Record<string, string>> = {
      "Hindi": {
        "Executive Summary": "कार्यकारी सारांश",
        "Problem Statement": "समस्या का विवरण",
        "Objectives": "उद्देश्य",
        "Scope": "दायरा (स्कोप)",
        "Functional Requirements": "कार्यात्मक आवश्यकताएं",
        "A high-performance, mobile-first E-Commerce web application featuring a fast, headless checkout": "एक उच्च-प्रदर्शन, मोबाइल-प्रथम ई-कॉमर्स वेब एप्लिकेशन जिसमें तेज़, हेडलेस चेकआउट शामिल है",
        "Existing legacy e-commerce sites suffer from sluggish page speeds": "मौजूदा पुराने ई-कॉमर्स साइटों की पेज स्पीड काफी धीमी होती है",
        "Achieve average page loading speed under 1.5 seconds.": "औसत पेज लोडिंग गति 1.5 सेकंड से कम प्राप्त करें।"
      },
      "Tamil": {
        "Executive Summary": "நிர்வாக சுருக்கம்",
        "Problem Statement": "பிரச்சனை அறிக்கை",
        "Objectives": "நோக்கங்கள்",
        "Scope": "எல்லை",
        "Functional Requirements": "செயல்பாட்டு தேவைகள்",
        "A high-performance, mobile-first E-Commerce web application featuring a fast, headless checkout": "வேகமான, ஹெட்லெஸ் செக்அவுட் கொண்ட உயர்தர மொபைல் இ-காமர்ஸ் இணைய பயன்பாடு"
      },
      "Gujarati": {
        "Executive Summary": "કાર્યવાહક સારાંશ",
        "Problem Statement": "સમસ્યાનું નિવેદન",
        "Objectives": "ઉદ્દેશ્યો",
        "Scope": "કાર્યક્ષેત્ર",
        "Functional Requirements": "કાર્યાત્મક આવશ્યકતાઓ"
      },
      "Marathi": {
        "Executive Summary": "कार्यकारी सारांश",
        "Problem Statement": "समस्येचे विधान",
        "Objectives": "उद्दिष्टे",
        "Scope": "व्याप्ती (स्कोप)",
        "Functional Requirements": "कार्यात्मक आवश्यकता"
      },
      "Bengali": {
        "Executive Summary": "নির্বাহী সারসংক্ষেপ",
        "Problem Statement": "সমস্যা বিবৃতি",
        "Objectives": "উদ্দেশ্য সমূহ",
        "Scope": "কাজের পরিধি",
        "Functional Requirements": "কার্যকরী প্রয়োজনীয়তা"
      }
    };

    const translationData = translationTable[targetLang];
    
    const updated = brds.map(brd => {
      if (brd.id === activeBrdId) {
        const translatedSections = brd.sections.map(sec => {
          let transTitle = sec.title;
          let transContent = sec.content;

          if (translationData) {
            // Translate title if exists in mapping
            if (translationData[sec.title]) {
              transTitle = translationData[sec.title];
            }
            
            // Basic mock replacement of sentence fragments for beautiful visual display
            Object.entries(translationData).forEach(([key, val]) => {
              if (sec.content.includes(key)) {
                transContent = transContent.replaceAll(key, val);
              }
            });
          }

          return {
            ...sec,
            title: transTitle,
            content: `[${targetLang} Translation]\n` + transContent
          };
        });

        return {
          ...brd,
          sections: translatedSections,
          language: targetLang,
          targetLang
        };
      }
      return brd;
    });

    saveToLocalStorage(updated);
  };

  const deleteBRD = (brdId: string) => {
    const updated = brds.filter(b => b.id !== brdId);
    saveToLocalStorage(updated);
    if (activeBrdId === brdId) {
      setActiveBrdId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const loadDemoProject = () => {
    const demoId = "demo-brd-777";
    const demoBrd: BRD = {
      id: demoId,
      title: "QuickBite Express Food Delivery Platform",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "completed",
      originalInput: "I want an on-demand food delivery app similar to Swiggy/Zomato. It needs real-time agent tracking on high-performance maps, a multi-currency responsive payment page via Razorpay, dynamic cooking notification logs, and an admin system for kitchens to list their menus and pricing. Support Hindi voice logs and generate high-fidelity user stories and risk analysis.",
      language: "English",
      templateType: "Food Delivery App",
      sections: [
        { 
          id: "exec", 
          title: "Executive Summary", 
          content: "QuickBite Express is a hyper-localized food commerce engine bridging local gourmet kitchens, casual restaurants, and dynamic freelance delivery riders. Utilizing real-time geo-clustering algorithms, the system minimizes dispatch latency and optimizes transport routes." 
        },
        { 
          id: "problem", 
          title: "Problem Statement", 
          content: "Small local culinary artisans suffer from high commission rates (often exceeding 28%) from centralized delivery aggregators. Additionally, consumers suffer from visual tracking glitches and delayed delivery dispatching in suburban corridors." 
        },
        { 
          id: "objectives", 
          title: "Objectives", 
          content: "1. Cap dispatching and route configuration within 45 seconds of order confirmation.\n2. Enable real-time, low-latency rider position updates (< 2 seconds polling intervals).\n3. Maintain flat commissions under 10% for home kitchens.\n4. Design intuitive, accessibility-compliant interfaces supporting Hindi and English navigation." 
        },
        { 
          id: "scope", 
          title: "Scope", 
          content: "Included:\n- Real-time client storefront (Web, Android, iOS).\n- Dynamic kitchen menu configurator.\n- Rider routing dispatcher with visual map canvas.\n- SMS notification gateway integration.\n\nExcluded:\n- Cold chain logistics telemetry systems." 
        },
        { 
          id: "functional", 
          title: "Functional Requirements", 
          content: "1. **Geo-Fencing Dispatcher**: Automatically identify the nearest active delivery gig-workers in a 3km radius.\n2. **Payment Hub**: Integrate instant UPI refund rails for customer order cancellations.\n3. **Visual Menu Editor**: Let restaurants drag and drop photo uploads, toggle product availability, and edit meal pricing ranges." 
        }
      ],
      userStories: [
        { id: "us-demo-1", title: "Rider Map Tracking", actor: "Customer", action: "see the real-time live position of the delivery rider on an active map layout", benefit: "I know exactly when to walk down to my building gate", priority: "High", status: "In Progress" },
        { id: "us-demo-2", title: "Menu Listing Toggle", actor: "Kitchen Chef", action: "tap a checkbox to quickly mark an item as Sold Out", benefit: "I avoid receiving orders for meals with depleted stock ingredients", priority: "High", status: "Done" },
        { id: "us-demo-3", title: "Hindi Audio Feedback", actor: "Rider", action: "hear the navigation audio instructions spoken in Hindi", benefit: "I can drive safely without looking at the screen every few seconds", priority: "Medium", status: "To Do" }
      ],
      risks: [
        { id: "rk-demo-1", category: "Network Latency", description: "Real-time socket disconnects during peak dinner periods (7 PM - 9 PM).", impact: "High", mitigation: "Deploy high-resilience long-polling fallbacks on client sockets." },
        { id: "rk-demo-2", category: "Rider Dispatching", description: "Sudden monsoon showers depleting driver availability pools.", impact: "High", mitigation: "Implement dynamic surge rates and schedule reservation incentives." }
      ],
      timeline: [
        { id: "ms-demo-1", title: "Phase 1: Database & Order Sockets", duration: "3 weeks", description: "Implement Postgres tables, write order dispatching state machines, and configure Socket.io routing.", deliverables: ["Socket cluster deployment", "Real-time chat schema"] },
        { id: "ms-demo-2", title: "Phase 2: Customer storefront & Razorpay", duration: "2 weeks", description: "Build cart components, setup Razorpay dynamic APIs, and checkout layouts.", deliverables: ["Complete frontend checkout pages", "UPI dynamic links working"] },
        { id: "ms-demo-3", title: "Phase 3: Rider & Kitchen App Beta", duration: "3 weeks", description: "Deliver responsive kitchen dashboard and simple PWA for gig riders.", deliverables: ["PWA build", "Rider tracking client app"] }
      ],
      diagramCode: `graph TD
  Storefront[Customer Client Storefront] -->|1. Place Order| Dispatch[Socket Dispatch System]
  Dispatch -->|2. Verify Inventory| Kitchen[Kitchen Dashboard Portal]
  Kitchen -->|3. Order Prepared| Dispatch
  Dispatch -->|4. Auto-Assign gig| Rider[Rider PWA Map Client]
  Rider -->|5. GPS Polling| Maps[Mapbox API Service]
  Maps -->|6. Visual Position| Storefront`,
      questions: [],
      budgetEstimate: {
        low: 32000,
        high: 58000,
        currency: "USD",
        details: "Covers Next.js app, real-time node socket servers, rider mobile PWA, Mapbox developer keys, and multi-tenant billing interfaces."
      }
    };

    // Prepend to active projects list
    const exist = brds.some(b => b.id === demoId);
    let updated;
    if (exist) {
      updated = brds.map(b => b.id === demoId ? demoBrd : b);
    } else {
      updated = [demoBrd, ...brds];
    }
    saveToLocalStorage(updated);
    setActiveBrdId(demoId);
  };

  const activeBrd = brds.find(b => b.id === activeBrdId) || null;

  return (
    <BRDContext.Provider
      value={{
        brds,
        activeBrdId,
        activeBrd,
        user,
        isAuthenticated,
        apiKey,
        setApiKey: handleApiKeyChange,
        login,
        logout,
        createNewBRD,
        updateBrdSection,
        updateBrdStatus,
        submitClarificationAnswer,
        translateActiveBRD,
        deleteBRD,
        loadDemoProject,
        updateStoryStatus
      }}
    >
      {children}
    </BRDContext.Provider>
  );
};

export const useBRD = () => {
  const context = useContext(BRDContext);
  if (context === undefined) {
    throw new Error("useBRD must be used within a BRDProvider");
  }
  return context;
};
