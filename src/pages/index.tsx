// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GtmFullTest() {
  const searchParams = useSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [activeGtm, setActiveGtm] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [auth, setAuth] = useState({ token: '', refresh: '' });
  
  const [config, setConfig] = useState({
    containerId: '',
    buttonText: 'Confirm Order',
    apiEndpoint: 'https://api.manydial.com/v1/portal/testHook',
  });

  // 1. Session Persistence: Load tokens from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedRefresh = localStorage.getItem('refresh_token');
    
    // Check URL first (for new logins)
    const urlToken = searchParams.get('token');
    const urlRefresh = searchParams.get('refresh');

    if (urlToken && urlRefresh) {
      // Save new login to state and storage
      setAuth({ token: urlToken, refresh: urlRefresh });
      localStorage.setItem('auth_token', urlToken);
      localStorage.setItem('refresh_token', urlRefresh);
      addLog('🔐 New login detected and saved to local storage.');
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (savedToken) {
      // Restore previous session
      setAuth({ token: savedToken, refresh: savedRefresh || '' });
      addLog('🔄 Session restored from local storage.');
    }
  }, [searchParams]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    setAuth({ token: '', refresh: '' });
    addLog('👋 Logged out successfully.');
  };

  const handleSetup = async () => {
    // Always use the latest token from state (which is synced with localStorage)
    if (!auth.token) {
      addLog('❌ Error: You must login first!');
      return;
    }

    setLoading(true);
    addLog('Requesting GTM Setup from Backend...');
    
    try {
      const res = await fetch('http://localhost:3000/api/v1/gtm/setup-tracking', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}` 
        },
        body: JSON.stringify({
          containerId: config.containerId,
          buttonSelector: config.buttonText,
          buttonSelectorType: 'text',
          apiEndpoint: config.apiEndpoint
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Setup failed');
      
      addLog(`✅ SUCCESS: Tag & Trigger Created (Version ${data.versionId})`);
      setActiveGtm(config.containerId);
    } catch (err) {
      addLog(`❌ ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-12 font-sans text-slate-900">

      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-indigo-600">GTM Automator <span className="text-slate-400 font-light">| Test Suite</span></h1>
            <p className="text-sm text-slate-500">
              {auth.token ? `Authenticated Session Active` : 'Waiting for Google Login...'}
            </p>
          </div>
          <div className="flex gap-3">
             {auth.token && (
               <button onClick={handleLogout} className="text-slate-500 text-sm hover:text-red-500 transition">
                 Logout
               </button>
             )}
             <button 
                onClick={handleLogin} 
                className={`${auth.token ? 'bg-emerald-500' : 'bg-slate-900'} text-white px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md`}
              >
                {auth.token ? '✓ Connected' : 'Connect Google Account'}
              </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* STEP 1: CONFIGURATION */}
          <section className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-indigo-700">
              <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs italic">1</span>
              GTM API Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Container Public ID</label>
                <input 
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-indigo-600" 
                  placeholder="GTM-P6KXXXX"
                  value={config.containerId}
                  onChange={(e) => setConfig({...config, containerId: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400">Target Button Text</label>
                <input 
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                  value={config.buttonText}
                  onChange={(e) => setConfig({...config, buttonText: e.target.value})}
                />
              </div>
              <button 
                onClick={handleSetup}
                disabled={loading || !config.containerId || !auth.token}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-lg shadow-indigo-200"
              >
                {loading ? 'Processing API Call...' : 'Create & Publish Tracking'}
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">System Logs</h3>
              <div className="bg-slate-900 rounded-xl p-4 h-44 overflow-y-auto font-mono text-[10px] text-indigo-300 border border-slate-800 scrollbar-hide">
                {logs.length === 0 ? <div className="opacity-30 underline italic">No logs recorded...</div> : logs.map((l, i) => <div key={i} className="mb-1">{l}</div>)}
              </div>
            </div>
          </section>

          {/* STEP 2: SANDBOX */}
          <section className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 text-xs font-bold rounded-bl-xl tracking-tighter">LIVE SITE PREVIEW</div>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-700">
              <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs italic">2</span>
              Interactive Sandbox
            </h2>
            
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[250px]">
              <div className="mb-8 text-center">
                <p className="text-sm text-slate-500 mb-2">Simulate a user interaction</p>
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-inner mb-4 mx-auto text-3xl">🛍️</div>
              </div>

              <button 
                className="px-12 py-5 bg-emerald-500 text-white rounded-2xl text-xl font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-200 uppercase tracking-tight"
              >
                {config.buttonText}
              </button>
            </div>

            <div className="mt-6 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed italic">
              <strong>Developer Note:</strong> This sandbox is currently listening for <b>{config.buttonText}</b>. Once the GTM container (ID: {activeGtm || 'None'}) loads, clicking this will send a <code>POST</code> request to your Manydial endpoint.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}