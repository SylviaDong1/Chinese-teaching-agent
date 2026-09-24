const seasons = [
  {
    key: "spring", name: "春天", icon: "🌸", sky: "🌤️", scene: "🌱　🌸　🌿", weather: "暖和", action: "很漂亮",
    exploreWords: ["暖和", "很漂亮"], reasons: ["暖和", "很漂亮", "🌸 花"], answer: "春天很暖和，也很漂亮。",
    demo: { 暖和: "我最喜欢春天，因为春天很暖和。", 很漂亮: "我最喜欢春天，因为春天很漂亮。", "🌸 花": "我最喜欢春天，因为春天有花，很漂亮。" },
  },
  {
    key: "summer", name: "夏天", icon: "☀️", sky: "☀️", scene: "🌊　🏊　🍉", weather: "很热", action: "可以游泳",
    exploreWords: ["很热", "游泳"], reasons: ["很热", "可以游泳", "喜欢游泳", "🍉 西瓜"], answer: "夏天很热，可以游泳。",
    demo: { 很热: "我最喜欢夏天，因为夏天很热。", 可以游泳: "我最喜欢夏天，因为夏天可以游泳。", 喜欢游泳: "我最喜欢夏天，因为我喜欢游泳。", "🍉 西瓜": "我最喜欢夏天，因为夏天有西瓜。" },
  },
  {
    key: "autumn", name: "秋天", icon: "🍂", sky: "⛅", scene: "🍁　🌾　🍂", weather: "凉快", action: "很舒服",
    exploreWords: ["凉快", "很舒服"], reasons: ["很凉快", "很舒服", "不冷也不热", "很漂亮"], answer: "秋天很凉快，不冷也不热，很舒服。",
    demo: { 很凉快: "我最喜欢秋天，因为秋天很凉快。", 很舒服: "我最喜欢秋天，因为秋天很舒服。", 不冷也不热: "我最喜欢秋天，因为秋天不冷也不热。", 很漂亮: "我最喜欢秋天，因为秋天很漂亮。" },
  },
  {
    key: "winter", name: "冬天", icon: "❄️", sky: "🌨️", scene: "⛄　🎿　❄️", weather: "很冷", action: "下雪 / 滑雪",
    exploreWords: ["很冷", "下雪", "滑雪"], reasons: ["很冷", "下雪", "可以滑雪", "喜欢滑雪"], answer: "冬天很冷，会下雪，可以滑雪。",
    demo: { 很冷: "我最喜欢冬天，因为冬天很冷。", 下雪: "我最喜欢冬天，因为冬天下雪。", 可以滑雪: "我最喜欢冬天，因为冬天可以滑雪。", 喜欢滑雪: "我最喜欢冬天，因为我喜欢滑雪。" },
  },
];

const roundNames = ["四季探索", "天气和活动", "最喜欢的季节", "挑战 Agent", "回到南京大学"];
const round2Order = ["summer", "winter", "spring", "autumn"];
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const TTS_STORAGE_KEY = "chinese-teaching-agent.tts.v1";
const TTS_PREVIEW_TEXT = "大家好，我是今天的 Agent 助教。南京的秋天来了，我们一起看看天气发生了什么变化吧！";
const storedTtsSettings = loadStoredTtsSettings();
const ttsSettings = {
  voices: [],
  chineseVoices: [],
  voiceURI: storedTtsSettings.voiceURI || "",
  rate: normalizeRate(storedTtsSettings.rate),
  pitch: 1,
  volume: 1,
};
const state = {
  round: 0, round1: { selected: "", visited: [] }, round2: { index: 0, completed: [], hint: 0, answered: false, feedback: "" },
  votes: { spring: 0, summer: 0, autumn: 0, winter: 0 }, voteHistory: [], voteResult: false, reason: "",
  round4: { challenged: false, hint: 0, success: false, feedback: "" }, final: { hint: 0, success: false, feedback: "" },
  voice: { context: "", status: "", transcript: "" },
};

const stage = document.querySelector("#game-stage");
const agentPanel = document.querySelector("#agent-panel");
const agentMessage = document.querySelector("#agent-message");
const agentStatus = document.querySelector("#agent-status");
const agentStateIcon = document.querySelector("#agent-state-icon");
const agentSpeaker = document.querySelector("#agent-speaker");
const nextButton = document.querySelector("#next-round");
const previousButton = document.querySelector("#previous-round");
const roundLabel = document.querySelector("#round-label");
const roundName = document.querySelector("#round-name");
const progressFill = document.querySelector("#progress-fill");
const progressDots = document.querySelector("#progress-dots");
const teacherCue = document.querySelector("#teacher-cue");
const liveRegion = document.querySelector("#live-region");
let recognition = null;
let speechRunId = 0;
let voiceSettingsDialog = null;

