<p align="center">
  <picture>
   <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-light-no-text_ok9auy.svg">
   <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-dark-no-text_fqqdq9.svg">
   <img alt="Animo Logo" height="250px" />
  </picture>
</p>

<h1 align="center" ><b>Siera Desktop</b></h1>

<h4 align="center">Powered by &nbsp;
<picture>
<source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656579715/animo-logo-light-text_cma2yo.svg">
<source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656579715/animo-logo-dark-text_uccvqa.svg">
<img alt="Animo Logo" height="12px" />
</picture>
</h4><br>

<!-- TODO: Add relevant badges, like CI/CD, license, codecov, etc. -->

<p align="center">
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg" />
  </a>
  <a href="https://yarnpkg.com">
    <img src="https://img.shields.io/badge/yarn-workspaces-2188b6" />
  </a>
</p>

<p align="center">
  <a href="#packages">Packages</a> 
  &nbsp;|&nbsp;
  <a href="#getting-started">Getting started</a> 
  &nbsp;|&nbsp;
  <a href="#usage">Usage</a> 
  &nbsp;|&nbsp;
  <a href="#contributing">Contributing</a> 
  &nbsp;|&nbsp;
  <a href="#contributing">License</a> 
</p>

---

**Siera Desktop** is a desktop app that allows you to interact with **AFJ** agent. It is built using Electron and React.

- **Connections** to manage connections with other agents
- **Credentials** to manage received credentials
- **Proofs** to manage received proof requests
- **Local Agent** to manage a local included agent

If you are looking for more information about the concepts and tutorials on how to use the Desktop app we recommend you check out our [docs](https://docs.siera-desktop.animo.id/).

## Installation

Check out the [installation guide](https://docs.siera-desktop.animo.id/getting-started/installation) for more information.

## Contributing

Is there something you'd like to fix or add to the Desktop app? Great! We 💗 community
contributions. [Get involved](https://docs.siera-desktop.animo.id/community/contributing).

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [LibIndy](https://aries.js.org/guides/getting-started/installation/nodejs)

### Installation

1. Clone the repository

```bash
git clone https://github.com/animo/siera-desktop.git
```

2. Install dependencies

```bash
yarn install
```

3. Start the app in development mode

```bash
yarn start
```