# AI Workflow Dokumentácia

**Meno: Peter Lacko**

**Dátum začiatku:**

**Dátum dokončenia:**

**Zadanie:** Frontend / Backend

---

## 1. Použité AI Nástroje

Vyplň približný čas strávený s každým nástrojom:

- [ ] **Cursor IDE:** **\_** hodín
- [ ] **Claude Code:** **\_** hodín
- [ ] **GitHub Copilot:** **\_** hodín
- [ ] **ChatGPT:** **\_** hodín
- [ ] **Claude.ai:** **\_** hodín
- [ ] **Iné:**

**Celkový čas vývoja (priližne):** **\_** hodín

---

## 2. Zbierka Promptov

> 💡 **Tip:** Kopíruj presný text promptu! Priebežne dopĺňaj po každej feature.

### Prompt #1: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude Code  
**Kontext:** Import style guides

**Prompt:**

```
import following style guides from figma: color: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-313&t=BEB9oQc3q4lAGtxE-4, typography: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-131&t=BEB9oQc3q4lAGtxE-4, spacing: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-164&t=BEB9oQc3q4lAGtxE-4, radius: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-251&t=BEB9oQc3q4lAGtxE-4
```

**Výsledok:**  
 ✅ Fungoval perfektne (first try)

**Čo som musel upraviť / opraviť:**
Nic

**Poznámky / Learnings:**

### Prompt #2: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude
**Kontext:** generate-prp

**Prompt:**

```
/generate-prp INITIAL_part1.md + /clear (spotrebovana polovica contextu)
```

**Výsledok:**
✅ Fungoval perfektne (first try)

**Úpravy:**

```
Ziadne
```

**Poznámky:**

```
Vygeneroval 686 riadkov, osetril v nom aj use case ktore som nespomenul. Subor som si presiel, vyzeralo to OK.
Nezapol som plan mode tak ako to bolo vo videu, neviem co by sa zmenilo ak by som ho zapol, skusim pri dalsom commande.
```

---

### Prompt #3: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude
**Kontext:** execute-prp

**Prompt:**

```
/execute-prp PRPS/github-user-search.md
```

**Výsledok:**
✅ Fungoval perfektne (first try)

**Úpravy:**

```
Musel som este upravit search button, nakolko som design tlacitka z figmy nezahrnul do INITIAL.md.
Myslel som ze to zvladne bez toho. Vid dalsi prompt.
```

**Poznámky:**

---

### Prompt #4: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude
**Kontext:** update search button

**Prompt:**

```
Update search button in SearchBar to follow design from figma: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-172&t=BEB9oQc3q4lAGtxE-4
```

**Výsledok:**
✅ Fungoval perfektne (first try)

**Úpravy:**

```
Ziadne
```

**Poznámky:**

---

### Prompt #5: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude
**Kontext:** generate-prp 2

**Prompt:**

```
/generate-prp INITIAL_part2.md
```

**Výsledok:**
✅ Fungoval perfektne (first try) ale musel som prikaz prerusit, vid poznamky

**Úpravy:**

```
Ziadne
```

**Poznámky:**

```
Ked som to spustil prvykrat, tak claude neulozil PRP subor, len ho vytlacil do terminalu a po mojom approve zacal rovno s implementaciou. Proces som prerusil, zacal odznova a aj teraz po vygenerovani PRP sa ho myslim si nechystal ulozit do suboru. Tak som mu to pred approvom explicitne pripomenul a potom to uz slo hladko. PRP som si pozrel, vygeneroval 1595 riadkov.
```

---

### Prompt #6: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude

**Kontext:** execute-prp

```
/execute-prp PRPS/github-oauth-authentication.md
```

**Výsledok:**
✅ Fungoval perfektne (first try)

**Úpravy:**

```
Ziadne
```

**Poznámky:**

```
Prikaz fungoval na moje pocudovanie skvele, funguje prihlasenie, dashboard routa, logout, zoznam repozitarov. Chyba len preklik na dashboard a search bar v dashboarde, co som ale nespecifikoval a nepokladam to za chybu implementacie.
```

---

### Prompt #7: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude

**Kontext:** male upravy v appke

**Prompt:**

```
Update implementation to display SearchBar also on dashboard page. If user is logged in, display link to dashboard on Home page, under "Joined" info
```

**Výsledok:**
✅ Fungoval perfektne (first try)

**Úpravy:**

```
Ziadne
```

**Poznámky:**

```

```

---

## 3. Problémy a Riešenia

> 💡 **Tip:** Problémy sú cenné! Ukazujú ako riešiš problémy s AI.

### Problém #1: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Čo sa stalo:**

```
[Detailný popis problému - čo nefungovalo? Aká bola chyba?]
```

**Prečo to vzniklo:**

```
[Tvoja analýza - prečo AI toto vygeneroval? Čo bolo v prompte zlé?]
```

**Ako som to vyriešil:**

```
[Krok za krokom - čo si urobil? Upravil prompt? Prepísal kód? Použil iný nástroj?]
```

**Čo som sa naučil:**

```
[Konkrétny learning pre budúcnosť - čo budeš robiť inak?]
```

**Screenshot / Kód:** [ ] Priložený

---

### Problém #2: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Čo sa stalo:**

```

```

**Prečo:**

```

```

**Riešenie:**

```

```

**Learning:**

```

```

## 4. Kľúčové Poznatky

### 4.1 Čo fungovalo výborne

**1.**

```
[Príklad: Claude Code pre OAuth - fungoval first try, zero problémov]
```

**2.**

```

```

**3.**

```

```

**[ Pridaj viac ak chceš ]**

---

### 4.2 Čo bolo náročné

**1.**

```
[Príklad: Figma MCP spacing - často o 4-8px vedľa, musel som manuálne opravovať]
```

**2.**

```

```

**3.**

```

```

---

### 4.3 Best Practices ktoré som objavil

**1.**

```
[Príklad: Vždy špecifikuj verziu knižnice v prompte - "NextAuth.js v5"]
```

**2.**

```

```

**3.**

```

```

**4.**

```

```

**5.**

```

```

---

### 4.4 Moje Top 3 Tipy Pre Ostatných

**Tip #1:**

```
[Konkrétny, actionable tip]
```

**Tip #2:**

```

```

**Tip #3:**

```

```

---

## 6. Reflexia a Závery

### 6.1 Efektivita AI nástrojov

**Ktorý nástroj bol najužitočnejší?** **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Prečo?**

```

```

**Ktorý nástroj bol najmenej užitočný?** **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Prečo?**

```

```

---

### 6.2 Najväčšie prekvapenie

```
[Čo ťa najviac prekvapilo pri práci s AI?]
```

---

### 6.3 Najväčšia frustrácia

```
[Čo bolo najfrustrujúcejšie?]
```

---

### 6.4 Najväčší "AHA!" moment

```
[Kedy ti došlo niečo dôležité o AI alebo o developmente?]
```

---

### 6.5 Čo by som urobil inak

```
[Keby si začínal znova, čo by si zmenil?]
```

### 6.6 Hlavný odkaz pre ostatných

```
[Keby si mal povedať jednu vec kolegom o AI development, čo by to bylo?]
```
