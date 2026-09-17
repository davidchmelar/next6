/* =========================================================
   NEXT6 – společný JavaScript pro všechny stránky

   ÚPRAVY OBSAHU dělejte jen v první části tohoto souboru.
   Zbytek kódu se stará o zobrazení a není potřeba ho měnit.
   ========================================================= */

/* ---------- 1) Kontakty ---------- */
// Zprávy z formuláře na stránce Kontakt se posílají na tento e-mail
// přes službu FormSubmit (formsubmit.co), bez vlastního serveru.
//
// DŮLEŽITÉ – jen poprvé:
//  Po odeslání první zprávy přijde na e-mail žádost o potvrzení od FormSubmit.
//  Otevřete ji a klikněte na „Activate Form“. Teprve potom začnou zprávy chodit.
//  V dalším e-mailu od FormSubmit dostanete tajný kód (náhodný řetězec).
//  Vložte ho do "formularKlic" – e-mail pak nebude vidět v kódu webu a roboti ho nenajdou.
const KONTAKT = {
  email: "next6project@gmail.com",
  formularKlic: "",
  instagram: "https://www.instagram.com/next6project/",
  facebook: "https://www.facebook.com/next6project"
};

/* ---------- 2) Členové týmu ---------- */
// Fotky patří do složky images/. Když fotka chybí, zobrazí se iniciály.
const TYM = [
  { jmeno: "David Chmelař",       role: "Vedoucí projektu & web",    popis: "Vedení projektu, tvorba a správa webu",    foto: "images/david.png" },
  { jmeno: "Aneta Matušková",     role: "Organizace akcí",           popis: "Organizace akcí, logistika, harmonogram",  foto: "images/aneta.png" },
  { jmeno: "Robin Svozil",        role: "Finance a rozpočet",        popis: "Rozpočet, ceny, přehled nákladů",          foto: "images/robin.png" },
  { jmeno: "Jiří Filipi",         role: "Komunikace s účastníky",    popis: "Kontakt se studenty a účastníky",          foto: "images/jirka.png" },
  { jmeno: "Marie Smetiprachová", role: "Marketing a propagace",     popis: "Propagace, vizuály, komunikace",           foto: "images/maria.png" },
  { jmeno: "Oliver Foltýn",       role: "Administrativa a evidence", popis: "Správa přihlášek, evidence informací",     foto: "images/oliver.png" }
];

/* ---------- 3) Akce (katalog) ---------- */
// Pravidla:
//  - id: krátký název bez mezer a diakritiky (používá se v odkazu, např. akce.html#zoo-praha)
//  - datumy pište ve tvaru RRRR-MM-DD
//  - akce po datu konání dostane sama štítek PROBĚHLO a tlačítko Fotogalerie
//  - probehlo: true = akce má štítek PROBĚHLO hned, i když datum neznáte
//  - vNabidce: true = akce zůstane otevřená s přihláškou i po datu konání
//  - prázdné položky ("", [], null) se na webu nezobrazí
//  - kapacita a prihlaseno jsou čísla; prihlaseno ručně aktualizujte podle přihlášek
//  - uzaverka: po tomto dni už nejde se přihlásit
//  - kratkyPopis: text na kartě; když je prázdný, použije se popis
//
// Pořadí na webu je stejné jako pořadí v tomto seznamu.
// Novou akci přidáte tak, že za } napíšete čárku a zkopírujete celý blok { ... }.
const AKCE = [
  {
    id: "zoo-praha",
    nazev: "ZOO Praha",
    typ: "",
    misto: "Praha",
    datum: "",
    datumDo: "",                 // u vícedenní akce datum konce
    probehlo: true,
    vNabidce: false,
    doprava: "",
    sraz: "",
    casSrazu: "",                // např. "7:15"
    navrat: "",                  // např. "Kolem 18:00 na hlavní nádraží HK"
    cenaNazev: "Vstupné",        // jak se cena jmenuje (Cena, Vstupné …)
    cenaUpresneni: "",  // text před částkou v detailu akce
    cena: "",
    vCene: "",
    uzaverka: "",                // např. "2026-04-06"
    kapacita: null,              // např. 30
    prihlaseno: null,            // např. 12
    kratkyPopis: "Návštěva ZOO Praha nabízí studentům možnost poznat zvířata z celého světa a dozvědět se více o ochraně přírody.",
    popis: "Vzdělávací a zábavná exkurze do ZOO Praha, kde si studenti prohlédnou různá zvířata z celého světa a dozví se více o přírodě, ochraně zvířat a jejich prostředí.",
    program: [
      // { cas: "7:15", co: "Sraz na hlavním nádraží" },
    ],
    sSebou: [
      // "Svačina a pití",
    ],
    obrazek: "images/prahazoo.jpg",
    googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSdLV2lBg1av_Ew8eKjsaATsMGh7KCBQ6hLrEj0e-tR8b9vVwg/viewform?usp=header"
  },
  {
    id: "iqlandia",
    nazev: "iQLANDIA Liberec",
    typ: "",
    misto: "Liberec",
    datum: "",                   // doplňte datum konání, např. "2026-05-20"
    datumDo: "",
    probehlo: true,
    vNabidce: false,
    doprava: "",
    sraz: "",
    casSrazu: "",
    navrat: "",
    cenaNazev: "Vstupné",
    cenaUpresneni: "",
    cena: "",
    vCene: "",
    uzaverka: "",
    kapacita: null,
    prihlaseno: null,
    kratkyPopis: "Návštěva science centra iQLANDIA v Liberci nabízí studentům interaktivní expozice zaměřené na vědu a techniku.",
    popis: "Návštěva science centra iQLANDIA v Liberci nabízí studentům interaktivní expozice zaměřené na vědu a techniku.",
    program: [],
    sSebou: [],
    obrazek: "images/iqlandia.jpg",
    googleForm: ""
  }
];