function seasonByKey(key) { return seasons.find((season) => season.key === key); }
function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}
function announce(message) { liveRegion.textContent = ""; window.setTimeout(() => { liveRegion.textContent = message; }, 30); }

function normalizeRate(value) {
  const rate = Number(value);
  return Number.isFinite(rate) ? Math.min(1.1, Math.max(0.75, rate)) : 0.9;
}

function loadStoredTtsSettings() {
  try {
    return JSON.parse(window.localStorage.getItem(TTS_STORAGE_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function saveTtsSettings() {
  try {
    window.localStorage.setItem(TTS_STORAGE_KEY, JSON.stringify({ voiceURI: ttsSettings.voiceURI, rate: ttsSettings.rate }));
  } catch {
    // The game remains usable when storage is disabled (for example in private browsing).
  }
}

function chineseVoiceScore(voice) {
  const lang = (voice.lang || "").toLowerCase();
  const name = (voice.name || "").toLowerCase();
  let score = 0;
  if (lang === "zh-cn") score += 120;
  else if (lang.startsWith("zh-hans")) score += 115;
  else if (lang === "zh-sg") score += 108;
  else if (lang.startsWith("zh")) score += 90;
  if (/mandarin|普通话|普通話|国语|國語/.test(name)) score += 35;
  if (/premium|enhanced|natural|neural/.test(name)) score += 25;
  if (voice.localService) score += 3;
  return score;
}

function isChineseVoice(voice) {
  const lang = (voice.lang || "").toLowerCase();
  const name = (voice.name || "").toLowerCase();
  return lang.startsWith("zh") || /mandarin|普通话|普通話|国语|國語|chinese|中文/.test(name);
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) {
    updateVoiceSettingsUI();
    return;
  }
  ttsSettings.voices = window.speechSynthesis.getVoices();
  ttsSettings.chineseVoices = ttsSettings.voices
    .filter(isChineseVoice)
    .sort((a, b) => chineseVoiceScore(b) - chineseVoiceScore(a) || a.name.localeCompare(b.name, "zh-CN"));

  // Some browsers return an empty list on first load and populate it later via voiceschanged.
  // Keep the saved URI intact until a real voice list is available.
  if (!ttsSettings.voices.length) {
    updateVoiceSettingsUI();
    return;
  }
  const savedVoiceExists = ttsSettings.chineseVoices.some((voice) => voice.voiceURI === ttsSettings.voiceURI);
  if (!savedVoiceExists && ttsSettings.chineseVoices.length) {
    ttsSettings.voiceURI = ttsSettings.chineseVoices[0].voiceURI;
    saveTtsSettings();
  }
  updateVoiceSettingsUI();
}

function selectedChineseVoice() {
  return ttsSettings.chineseVoices.find((voice) => voice.voiceURI === ttsSettings.voiceURI) || ttsSettings.chineseVoices[0] || null;
}

function speechSegments(text) {
  const cleanText = String(text || "").replace(/\s+/g, " ").trim();
  if (!cleanText) return [];
  return cleanText.match(/[^。！？；]+[。！？；]?/g)?.map((segment) => segment.trim()).filter(Boolean) || [cleanText];
}

function createUtterance(text, runId, isLast) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = selectedChineseVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "zh-CN";
  } else {
    utterance.lang = "zh-CN";
  }
  utterance.rate = ttsSettings.rate;
  utterance.pitch = ttsSettings.pitch;
  utterance.volume = ttsSettings.volume;
  utterance.onstart = () => {
    if (runId === speechRunId) agentSpeaker.classList.add("is-speaking");
  };
  utterance.onend = () => {
    if (isLast && runId === speechRunId) agentSpeaker.classList.remove("is-speaking");
  };
  utterance.onerror = () => {
    if (runId === speechRunId) agentSpeaker.classList.remove("is-speaking");
  };
  return utterance;
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const segments = speechSegments(text);
  if (!segments.length) return;
  window.speechSynthesis.cancel();
  const runId = ++speechRunId;
  segments.forEach((segment, index) => {
    window.speechSynthesis.speak(createUtterance(segment, runId, index === segments.length - 1));
  });
}

function voiceOptionLabel(voice) {
  const service = voice.localService ? "本机" : "在线";
  return `${voice.name} · ${voice.lang || "中文"} · ${service}`;
}

function updateVoiceSettingsUI() {
  if (!voiceSettingsDialog) return;
  const select = voiceSettingsDialog.querySelector("#agent-voice-select");
  const status = voiceSettingsDialog.querySelector("#agent-voice-status");
  const rateInput = voiceSettingsDialog.querySelector("#agent-rate");
  const rateValue = voiceSettingsDialog.querySelector("#agent-rate-value");
  if (!select || !status || !rateInput || !rateValue) return;

  if (!("speechSynthesis" in window)) {
    select.innerHTML = '<option value="">当前浏览器不支持 SpeechSynthesis</option>';
    select.disabled = true;
    status.textContent = "这个浏览器不能播放合成语音，课堂其他功能不受影响。";
  } else if (!ttsSettings.voices.length) {
    select.innerHTML = '<option value="">正在读取浏览器声音……</option>';
    select.disabled = true;
    status.textContent = "声音可能会在页面打开后稍晚出现。";
  } else if (!ttsSettings.chineseVoices.length) {
    select.innerHTML = '<option value="">没有发现中文声音</option>';
    select.disabled = true;
    status.textContent = `浏览器共有 ${ttsSettings.voices.length} 个声音，但没有中文普通话声线。`;
  } else {
    select.disabled = false;
    select.innerHTML = ttsSettings.chineseVoices.map((voice) => `<option value="${escapeHtml(voice.voiceURI)}" ${voice.voiceURI === ttsSettings.voiceURI ? "selected" : ""}>${escapeHtml(voiceOptionLabel(voice))}</option>`).join("");
    const current = selectedChineseVoice();
    status.textContent = `发现 ${ttsSettings.chineseVoices.length} 个中文声音。当前：${current ? voiceOptionLabel(current) : "浏览器默认"}`;
  }
  rateInput.value = String(ttsSettings.rate);
  rateValue.textContent = `${ttsSettings.rate.toFixed(2)}×`;
}

function createVoiceSettings() {
  const audioActions = document.createElement("div");
  audioActions.className = "agent-audio-actions";
  agentSpeaker.parentNode.insertBefore(audioActions, agentSpeaker);
  audioActions.append(agentSpeaker);

  const settingsButton = document.createElement("button");
  settingsButton.className = "voice-settings-trigger";
  settingsButton.type = "button";
  settingsButton.setAttribute("aria-label", "Agent 声音设置和试听");
  settingsButton.title = "声音设置";
  settingsButton.textContent = "声音设置";
  audioActions.append(settingsButton);

  voiceSettingsDialog = document.createElement("dialog");
  voiceSettingsDialog.className = "voice-settings-dialog";
  voiceSettingsDialog.setAttribute("aria-labelledby", "voice-settings-title");
  voiceSettingsDialog.innerHTML = `<div class="voice-settings-card">
    <div class="voice-settings-heading"><div><p class="voice-settings-kicker">Agent助教</p><h2 id="voice-settings-title">声音设置与试听</h2></div><button class="voice-settings-close" type="button" aria-label="关闭声音设置">×</button></div>
    <label class="voice-field" for="agent-voice-select"><span>中文声音</span><select id="agent-voice-select"></select></label>
    <p class="voice-settings-status" id="agent-voice-status" role="status">正在读取浏览器声音……</p>
    <label class="voice-field voice-rate" for="agent-rate"><span>语速 <output id="agent-rate-value">${ttsSettings.rate.toFixed(2)}×</output></span><input id="agent-rate" type="range" min="0.75" max="1.10" step="0.05" value="${ttsSettings.rate}" /></label>
    <div class="voice-preview"><small>试听文本</small><p>${TTS_PREVIEW_TEXT}</p></div>
    <div class="voice-settings-actions"><button class="button button-quiet" id="refresh-agent-voices" type="button">重新读取声音</button><button class="button button-secondary" id="preview-agent-voice" type="button">🔊 试听</button></div>
    <p class="voice-settings-note">选择和语速会自动保存在这个浏览器中。</p>
  </div>`;
  document.body.append(voiceSettingsDialog);

  settingsButton.addEventListener("click", () => {
    refreshVoices();
    if (typeof voiceSettingsDialog.showModal === "function") voiceSettingsDialog.showModal();
    else voiceSettingsDialog.setAttribute("open", "");
  });
  voiceSettingsDialog.querySelector(".voice-settings-close").addEventListener("click", () => voiceSettingsDialog.close());
  voiceSettingsDialog.addEventListener("click", (event) => {
    if (event.target === voiceSettingsDialog) voiceSettingsDialog.close();
  });
  voiceSettingsDialog.querySelector("#agent-voice-select").addEventListener("change", (event) => {
    ttsSettings.voiceURI = event.target.value;
    saveTtsSettings();
    updateVoiceSettingsUI();
  });
  voiceSettingsDialog.querySelector("#agent-rate").addEventListener("input", (event) => {
    ttsSettings.rate = normalizeRate(event.target.value);
    saveTtsSettings();
    updateVoiceSettingsUI();
  });
  voiceSettingsDialog.querySelector("#refresh-agent-voices").addEventListener("click", refreshVoices);
  voiceSettingsDialog.querySelector("#preview-agent-voice").addEventListener("click", () => speak(TTS_PREVIEW_TEXT));

  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
  }
  refreshVoices();
}
function setAgent(message, status = "thinking") {
  const states = { thinking: ["正在想", "💭"], speaking: ["正在说", "🔊"], hint: ["给提示", "🔎"], listening: ["正在听", "🎤"], corrected: ["被纠正了", "😅"], success: ["一起成功", "✨"] };
  const [label, icon] = states[status] || states.thinking;
  agentPanel.dataset.state = status; agentStatus.textContent = label; agentStateIcon.textContent = icon; agentMessage.textContent = message; agentSpeaker.dataset.speak = message;
}
function speechButton(text, label = "朗读这句话") { return `<button class="icon-button js-speak" type="button" data-speak="${escapeHtml(text)}" aria-label="${label}" title="朗读">🔊</button>`; }
function voiceButton(context) { return `<button class="button button-mic" type="button" data-action="voice" data-context="${context}">🎤 语音回答</button>`; }
function voiceResult(context) {
  if (state.voice.context !== context || (!state.voice.status && !state.voice.transcript)) return "";
  const message = state.voice.transcript ? `我听到：${escapeHtml(state.voice.transcript)}` : escapeHtml(state.voice.status);
  return `<div class="voice-result" role="status"><span>🎤</span><strong>${message}</strong></div>`;
}
function teacherResponseControls(prefix) {
  return `<div class="teacher-actions" aria-label="老师判断学生回答">
    <button class="button button-success button-large" type="button" data-action="${prefix}-correct">✓ 回答正确</button>
    <button class="button button-secondary button-large" type="button" data-action="${prefix}-hint">给一点提示</button>
    <button class="button button-quiet" type="button" data-action="${prefix}-retry">再试一次</button>
    <button class="button button-quiet" type="button" data-action="${prefix}-answer">看看答案</button>
  </div>`;
}
function backupInput(id, placeholder = "老师可在这里输入学生的话") {
  return `<details class="backup-entry"><summary>⌨️ 备用：文字输入</summary><form id="${id}" class="backup-form">
    <label class="sr-only" for="${id}-input">${placeholder}</label><input id="${id}-input" class="student-input" autocomplete="off" placeholder="${placeholder}" />
    <button class="button button-quiet" type="submit">请 Agent 看看</button></form></details>`;
}
function seasonScene(season, compact = false) {
  return `<article class="season-scene scene-${season.key} ${compact ? "is-compact" : ""}"><div class="scene-sky" aria-hidden="true">${season.sky}</div>
    <div class="scene-landscape" aria-hidden="true">${season.scene}</div><div class="scene-caption"><span>${season.icon}</span><strong>${season.name}</strong></div></article>`;
}

