/* Valkai Workflow Review Console — prototype behavior
   Synthetic data only. Three stubbed workflows:
   reg  = Regulatory writer, Module 2 clinical overview (primary Accept path)
   src  = Missing sources / stale guidance (Request better sources path)
   saf  = Safety reviewer, SAE narrative, cited conflict (Revise / Escalate path)
*/

"use strict";

/* ---------------- Citation registry (stubs) ---------------- */

const CITS = {
  "SOP-RW-03":     { lab: "SOP-RW-03",  doc: "Regulatory Writing SOP, v6",             sys: "SOP library (stub)",                 ref: "Section 4.2, line 214" },
  "SOP-RW-07":     { lab: "SOP-RW-07",  doc: "Precedent reuse drafting SOP, v2",       sys: "SOP library (stub)",                 ref: "Section 2, line 87" },
  "EMA-M4E::2.1":  { lab: "EMA M4E §2.1",   doc: "EMA M4E(R3) guideline, Module 2",       sys: "Guidance repository (stub)",         ref: "§2.1, page 312" },
  "EMA-M4E::2.1.2":{ lab: "EMA M4E §2.1.2", doc: "EMA M4E(R3) guideline, Module 2",       sys: "Guidance repository (stub)",         ref: "§2.1.2, page 318" },
  "ICH-E6::8":     { lab: "ICH E6(R2) §8",  doc: "ICH E6(R2) Integrated Addendum",        sys: "Guidance repository (stub)",         ref: "§8, page 41" },
  "PROTOCOL-4.2":  { lab: "PROTOCOL v4.2",  doc: "Study protocol P-204, v4.2",            sys: "Trial master file (stub)",           ref: "Section 3, line 96" },
  "PRE-2024-0142": { lab: "PRE-2024-0142",  doc: "Prior filing, Module 2 precedent",      sys: "EDMS precedent shelf (stub)",        ref: "§2.1.2, page 178" },
  "TMF-103":       { lab: "TMF-103",        doc: "Program milestones register",           sys: "Trial master file (stub)",           ref: "Rows 4-6" },
  "SAFERPT-011":   { lab: "SAFERPT-011",    doc: "Site SAE report, event 1042",           sys: "Safety report queue (stub)",         ref: "Severity field, line 12" },
  "SAFE-DB-014":   { lab: "SAFE-DB-014",    doc: "Safety database record, event 1042",    sys: "Clinical safety database (stub)",    ref: "Severity field, line 3" },
  "MA-003":        { lab: "MA-003",         doc: "Medical affairs narrative template",    sys: "Medical affairs library (stub)",     ref: "Page 1" },
  "PROTOCOL-4.0":  { lab: "PROTOCOL v4.0",  doc: "Study protocol P-204, v4.0 (old)",      sys: "Trial master file (stub)",           ref: "Section 3, line 96" },
  "ICH-Q7A-2017":  { lab: "ICH Q7A (2017)",  doc: "ICH Q7A guidance, 2017 edition",       sys: "Guidance repository (stub)",         ref: "Page 22" }
};

/* ---------------- Case data (all stubs) ---------------- */

const BASELINE = { reg: 21, saf: 6 };

