(function () {
  "use strict";

  var CONFIG = window.SURVEY_CONFIG || {};

  // ---------- Question content ----------
  var BANK_TYPES = [
    "A large national bank (for example Chase, Bank of America, Wells Fargo, PNC, Truist, Capital One)",
    "A regional or community bank (for example a local Virginia or D.C. bank)",
    "A credit union",
    "An online-only bank",
    "Not sure"
  ];
  var TENURE = ["Less than 1 year", "1 to 3 years", "3 to 5 years", "5 to 10 years", "More than 10 years"];
  var YES_NO_UNSURE = ["Yes", "No", "Not sure"];
  var STAY_REASONS = [
    "Knowing my banker personally",
    "Fast responses when I have a question or problem",
    "Interest rates and fees",
    "Online and mobile banking tools",
    "Getting a loan approved when I need one",
    "The hassle of switching banks",
    "Convenient branch locations",
    "The bank's involvement in the community"
  ];
  var PERSONAL_STAY = [
    "Knowing someone at the bank personally",
    "Fast responses when I have a question or problem",
    "Interest rates and fees",
    "Online and mobile banking tools",
    "Convenient branch or ATM locations",
    "The hassle of switching banks",
    "A family member chose it and I never changed",
    "The bank's involvement in the community"
  ];
  var HASSLE = "“I stay with my bank mainly because switching would be a hassle, not because I’m happy with it.”";

  var Q = {
    q1: { section: "Getting started", type: "single", col: "Q1 Owns or runs a business",
      prompt: "Do you own or help run a business?",
      help: "This includes being self-employed or running a professional practice.",
      options: ["Yes, I own or co-own a business", "Yes, I help manage a business I don’t own", "No"] },

    q2: { section: "Your business", type: "single", col: "Q2 Who makes banking decisions",
      prompt: "Who makes the banking decisions for your business?",
      options: ["I do", "I share them with a partner or co-owner", "Someone else, like a CFO, accountant, or bookkeeper", "Not sure"] },
    q3: { section: "Your business", type: "single", col: "Q3 Industry",
      prompt: "What industry is your business in?",
      options: ["Professional services (law, accounting, consulting)", "Government contracting", "Real estate or construction", "Healthcare or medical practice", "Restaurant, retail, or hospitality", "Technology", "Nonprofit", "Other"] },
    q4: { section: "Your business", type: "single", col: "Q4 Employees",
      prompt: "How many people work at your business, including you?",
      options: ["Just me", "2 to 9", "10 to 49", "50 to 249", "250 or more"] },
    q5: { section: "Your business", type: "single", col: "Q5 Annual revenue",
      prompt: "Roughly what is your business’s annual revenue?",
      help: "Choose “Prefer not to say” if you’d rather skip this one.",
      options: ["Under $1 million", "$1 million to $5 million", "$5 million to $10 million", "Over $10 million", "Prefer not to say"] },
    q6: { section: "Your business", type: "single", col: "Q6 Location",
      prompt: "Where is your business located?",
      options: ["Fairfax County", "Arlington or Alexandria", "Loudoun County", "Washington, D.C.", "Elsewhere in Northern Virginia", "Maryland suburbs of D.C.", "Outside the D.C. area"] },

    q7: { section: "Your bank relationship", type: "single", col: "Q7 Bank type",
      prompt: "What kind of bank does your business mainly use?", options: BANK_TYPES },
    q8: { section: "Your bank relationship", type: "single", col: "Q8 Years with bank",
      prompt: "How long has your business banked there?", options: TENURE },
    q9: { section: "Your bank relationship", type: "single", col: "Q9 Has a named contact",
      prompt: "Is there a specific person at your bank you can call or email directly by name?", options: YES_NO_UNSURE },
    q10: { section: "Your bank relationship", type: "single", col: "Q10 Check-in frequency",
      prompt: "When nothing is wrong, how often does someone from your bank reach out to check in?",
      options: ["Never", "Less than once a year", "About once a year", "About once a quarter", "Monthly or more"] },
    q11: { section: "Your bank relationship", type: "multi", col: "Q11 Other products at bank",
      prompt: "Besides your main business account, what else does your business have at the same bank?",
      help: "Check all that apply.", exclusive: "None of these",
      options: ["A business loan or line of credit", "A business credit card", "Payroll services", "Card processing (merchant services)", "Cash management services, like wire transfers or remote deposit", "The owner’s personal accounts", "None of these"] },

    q12: { section: "Why you stay", type: "grid", col: "Q12 Importance",
      prompt: "How important is each of these in keeping your business at its current bank?",
      rows: STAY_REASONS, cols: ["Not important", "Somewhat", "Very important"] },
    q13: { section: "Why you stay", type: "single", col: "Q13 Biggest reason to stay",
      prompt: "Which one of those is the biggest reason you stay?", options: STAY_REASONS },
    q14: { section: "Why you stay", type: "scale", col: "Q14 Stays because switching is a hassle (1-5)",
      prompt: "How much do you agree with this statement?", quote: HASSLE,
      min: 1, max: 5, minLabel: "Strongly disagree", maxLabel: "Strongly agree" },
    q15: { section: "Why you stay", type: "single", col: "Q15 Would follow main contact",
      prompt: "If your main contact at your bank moved to a different bank, how likely would you be to move your business with them?",
      options: ["Very unlikely", "Somewhat unlikely", "Not sure", "Somewhat likely", "Very likely", "I don’t have a main contact"] },
    q16: { section: "Why you stay", type: "scale", col: "Q16 Likely to recommend (0-10)",
      prompt: "How likely are you to recommend your bank to another business owner?",
      min: 0, max: 10, minLabel: "Not at all likely", maxLabel: "Extremely likely" },

    q17: { section: "Switching, and what would help", type: "single", col: "Q17 Switched banks in last 5 years",
      prompt: "Has your business switched its main bank in the last 5 years?",
      options: ["Yes", "No, but I’ve seriously considered it", "No"] },
    q18: { section: "Switching, and what would help", type: "multi", max: 3, col: "Q18 What would make you switch",
      prompt: "Which of these would be most likely to make you switch banks?", help: "Choose up to 3.",
      exclusive: "Nothing would make me switch",
      options: ["Better interest rates or lower fees somewhere else", "A frustrating service experience", "My main contact at the bank leaving", "The bank not approving a loan I needed", "The bank not offering a product or service I needed", "Poor online or mobile tools", "The bank merging or being sold", "Nothing would make me switch"] },
    q19: { section: "Switching, and what would help", type: "single", col: "Q19 Has recommended bank",
      prompt: "Have you ever recommended your bank to another business owner?", options: ["Yes", "No"] },
    q20: { section: "Switching, and what would help", type: "single", col: "Q20 Referral reward would help",
      prompt: "If your bank rewarded you for referring other businesses, such as with a better loan rate or lower fees, would you be more likely to refer?",
      options: ["Yes, definitely", "Maybe", "No"] },
    q21: { section: "Switching, and what would help", type: "multi", max: 2, col: "Q21 What would strengthen relationship",
      prompt: "Which of these would most strengthen your relationship with your bank?", help: "Choose up to 2.",
      exclusive: "Nothing, I’m already satisfied",
      options: ["A scheduled check-in or business review once or twice a year", "A backup contact in case my main contact is unavailable", "Better rates for keeping more of my business at the bank", "Workshops on cash flow, loans, or growing a business", "Networking events with other local business owners", "Better online and mobile tools", "Nothing, I’m already satisfied"] },
    q22: { section: "Switching, and what would help", type: "text", optional: true, col: "Q22 Comments",
      prompt: "Anything else that makes you loyal to your bank, or frustrated with it?", help: "Optional." },

    q23: { section: "Your bank", type: "single", col: "Q23 Bank type (personal)",
      prompt: "What kind of bank do you mainly use for your personal accounts?", options: BANK_TYPES },
    q24: { section: "Your bank", type: "single", col: "Q24 Years with bank (personal)",
      prompt: "How long have you banked there?", options: TENURE },
    q25: { section: "Your bank", type: "single", col: "Q25 Has a named contact (personal)",
      prompt: "Is there a specific person at your bank you can call or email directly by name?", options: YES_NO_UNSURE },
    q26: { section: "Why you stay", type: "single", col: "Q26 Biggest reason to stay (personal)",
      prompt: "What is the biggest reason you stay with your bank?", options: PERSONAL_STAY },
    q27: { section: "Why you stay", type: "scale", col: "Q27 Stays because switching is a hassle (personal, 1-5)",
      prompt: "How much do you agree with this statement?", quote: HASSLE,
      min: 1, max: 5, minLabel: "Strongly disagree", maxLabel: "Strongly agree" },
    q28: { section: "Switching", type: "multi", max: 3, col: "Q28 What would make you switch (personal)",
      prompt: "Which of these would be most likely to make you switch banks?", help: "Choose up to 3.",
      exclusive: "Nothing would make me switch",
      options: ["Better interest rates or lower fees somewhere else", "A frustrating service experience", "Poor online or mobile tools", "Moving away from my branch", "A friend or family member recommending another bank", "Nothing would make me switch"] },
    q29: { section: "Switching", type: "scale", col: "Q29 Likely to recommend (personal, 0-10)",
      prompt: "How likely are you to recommend your bank to a friend?",
      min: 0, max: 10, minLabel: "Not at all likely", maxLabel: "Extremely likely" }
  };

  var ALL_IDS = Object.keys(Q);
  var BUSINESS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21", "q22"];
  var PERSONAL = ["q1", "q23", "q24", "q25", "q26", "q27", "q28", "q29"];

  // ---------- State ----------
  var state = {
    screen: "welcome", // welcome | question | sending | error | thanks
    index: 0,
    answers: {},
    startedAt: null,
    responseId: makeId(),
    errorText: ""
  };
  var advanceTimer = null;
  var app = document.getElementById("app");

  function makeId() {
    var a = new Uint8Array(8);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }

  function source() {
    try {
      var p = new URLSearchParams(window.location.search);
      var s = (p.get("s") || p.get("source") || "direct").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 30);
      return s || "direct";
    } catch (e) { return "direct"; }
  }

  function isBusiness() {
    var a = state.answers.q1;
    return a === Q.q1.options[0] || a === Q.q1.options[1];
  }
  function sequence() {
    if (!state.answers.q1) return BUSINESS; // before Q1 is answered, show the longer count
    return isBusiness() ? BUSINESS : PERSONAL;
  }
  function currentId() { return sequence()[state.index]; }

  function isAnswered(id) {
    var q = Q[id], a = state.answers[id];
    if (q.optional) return true;
    if (q.type === "multi") return Array.isArray(a) && a.length > 0;
    if (q.type === "grid") return a && q.rows.every(function (_, i) { return a[i]; });
    return a !== undefined && a !== "";
  }

  // ---------- Helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var CHECK = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function guilloche() {
    var w = 640, h = 120, paths = [];
    function band(count, amp, f1, f2, opacity) {
      for (var i = 0; i < count; i++) {
        var ph = (i / count) * Math.PI * 2, d = "";
        for (var x = 0; x <= w; x += 4) {
          var t = (x / w) * Math.PI * 2;
          var y = h / 2 + amp * Math.sin(t * f1 + ph) * Math.cos(t * f2 - ph / 2);
          d += (x === 0 ? "M" : "L") + x + " " + y.toFixed(2);
        }
        paths.push('<path d="' + d + '" opacity="' + opacity + '"/>');
      }
    }
    band(20, 46, 3, 1.5, 0.55);
    band(14, 26, 5, 0.75, 0.35);
    return '<svg class="guilloche" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor" stroke-width="0.8" vector-effect="non-scaling-stroke">' + paths.join("") + "</g></svg>";
  }

  // ---------- Screens ----------
  var lastKey = "";
  function render() {
    clearTimeout(advanceTimer);
    var html;
    if (state.screen === "welcome") html = welcomeHtml();
    else if (state.screen === "thanks") html = thanksHtml();
    else html = questionHtml();
    // Only animate, scroll and move focus when the screen itself changes, not when an answer is picked.
    var key = state.screen === "welcome" || state.screen === "thanks" ? state.screen : "q:" + currentId();
    var fresh = key !== lastKey;
    lastKey = key;
    app.innerHTML = '<div class="screen' + (fresh ? " enter" : "") + '">' + html + "</div>";
    bind();
    if (fresh) {
      var focusTarget = app.querySelector("[data-autofocus]");
      if (focusTarget) focusTarget.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }

  function welcomeHtml() {
    var contact = CONFIG.contactEmail
      ? '<p class="contact">Questions about the survey? Email <span>' + esc(CONFIG.contactEmail) + "</span></p>"
      : "";
    return guilloche() +
      '<div class="intro">' +
      "<h1 tabindex=\"-1\">What keeps you with your bank?</h1>" +
      '<p class="lede">We’re Neeraj, Dhruv, and Sami, three students in Fairfax researching what makes businesses and customers stay loyal to their bank, for a DECA finance research project.</p>' +
      '<ul class="facts">' +
      "<li>" + CHECK + "<span>Takes about 4 minutes</span></li>" +
      "<li>" + CHECK + "<span>Anonymous. We don’t ask for your name, account details, or any financial figures.</span></li>" +
      "<li>" + CHECK + "<span>If you own or run a business, you’ll get a few questions about your business banking.</span></li>" +
      "</ul>" + contact +
      '<label class="hp" aria-hidden="true">Leave this empty <input id="website" name="website" tabindex="-1" autocomplete="off"></label>' +
      "</div>" +
      '<div class="actions"><button class="btn btn-primary" id="start">Start the survey</button></div>';
  }

  function progressHtml() {
    var seq = sequence(), id = currentId(), q = Q[id];
    var pct = Math.round((state.index / seq.length) * 100);
    return '<div class="progress">' +
      '<div class="progress-meta"><span>' + esc(q.section) + "</span><span>Question " + (state.index + 1) + " of " + seq.length + "</span></div>" +
      '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="' + seq.length + '" aria-valuenow="' + state.index + '" aria-label="Survey progress"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      "</div>";
  }

  function questionHtml() {
    var id = currentId(), q = Q[id], a = state.answers[id];
    var body = "";
    var helpId = id + "-help";
    var help = (q.quote ? '<p class="quote">' + esc(q.quote) + "</p>" : "") +
      (q.help ? '<p class="help" id="' + helpId + '">' + esc(q.help) + "</p>" : "");

    if (q.type === "single" || q.type === "multi") {
      var multi = q.type === "multi";
      var sel = multi ? (a || []) : a;
      var full = multi && q.max && sel.length >= q.max;
      body = '<div class="options" role="' + (multi ? "group" : "radiogroup") + '">' +
        q.options.map(function (opt, i) {
          var on = multi ? sel.indexOf(opt) !== -1 : sel === opt;
          var disabled = full && !on;
          return '<label class="option' + (on ? " is-selected" : "") + (disabled ? " is-disabled" : "") + '" data-kind="' + q.type + '">' +
            '<input type="' + (multi ? "checkbox" : "radio") + '" name="' + id + '" value="' + i + '"' + (on ? " checked" : "") + (disabled ? " disabled" : "") + "" + ">" +
            '<span class="mark">' + CHECK + "</span><span>" + esc(opt) + "</span></label>";
        }).join("") + "</div>";
      if (multi && q.max) {
        body += '<p class="limit-note' + (full ? " is-full" : "") + '">' + sel.length + " of " + q.max + " chosen</p>";
      }
    } else if (q.type === "grid") {
      var g = a || {};
      body = '<div class="grid-rows">' + q.rows.map(function (row, r) {
        return '<fieldset class="grid-row"><legend>' + esc(row) + '</legend><div class="segmented">' +
          q.cols.map(function (col, c) {
            var on = g[r] === col;
            return '<label class="seg' + (on ? " is-selected" : "") + '"><input type="radio" name="' + id + "-" + r + '" data-row="' + r + '" value="' + c + '"' + (on ? " checked" : "") + "" + ">" + esc(col) + "</label>";
          }).join("") + "</div></fieldset>";
      }).join("") + "</div>";
    } else if (q.type === "scale") {
      var count = q.max - q.min + 1, btns = "";
      for (var v = q.min; v <= q.max; v++) {
        var on2 = String(a) === String(v);
        btns += '<label class="seg' + (on2 ? " is-selected" : "") + '"><input type="radio" name="' + id + '" value="' + v + '"' + (on2 ? " checked" : "") + "" + ' aria-label="' + v + (v === q.min ? ", " + esc(q.minLabel) : v === q.max ? ", " + esc(q.maxLabel) : "") + '">' + v + "</label>";
      }
      body = '<div class="scale"><div class="scale-buttons" data-count="' + count + '">' + btns + '</div><div class="scale-ends" aria-hidden="true"><span>' + q.min + " = " + esc(q.minLabel) + "</span><span>" + q.max + " = " + esc(q.maxLabel) + "</span></div></div>";
    } else if (q.type === "text") {
      body = '<textarea id="' + id + '" name="' + id + '" maxlength="2000" aria-describedby="' + helpId + '">' + esc(a || "") + "</textarea>";
    }

    var seq = sequence(), last = state.index === seq.length - 1;
    var sending = state.screen === "sending";
    var notice = state.screen === "error" ? '<p class="notice" role="alert">' + esc(state.errorText) + "</p>" : "";
    var nextLabel = sending ? "Sending…" : last ? (state.screen === "error" ? "Try again" : "Submit") : "Continue";

    return progressHtml() +
      '<div class="question" role="group" aria-labelledby="qh"><div class="prompt"><h2 id="qh" tabindex="-1" data-autofocus>' + esc(q.prompt) + "</h2>" + help + "</div>" + body + "</div>" +
      (notice ? '<div style="margin-top:1.5rem">' + notice + "</div>" : "") +
      '<div class="actions">' +
      '<button class="btn btn-quiet" id="back"' + (sending ? " disabled" : "") + ">Back</button>" +
      '<button class="btn btn-primary" id="next"' + (isAnswered(currentId()) && !sending ? "" : " disabled") + ">" + nextLabel + "</button>" +
      "</div>";
  }

  function thanksHtml() {
    var link = window.location.origin + window.location.pathname;
    return guilloche() +
      '<div class="thanks">' +
      '<h1 tabindex="-1" data-autofocus>Thank you. Your answers were saved.</h1>' +
      "<p>Know someone who owns or runs a business? Please send them this survey. Business owners are the hardest group for us to reach, and every response helps our research.</p>" +
      '<div class="copy-row"><code id="link">' + esc(link) + '</code><button class="btn btn-quiet" id="copy">Copy link</button></div>' +
      "</div>";
  }

  // ---------- Events ----------
  function bind() {
    var start = document.getElementById("start");
    if (start) start.addEventListener("click", function () {
      var hp = document.getElementById("website");
      state.honeypot = hp ? hp.value : "";
      state.startedAt = Date.now();
      state.screen = "question";
      state.index = 0;
      render();
    });

    var back = document.getElementById("back");
    if (back) back.addEventListener("click", function () {
      if (state.index === 0) { state.screen = "welcome"; }
      else { state.index--; state.screen = "question"; }
      render();
    });

    var next = document.getElementById("next");
    if (next) next.addEventListener("click", goNext);

    var copy = document.getElementById("copy");
    if (copy) copy.addEventListener("click", function () {
      var text = document.getElementById("link").textContent;
      var done = function () { copy.textContent = "Copied"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, selectLink);
      } else { selectLink(); }
    });

    if (state.screen === "question" || state.screen === "error") {
      var id = currentId(), q = Q[id];
      app.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("change", function () { onChange(id, q, input); });
      });
      var ta = app.querySelector("textarea");
      if (ta) ta.addEventListener("input", function () { state.answers[id] = ta.value; });
    }
  }

  function selectLink() {
    var el = document.getElementById("link");
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  function onChange(id, q, input) {
    if (state.screen === "error") state.screen = "question";
    if (q.type === "single") {
      state.answers[id] = q.options[Number(input.value)];
    } else if (q.type === "scale") {
      state.answers[id] = Number(input.value);
    } else if (q.type === "grid") {
      var g = state.answers[id] || {};
      g[input.dataset.row] = q.cols[Number(input.value)];
      state.answers[id] = g;
    } else if (q.type === "multi") {
      var opt = q.options[Number(input.value)];
      var sel = (state.answers[id] || []).slice();
      if (input.checked) {
        if (q.exclusive && opt === q.exclusive) sel = [opt];
        else {
          sel = sel.filter(function (s) { return s !== q.exclusive; });
          if (!q.max || sel.length < q.max) sel.push(opt);
        }
      } else {
        sel = sel.filter(function (s) { return s !== opt; });
      }
      state.answers[id] = sel;
    }
    var keepFocus = { name: input.name, value: input.value };
    render();
    var again = app.querySelector('input[name="' + keepFocus.name + '"][value="' + keepFocus.value + '"]');
    if (again) again.focus({ preventScroll: true });

    var last = state.index === sequence().length - 1;
    if ((q.type === "single" || q.type === "scale") && !last) {
      advanceTimer = setTimeout(goNext, 320);
    }
  }

  function goNext() {
    clearTimeout(advanceTimer);
    if (!isAnswered(currentId()) || state.screen === "sending") return;
    if (state.index < sequence().length - 1) {
      state.index++;
      state.screen = "question";
      render();
    } else {
      submit();
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || e.target.tagName === "TEXTAREA" || e.target.tagName === "BUTTON") return;
    if (state.screen === "question" || state.screen === "error") { e.preventDefault(); goNext(); }
  });

  // ---------- Submit ----------
  function buildPayload() {
    var seq = sequence(), out = {};
    out["Response ID"] = state.responseId;
    out["Path"] = isBusiness() ? "Business owner" : "Personal";
    out["Source"] = source();
    out["Seconds to complete"] = state.startedAt ? Math.round((Date.now() - state.startedAt) / 1000) : "";
    ALL_IDS.forEach(function (id) {
      var q = Q[id], a = seq.indexOf(id) !== -1 ? state.answers[id] : undefined;
      if (q.type === "grid") {
        q.rows.forEach(function (row, r) { out[q.col + ": " + row] = a && a[r] ? a[r] : ""; });
      } else if (q.type === "multi") {
        out[q.col] = Array.isArray(a) ? a.join("; ") : "";
      } else {
        out[q.col] = a === undefined || a === null ? "" : a;
      }
    });
    out.website = state.honeypot || "";
    return out;
  }

  function submit() {
    if (!CONFIG.endpoint) {
      state.screen = "error";
      state.errorText = "This survey isn’t connected to a response sheet yet, so your answers can’t be saved. Please try again later.";
      render();
      return;
    }
    state.screen = "sending";
    render();
    var body = JSON.stringify(buildPayload());
    send(body).then(function () {
      state.screen = "thanks";
      render();
    }).catch(function () {
      state.screen = "error";
      state.errorText = "Your answers didn’t send. Check your internet connection, then tap Try again. Your answers are still here.";
      render();
    });
  }

  function send(body) {
    // Plain-text body keeps this a "simple" request, so Google Apps Script accepts it without a CORS preflight.
    return fetch(CONFIG.endpoint, { method: "POST", body: body, redirect: "follow" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text().then(function (t) {
          var j = null;
          try { j = JSON.parse(t); } catch (e) { /* not JSON: treat as saved */ }
          if (j && j.ok === false) throw new Error(j.error || "Not saved");
        });
      })
      .catch(function (err) {
        if (err instanceof TypeError) {
          // The browser couldn't read the reply. Resend without reading it; the Response ID stops duplicates.
          return fetch(CONFIG.endpoint, { method: "POST", mode: "no-cors", body: body });
        }
        throw err;
      });
  }

  // Expose for testing only.
  window.__survey = { state: state, Q: Q, buildPayload: buildPayload, BUSINESS: BUSINESS, PERSONAL: PERSONAL };

  render();
})();