/* ---------- 4) Přihláška na webu ---------- */
// Přihláška se odesílá do Google Formuláře, odpovědi tedy najdete tam jako dosud.
//
// Dokud je "odeslatNa" prázdné, zobrazí se u akce její Google Formulář (googleForm)
// vložený přímo do stránky.
//
// Jak zapnout vlastní formulář webu:
//  1. V Google Formuláři vytvořte otázky: Akce, Jméno a příjmení, Třída, E-mail,
//     Telefon, Poznámka (všechny jako „Krátká odpověď“ / „Odstavec“).
//  2. Klikněte na ⋮ (vpravo nahoře) → „Získat předvyplněný odkaz“,
//     vyplňte do každé otázky něco a klikněte na „Získat odkaz“.
//  3. V odkazu uvidíte části jako entry.123456789=... – každé číslo patří k jedné otázce.
//     Zapište je níže.
//  4. Do "odeslatNa" dejte adresu formuláře, kde „viewform“ nahradíte za „formResponse“
//     (bez ?usp=... na konci).
const PRIHLASKA = {
  odeslatNa: "",   // např. "https://docs.google.com/forms/d/e/XXXX/formResponse"
  pole: {
    akce: "",      // např. "entry.111111111"
    jmeno: "",
    trida: "",
    email: "",
    telefon: "",
    poznamka: ""
  }
};

/* ---------- 5) Fotogalerie ---------- */
// Každá akce má vlastní galerii. Fotky se dají přidat dvěma způsoby:
//
// A) ČÍSLOVANÉ FOTKY (nejjednodušší)
//    Nahrajte fotky do složky z "slozka" a pojmenujte je 01.jpg, 02.jpg, 03.jpg …
//    Do "pocet" napište, kolik jich je. Chybějící fotky se na webu nezobrazí.
//
// B) FOTKY S POPISKY
//    Vypište je do "fotky", např.:
//    fotky: [
//      { soubor: "images/galerie/zoo-praha/slon.jpg", popis: "U výběhu slonů" }
//    ]
//
// idAkce musí být stejné jako id akce v seznamu AKCE – u akce se pak objeví
// tlačítko „Fotky z akce“.
const FOTOGALERIE = [
  {
    akce: "ZOO Praha",
    idAkce: "zoo-praha",
    datum: "",
    slozka: "images/galerie/zoo-praha/",
    pocet: 7,                    // počet fotek 01.jpg, 02.jpg … ve složce
    pripona: "jpg",
    fotky: []
  },
  {
    akce: "iQLANDIA Liberec",
    idAkce: "iqlandia",
    datum: "",
    slozka: "images/galerie/iqlandia/",
    pocet: 5,
    pripona: "jpg",
    fotky: []
  }
];

/* =========================================================
   KÓD PRO ZOBRAZENÍ – není potřeba měnit
   ========================================================= */

function el(tag, attrs = {}, ...deti) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") e.className = v;
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const d of deti) if (d != null && d !== false) e.append(d);
  return e;
}

function odkazVen(href, text, trida) {
  return el("a", { href, target: "_blank", rel: "noopener", class: trida }, text);
}

function inicialy(jmeno) {
  return jmeno.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();
}

/* ---------- Datumy ---------- */
function datum(iso) { return new Date(iso + "T12:00:00"); }
function dnesek() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function konecDne(iso) { return new Date(iso + "T23:59:59"); }