const CASES = {
  reg: {
    id: "reg",
    fn: "Regulatory",
    queueTitle: "Module 2 · Clinical overview",
    queueSub: "Regulatory Writer · handoff: Document Control",
    title: "Module 2 — Clinical Overview, Section 2.1 Background and Rationale",
    role: "Regulatory Writer",
    prepared: "Prepared by · Regulatory agent (stub) · from 7 source systems · drafted 4h 12m ago",
    coverage: "coverage 0.91 · 12 of 13 claims cited",
    packetMeta: "3 sections · line-by-line citations",
    sections: [
      {
        id: "s1", title: "2.1.1 Indication and target population", cov: "0.92",
        paras: [
          { txt: "NEX-204 (fictional program) is proposed for adults with a moderate-to-severe indication (stub). The target population follows the study protocol and matches the precedent filing for the same therapeutic area.", cits: ["PROTOCOL-4.2", "PRE-2024-0142"] },
          { txt: "The module applies the sponsor's standard Module 2 framework and documented regulatory-writing conventions.", cits: ["SOP-RW-03", "EMA-M4E::2.1"] }
        ]
      },
      {
        id: "s2", title: "2.1.2 Disease burden and clinical rationale", cov: "0.93",
        paras: [
          { txt: "Disease burden is summarized from cited guidance and repository sources only; no new clinical claims are introduced relative to the protocol.", cits: ["EMA-M4E::2.1.2"] },
          { txt: "The rationale section references the protocol's study design summary and makes no efficacy claims in this module.", cits: ["PROTOCOL-4.2", "ICH-E6::8"] }
        ]
      },
      {
        id: "s3", title: "2.1.3 Development history summary", cov: "0.87",
        paras: [
          { txt: "The development history table (stub rows) lists milestones drawn from the program register; each row carries a line citation.", cits: ["TMF-103", "SOP-RW-07"] },
          { txt: "Precedent reuse: rows 4-6 mirror accepted precedent language; the agent flags reused strings for reviewer confirmation.", cits: ["PRE-2024-0142", "SOP-RW-07"] }
        ]
      }
    ],
    sources: [
      { id: "SOP-RW-03",      name: "Regulatory Writing SOP, v6",                 sys: "SOP library (stub)" },
      { id: "SOP-RW-07",      name: "Precedent reuse drafting SOP, v2",           sys: "SOP library (stub)" },
      { id: "EMA-M4E::2.1",   name: "EMA M4E(R3) guideline, Module 2",            sys: "Guidance repository (stub)" },
      { id: "ICH-E6::8",      name: "ICH E6(R2) Integrated Addendum",             sys: "Guidance repository (stub)" },
      { id: "PRE-2024-0142",  name: "Prior filing, Module 2 precedent",           sys: "EDMS precedent shelf (stub)" },
      { id: "PROTOCOL-4.2",   name: "Study protocol P-204, v4.2",                 sys: "Trial master file (stub)" },
      { id: "TMF-103",        name: "Program milestones register",                sys: "Trial master file (stub)" }
    ],
    gaps: [],
    conflict: null,
    escalateTo: "Regulatory lead"
  },

  src: {
    id: "src",
    fn: "Regulatory",
    queueTitle: "Module 2 · Clinical studies summary",
    queueSub: "Regulatory Writer · blocked on sources",
    title: "Module 2 — Clinical Studies, Section 2.2 Summary (blocked draft)",
    role: "Regulatory Writer",
    prepared: "Prepared by · Regulatory agent (stub) · from 4 source systems · drafted 3h 02m ago",
    coverage: "coverage 0.54 · 7 of 13 claims cited",
    packetMeta: "3 sections · 3 citation gaps",
    sections: [
      {
        id: "s1", title: "2.2.1 Study design overview", cov: "0.46",
        paras: [
          { txt: "The study design summary cites the previous protocol version; no link to the latest amendment exists in the trial master file.", cits: ["PROTOCOL-4.0"], missing: "Protocol amendment v4.3 · link needed in Trial master file" },
          { txt: "Guidance on manufacturing data follows the 2017 edition; the guidance repository holds a 2024 update that was not used.", cits: ["ICH-Q7A-2017"], missing: "ICH Q7A (2024 update) · replace 2017 edition" }
        ]
      },
      {
        id: "s2", title: "2.2.2 Prior experience summary", cov: "0.71",
        paras: [
          { txt: "The prior experience section has no precedent source; the agent search returned no matching filing for this indication.", cits: [], missing: "Precedent filing for indication · search found no stub" },
          { txt: "Narrative template structure follows the medical affairs library template.", cits: ["MA-003"] }
        ]
      },
      {
        id: "s3", title: "2.2.3 Conclusions", cov: "0.61",
        paras: [
          { txt: "Conclusions quote the draft rows above; unresolved gaps carry forward into this section.", cits: [], missing: "Section cannot finish until the three cited gaps are linked" }
        ]
      }
    ],
    sources: [
      { id: "PROTOCOL-4.0",  name: "Study protocol P-204, v4.0 (superseded)",     sys: "Trial master file (stub)", state: "superseded" },
      { id: "ICH-Q7A-2017",  name: "ICH Q7A guidance, 2017 edition",              sys: "Guidance repository (stub)", state: "superseded" },
      { id: "MA-003",        name: "Medical affairs narrative template",          sys: "Medical affairs library (stub)", state: "linked" }
    ],
    gaps: [
      { what: "Protocol amendment v4.3", where: "Trial master file (stub)", note: "draft cites v4.0" },
      { what: "ICH Q7A (2024 update)",   where: "Guidance repository (stub)", note: "2017 edition superseded" },
      { what: "Precedent filing for indication", where: "EDMS precedent shelf (stub)", note: "search returned no match" }
    ],
    conflict: null,
    escalateTo: "Regulatory lead"
  },

  saf: {
    id: "saf",
    fn: "Safety",
    queueTitle: "SAE narrative · event 1042",
    queueSub: "Safety Reviewer · handoff: Medical Affairs",
    title: "Serious Adverse Event Narrative, Subject 1042 (stub case)",
    role: "Safety Reviewer",
    prepared: "Prepared by · Safety agent (stub) · from 2 source systems · drafted 1h 48m ago",
    coverage: "coverage 0.88 · cited conflict detected",
    packetMeta: "2 sections · 1 cited conflict",
    sections: [
      {
        id: "s1", title: "Narrative body", cov: "0.90",
        paras: [
          { txt: "The narrative summarizes the reported serious adverse event for subject 1042 (fictional). Classification text follows the site report as submitted.", cits: ["SAFERPT-011"] },
          { txt: "The safety database assigns a different severity code than the site report; the two cited sources disagree on classification.", cits: ["SAFE-DB-014", "SAFERPT-011"] }
        ]
      },
      {
        id: "s2", title: "Cited conflict", cov: "—",
        paras: [],
        conflict: {
          title: "Cited conflict · classification mismatch",
          rows: [
            { a: "SAFERPT-011 · site report", b: "Severity 2, line 12" },
            { a: "SAFE-DB-014 · safety database", b: "Severity 3, line 3" }
          ]
        }
      }
    ],
    sources: [
      { id: "SAFERPT-011",  name: "Site SAE report, event 1042",        sys: "Safety report queue (stub)" },
      { id: "SAFE-DB-014",  name: "Safety database record, event 1042", sys: "Clinical safety database (stub)" }
    ],
    gaps: [],
    conflict: true,
    escalateTo: "Medical Affairs lead"
  }
};

