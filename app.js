const SKILLS = [
  ["Acrobacia", "AGI"],
  ["Adestramento", "PRE"],
  ["Artes", "PRE"],
  ["Atletismo", "FOR"],
  ["Atualidades", "INT"],
  ["Ciências", "INT"],
  ["Crime", "AGI"],
  ["Diplomacia", "PRE"],
  ["Enganação", "PRE"],
  ["Fortitude", "VIG"],
  ["Furtividade", "AGI"],
  ["Iniciativa", "AGI"],
  ["Intimidação", "PRE"],
  ["Intuição", "PRE"],
  ["Investigação", "INT"],
  ["Luta", "FOR"],
  ["Medicina", "INT"],
  ["Ocultismo", "INT"],
  ["Percepção", "PRE"],
  ["Pilotagem", "AGI"],
  ["Pontaria", "AGI"],
  ["Profissão", "INT"],
  ["Reflexos", "AGI"],
  ["Religião", "PRE"],
  ["Sobrevivência", "INT"],
  ["Tática", "INT"],
  ["Tecnologia", "INT"],
  ["Vontade", "PRE"]
];

const ATTR_IDS = { AGI: "agi", FOR: "for", INT: "int", PRE: "pre", VIG: "vig" };
const STORAGE_KEY = "op-ficha-agente";

function num(id, fallback = 0) {
  const el = document.getElementById(id);
  const n = Number(el && el.value);
  return Number.isFinite(n) ? n : fallback;
}

function skillId(name) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
}

function renderSkills() {
  const root = document.getElementById("skills");
  root.innerHTML = SKILLS.map(([name, attr]) => {
    const id = skillId(name);
    return `
      <div class="skill" data-attr="${attr}">
        <div class="name">${name} <em>(${attr})</em></div>
        <output id="dados-${id}">1</output>
        <output id="bonus-${id}">0</output>
        <input type="number" id="treino-${id}" min="0" max="15" step="5" value="0" aria-label="Treino ${name}" />
        <input type="number" id="outros-${id}" min="-10" max="20" value="0" aria-label="Outros ${name}" />
      </div>`;
  }).join("");
}

function renderAttacks() {
  const root = document.getElementById("attacks");
  root.innerHTML = Array.from({ length: 4 }, (_, i) => `
    <div class="atk">
      <input type="text" id="arma-${i}" maxlength="32" />
      <input type="text" id="teste-${i}" maxlength="20" />
      <input type="text" id="dano-${i}" maxlength="20" />
      <input type="text" id="crit-${i}" maxlength="48" />
    </div>`).join("");
}

function treinoMaxPorNex(nex) {
  if (nex >= 70) return 15;
  if (nex >= 35) return 10;
  return 5;
}

function recalc() {
  const agi = num("agi", 1);
  const nex = Math.max(0, Math.min(99, num("nex", 5)));
  document.getElementById("pe-rodada").textContent = String(Math.max(1, Math.floor(nex / 5)));
  document.getElementById("defesa").value = String(
    10 + agi + num("def-equip") + num("def-outros")
  );

  const attrs = {
    AGI: agi,
    FOR: num("for", 1),
    INT: num("int", 1),
    PRE: num("pre", 1),
    VIG: num("vig", 1)
  };
  const cap = treinoMaxPorNex(nex);

  SKILLS.forEach(([name, attr]) => {
    const id = skillId(name);
    const treinoEl = document.getElementById(`treino-${id}`);
    let treino = Number(treinoEl.value) || 0;
    if (treino > cap) {
      treino = cap;
      treinoEl.value = String(cap);
    }
    document.getElementById(`dados-${id}`).value = String(attrs[attr] ?? 1);
    document.getElementById(`bonus-${id}`).value = String(treino + (Number(document.getElementById(`outros-${id}`).value) || 0));
  });

  save();
}

function collect() {
  const data = {};
  document.querySelectorAll("#ficha input").forEach((el) => {
    if (el.id) data[el.id] = el.value;
  });
  return data;
}

function apply(data) {
  Object.entries(data || {}).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
  });
  recalc();
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(collect())); } catch (_) {}
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) apply(JSON.parse(raw));
  } catch (_) {}
}

function resetSheet() {
  document.querySelectorAll("#ficha input").forEach((el) => {
    if (el.type === "number") {
      if (["agi", "for", "int", "pre", "vig"].includes(el.id)) el.value = "1";
      else if (el.id === "nex") el.value = "5";
      else if (el.id === "desl") el.value = "9";
      else if (el.id === "pv" || el.id === "pv-max") el.value = "8";
      else if (el.id === "pe" || el.id === "pe-max") el.value = "4";
      else if (el.id === "san" || el.id === "san-max") el.value = "12";
      else el.value = "0";
    } else {
      el.value = "";
    }
  });
  recalc();
}

function fillSample() {
  apply({
    personagem: "Agente Silva",
    jogador: "Você",
    origem: "Acadêmico",
    classe: "Especialista",
    agi: "2",
    for: "1",
    int: "3",
    pre: "2",
    vig: "1",
    nex: "20",
    desl: "9",
    pv: "16",
    "pv-max": "16",
    pe: "12",
    "pe-max": "12",
    san: "16",
    "san-max": "16",
    "def-equip": "1",
    "def-outros": "0",
    protecao: "Colete leve",
    resistencias: "Mental +5",
    "treino-investigacao": "5",
    "treino-ocultismo": "5",
    "treino-percepcao": "5",
    "treino-tecnologia": "5",
    "arma-0": "Pistola",
    "teste-0": "Pontaria",
    "dano-0": "1d12",
    "crit-0": "x3 / 18m / Balístico"
  });
}

async function downloadPng() {
  const node = document.getElementById("ficha");
  await document.fonts.ready;
  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: "#f7f4ee",
    useCORS: true,
    logging: false
  });
  const link = document.createElement("a");
  const name = (document.getElementById("personagem").value || "ficha-agente")
    .toLowerCase()
    .replace(/\s+/g, "-");
  link.download = `${name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

renderSkills();
renderAttacks();
load();
recalc();

document.getElementById("ficha").addEventListener("input", recalc);
document.getElementById("btn-reset").addEventListener("click", resetSheet);
document.getElementById("btn-sample").addEventListener("click", fillSample);
document.getElementById("btn-download").addEventListener("click", downloadPng);