function renderRound1() {
  const selected = seasonByKey(state.round1.selected); const complete = state.round1.visited.length === seasons.length;
  setAgent(selected ? `${selected.name}。${selected.exploreWords.join("，")}。` : "我们先看看一年有哪几个季节。", selected ? "speaking" : "thinking");
  teacherCue.textContent = complete ? "四季都看过了，请学生一起说四个季节。" : "老师依次点四季，学生看图说名称。"; nextButton.hidden = !complete;
  stage.innerHTML = `<div class="round-enter"><p class="section-kicker">Round 1 · 老师 → 全班</p><h2 class="round-title">一起走进四季</h2>
    <p class="round-prompt">一年有哪几个季节？老师点一张，大家一起说。</p><div class="explore-layout"><div class="season-selector" aria-label="选择季节">
    ${seasons.map((season) => `<button class="season-tab ${state.round1.selected === season.key ? "is-selected" : ""} ${state.round1.visited.includes(season.key) ? "is-visited" : ""}" type="button" data-explore="${season.key}"><span aria-hidden="true">${season.icon}</span><strong>${season.name}</strong><small>${state.round1.visited.includes(season.key) ? "✓ 看过了" : "点一点"}</small></button>`).join("")}</div>
    <div class="explore-focus">${selected ? `${seasonScene(selected)}<div class="word-ribbon">${selected.exploreWords.map((word) => `<span>${word}</span>`).join("")}</div>` : `<div class="season-placeholder"><span>春</span><span>夏</span><span>秋</span><span>冬</span><p>选一个季节</p></div>`}</div></div>
    ${complete ? `<div class="round-complete">✓ 春天、夏天、秋天、冬天，我们都看过了！</div>` : ""}</div>`;
}