/* ---------------- Runtime state ---------------- */

const state = {
  reg: { status: "drafting",    action: null, revise: null },
  src: { status: "needs-sources", action: null, revise: null },
  saf: { status: "drafting",    action: null, revise: null }
};

let current = "reg";

const STATUS_LABEL = {
  drafting: "Drafting",
  "needs-sources": "Needs sources",
  "review-ready": "Review-ready",
  escalated: "Escalated",
  revising: "Revising"
};

/* ---------------- Render ---------------- */

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function renderQueue() {
  const wrap = document.getElementById("queue");
  wrap.innerHTML = "";
  document.getElementById("queue-count").textContent = Object.keys(CASES).length + " active";
  Object.keys(CASES).forEach(id => {
    const c = CASES[id], s = state[id];
    const b = el("button", "queue-item" + (id === current ? " active" : ""));
    b.setAttribute("data-case", id);
    const top = el("div", "queue-top");
    top.appendChild(el("span", "fn-tag", c.fn));
    top.appendChild(el("span", "queue-title", c.queueTitle));
    top.appendChild(el("span", "pill pill-" + s.status, STATUS_LABEL[s.status]));
    const sub = el("div", "queue-sub", c.queueSub);
    b.appendChild(top);
    b.appendChild(sub);
    b.addEventListener("click", () => { current = id; render(); });
    wrap.appendChild(b);
  });
}