function formatDatum(iso, sDnem = true) {
  const moznosti = sDnem
    ? { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    : { day: "numeric", month: "long", year: "numeric" };
  return datum(iso).toLocaleDateString("cs-CZ", moznosti);
}

function terminAkce(a, sDnem = true) {
  if (!a.datum) return "";
  if (a.datumDo && a.datumDo !== a.datum) {
    return `${formatDatum(a.datum, false)} – ${formatDatum(a.datumDo, false)}`;
  }
  return formatDatum(a.datum, sDnem);
}

/* ---------- Stav akce ---------- */
function terminUzMinul(a) {
  if (!a.datum) return false;
  return konecDne(a.datumDo || a.datum) < dnesek();
}

function probehla(a) {
  if (a.vNabidce === true) return false;
  return a.probehlo === true || terminUzMinul(a);
}

// Termín ukazujeme jen tehdy, když ještě nenastal
function zobrazitTermin(a) {
  return Boolean(a.datum) && !terminUzMinul(a);
}

function stavAkce(a) {
  if (probehla(a)) return { otevreno: false, text: "Akce už proběhla" };
  if (a.uzaverka && konecDne(a.uzaverka) < dnesek()) return { otevreno: false, text: "Přihlášky jsou uzavřené" };
  const maKapacitu = Number.isFinite(a.kapacita) && a.kapacita > 0;
  const volno = maKapacitu ? a.kapacita - (a.prihlaseno || 0) : null;
  if (maKapacitu && volno <= 0) return { otevreno: false, text: "Obsazeno" };

  const casti = [];
  if (maKapacitu) casti.push(`Volná místa: ${volno} z ${a.kapacita}`);
  if (a.uzaverka) casti.push(`přihlášky do ${formatDatum(a.uzaverka, false)}`);
  const text = casti.join(", ");
  return { otevreno: true, text: text ? text.charAt(0).toUpperCase() + text.slice(1) : "" };
}

function rozdelAkce() {
  return {
    budouci: AKCE.filter(a => !probehla(a)),
    minule: AKCE.filter(probehla)
  };
}

function obrazekAkce(a, trida, rezim) {
  const obal = el(rezim === "odkaz" ? "a" : "div", {
    class: trida,
    href: rezim === "odkaz" ? `akce.html#${a.id}` : null,
    tabindex: rezim === "odkaz" ? "-1" : null,
    "aria-hidden": rezim === "odkaz" ? "true" : null
  });
  if (a.obrazek) {
    const img = el("img", { src: a.obrazek, alt: rezim === "odkaz" ? "" : a.nazev, loading: "lazy" });
    img.addEventListener("error", () => img.remove());
    obal.append(img);
  }
  return obal;
}

function cenaText(a) {
  return [a.cenaUpresneni, a.cena].filter(Boolean).join(" ");
}

function cenaBlok(a) {
  if (!a.cena) return null;
  return el("div", { class: "cena" },
    el("span", { class: "cena__popisek" }, [a.cenaNazev || "Cena", a.cenaUpresneni].filter(Boolean).join(", ")),
    el("span", { class: "cena__castka" }, a.cena)
  );
}

function prazdnyStav(nadpis, text) {
  return el("div", { class: "prazdne" },
    el("h3", {}, nadpis),
    text ? el("p", {}, text) : null,
    el("p", {}, odkazVen(KONTAKT.instagram, "Sledujte nás na Instagramu"))
  );
}

/* ---------- Karta akce v nabídce ---------- */
function kartaAkce(a) {
  const stav = stavAkce(a);
  const skoncila = probehla(a);
  const galerie = galerieAkce(a.id);

  let odznak = "";
  let odznakTrida = "odznak";
  if (skoncila) odznak = "PROBĚHLO";
  else if (!stav.otevreno) { odznak = stav.text; odznakTrida += " odznak--zavreno"; }
  else odznak = a.cena || "";

  const tlacitko = skoncila && galerie
    ? el("a", { class: "tlacitko-obrys", href: `fotogalerie.html#galerie-${a.id}` }, "Fotogalerie", el("span", { "aria-hidden": "true" }, " →"))
    : el("a", { class: "tlacitko-obrys", href: `akce.html#${a.id}` }, "Více informací", el("span", { "aria-hidden": "true" }, " →"));

  const obrazek = obrazekAkce(a, "zajezd__obrazek", "odkaz");
  if (odznak) obrazek.append(el("span", { class: odznakTrida }, odznak));

  return el("article", { class: "zajezd" },
    obrazek,
    el("div", { class: "zajezd__telo" },
      el("h3", {}, el("a", { href: `akce.html#${a.id}` }, a.nazev)),
      el("p", { class: "zajezd__popis" }, a.kratkyPopis || a.popis || ""),
      tlacitko
    )
  );
}

function vykresliNabidku(seznam) {
  seznam.textContent = "";
  if (!AKCE.length) {
    seznam.classList.remove("katalog");
    seznam.append(prazdnyStav("Další akci právě připravujeme", "Termín a místo zveřejníme tady a na sociálních sítích."));
    return;
  }
  seznam.classList.add("katalog");
  const { budouci, minule } = rozdelAkce();
  [...budouci, ...minule].forEach(a => seznam.append(kartaAkce(a)));
}

/* ---------- Úvodní stránka: nabídka akcí ---------- */
function zobrazNabidkuNaUvodu() {
  const misto = document.getElementById("nabidka-uvod");
  if (misto) vykresliNabidku(misto);
}

/* ---------- Stránka Akce: nabídka ---------- */
function vykresliKatalog() {
  vykresliNabidku(document.getElementById("katalog-seznam"));
}

/* ---------- Stránka Akce: detail ---------- */
function vykresliDetail(a) {
  const detail = document.getElementById("detail");
  const stav = stavAkce(a);
  detail.textContent = "";

  const tlacitkoPrihlasit = stav.otevreno
    ? el("button", { type: "button", class: "tlacitko" }, "Přihlásit se")
    : null;
  if (tlacitkoPrihlasit) {
    tlacitkoPrihlasit.addEventListener("click", () => {
      const cil = document.getElementById("prihlaska");
      cil.scrollIntoView({ behavior: "smooth", block: "start" });
      const prvni = cil.querySelector("input, iframe");
      if (prvni) setTimeout(() => prvni.focus({ preventScroll: true }), 400);
    });
  }

  const hlava = el("div", { class: "detail-hlava" },
    el("div", { class: "detail-hlava__obrazek" }, ...obrazekAkce(a, "", false).childNodes),
    el("div", {},
      a.typ ? el("span", { class: "stitek" }, a.typ) : null,
      el("h1", {}, a.nazev),
      zobrazitTermin(a) ? el("p", { class: "detail-hlava__termin" }, terminAkce(a)) : null,
      a.misto ? el("p", { class: "detail-hlava__misto" }, a.misto) : null,
      cenaBlok(a),
      stav.text ? el("p", { class: `stav ${stav.otevreno ? "stav--volno" : "stav--zavreno"}` }, stav.text) : null,
      el("div", { class: "tlacitka" },
        tlacitkoPrihlasit,
        galerieAkce(a.id)
          ? el("a", { class: "tlacitko tlacitko--svetle", href: `fotogalerie.html#galerie-${a.id}` }, "Fotky z akce")
          : null
      )
    )
  );

  // Levý sloupec: popis, program, co s sebou
  const obsah = el("div", {});
  if (a.popis) obsah.append(el("section", {}, el("h2", {}, "O akci"), el("p", {}, a.popis)));
  if (a.program && a.program.length) {
    obsah.append(el("section", {},
      el("h2", {}, "Program"),
      el("ol", { class: "program" }, ...a.program.map(b =>
        el("li", {}, el("span", { class: "program__cas" }, b.cas || ""), el("span", {}, b.co))
      ))
    ));
  }
  if (a.sSebou && a.sSebou.length) {
    obsah.append(el("section", {},
      el("h2", {}, "Co s sebou"),
      el("ul", { class: "nabidka" }, ...a.sSebou.map(v => el("li", {}, v)))
    ));
  }

  // Pravý sloupec: důležité informace
  const kapacitaText = Number.isFinite(a.kapacita) && a.kapacita > 0
    ? `${a.kapacita} míst, přihlášeno ${a.prihlaseno || 0}` : "";
  const udaje = [
    ["Termín", zobrazitTermin(a) ? terminAkce(a, false) : ""],
    ["Sraz", [a.sraz, a.casSrazu].filter(Boolean).join(", ")],
    ["Návrat", a.navrat],
    ["Doprava", a.doprava],
    [a.cenaNazev || "Cena", cenaText(a)],
    ["V ceně", a.vCene],
    ["Přihlášky do", a.uzaverka ? formatDatum(a.uzaverka, false) : ""],
    ["Kapacita", kapacitaText]
  ].filter(([, v]) => v);

  const infoBox = !udaje.length ? null : el("aside", { class: "info-box" },
    el("h2", {}, "Důležité informace"),
    el("dl", {}, ...udaje.map(([k, v]) => el("div", {}, el("dt", {}, k), el("dd", {}, v)))),
    el("p", { class: "info-box__poznamka" }, "Ceny jsou uvedeny bez slev. Slevy si každý řeší sám.")
  );

  detail.append(
    el("a", { class: "zpet", href: "akce.html" }, "Zpět na nabídku akcí"),
    hlava,
    el("div", { class: infoBox ? "detail-telo" : "detail-telo detail-telo--bez-boxu" }, obsah, infoBox)
  );

  if (stav.otevreno) detail.append(sekcePrihlasky(a));
}

/* ---------- Přihláška ---------- */
const POLE_FORMULARE = [
  { klic: "jmeno",    popisek: "Jméno a příjmení",          typ: "text",     povinne: true,  autocomplete: "name" },
  { klic: "trida",    popisek: "Třída",                     typ: "text",     povinne: true,  placeholder: "např. 2.A" },
  { klic: "email",    popisek: "E-mail",                    typ: "email",    povinne: true,  autocomplete: "email" },
  { klic: "telefon",  popisek: "Telefon",                   typ: "tel",      povinne: false, autocomplete: "tel" },
  { klic: "poznamka", popisek: "Poznámka pro organizátory", typ: "textarea", povinne: false, cele: true }
];

const SOUHLASY = [
  { klic: "souhlasRodice", text: "Zákonný zástupce o mé účasti ví a souhlasí s ní (pokud mi ještě není 18 let)." },
  { klic: "souhlasUdaje",  text: "Souhlasím, aby NEXT6 použila mé údaje jen pro organizaci této akce." }
];

function vlastniFormularZapnuty() {
  return Boolean(PRIHLASKA.odeslatNa && PRIHLASKA.odeslatNa.includes("formResponse"));
}

function vlozenyFormularUrl(odkaz) {
  if (!odkaz) return "";
  return odkaz.split("?")[0] + "?embedded=true";
}

function sekcePrihlasky(a) {
  const sekce = el("section", { class: "prihlaska", id: "prihlaska", "aria-labelledby": "prihlaska-nadpis" },
    el("h2", { id: "prihlaska-nadpis" }, "Přihláška"),
    el("p", { class: "prihlaska__uvod" },
      zobrazitTermin(a) ? `Přihlašujete se na akci ${a.nazev}, ${terminAkce(a, false)}.` : `Přihlašujete se na akci ${a.nazev}.`)
  );

  if (vlastniFormularZapnuty()) {
    sekce.append(formularPrihlasky(a));
  } else if (a.googleForm) {
    sekce.append(
      el("div", { class: "vlozeny-formular" },
        el("iframe", { src: vlozenyFormularUrl(a.googleForm), title: `Přihláška na akci ${a.nazev}`, loading: "lazy" })
      ),
      el("p", { style: "margin-top:14px" }, "Formulář se nenačetl? ", odkazVen(a.googleForm, "Otevřít přihlášku v novém okně"))
    );
  } else {
    sekce.append(el("p", {}, "Přihlášky na tuto akci zatím nejsou otevřené."));
  }
  return sekce;
}

function formularPrihlasky(a) {
  const form = el("form", { class: "formular", novalidate: true });

  POLE_FORMULARE.forEach(p => {
    const id = `pole-${p.klic}`;
    const vstup = p.typ === "textarea"
      ? el("textarea", { id, name: p.klic, "aria-describedby": `${id}-chyba` })
      : el("input", {
          id, name: p.klic, type: p.typ,
          autocomplete: p.autocomplete, placeholder: p.placeholder,
          "aria-describedby": `${id}-chyba`
        });
    if (p.povinne) vstup.required = true;
    form.append(el("div", { class: `pole${p.cele ? " pole--cele" : ""}` },
      el("label", { for: id }, p.popisek, p.povinne ? null : el("span", { class: "nepovinne" }, " (nepovinné)")),
      vstup,
      el("p", { class: "pole__chyba", id: `${id}-chyba` })
    ));
  });

  SOUHLASY.forEach(s => {
    const id = `pole-${s.klic}`;
    const box = el("input", { id, name: s.klic, type: "checkbox", required: true, "aria-describedby": `${id}-chyba` });
    form.append(el("div", { class: "zaskrt" },
      box,
      el("label", { for: id }, s.text),
      el("p", { class: "pole__chyba", id: `${id}-chyba` })
    ));
  });

  const odeslat = el("button", { type: "submit", class: "tlacitko" }, "Odeslat přihlášku");
  const stavText = el("p", { class: "formular__stav", role: "alert" });
  form.append(el("div", { class: "formular__odeslat" }, odeslat, stavText));

  form.addEventListener("input", e => {
    if (e.target.getAttribute("aria-invalid") === "true") nastavChybu(e.target, "");
  });
  form.addEventListener("change", e => {
    if (e.target.type === "checkbox" && e.target.checked) nastavChybu(e.target, "");
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    stavText.textContent = "";
    const prvniChyba = zkontrolujFormular(form);
    if (prvniChyba) { prvniChyba.focus(); return; }

    const hodnoty = Object.fromEntries(new FormData(form));
    const data = new URLSearchParams();
    if (PRIHLASKA.pole.akce) data.append(PRIHLASKA.pole.akce, `${a.nazev} (${terminAkce(a, false)})`);
    POLE_FORMULARE.forEach(p => {
      const entry = PRIHLASKA.pole[p.klic];
      if (entry) data.append(entry, (hodnoty[p.klic] || "").trim());
    });

    odeslat.disabled = true;
    odeslat.textContent = "Odesílám…";
    try {
      // Google Formulář neumožňuje přečíst odpověď, proto režim no-cors.
      await fetch(PRIHLASKA.odeslatNa, { method: "POST", mode: "no-cors", body: data });
      const potvrzeni = el("div", { class: "potvrzeni", tabindex: "-1", role: "status" },
        el("h3", {}, "Přihláška odeslána"),
        el("p", {}, `${hodnoty.jmeno.trim()}, jste přihlášen(a) na akci ${a.nazev}${zobrazitTermin(a) ? ", " + terminAkce(a, false) : ""}.`),
        el("p", {}, "Další informace před akcí zveřejníme na webu a na Instagramu.")
      );
      form.replaceWith(potvrzeni);
      potvrzeni.focus();
    } catch {
      odeslat.disabled = false;
      odeslat.textContent = "Odeslat přihlášku";
      stavText.textContent = "Přihlášku se nepodařilo odeslat. Zkontrolujte připojení k internetu a zkuste to znovu.";
    }
  });

  return form;
}

function nastavChybu(vstup, zprava) {
  const chyba = document.getElementById(`${vstup.id}-chyba`);
  if (chyba) chyba.textContent = zprava;
  if (zprava) vstup.setAttribute("aria-invalid", "true");
  else vstup.removeAttribute("aria-invalid");
}

function zkontrolujFormular(form) {
  let prvni = null;
  form.querySelectorAll("input, textarea").forEach(v => {
    let zprava = "";
    const hodnota = v.type === "checkbox" ? v.checked : v.value.trim();
    if (v.required && !hodnota) {
      zprava = v.type === "checkbox" ? "Bez tohoto souhlasu přihlášku nelze odeslat." : "Vyplňte toto pole.";
    } else if (v.type === "email" && hodnota && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hodnota)) {
      zprava = "Zadejte e-mail ve tvaru jmeno@domena.cz.";
    }
    nastavChybu(v, zprava);
    if (zprava && !prvni) prvni = v;
  });
  return prvni;
}

