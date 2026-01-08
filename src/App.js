import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Calculator, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './App.css';

// Admin Components
import Login from './pages/Admin/Login';
import Signup from './pages/Admin/Signup';
import Dashboard from './pages/Admin/Dashboard';
import AdminRoute from './routes/AdminRoute';

// Maintenance Components
import MaintenancePage from './components/MaintenancePage';
import { isMaintenanceModeEnabled } from './utils/maintenanceHelper';

// Site Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomSection from './components/CustomSection';
import HeroSection from './components/HeroSection';
import SEO from './components/SEO';

// Calculator 1: What is X % of Y?
const Calculator1 = () => {
  const [percentage, setPercentage] = useState('');
  const [basicValue, setBasicValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const p = parseFloat(percentage);
    const b = parseFloat(basicValue);
    if (!isNaN(p) && !isNaN(b)) {
      const finalValue = (p * b) / 100;
      setResult(`Example: ${p} percent of ${b} is ${Math.round(finalValue)}`);
    } else {
      setResult('');
    }
  }, [percentage, basicValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: What is {percentage || '3'} % of {basicValue || '200'} ?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Percentage Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage</label>
          <div className="relative">
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="3"
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>

        {/* Basic Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Value</label>
          <input
            type="number"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            placeholder="200"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Final Value</label>
          <div className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
            {percentage && basicValue ? Math.round((parseFloat(percentage) * parseFloat(basicValue)) / 100) : '50'}
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// Calculator 2: What percent is X of Y?
const Calculator2 = () => {
  const [basicValue, setBasicValue] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const b = parseFloat(basicValue);
    const i = parseFloat(initialValue);
    if (!isNaN(b) && !isNaN(i) && i !== 0) {
      const percentage = (b * 100) / i;
      setResult(`Example: ${b} out of ${i} equals ${Math.round(percentage)} percent`);
    } else {
      setResult('');
    }
  }, [basicValue, initialValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: What percent is {basicValue || '50'} of {initialValue || '200'} ?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Basic Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Value</label>
          <input
            type="number"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            placeholder="50"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Initial Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Value</label>
          <input
            type="number"
            value={initialValue}
            onChange={(e) => setInitialValue(e.target.value)}
            placeholder="200"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Value</label>
          <div className="relative">
            <div className="w-full p-4 pr-12 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
              {basicValue && initialValue ? Math.round((parseFloat(basicValue) * 100) / parseFloat(initialValue)) : '25'}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// Calculator 3: Percent difference between X and Y?
const Calculator3 = () => {
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const i = parseFloat(initialValue);
    const f = parseFloat(finalValue);
    if (!isNaN(i) && !isNaN(f) && i !== 0) {
      const percentageChange = ((f - i) / i) * 100;
      setResult(`Example: ${i} to ${f} is ${Math.round(percentageChange)} percent more`);
    } else {
      setResult('');
    }
  }, [initialValue, finalValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: Percent difference between {initialValue || '50'} and {finalValue || '75'} ?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Initial Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Value</label>
          <input
            type="number"
            value={initialValue}
            onChange={(e) => setInitialValue(e.target.value)}
            placeholder="50"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Final Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Final Value</label>
          <input
            type="number"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            placeholder="75"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Change</label>
          <div className="relative">
            <div className="w-full p-4 pr-12 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
              {initialValue && finalValue ? Math.round(((parseFloat(finalValue) - parseFloat(initialValue)) / parseFloat(initialValue)) * 100) : '50'}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// Calculator 4: What is X + Y %?
const Calculator4 = () => {
  const [basicValue, setBasicValue] = useState('');
  const [percentageValue, setPercentageValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const b = parseFloat(basicValue);
    const p = parseFloat(percentageValue);
    if (!isNaN(b) && !isNaN(p)) {
      const finalValue = b + (b * p / 100);
      setResult(`Example: ${b} + ${p} percent is ${Math.round(finalValue)}`);
    } else {
      setResult('');
    }
  }, [basicValue, percentageValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: What is {basicValue || '100'} + {percentageValue || '10'} %?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Basic Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Value</label>
          <input
            type="number"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            placeholder="100"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Percentage Value Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Value</label>
          <div className="relative">
            <input
              type="number"
              value={percentageValue}
              onChange={(e) => setPercentageValue(e.target.value)}
              placeholder="10"
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Final Value</label>
          <div className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
            {basicValue && percentageValue ? Math.round(parseFloat(basicValue) + (parseFloat(basicValue) * parseFloat(percentageValue) / 100)) : '110'}
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// Calculator 5: What is X - Y %?
const Calculator5 = () => {
  const [basicValue, setBasicValue] = useState('');
  const [percentageValue, setPercentageValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const b = parseFloat(basicValue);
    const p = parseFloat(percentageValue);
    if (!isNaN(b) && !isNaN(p)) {
      const finalValue = b - (b * p / 100);
      setResult(`Example: ${b} - ${p} percent is ${Math.round(finalValue)}`);
    } else {
      setResult('');
    }
  }, [basicValue, percentageValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: How much is {basicValue || '100'} - {percentageValue || '10'} %?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Basic Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Value</label>
          <input
            type="number"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            placeholder="100"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Percentage Value Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Value</label>
          <div className="relative">
            <input
              type="number"
              value={percentageValue}
              onChange={(e) => setPercentageValue(e.target.value)}
              placeholder="10"
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Final Value</label>
          <div className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
            {basicValue && percentageValue ? Math.round(parseFloat(basicValue) - (parseFloat(basicValue) * parseFloat(percentageValue) / 100)) : '90'}
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// Calculator 6: What percentage is X to Y?
const Calculator6 = () => {
  const [percentage, setPercentage] = useState('');
  const [basicValue, setBasicValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const p = parseFloat(percentage);
    const b = parseFloat(basicValue);
    if (!isNaN(p) && !isNaN(b) && b !== 0) {
      const percentageValue = (p * 100) / b;
      setResult(`Example: ${p} is ${Math.round(percentageValue)} percent of ${b}`);
    } else {
      setResult('');
    }
  }, [percentage, basicValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: What percentage is {percentage || '50'} to {basicValue || '25'} ?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Percentage Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="50"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Basic Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Value</label>
          <input
            type="number"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            placeholder="25"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Value</label>
          <div className="relative">
            <div className="w-full p-4 pr-12 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
              {percentage && basicValue ? Math.round((parseFloat(percentage) * 100) / parseFloat(basicValue)) : '200'}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// Calculator 7: What is X before adding Y %?
const Calculator7 = () => {
  const [percentage, setPercentage] = useState('');
  const [basicValue, setBasicValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const p = parseFloat(percentage);
    const b = parseFloat(basicValue);
    if (!isNaN(p) && !isNaN(b)) {
      const percentageValue = p / (1 + b / 100);
      setResult(`Example: ${p} before adding ${b}% is ${Math.round(percentageValue)}`);
    } else {
      setResult('');
    }
  }, [percentage, basicValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: What is {percentage || '100'} before adding {basicValue || '10'} %?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Percentage Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="100"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Basic Value Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Value</label>
          <div className="relative">
            <input
              type="number"
              value={basicValue}
              onChange={(e) => setBasicValue(e.target.value)}
              placeholder="10"
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Value</label>
          <div className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
            {percentage && basicValue ? Math.round(parseFloat(percentage) / (1 + parseFloat(basicValue) / 100)) : '91'}
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// Calculator 8: What is X before subtracting Y %?
const Calculator8 = () => {
  const [percentage, setPercentage] = useState('');
  const [basicValue, setBasicValue] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const p = parseFloat(percentage);
    const b = parseFloat(basicValue);
    if (!isNaN(p) && !isNaN(b)) {
      const percentageValue = p / (1 - b / 100);
      setResult(`Example: ${p} before deducting ${b}% is ${Math.round(percentageValue)}`);
    } else {
      setResult('');
    }
  }, [percentage, basicValue]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question: What is {percentage || '100'} before subtracting {basicValue || '10'} %?</h3>

      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Percentage Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="100"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
          />
        </div>

        {/* Basic Value Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Value</label>
          <div className="relative">
            <input
              type="number"
              value={basicValue}
              onChange={(e) => setBasicValue(e.target.value)}
              placeholder="10"
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-lg font-bold" style={{ color: '#ff7b7b' }}>%</span>
            </div>
          </div>
        </div>

        {/* Result Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage Value</label>
          <div className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg shadow-sm">
            {percentage && basicValue ? Math.round(parseFloat(percentage) / (1 - parseFloat(basicValue) / 100)) : '111'}
          </div>
        </div>
      </div>

      {/* Example Result */}
      {result && (
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">{result}</p>
        </div>
      )}
    </div>
  );
};

