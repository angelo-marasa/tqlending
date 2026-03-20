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
  siteName: "FHA Cash Out",
  company: "Mortgage Pipeline",
  phone: "866-866-0653",
  phoneFormatted: "(866) 866-0653",
  email: "info@mortgagepipeline.com",
  nmls: "2773",
  address: "27777 Franklin Rd, Suite 200, Southfield, MI 48034",
  applyUrl: "/apply",
  logoInitials: "MP",
  socialLinks: {
    facebook: "https://www.facebook.com/mortgagepipeline",
    twitter: "https://twitter.com/mortgagepipeline",
    instagram: "https://www.instagram.com/mortgagepipeline",
    linkedin: "https://www.linkedin.com/company/mortgage-pipeline",
    youtube: "https://www.youtube.com/mortgagepipeline",
  },
  footerText:
    "Putting affordable homeownership within reach with competitive FHA rates, flexible credit guidelines, and down payments as low as 3.5%.",
  footerDisclaimer:
    "This is not a commitment to lend. Programs, rates, terms, and conditions are subject to change without notice. All loans subject to credit approval. Equal Housing Lender.",
  newsletterTitle: "Stay Informed",
  newsletterDescription:
    "Get mortgage tips, rate updates, and homeownership guides delivered to your inbox.",
  defaultSeo: {
    metaTitle: "FHA Cash Out | Mortgage Pipeline",
    metaDescription:
      "Competitive FHA rates, flexible credit guidelines, and down payments as low as 3.5%. Get your personalized mortgage quote today.",
  },
};

// ---------------------------------------------------------------------------
// 2. Team Members
// ---------------------------------------------------------------------------
const teamMembers = [
  {
    _id: "team-john-mitchell",
    _type: "teamMember",
    name: "John Mitchell",
    title: "Senior Loan Officer",
    nmls: "123456",
    bio: "With over 15 years of experience in mortgage lending, John specializes in FHA and VA loans. He is passionate about helping first-time homebuyers navigate the path to homeownership.",
  },
  {
    _id: "team-sarah-chen",
    _type: "teamMember",
    name: "Sarah Chen",
    title: "Loan Officer",
    nmls: "234567",
    bio: "Sarah brings 10 years of expertise in refinancing and cash-out solutions. She is known for finding creative financing options that help clients achieve their financial goals.",
  },
  {
    _id: "team-marcus-williams",
    _type: "teamMember",
    name: "Marcus Williams",
    title: "Loan Officer",
    nmls: "345678",
    bio: "Marcus specializes in VA loans and military lending. As a veteran himself, he understands the unique needs of service members and their families.",
  },
];

