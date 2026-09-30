# Valkai Workflow Review Console (prototype)

Working prototype for the Valkai Product Manager brief: a Life Sciences
Workflow Review Console inside a Valkai Unified Interface style surface.

Walk through a synthetic regulatory writing case and a safety review case:

1. Active agent workflow queue (Regulatory / Safety)
2. Review-ready draft packet with line-by-line citation chips (SOPs, guidance, precedent stubs)
3. Human gate: Accept draft, Request better sources, Revise section, Escalate to lead
4. Workflow impact: days saved vs the manual baseline, handoff readiness

All data is synthetic. No live SOP, EDMS, or trial systems; no real patient or
filing data. Built phone-first (375px) with no horizontal scroll and touch-sized
actions.

Open index.html directly, or serve the folder:

```sh
python3 -m http.server 8080
```