# Kalendarz Aplikacja

## Opis

Aplikacja Kalendarza to podstawowe narzędzie do zarządzania wydarzeniami z możliwością dodawania, edytowania i usuwania wydarzeń. Obsługuje widoki dzienny, tygodniowy i miesięczny.

## Technologie

- **React**: Biblioteka do budowy interfejsu użytkownika.
- **TypeScript**: Dodaje typowanie do JavaScriptu.
- **Material-UI**: Komponenty UI dla Reacta.
- **DevExpress Scheduler**: Komponent kalendarza.
- **Firebase**: Backend do przechowywania danych i hostingu.
  - **Realtime Database**: Przechowuje i synchronizuje dane o wydarzeniach.
  - **Hosting**: Umożliwia publikację aplikacji w internecie.

## Instalacja

1. **Klonowanie repozytorium:**

   ```bash
   git clone https://github.com/DominikBernatowicz/react-scheduler-app
   cd react-scheduler-app
   ```

2. **Instalacja zależności**

   ```bash
   npm install
   ```
   
4.  **Konfiguracja Firebase:**
   
       Utwórz plik .env w głównym katalogu projektu i dodaj swoje klucze API Firebase.

6.  **Uruchomienie lokalne:**
   
     ```bash
     npm start
     ```

## Wdrążenie

1. **Budowanie aplikacji:**

   ```bash
   npm run build
   ```

2. **Wdrożenie na Firebase:**
   
   ```bash
   firebase deploy
   ```

## Testowanie

  Aby przetestować aplikację, wejdź na stronę https://react-scheduler-app.web.app/ po wdrożeniu lub uruchom lokalnie aplikację jak opisano powyżej.
