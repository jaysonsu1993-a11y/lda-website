"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage, useLocalizedPath } from "@/context/LanguageContext";
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
  channel: number;
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

const generateId = () => Math.random().toString(36).substring(2, 9);

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function Ms3FullEditor() {
  const { t } = useLanguage();
  const path = useLocalizedPath();
  const [selectedPreset, setSelectedPreset] = useState(1);
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
      }
    } catch {
      console.error("Invalid JSON format.");
    }
  };

  const getNoteName = (value: number) => {
    const octave = Math.floor(value / 12) - 1;
    const note = NOTE_NAMES[value % 12];
    return `${note}${octave}`;
  };

  return (
    <main className="min-h-screen bg-[#131212] text-white w-full">
      <Navigation />

      <section className="px-4 md:px-8 lg:px-12 py-8 w-full">
        <div className="max-w-full mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href={path("/ms-3")} className="text-sm text-gray-400 hover:text-white mb-2 inline-block">
                {t.editor.back}
              </Link>
              <h1 className="text-2xl md:text-4xl font-bold">{t.editor.title}</h1>
              <p className="text-gray-400">{t.editor.subtitle}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowExport(true)}
                className="px-4 py-2 border border-[#333] hover:border-[#00d4ff] text-[#00d4ff] text-sm transition-colors"
              >
                {t.editor.export}
              </button>
              <button
                onClick={() => setShowImport(true)}
                className="px-4 py-2 border border-[#333] hover:border-[#00d4ff] text-[#00d4ff] text-sm transition-colors"
              >
                {t.editor.import}
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
                {t.editor.preset} {selectedPreset}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">{t.editor.presetName}</label>
                  <input
                    type="text"
                    value={currentPreset.name}
                    onChange={(e) => updatePreset({ name: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-[#333] px-3 py-2 text-white focus:border-[#00d4ff] outline-none"
                    maxLength={16}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-3">{t.editor.loops}</label>
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
                  {t.editor.midiMessages}
                </h2>
                <button
                  onClick={addMidiMessage}
                  className="px-4 py-2 bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00b8e0] transition-colors"
                >
                  {t.editor.add}
                </button>
              </div>

              {currentPreset.midiMessages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">{t.editor.noMessages}</p>
                  <button
                    onClick={addMidiMessage}
                    className="text-[#00d4ff] hover:underline"
                  >
                    {t.editor.addFirst}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {currentPreset.midiMessages.map((msg, index) => {
                    const msgTypeInfo = MSG_TYPES.find(ty => ty.name === msg.msgType) || MSG_TYPES[0];
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
                              max="127"
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
            <h3 className="text-xl font-bold mb-4">{t.editor.exportTitle}</h3>
            <p className="text-gray-400 text-sm mb-4">{t.editor.exportDesc}</p>
            <div className="flex gap-3">
              <button onClick={exportConfig} className="flex-1 py-3 bg-[#00d4ff] text-black font-bold">
                {t.editor.download}
              </button>
              <button onClick={() => setShowExport(false)} className="px-6 py-3 border border-[#333] text-white">
                {t.editor.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">{t.editor.importTitle}</h3>
            <p className="text-gray-400 text-sm mb-4">{t.editor.importDesc}</p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='[{"id":1,"name":"Preset 1",...}]'
              className="w-full h-40 bg-[#0d0d0d] border border-[#333] p-3 text-white font-mono text-sm mb-4"
            />
            <div className="flex gap-3">
              <button onClick={importConfig} className="flex-1 py-3 bg-[#00d4ff] text-black font-bold">
                {t.editor.importBtn}
              </button>
              <button onClick={() => { setShowImport(false); setImportText(""); }} className="px-6 py-3 border border-[#333] text-white">
                {t.editor.close}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