function currentRound2Season() { return seasonByKey(round2Order[state.round2.index]); }
function renderRound2() {
  const season = currentRound2Season(); const allComplete = state.round2.completed.length === round2Order.length; const answered = state.round2.answered;
  const question = `${season.name}天气怎么样？可以做什么？`;
  setAgent(allComplete ? "四个季节都说对了！" : question, allComplete || answered ? "success" : state.round2.hint ? "hint" : "thinking");
  teacherCue.textContent = allComplete ? "天气和活动都说过了，进入全班投票。" : "学生先口头回答，老师用大按钮判断。"; nextButton.hidden = !allComplete;
  stage.innerHTML = `<div class="round-enter"><p class="section-kicker">Round 2 · Agent → 学生 → 老师</p><div class="round-heading-row"><div><h2 class="round-title">天气和活动</h2><p class="round-prompt">第 ${Math.min(state.round2.index + 1, 4)} 个季节 / 4</p></div><div class="mini-score">${state.round2.completed.map(() => "●").join("")}${"○".repeat(4 - state.round2.completed.length)}</div></div>
  ${allComplete ? `<div class="celebration-panel"><span aria-hidden="true">🌸 ☀️ 🍂 ❄️</span><h3>天气和活动，都说对了！</h3><p>现在说说：你最喜欢什么季节？</p></div>` : `<div class="question-arena">${seasonScene(season, true)}<div class="oral-card"><span class="speaker-label">🤖 Agent问</span><h3>${question}</h3><div class="action-row">${speechButton(question)}${voiceButton("round2")}</div>${voiceResult("round2")}
    ${state.round2.hint > 0 ? `<div class="adaptive-hint"><small>可以用</small><div>${season.exploreWords.map((word) => `<span>${word}</span>`).join("")}</div></div>` : ""}${state.round2.hint > 1 ? `<div class="sentence-frame">${season.name} ______。${season.name}可以 ______。</div>` : ""}
    ${state.round2.feedback ? `<div class="feedback ${answered ? "success" : "gentle"}">${state.round2.feedback}</div>` : ""}</div></div>
    ${answered ? `<div class="answer-strip"><strong>${season.answer}</strong>${speechButton(season.answer)}<button class="button button-primary button-large" type="button" data-action="round2-next">${state.round2.index === 3 ? "完成这一关" : "下一个季节 →"}</button></div>` : `${teacherResponseControls("round2")}${backupInput("round2-backup")}`}`}</div>`;
}

