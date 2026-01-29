# Aplikacja Pogodowa

Aplikacja do wyświetlania prognozy pogody stworzona w React z wykorzystaniem TypeScript.

## Wymagania

- Node.js (wersja 18 lub nowsza)
- npm

## Instalacja

1. Sklonuj lub pobierz repozytorium
2. Zainstaluj zależności:

```bash
npm install
```

## Uruchomienie

### Tryb deweloperski

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:5173

### Budowanie wersji produkcyjnej

```bash
npm run build
```

Zbudowane pliki znajdą się w katalogu `dist/`.

### Podgląd wersji produkcyjnej

```bash
npm run preview
```

## Konfiguracja API pogodowego

Aplikacja domyślnie używa danych testowych (mock). Aby korzystać z prawdziwych danych pogodowych:

1. Zarejestruj się na [OpenWeatherMap](https://openweathermap.org/api)
2. Uzyskaj darmowy klucz API
3. Otwórz plik `src/api/weatherApi.ts`
4. Zamień `YOUR_API_KEY_HERE` na swój klucz API:

```typescript
const API_KEY = 'twój_klucz_api';
```

## Funkcjonalności

### Podstawowe
- Lista 6 polskich miast na stronie głównej
- Szczegóły pogody dla każdego miasta:
  - Aktualna temperatura
  - Ikona warunków pogodowych
  - Prognoza na 5 dni
  - Prawdopodobieństwo opadów, ich rodzaj i ilość
  - Prędkość i kierunek wiatru
  - Stopień zachmurzenia

### Dodatkowe
- Zmiana jednostek temperatury (Celsjusz/Fahrenheit/Kelvin)
- Wyszukiwanie miast po nazwie
- Oznaczanie ulubionych miast (ikona gwiazdki)
- Osobna strona z ulubionymi miastami
- Zapisywanie ustawień w localStorage (jednostki i ulubione)
- Integracja z OpenWeatherMap API

## Technologie

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Axios

## Struktura projektu

```
src/
├── api/           # Serwis API pogodowego
├── components/    # Komponenty wielokrotnego użytku
├── pages/         # Strony aplikacji
├── store/         # Konfiguracja Redux
├── types/         # Definicje typów TypeScript
├── App.tsx        # Główny komponent z routingiem
├── App.css        # Style aplikacji
└── main.tsx       # Punkt wejścia
```

## Użyte hooki React

- `useState` - zarządzanie stanem lokalnym
- `useEffect` - pobieranie danych
- `useCallback` - optymalizacja funkcji
- `useMemo` - optymalizacja obliczeń
- `useSelector` / `useDispatch` - integracja z Redux
