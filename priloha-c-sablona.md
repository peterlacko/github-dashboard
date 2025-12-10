# AI Workflow Dokumentácia

**Meno: Peter Lacko**

**Dátum začiatku:**

**Dátum dokončenia:**

**Zadanie:** Frontend / Backend

---

## 1. Použité AI Nástroje

Vyplň približný čas strávený s každým nástrojom:

- [x] **Cursor IDE:** **0.5** hodín
- [x] **Claude Code:** **4** hodín
- [ ] **GitHub Copilot:** **\_** hodín
- [ ] **ChatGPT:** **\_** hodín
- [ ] **Claude.ai:** **\_** hodín
- [ ] **Iné:**

**Celkový čas vývoja (priližne):** **6** hodín

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
/generate-prp INITIAL_part1.md
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
⭐⭐⭐⭐ Dobré, potreboval malé úpravy

**Úpravy:**

```
vid prompty nizsie
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
⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
**Úpravy:**

```
Zmenil sirku search baru, musel som upravit rucne.
```

**Poznámky:**

```
Tlacitko "Go to dashboard" dal pod profil nie pod datum ako som chcel, ale nechal som to tak lebo som s tym bol spokojny.
```

---

### Prompt #8: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude

**Kontext:** male upravy v appke

**Prompt:**

```
Update implementation so that only repos of searchedUser are displayed instead of authUser
```

**Výsledok:**
✅ Fungoval perfektne (first try)

**Úpravy:**

```
Ziadne
```

**Poznámky:**

```
Najprv som apku testoval so svojim userom a nevsimol som si ze sa zobrazuju repozitare prihlasenehu usera a nie hladaneho, tak som som to fixol tymto promptom.
Prekvapilo ma ze si pytal povolenie na vykonanie cat & grep nad codebase aby mohol precitat nejake subory, nerozumiem preco.
```

---

### Prompt #9: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude

**Kontext:** male upravy v appke

**Prompt:**

```
Update implementation so that when user clicks "Go to my dashboard", searchedUser will be preserved and his info with repos will be displayed on dashboard page. Also add button to Dashboard "Return to home page" which will take user back to home page and reset searchedUser
```

**Výsledok:**
✅ Fungoval perfektne (first try)

**Úpravy:**

```
Odstranil som tlacitko lebo sa mi tam nehodilo.
```

**Poznámky:**

```
Po tomto komande zrazu upravil jednoduche uvodzovky za dvojite v jednom z PRP. Toto som absolutne nepochopil.
```

---

### Prompt #7: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Nástroj:** Claude

**Kontext:** posledne upravy v appke

**Prompt:**

```
Searching for user on dashboard does not work now. Fix it
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
Pri druhom PRP som nejednoznacne specifikoval ktory user sa ma zobrazit na dashboarde a tak zobrazil aktualne lognuteho usera namiesto hladaneho.
```

**Prečo to vzniklo:**

```
Myslim ze som v INITIAL_part2 neoddedil dostatocne pojmy logged user a searched user.
```

**Ako som to vyriešil:**

```
Pozrel som kod co vygeneroval a napisal prompt 8 kde som podla jeho vzoru rozlisil authUser a searchedUser, implementaciu opravil.
```

**Čo som sa naučil:**

```
AI nevie citat myslienky, nejednoznacne veci treba spravne rozlisit a pomenovat.
```

**Screenshot / Kód:** [ ] Priložený

---

### Problém #2: **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Čo sa stalo:**

```
Pri druhom spusteni generate-prp claude neulozil PRP subor, len ho vytlacil do terminalu a po mojom approve zacal rovno s implementaciou. Proces som prerusil, zacal odznova a pred approvom ulozenie explicitne pripomenul a potom to uz slo hladko. PRP som si pozrel, vygeneroval 1595 riadkov.
```

**Prečo:**

```
Neviem. V generate-prp je jasne napisane ze to ma ulozit, pri prvom spusteni to ulozilo PRP bez vyzvy.
```

**Riešenie:**

```
Vyzval som ho v prompte pred implementaciou aby subor najskor ulozil, a on ho ulozil.
```

**Learning:**

```

