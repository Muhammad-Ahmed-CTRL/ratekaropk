'use client';

// Removed unused import
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { create } from 'zustand';

type ToastType = 'success' | 'error';

interface ToastState {
  message: string | null;
  type: ToastType;
  show: (msg: string, t?: ToastType) => void;
  hide: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  type: 'success',
  show: (msg, type = 'success') => {
    set({ message: msg, type });
    setTimeout(() => {
      set({ message: null });
    }, 3000);
  },
  hide: () => set({ message: null }),
}));

export function ToastProvider() {
  const { message, type, hide } = useToast();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className="fixed top-20 right-4 md:right-8 z-[100] flex items-center gap-3 px-4 py-3 bg-[#111118] border border-[rgba(255,255,255,0.1)] rounded-lg shadow-2xl"
        >
          {type === 'success' ? (
            <CheckCircle className="text-[#00F5C4]" size={18} />
          ) : (
            <XCircle className="text-red-400" size={18} />
          )}
          <p className="text-sm text-white font-medium">{message}</p>
          <button onClick={hide} className="ml-4 text-[#8B8B9E] hover:text-white">
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
