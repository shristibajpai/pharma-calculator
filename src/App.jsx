import React, { useState } from 'react';

export default function SchemeNetRateCalculator() {
  const [mrp, setMrp] = useState(176);
  const [ptrDiscount, setPtrDiscount] = useState(20);
  const [ptsDiscount, setPtsDiscount] = useState(10);
  const [gst, setGst] = useState(5);
  
  // Scheme 1
  const [scheme1Buy, setScheme1Buy] = useState(10);
  const [scheme1Free, setScheme1Free] = useState(2);
  
  // Scheme 2
  const [scheme2Buy, setScheme2Buy] = useState(10);
  const [scheme2Free, setScheme2Free] = useState(5);

  // Calculate PTR and PTS (removing GST)
  const gstMultiplier = 1 + (gst / 100);
  const mrpExGst = mrp / gstMultiplier;
  const ptr = mrp * (1 - ptrDiscount / 100);
  const ptrExGst = ptr / gstMultiplier;
  const pts = ptr * (1 - ptsDiscount / 100);
  const ptsExGst = pts / gstMultiplier;

  // Calculate Net Rate for schemes (using Ex-GST prices)
  const calculateNetRate = (buy, free, basePrice) => {
    const totalUnits = buy + free;
    const netRate = (buy * basePrice) / totalUnits;
    const discountPercent = (free / totalUnits) * 100;
    return { netRate, discountPercent };
  };

  const scheme1Result = calculateNetRate(scheme1Buy, scheme1Free, ptrExGst);
  const scheme2Result = calculateNetRate(scheme2Buy, scheme2Free, ptrExGst);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">
          Scheme to Net Rate Conversion Calculator
        </h1>

        {/* Basic Pricing */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">Basic Pricing Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MRP (₹)</label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PTR Discount (%)</label>
              <input
                type="number"
                value={ptrDiscount}
                onChange={(e) => setPtrDiscount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PTS Discount (% on PTR)</label>
              <input
                type="number"
                value={ptsDiscount}
                onChange={(e) => setPtsDiscount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST (%)</label>
              <input
                type="number"
                value={gst}
                onChange={(e) => setGst(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-indigo-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">MRP (Inc. GST)</p>
                <p className="text-2xl font-bold text-indigo-900">₹{mrp.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Ex-GST: ₹{mrpExGst.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PTR (Inc. GST)</p>
                <p className="text-2xl font-bold text-indigo-900">₹{ptr.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Ex-GST: ₹{ptrExGst.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PTS (Inc. GST)</p>
                <p className="text-2xl font-bold text-indigo-900">₹{pts.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Ex-GST: ₹{ptsExGst.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scheme 1: 10+2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Scheme 1: Buy + Free Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buy Quantity</label>
              <input
                type="number"
                value={scheme1Buy}
                onChange={(e) => setScheme1Buy(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Free Quantity</label>
              <input
                type="number"
                value={scheme1Free}
                onChange={(e) => setScheme1Free(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-3">Scheme: {scheme1Buy} + {scheme1Free}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Units Received</p>
                <p className="text-xl font-bold text-green-900">{scheme1Buy + scheme1Free}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Rate to Retailer (Ex-GST)</p>
                <p className="text-xl font-bold text-green-900">₹{scheme1Result.netRate.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Effective Discount</p>
                <p className="text-xl font-bold text-green-900">{scheme1Result.discountPercent.toFixed(2)}%</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700 bg-white p-3 rounded">
              <p><strong>Calculation:</strong> Pay for {scheme1Buy} units @ ₹{ptrExGst.toFixed(2)} = ₹{(scheme1Buy * ptrExGst).toFixed(2)} (Ex-GST)</p>
              <p>Get {scheme1Buy + scheme1Free} units → Net Rate = ₹{(scheme1Buy * ptrExGst).toFixed(2)} ÷ {scheme1Buy + scheme1Free} = ₹{scheme1Result.netRate.toFixed(2)}/unit (Ex-GST)</p>
            </div>
          </div>
        </div>

        {/* Scheme 2: 10+5 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Scheme 2: Buy + Free Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buy Quantity</label>
              <input
                type="number"
                value={scheme2Buy}
                onChange={(e) => setScheme2Buy(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Free Quantity</label>
              <input
                type="number"
                value={scheme2Free}
                onChange={(e) => setScheme2Free(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-3">Scheme: {scheme2Buy} + {scheme2Free}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Units Received</p>
                <p className="text-xl font-bold text-purple-900">{scheme2Buy + scheme2Free}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Rate to Retailer (Ex-GST)</p>
                <p className="text-xl font-bold text-purple-900">₹{scheme2Result.netRate.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Effective Discount</p>
                <p className="text-xl font-bold text-purple-900">{scheme2Result.discountPercent.toFixed(2)}%</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700 bg-white p-3 rounded">
              <p><strong>Calculation:</strong> Pay for {scheme2Buy} units @ ₹{ptrExGst.toFixed(2)} = ₹{(scheme2Buy * ptrExGst).toFixed(2)} (Ex-GST)</p>
              <p>Get {scheme2Buy + scheme2Free} units → Net Rate = ₹{(scheme2Buy * ptrExGst).toFixed(2)} ÷ {scheme2Buy + scheme2Free} = ₹{scheme2Result.netRate.toFixed(2)}/unit (Ex-GST)</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Comparison Summary (All Prices Ex-GST)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Scheme</th>
                  <th className="px-4 py-2 text-right">Net Rate</th>
                  <th className="px-4 py-2 text-right">Effective Discount</th>
                  <th className="px-4 py-2 text-right">Savings per Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Regular Price (No Scheme)</td>
                  <td className="px-4 py-3 text-right font-semibold">₹{ptrExGst.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">0%</td>
                  <td className="px-4 py-3 text-right">₹0</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="px-4 py-3">{scheme1Buy} + {scheme1Free}</td>
                  <td className="px-4 py-3 text-right font-semibold">₹{scheme1Result.netRate.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">{scheme1Result.discountPercent.toFixed(2)}%</td>
                  <td className="px-4 py-3 text-right text-green-700">₹{(ptrExGst - scheme1Result.netRate).toFixed(2)}</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-4 py-3">{scheme2Buy} + {scheme2Free}</td>
                  <td className="px-4 py-3 text-right font-semibold">₹{scheme2Result.netRate.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">{scheme2Result.discountPercent.toFixed(2)}%</td>
                  <td className="px-4 py-3 text-right text-purple-700">₹{(ptrExGst - scheme2Result.netRate).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}