/* ---------- Stránka Akce: přepínání katalog / detail ---------- */
function zobrazAkce() {
  const katalog = document.getElementById("katalog");
  const detail = document.getElementById("detail");
  if (!katalog || !detail) return;
  const zahlavi = document.getElementById("akce-zahlavi");
  const obsah = document.getElementById("akce-obsah");
  const puvodniTitulek = document.title;

  function prepni() {
    const [id, cast] = decodeURIComponent(location.hash.slice(1)).split("/");
    const akce = AKCE.find(a => a.id === id);
    if (akce) {
      vykresliDetail(akce);
      katalog.hidden = true;
      zahlavi.hidden = true;
      if (obsah) obsah.classList.remove("sekce--nabidka");
      detail.hidden = false;
      document.title = `${akce.nazev} – Akce – NEXT6`;
    } else {
      vykresliKatalog();
      detail.hidden = true;
      katalog.hidden = false;
      zahlavi.hidden = false;
      if (obsah) obsah.classList.add("sekce--nabidka");
      document.title = puvodniTitulek;
    }
    window.scrollTo(0, 0);
    const prihlaska = document.getElementById("prihlaska");
    if (akce && cast === "prihlaska" && prihlaska) {
      requestAnimationFrame(() => prihlaska.scrollIntoView());
    }
  }

  window.addEventListener("hashchange", prepni);
  prepni();
}