function voteWinners() { const max = Math.max(...Object.values(state.votes)); return max === 0 ? [] : seasons.filter((season) => state.votes[season.key] === max); }
function renderRound3() {
  const total = Object.values(state.votes).reduce((sum, value) => sum + value, 0); const max = Math.max(1, ...Object.values(state.votes)); const winners = voteWinners(); const active = winners[0]; const names = winners.map((season) => season.name).join("和");
  setAgent(state.voteResult && active ? `大家最喜欢${names}！为什么？` : "你最喜欢什么季节？", state.reason ? "hint" : state.voteResult ? "speaking" : "thinking");
  teacherCue.textContent = state.voteResult ? "点一个动态提示，但让学生自己把句子说完。" : "学生口头选择，老师点卡片记一票。"; nextButton.hidden = !state.voteResult || !active;
  stage.innerHTML = `<div class="round-enter"><p class="section-kicker">Round 3 · 学生 → 全班 → Agent</p><h2 class="round-title">你最喜欢什么季节？</h2>
    <div class="vote-season-grid" aria-label="季节投票">${seasons.map((season) => `<button class="vote-season scene-${season.key}" type="button" data-vote="${season.key}" style="--vote-height:${(state.votes[season.key] / max) * 72}%"><span class="vote-icon" aria-hidden="true">${season.icon}</span><strong>${season.name}</strong><span class="vote-count">${state.votes[season.key]}</span></button>`).join("")}</div>
    <div class="vote-control-row"><strong>全班：${total} 票</strong><div class="action-row"><button class="button button-quiet" type="button" data-action="vote-undo" ${state.voteHistory.length ? "" : "disabled"}>撤销上一票</button><button class="button button-quiet" type="button" data-action="vote-reset" ${total ? "" : "disabled"}>重新投票</button><button class="button button-primary button-large" type="button" data-action="vote-result" ${total ? "" : "disabled"}>看看大家最喜欢什么</button></div></div>
    ${state.voteResult && active ? `<section class="reason-workbench"><div><span class="speaker-label">🤖 Agent再问</span><h3>大家最喜欢${names}！为什么？</h3></div><div class="reason-layout"><div class="sentence-scaffold">我最喜欢${active.name}，因为 <span>______</span>。</div><div class="reason-tools" aria-label="${active.name}的语言提示">${active.reasons.map((reason) => `<button class="reason-chip ${state.reason === reason ? "is-selected" : ""}" type="button" data-reason="${escapeHtml(reason)}" data-season="${active.key}">${reason}</button>`).join("")}</div></div>
      ${state.reason ? `<div class="word-coach"><span>给学生的词：</span><strong>${escapeHtml(state.reason)}</strong><button class="button button-secondary" type="button" data-action="reason-demo" data-season="${active.key}" data-reason="${escapeHtml(state.reason)}">🔊 听示范句</button></div>` : `<p class="quiet-note">选一个词作提示，学生自己说完整句。</p>`}</section>` : ""}</div>`;
}

