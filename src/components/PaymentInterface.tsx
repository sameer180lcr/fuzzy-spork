import React from 'react';

const PaymentInterface = () => {
  return (
    <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Abstraction Magazine</h3>
            <p className="text-sm text-gray-500">Monthly Subscription</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">$9.99</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">•••• •••• •••• 4242</span>
                <div className="flex space-x-1">
                  <div className="w-6 h-4 bg-blue-500 rounded-sm"></div>
                  <div className="w-6 h-4 bg-yellow-400 rounded-sm"></div>
                </div>
              </div>
              <div className="mt-2 flex space-x-2 text-xs text-gray-500">
                <span>Expires 12/25</span>
                <span>•</span>
                <span>CVC •••</span>
              </div>
            </div>
          </div>
          
          <div>
            <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Subscribe Now
            </button>
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            By subscribing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInterface;
