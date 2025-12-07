import React from 'react';

// Simple Icons to avoid external dependencies
const Icons = {
  Check: () => (
    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Terminal: () => (
    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Bug: () => (
    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 14.5v.01M12 18.5v.01M12 21.5v.01M12 7.5v.01M12 11.5v.01M4 11h2m-1 5h1m11 0h1m-1-5h1" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const CoPilotWorkspace = ({ 
  phase, 
  summary, 
  checklist = [], 
  commands = [], 
  analysis, 
  next_actions = [], 
  state = { checklist_status: {}, evidence: [], findings: [], report_draft: "" } 
}) => {

  // Helper to determine checklist item status
  const getStatusIcon = (item) => {
    const key = Object.keys(state.checklist_status).find(k => item.startsWith(k.split(' ')[0]));
    const status = key ? state.checklist_status[key] : "Pending";
    
    if (status === "Done") return <Icons.Check />;
    return <Icons.Clock />;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans p-4 md:p-6 flex flex-col md:flex-row gap-6">
      
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-xs font-bold text-blue-900 bg-blue-400 rounded-full">CO-PILOT</span>
            <h1 className="text-xl font-bold text-white tracking-wide">{phase}</h1>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{summary}</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg flex-1">
          <h2 className="text-lg font-semibold text-white mb-4">Mission Checklist</h2>
          <div className="space-y-3">
            {checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-800 rounded transition">
                <div className="mt-0.5">{getStatusIcon(item)}</div>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {commands.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Recommended Tools</h2>
            <div className="space-y-4">
              {commands.map((cmd, idx) => (
                <div key={idx} className="bg-black rounded border border-gray-700 overflow-hidden">
                  <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 font-mono border-b border-gray-700">
                    <span>{cmd.name}</span>
                  </div>
                  <div className="p-3 font-mono text-sm text-green-400 break-all select-all">
                    {cmd.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-l-blue-500">
          <h2 className="text-lg font-semibold text-white mb-3">Mentor Analysis</h2>
          <p className="text-sm text-gray-300 mb-4">{analysis}</p>
          
          <div className="bg-gray-800/50 p-3 rounded">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Next Steps</h3>
            <ul className="list-disc list-inside space-y-1">
              {next_actions.map((action, idx) => (
                <li key={idx} className="text-sm text-white">{action}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg h-1/3 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Evidence Locker</h2>
            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">{state.evidence.length} items</span>
          </div>
          <ul className="space-y-2">
            {state.evidence.length === 0 ? (
              <li className="text-sm text-gray-600 italic">No evidence collected yet...</li>
            ) : (
              state.evidence.map((ev, idx) => (
                <li key={idx} className="text-sm text-gray-300 font-mono bg-gray-800 p-2 rounded border border-gray-700/50">
                  {ev}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg h-1/3 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Findings</h2>
            <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">
              {state.findings.length} suspected
            </span>
          </div>
          {state.findings.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-20 text-gray-600">
               <span className="text-sm">No vulnerabilities confirmed yet.</span>
             </div>
          ) : (
            <ul className="space-y-2">
              {state.findings.map((finding, idx) => (
                <li key={idx} className="p-3 bg-red-900/10 border border-red-900/30 rounded text-red-200 text-sm">
                  {finding}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-lg flex-1 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-2">Report Draft</h2>
          <textarea 
            className="flex-1 w-full bg-black text-gray-300 font-mono text-sm p-4 rounded border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
            readOnly
            value={state.report_draft || "Report draft is empty. Identify a vulnerability to begin drafting."}
          />
        </div>

      </div>
    </div>
  );
};

export default CoPilotWorkspace;