```

## 4. Kľúčové Poznatky

### 4.1 Čo fungovalo výborne

**1.**

```
Prva cast fungovala bez chyby.
```

**2.**

```
Oauth fungoval na prvy pokus co som vobec necakal.
```

**3.**

```
Import z figmy fungoval tiez vyborne.
```

**[ Pridaj viac ak chceš ]**
Celkovo som bol s vysledkom velmi spokojny, viem si predstavit ze ak by som vsetko dostatocne specifikoval tak staci dva prompty.

---

### 4.2 Čo bolo náročné

**1.**

```
Vyslovene narocne nebolo nic, v jednom kroku zrazu upravil sirku search baru co som musel manualne upravit - bola to moja jedina rucna uprava spolu s odstranenim tlacidla na "Go back Home".
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
Cim lepsia specifikacia, tym lepsi vysledok, ci uz sa jedna o kontext alebo o prompt.
```

**2.**

```
Robit /clear po vacsich zmenach, nerobit clear medzi mensimi zmenami, znova si potom musi nacitat codebase.
```

**3.**

```
Jasne rozlisovat zamenitelne pojmy - napr auth user vs searched user.
```

**4.**

```
AI niekedy bezdovodne halicinuje - napr zmena uvodzoviek z obycajnych na dvojite. V realnej appke VZDY kontrolovat kazdy riadok.
```

**5.**

```
Zda sa mi ze je to lepsie na projekty s "na zelenej trave" a na genericke veci, netreba ocakavat ze odhali zlozitejsi bug (aj z prvej skusenosti na inom projekte)
```

---

### 4.4 Moje Top 3 Tipy Pre Ostatných

**Tip #1:**

```
Pouzivat context engineering
```

**Tip #2:**

```
Cim lepsi context a prompt tym lepsi vysledok. Najprv sa nad problemom musis zamysliet ty a az potom to mozes dat s co najlepsou specifikaciou AI.
```

**Tip #3:**

```
Necakaj ze AI za teba bude premyslat.
```

---

## 6. Reflexia a Závery

### 6.1 Efektivita AI nástrojov

**Ktorý nástroj bol najužitočnejší?** **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

Claude AI

**Prečo?**

```
Ma najvacsi kontext, dava najlepsie vysledky.
```

**Ktorý nástroj bol najmenej užitočný?** **\*\***\*\*\*\***\*\***\_**\*\***\*\*\*\***\*\***

**Prečo?**

```
Na projekt som pouzil iba Claude ktory bezal v Cursore.
```

---

### 6.2 Najväčšie prekvapenie

```
Najviac ma prekvapilo vygenerovanie PRP, ktore je neskutocne detailne, precizne a je v nom osetrenych mnostvo use casov na ktore som vobec nemyslel. S copilotom a trocha s cursorom som mal skusenosti aj predtym, ale claude je uplne iny level.

Prekvapilo ma tiez ze si claude pytal povolenie na pustenie `cat` a `grep` nad codebase. Myslel som ze ked to ma zaindexovane tak nic take potrebovat nebude.
```

---

### 6.3 Najväčšia frustrácia

```
Ziadna, islo to celkom v pohode
```

---

### 6.4 Najväčší "AHA!" moment

```
Velky aha moment som nemal.
```

---

### 6.5 Čo by som urobil inak

```
Lepsie by som sa zamyslel pri druhom INITIALe a popisal mu viacero use casov. Mozno by som sa vyhol dodatocnym promptom.
```

### 6.6 Hlavný odkaz pre ostatných

```
Nech si to skusia a uvidia, pri spravnom pouzivanie to vie zasadnym sposobom zefektivnit a skvalitnit pracu.
```