/* ---------- Stránka Náš tým ---------- */
function zobrazTym() {
  const seznam = document.getElementById("tym-seznam");
  if (!seznam) return;
  TYM.forEach(c => {
    const foto = el("div", { class: "clen__foto" });
    const nahradni = () => {
      foto.textContent = "";
      foto.append(el("span", { class: "clen__inicialy", "aria-hidden": "true" }, inicialy(c.jmeno)));
    };
    if (c.foto) {
      const img = el("img", { src: c.foto, alt: c.jmeno, loading: "lazy" });
      img.addEventListener("error", nahradni);
      foto.append(img);
    } else {
      nahradni();
    }
    seznam.append(el("article", { class: "clen" },
      foto,
      el("h3", {}, c.jmeno),
      el("p", { class: "clen__role" }, c.role),
      el("p", { class: "clen__popis" }, c.popis)
    ));
  });
}

/* ---------- Stránka Fotogalerie ---------- */
function fotkySkupiny(s) {
  const seznam = [];
  const pocet = Number(s.pocet) || 0;
  for (let i = 1; i <= pocet; i++) {
    const cislo = String(i).padStart(2, "0");
    seznam.push({ soubor: `${s.slozka || ""}${cislo}.${s.pripona || "jpg"}`, popis: "" });
  }
  return seznam.concat(s.fotky || []);
}