function changeTimeline() { return `<div class="change-timeline"><article class="change-scene summer-change"><span class="time-tag">以前</span><div class="change-visual">☀️</div><h3>夏天</h3><p>天气很热</p></article><div class="timeline-arrow" aria-hidden="true"><span>↓</span><small>现在</small></div><article class="change-scene autumn-change"><span class="time-tag">10月20日 · 南京大学</span><div class="change-visual">🍂</div><h3>秋天</h3><p>天气凉快</p></article></div>`; }
function renderRound4() {
  const success = state.round4.success;
  setAgent(success ? "你们发现了！我学会了！" : state.round4.challenged ? "以前是夏天，现在不一样。谁来帮帮我？" : "我最喜欢夏天！你们听听我说得怎么样。", success ? "corrected" : state.round4.challenged ? "hint" : "speaking");
  teacherCue.textContent = success ? "请全班一起读两个有“了”的句子。" : state.round4.challenged ? "学生先纠正 Agent，老师再点判断按钮。" : "先听 Agent，再让全班挑战它。"; nextButton.hidden = !success;
  stage.innerHTML = `<div class="round-enter"><p class="section-kicker">Round 4 · 全班 → Agent</p><h2 class="round-title">挑战 Agent</h2><div class="agent-preference"><span aria-hidden="true">🤖 ☀️</span><strong>我最喜欢夏天！</strong></div>${changeTimeline()}
    <div class="agent-wrong-lines"><div><span>🤖</span><strong>“现在是秋天。”</strong>${speechButton("现在是秋天。")}</div><div><span>🤖</span><strong>“现在天气很凉快。”</strong>${speechButton("现在天气很凉快。")}</div></div>
    ${!state.round4.challenged && !success ? `<div class="center-action"><button class="button button-challenge" type="button" data-action="challenge-start">⚡ 挑战 Agent</button><p>Agent 说得可以吗？还能说得更好吗？</p></div>` : ""}
    ${state.round4.challenged && !success ? `<div class="challenge-zone"><div class="agent-hint-pair"><p>以前是夏天，现在不一样。</p><p>以前很热，现在不一样。</p></div>${state.round4.hint > 0 ? `<div class="double-frame"><div>现在是 <span>______</span> 了。</div><div>天气 <span>______</span> 了。</div></div>` : ""}${state.round4.feedback ? `<div class="feedback gentle">${state.round4.feedback}</div>` : ""}<div class="action-row voice-row">${voiceButton("round4")}${speechButton("以前是夏天，现在不一样。以前很热，现在不一样。", "朗读提示")}</div>${voiceResult("round4")}${teacherResponseControls("round4")}${backupInput("round4-backup", "例如：现在是秋天了，天气凉快了")}</div>` : ""}
    ${success ? `<div class="correction-reveal"><span class="corrected-label">全班纠正 Agent</span><p>现在是秋天<span class="le-pop">了</span></p><p>天气凉快<span class="le-pop">了</span></p><div class="simple-rule">“了”告诉我们：现在和以前不一样。</div>${speechButton("现在是秋天了。天气凉快了。")}</div>` : ""}</div>`;
}