// FAQ Component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Was bedeutet überhaupt 100 %?",
      answer: "100 % steht für das Ganze. Wenn du nichts verloren oder hinzugefügt hast, hast du 100 % des Ausgangswerts. Es ist der Bezugspunkt für alle Prozentberechnungen."
    },
    {
      question: "Was ist der Unterschied zwischen Prozentsatz und Prozentwert?",
      answer: "Der Prozentsatz gibt den Anteil in Prozent an (z.B. 25%), während der Prozentwert das konkrete Ergebnis dieser Berechnung ist (z.B. 50 von 200)."
    },
    {
      question: "Wie kann ich Prozente einfach berechnen?",
      answer: "Merke dir die Grundformel: W = G × P / 100. Dabei ist W der Prozentwert, G der Grundwert und P der Prozentsatz. So kannst du jede Prozentaufgabe schnell lösen."
    },
    {
      question: "Kann ich auch negative Prozentwerte berechnen?",
      answer: "Ja, bei Abnahmen oder Rabatten kannst du auch negative Prozentwerte berechnen. Ein Rabatt von 20% entspricht -20% in der Berechnung."
    },
    {
      question: "Was ist der Grundwert bei Prozentberechnungen?",
      answer: "Der Grundwert ist der Ausgangswert, auf den sich die Prozentangabe bezieht. Er entspricht immer 100% und ist der Bezugspunkt für alle Berechnungen."
    },
    {
      question: "Wie berechne ich Prozentpunkte?",
      answer: "Prozentpunkte sind die absolute Differenz zwischen zwei Prozentwerten. Wenn der Zinssatz von 3% auf 5% steigt, beträgt die Steigerung 2 Prozentpunkte."
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
        Häufige Fragen
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Section Component
const SimpleSection = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};

