"use client";

import React, { useState } from "react";
import { Repeat2 } from "lucide-react";

type UnitType = "length" | "weight" | "temp";

interface UnitConfig {
  name: string;
  factor: number; // Factor relative to base unit (m for length, kg for weight)
}

const LENGTH_UNITS: Record<string, UnitConfig> = {
  meters: { name: "Meters (m)", factor: 1 },
  kilometers: { name: "Kilometers (km)", factor: 1000 },
  centimeters: { name: "Centimeters (cm)", factor: 0.01 },
  millimeters: { name: "Millimeters (mm)", factor: 0.001 },
  inches: { name: "Inches (in)", factor: 0.0254 },
  feet: { name: "Feet (ft)", factor: 0.3048 },
  yards: { name: "Yards (yd)", factor: 0.9144 },
  miles: { name: "Miles (mi)", factor: 1609.34 },
};

const WEIGHT_UNITS: Record<string, UnitConfig> = {
  kilograms: { name: "Kilograms (kg)", factor: 1 },
  grams: { name: "Grams (g)", factor: 0.001 },
  milligrams: { name: "Milligrams (mg)", factor: 0.000001 },
  pounds: { name: "Pounds (lb)", factor: 0.45359237 },
  ounces: { name: "Ounces (oz)", factor: 0.02834952 },
};

export default function UnitConverter() {
  const [type, setType] = useState<UnitType>("length");
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");

  // Get active configurations
  const getUnits = () => {
    if (type === "weight") return WEIGHT_UNITS;
    return LENGTH_UNITS;
  };

  // Convert function
  const convert = (): string => {
    const val = parseFloat(value);
    if (isNaN(val)) return "";

    if (type === "temp") {
      // Temperature special case
      if (fromUnit === toUnit) return val.toString();
      let celsius = val;
      if (fromUnit === "fahrenheit") celsius = ((val - 32) * 5) / 9;
      if (fromUnit === "kelvin") celsius = val - 273.15;

      let result = celsius;
      if (toUnit === "fahrenheit") result = (celsius * 9) / 5 + 32;
      if (toUnit === "kelvin") result = celsius + 273.15;

      return result.toFixed(4);
    }

    const units = getUnits();
    const fromFactor = units[fromUnit]?.factor || 1;
    const toFactor = units[toUnit]?.factor || 1;

    // Convert to base unit then to target unit
    const result = (val * fromFactor) / toFactor;
    return result.toFixed(6).replace(/\.?0+$/, ""); // Trim trailing zeros
  };

  const handleTypeChange = (newType: UnitType) => {
    setType(newType);
    if (newType === "length") {
      setFromUnit("meters");
      setToUnit("kilometers");
    } else if (newType === "weight") {
      setFromUnit("kilograms");
      setToUnit("pounds");
    } else {
      setFromUnit("celsius");
      setToUnit("fahrenheit");
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const units = getUnits();
  const resultValue = convert();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Repeat2 className="w-6 h-6 text-primary-theme" />
        Unit Converter
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Convert between different units of length, weight, and temperature instantly.
      </p>

      {/* Type Switcher */}
      <div className="mt-6 flex bg-slate-100 p-1 rounded-xl">
        {(
          [
            { label: "Length", value: "length" },
            { label: "Weight", value: "weight" },
            { label: "Temperature", value: "temp" },
          ] as const
        ).map((item) => (
          <button
            key={item.value}
            onClick={() => handleTypeChange(item.value)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              type === item.value
                ? "bg-white text-primary-theme shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
        {/* From Section */}
        <div className="md:col-span-3 space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            From
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-primary-theme font-semibold text-lg"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:border-primary-theme text-sm font-medium"
          >
            {type === "temp" ? (
              <>
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
              </>
            ) : (
              Object.keys(units).map((k) => (
                <option key={k} value={k}>
                  {units[k].name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center mt-2 md:mt-6">
          <button
            onClick={swapUnits}
            className="p-3 bg-slate-100 hover:bg-primary-theme/10 hover:text-primary-theme text-slate-600 rounded-full transition-colors cursor-pointer border border-slate-200"
            title="Swap Units"
          >
            <Repeat2 className="w-5 h-5" />
          </button>
        </div>

        {/* To Section */}
        <div className="md:col-span-3 space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            To
          </label>
          <div className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-semibold text-lg min-h-[58px] flex items-center select-all">
            {resultValue || "0"}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:border-primary-theme text-sm font-medium"
          >
            {type === "temp" ? (
              <>
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
              </>
            ) : (
              Object.keys(units).map((k) => (
                <option key={k} value={k}>
                  {units[k].name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