function renderFinal() {
  const success = state.final.success;
  setAgent(success ? "很好！南京的秋天来了！" : "现在南京怎么样？", success ? "success" : state.final.hint ? "hint" : "thinking");
  teacherCue.textContent = success ? "请全班一起读今天真正说过的句子。" : "学生先口头回答；老师可提示，也可直接判断正确。"; nextButton.hidden = true;
  stage.innerHTML = `<div class="round-enter"><p class="section-kicker">Final Challenge · 老师 + 学生 + Agent</p><h2 class="round-title">回到南京大学</h2><div class="location-card"><span>📍 南京大学</span><strong>10月20日</strong></div>
    <div class="nanjing-change"><article><span class="time-tag">九月</span><div aria-hidden="true">☀️</div><strong>南京很热</strong></article><div aria-hidden="true">→</div><article><span class="time-tag">现在</span><div aria-hidden="true">🍂</div><strong>${success ? "秋天 · 凉快" : "南京怎么样？"}</strong></article></div>
    ${!success ? `<section class="final-response"><h3>🤖 现在南京怎么样？</h3>${state.final.hint > 0 ? `<div class="final-hints"><p>现在是 <span>______</span> 了。</p>${state.final.hint > 1 ? `<p>天气 <span>______</span> 了。</p>` : ""}</div>` : ""}${state.final.feedback ? `<div class="feedback gentle">${state.final.feedback}</div>` : ""}<div class="action-row voice-row">${voiceButton("final")}${speechButton("现在南京怎么样？")}</div>${voiceResult("final")}${teacherResponseControls("final")}${backupInput("final-backup", "例如：现在是秋天了，天气凉快了")}</section>` : `<section class="recap" aria-label="今天说过的句子"><h3 class="recap-title">今天我们和 Agent 一起说过：</h3><ul class="recap-list"><li style="--item-index:0">✓ 我最喜欢秋天。</li><li style="--item-index:1">✓ 秋天不冷也不热，很舒服。</li><li style="--item-index:2">✓ 我最喜欢夏天，因为我喜欢游泳。</li><li style="--item-index:3">✓ 现在是秋天了。</li><li style="--item-index:4">✓ 天气凉快了。</li></ul><div class="final-banner">🍂 南京的秋天来了！ ${speechButton("南京的秋天来了！")}</div></section>`}</div>`;
}

function renderProgress() {
  roundLabel.textContent = `Round ${state.round + 1} / 5`; roundName.textContent = roundNames[state.round]; progressFill.style.width = `${((state.round + 1) / 5) * 100}%`;
  progressDots.innerHTML = roundNames.map((_, index) => `<span class="progress-dot ${index === state.round ? "is-active" : ""} ${index < state.round ? "is-done" : ""}"></span>`).join(""); previousButton.disabled = state.round === 0;
}
function render() { renderProgress(); [renderRound1, renderRound2, renderRound3, renderRound4, renderFinal][state.round](); stage.scrollTop = 0; }
function completeRound2(message) { state.round2.answered = true; state.round2.feedback = message; }
function completeRound4() { state.round4.success = true; state.round4.feedback = ""; speak("对！现在是秋天了。天气凉快了。"); }
function completeFinal() { state.final.success = true; state.final.feedback = ""; speak("很好！现在是秋天了。天气凉快了。"); }
function checkBackup(context, raw) {
  const answer = raw.replace(/[\s，。！？,.!?]/g, "");
  if (context === "round2") {
    const season = currentRound2Season(); const keywords = [season.weather.replace("很", ""), ...season.action.replace(/可以|很/g, "").split(" / ")];
    if (keywords.some((word) => answer.includes(word))) completeRound2("听懂了！老师也可以点“回答正确”。");
    else { state.round2.hint = Math.max(1, state.round2.hint); state.round2.feedback = "再试一次。看看图片，天气怎么样？可以做什么？"; }
  }
  if (context === "round4") {
    if (answer.includes("秋天了") && answer.includes("凉快了")) completeRound4();
    else { state.round4.hint = 1; state.round4.feedback = "已经很接近了。两个句子最后都有什么？"; }
  }
  if (context === "final") {
    if (answer.includes("秋天了") && answer.includes("凉快了")) completeFinal();
    else { state.final.hint = Math.max(1, state.final.hint); state.final.feedback = "再说一次。先说季节，再说天气。"; }
  }
}
function startRecognition(context) {
  if (!Recognition) {
    state.voice = { context, transcript: "", status: "这个浏览器不能用语音回答。学生直接说，老师点“回答正确”就可以。" }; setAgent("我听不到也没关系，请老师来判断！", "hint"); render(); return;
  }
  if (recognition) recognition.abort(); recognition = new Recognition(); recognition.lang = "zh-CN"; recognition.interimResults = false; recognition.maxAlternatives = 1;
  state.voice = { context, transcript: "", status: "请说……" }; setAgent("我在听，请说！", "listening"); render();
  recognition.onresult = (event) => { state.voice = { context, transcript: event.results[0][0].transcript, status: "" }; render(); };
  recognition.onerror = () => { state.voice = { context, transcript: "", status: "没有听清。请直接说，老师来判断。" }; render(); };
  recognition.onend = () => { recognition = null; };
  try { recognition.start(); } catch { state.voice = { context, transcript: "", status: "语音没有开始。请直接说，老师来判断。" }; render(); }
}

