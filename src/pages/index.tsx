'use client';
import { useState } from 'react';
import { ShoppingBag, Phone, Loader2, CheckCircle2 } from 'lucide-react';

export default function ProductConfirmDemo() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleConfirm = () => {
    // Basic validation before GTM even sees it
    if (!(phoneNumber)) {
      alert("Please enter a valid Bangladesh phone number.");
      return;
    }

    setStatus('loading');
    
    // Simulating process time to let GTM scrape the data
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-sm border border-slate-100">
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-3">
            <ShoppingBag size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Complete Order</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative mt-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="tel"
                name="customer_phone" // GTM looks for this name
                placeholder="01XXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium"
              />
            </div>
          </div>

          <button 
            onClick={handleConfirm}
            disabled={status !== 'idle'}
            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 
              ${status === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}
          >
            {status === 'loading' && <Loader2 className="animate-spin" size={20} />}
            {status === 'success' ? 'Order Confirmed!' : 'অর্ডার কনফার্ম করুন >>'}
          </button>
        </div>
      </div>
    </div>
  );
}