// Main Calculator Component (existing functionality)
const CalculatorApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <SEO
        title="Prozentrechner Online – Einfach Prozent berechnen"
        description="Berechne Prozente einfach, schnell und kostenlos. Egal ob Prozentsatz, Grundwert oder Prozentwert - unser Online-Rechner hilft dir sofort weiter!"
        canonical="https://prozentrechner.de/"
      />
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <SimpleSection>
        <HeroSection />
      </SimpleSection>

      {/* All Calculators */}
      <SimpleSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Alle Prozentrechner
          </h2>

          <Calculator1 />
          <Calculator2 />
          <Calculator3 />
          <Calculator4 />
          <Calculator5 />
          <Calculator6 />
          <Calculator7 />
          <Calculator8 />
        </section>
      </SimpleSection>

      {/* Educational Content */}
      <SimpleSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Was sind Prozente?</h2>
              <p className="text-gray-600 mb-4">
                Prozente sind eine Möglichkeit, Anteile oder Verhältnisse auszudrücken.
                Das Wort "Prozent" kommt aus dem Lateinischen und bedeutet "von Hundert".
              </p>
              <p className="text-gray-600 mb-4">
                Ein Prozent entspricht einem Hundertstel (1/100) des Ganzen. Wenn du 25%
                von einem Kuchen hast, bedeutet das, dass du 25 von 100 Teilen besitzt.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">Beispiel:</p>
                <p className="text-blue-700">25% = 25/100 = 0,25 = 1/4</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Mathematische Grundlagen</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Grundwert (G)</h3>
                  <p className="text-gray-600 text-sm">Der Ausgangswert, auf den sich die Prozentangabe bezieht (entspricht 100%)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Prozentsatz (P)</h3>
                  <p className="text-gray-600 text-sm">Die Prozentangabe selbst (z.B. 25%)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Prozentwert (W)</h3>
                  <p className="text-gray-600 text-sm">Das konkrete Ergebnis der Prozentberechnung</p>
                </div>
              </div>
              <div className="mt-4 bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-medium">Grundformel:</p>
                <p className="text-green-700">W = G × P / 100</p>
              </div>
            </div>
          </div>
        </section>
      </SimpleSection>

      {/* Examples Section */}
      <SimpleSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Praktische Beispiele für alle Rechner
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Calculator Examples */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Grundlegende Prozentberechnungen</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">1. Prozent von einem Wert</h4>
                  <p className="text-blue-700 text-sm">Was sind 25% von 200€?</p>
                  <p className="text-blue-600 text-sm">→ 25% × 200€ = 50€</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">2. Prozentanteil berechnen</h4>
                  <p className="text-green-700 text-sm">Wie viel Prozent sind 50 von 200?</p>
                  <p className="text-green-600 text-sm">→ (50 ÷ 200) × 100 = 25%</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">3. Prozentunterschied</h4>
                  <p className="text-purple-700 text-sm">Unterschied zwischen 50€ und 75€?</p>
                  <p className="text-purple-600 text-sm">→ ((75-50) ÷ 50) × 100 = 50%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Erweiterte Berechnungen</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">4. Prozent hinzufügen</h4>
                  <p className="text-orange-700 text-sm">100€ + 10% Mehrwertsteuer?</p>
                  <p className="text-orange-600 text-sm">→ 100€ + (100€ × 10%) = 110€</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">5. Prozent abziehen</h4>
                  <p className="text-red-700 text-sm">100€ - 10% Rabatt?</p>
                  <p className="text-red-600 text-sm">→ 100€ - (100€ × 10%) = 90€</p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">6. Prozentverhältnis</h4>
                  <p className="text-indigo-700 text-sm">50 ist wie viel Prozent von 25?</p>
                  <p className="text-indigo-600 text-sm">→ (50 ÷ 25) × 100 = 200%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Rückwärts-Berechnungen</h3>
              <div className="space-y-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-800 mb-2">7. Vor Hinzufügen</h4>
                  <p className="text-teal-700 text-sm">Was war der Preis vor 10% Steuer?</p>
                  <p className="text-teal-600 text-sm">→ 110€ ÷ (1 + 10%) = 100€</p>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-800 mb-2">8. Vor Abziehen</h4>
                  <p className="text-pink-700 text-sm">Was war der Preis vor 10% Rabatt?</p>
                  <p className="text-pink-600 text-sm">→ 90€ ÷ (1 - 10%) = 100€</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Alltags-Anwendungen</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">💰 Finanzen</h4>
                  <p className="text-yellow-700 text-sm">• Zinsen berechnen</p>
                  <p className="text-yellow-700 text-sm">• Rabatte und Steuern</p>
                  <p className="text-yellow-700 text-sm">• Preisvergleiche</p>
                </div>

                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-800 mb-2">📊 Statistiken</h4>
                  <p className="text-cyan-700 text-sm">• Umfrageergebnisse</p>
                  <p className="text-cyan-700 text-sm">• Wachstumsraten</p>
                  <p className="text-cyan-700 text-sm">• Erfolgsquoten</p>
                </div>

                <div className="bg-lime-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lime-800 mb-2">🏪 Geschäft</h4>
                  <p className="text-lime-700 text-sm">• Gewinnmargen</p>
                  <p className="text-lime-700 text-sm">• Marktanteile</p>
                  <p className="text-lime-700 text-sm">• Performance-Messung</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Warum Prozentrechnung wichtig ist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">📈</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Wachstum verstehen</h4>
                <p className="text-gray-600 text-sm">Prozente helfen dir, Veränderungen und Trends zu erkennen</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">💡</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Entscheidungen treffen</h4>
                <p className="text-gray-600 text-sm">Bessere finanzielle und geschäftliche Entscheidungen</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Ziele erreichen</h4>
                <p className="text-gray-600 text-sm">Fortschritt messen und Ziele definieren</p>
              </div>
            </div>
          </div>
        </section>
      </SimpleSection>

      {/* Custom Content Section */}
      <CustomSection />

      {/* FAQ Section */}
      <SimpleSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FAQSection />
        </section>
      </SimpleSection>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Maintenance Mode Wrapper Component
