<div align="center">
  
# hexa personal website

> ngl just a clean af personal website

[![Deploy](https://img.shields.io/github/deployments/hexakleo/hexakleo.github.io/github-pages?style=flat-square&label=deploy)](https://hexakleo.github.io)
[![Made with](https://img.shields.io/badge/made_with-❤️-ff69b4?style=flat-square)](https://github.com/hexakleo)

</div>

## download

```bash
git clone https://github.com/hexakleo/hexakleo.github.io.git
cd hexakleo.github.io && open index.html
```

## usage

```typescript
interface hexa {
  entry: () => void;
  selectLang: (lang: 'en' | 'es') => void;
  explore: () => Promise<void>;
}

const start: HexaUI = {
  entry: () => openWebsite(),
  selectLang: (lang) => chooseLanguage(lang),
  explore: async () => await enjoyTheExperience()
}
```

## struct

```
hexa-ui/
├──  index.html           // main entry
├──  css/                // css folder
│   └── main.css        // global styles
├──  js/               // js folder
│   └── main.js       // interactions
└── README.md        // you are here man'
```

## links

- Website: [hexakleo.github.io](https://hexakleo.github.io)
- GitHub:  [@hexakleo](https://github.com/hexakleo)

<div align="center">
  <sub>built by <a href="https://github.com/hexakleo">@hexakleo</a></sub>
</div>
