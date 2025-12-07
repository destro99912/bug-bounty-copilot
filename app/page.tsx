import CoPilotWorkspace from "../src/components/CoPilotWorkspace";

export default function Home() {
  return (
    <CoPilotWorkspace
      phase="Phase 1: Reconnaissance"
      summary="We are mapping the attack surface for example.com. The goal is to build a list of subdomains, live hosts, and interesting endpoints."
      checklist={[
        "1. Verify Scope",
        "2. Passive Subdomain Enumeration",
        "3. Active DNS Brute-Forcing",
        "4. Live Host Verification",
        "5. Visual Inspection",
        "6. Content Discovery"
      ]}
      commands={[
        {
          name: "Subfinder",
          usage: "subfinder -d example.com -o subs.txt",
          when_to_use: "Run first to get a passive list of subdomains."
        }
      ]}
      analysis="Your scope is wildcard. Start broad, then focus on dev and admin subdomains."
      next_actions={[
        "Run Subfinder",
        "Run httpx on the results",
        "Paste the httpx output into the copilot"
      ]}
      state={{
        checklist_status: {
          "1. Verify Scope": "Done",
          "2. Passive Subdomain Enumeration": "Done",
          "3. Active DNS Brute-Forcing": "Pending",
          "4. Live Host Verification": "Pending",
          "5. Visual Inspection": "Pending",
          "6. Content Discovery": "Pending"
        },
        evidence: [
          "137 subdomains discovered",
          "Interesting: dev.example.com, admin.example.com"
        ],
        findings: [],
        report_draft: ""
      }}
    />
  );
}