stage.addEventListener("click", (event) => {
  const button = event.target.closest("button"); if (!button) return;
  if (button.matches(".js-speak")) { speak(button.dataset.speak || ""); return; }
  if (button.type === "submit") return;
  if (button.dataset.explore) { const key = button.dataset.explore; state.round1.selected = key; if (!state.round1.visited.includes(key)) state.round1.visited.push(key); speak(seasonByKey(key).name); }
  if (button.dataset.vote) { const key = button.dataset.vote; state.votes[key] += 1; state.voteHistory.push(key); state.voteResult = false; state.reason = ""; announce(`${seasonByKey(key).name}，现在${state.votes[key]}票`); }
  if (button.dataset.reason) state.reason = button.dataset.reason;
  const action = button.dataset.action;
  if (action === "voice") { startRecognition(button.dataset.context); return; }
  if (action === "round2-correct") completeRound2("对！天气和活动都说对了！");
  if (action === "round2-hint") { state.round2.hint = Math.min(2, state.round2.hint + 1); state.round2.feedback = "看看图片，可以用这些词。"; }
  if (action === "round2-retry") state.round2.feedback = `再说一次：${currentRound2Season().name}……`;
  if (action === "round2-answer") completeRound2(currentRound2Season().answer);
  if (action === "round2-next") { const key = round2Order[state.round2.index]; if (!state.round2.completed.includes(key)) state.round2.completed.push(key); if (state.round2.index < 3) state.round2.index += 1; state.round2.answered = false; state.round2.hint = 0; state.round2.feedback = ""; state.voice = { context: "", status: "", transcript: "" }; }
  if (action === "vote-undo" && state.voteHistory.length) { const key = state.voteHistory.pop(); state.votes[key] = Math.max(0, state.votes[key] - 1); state.voteResult = false; state.reason = ""; }
  if (action === "vote-reset") { state.votes = { spring: 0, summer: 0, autumn: 0, winter: 0 }; state.voteHistory = []; state.voteResult = false; state.reason = ""; }
  if (action === "vote-result") state.voteResult = true;
  if (action === "reason-demo") { const season = seasonByKey(button.dataset.season); speak(season.demo[button.dataset.reason]); }
  if (action === "challenge-start") state.round4.challenged = true;
  if (action === "round4-correct" || action === "round4-answer") completeRound4();
  if (action === "round4-hint") { state.round4.hint = 1; state.round4.feedback = "两个句子最后都要加一个词。"; }
  if (action === "round4-retry") state.round4.feedback = "再试一次：现在是秋天……天气凉快……";
  if (action === "final-correct" || action === "final-answer") completeFinal();
  if (action === "final-hint") { state.final.hint = Math.min(2, state.final.hint + 1); state.final.feedback = state.final.hint === 1 ? "先说现在是什么季节。" : "再说现在天气怎么样。"; }
  if (action === "final-retry") state.final.feedback = "再试一次。先说季节，再说天气。";
  render();
});

stage.addEventListener("submit", (event) => {
  event.preventDefault(); const form = event.target; const value = form.querySelector("input")?.value || ""; if (!value.trim()) return;
  if (form.id === "round2-backup") checkBackup("round2", value); if (form.id === "round4-backup") checkBackup("round4", value); if (form.id === "final-backup") checkBackup("final", value); render();
});
agentSpeaker.addEventListener("click", () => speak(agentSpeaker.dataset.speak || agentMessage.textContent));
nextButton.addEventListener("click", () => { if (state.round < 4) { state.round += 1; state.voice = { context: "", status: "", transcript: "" }; window.speechSynthesis?.cancel(); render(); } });
previousButton.addEventListener("click", () => { if (state.round > 0) { state.round -= 1; state.voice = { context: "", status: "", transcript: "" }; window.speechSynthesis?.cancel(); render(); } });
createVoiceSettings();
render();
