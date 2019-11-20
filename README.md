# codehustla - Developer Community 💻

Willkommen in der Codebasis von [codehustla](https://codehustla-production.herokuapp.com/). Ich freue mich sehr, dich hier zu haben. Mit deiner Hilfe können wir [codehustla](https://codehustla-production.herokuapp.com/) ausbauen, weiter entwickeln und debuggen.

## Was ist codehustla?

[codehustla](https://codehustla-production.herokuapp.com/) ist Plattform für den deutschsprachigen Raum, auf der Softwareentwickler Artikel schreiben, an Diskussionen teilnehmen und ihre beruflichen Profile erstellen. Wir legen Wert auf einen unterstützenden und konstruktiven Dialog bei der Verfolgung eines guten Kodex und einer guten Karriere für alle Mitglieder. Das Ökosystem erstreckt sich von Anfängern bis hin zu fortgeschrittenen Entwicklern und alle sind herzlich eingeladen, ihren Platz in unserer Community zu finden. ❤️

## Inhaltsverzeichnis

- [Mitwirkung](#mitwirkung)
- [Codebasis](#codebasis)
  - [Der Stack](#der-stack)
  - [Technische Standards](#technische-standards)
    - [Style Guide](#style-guide)
    - [Husky Hooks](#husky-hooks)
- [Projekt einrichten](#projekt-einrichten)
  - [Voraussetzungen](#voraussetzungen)
  - [Installation](#installation)
  - [Projekt starten](#projekt-starten)
- [Lizenz](#lizenz)

## Mitwirkung

Wir erwarten von den Mitwirkenden, dass sie sich an unseren zugrunde liegenden [Verhaltensregeln](CODE_OF_CONDUCT.md) halten. Alle Gespräche und Diskussionen über GitHub (Probleme, Pull-Anfragen) und über codehustla müssen respektvoll und frei von Belästigungen sein.

### Wo kann ich etwas beitragen

Alle [Issues](https://github.com/badazzdev/codehustla/issues), die mit "approved" gekennzeichnet sind, sind zu vergeben. Informationen zur Kennzeichnung von Problemen findest du in den Definitionen [hier](https://github.com/badazzdev/codehustla/labels).

**Refactoring** Code, z.B. Das Verbessern des Codes ohne Änderung des Verhaltens ist ein Bereich, der wahrscheinlich auf der Grundlage der Intuition durchgeführt werden kann und möglicherweise nicht viel Kommunikation erfordert, um zusammengeführt zu werden.

**Das Beheben von Fehlern** erfordert möglicherweise auch nicht viel Kommunikation, aber je mehr, desto besser. Bitte umrunde Bugfixes mit umfangreichen Tests. Bugs sind Magnete für andere Bugs. Schreibe Tests in der Nähe von Bugs!

**Erstellung von Features** ist der Bereich, der die meiste Kommunikation und / oder Verhandlung erfordert. Jedes Feature ist subjektiv und offen für Diskussionen. Wenn deine Funktion Änderungen am Design des Benutzers beinhaltet, stellen bitte zuerst ein Modell zur Verfügung, damit wir alle auf derselben Seite sind.

1. Forke dir das Projekt und klone es dir lokal
2. Erstellen einen Branch, welchen du entweder als Feature oder Bug bezeichnest: `git checkout -b feature / that-new-feature` oder`Bug / Fixing-that-Bug`
3. Entwickle deine Änderungen und commite sie. Achte darauf, dass du gute Commit-Messages schreibst: `git commit -m 'Add some feature'`
4. Pushe deinen Branch: `Git Push Origin Feature / Das-Neue-Feature`
5. Erstelle einen Pull Request für deinen Branch 🎉

Hinweis: Achte darauf, deine Forks/Branches aktuell zu halten!

## Mitwirkungsrichtlinien

### Erstelle ein Issue

Niemand ist perfekt! Etwas funktioniert nicht oder könnte besser gemacht werden? Lasse es uns wissen, indem du ein Issue erstellst.

#### Erstelle einen Pull-Request

- Versuche, die Pull-Requests klein zu halten. Ein Pull-Request sollte sich nach besten Kräften bemühen, nur ein einziges Anliegen anzusprechen.
- Dokumentiere deine Überlegungen zu den Änderungen. Erkläre, warum du den Code so geschrieben hast, wie du es getan hast. Der Code sollte im besten Fall von selbst erklären, was er tut.

### Die Quintessenz

Wir sind alle Menschen, die versuchen, zusammenzuarbeiten, um die Gemeinschaft zu verbessern. Seie immer freundlich und schätze die Notwendigkeit von Kompromissen. ❤️

### Technische Standards

#### Style Guide

Dieses Projekt benutzt die UI Komponentenlibrary von [https://material-ui.com/](https://material-ui.com/).

Für Javascript folgen wir dem [ESLint](https://eslint.org/docs/rules/) "recommended" Standard, wobei wir zusätzlich [Prettier](https://prettier.io/) verwenden. Wenn du ESLint und Prettier mit einem Texteditor deiner Wahl installiert hast, solltest du einsatzbereit sein.

#### Husky Hooks

Bei Commits wird ein Git-Precommit-Hook über [husky](https://github.com/typicode/husky) und [lint-staged](https://github.com/okonet/lint-staged) ausgeführt. ESLint und Prettier werden auf deinem Code ausgeführt, bevor er commited wird. Wenn es Linting-Fehler gibt, die nicht automatisch behoben werden können, wird der Commit nicht durchgeführt. Du musst dann das Problem manuell beheben und dann erneut versuchen, das Commit durchzuführen.

## Projekt einrichten

Dieser Abschnitt enthält eine allgemeine Anforderungs- und Kurzanleitung.

### Voraussetzungen

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [mongoDB](https://www.mongodb.com/de)

### Installation

1. Stelle sicher, dass alle Voraussetzungen installiert sind.
2. Forke das codehustla Repository, https://github.com/badazzdev/codehustla/fork
3. Klone dein Forked-Repository, dh. `git clone https://github.com/ <Benutzername> / codehustla.git`
4. Richte die Umgebungsvariablen (.env) ein:

- **api .env**  
  MONGO_URI="i.e. mongodb://localhost:27017/name-to-your-app"  
  SECRET_OR_KEY="use-any-secret-you-want"  
  NODEMAILER_SERVICE="nodemailer-service"  
  NODEMAILER_USER="nodemailer-user"  
  NODEMAILER_PASS="nodemailer-pass"  
  CLOUDINARY_API_KEY="cloudinary-api-key"  
  CLOUDINARY_API_SECRET="cloudinary-api-secret"  
  CLOUDINARY_CLOUD_NAME="cloudinary-cloud-name"  
  CLOUDINARY_PATH_POST_TITLE="path-to-post-title"  
  CLOUDINARY_PATH_USER_AVATAR="path-to-user-avatar"  
  ROOT_URL="http://localhost:3000 or https://www.example.io"

- **app .env**  
  SKIP_PREFLIGHT_CHECK=true  
  REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID="Tracking-ID"

5. Führe die Installation der npm-Packages durch

- npm i --prefix packages/app
- npm i --prefix packages/api

**Das war's!**

#### Projekt starten

Starte das Projekt mit "npm run dev". Das Projekt startet auf http://localhost:3000

## Offenlegung von Sicherheitslücken

Solltest du eine Sicherheitslücke in diesem Projekt gefunden oder aufgedeckt haben, freuen wir uns sehr von dir eine E-Mail an mail@badazz.dev mit allen benötigten Informationen zu erhalten.

## Lizenz

Dieses Programm ist freie Software: Du kannst es unter den Bedingungen der von der Free Software Foundation veröffentlichten GNU Affero General Public License, Version 3 der Lizenz, oder (nach deiner Wahl) einer späteren Version weitergeben und / oder ändern. Den vollständigen Text findest du in der Datei [LICENSE] (./ LICENSE.md) in unserem Repository.

Wie bei vielen Open Source-Projekten ist es erforderlich, dass Mitwirkende uns eine Mitwirkenden-Lizenzvereinbarung (Contributor License Agreement, CLA) zur Verfügung stellen. Durch die Übermittlung von Code an das codehustla-Projekt gewährst du uns ein Recht zur Verwendung dieses Codes gemäß den Bedingungen des CLA.

Unsere Version des CLA wurde aus der Microsoft Contributor-Lizenzvereinbarung übernommen, die sie unter Creative Commons CC0 1.0 Universal großzügig öffentlich zugänglich machte.

Bei Fragen sende uns eine E-Mail an mail@badazz.dev

**Happy Coding ❤️**
