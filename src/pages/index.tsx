'use client';
import { useState } from 'react';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

export default function ProductConfirmDemo() {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = () => {
    // Regex for Bangladesh phone numbers
    const bdPhoneRegex = /(?:\+?88)?0?1[3-9]\d{8}/;

    if (!bdPhoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number (e.g., 01712345678)");
      return;
    }

    setIsOrdered(true);
    // Logic for GTM trigger would go here
    setTimeout(() => setIsOrdered(false), 3000);
  };

  return (
    <main className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6 font-sans">
      {/* Soft Background Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/40 blur-[100px] rounded-full" />
      </div>

      <section className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-indigo-100/50">
          
          {/* Header */}
          <div className="p-8 text-center border-b border-slate-100">
            <div className="inline-flex p-4 bg-indigo-50 rounded-3xl mb-4 text-indigo-600">
              <ShoppingBag size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Checkout Demo</h2>
            <p className="text-slate-500 text-sm mt-1">Interactive Tracking Sandbox</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Product Info */}
            <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-xl">
                  ✨
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">Premium Subscription</h4>
                  <p className="text-xs text-slate-400">Monthly Plan</p>
                </div>
              </div>
              <span className="font-bold text-slate-900">$29.00</span>
            </div>

            {/* Input Field for Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="number" 
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="relative pt-2">
              <button 
                onClick={handleConfirm}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`w-full group relative overflow-hidden py-5 rounded-2xl font-black tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-3
                  ${isOrdered 
                    ? 'bg-emerald-500 text-white shadow-emerald-200' 
                    : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-200 active:scale-95'
                  }`}
              >
                {isOrdered ? (
                  <>
                    Order Confirmed
                  </>
                ) : (
                  <>
                    Confirm Order
                  </>
                )}
                
                <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity" />
              </button>

              {/* Tag detection badge */}
              <div className={`absolute -top-1 -right-2 flex items-center gap-1.5 px-3 py-1 bg-white border border-indigo-100 shadow-sm rounded-full transition-all duration-500 transform
                ${isHovered ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-600 tracking-tighter">GTM Listener Active</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-slate-300" />
            <span className="text-[10px] font-medium text-slate-400 tracking-[0.2em]">Secure Demo Environment</span>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          Clicking <span className="text-indigo-500 font-bold">Confirm Order</span> simulates a <br/> standard e-commerce purchase event.
        </p>
      </section>
    </main>
  );
}