function renderHead() {
  const c = CASES[current], s = state[current];
  const head = document.getElementById("case-head");
  head.innerHTML = "";

  const row = el("div", "case-fn-row");
  row.appendChild(el("span", "fn-tag", c.fn + " workflow"));
  row.appendChild(el("span", "pill pill-" + s.status, STATUS_LABEL[s.status]));
  if (s.status === "revising") {
    row.appendChild(el("span", "pill pill-drafting", "agent re-drafting"));
  }
  head.appendChild(row);

  head.appendChild(el("h1", "case-title", c.title));

  const meta = el("div", "case-meta-row");
  meta.appendChild(el("div", "meta-line",
    "Your role · " + c.role + " · review stub"));
  meta.appendChild(el("div", "meta-line", c.prepared));
  head.appendChild(meta);
}

function chipNode(citId, conflict) {
  const c = CITS[citId];
  const b = el("button", "cit" + (conflict ? " cit-conflict" : ""), c ? c.lab : citId);
  b.setAttribute("type", "button");
  b.setAttribute("aria-label", "Citation " + (c ? c.lab : citId) + ", tap to expand");
  const det = el("div", "cit-detail");
  if (c) {
    det.appendChild(el("span", "mono", citId + " · " + c.ref + " "));
    det.appendChild(el("b", null, c.doc));
    det.appendChild(el("span", null, " · " + c.sys));
  } else {
    det.appendChild(el("span", "mono", citId + " · source not resolved"));
  }
  b.addEventListener("click", () => {
    const open = b.classList.contains("open");
    b.classList.toggle("open");
    det.classList.toggle("open");
  });
  const wrap = document.createElement("span");
  wrap.appendChild(b);
  wrap.appendChild(det);
  return wrap;
}

function renderPacket() {
  const c = CASES[current];
  document.getElementById("packet-meta").textContent = c.packetMeta;
  const box = document.getElementById("draft-sections");
  box.innerHTML = "";

  const line = el("div", "packet-head-line");
  line.textContent = c.coverage;
  box.appendChild(line);

  c.sections.forEach(sec => {
    const card = el("article", "draft-section");
    const h = el("h3", null, sec.title);
    if (sec.cov !== "—") h.appendChild(el("span", "sec-cov", "cov " + sec.cov));
    card.appendChild(h);

    sec.paras.forEach(p => {
      card.appendChild(el("p", null, p.txt));
      const chipsRow = el("div", "cit-row-inner");
      const chips = document.createElement("span");
      (p.cits || []).forEach(id => chips.appendChild(chipNode(id, false)));
      if ((p.cits || []).length > 0) chipsRow.appendChild(chips);
      if (p.missing) {
        chipsRow.appendChild(el("span", "cit cit-conflict", "citation pending"));
      }
      card.appendChild(chipsRow);
    });

    if (sec.conflict) {
      const cc = el("div", "conflict-card");
      cc.appendChild(el("p", "conflict-title", sec.conflict.title));
      sec.conflict.rows.forEach(r => {
        cc.appendChild(el("p", "conflict-row",
          r.a + " assigns " + r.b + " · conflict between cited sources"));
      });
      card.appendChild(cc);
    }
    box.appendChild(card);
  });
}

function renderSources() {
  const c = CASES[current];
  const box = document.getElementById("source-rows");
  box.innerHTML = "";
  c.sources.forEach(s => {
    const row = el("div", "src-row");
    row.appendChild(el("span", "src-id", s.id));
    const name = el("span", "src-name", s.name);
    name.appendChild(el("span", "sys", s.sys));
    row.appendChild(name);
    const st = s.state || "linked";
    row.appendChild(el("span", "src-state" + (st !== "linked" ? " " + st : ""),
      st === "linked" ? "Linked" : st === "superseded" ? "Superseded" : "Pending"));
    box.appendChild(row);
  });
}

