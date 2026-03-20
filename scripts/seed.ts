/**
 * Seed script: Populates a fresh Sanity dataset with all boilerplate content.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
 * SANITY_API_TOKEN to be set in .env.local (loaded via dotenv).
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { randomUUID } from "crypto";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-11",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

function key() {
  return randomUUID().slice(0, 12);
}

// ---------------------------------------------------------------------------
// 1. Site Settings (singleton, fixed _id)
// ---------------------------------------------------------------------------
const settings = {
  _id: "settings",
  _type: "settings",
  siteName: "TQ Lending",
  company: "Total Quality Lending",
  phone: "888-555-0100",
  phoneFormatted: "(888) 555-0100",
  email: "info@totalqualitylending.com",
  nmls: "TBD",
  address: "TBD",
  applyUrl: "/qualify",
  logoInitials: "TQ",
  socialLinks: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  footerText:
    "DSCR and investment property lending for real estate investors.",
  footerDisclaimer:
    "Equal Housing Lender. NMLS# TBD. This is not a commitment to lend.",
  newsletterTitle: "Investor Updates",
  newsletterDescription:
    "Get market insights, DSCR rate updates, and investment property tips delivered to your inbox.",
  defaultSeo: {
    metaTitle: "TQ Lending | Investment Property Loans for Real Estate Investors",
    metaDescription:
      "DSCR loans, fix and flip financing, and investment property lending for real estate investors. Close fast with no tax returns required.",
  },
};

// ---------------------------------------------------------------------------
// 2. Team Members
// ---------------------------------------------------------------------------
const teamMembers = [
  {
    _id: "team-jason-cole",
    _type: "teamMember",
    name: "Jason Cole",
    title: "Senior Loan Officer",
    nmls: "100001",
    bio: "Jason has over 12 years of experience in investment property lending, specializing in DSCR and portfolio loans. He helps investors scale from their first rental to multi-property portfolios with creative financing solutions.",
  },
  {
    _id: "team-rachel-park",
    _type: "teamMember",
    name: "Rachel Park",
    title: "Loan Officer",
    nmls: "100002",
    bio: "Rachel focuses on short-term rental and Airbnb financing. With a background in real estate investing herself, she understands the unique needs of STR operators and helps them secure the right loan products.",
  },
  {
    _id: "team-derek-thomas",
    _type: "teamMember",
    name: "Derek Thomas",
    title: "Loan Officer",
    nmls: "100003",
    bio: "Derek specializes in fix and flip financing and the BRRRR strategy. He works closely with investors who are actively building portfolios and need fast, reliable capital to close deals.",
  },
];

// ---------------------------------------------------------------------------
// 3. Product Pages
// ---------------------------------------------------------------------------
const productPages = [
  {
    _type: "productPage",
    slug: { _type: "slug", current: "dscr-purchase" },
    title: "DSCR Purchase Loans",
    subtitle: "Investment Property Financing Based on Rental Income",
    heroDescription:
      "Qualify based on the property's rental income, not your personal tax returns. DSCR purchase loans let you close faster and scale your portfolio without the paperwork of traditional lending.",
    whatIs: {
      title: "What is a DSCR Purchase Loan?",
      content:
        "A DSCR (Debt Service Coverage Ratio) purchase loan is an investment property mortgage that qualifies borrowers based on the property's rental income rather than personal income documentation. The DSCR is calculated by dividing the property's gross rental income by its total debt obligations (mortgage, taxes, insurance, HOA). A ratio of 1.0 or higher means the property generates enough income to cover its expenses. This makes DSCR loans ideal for self-employed investors, those with complex tax returns, or anyone looking to close quickly without the hassle of income verification.",
    },
    benefits: [
      "No personal income verification required",
      "No tax returns or W-2s needed",
      "Close in as fast as 21 days",
      "Loan amounts up to $2M",
      "Available for LLCs and entities",
      "Cash-out available at closing",
      "Interest-only options available",
    ],
    requirements: [
      { _key: key(), label: "Minimum DSCR", value: "1.0 (lower available with rate adjustment)" },
      { _key: key(), label: "Minimum Credit Score", value: "660" },
      { _key: key(), label: "Down Payment", value: "20-25%" },
      { _key: key(), label: "Property Types", value: "1-4 unit, condos, townhomes" },
      { _key: key(), label: "Loan Amounts", value: "$75K - $2M" },
    ],
    process: [
      { _key: key(), title: "Submit Your Deal", description: "Share your property details and rental income projections. We provide a preliminary quote within 24 hours." },
      { _key: key(), title: "Appraisal & Rent Analysis", description: "We order the appraisal with a rent schedule to confirm the property's value and market rent." },
      { _key: key(), title: "Underwriting", description: "No tax returns or pay stubs needed. We underwrite based on the property's DSCR and your credit profile." },
      { _key: key(), title: "Close & Fund", description: "Sign your documents and receive the keys. Most DSCR purchases close within 21-30 days." },
    ],
    faqs: [
      { _key: key(), question: "What DSCR ratio do I need to qualify?", answer: "Most programs require a minimum DSCR of 1.0, meaning the property's rental income covers its debt obligations. Some programs allow ratios below 1.0 with a rate adjustment and larger down payment. Higher DSCR ratios typically qualify for better rates." },
      { _key: key(), question: "Can I use projected rent instead of actual lease income?", answer: "Yes. For properties that are not yet rented, we use the appraiser's rent schedule to determine market rent. This is common when purchasing a new investment property that does not yet have a tenant in place." },
      { _key: key(), question: "Can I close in my LLC or business entity?", answer: "Absolutely. DSCR loans are designed for investors and can close in the name of an LLC, corporation, or other business entity. This is one of the key advantages over conventional investment property loans." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "dscr-refinance" },
    title: "DSCR Refinance",
    subtitle: "Refinance Your Investment Properties Without Tax Returns",
    heroDescription:
      "Lower your rate, pull out equity, or restructure your investment property debt. DSCR refinancing qualifies on rental income alone, so you can move fast without the paperwork.",
    whatIs: {
      title: "What is a DSCR Refinance?",
      content:
        "A DSCR refinance allows you to replace your existing investment property loan with a new one that qualifies based on the property's rental income. Whether you want to lower your interest rate, switch from a short-term loan to a long-term hold, or access equity through a cash-out refinance, DSCR programs offer a streamlined path. No tax returns, no employment verification, and no income documentation needed. This is especially valuable for investors coming off hard money or bridge loans who need to transition into permanent financing.",
    },
    benefits: [
      "No personal income verification",
      "Cash-out up to 75% LTV",
      "Rate and term refinance up to 80% LTV",
      "Transition from hard money to permanent financing",
      "No seasoning required for rate/term",
      "Interest-only options available",
      "Available for LLCs and entities",
    ],
    requirements: [
      { _key: key(), label: "Minimum DSCR", value: "1.0 (lower available)" },
      { _key: key(), label: "Minimum Credit Score", value: "660" },
      { _key: key(), label: "Max LTV (Cash-Out)", value: "75%" },
      { _key: key(), label: "Max LTV (Rate/Term)", value: "80%" },
      { _key: key(), label: "Property Types", value: "1-4 unit, condos, townhomes" },
    ],
    process: [
      { _key: key(), title: "Review Your Portfolio", description: "We analyze your current loan terms and property performance to determine the best refinance strategy." },
      { _key: key(), title: "Appraisal & Rent Verification", description: "A new appraisal confirms current value and market rents to calculate your DSCR." },
      { _key: key(), title: "Streamlined Underwriting", description: "No tax returns or pay stubs. Underwriting focuses on property performance and credit." },
      { _key: key(), title: "Close & Fund", description: "Sign your documents. Cash-out proceeds are typically wired within 3 business days of closing." },
    ],
    faqs: [
      { _key: key(), question: "How soon can I refinance after purchasing?", answer: "For rate and term refinances, many DSCR programs have no seasoning requirement. For cash-out refinances, most programs require 6 months of ownership. If you have made significant improvements, a delayed financing exception may apply." },
      { _key: key(), question: "Can I do a cash-out refinance on a DSCR loan?", answer: "Yes. You can access up to 75% of the property's appraised value in a cash-out refinance. This is a popular strategy for investors using the BRRRR method to pull equity out after a rehab and then reinvest into the next deal." },
      { _key: key(), question: "What if my property has a DSCR below 1.0?", answer: "Some programs allow DSCR ratios as low as 0.75, though these typically come with a rate premium and may require a lower LTV. We will help you find the right program based on your property's specific performance." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "str-airbnb" },
    title: "STR / Airbnb Loans",
    subtitle: "Financing for Short-Term Rental Properties",
    heroDescription:
      "Finance your next Airbnb or vacation rental property with loan programs designed for short-term rental operators. We use STR income projections to help you qualify.",
    whatIs: {
      title: "What is an STR / Airbnb Loan?",
      content:
        "An STR (Short-Term Rental) loan is a specialized DSCR loan designed for properties rented on platforms like Airbnb, VRBO, and Booking.com. Unlike traditional DSCR loans that use long-term lease income, STR loans can use projected or actual short-term rental income to calculate the debt service coverage ratio. Because short-term rentals often generate significantly higher revenue than long-term tenants, these properties may qualify for larger loan amounts or better terms when underwritten with STR income data.",
    },
    benefits: [
      "Use Airbnb/VRBO income to qualify",
      "Higher income projections than long-term rentals",
      "AirDNA and other STR data accepted",
      "No personal income verification required",
      "Available for vacation and resort markets",
      "Close in LLCs and business entities",
      "Interest-only options available",
    ],
    requirements: [
      { _key: key(), label: "Minimum DSCR", value: "1.0 with STR income" },
      { _key: key(), label: "Minimum Credit Score", value: "680" },
      { _key: key(), label: "Down Payment", value: "20-25%" },
      { _key: key(), label: "Income Documentation", value: "AirDNA report, actual STR history, or appraiser projection" },
      { _key: key(), label: "Property Types", value: "SFR, condos, townhomes in STR-eligible areas" },
    ],
    process: [
      { _key: key(), title: "Property Analysis", description: "We review the property's location, STR regulations, and income potential using AirDNA or comparable data." },
      { _key: key(), title: "Income Projection", description: "Using STR income data, we calculate the DSCR to determine your qualifying loan amount and rate." },
      { _key: key(), title: "Appraisal & Underwriting", description: "The appraiser includes an STR rent analysis. Underwriting focuses on property performance and credit profile." },
      { _key: key(), title: "Close & Start Hosting", description: "Close your loan and list your property. Most STR loans close within 21-30 days." },
    ],
    faqs: [
      { _key: key(), question: "Can I use projected Airbnb income if I have not hosted before?", answer: "Yes. We can use third-party data from sources like AirDNA to project your property's short-term rental income. If you already have hosting history, your actual revenue data can be used as well." },
      { _key: key(), question: "Do I need to verify that the area allows short-term rentals?", answer: "Yes, we require that the property is in an area where short-term rentals are legally permitted. We recommend checking local zoning laws and HOA rules before proceeding with a purchase." },
      { _key: key(), question: "Are STR loans more expensive than standard DSCR loans?", answer: "STR loans may carry a slight rate premium compared to standard DSCR loans due to the variable nature of short-term rental income. However, because STR properties often generate higher revenue, the overall economics are frequently more favorable." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "brrrr" },
    title: "BRRRR Strategy Loans",
    subtitle: "Buy, Rehab, Rent, Refinance, Repeat",
    heroDescription:
      "The BRRRR strategy is one of the most powerful ways to build a rental portfolio. We offer financing for every stage: acquisition, rehab, and the cash-out refinance that lets you recycle your capital.",
    whatIs: {
      title: "What is the BRRRR Strategy?",
      content:
        "BRRRR stands for Buy, Rehab, Rent, Refinance, Repeat. It is a real estate investment strategy where you purchase a distressed property below market value, renovate it to increase its value, rent it to a tenant, then refinance into a long-term DSCR loan to pull your capital back out. With that capital, you repeat the process on your next property. TQ Lending supports the BRRRR strategy with both short-term rehab loans for the acquisition and renovation phase, and long-term DSCR loans for the refinance and hold phase.",
    },
    benefits: [
      "Recycle your capital across multiple deals",
      "Short-term loans for the buy and rehab phase",
      "DSCR cash-out refinance for the hold phase",
      "No personal income verification on the refi",
      "Build equity through forced appreciation",
      "Scale your portfolio faster",
      "Available for LLCs and entities",
    ],
    requirements: [
      { _key: key(), label: "Rehab Phase", value: "Short-term loan, 12-18 month term" },
      { _key: key(), label: "Refi Phase (DSCR)", value: "Minimum 1.0 DSCR" },
      { _key: key(), label: "Minimum Credit Score", value: "660" },
      { _key: key(), label: "Down Payment (Purchase)", value: "10-20% of purchase + rehab" },
      { _key: key(), label: "Cash-Out Refi LTV", value: "Up to 75% of after-repair value" },
    ],
    process: [
      { _key: key(), title: "Buy", description: "Secure a short-term loan to acquire a below-market property. We fund based on the purchase price and rehab budget." },
      { _key: key(), title: "Rehab", description: "Complete your renovations with draws from the rehab budget. We work with you to release funds as milestones are completed." },
      { _key: key(), title: "Rent", description: "Place a qualified tenant and stabilize the property's income to prepare for the long-term refinance." },
      { _key: key(), title: "Refinance & Repeat", description: "Refinance into a DSCR loan based on the new appraised value, pull your capital out, and repeat the process." },
    ],
    faqs: [
      { _key: key(), question: "How much of my rehab costs will you fund?", answer: "We typically fund up to 100% of the rehab budget, depending on the total loan-to-cost ratio. The combined purchase price and rehab budget usually needs to stay within 85-90% of the after-repair value (ARV)." },
      { _key: key(), question: "How soon can I refinance after the rehab is done?", answer: "Most DSCR refinance programs require a 6-month seasoning period from the date of purchase. Some programs offer shorter seasoning for rate/term refinances or delayed financing exceptions." },
      { _key: key(), question: "Can I do a BRRRR on a multi-family property?", answer: "Yes. The BRRRR strategy works on single-family homes, duplexes, triplexes, and fourplexes. Multi-family properties often produce stronger DSCR ratios, which can make the refinance phase even more favorable." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "fix-and-flip" },
    title: "Fix and Flip Loans",
    subtitle: "Short-Term Financing for Property Flips",
    heroDescription:
      "Get the capital you need to buy, renovate, and sell. Our fix and flip loans offer fast closings, competitive rates, and rehab funding so you can execute your projects with confidence.",
    whatIs: {
      title: "What is a Fix and Flip Loan?",
      content:
        "A fix and flip loan is a short-term financing product designed for real estate investors who purchase properties, renovate them, and sell them for a profit. These loans typically have terms of 6 to 18 months, with interest-only payments during the project period. The loan covers both the acquisition cost and the renovation budget, with rehab funds disbursed in draws as work is completed. Fix and flip loans are evaluated primarily on the property's after-repair value (ARV) and the investor's experience, rather than personal income documentation.",
    },
    benefits: [
      "Close in as fast as 10-14 days",
      "Up to 90% of purchase price funded",
      "Up to 100% of rehab costs funded",
      "Interest-only payments during the project",
      "No personal income verification",
      "Experience-based qualification",
      "Available for LLCs and entities",
    ],
    requirements: [
      { _key: key(), label: "Minimum Credit Score", value: "650" },
      { _key: key(), label: "Max LTC (Loan-to-Cost)", value: "85-90%" },
      { _key: key(), label: "Max ARV", value: "70-75% of after-repair value" },
      { _key: key(), label: "Loan Terms", value: "6-18 months" },
      { _key: key(), label: "Experience", value: "First-time flippers considered" },
    ],
    process: [
      { _key: key(), title: "Submit Your Deal", description: "Provide the property address, purchase price, rehab budget, and ARV estimate. We give you a term sheet within 24 hours." },
      { _key: key(), title: "Due Diligence", description: "We review the deal economics, order a BPO or appraisal, and verify the scope of work." },
      { _key: key(), title: "Close & Start Renovating", description: "Close your loan and begin the rehab. Draw requests are processed quickly so your project stays on schedule." },
      { _key: key(), title: "Sell & Pay Off", description: "List the property, close the sale, and pay off the loan. Your profit is the spread between your total costs and the sale price." },
    ],
    faqs: [
      { _key: key(), question: "How fast can you close a fix and flip loan?", answer: "We can close fix and flip loans in as fast as 10-14 days, depending on the deal complexity and how quickly the appraisal or BPO is completed. Speed is critical in competitive markets, and we prioritize fast execution." },
      { _key: key(), question: "Do I need experience to get a fix and flip loan?", answer: "While experience helps you qualify for better terms and higher leverage, we do work with first-time flippers. New investors may need a larger down payment and will benefit from having a detailed scope of work and contractor lined up." },
      { _key: key(), question: "How are rehab draws disbursed?", answer: "Rehab funds are held in escrow and released in draws as work is completed. You submit a draw request, we send an inspector to verify the work, and funds are released, typically within a few business days." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "multi-family" },
    title: "Multi-Family Loans",
    subtitle: "Financing for 2-4 Unit and 5+ Unit Properties",
    heroDescription:
      "Scale your portfolio with multi-family investment property loans. Whether you are acquiring a duplex or a 20-unit apartment building, we have DSCR and commercial loan programs to match.",
    whatIs: {
      title: "What is a Multi-Family Loan?",
      content:
        "Multi-family loans are designed for properties with two or more residential units. For 2-4 unit properties, DSCR loan programs work similarly to single-family investment loans, qualifying on the combined rental income of all units. For 5+ unit properties, commercial loan programs are used, with underwriting focused on the property's net operating income (NOI), occupancy history, and overall financial performance. Multi-family properties are a favorite among investors because they spread vacancy risk across multiple tenants and often generate stronger cash flow per dollar invested.",
    },
    benefits: [
      "DSCR loans for 2-4 unit properties",
      "Commercial programs for 5+ units",
      "No personal income verification (DSCR)",
      "Higher cash flow from multiple tenants",
      "Reduced vacancy risk with diversified income",
      "Available for LLCs and entities",
      "Interest-only options available",
    ],
    requirements: [
      { _key: key(), label: "2-4 Units (DSCR)", value: "Minimum 1.0 DSCR, 660 credit" },
      { _key: key(), label: "5+ Units (Commercial)", value: "Minimum 1.25 DSCR, 660 credit" },
      { _key: key(), label: "Down Payment", value: "20-30% depending on unit count" },
      { _key: key(), label: "Loan Amounts", value: "$75K - $5M+" },
      { _key: key(), label: "Property Condition", value: "Stabilized occupancy preferred" },
    ],
    process: [
      { _key: key(), title: "Property Analysis", description: "We review the unit mix, rent roll, operating expenses, and market comps to assess the investment." },
      { _key: key(), title: "Loan Structuring", description: "Based on the property size and your goals, we recommend the best loan program and terms." },
      { _key: key(), title: "Appraisal & Underwriting", description: "A commercial or residential appraisal is completed, and underwriting evaluates the property's income performance." },
      { _key: key(), title: "Close & Fund", description: "Sign your documents and take ownership. Multi-family loans typically close in 30-45 days." },
    ],
    faqs: [
      { _key: key(), question: "What is the difference between a 2-4 unit loan and a 5+ unit loan?", answer: "Properties with 2-4 units qualify for residential DSCR loans, which are simpler and faster to close. Properties with 5+ units require commercial loan programs, which involve more detailed underwriting of the property's financials but can offer higher loan amounts and flexible terms." },
      { _key: key(), question: "Do all units need to be occupied to qualify?", answer: "No, but higher occupancy rates will improve your DSCR and help you qualify for better terms. For 5+ unit properties, lenders typically want to see at least 75-80% occupancy. For 2-4 unit DSCR loans, market rent projections can be used for vacant units." },
      { _key: key(), question: "Can I finance a multi-family property in an LLC?", answer: "Yes. Both our DSCR and commercial multi-family programs allow title to be held in an LLC or other business entity. This is standard practice for investment property financing." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "mixed-use" },
    title: "Mixed Use Loans",
    subtitle: "Commercial and Residential Under One Roof",
    heroDescription:
      "Finance mixed use properties that combine commercial and residential space. Retail on the ground floor, apartments above. We have loan programs designed for these unique investments.",
    whatIs: {
      title: "What is a Mixed Use Loan?",
      content:
        "A mixed use loan finances properties that contain both commercial and residential components. Common examples include buildings with retail or office space on the ground floor and apartments or rental units on the upper floors. These properties require specialized underwriting that evaluates both the commercial and residential income streams. Mixed use properties can be excellent investments because they diversify income across different tenant types and often benefit from strong locations in commercial corridors and downtown areas.",
    },
    benefits: [
      "Finance commercial and residential in one loan",
      "Diversified income from multiple tenant types",
      "Strong locations in commercial corridors",
      "Available for LLCs and entities",
      "DSCR-based qualification available",
      "No personal income verification on select programs",
      "Loan amounts up to $5M+",
    ],
    requirements: [
      { _key: key(), label: "Residential Percentage", value: "Typically 51%+ residential required for DSCR" },
      { _key: key(), label: "Minimum DSCR", value: "1.25" },
      { _key: key(), label: "Minimum Credit Score", value: "680" },
      { _key: key(), label: "Down Payment", value: "25-30%" },
      { _key: key(), label: "Loan Amounts", value: "$150K - $5M+" },
    ],
    process: [
      { _key: key(), title: "Property Evaluation", description: "We review the residential/commercial split, rent rolls for all units, lease terms, and property condition." },
      { _key: key(), title: "Program Selection", description: "Based on the property's composition, we select the appropriate DSCR or commercial loan program." },
      { _key: key(), title: "Appraisal & Underwriting", description: "A commercial appraisal evaluates both income streams. Underwriting analyzes overall property performance." },
      { _key: key(), title: "Close & Fund", description: "Sign your documents and close. Mixed use loans typically take 30-45 days to complete." },
    ],
    faqs: [
      { _key: key(), question: "What qualifies as a mixed use property?", answer: "A mixed use property contains both commercial space (retail, office, restaurant) and residential units (apartments, rental units) in the same building or on the same parcel. The most common configuration is commercial on the ground floor with residential above." },
      { _key: key(), question: "Does the residential percentage matter?", answer: "Yes. For DSCR loan programs, the property typically needs to be at least 51% residential by square footage or income. Properties that are majority commercial may require a full commercial loan program with different terms." },
      { _key: key(), question: "Are mixed use properties good investments?", answer: "Mixed use properties can be excellent investments because they provide diversified income streams, tend to be in high-demand locations, and offer multiple revenue sources. The combination of commercial and residential tenants can reduce overall vacancy risk." },
    ],
  },
];

// ---------------------------------------------------------------------------
// 4. Blog Posts
// ---------------------------------------------------------------------------
const blogPosts = [
  { title: "DSCR Loans Explained: How to Qualify Without Tax Returns", slug: "dscr-loans-explained", excerpt: "DSCR loans let real estate investors qualify based on rental income instead of personal tax returns. Here is everything you need to know about how they work.", category: "DSCR Loans", publishDate: "2026-03-15", readTime: "6 min read", authorId: "team-jason-cole" },
  { title: "5 Markets Where STR Investors Are Seeing Strong Returns in 2026", slug: "top-str-markets-2026", excerpt: "Short-term rental demand is shifting. These five markets are delivering strong cash-on-cash returns for Airbnb and VRBO investors this year.", category: "Short-Term Rentals", publishDate: "2026-03-10", readTime: "5 min read", authorId: "team-rachel-park" },
  { title: "The BRRRR Strategy: A Step-by-Step Guide for New Investors", slug: "brrrr-strategy-guide", excerpt: "Buy, rehab, rent, refinance, repeat. This proven strategy helps investors recycle capital and grow portfolios. Here is how to execute it.", category: "Investment Strategy", publishDate: "2026-03-05", readTime: "8 min read", authorId: "team-derek-thomas" },
  { title: "Fix and Flip Financing: What You Need to Know Before Your First Deal", slug: "fix-and-flip-financing-guide", excerpt: "From finding the right property to securing funding, this guide covers the essentials of fix and flip financing for both new and experienced investors.", category: "Fix and Flip", publishDate: "2026-02-28", readTime: "7 min read", authorId: "team-derek-thomas" },
  { title: "How to Calculate DSCR on a Rental Property", slug: "how-to-calculate-dscr", excerpt: "Understanding your debt service coverage ratio is key to qualifying for investment property loans. Walk through the calculation with real examples.", category: "DSCR Loans", publishDate: "2026-02-20", readTime: "5 min read", authorId: "team-jason-cole" },
  { title: "Multi-Family vs. Single-Family Rentals: Which Strategy Is Right for You?", slug: "multi-family-vs-single-family", excerpt: "Both approaches have advantages. Compare the cash flow, scalability, and financing options for multi-family and single-family rental investments.", category: "Investment Strategy", publishDate: "2026-02-15", readTime: "6 min read", authorId: "team-rachel-park" },
];

// ---------------------------------------------------------------------------
// 5. Guides / Whitepapers
// ---------------------------------------------------------------------------
const guides = [
  {
    _type: "guide",
    title: "The Investor's Guide to DSCR Loans",
    slug: { _type: "slug", current: "dscr-loan-guide" },
    description:
      "A comprehensive guide to DSCR lending for real estate investors. Covers qualification, property types, rate factors, and strategies for building a rental portfolio.",
    pages: "20",
  },
  {
    _type: "guide",
    title: "BRRRR Strategy Playbook",
    slug: { _type: "slug", current: "brrrr-strategy-playbook" },
    description:
      "Step-by-step playbook for executing the BRRRR strategy. Covers deal analysis, rehab budgeting, tenant placement, and refinancing into long-term DSCR loans.",
    pages: "16",
  },
];

// ---------------------------------------------------------------------------
// 6. Homepage (singleton, fixed _id)
// ---------------------------------------------------------------------------
const homepage = {
  _id: "homepage",
  _type: "homepage",
  blocks: [
    {
      _type: "heroBlock",
      _key: key(),
      headline: "Investment Property Loans Built for Investors",
      subheadline: "DSCR, Fix & Flip, STR, and Multi-Family Financing",
      description: "No tax returns. No income verification. Qualify based on the property's rental income and close in as fast as 21 days. Built for real estate investors who move fast.",
      ctaText: "Get a Quote",
      ctaHref: "/qualify",
      variant: "home",
      showForm: true,
      showStats: true,
    },
    {
      _type: "statsCounterBlock",
      _key: key(),
      stats: [
        { _key: key(), value: 500, prefix: "$", suffix: "M+", label: "Deals Funded" },
        { _key: key(), value: 48, prefix: "", suffix: "", label: "States" },
        { _key: key(), value: 21, prefix: "", suffix: " Days", label: "Avg. Close Time" },
        { _key: key(), value: 2000, prefix: "", suffix: "+", label: "Investors Served" },
      ],
    },
    {
      _type: "processStepsBlock",
      _key: key(),
      title: "How It Works",
      subtitle: "From application to closing in four simple steps",
      steps: [
        { _key: key(), step: 1, title: "Submit Your Deal", description: "Tell us about the property, your purchase price, and your investment strategy. We respond with a quote within 24 hours." },
        { _key: key(), step: 2, title: "Lock Your Rate", description: "Once you are satisfied with the terms, we lock your rate and order the appraisal to move things forward." },
        { _key: key(), step: 3, title: "Streamlined Underwriting", description: "No tax returns or pay stubs. We underwrite based on the property's rental income and your credit profile." },
        { _key: key(), step: 4, title: "Close and Fund", description: "Sign your documents and receive the keys. Most deals close within 21-30 days from application." },
      ],
    },
    {
      _type: "productCardsBlock",
      _key: key(),
      title: "Loan Programs",
      subtitle: "Financing solutions for every investment strategy",
      showAll: true,
    },
    {
      _type: "testimonialsBlock",
      _key: key(),
      title: "What Investors Are Saying",
      subtitle: "Real feedback from real estate investors",
      testimonials: [
        { _key: key(), name: "Kevin R.", location: "Phoenix, AZ", rating: 5, text: "Closed on a DSCR purchase in 18 days. No tax returns, no hassle. TQ Lending made it easy to add another property to my portfolio.", date: "February 2026" },
        { _key: key(), name: "Amanda & Chris L.", location: "Austin, TX", rating: 5, text: "We used TQ for our first Airbnb property. They understood STR income and got us approved when two other lenders could not figure it out.", date: "January 2026" },
        { _key: key(), name: "Marcus J.", location: "Atlanta, GA", rating: 5, text: "I have done three BRRRR deals with TQ Lending. The rehab loan closes fast and the DSCR refi on the back end is seamless. They get it.", date: "December 2025" },
        { _key: key(), name: "Lisa T.", location: "Nashville, TN", rating: 5, text: "Refinanced a 4-unit out of hard money into a DSCR loan with cash-out. The process was smooth and the rate was better than I expected.", date: "November 2025" },
        { _key: key(), name: "Daniel P.", location: "Tampa, FL", rating: 5, text: "TQ funded my fix and flip in 12 days. The draw process was simple and I sold the property for a 22% profit. Already working on deal number two.", date: "October 2025" },
      ],
    },
    {
      _type: "trustBadgesBlock",
      _key: key(),
      variant: "light",
    },
    {
      _type: "faqBlock",
      _key: key(),
      title: "Frequently Asked Questions",
      subtitle: "Common questions about DSCR and investment property lending",
      faqs: [
        { _key: key(), question: "What is a DSCR loan?", answer: "A DSCR (Debt Service Coverage Ratio) loan is an investment property mortgage that qualifies you based on the property's rental income rather than your personal income. No tax returns, W-2s, or employment verification required. The DSCR is calculated by dividing the property's gross rental income by its total debt obligations." },
        { _key: key(), question: "What DSCR ratio do I need?", answer: "Most programs require a minimum DSCR of 1.0, meaning the property's income covers its debt. Some programs go as low as 0.75 with a rate adjustment and lower LTV. A DSCR above 1.25 will typically qualify you for the best rates." },
        { _key: key(), question: "How fast can you close?", answer: "Most DSCR purchases and refinances close in 21-30 days. Fix and flip loans can close in as fast as 10-14 days. Speed depends on appraisal turnaround and how quickly you provide the required property documentation." },
        { _key: key(), question: "Can I close in my LLC?", answer: "Yes. All of our investment property loan programs allow you to close in the name of an LLC, corporation, or other business entity. This is standard for investment property lending and we handle entity closings regularly." },
        { _key: key(), question: "Do you lend in my state?", answer: "We lend in 48 states. Contact us with your property details and we will confirm availability and provide a quote for your specific market." },
        { _key: key(), question: "What is the minimum credit score?", answer: "Minimum credit scores vary by program. DSCR loans typically require 660+, STR loans require 680+, and fix and flip loans start at 650. Higher credit scores qualify for better rates and higher leverage." },
      ],
    },
    {
      _type: "ctaBlock",
      _key: key(),
      title: "Ready to Fund Your Next Deal?",
      description: "Get a quote in 24 hours. No tax returns, no income verification, no hassle.",
      primaryText: "Get a Quote",
      primaryHref: "/qualify",
      showPhone: true,
      variant: "default",
    },
  ],
  seo: {
    metaTitle: "TQ Lending | DSCR Loans & Investment Property Financing",
    metaDescription:
      "DSCR loans, fix and flip financing, STR loans, and multi-family lending for real estate investors. No tax returns required. Close in as fast as 21 days.",
  },
};

// ---------------------------------------------------------------------------
// 7. About Page (singleton, fixed _id)
// ---------------------------------------------------------------------------
const aboutPage = {
  _id: "about",
  _type: "about",
  missionTitle: "Our Mission",
  missionText:
    "We exist to help real estate investors grow their portfolios with fast, flexible financing. Traditional lenders were not built for investors. We were. Our team understands the strategies you use, from BRRRR to short-term rentals, and we have built loan programs that match the way you actually invest. No tax returns, no red tape, just capital when you need it.",
  blocks: [],
  seo: {
    metaTitle: "About Us | TQ Lending",
    metaDescription:
      "TQ Lending is built for real estate investors. DSCR loans, fix and flip financing, and investment property lending with no tax returns required.",
  },
};

// ---------------------------------------------------------------------------
// Execute seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log("Starting seed...\n");

  const transaction = client.transaction();

  // Settings
  console.log("  + Site Settings");
  transaction.createOrReplace(settings);

  // Team Members
  for (const member of teamMembers) {
    console.log(`  + Team: ${member.name}`);
    transaction.createOrReplace(member);
  }

  // Product Pages
  for (const page of productPages) {
    console.log(`  + Product: ${page.title}`);
    transaction.create(page);
  }

  // Blog Posts (with author references)
  for (const post of blogPosts) {
    const { authorId, ...rest } = post;
    const doc = {
      _type: "blogPost" as const,
      ...rest,
      slug: { _type: "slug" as const, current: post.slug },
      author: { _type: "reference" as const, _ref: authorId },
      body: `# ${post.title}\n\n${post.excerpt}\n\n*This is placeholder content. Replace with your full blog post.*`,
    };
    console.log(`  + Blog: ${post.title}`);
    transaction.create(doc);
  }

  // Guides
  for (const guide of guides) {
    console.log(`  + Guide: ${guide.title}`);
    transaction.create(guide);
  }

  // Homepage
  console.log("  + Homepage");
  transaction.createOrReplace(homepage);

  // About Page
  console.log("  + About Page");
  transaction.createOrReplace(aboutPage);

  console.log("\nCommitting transaction...");
  const result = await transaction.commit();
  console.log(`Done! Created/updated ${result.documentIds.length} documents.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
