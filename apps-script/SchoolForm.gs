/**
 * Builds a Google Forms copy of the survey for places where the website is blocked (school computers).
 * Same questions and branching as the site. Responses land in a new tab of this spreadsheet.
 *
 * To use: in the Apps Script editor, add this as a new script file, pick createSchoolForm in the
 * function menu, click Run, and allow access. The View > Executions log shows the links.
 * Run it once. Running it again makes a second form.
 */
var QUESTIONS = {
 "q1": {
  "type": "single",
  "title": "Do you own or help run a business?",
  "help": "This includes being self-employed or running a professional practice.",
  "options": [
   "Yes, I own or co-own a business",
   "Yes, I help manage a business I don’t own",
   "No"
  ]
 },
 "q2": {
  "type": "single",
  "title": "Who makes the banking decisions for your business?",
  "options": [
   "I do",
   "I share them with a partner or co-owner",
   "Someone else, like a CFO, accountant, or bookkeeper",
   "Not sure"
  ]
 },
 "q3": {
  "type": "single",
  "title": "What industry is your business in?",
  "options": [
   "Professional services (law, accounting, consulting)",
   "Government contracting",
   "Real estate or construction",
   "Healthcare or medical practice",
   "Restaurant, retail, or hospitality",
   "Technology",
   "Nonprofit",
   "Other"
  ]
 },
 "q4": {
  "type": "single",
  "title": "How many people work at your business, including you?",
  "options": [
   "Just me",
   "2 to 9",
   "10 to 49",
   "50 to 249",
   "250 or more"
  ]
 },
 "q5": {
  "type": "single",
  "title": "What kind of bank does your business mainly use?",
  "options": [
   "A large national bank (for example Chase, Bank of America, Wells Fargo, PNC, Truist, Capital One)",
   "A regional or community bank",
   "A credit union",
   "An online-only bank",
   "Not sure"
  ]
 },
 "q6": {
  "type": "single",
  "title": "How long has your business banked there?",
  "options": [
   "Less than 1 year",
   "1 to 3 years",
   "3 to 5 years",
   "5 to 10 years",
   "More than 10 years"
  ]
 },
 "q7": {
  "type": "single",
  "title": "Is there a specific person at your bank you can call or email directly by name?",
  "options": [
   "Yes",
   "No",
   "Not sure"
  ]
 },
 "q8": {
  "type": "single",
  "title": "When nothing is wrong, how often does someone from your bank reach out to check in?",
  "options": [
   "Never",
   "Less than once a year",
   "About once a year",
   "About once a quarter",
   "Monthly or more"
  ]
 },
 "q9": {
  "type": "multi",
  "title": "Besides your main business account, what else does your business have at the same bank?",
  "help": "Check all that apply.",
  "options": [
   "A business loan or line of credit",
   "A business credit card",
   "Payroll services",
   "Card processing (merchant services)",
   "Cash management services, like wire transfers or remote deposit",
   "The owner’s personal accounts",
   "None of these"
  ]
 },
 "q10": {
  "type": "multi",
  "title": "What are the top 2 reasons your business stays with its bank?",
  "help": "Choose up to 2.",
  "options": [
   "Knowing my banker personally",
   "Fast responses when I have a question or problem",
   "Interest rates and fees",
   "Online and mobile banking tools",
   "Getting a loan approved when I need one",
   "The hassle of switching banks",
   "Convenient branch locations",
   "The bank's involvement in the community"
  ],
  "max": 2
 },
 "q11": {
  "type": "scale",
  "title": "How much do you agree with this statement? “Switching to a different bank would be a hassle for my business.”",
  "min": 1,
  "max": 5,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree"
 },
 "q12": {
  "type": "scale",
  "title": "Overall, how satisfied are you with your business’s bank?",
  "min": 1,
  "max": 5,
  "minLabel": "Very dissatisfied",
  "maxLabel": "Very satisfied"
 },
 "q13": {
  "type": "single",
  "title": "If your main contact at your bank moved to a different bank, how likely would you be to move your business with them?",
  "options": [
   "Very unlikely",
   "Somewhat unlikely",
   "Not sure",
   "Somewhat likely",
   "Very likely",
   "I don’t have a main contact"
  ]
 },
 "q14": {
  "type": "scale",
  "title": "How likely are you to recommend your bank to another business owner?",
  "min": 0,
  "max": 10,
  "minLabel": "Not at all likely",
  "maxLabel": "Extremely likely"
 },
 "q15": {
  "type": "single",
  "title": "Has your business switched its main bank in the last 5 years?",
  "options": [
   "Yes",
   "No, but I’ve seriously considered it",
   "No"
  ]
 },
 "q16": {
  "type": "multi",
  "title": "Which of these would be most likely to make you switch banks?",
  "help": "Choose up to 3.",
  "options": [
   "Better interest rates or lower fees somewhere else",
   "A frustrating service experience",
   "My main contact at the bank leaving",
   "The bank not approving a loan I needed",
   "The bank not offering a product or service I needed",
   "Poor online or mobile tools",
   "The bank merging or being sold",
   "Nothing would make me switch"
  ],
  "max": 3
 },
 "q17": {
  "type": "single",
  "title": "Have you ever recommended your bank to another business owner?",
  "options": [
   "Yes",
   "No"
  ]
 },
 "q18": {
  "type": "single",
  "title": "If your bank rewarded you for referring other businesses, such as with a better loan rate or lower fees, would you be more likely to refer?",
  "options": [
   "Yes, definitely",
   "Maybe",
   "No"
  ]
 },
 "q19": {
  "type": "multi",
  "title": "Which of these would most strengthen your relationship with your bank?",
  "help": "Choose up to 2.",
  "options": [
   "A scheduled check-in or business review once or twice a year",
   "A backup contact in case my main contact is unavailable",
   "Better rates for keeping more of my business at the bank",
   "Workshops on cash flow, loans, or growing a business",
   "Networking events with other local business owners",
   "Better online and mobile tools",
   "Nothing, I’m already satisfied"
  ],
  "max": 2
 },
 "q20": {
  "type": "text",
  "title": "Anything else that makes you loyal to your bank, or frustrated with it?",
  "help": "Optional.",
  "optional": true
 },
 "q21": {
  "type": "single",
  "title": "What kind of bank do you mainly use for your personal accounts?",
  "options": [
   "A large national bank (for example Chase, Bank of America, Wells Fargo, PNC, Truist, Capital One)",
   "A regional or community bank",
   "A credit union",
   "An online-only bank",
   "Not sure"
  ]
 },
 "q22": {
  "type": "single",
  "title": "How long have you banked there?",
  "options": [
   "Less than 1 year",
   "1 to 3 years",
   "3 to 5 years",
   "5 to 10 years",
   "More than 10 years"
  ]
 },
 "q23": {
  "type": "single",
  "title": "Is there a specific person at your bank you can call or email directly by name?",
  "options": [
   "Yes",
   "No",
   "Not sure"
  ]
 },
 "q24": {
  "type": "multi",
  "title": "What are the top 2 reasons you stay with your bank?",
  "help": "Choose up to 2.",
  "options": [
   "Knowing someone at the bank personally",
   "Fast responses when I have a question or problem",
   "Interest rates and fees",
   "Online and mobile banking tools",
   "Convenient branch or ATM locations",
   "The hassle of switching banks",
   "A family member chose it and I never changed",
   "The bank's involvement in the community"
  ],
  "max": 2
 },
 "q25": {
  "type": "scale",
  "title": "How much do you agree with this statement? “Switching to a different bank would be a hassle for me.”",
  "min": 1,
  "max": 5,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree"
 },
 "q26": {
  "type": "scale",
  "title": "Overall, how satisfied are you with your bank?",
  "min": 1,
  "max": 5,
  "minLabel": "Very dissatisfied",
  "maxLabel": "Very satisfied"
 },
 "q27": {
  "type": "multi",
  "title": "Which of these would be most likely to make you switch banks?",
  "help": "Choose up to 3.",
  "options": [
   "Better interest rates or lower fees somewhere else",
   "A frustrating service experience",
   "Poor online or mobile tools",
   "Moving away from my branch",
   "A friend or family member recommending another bank",
   "Nothing would make me switch"
  ],
  "max": 3
 },
 "q28": {
  "type": "scale",
  "title": "How likely are you to recommend your bank to a friend?",
  "min": 0,
  "max": 10,
  "minLabel": "Not at all likely",
  "maxLabel": "Extremely likely"
 }
};