function renderGate() {
  const c = CASES[current], s = state[current];
  const g = document.getElementById("gate");
  g.innerHTML = "";

  g.appendChild(el("h2", "gate-title", "Human gate"));
  g.appendChild(el("p", "gate-note",
    "Your decision moves this draft into the next controlled handoff (stub)."));

  if (s.status === "review-ready") {
    const done = el("div", "gate-complete");
    done.appendChild(el("span", null,
      "Handoff confirmed · " + c.fn + " draft accepted and marked Review-ready."));
    g.appendChild(done);
  } else if (s.status === "escalated") {
    const eb = el("div", "escalation-box");
    eb.appendChild(el("span", null,
      "Escalated to " + c.escalateTo + " · adjudication queue (stub). Status will stay "
      + STATUS_LABEL.escalated + " until the lead decides."));
    g.appendChild(eb);
  } else if (s.status === "revising") {
    g.appendChild(el("p", "gate-note",
      "Revision submitted · agent is re-drafting the section (stub)."));
  }

  if (s.status !== "review-ready" && s.status !== "escalated") {
    const accept = el("button", "gate-btn primary", "Accept draft");
    accept.setAttribute("type", "button");
    accept.addEventListener("click", () => { s.status = "review-ready"; s.action = "accept"; render(); });

    const req = el("button", "gate-btn", "Request better sources");
    req.setAttribute("type", "button");
    req.addEventListener("click", () => { s.status = "needs-sources"; s.action = "request"; render(); });

    const rev = el("button", "gate-btn", "Revise section");
    rev.setAttribute("type", "button");
    rev.addEventListener("click", () => {
      s.status = "revising"; s.action = "revise"; render();
      const sel = g.querySelector(".revise-panel select");
      if (sel) sel.focus();
    });

    const esc = el("button", "gate-btn danger", "Escalate to " + c.escalateTo);
    esc.setAttribute("type", "button");
    esc.addEventListener("click", () => { s.status = "escalated"; s.action = "escalate"; render(); });

    if (s.status === "needs-sources" && c.gaps.length > 0) {
      accept.disabled = true;
      g.appendChild(el("p", "gate-disabled-note",
        "Accept is locked while cited sources are missing or superseded."));
    }
    g.appendChild(accept);
    g.appendChild(req);
    g.appendChild(rev);
    g.appendChild(esc);

    if (s.status === "needs-sources" && c.gaps.length > 0) {
      const list = el("ul", "gaps-list");
      c.gaps.forEach(gr => {
        const li = el("li", null, "");
        li.appendChild(el("b", null, gr.what));
        li.appendChild(el("span", null, " · needed from " + gr.where + " · " + gr.note));
        list.appendChild(li);
      });
      g.appendChild(list);
    }

    if (s.status === "revising") {
      const panel = el("div", "revise-panel");
      panel.appendChild(el("label", null, "Section to revise"));
      const sel = document.createElement("select");
      c.sections.forEach(sec => {
        const opt = document.createElement("option");
        opt.value = sec.title;
        opt.textContent = sec.title;
        sel.appendChild(opt);
      });
      panel.appendChild(sel);
      panel.appendChild(el("label", null, "Instructions for the agent (stub)"));
      const ta = document.createElement("textarea");
      ta.rows = 3;
      ta.placeholder = "Example: tighten the rationale wording, keep all citations, use guidance language.";
      panel.appendChild(ta);
      const submit = el("button", "revise-submit", "Submit revision");
      submit.setAttribute("type", "button");
      submit.addEventListener("click", () => {
        s.status = "drafting"; s.action = "revise-submitted"; s.revise = ta.value || "No instructions";
        render();
      });
      panel.appendChild(submit);
      g.appendChild(panel);
    }
  }

  if (s.status === "review-ready" || s.status === "escalated") {
    const reset = el("button", "gate-reset", "Reset this case");
    reset.setAttribute("type", "button");
    reset.addEventListener("click", () => {
      s.status = "drafting"; s.action = null; s.revise = null; render();
    });
    g.appendChild(reset);
  }
}