function galerieAkce(idAkce) {
  return FOTOGALERIE.find(s => s.idAkce === idAkce && fotkySkupiny(s).length);
}

function zobrazFotogalerii() {
  const misto = document.getElementById("fotogalerie");
  if (!misto) return;

  const skupiny = FOTOGALERIE.filter(s => fotkySkupiny(s).length);
  if (!skupiny.length) {
    misto.append(prazdnyStav("Fotky z akcí najdete na Instagramu", "Sem je přidáme, jakmile je vybereme."));
    return;
  }

  const vsechny = [];
  const nahled = document.getElementById("nahled");
  const nahledImg = document.getElementById("nahled-obrazek");
  const nahledPopis = document.getElementById("nahled-popis");
  let aktualni = null;

  const dostupne = () => vsechny.filter(f => !f.chyba);

  function ukaz(fotka) {
    const seznam = dostupne();
    if (!seznam.length) return;
    aktualni = fotka;
    const poradi = `${seznam.indexOf(fotka) + 1} / ${seznam.length}`;
    nahledImg.src = fotka.soubor;
    nahledImg.alt = fotka.popis || `Fotka z akce ${fotka.akce}`;
    nahledPopis.textContent = `${fotka.popis || fotka.akce} (${poradi})`;
  }

  function posun(krok) {
    const seznam = dostupne();
    const i = seznam.indexOf(aktualni);
    ukaz(seznam[(i + krok + seznam.length) % seznam.length]);
  }

  [...skupiny]
    .sort((a, b) => (b.datum || "").localeCompare(a.datum || ""))
    .forEach(s => {
      const fotky = fotkySkupiny(s).map(f => ({ ...f, akce: s.akce }));
      const mrizka = el("div", { class: "galerie" });
      const prazdnaSkupina = el("p", { class: "galerie__prazdna", hidden: true }, "Fotky z této akce brzy přidáme.");
      let zbyva = fotky.length;

      fotky.forEach(f => {
        vsechny.push(f);
        const img = el("img", { src: f.soubor, alt: f.popis || `Fotka z akce ${s.akce}`, loading: "lazy" });
        const tlacitko = el("button", { type: "button", "aria-label": "Zvětšit fotku: " + (f.popis || s.akce) }, img);
        img.addEventListener("error", () => {
          f.chyba = true;
          tlacitko.remove();
          zbyva--;
          if (zbyva === 0) prazdnaSkupina.hidden = false;
        });
        tlacitko.addEventListener("click", () => { ukaz(f); nahled.showModal(); });
        mrizka.append(tlacitko);
      });

      const nadpis = s.datum ? `${s.akce}, ${formatDatum(s.datum, false)}` : s.akce;
      misto.append(el("section", { class: "galerie-akce", id: s.idAkce ? `galerie-${s.idAkce}` : null },
        el("h2", {}, nadpis),
        s.idAkce && AKCE.some(a => a.id === s.idAkce)
          ? el("p", { class: "galerie-akce__odkaz" }, el("a", { href: `akce.html#${s.idAkce}` }, "Informace o akci"))
          : null,
        mrizka,
        prazdnaSkupina
      ));
    });

  document.getElementById("nahled-predchozi").addEventListener("click", () => posun(-1));
  document.getElementById("nahled-dalsi").addEventListener("click", () => posun(1));
  document.getElementById("nahled-zavrit").addEventListener("click", () => nahled.close());
  nahled.addEventListener("click", e => { if (e.target === nahled) nahled.close(); });
  nahled.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") posun(-1);
    if (e.key === "ArrowRight") posun(1);
  });

  // Po otevření odkazu fotogalerie.html#galerie-... přeskočí na danou galerii
  if (location.hash) {
    const cil = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (cil) cil.scrollIntoView();
  }
}

