# Wdrożenie — GitHub + Netlify

Strona jest statyczna (HTML + JSX ładowany w przeglądarce). Sekcja **portfolio**
buduje się z pliku `portfolio/manifest.json`, a ten plik powstaje automatycznie
ze skanu katalogu `portfolio/` podczas builda na Netlify.

## Otwieranie z dysku / paczki ZIP (offline)

Gotowa, samodzielna wersja strony to **`index.html`**. Cały kod (React, Babel),
fonty oraz dane portfolio są **wbudowane w plik** — nie wymaga internetu ani
serwera. Po rozpakowaniu ZIP-a wystarczy **dwuklik w `index.html`**.

> Wcześniejszy pusty ekran brał się stąd, że plik pobierał React/Babel z
> internetu (CDN), a przeglądarka blokuje to przy otwieraniu z dysku (`file://`).
> `index.html` ma już wszystko w środku, więc działa od razu.

> Miniatury i wideo wczytują się ze ścieżek względnych (`portfolio/...`,
> `assets/...`), więc **nie przenoś** `index.html` poza folder — katalogi
> `portfolio/` i `assets/` muszą zostać obok niego.

> Uwaga przy edycji: źródłem jest `KROLLEWICZ Portfolio.html` (+ `app.jsx`,
> `portfolio.jsx`, `tweaks-panel.jsx`, `image-slot.js`). Po zmianach trzeba
> **przebudować `index.html`** (samodzielną paczkę). Na hostingu (Netlify)
> działa również edytowalne źródło, bo tam dozwolony jest internet i `fetch`.

## 1. Pierwsze podłączenie (raz)

1. Wrzuć cały projekt do repozytorium na GitHubie (razem z `package.json`,
   `netlify.toml` i całym katalogiem `portfolio/`, w tym `thumbs/` i `full/`).
2. Na Netlify: **Add new site → Import an existing project → GitHub** i wskaż repo.
3. Ustawienia builda Netlify pobierze z `netlify.toml` automatycznie:
   - **Build command:** `npm run build`
   - **Publish directory:** `.`
   Nie trzeba nic wpisywać ręcznie. Kliknij **Deploy**.

> Strona główna („/") serwuje **`index.html`** automatycznie (samodzielna,
> samowystarczalna wersja). Edytowalne źródło to `KROLLEWICZ Portfolio.html`.

## 2. Dodawanie nowego projektu (codzienny workflow)

1. Utwórz katalog w `portfolio/`, np. `portfolio/nowa_kampania/`.
2. Wrzuć do środka pliki: zdjęcia (`.jpg/.png/.webp`) i/lub wideo (`.mp4/.webm/.mov`).
3. (opcjonalnie) dodaj `portfolio/nowa_kampania/project.json`:
   ```json
   {
     "title": "Nowa Kampania",
     "client": "Klient",
     "category": "CAMPAIGN / OOH",
     "year": "2026",
     "wide": true,        // true = 2 kafle (poziome), false = 1 kafel (pionowe)
     "cover": "main.jpg"  // która grafika/film jako okładka
   }
   ```
   Bez tego pliku tytuł powstanie z nazwy folderu, a orientacja (1 vs 2 kafle)
   zostanie wykryta automatycznie z wymiarów okładki (wideo domyślnie pionowe).
4. `git add . && git commit -m "Nowy projekt" && git push`
5. Netlify sam zrobi rebuild: skrypt `portfolio/build-manifest.mjs` wygeneruje
   miniatury (`thumbs/`) i wersje pełne (`full/`) z Twoich plików, przepisze
   `manifest.json`, a strona pokaże nowy projekt — z animacją „NOWY".

To wszystko. **Wrzucasz folder → commit → push → projekt jest na stronie.**

## 3. Reguły kafli

- **Poziome** projekty (okładka pozioma) zajmują **2 kafle** w rzędzie.
- **Pionowe** projekty oraz **pionowe wideo** zajmują **1 kafel**.
- Wszystkie kafle mają jednolitą wysokość; miniatury są kadrowane (cover).
- Wideo na siatce: zapętlone pierwsze **5 s, bez dźwięku**. Pełny film z dźwiękiem
  otwiera się po kliknięciu w projekt.

## 4. Uruchomienie lokalnie (podgląd przed pushem)

```bash
npm install          # instaluje sharp (generator miniatur)
npm run build        # przebudowuje portfolio/manifest.json
```

Bez `sharp` skrypt też zadziała — wtedy użyje już istniejących miniatur
z `thumbs/`/`full/` (nie wygeneruje nowych).