function createSchoolForm() {
  var form = FormApp.create("What keeps you with your bank?");
  form.setDescription(
    "We're three students in Fairfax researching what makes businesses and customers stay loyal to their bank, " +
    "for a DECA finance research project.\n\n" +
    "Takes about 3 minutes. Anonymous. We don't ask for your name, account details, or any financial figures. " +
    "If you own or run a business, you'll get a few questions about your business banking."
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    "Thank you. Your answers were saved.\n\n" +
    "If someone else handles your business's banking, please forward this survey to them. " +
    "And if you know anyone who owns or runs a business, please send it their way. " +
    "Business owners are the hardest group for us to reach."
  );

  // Page 1: the screener
  var q1 = addQuestion_(form, "q1");

  // Business path
  var pageDecider = form.addPageBreakItem().setTitle("Your business");
  var q2 = addQuestion_(form, "q2");

  var pageBusiness = form.addPageBreakItem().setTitle("Your business and your bank");
  ["q3", "q4", "q5", "q6", "q7", "q8", "q9"].forEach(function (id) { addQuestion_(form, id); });

  var pageStay = form.addPageBreakItem().setTitle("Why you stay");
  ["q10", "q11", "q12", "q13", "q14"].forEach(function (id) { addQuestion_(form, id); });

  var pageSwitch = form.addPageBreakItem().setTitle("Switching, and what would help");
  ["q15", "q16", "q17", "q18", "q19", "q20"].forEach(function (id) { addQuestion_(form, id); });

  // Personal path. Reaching this page from the business path means the business path is done, so submit.
  var pagePersonal = form.addPageBreakItem().setTitle("Your bank");
  pagePersonal.setGoToPage(FormApp.PageNavigationType.SUBMIT);
  ["q21", "q22", "q23", "q24", "q25", "q26", "q27", "q28"].forEach(function (id) { addQuestion_(form, id); });

  // Branching: Q1 picks the path, Q2 ends the survey for people who don't make the banking decisions.
  var o1 = QUESTIONS.q1.options;
  q1.setChoices([
    q1.createChoice(o1[0], pageDecider),
    q1.createChoice(o1[1], pageDecider),
    q1.createChoice(o1[2], pagePersonal)
  ]);
  var o2 = QUESTIONS.q2.options;
  q2.setChoices([
    q2.createChoice(o2[0], pageBusiness),
    q2.createChoice(o2[1], pageBusiness),
    q2.createChoice(o2[2], FormApp.PageNavigationType.SUBMIT),
    q2.createChoice(o2[3], FormApp.PageNavigationType.SUBMIT)
  ]);

  // Answers go to a new tab in this spreadsheet.
  form.setDestination(FormApp.DestinationType.SPREADSHEET, SpreadsheetApp.getActiveSpreadsheet().getId());

  // Newer Google Forms must be published before they take responses.
  try { form.setPublished(true); } catch (e) { /* older Forms: already live */ }
  form.setAcceptingResponses(true);

  var url = form.getPublishedUrl();
  var shortUrl = url;
  try { shortUrl = form.shortenFormUrl(url); } catch (e) { /* keep the long link */ }
  Logger.log("Share this link: " + shortUrl);
  Logger.log("Edit the form here: " + form.getEditUrl());
}

function addQuestion_(form, id) {
  var q = QUESTIONS[id], item;
  if (q.type === "single") {
    item = form.addMultipleChoiceItem().setChoiceValues(q.options);
  } else if (q.type === "multi") {
    item = form.addCheckboxItem().setChoiceValues(q.options);
    if (q.max) item.setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(q.max).build());
  } else if (q.type === "scale") {
    item = form.addScaleItem().setBounds(q.min, q.max).setLabels(q.minLabel, q.maxLabel);
  } else {
    item = form.addParagraphTextItem();
  }
  item.setTitle(q.title);
  if (q.help) item.setHelpText(q.help);
  item.setRequired(!q.optional);
  return item;
}
