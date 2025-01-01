import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Alert = ({ type, text }) => {
  const isError = type === 'danger';
  
  return (
    <motion.div 
      className="fixed z-50 mx-auto left-0 right-0 bottom-0 p-4 md:bottom-8 md:right-8 md:left-auto md:max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className={`flex items-center gap-3 p-4 rounded-lg shadow-lg ${
          isError ? 'bg-red-500/90' : 'bg-green-500/90'
        } backdrop-blur-sm text-white`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex-shrink-0">
          {isError ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            {isError ? 'Error' : 'Success'}
          </p>
          <p className="text-sm text-white/90 mt-0.5 break-words">
            {text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Alert;