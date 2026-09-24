(function(){

  // ============================================================
  // BANCOS DE DADOS
  // ============================================================

  // nomes convencionais de fantasia — curados para soarem familiares, sem exageros
  var firstNames = ["Kael","Elara","Dorian","Seraphine","Magnus","Isolde","Lucian","Aurelia","Roland","Mireille",
    "Thorian","Cassia","Alaric","Livia","Gideon","Wren","Corwin","Anwen","Silas","Maren",
    "Edric","Talia","Bastian","Ophelia","Ronan","Vesper","Cyrus","Nadia","Emeric","Sable",
    "Adrian","Selene","Marcus","Ivy","Caspian","Liora","Darian","Freya","Osric","Nova"];

  var surnames = ["Bosqueprata","Espinho Negro","Corvo d'Alva","Ferronoite","Vale Rúbrico","Torrevento","Solmorto",
    "Cravoescuro","Altamira","Duquesne","Ravenscar","Nogueira Sombria","Montenegro","Cintavermelha","Vasconcelos",
    "Brancasteiro","Veloscuro","Lâmina Fria","Carvalhosombra","Pontanegra","Sete-Ventos","Rosanoite","Aguadoescuro",
    "Ferreira das Trevas","Cinza-Real","Draconis","Silente","Fauston","Marés Negras","Duarte"];

  var archetypes = ["Caçador de Relíquias","Bruxo do Véu","Guardião Rúnico","Lâmina Carmesim","Oráculo Silencioso",
    "Mercenário Estelar","Necromante Errante","Paladino Caído","Ladina das Sombras","Xamã da Tempestade",
    "Arcanista Proibido","Inquisidor Sagrado","Feiticeira de Sangue","Andarilho do Vazio","Domador de Feras",
    "Menestrel Amaldiçoado","Cavaleiro Espectral","Alquimista Renegado"];

  var taglines = [
    "Carrega um segredo pesado demais para qualquer aliança.",
    "Não confia em ninguém que não sangre pela própria causa.",
    "Segue uma bússola que só aponta para o que foi perdido.",
    "Fala pouco, mas cada palavra pesa como um juramento.",
    "Nasceu sob um eclipse que ninguém ousa mencionar.",
    "Coleciona nomes de quem já não pode contar sua história.",
    "Nunca dorme duas noites sob o mesmo teto.",
    "Guarda uma dívida com algo que não é mais humano.",
    "Prefere o silêncio de uma cripta ao barulho de uma taverna.",
    "Ainda escuta a voz do que jurou nunca mais invocar."
  ];

  var attrDefs = [
    {key:"forca", label:"Força", icon:"⚔"},
    {key:"destreza", label:"Destreza", icon:"🗡"},
    {key:"constituicao", label:"Constituição", icon:"🛡"},
    {key:"inteligencia", label:"Inteligência", icon:"📖"},
    {key:"sabedoria", label:"Sabedoria", icon:"👁"},
    {key:"carisma", label:"Carisma", icon:"🎭"}
  ];

  var talentPool = [
    {name:"Golpe Sombrio", desc:"Ataques na penumbra causam dano adicional e ignoram parte da armadura inimiga."},
    {name:"Leitura de Runas", desc:"Decifra inscrições arcanas antigas e ativa mecanismos selados por magia."},
    {name:"Passo Silencioso", desc:"Move-se sem ruído por terrenos difíceis, evitando armadilhas e sentinelas."},
    {name:"Pacto de Sangue", desc:"Invoca um aliado espectral por um curto período, em troca de vitalidade própria."},
    {name:"Olhar Penetrante", desc:"Percebe mentiras e intenções ocultas na maioria das conversas."},
    {name:"Fôlego de Ferro", desc:"Resiste a venenos e exaustão por tempo muito além do normal."},
    {name:"Chama Roxa", desc:"Conjura fogo arcano que queima através de escudos mágicos comuns."},
    {name:"Toque Curador", desc:"Restaura ferimentos leves de aliados usando energia vital própria."},
    {name:"Sussurro dos Mortos", desc:"Conversa brevemente com espíritos recentes para obter pistas."},
    {name:"Fúria Carmesim", desc:"Em combate prolongado, seus golpes ganham força crescente e imprevisível."},
    {name:"Disfarce Perfeito", desc:"Assume outra identidade de forma convincente por horas seguidas."},
    {name:"Armadura Viva", desc:"Sua armadura se regenera lentamente, absorvendo parte de impactos críticos."},
    {name:"Convocação Menor", desc:"Chama uma criatura fiel para auxiliar em tarefas específicas."},
    {name:"Visão do Véu", desc:"Enxerga brevemente através de ilusões e portais dimensionais instáveis."},
    {name:"Palavra de Comando", desc:"Uma única palavra sua pode paralisar um inimigo despreparado por instantes."},
    {name:"Instinto de Caça", desc:"Rastreia qualquer criatura viva por dias, mesmo sem pistas visíveis."},
    {name:"Escudo de Ametista", desc:"Projeta uma barreira roxa translúcida que absorve o primeiro golpe recebido."},
    {name:"Voz da Tempestade", desc:"Comanda ventos e trovões em rajadas curtas durante confrontos abertos."}
  ];

  // ---- blocos para a história expandida (combinados em múltiplos parágrafos) ----

  var originPool = ["nas ruínas de um templo esquecido, entre pilares cobertos de musgo e símbolos apagados pelo tempo",
    "em uma vila à beira de um pântano amaldiçoado, onde poucos forasteiros ousam pernoitar",
    "sob o teto de uma ordem de caçadores hereges, escondida nas montanhas a oeste do reino",
    "entre os becos de uma capital tomada pela peste roxa, aprendendo a sobreviver antes de aprender a ler",
    "em uma caravana que cruzava desertos proibidos, negociando relíquias que ninguém deveria tocar",
    "dentro dos muros de uma academia arcana fechada há décadas, estudando textos que a maioria considera heresia",
    "em uma ilha que aparece apenas em noites de lua vermelha, cercada por um mar que sussurra nomes",
    "sob a tutela de um mestre que ninguém mais recorda, em uma torre isolada do resto do mundo"];

  var childhoodPool = ["Ainda criança, aprendeu que silêncio e observação valiam mais que qualquer arma",
    "Desde cedo foi ensinado a desconfiar de promessas fáceis e de estranhos gentis demais",
    "Cresceu ouvindo histórias de guerras antigas contadas por quem sobreviveu a elas",
    "Passou a infância entre livros proibidos e mapas de lugares que oficialmente não existem",
    "Foi criado por quem não era da própria família, e isso moldou sua lealdade peculiar",
    "Aprendeu ofícios distintos antes dos doze anos, sempre um passo à frente da fome"];

  var eventPool = ["testemunhou a queda de seu clã em uma única noite, sem tempo sequer para reagir",
    "fez um pacto que ainda cobra seu preço, sussurrado em sonhos que prefere não recordar",
    "sobreviveu a um ritual que deveria tê-lo matado, e desde então carrega uma marca que arde ao luar",
    "perdeu tudo em uma guerra que a história oficial decidiu esquecer",
    "encontrou um artefato que sussurra seu nome enquanto dorme, guardado hoje sob sete lacres",
    "foi banido por um crime que talvez não tenha cometido, mas nunca conseguiu provar o contrário",
    "seguiu um mapa incompleto que o trouxe até este exato instante, sem saber quem o desenhou",
    "viu algo além do véu que jamais conseguiu esquecer, e que ainda visita seus pesadelos"];

  var allyPool = ["Um único aliado sobreviveu àquele período, e essa lealdade nunca mais foi quebrada",
    "Fez inimigos poderosos ao longo do caminho, alguns dos quais ainda não desistiram de cobrar vingança",
    "Carrega uma dívida de honra com alguém que um dia recusou-se a explicar",
    "Perdeu contato com quem mais confiava, e parte da jornada é tentar reencontrar essa pessoa",
    "Formou um pequeno grupo de companheiros que confiam cegamente uns nos outros",
    "Aprendeu, da forma mais difícil, que confiança é algo que se concede em doses muito pequenas"];

  var goalPool = ["busca agora reverter o que foi feito, custe o que custar",
    "segue em frente apenas para entender o próprio destino",
    "quer provar que ainda é possível escolher o próprio caminho, mesmo depois de tudo",
    "caça respostas que talvez sejam piores que a ignorância",
    "protege um segredo que pode mudar o equilíbrio entre os reinos",
    "procura um lugar onde o passado não possa alcançá-lo",
    "tenta reunir os fragmentos de algo que foi despedaçado de propósito",
    "aceitou que talvez nunca tenha uma resposta, e decidiu seguir mesmo assim"];

  var quirkPool = ["Tem o hábito de contar em voz baixa antes de tomar qualquer decisão importante",
    "Guarda um objeto sem valor aparente como se fosse a coisa mais preciosa do mundo",
    "Evita espelhos, água parada e qualquer superfície que reflita demais",
    "Só aceita comida e bebida que tenha preparado com as próprias mãos",
    "Fala com os mortos como se ainda pudessem responder, por hábito mais do que por crença",
    "Recusa-se a dormir sem antes verificar três vezes todas as saídas do local"];

  // biblioteca de ícones de avatar (linhas simples, monocromáticas, coerentes com a paleta)
  var iconLibrary = {
    espada: '<path d="M50 12 L54 46 L50 88 L46 46 Z" /><path d="M32 46 L68 46" /><path d="M42 88 L58 88 L58 94 L42 94 Z" />',
    escudo: '<path d="M50 14 L78 26 L78 52 C78 72 66 84 50 90 C34 84 22 72 22 52 L22 26 Z" /><path d="M50 30 L50 74" /><path d="M34 46 L66 46" />',
    livro: '<path d="M20 24 C34 16 46 16 50 24 C54 16 66 16 80 24 L80 78 C66 70 54 70 50 78 C46 70 34 70 20 78 Z" /><path d="M50 24 L50 78" />',
    olho: '<path d="M14 50 C30 24 70 24 86 50 C70 76 30 76 14 50 Z" /><circle cx="50" cy="50" r="12" /><circle cx="50" cy="50" r="3.5" />',
    mascara: '<path d="M16 40 C16 24 34 16 50 16 C66 16 84 24 84 40 C84 62 68 84 50 84 C32 84 16 62 16 40 Z" /><circle cx="36" cy="42" r="6" /><circle cx="64" cy="42" r="6" /><path d="M38 62 C44 68 56 68 62 62" />',
    caveira: '<path d="M50 14 C68 14 80 28 80 46 C80 58 74 66 68 70 L68 82 L58 82 L58 72 L42 72 L42 82 L32 82 L32 70 C26 66 20 58 20 46 C20 28 32 14 50 14 Z" /><circle cx="38" cy="46" r="7" /><circle cx="62" cy="46" r="7" /><path d="M44 58 L56 58 L50 66 Z" />',
    chama: '<path d="M50 12 C58 30 70 36 70 54 C70 72 60 88 50 88 C40 88 30 72 30 54 C30 44 36 40 40 32 C40 44 46 46 46 38 C46 28 44 20 50 12 Z" />',
    lua: '<path d="M62 16 C42 16 26 32 26 52 C26 72 42 88 62 88 C48 78 40 66 40 52 C40 38 48 26 62 16 Z" />',
    corvo: '<path d="M20 60 C26 44 40 32 54 32 C50 26 52 18 58 14 C64 22 66 30 62 36 C74 36 82 46 84 58 C74 52 66 52 60 56 C64 62 62 70 56 74 C54 66 48 62 42 62 C36 62 30 66 26 72 C26 66 28 60 32 56 C26 58 22 60 20 60 Z" />',
    pata: '<circle cx="50" cy="62" r="16" /><circle cx="28" cy="38" r="9" /><circle cx="50" cy="26" r="9" /><circle cx="72" cy="38" r="9" />'
  };

  var archetypeIconHint = {
    "Caçador de Relíquias":"pata","Bruxo do Véu":"chama","Guardião Rúnico":"escudo","Lâmina Carmesim":"espada",
    "Oráculo Silencioso":"olho","Mercenário Estelar":"lua","Necromante Errante":"caveira","Paladino Caído":"escudo",
    "Ladina das Sombras":"mascara","Xamã da Tempestade":"chama","Arcanista Proibido":"livro","Inquisidor Sagrado":"olho",
    "Feiticeira de Sangue":"chama","Andarilho do Vazio":"lua","Domador de Feras":"pata","Menestrel Amaldiçoado":"mascara",
    "Cavaleiro Espectral":"corvo","Alquimista Renegado":"livro"
  };

  var auraPalettes = [
    {a:"#6b2fa8", b:"#c81e3f"},
    {a:"#a855e0", b:"#3d1a63"},
    {a:"#7a1128", b:"#3d1a63"},
    {a:"#c81e3f", b:"#0a0712"},
    {a:"#3d1a63", b:"#c7c5d3"}
  ];

  // ============================================================
  // UTILIDADES
  // ============================================================

  var lastKey = null;

  function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr){ return arr[rand(0, arr.length - 1)]; }
  function pickN(arr, n){
    var pool = arr.slice();
    var out = [];
    for(var i = 0; i < n && pool.length > 0; i++){
      var idx = rand(0, pool.length - 1);
      out.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return out;
  }
  function mod(score){
    var m = Math.floor((score - 10) / 2);
    return (m >= 0 ? "+" : "") + m;
  }
  function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  // ---- avatar SVG procedural ----
  function buildAvatar(archetype){
    var iconKey = archetypeIconHint[archetype] || pick(Object.keys(iconLibrary));
    var iconPaths = iconLibrary[iconKey];
    var aura = pick(auraPalettes);
    var rotation = rand(0, 359);
    var tickCount = rand(14, 20);
    var ticks = "";
    for(var i = 0; i < tickCount; i++){
      var angle = (360 / tickCount) * i;
      var lit = Math.random() > 0.42;
      var rad = angle * Math.PI / 180;
      var x1 = 50 + Math.cos(rad) * 44;
      var y1 = 50 + Math.sin(rad) * 44;
      var x2 = 50 + Math.cos(rad) * (lit ? 39 : 41);
      var y2 = 50 + Math.sin(rad) * (lit ? 39 : 41);
      ticks += '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(lit ? aura.a : "rgba(199,197,211,0.25)")+'" stroke-width="'+(lit ? 2.2 : 1.2)+'" stroke-linecap="round" />';
    }
    var gradId = "g" + Math.floor(Math.random() * 1e6);
    var svg =
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<radialGradient id="'+gradId+'" cx="50%" cy="42%" r="65%">' +
            '<stop offset="0%" stop-color="'+aura.a+'" stop-opacity="0.9" />' +
            '<stop offset="100%" stop-color="'+aura.b+'" stop-opacity="0.95" />' +
          '</radialGradient>' +
        '</defs>' +
        '<circle cx="50" cy="50" r="48" fill="url(#'+gradId+')" stroke="rgba(236,233,244,0.25)" stroke-width="1.4" />' +
        '<circle cx="50" cy="50" r="34" fill="rgba(5,3,8,0.45)" />' +
        '<g transform="rotate('+rotation+' 50 50)">' + ticks + '</g>' +
        '<g fill="none" stroke="#ece9f4" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(0,2) scale(0.62) translate(31,31)">' +
          iconPaths +
        '</g>' +
      '</svg>';
    return svg;
  }

  // ---- história expandida (multi-parágrafo) ----
  function buildLore(name, archetype){
    var p1 = "<strong>" + name + "</strong>, " + capitalize(archetype).toLowerCase() + ", nasceu " + pick(originPool) + ". " +
      pick(childhoodPool) + ", uma lição que carregaria por toda a vida.";

    var p2 = capitalize(pick(eventPool)) + ". " + pick(allyPool) + ".";

    var p3 = "Hoje, " + name + " " + pick(goalPool) + ". " + pick(quirkPool) + " — um pequeno ritual que ajuda a manter a sanidade em meio a um mundo cada vez mais estranho.";

    return "<p>" + p1 + "</p><p>" + p2 + "</p><p>" + p3 + "</p>";
  }

  // ============================================================
  // GERAÇÃO
  // ============================================================

  function generateSheet(){
    var name, archetype, key, tries = 0;
    do{
      name = pick(firstNames) + " " + pick(surnames);
      archetype = pick(archetypes);
      key = name + "|" + archetype;
      tries++;
    } while(key === lastKey && tries < 8);
    lastKey = key;

    var tagline = pick(taglines);
    var level = rand(1, 20);
    var xpPct = rand(8, 96);

    var attrs = attrDefs.map(function(a){ return { def: a, score: rand(6, 19) }; });
    var talents = pickN(talentPool, 3);
    var lore = buildLore(name, archetype);
    var alignment = pick(["Leal e Sombrio","Caótico e Justo","Neutro e Calculista","Rebelde e Devoto","Solitário e Vigilante"]);
    var species = pick(["Humano","Meio-Elfo","Draconato","Tiefling","Anão das Profundezas","Elfo Negro","Semiorc","Genasi Sombrio"]);
    var avatarSvg = buildAvatar(archetype);

    render({name:name, archetype:archetype, tagline:tagline, level:level, xpPct:xpPct,
      attrs:attrs, talents:talents, lore:lore, alignment:alignment, species:species, avatarSvg:avatarSvg});
  }

  function render(data){
    document.getElementById("avatarFrame").innerHTML = data.avatarSvg;
    document.getElementById("archetype").textContent = data.archetype;
    document.getElementById("charName").textContent = data.name;
    document.getElementById("tagline").textContent = data.tagline;
    document.getElementById("lvlNum").textContent = data.level;
    document.getElementById("xpFill").style.width = data.xpPct + "%";
    document.getElementById("xpCaption").textContent = data.xpPct + "% até o próximo nível";
    document.getElementById("lore").innerHTML = data.lore;

    var attrsEl = document.getElementById("attrs");
    attrsEl.innerHTML = "";
    data.attrs.forEach(function(a){
      var div = document.createElement("div");
      div.className = "attr";
      div.tabIndex = 0;
      div.innerHTML =
        '<span class="icon">' + a.def.icon + '</span>' +
        '<span class="val">' + a.score + '</span>' +
        '<span class="mod">' + mod(a.score) + '</span>' +
        '<span class="name">' + a.def.label + '</span>';
      attrsEl.appendChild(div);
    });

    var talentsEl = document.getElementById("talents");
    talentsEl.innerHTML = "";
    data.talents.forEach(function(t){
      var div = document.createElement("div");
      div.className = "talent";
      div.tabIndex = 0;
      div.innerHTML =
        '<span class="t-icon">◆</span>' +
        '<div><p class="t-name">' + t.name + '</p><p class="t-desc">' + t.desc + '</p></div>';
      talentsEl.appendChild(div);
    });

    var metaEl = document.getElementById("metaStrip");
    metaEl.innerHTML =
      '<span class="meta-item">Origem: <b>' + data.species + '</b></span>' +
      '<span class="meta-item">Temperamento: <b>' + data.alignment + '</b></span>';
  }

  document.getElementById("rollBtn").addEventListener("click", function(){
    var sheet = document.getElementById("sheet");
    sheet.classList.remove("rolling");
    void sheet.offsetWidth;
    sheet.classList.add("rolling");
    generateSheet();
  });

  generateSheet();

})();
