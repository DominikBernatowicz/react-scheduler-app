# Kalendarz Aplikacja

## Opis

React Scheduler App to aplikacja do zarządzania kalendarzem, która umożliwia użytkownikom planowanie wydarzeń oraz logowanie i rejestrację przy użyciu Firebase Authentication. Użytkownicy mogą tworzyć, edytować i usuwać wydarzenia, przeglądać je w widokach dziennym, tygodniowym i miesięcznym.

## Technologie

- **React**: Biblioteka do budowy interfejsu użytkownika.
- **TypeScript**: Dodaje typowanie do JavaScriptu.
- **Material-UI**: Komponenty UI dla Reacta.
- **DevExpress Scheduler**: Komponent kalendarza.
- **Firebase**: Backend do przechowywania danych i hostingu.
  - **Realtime Database**: Przechowuje i synchronizuje dane o wydarzeniach.
  - **Hosting**: Umożliwia publikację aplikacji w internecie.
  - **Authentication**: Logowanie i rejestracja użytkowników.
- **React Router**: Nawigacja między widokami
- **ESLint & Prettier**: Linting i formatowanie kodu

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
     npm run dev
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

## Rozwój
Planuję dodać następujące funkcjonalności do aplikacji:

  - **Responsywność**: Dostosowanie interfejsu do urządzeń mobilnych, aby zapewnić optymalne doświadczenie na różnych ekranach.
  - **Nowy formularz**: Utworzenie niestandardowego formularza do dodawania i edytowania wydarzeń, aby umożliwić bardziej elastyczną walidację z wykorzystaniem useForm i biblioteki yup. Ułatwi to dodawanie dedykowanych komunikatów walidacyjnych oraz kontrolę nad walidacją pól, takich jak tytuł wydarzenia i zakres dat.
  - **Autoryzacja**: Poprawienie wyglądu formularza logowania i rejestracji.

## Testowanie

Aby przetestować działającą aplikację, możesz się zalogować przy użyciu poniższych danych testowych:
  - Login: `test@test.pl`
  - Hasło: `testtest`

Odwiedź: [Live Demo](https://react-scheduler-app.web.app)
