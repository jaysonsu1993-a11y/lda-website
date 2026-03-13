"use client";

import { useState } from "react";

const MSG_TYPES = [
  { name: "Note Off", code: 0x80, param1: "Note", param2: "Velocity" },
  { name: "Note On", code: 0x90, param1: "Note", param2: "Velocity" },
  { name: "Poly AT", code: 0xA0, param1: "Note", param2: "Value" },
  { name: "CC", code: 0xB0, param1: "CC #", param2: "Value" },
  { name: "PC", code: 0xC0, param1: "Program #", param2: "-" },
  { name: "Channel AT", code: 0xD0, param1: "Value", param2: "-" },
  { name: "Pitch Bend", code: 0xE0, param1: "LSB", param2: "MSB" },
  { name: "Clock", code: 0xF8, param1: "-", param2: "-" },
  { name: "Start", code: 0xFA, param1: "-", param2: "-" },
  { name: "Continue", code: 0xFB, param1: "-", param2: "-" },
  { name: "Stop", code: 0xFC, param1: "-", param2: "-" },
];

interface MidiState {
  channel: number;
  msgType: string;
  param1: number;
  param2: number;
}

// 组件A: 单个 MIDI 通道面板
function MidiChannelPanel() {
  const [state, setState] = useState<MidiState>({
    channel: 0, // 0 means "-"
    msgType: "CC",
    param1: 1,
    param2: 127,
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Channel display: "-" if 0, otherwise "CH.X"
  const channelDisplay = state.channel === 0 ? "-" : `CH.${state.channel}`;
  const dropdownId = `channel-${state.channel}`;

  const currentType = MSG_TYPES.find((t) => t.name === state.msgType) || MSG_TYPES[3];

  // Channel options: "-" option + CH.1 - CH.16
  const channelOptions = [0, ...Array.from({ length: 16 }, (_, i) => i + 1)];

  const selectMsgType = (typeObj: typeof MSG_TYPES[0]) => {
    setState({
      ...state,
      msgType: typeObj.name,
      param1: typeObj.param1 === "-" ? 0 : state.param1,
      param2: typeObj.param2 === "-" ? 0 : state.param2,
    });
    setOpenDropdown(null);
  };

  const selectParam1 = (val: number) => {
    setState({ ...state, param1: val });
    setOpenDropdown(null);
  };

  const selectParam2 = (val: number) => {
    setState({ ...state, param2: val });
    setOpenDropdown(null);
  };

  const adjustParam1 = (delta: number) => {
    const newVal = Math.max(0, Math.min(127, state.param1 + delta));
    setState({ ...state, param1: newVal });
  };

  const adjustParam2 = (delta: number) => {
    const newVal = Math.max(0, Math.min(127, state.param2 + delta));
    setState({ ...state, param2: newVal });
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="flex items-center gap-1 py-2 px-2 bg-[#1a1a2e] rounded border border-[#2d3748] text-base">
      {/* Channel Selector */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown(dropdownId)}
          className="text-sm text-[#00d4ff] hover:text-white transition-colors font-mono w-10 text-center"
        >
          {channelDisplay}
        </button>
        {openDropdown === dropdownId && (
          <div className="absolute top-full left-0 bg-[#0d1421] border border-[#2d3748] rounded z-50 max-h-40 overflow-y-auto min-w-[60px]">
            {channelOptions.map((ch) => (
              <button
                key={ch}
                onClick={() => {
                  setState({ ...state, channel: ch });
                  setOpenDropdown(null);
                }}
                className={`w-full px-2 py-1 text-sm text-left hover:bg-[#1e2940] font-mono ${
                  state.channel === ch ? "text-[#00d4ff]" : "text-white"
                }`}
              >
                {ch === 0 ? "-" : `CH.${ch}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Msg Type */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown(`type-${state.channel}`)}
          className="text-sm text-[#00d4ff] hover:text-white transition-colors px-1"
        >
          {state.msgType.substring(0, 2)}
        </button>
        {openDropdown === `type-${state.channel}` && (
          <div className="absolute top-full left-0 bg-[#0d1421] border border-[#2d3748] rounded z-50 max-h-32 overflow-y-auto min-w-[80px]">
            {MSG_TYPES.map((type, idx) => (
              <button
                key={idx}
                onClick={() => selectMsgType(type)}
                className={`w-full px-2 py-1 text-sm text-left hover:bg-[#1e2940] ${
                  state.msgType === type.name ? "text-[#00d4ff]" : "text-white"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Param1 */}
      <div className="relative flex items-center">
        <button
          onClick={() => adjustParam1(-1)}
          disabled={currentType.param1 === "-"}
          className="text-xs text-[#666] hover:text-white disabled:opacity-30 px-1"
        >
          ▲
        </button>
        <button
          onClick={() => toggleDropdown(`p1-${state.channel}`)}
          disabled={currentType.param1 === "-"}
          className="text-sm text-white hover:text-[#00d4ff] disabled:opacity-30 min-w-[28px] text-center"
        >
          {currentType.param1 === "-" ? "-" : state.param1}
        </button>
        <button
          onClick={() => adjustParam1(1)}
          disabled={currentType.param1 === "-"}
          className="text-xs text-[#666] hover:text-white disabled:opacity-30"
        >
          ▼
        </button>
        {openDropdown === `p1-${state.channel}` && currentType.param1 !== "-" && (
          <div className="absolute top-full left-0 bg-[#0d1421] border border-[#2d3748] rounded z-50 max-h-32 overflow-y-auto min-w-[50px]">
            {Array.from({ length: 128 }, (_, i) => i).map((i) => (
              <button
                key={i}
                onClick={() => selectParam1(i)}
                className={`w-full px-2 py-1 text-sm text-left hover:bg-[#1e2940] ${
                  state.param1 === i ? "text-[#00d4ff]" : "text-white"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Param2 */}
      <div className="relative flex items-center">
        <button
          onClick={() => adjustParam2(-1)}
          disabled={currentType.param2 === "-"}
          className="text-xs text-[#666] hover:text-white disabled:opacity-30"
        >
          ▲
        </button>
        <button
          onClick={() => toggleDropdown(`p2-${state.channel}`)}
          disabled={currentType.param2 === "-"}
          className="text-sm text-white hover:text-[#00d4ff] disabled:opacity-30 min-w-[28px] text-center"
        >
          {currentType.param2 === "-" ? "-" : state.param2}
        </button>
        <button
          onClick={() => adjustParam2(1)}
          disabled={currentType.param2 === "-"}
          className="text-xs text-[#666] hover:text-white disabled:opacity-30"
        >
          ▼
        </button>
        {openDropdown === `p2-${state.channel}` && currentType.param2 !== "-" && (
          <div className="absolute top-full left-0 bg-[#0d1421] border border-[#2d3748] rounded z-50 max-h-32 overflow-y-auto min-w-[50px]">
            {Array.from({ length: 128 }, (_, i) => i).map((i) => (
              <button
                key={i}
                onClick={() => selectParam2(i)}
                className={`w-full px-2 py-1 text-sm text-left hover:bg-[#1e2940] ${
                  state.param2 === i ? "text-[#00d4ff]" : "text-white"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MIDI Code */}
      <div className="text-xs text-[#555] font-mono ml-auto shrink-0">
        {currentType.code.toString(16).toUpperCase().padStart(2, "0")}
      </div>
    </div>
  );
}

// 组件B: 16 通道纵向排列
function MidiChannelRack({ rackId }: { rackId: number }) {
  const presets = ["A", "B", "C", "D", "E", "F"];
  const currentPreset = presets[rackId - 1] || "A";
  
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
      {/* Rack Header */}
      <div className="flex items-center justify-center py-2 px-3 bg-[#131212] rounded border border-[#333]">
        {/* Preset Label - Static Display */}
        <span className="text-base font-bold text-[#00d4ff]">
          Preset {currentPreset}
        </span>
      </div>
      
      {/* 16 Channels */}
      {Array.from({ length: 16 }, (_, i) => i).map((idx) => (
        <MidiChannelPanel key={idx} />
      ))}
    </div>
  );
}

// 组件C: 6 个组件B 横向排列
export default function MidiEditorRack() {
  return (
    <div className="flex gap-2 pb-2 w-[90%] mx-auto overflow-x-auto">
      {/* 6 Racks × 16 Channels = 96 MIDI Channels */}
      {Array.from({ length: 6 }, (_, i) => i + 1).map((rackId) => (
        <MidiChannelRack key={rackId} rackId={rackId} />
      ))}
    </div>
  );
}
