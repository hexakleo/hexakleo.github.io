/*
        made by @hexakleo
resume: language selector, date updator, has visited, cursor.
*/

const translations = {
  'en': {
     enter: 'ENTER',
     selectLanguage: 'Select Language'
  },
  'es': {
     enter: 'ENTRAR',
     selectLanguage: 'Seleccionar Idioma'
  }
};

document.addEventListener(
  'DOMContentLoaded', () => {
     const cursor =
        document
        .getElementById(
           'cursor'
        );
     const enterScreen =
        document
        .querySelector(
           '.enter-screen'
        );
     const main =
        document
        .querySelector(
           'main'
        );
     const languageSelector =
        document
        .querySelector(
           '.language-selector'
        );
     const enterText =
        document
        .querySelector(
           '.enter-text'
        );
     let selectedLanguage =
        localStorage
        .getItem(
           'language'
        );
     const hasVisited =
        localStorage
        .getItem(
           'hasVisited'
        );
     document.addEventListener(
        'mousemove', (
           e) => {
           cursor.style
              .left =
              `${e.clientX}px`;
           cursor.style
              .top =
              `${e.clientY}px`;
        }
     );

     function handleEnter() {
        localStorage
           .setItem(
              'hasVisited', 'true'
           );
        enterScreen
           .style
           .opacity =
           '0';
        main.style
           .opacity =
           '1';
        setTimeout
           (() => {
              enterScreen
                 .style
                 .display =
                 'none';
           }, 500);
     }
     if(hasVisited &&
        selectedLanguage
     ) {
        handleEnter
           ();
     } else {
        languageSelector
           .style
           .display =
           'flex';
        enterText
           .style
           .opacity =
           '0.3';
        enterText
           .style
           .pointerEvents =
           'none';
     }
     languageSelector
        .addEventListener(
           'click', (
              e) => {
              if(e.target
                 .classList
                 .contains(
                    'lang-btn'
                 )
              ) {
                 selectedLanguage
                    =
                    e
                    .target
                    .dataset
                    .lang;
                 localStorage
                    .setItem(
                       'language', selectedLanguage
                    );
                 languageSelector
                    .style
                    .display =
                    'none';
                 enterText
                    .style
                    .opacity =
                    '1';
                 enterText
                    .style
                    .pointerEvents =
                    'auto';
                 updateDate
                    ();
              }
           }
        );
     enterText
        .addEventListener(
           'click', handleEnter
        );

     function updateDate() {
        const date =
           new Date();
        const options = {
           weekday: 'long',
           year: 'numeric',
           month: 'long',
           day: 'numeric',
           hour: '2-digit',
           minute: '2-digit'
        };
        document.getElementById(
              'date'
           )
           .textContent =
           date
           .toLocaleDateString(
              selectedLanguage ===
              'es' ?
              'es-ES' :
              'en-US', options
           );
     }
     updateDate();
     setInterval(updateDate, 60000);
});