const MaintenanceWrapper = ({ children }) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check maintenance mode on component mount
    const checkMaintenanceMode = () => {
      const maintenanceEnabled = isMaintenanceModeEnabled();
      setIsMaintenanceMode(maintenanceEnabled);
      setLoading(false);
    };

    checkMaintenanceMode();

    // Listen for storage changes (when admin toggles maintenance mode)
    const handleStorageChange = (e) => {
      if (e.key === 'maintenanceMode') {
        const maintenanceEnabled = e.newValue === 'true';
        setIsMaintenanceMode(maintenanceEnabled);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case localStorage is changed in the same tab
    const interval = setInterval(checkMaintenanceMode, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show maintenance page if maintenance mode is enabled
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  // Show normal content
  return children;
};

// Main App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <MaintenanceWrapper>
            <CalculatorApp />
          </MaintenanceWrapper>
        } />

        {/* Admin Routes - Always accessible regardless of maintenance mode */}
        <Route path="/admin/login" element={
          <>
            <SEO title="Admin Login" noindex={true} />
            <Login />
          </>
        } />
        <Route path="/admin/signup" element={
          <>
            <SEO title="Admin Signup" noindex={true} />
            <Signup />
          </>
        } />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Navigate to="/admin/dashboard" replace />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <>
                <SEO title="Admin Dashboard" noindex={true} />
                <Dashboard />
              </>
            </AdminRoute>
          }
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;