/* ---------- Stránka Kontakt ---------- */
function zobrazKontakt() {
  const formular = document.getElementById("kontakt-formular");
  if (!formular) return;

  // E-mail z nastavení
  const odkaz = document.getElementById("kontakt-email-odkaz");
  if (odkaz && KONTAKT.email) {
    odkaz.href = "mailto:" + KONTAKT.email;
    odkaz.textContent = KONTAKT.email;
  }

  // Kopírování e-mailu
  const kopirovat = document.getElementById("kopirovat-email");
  const kopirovatStav = document.getElementById("kopirovat-stav");
  if (kopirovat) {
    kopirovat.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(KONTAKT.email);
        kopirovat.classList.add("zkopirovano");
        kopirovat.title = "Zkopírováno";
        if (kopirovatStav) kopirovatStav.textContent = "E-mail zkopírován";
        setTimeout(() => {
          kopirovat.classList.remove("zkopirovano");
          kopirovat.title = "Kopírovat e-mail";
          if (kopirovatStav) kopirovatStav.textContent = "";
        }, 2000);
      } catch {
        if (kopirovatStav) kopirovatStav.textContent = "E-mail se nepodařilo zkopírovat";
      }
    });
  }

  const karta = document.getElementById("kontakt-karta");
  const stav = document.getElementById("k-stav");
  const tlacitko = formular.querySelector("button[type=submit]");
  const puvodniObsah = [...karta.childNodes];
  const pole = nazev => formular.querySelector(`[name="${nazev}"]`);

  // Adresa FormSubmit – klasické odeslání i rychlé odeslání (AJAX)
  const adresat = KONTAKT.formularKlic || KONTAKT.email;
  formular.action = `https://formsubmit.co/${adresat}`;
  if (location.protocol.startsWith("http")) {
    pole("_next").value = `${location.origin}${location.pathname}?odeslano=1`;
  }

  function ukazHotovo(jmeno, email) {
    const hotovo = el("div", { class: "k-hotovo", tabindex: "-1", role: "status" },
      el("div", { class: "k-hotovo__ikona", "aria-hidden": "true" }),
      el("h2", {}, "Zpráva je na cestě"),
      el("p", {}, jmeno
        ? `Děkujeme, ${jmeno.split(" ")[0]}. Ozveme se vám na ${email}.`
        : "Děkujeme, vaše zpráva dorazila do našeho e-mailu. Brzy se ozveme."),
      el("button", { type: "button" }, "Napsat další zprávu")
    );
    hotovo.querySelector(".k-hotovo__ikona").innerHTML =
      '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
    hotovo.querySelector("button").addEventListener("click", () => {
      formular.reset();
      tlacitko.disabled = false;
      tlacitko.textContent = "Odeslat zprávu";
      stav.textContent = "";
      karta.replaceChildren(...puvodniObsah);
      document.getElementById("k-jmeno").focus();
    });
    karta.replaceChildren(hotovo);
    hotovo.focus();
  }

  // Návrat z FormSubmit po klasickém odeslání
  const parametry = new URLSearchParams(location.search);
  if (parametry.get("odeslano") === "1") {
    history.replaceState(null, "", location.pathname);
    ukazHotovo("", "");
  }

  formular.addEventListener("input", e => {
    if (e.target.getAttribute("aria-invalid") === "true") nastavChybu(e.target, "");
  });

  formular.addEventListener("submit", async e => {
    e.preventDefault();
    stav.textContent = "";
    const chyba = zkontrolujFormular(formular);
    if (chyba) { chyba.focus(); return; }

    const jmeno = pole("Jméno").value.trim();
    const email = pole("email").value.trim();
    const tema = (formular.querySelector('[name="Téma"]:checked') || {}).value || "Zpráva";
    const zprava = pole("Zpráva").value.trim();
    pole("_subject").value = `Web NEXT6: ${tema} – ${jmeno}`;

    // Soubor otevřený z počítače FormSubmit nepřijme
    if (location.protocol === "file:") {
      ukazZalohu("Formulář funguje až na webu next6project.com, v souboru otevřeném z počítače odeslat nejde.");
      return;
    }

    tlacitko.disabled = true;
    tlacitko.textContent = "Odesílám…";
    try {
      const odpoved = await fetch(`https://formsubmit.co/ajax/${adresat}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          "Jméno": jmeno,
          email,
          "Téma": tema,
          "Zpráva": zprava,
          _subject: pole("_subject").value,
          _replyto: email,
          _template: "table",
          _honey: pole("_honey").value
        })
      });
      const vysledek = await odpoved.json().catch(() => ({}));
      if (!odpoved.ok || String(vysledek.success) !== "true") throw new Error(vysledek.message || "Chyba");
      ukazHotovo(jmeno, email);
    } catch (chyba) {
      console.warn("Rychlé odeslání se nepovedlo, posílám klasicky přes FormSubmit:", chyba && chyba.message);
      // Klasické odeslání: FormSubmit zobrazí svou stránku (i výzvu k aktivaci)
      // a potom vrátí návštěvníka zpět sem.
      tlacitko.textContent = "Odesílám přes FormSubmit…";
      HTMLFormElement.prototype.submit.call(formular);
    }

    function ukazZalohu(text) {
      const predmet = pole("_subject").value;
      const telo = `${zprava}\n\n${jmeno}\n${email}`;
      const mailto = `mailto:${KONTAKT.email}?subject=${encodeURIComponent(predmet)}&body=${encodeURIComponent(telo)}`;
      stav.replaceChildren(
        el("span", {}, text),
        el("a", { class: "k-zaloha", href: mailto }, "Poslat stejnou zprávu přes můj e-mail")
      );
    }
  });
}

/* ---------- Mobilní menu ---------- */
function nastavMenu() {
  const tlacitko = document.querySelector(".menu-tlacitko");
  const menu = document.getElementById("menu");
  if (!tlacitko || !menu) return;
  const zavri = () => {
    menu.classList.remove("otevrene");
    tlacitko.setAttribute("aria-expanded", "false");
    tlacitko.setAttribute("aria-label", "Otevřít menu");
  };
  tlacitko.addEventListener("click", () => {
    const otevreno = menu.classList.toggle("otevrene");
    tlacitko.setAttribute("aria-expanded", String(otevreno));
    tlacitko.setAttribute("aria-label", otevreno ? "Zavřít menu" : "Otevřít menu");
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", zavri));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("otevrene")) { zavri(); tlacitko.focus(); }
  });
}

/* ---------- Spuštění ---------- */
document.addEventListener("DOMContentLoaded", () => {
  nastavMenu();
  zobrazNabidkuNaUvodu();
  zobrazAkce();
  zobrazTym();
  zobrazFotogalerii();
  zobrazKontakt();
  document.querySelectorAll(".rok").forEach(e => { e.textContent = new Date().getFullYear(); });
});