// ---------------------------------------------------------------------------
// 3. Product Pages
// ---------------------------------------------------------------------------
const productPages = [
  {
    _type: "productPage",
    slug: { _type: "slug", current: "purchase-conventional" },
    title: "Conventional Purchase Loan",
    subtitle: "Traditional Financing with Competitive Rates",
    heroDescription:
      "A conventional mortgage offers flexible terms and competitive rates for borrowers with strong credit profiles. No government backing means potentially lower costs for qualified buyers.",
    whatIs: {
      title: "What is a Conventional Loan?",
      content:
        "A conventional loan is a mortgage that is not backed by a government agency like the FHA or VA. These loans typically require higher credit scores and larger down payments, but they offer advantages like no upfront mortgage insurance and the ability to cancel PMI once you reach 20% equity. Conventional loans are available in both fixed-rate and adjustable-rate options with terms ranging from 10 to 30 years.",
    },
    benefits: [
      "Down payments as low as 3%",
      "No upfront mortgage insurance premium",
      "PMI cancellable at 20% equity",
      "Higher loan limits available",
      "Fixed and adjustable rate options",
      "Primary, secondary, and investment properties",
      "No prepayment penalties",
    ],
    requirements: [
      { _key: key(), label: "Minimum Credit Score", value: "620" },
      { _key: key(), label: "Down Payment", value: "As low as 3%" },
      { _key: key(), label: "Debt-to-Income Ratio", value: "Up to 45%" },
      { _key: key(), label: "Property Types", value: "1-4 unit properties" },
      { _key: key(), label: "Loan Limits", value: "Up to $766,550 (2024)" },
    ],
    process: [
      { _key: key(), title: "Pre-Qualification", description: "Quick assessment of your financial situation and estimated loan amount." },
      { _key: key(), title: "Application", description: "Complete your full application with income, asset, and employment documentation." },
      { _key: key(), title: "Processing & Underwriting", description: "Your loan is reviewed, appraised, and verified by our underwriting team." },
      { _key: key(), title: "Closing", description: "Sign your documents, receive your keys, and move into your new home." },
    ],
    faqs: [
      { _key: key(), question: "What credit score do I need for a conventional loan?", answer: "Most lenders require a minimum credit score of 620 for a conventional loan. However, a score of 740 or higher will typically qualify you for the best available rates." },
      { _key: key(), question: "How much do I need for a down payment?", answer: "Conventional loans allow down payments as low as 3% for first-time homebuyers or 5% for other borrowers. A 20% down payment eliminates the need for private mortgage insurance (PMI)." },
      { _key: key(), question: "What is PMI and when can I remove it?", answer: "Private Mortgage Insurance (PMI) is required when you put down less than 20%. You can request PMI removal when your loan balance reaches 80% of the original home value, and it is automatically cancelled at 78%." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "purchase-fha" },
    title: "FHA Purchase Loan",
    subtitle: "Affordable Homeownership Within Reach",
    heroDescription:
      "FHA loans offer competitive interest rates with down payments as low as 3.5%, making homeownership accessible for first-time buyers and those with flexible credit needs.",
    whatIs: {
      title: "What is an FHA Loan?",
      content:
        "An FHA loan is a government-backed mortgage insured by the Federal Housing Administration. These loans are designed to make homeownership more accessible by offering lower down payment requirements, more flexible credit guidelines, and competitive interest rates. FHA loans require a Mortgage Insurance Premium (MIP), which protects the lender in case of default, allowing them to offer more favorable terms to borrowers.",
    },
    benefits: [
      "Down payments as low as 3.5%",
      "Down payment can come entirely from gift funds",
      "Credit scores as low as 580 accepted",
      "No income limits",
      "Competitive interest rates",
      "15 and 30-year fixed-rate options",
      "No prepayment penalty",
    ],
    requirements: [
      { _key: key(), label: "Minimum Credit Score", value: "580 (3.5% down) or 500 (10% down)" },
      { _key: key(), label: "Down Payment", value: "3.5% minimum" },
      { _key: key(), label: "Debt-to-Income Ratio", value: "Up to 50% with compensating factors" },
      { _key: key(), label: "Property Type", value: "Primary residence only" },
      { _key: key(), label: "Occupancy", value: "Must move in within 60 days" },
    ],
    process: [
      { _key: key(), title: "Pre-Qualification", description: "We assess your financial profile and determine the FHA loan amount you may qualify for." },
      { _key: key(), title: "Application & Documentation", description: "Submit your application with pay stubs, tax returns, bank statements, and identification." },
      { _key: key(), title: "Appraisal & Underwriting", description: "An FHA-approved appraiser evaluates the property, and our team reviews your complete file." },
      { _key: key(), title: "Closing", description: "Sign your closing documents, pay closing costs, and receive the keys to your new home." },
    ],
    faqs: [
      { _key: key(), question: "Can I use gift money for my FHA down payment?", answer: "Yes! FHA loans allow your entire 3.5% down payment to come from gift funds. The gift must be from an eligible donor such as a family member, employer, or approved organization, and a gift letter is required." },
      { _key: key(), question: "What is FHA Mortgage Insurance Premium (MIP)?", answer: "MIP is required on all FHA loans and consists of an upfront premium (1.75% of the loan amount, which can be financed) and an annual premium (0.55% for most loans) paid monthly. This insurance allows the FHA to offer more flexible qualification criteria." },
      { _key: key(), question: "Are there FHA loan limits?", answer: "Yes, FHA loan limits vary by county and are updated annually. In most areas, the 2024 limit for a single-family home is $498,257, but it can be higher in high-cost areas (up to $1,149,825)." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "purchase-va" },
    title: "VA Purchase Loan",
    subtitle: "Honoring Your Service with Exceptional Benefits",
    heroDescription:
      "VA loans provide eligible veterans, active-duty service members, and surviving spouses with zero-down payment financing, no PMI, and competitive rates. Thank you for your service.",
    whatIs: {
      title: "What is a VA Loan?",
      content:
        "A VA loan is a mortgage option guaranteed by the U.S. Department of Veterans Affairs. Available exclusively to eligible veterans, active-duty service members, National Guard and Reserve members, and eligible surviving spouses, VA loans offer some of the most favorable terms in mortgage lending, including zero down payment, no private mortgage insurance, and competitive interest rates.",
    },
    benefits: [
      "No down payment required",
      "No private mortgage insurance (PMI)",
      "Competitive interest rates",
      "Limited closing costs",
      "No prepayment penalty",
      "Flexible credit guidelines",
      "Reusable benefit",
    ],
    requirements: [
      { _key: key(), label: "Eligibility", value: "Veterans, active duty, Guard/Reserve, surviving spouses" },
      { _key: key(), label: "Certificate of Eligibility", value: "Required (we can help obtain)" },
      { _key: key(), label: "Minimum Credit Score", value: "Typically 580+" },
      { _key: key(), label: "Down Payment", value: "$0" },
      { _key: key(), label: "Funding Fee", value: "1.25% - 3.3% (may be exempt)" },
    ],
    process: [
      { _key: key(), title: "Determine Eligibility", description: "We help you obtain your Certificate of Eligibility (COE) to confirm your VA loan entitlement." },
      { _key: key(), title: "Pre-Approval", description: "Get pre-approved to understand your budget and strengthen your offer when house hunting." },
      { _key: key(), title: "VA Appraisal & Underwriting", description: "A VA-approved appraiser evaluates the property, and our team processes your complete loan file." },
      { _key: key(), title: "Closing", description: "Sign your documents, finalize your purchase, and move into your new home with zero down." },
    ],
    faqs: [
      { _key: key(), question: "Do I have to be a veteran to qualify?", answer: "VA loans are available to veterans, active-duty service members, National Guard and Reserve members with qualifying service, and eligible surviving spouses. Specific service requirements vary. We can help you determine your eligibility." },
      { _key: key(), question: "What is the VA funding fee?", answer: "The VA funding fee is a one-time fee (1.25% to 3.3% of the loan amount) that helps fund the VA loan program. Veterans receiving disability compensation and surviving spouses are typically exempt from this fee." },
      { _key: key(), question: "Can I use my VA benefit more than once?", answer: "Yes! Your VA loan benefit is reusable. As long as you have remaining entitlement and meet eligibility requirements, you can use your VA benefit multiple times throughout your lifetime." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "refinance-cash-out" },
    title: "FHA Cash-Out Refinance",
    subtitle: "Unlock Your Home Equity",
    heroDescription:
      "Turn your home equity into cash with an FHA Cash-Out Refinance. Competitive rates, flexible guidelines, and funds for anything you need, from home improvements to debt consolidation.",
    whatIs: {
      title: "What is an FHA Cash-Out Refinance?",
      content:
        "An FHA Cash-Out Refinance replaces your existing mortgage with a new, larger FHA loan, allowing you to receive the difference in cash. You can borrow up to 80% of your home's current appraised value. This is an excellent way to access your built-up home equity for major expenses like home renovations, debt consolidation, education costs, or emergency funds, all while potentially securing a lower interest rate.",
    },
    benefits: [
      "Borrow up to 80% of your home value",
      "Use funds for any purpose",
      "Competitive interest rates",
      "Flexible credit requirements (580+ score)",
      "Available for primary residences",
      "Can refinance from any loan type into FHA",
      "No prepayment penalty",
    ],
    requirements: [
      { _key: key(), label: "Minimum Credit Score", value: "580" },
      { _key: key(), label: "Maximum LTV", value: "80%" },
      { _key: key(), label: "Property Type", value: "Primary residence" },
      { _key: key(), label: "Seasoning Requirement", value: "12 months of ownership" },
      { _key: key(), label: "Debt-to-Income Ratio", value: "Up to 50% with compensating factors" },
    ],
    process: [
      { _key: key(), title: "Consultation", description: "We review your current mortgage, home value estimate, and financial goals to determine how much equity you can access." },
      { _key: key(), title: "Application", description: "Complete your application with current mortgage information, income documentation, and identification." },
      { _key: key(), title: "Appraisal & Underwriting", description: "A certified appraiser determines your home's current value, and our underwriting team reviews your complete file." },
      { _key: key(), title: "Closing & Funding", description: "Sign your new loan documents, and receive your cash-out funds, typically within 3 business days after closing." },
    ],
    faqs: [
      { _key: key(), question: "How much cash can I get from an FHA Cash-Out Refinance?", answer: "You can borrow up to 80% of your home's appraised value. After paying off your existing mortgage, the remaining amount is yours as cash. For example, if your home is worth $300,000 and you owe $150,000, you could potentially access up to $90,000 in cash." },
      { _key: key(), question: "What can I use the cash for?", answer: "You can use FHA Cash-Out Refinance funds for virtually any purpose: home improvements, debt consolidation, education expenses, emergency funds, medical bills, or even investing. There are no restrictions on how you use the funds." },
      { _key: key(), question: "Do I need to have an FHA loan to do an FHA Cash-Out Refinance?", answer: "No! You can refinance from any loan type (conventional, VA, USDA, or even a private loan) into an FHA Cash-Out Refinance. This makes it an excellent option for homeowners regardless of their current mortgage type." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "refinance-conventional" },
    title: "Conventional Refinance",
    subtitle: "Lower Your Rate, Shorten Your Term",
    heroDescription:
      "Refinance your existing mortgage with a conventional loan to secure a lower rate, reduce your monthly payment, or shorten your loan term. Smart refinancing starts here.",
    whatIs: {
      title: "What is a Conventional Refinance?",
      content:
        "A conventional refinance replaces your current mortgage with a new conventional loan, typically to achieve a better interest rate, lower monthly payment, or change your loan term. Unlike government-backed refinances, conventional refinancing may offer lower costs for borrowers with strong credit profiles and significant equity in their homes.",
    },
    benefits: [
      "Lower your interest rate",
      "Reduce monthly payments",
      "Shorten your loan term",
      "Remove PMI with 20%+ equity",
      "Switch from adjustable to fixed rate",
      "No upfront mortgage insurance",
      "No prepayment penalties",
    ],
    requirements: [
      { _key: key(), label: "Minimum Credit Score", value: "620" },
      { _key: key(), label: "Maximum LTV", value: "97% (rate/term), 80% (cash-out)" },
      { _key: key(), label: "Debt-to-Income Ratio", value: "Up to 45%" },
      { _key: key(), label: "Property Types", value: "Primary, secondary, investment" },
      { _key: key(), label: "Seasoning", value: "Varies by lender" },
    ],
    process: [
      { _key: key(), title: "Rate Comparison", description: "We compare your current rate with available options to ensure refinancing makes financial sense." },
      { _key: key(), title: "Application", description: "Submit your refinance application with updated income, asset, and property documentation." },
      { _key: key(), title: "Appraisal & Processing", description: "An appraiser confirms your property value, and our team processes your new loan." },
      { _key: key(), title: "Closing", description: "Sign your new loan documents. Your old loan is paid off, and new terms take effect." },
    ],
    faqs: [
      { _key: key(), question: "When does it make sense to refinance?", answer: "Refinancing typically makes sense when you can reduce your rate by at least 0.5%, when you plan to stay in the home long enough to recoup closing costs, or when you want to change your loan term. We can help you calculate your break-even point." },
      { _key: key(), question: "What are the closing costs for a conventional refinance?", answer: "Closing costs typically range from 2% to 5% of the loan amount and may include appraisal fees, title insurance, origination fees, and recording fees. Some lenders offer no-closing-cost options where fees are rolled into the loan or offset by a slightly higher rate." },
      { _key: key(), question: "Can I refinance to remove PMI?", answer: "Yes! If your home has appreciated in value or you have paid down your loan balance to where you have at least 20% equity, refinancing into a new conventional loan can eliminate your PMI payments entirely." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "refinance-fha-streamline" },
    title: "FHA Streamline Refinance",
    subtitle: "Simplified Refinancing for FHA Borrowers",
    heroDescription:
      "Already have an FHA loan? The FHA Streamline Refinance offers a faster, simpler way to lower your rate with minimal documentation and no appraisal in many cases.",
    whatIs: {
      title: "What is an FHA Streamline Refinance?",
      content:
        "An FHA Streamline Refinance is a simplified refinancing program designed exclusively for homeowners who already have an FHA loan. It requires less documentation than a traditional refinance, often does not require a new appraisal, and is designed to reduce your monthly mortgage payment or move you from an adjustable-rate to a fixed-rate loan. It is one of the fastest and most affordable ways to refinance.",
    },
    benefits: [
      "No appraisal required in most cases",
      "Reduced documentation requirements",
      "Lower upfront MIP (0.01% if refinancing within 3 years)",
      "Faster processing time",
      "No income verification required",
      "No minimum credit score from FHA",
      "Must result in net tangible benefit",
    ],
    requirements: [
      { _key: key(), label: "Current Loan", value: "Must have an existing FHA loan" },
      { _key: key(), label: "Payment History", value: "On-time payments for past 12 months" },
      { _key: key(), label: "Net Tangible Benefit", value: "Must reduce payment or improve loan terms" },
      { _key: key(), label: "Seasoning", value: "210 days / 6 payments on current FHA loan" },
      { _key: key(), label: "Appraisal", value: "Not required (non-credit qualifying)" },
    ],
    process: [
      { _key: key(), title: "Eligibility Check", description: "We verify your current FHA loan details and confirm you meet the streamline requirements." },
      { _key: key(), title: "Simplified Application", description: "Complete a streamlined application with minimal documentation. No income verification or appraisal needed." },
      { _key: key(), title: "Quick Processing", description: "With reduced requirements, your loan moves through processing faster than a traditional refinance." },
      { _key: key(), title: "Closing", description: "Sign your new loan documents and start enjoying your lower monthly payment." },
    ],
    faqs: [
      { _key: key(), question: "Do I need an appraisal for an FHA Streamline?", answer: "In most cases, no. The FHA Streamline Refinance program was designed to be fast and simple, and a new appraisal is typically not required. The lender will use the original appraised value from when you purchased or last refinanced." },
      { _key: key(), question: "What does 'net tangible benefit' mean?", answer: "The FHA requires that your streamline refinance provide a net tangible benefit, meaning it must lower your monthly mortgage payment by at least 5% or move you from an adjustable-rate to a fixed-rate mortgage. This protects borrowers from refinancing when it is not in their financial interest." },
      { _key: key(), question: "How soon can I do an FHA Streamline Refinance?", answer: "You must wait at least 210 days from your FHA loan closing date and have made at least 6 monthly payments before you are eligible for a streamline refinance." },
    ],
  },
  {
    _type: "productPage",
    slug: { _type: "slug", current: "heloc" },
    title: "Home Equity Line of Credit",
    subtitle: "Flexible Access to Your Home Equity",
    heroDescription:
      "A HELOC gives you a revolving line of credit secured by your home equity. Draw funds as needed, pay interest only on what you use, and enjoy the flexibility of a credit line.",
    whatIs: {
      title: "What is a HELOC?",
      content:
        "A Home Equity Line of Credit (HELOC) is a revolving credit line secured by your home equity. Unlike a traditional loan where you receive a lump sum, a HELOC works like a credit card: you are approved for a maximum amount and can draw funds as needed during the draw period (typically 5 to 10 years). You only pay interest on the amount you borrow, making it a flexible option for ongoing expenses or projects.",
    },
    benefits: [
      "Draw funds as needed",
      "Pay interest only on what you use",
      "Lower interest rates than credit cards",
      "Interest may be tax-deductible",
      "Flexible repayment options",
      "Reusable credit line during draw period",
      "No restrictions on fund usage",
    ],
    requirements: [
      { _key: key(), label: "Minimum Credit Score", value: "680" },
      { _key: key(), label: "Maximum CLTV", value: "85%" },
      { _key: key(), label: "Property Type", value: "Primary or secondary residence" },
      { _key: key(), label: "Equity Required", value: "At least 15-20%" },
      { _key: key(), label: "Draw Period", value: "5-10 years" },
    ],
    process: [
      { _key: key(), title: "Equity Assessment", description: "We evaluate your home value and existing mortgage to determine your available equity and maximum credit line." },
      { _key: key(), title: "Application", description: "Complete your HELOC application with income verification, property details, and identification." },
      { _key: key(), title: "Appraisal & Approval", description: "Your property is appraised, and our team reviews your application for final approval and credit line amount." },
      { _key: key(), title: "Access Your Funds", description: "Once approved, access your credit line via checks, transfers, or a dedicated card whenever you need funds." },
    ],
    faqs: [
      { _key: key(), question: "How is a HELOC different from a cash-out refinance?", answer: "A cash-out refinance replaces your entire mortgage with a new, larger loan, giving you a lump sum of cash. A HELOC is a separate line of credit on top of your existing mortgage that you can draw from as needed. HELOCs offer more flexibility but typically have variable interest rates." },
      { _key: key(), question: "Is HELOC interest tax-deductible?", answer: "HELOC interest may be tax-deductible if the funds are used to buy, build, or substantially improve the home securing the line of credit. Consult with a tax advisor to understand how current tax laws apply to your situation." },
      { _key: key(), question: "What happens at the end of the draw period?", answer: "When the draw period ends (typically after 5 to 10 years), you enter the repayment period (usually 10 to 20 years). During repayment, you can no longer draw funds and must repay the outstanding balance with principal and interest payments." },
    ],
  },
];

// ---------------------------------------------------------------------------
// 4. Blog Posts (no body markdown for now, just metadata for listing)
// ---------------------------------------------------------------------------
const blogPosts = [
  { title: "5 Ways to Use Your FHA Cash-Out Refinance Funds", slug: "5-ways-to-use-fha-cash-out-funds", excerpt: "From home improvements to debt consolidation, discover the smartest ways to put your home equity to work for you.", category: "Refinancing", publishDate: "2026-02-28", readTime: "5 min read", authorId: "team-sarah-chen" },
  { title: "First-Time Homebuyer? Here Is What You Need to Know About FHA Loans", slug: "first-time-homebuyer-fha-guide", excerpt: "FHA loans make homeownership accessible with low down payments and flexible credit requirements. Here is your complete guide.", category: "FHA Loans", publishDate: "2026-02-20", readTime: "7 min read", authorId: "team-john-mitchell" },
  { title: "Understanding Mortgage Insurance: FHA MIP vs. Conventional PMI", slug: "mortgage-insurance-fha-mip-vs-pmi", excerpt: "Mortgage insurance can be confusing. We break down the differences between FHA MIP and conventional PMI so you can make an informed decision.", category: "Education", publishDate: "2026-02-15", readTime: "6 min read", authorId: "team-sarah-chen" },
  { title: "VA Loan Benefits: What Every Veteran Should Know", slug: "va-loan-benefits-veterans-guide", excerpt: "Veterans have earned exceptional mortgage benefits. Learn about zero-down financing, no PMI, and competitive rates available to you.", category: "VA Loans", publishDate: "2026-02-10", readTime: "5 min read", authorId: "team-marcus-williams" },
  { title: "How to Improve Your Credit Score Before Applying for a Mortgage", slug: "improve-credit-score-mortgage", excerpt: "Your credit score plays a major role in your mortgage rate. Here are proven strategies to boost your score before applying.", category: "Tips", publishDate: "2026-02-05", readTime: "8 min read", authorId: "team-john-mitchell" },
  { title: "Cash-Out Refinance vs. HELOC: Which Is Right for You?", slug: "cash-out-refinance-vs-heloc", excerpt: "Both options let you access home equity, but they work differently. Compare the pros and cons to find the best fit for your goals.", category: "Refinancing", publishDate: "2026-01-28", readTime: "6 min read", authorId: "team-sarah-chen" },
  { title: "FHA Loan Limits 2026: What You Need to Know", slug: "fha-loan-limits-2026", excerpt: "FHA loan limits have been updated for 2026. Find out the new limits in your area and how they affect your buying power.", category: "FHA Loans", publishDate: "2026-02-25", readTime: "4 min read", authorId: "team-john-mitchell" },
  { title: "The Pros and Cons of Refinancing Your Mortgage in 2026", slug: "pros-cons-refinancing-2026", excerpt: "Interest rates are shifting. Here is how to decide whether refinancing makes financial sense for your situation this year.", category: "Refinancing", publishDate: "2026-02-22", readTime: "6 min read", authorId: "team-sarah-chen" },
  { title: "HELOC vs. Home Equity Loan: Understanding the Difference", slug: "heloc-vs-home-equity-loan", excerpt: "Both tap your home equity, but they work in very different ways. Learn which option aligns with your financial goals.", category: "HELOC", publishDate: "2026-02-18", readTime: "5 min read", authorId: "team-marcus-williams" },
  { title: "How to Qualify for a VA Loan: Step-by-Step Guide", slug: "how-to-qualify-va-loan", excerpt: "From your Certificate of Eligibility to closing day, here is exactly what you need to do to get approved for a VA loan.", category: "VA Loans", publishDate: "2026-02-12", readTime: "7 min read", authorId: "team-marcus-williams" },
  { title: "Mortgage Rate Forecast: What Experts Predict for Spring 2026", slug: "mortgage-rate-forecast-spring-2026", excerpt: "Economic indicators and Fed policy are shaping the rate environment. Here is what leading analysts expect for the months ahead.", category: "Market Updates", publishDate: "2026-02-08", readTime: "5 min read", authorId: "team-john-mitchell" },
  { title: "Debt-to-Income Ratio Explained: Why It Matters for Your Mortgage", slug: "debt-to-income-ratio-explained", excerpt: "Your DTI ratio is one of the most important factors lenders evaluate. Learn how to calculate yours and what you can do to improve it.", category: "Education", publishDate: "2026-02-03", readTime: "6 min read", authorId: "team-sarah-chen" },
  { title: "5 Mistakes to Avoid When Applying for an FHA Loan", slug: "mistakes-to-avoid-fha-loan", excerpt: "These common missteps can delay your closing or cost you money. Make sure you are prepared before you submit your application.", category: "FHA Loans", publishDate: "2026-01-30", readTime: "5 min read", authorId: "team-john-mitchell" },
  { title: "How a HELOC Can Fund Your Home Renovation", slug: "heloc-fund-home-renovation", excerpt: "A home equity line of credit is one of the smartest ways to finance renovations. Here is how to use it effectively.", category: "HELOC", publishDate: "2026-01-25", readTime: "5 min read", authorId: "team-marcus-williams" },
  { title: "FHA Streamline Refinance: Is It Worth It?", slug: "fha-streamline-refinance-worth-it", excerpt: "If you already have an FHA loan, the Streamline program offers a fast path to lower payments. Find out if you qualify.", category: "Refinancing", publishDate: "2026-01-22", readTime: "4 min read", authorId: "team-sarah-chen" },
  { title: "What Closing Costs Should You Expect on a Mortgage?", slug: "mortgage-closing-costs-explained", excerpt: "Closing costs can add up quickly. Here is a breakdown of what to expect and how to plan for these expenses.", category: "Education", publishDate: "2026-01-18", readTime: "7 min read", authorId: "team-john-mitchell" },
  { title: "Spring 2026 Housing Market: Trends Buyers Should Watch", slug: "spring-2026-housing-market-trends", excerpt: "Inventory, pricing, and buyer demand are all shifting. Here is what the spring market looks like and how to position yourself.", category: "Market Updates", publishDate: "2026-01-15", readTime: "6 min read", authorId: "team-marcus-williams" },
  { title: "How to Use Gift Funds for Your Down Payment", slug: "gift-funds-down-payment-guide", excerpt: "Family members can help you buy a home. Learn the rules, documentation requirements, and tips for using gift funds on FHA loans.", category: "Tips", publishDate: "2026-01-10", readTime: "5 min read", authorId: "team-john-mitchell" },
];

// ---------------------------------------------------------------------------
// 5. Guides / Whitepapers
// ---------------------------------------------------------------------------
const guides = [
  {
    _type: "guide",
    title: "The Complete Guide to FHA Cash-Out Refinancing",
    slug: { _type: "slug", current: "fha-cash-out-guide" },
    description:
      "Everything you need to know about accessing your home equity through an FHA Cash-Out Refinance. Covers eligibility, process, costs, and strategies.",
    pages: "24",
  },
  {
    _type: "guide",
    title: "First-Time Homebuyer Handbook",
    slug: { _type: "slug", current: "first-time-homebuyer-handbook" },
    description:
      "A step-by-step guide for first-time buyers covering FHA loans, down payment assistance, credit preparation, and the home buying timeline.",
    pages: "18",
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
      headline: "Your Path to Homeownership Starts Here",
      subheadline: "FHA, VA, Conventional & HELOC Solutions",
      description: "Get competitive rates with down payments as low as 3.5%. Check your personalized rates in minutes with no impact to your credit score.",
      ctaText: "Check Your Rates",
      ctaHref: "/apply",
      variant: "home",
      showForm: true,
      showStats: true,
    },
    {
      _type: "statsCounterBlock",
      _key: key(),
      stats: [
        { _key: key(), value: 750, prefix: "$", suffix: "M+", label: "Loans Funded" },
        { _key: key(), value: 50, prefix: "", suffix: "+", label: "Years of Experience" },
        { _key: key(), value: 3000, prefix: "", suffix: "+", label: "Loans Closed" },
        { _key: key(), value: 98, prefix: "", suffix: "%", label: "Client Satisfaction" },
      ],
    },
    {
      _type: "processStepsBlock",
      _key: key(),
      title: "How It Works",
      subtitle: "Get your personalized rate in three simple steps",
      steps: [
        { _key: key(), step: 1, title: "Enter Your ZIP Code", description: "Get the most accurate rate by entering your ZIP code for the home you are looking to purchase or refinance." },
        { _key: key(), step: 2, title: "Complete the Form", description: "Fill out our quick form to get personalized rates tailored to your situation. Fast, easy, and no commitment required." },
        { _key: key(), step: 3, title: "Get Your Rates", description: "Receive your personalized rates instantly and connect with a loan officer who will guide you through the process." },
      ],
    },
    {
      _type: "productCardsBlock",
      _key: key(),
      title: "Loan Programs",
      subtitle: "Find the right mortgage for your needs",
      showAll: true,
    },
    {
      _type: "testimonialsBlock",
      _key: key(),
      title: "What Our Clients Say",
      subtitle: "Real stories from real homeowners",
      testimonials: [
        { _key: key(), name: "Sarah M.", location: "Tampa, FL", rating: 5, text: "The team at Mortgage Pipeline made our FHA Cash Out refinance incredibly smooth. We got a great rate and used the cash to renovate our kitchen. Could not be happier with the service!", date: "January 2026" },
        { _key: key(), name: "James & Linda R.", location: "Nashville, TN", rating: 5, text: "As first-time homebuyers, we were nervous about the process. Our loan officer walked us through every step. The 3.5% down payment made our dream home affordable.", date: "December 2025" },
        { _key: key(), name: "Michael T.", location: "Columbus, OH", rating: 5, text: "I used my VA benefits combined with an FHA cash out to consolidate debt. The team was knowledgeable, responsive, and closed faster than expected. Highly recommend!", date: "November 2025" },
        { _key: key(), name: "Patricia K.", location: "Houston, TX", rating: 5, text: "We refinanced from a 6.5% rate down to 4.2% and saved over $400 per month. The online application was easy and the closing was seamless.", date: "October 2025" },
        { _key: key(), name: "David & Maria S.", location: "Detroit, MI", rating: 5, text: "Mortgage Pipeline helped us navigate a complicated purchase. They found creative solutions when other lenders turned us away. Forever grateful for their expertise.", date: "September 2025" },
      ],
    },
    {
      _type: "trustBadgesBlock",
      _key: key(),
      variant: "light",
    },
    {
      _type: "blogCardsBlock",
      _key: key(),
      title: "Mortgage Insights",
      subtitle: "Tips, guides, and market updates to keep you informed",
      limit: 3,
      showViewAll: true,
    },
    {
      _type: "faqBlock",
      _key: key(),
      title: "Frequently Asked Questions",
      subtitle: "Get answers to common mortgage questions",
      faqs: [
        { _key: key(), question: "What is an FHA Cash-Out Refinance?", answer: "An FHA Cash-Out Refinance allows you to replace your existing mortgage with a new, larger FHA loan and receive the difference in cash. You can borrow up to 80% of your home's appraised value, making it a great way to access your home equity for renovations, debt consolidation, or other financial needs." },
        { _key: key(), question: "What are the minimum requirements for an FHA loan?", answer: "FHA loans require a minimum credit score of 580 for a 3.5% down payment (or 500 with 10% down), a debt-to-income ratio of 43% or less (up to 50% with compensating factors), and the property must be your primary residence. There are no income limits, and gift funds can cover the entire down payment." },
        { _key: key(), question: "How much can I borrow with an FHA Cash-Out Refinance?", answer: "With an FHA Cash-Out Refinance, you can borrow up to 80% of your home's current appraised value. For example, if your home is worth $300,000, you could refinance for up to $240,000. After paying off your existing mortgage balance, the remaining amount comes to you as cash." },
        { _key: key(), question: "What is the difference between FHA and conventional loans?", answer: "FHA loans are government-backed and offer more flexible qualification criteria, including lower credit score requirements and smaller down payments (3.5% vs. up to 20%). Conventional loans may offer lower rates for borrowers with strong credit and typically do not require mortgage insurance with 20% down." },
        { _key: key(), question: "How long does the mortgage process take?", answer: "The typical mortgage process takes 30 to 45 days from application to closing. However, timelines can vary depending on the loan type, documentation provided, and property appraisal. Our team works diligently to streamline the process and keep you informed every step of the way." },
        { _key: key(), question: "Can I use gift funds for my down payment?", answer: "Yes! FHA loans allow your entire down payment to come from gift funds. The gift must be from an acceptable donor such as a family member, employer, or charitable organization. A gift letter and documentation of the transfer are required." },
      ],
    },
    {
      _type: "ctaBlock",
      _key: key(),
      title: "Ready to Get Started?",
      description: "Get your personalized mortgage rate in minutes. No obligation, no impact to your credit score.",
      primaryText: "Check Your Rates",
      primaryHref: "/apply",
      showPhone: true,
      variant: "default",
    },
  ],
  seo: {
    metaTitle: "FHA Cash Out | Competitive Rates & Low Down Payments",
    metaDescription:
      "Get competitive FHA rates with down payments as low as 3.5%. Purchase, refinance, and HELOC solutions from Mortgage Pipeline. Check your rates today.",
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
    "We believe everyone deserves a fair shot at homeownership. Our team combines decades of mortgage expertise with a genuine commitment to finding the right loan solution for every client, regardless of their financial situation.",
  blocks: [],
  seo: {
    metaTitle: "About Us | Mortgage Pipeline",
    metaDescription:
      "Meet the team at Mortgage Pipeline. Decades of experience helping homebuyers and homeowners find the right mortgage solutions.",
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