function impactPage(current, delta, note, barLbl) {
  const box = document.getElementById("impact");
  box.innerHTML = "";
  box.appendChild(el("h2", "impact-title", "Workflow impact"));
  const rows = el("div", "impact-rows");
  const manual = el("div", "impact-row");
  manual.appendChild(el("span", "lbl", "Manual baseline"));
  const mb = el("div", "impact-bar");
  mb.appendChild(el("span", "fill manual"));
  manual.appendChild(mb);
  manual.appendChild(el("span", "val", current + " days"));
  const agent = el("div", "impact-row");
  agent.appendChild(el("span", "lbl", "With agent"));
  const ab = el("div", "impact-bar");
  ab.appendChild(el("span", "fill agent"));
  const w = Math.max(8, Math.round((delta / current) * 100));
  ab.firstChild.style.width = w + "%";
  agent.appendChild(ab);
  agent.appendChild(el("span", "val", delta + " days"));
  rows.appendChild(manual);
  rows.appendChild(agent);
  box.appendChild(rows);
  box.appendChild(el("p", "delta-line", "Est. " + (current - delta) + " days saved at handoff"));
  box.appendChild(el("p", "impact-note", note));
  if (barLbl) box.appendChild(el("p", "impact-note", barLbl));
}

function renderImpact() {
  const c = CASES[current], s = state[current];

  if (s.status === "review-ready") {
    const box = document.getElementById("impact");
    box.innerHTML = "";
    box.appendChild(el("h2", "impact-title", "Workflow impact"));
    box.appendChild(el("p", "delta-line big", "12 days saved on this draft"));
    box.appendChild(el("p", "impact-note",
      "21-day manual baseline · 9-day agent path with your review · handoff to Document Control, next owner Clinical Ops (stub)."));
    const chips = el("div", "handoff-chips");
    [["Drafting", false], ["Review-ready", true], ["Document Control", false], ["Clinical Ops handoff", false]]
      .forEach(pair => chips.appendChild(el("span", "handoff-chip" + (pair[1] ? " now" : ""), pair[0])));
    box.appendChild(chips);
    return;
  }

  if (s.status === "escalated") {
    const box = document.getElementById("impact");
    box.innerHTML = "";
    box.appendChild(el("h2", "impact-title", "Workflow impact"));
    box.appendChild(el("p", "delta-line big", "Escalated · no handoff yet"));
    box.appendChild(el("p", "impact-note",
      (c.conflict
        ? "Cited conflict between SAFERPT-011 (Severity 2) and SAFE-DB-014 (Severity 3) sent to "
          + c.escalateTo + " with the draft packet. Decision SLA 1 day (stub)."
        : "Sent to " + c.escalateTo + " with the draft packet (stub).")));
    return;
  }

  if (s.status === "needs-sources") {
    const box = document.getElementById("impact");
    box.innerHTML = "";
    box.appendChild(el("h2", "impact-title", "Workflow impact"));
    box.appendChild(el("p", "delta-line big", "Not review-ready"));
    box.appendChild(el("p", "impact-note",
      "Status stays Not review-ready until " + (c.gaps.length || "the missing") +
      " cited source" + (c.gaps.length === 1 ? " is" : "s are") +
      " linked. No handoff is scheduled. Timeline impact holds until sources land (stub)."));
    return;
  }

  if (s.status === "revising") {
    const box = document.getElementById("impact");
    box.innerHTML = "";
    box.appendChild(el("h2", "impact-title", "Workflow impact"));
    box.appendChild(el("p", "delta-line big", "Revise section"));
    box.appendChild(el("p", "impact-note",
      "Choose a section and leave instructions for the agent. Submitting queues a re-draft (stub); the days-saved estimate updates after re-review."));
    return;
  }
  if (s.status === "drafting" && s.action === "revise-submitted") {
    const box = document.getElementById("impact");
    box.innerHTML = "";
    box.appendChild(el("h2", "impact-title", "Workflow impact"));
    box.appendChild(el("p", "delta-line big", "Revision queued"));
    box.appendChild(el("p", "impact-note",
      "Agent is re-drafting the section with your instructions (stub). Est. 6h to next draft; the days-saved estimate updates after re-review."));
    return;
  }

  /* drafting default */
  const base = BASELINE[current] || 21;
  const delta = current === "saf" ? 4 : 12;
  impactPage(base, base - delta,
    "Drafting is underway; the estimate assumes one reviewer pass at the gate (stub).",
    "Calm estimate only. No live systems were contacted for this prototype.");
}

/* ---------------- Boot ---------------- */

function render() {
  renderQueue();
  renderHead();
  renderPacket();
  renderSources();
  renderGate();
  renderImpact();
}

render();