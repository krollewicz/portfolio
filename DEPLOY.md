# Wdrożenie — GitHub + Netlify

Strona jest statyczna (HTML + JSX ładowany w przeglądarce). Sekcja **portfolio**
buduje się z pliku `portfolio/manifest.json`, a ten plik powstaje automatycznie
ze skanu katalogu `portfolio/` podczas builda na Netlify.

## 1. Pierwsze podłączenie (raz)

1. Wrzuć cały projekt do repozytorium na GitHubie (razem z `package.json`,
   `netlify.toml` i całym katalogiem `portfolio/`, w tym `thumbs/` i `full/`).
2. Na Netlify: **Add new site → Import an existing project → GitHub** i wskaż repo.
3. Ustawienia builda Netlify pobierze z `netlify.toml` automatycznie:
   - **Build command:** `npm run build`
   - **Publish directory:** `.`
   Nie trzeba nic wpisywać ręcznie. Kliknij **Deploy**.

> Strona główna („/") jest przekierowana na `KROLLEWICZ Portfolio.html`
> (patrz `netlify.toml`). Jeśli wolisz, zmień nazwę pliku na `index.html`
> i usuń sekcję `[[redirects]]`.

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
