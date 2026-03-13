"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Simplified MIDI message types
const MSG_TYPES = [
  { name: "CC", label: "Control Change", param1: "CC #", param2: "Value" },
  { name: "PC", label: "Program Change", param1: "Program #", param2: "-" },
  { name: "Note On", label: "Note On", param1: "Note", param2: "Velocity" },
  { name: "Note Off", label: "Note Off", param1: "Note", param2: "Velocity" },
];

interface MidiMessage {
  id: string;
  channel: number; // 1-16, 0 = omni
  msgType: string;
  param1: number;
  param2: number;
}

interface Preset {
  id: number;
  name: string;
  loop1: boolean;
  loop2: boolean;
  loop3: boolean;
  midiMessages: MidiMessage[];
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Note names for dropdown
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function Ms3Editor() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreset, setActivePreset] = useState(1);
  const [presets, setPresets] = useState<Preset[]>(
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      name: `Preset ${i + 1}`,
      loop1: false,
      loop2: false,
      loop3: false,
      midiMessages: [],
    }))
  );
  const [selectedPreset, setSelectedPreset] = useState(1);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");

  const currentPreset = presets[selectedPreset - 1];

  const updatePreset = (updates: Partial<Preset>) => {
    setPresets(presets.map(p => 
      p.id === selectedPreset ? { ...p, ...updates } : p
    ));
  };

  const addMidiMessage = () => {
    const newMsg: MidiMessage = {
      id: generateId(),
      channel: 1,
      msgType: "CC",
      param1: 1,
      param2: 127,
    };
    updatePreset({ midiMessages: [...currentPreset.midiMessages, newMsg] });
  };

  const updateMidiMessage = (msgId: string, updates: Partial<MidiMessage>) => {
    updatePreset({
      midiMessages: currentPreset.midiMessages.map(msg =>
        msg.id === msgId ? { ...msg, ...updates } : msg
      ),
    });
  };

  const removeMidiMessage = (msgId: string) => {
    updatePreset({
      midiMessages: currentPreset.midiMessages.filter(msg => msg.id !== msgId),
    });
  };

  const exportConfig = () => {
    const config = JSON.stringify(presets, null, 2);
    const blob = new Blob([config], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ms3-presets.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = () => {
    try {
      const parsed = JSON.parse(importText);
      if (Array.isArray(parsed) && parsed.length === 9) {
        setPresets(parsed);
        setShowImport(false);
        setImportText("");
      } else {
        alert("Invalid format. Expected 9 presets.");
      }
    } catch {
      alert("Invalid JSON format.");
    }
  };

  const getNoteName = (value: number) => {
    const octave = Math.floor(value / 12) - 1;
    const note = NOTE_NAMES[value % 12];
    return `${note}${octave}`;
  };

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      {/* Top Banner */}
      <div className="bg-[#1a1a1a] text-center py-2 text-sm w-full">
        <a href="#" className="hover:underline">FREE worldwide shipping on orders over $200.</a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 border-b border-[#333] w-full relative">
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <Link href="/" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            CATALOG
          </Link>
          <Link href="/store" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            STORE
          </Link>
          <Link href="/lab" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            LAB
          </Link>
        </div>
        
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image 
            src="/lda-logo.png" 
            alt="Logic des Audio" 
            width={120} 
            height={50}
            className="h-10 md:h-14 lg:h-16 w-auto object-contain"
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <Link href="/editor" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            EDITOR
          </Link>
          <Link href="#" className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            SUPPORT
          </Link>
          <button className="text-xs md:text-sm uppercase tracking-widest hover:text-gray-400">
            LANGUAGE
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#1a1a1a] border-b border-[#333] py-4 md:hidden z-50">
            <div className="flex flex-col items-center gap-4">
              <Link href="/" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                CATALOG
              </Link>
              <Link href="/store" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                STORE
              </Link>
              <Link href="/lab" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                LAB
              </Link>
              <Link href="/editor" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                EDITOR
              </Link>
              <Link href="#" className="text-xs uppercase tracking-widest hover:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                SUPPORT
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Editor Section */}
      <section className="px-4 md:px-8 lg:px-12 py-8 w-full">
        <div className="max-w-full mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/ms-3" className="text-sm text-gray-400 hover:text-white mb-2 inline-block">
                ← Back to MS-3
              </Link>
              <h1 className="text-2xl md:text-4xl font-bold">MS-3 PRESET EDITOR</h1>
              <p className="text-gray-400">Configure your presets and MIDI messages</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowExport(true)}
                className="px-4 py-2 border border-[#333] hover:border-[#00d4ff] text-[#00d4ff] text-sm transition-colors"
              >
                EXPORT
              </button>
              <button 
                onClick={() => setShowImport(true)}
                className="px-4 py-2 border border-[#333] hover:border-[#00d4ff] text-[#00d4ff] text-sm transition-colors"
              >
                IMPORT
              </button>
            </div>
          </div>

          {/* Preset Selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {presets.map(preset => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`px-4 py-2 text-sm font-mono transition-colors ${
                  selectedPreset === preset.id
                    ? "bg-[#00d4ff] text-black"
                    : "bg-[#1a1a1a] text-gray-400 hover:text-white"
                }`}
              >
                {preset.id}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preset Settings */}
            <div className="bg-[#1a1a1a] p-6 border border-[#333]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-[#00d4ff]">●</span>
                Preset {selectedPreset}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Preset Name</label>
                  <input
                    type="text"
                    value={currentPreset.name}
                    onChange={(e) => updatePreset({ name: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-[#333] px-3 py-2 text-white focus:border-[#00d4ff] outline-none"
                    maxLength={16}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-3">Loops</label>
                  <div className="flex gap-3">
                    {[1, 2, 3].map(loop => (
                      <button
                        key={loop}
                        onClick={() => {
                          const key = `loop${loop}` as keyof Preset;
                          updatePreset({ [key]: !currentPreset[key] });
                        }}
                        className={`flex-1 py-3 text-sm font-bold border transition-colors ${
                          currentPreset[`loop${loop}` as keyof Preset]
                            ? "bg-[#00d4ff] border-[#00d4ff] text-black"
                            : "border-[#333] text-gray-500 hover:border-gray-500"
                        }`}
                      >
                        LOOP {loop}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MIDI Messages */}
            <div className="lg:col-span-2 bg-[#1a1a1a] p-6 border border-[#333]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="text-[#00d4ff]">●</span>
                  MIDI Messages
                </h2>
                <button
                  onClick={addMidiMessage}
                  className="px-4 py-2 bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00b8e0] transition-colors"
                >
                  + ADD
                </button>
              </div>

              {currentPreset.midiMessages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">No MIDI messages configured</p>
                  <button
                    onClick={addMidiMessage}
                    className="text-[#00d4ff] hover:underline"
                  >
                    Add your first message
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {currentPreset.midiMessages.map((msg, index) => {
                    const msgTypeInfo = MSG_TYPES.find(t => t.name === msg.msgType) || MSG_TYPES[0];
                    return (
                      <div key={msg.id} className="bg-[#0d0d0d] p-4 border border-[#333] flex flex-wrap items-center gap-3">
                        <span className="text-gray-500 text-sm font-mono">{index + 1}.</span>
                        
                        {/* Channel */}
                        <select
                          value={msg.channel}
                          onChange={(e) => updateMidiMessage(msg.id, { channel: parseInt(e.target.value) })}
                          className="bg-[#1a1a1a] border border-[#333] px-2 py-1 text-white text-sm"
                        >
                          <option value={0}>OMNI</option>
                          {Array.from({ length: 16 }, (_, i) => i + 1).map(ch => (
                            <option key={ch} value={ch}>CH {ch}</option>
                          ))}
                        </select>

                        {/* Message Type */}
                        <select
                          value={msg.msgType}
                          onChange={(e) => updateMidiMessage(msg.id, { msgType: e.target.value })}
                          className="bg-[#1a1a1a] border border-[#333] px-2 py-1 text-white text-sm"
                        >
                          {MSG_TYPES.map(type => (
                            <option key={type.name} value={type.name}>{type.label}</option>
                          ))}
                        </select>

                        {/* Param 1 */}
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs">{msgTypeInfo.param1}:</span>
                          {msg.msgType === "Note On" || msg.msgType === "Note Off" ? (
                            <select
                              value={msg.param1}
                              onChange={(e) => updateMidiMessage(msg.id, { param1: parseInt(e.target.value) })}
                              className="bg-[#1a1a1a] border border-[#333] px-2 py-1 text-white text-sm w-20"
                            >
                              {Array.from({ length: 128 }, (_, i) => i).map(v => (
                                <option key={v} value={v}>{getNoteName(v)}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="number"
                              min="0"
                              max={msg.msgType === "PC" ? 127 : msg.msgType === "CC" ? 127 : 127}
                              value={msg.param1}
                              onChange={(e) => updateMidiMessage(msg.id, { param1: Math.max(0, Math.min(127, parseInt(e.target.value) || 0)) })}
                              className="w-16 bg-[#1a1a1a] border border-[#333] px-2 py-1 text-white text-sm"
                            />
                          )}
                        </div>

                        {/* Param 2 */}
                        {msgTypeInfo.param2 !== "-" && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs">{msgTypeInfo.param2}:</span>
                            <input
                              type="number"
                              min="0"
                              max="127"
                              value={msg.param2}
                              onChange={(e) => updateMidiMessage(msg.id, { param2: Math.max(0, Math.min(127, parseInt(e.target.value) || 0)) })}
                              className="w-16 bg-[#1a1a1a] border border-[#333] px-2 py-1 text-white text-sm"
                            />
                          </div>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => removeMidiMessage(msg.id)}
                          className="ml-auto text-gray-500 hover:text-red-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Export Presets</h3>
            <p className="text-gray-400 text-sm mb-4">
              Download your preset configuration as a JSON file.
            </p>
            <div className="flex gap-3">
              <button
                onClick={exportConfig}
                className="flex-1 py-3 bg-[#00d4ff] text-black font-bold"
              >
                DOWNLOAD
              </button>
              <button
                onClick={() => setShowExport(false)}
                className="px-6 py-3 border border-[#333] text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Import Presets</h3>
            <p className="text-gray-400 text-sm mb-4">
              Paste your preset JSON below.
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='[{"id":1,"name":"Preset 1",...}]'
              className="w-full h-40 bg-[#0d0d0d] border border-[#333] p-3 text-white font-mono text-sm mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={importConfig}
                className="flex-1 py-3 bg-[#00d4ff] text-black font-bold"
              >
                IMPORT
              </button>
              <button
                onClick={() => { setShowImport(false); setImportText(""); }}
                className="px-6 py-3 border border-[#333] text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#333] px-4 md:px-8 lg:px-12 py-8 md:py-12 mt-8 md:mt-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-full mx-auto w-full">
          <div>
            <h3 className="text-lg font-bold mb-4">EMAIL NEWSLETTER</h3>
            <p className="text-sm text-gray-400 mb-4">Get 10% off your first merchandise order.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">MISSION</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Responsible Design</li>
              <li>Responsible Manufacture</li>
              <li>Creativity</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">TERMS & POLICY</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Return Terms</li>
              <li>Privacy Policy</li>
              <li>Copyright</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>YouTube</li>
              <li>Email</li>
              <li>WeChat</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 md:mt-12 text-sm text-gray-500">
          ©2025 Logic des Audio
          <br />
          <span className="text-xs">粤ICP备2025509252号-1</span>
        </div>
      </footer>
    </main>
  );
}
