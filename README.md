<p align="center">
   <img src="./github/keep-coding.png" width="100%"/>
</p>

# 📧 GoCommerce API

[![Author](https://img.shields.io/badge/author-fernandogatto-%2bd361)](https://github.com/fernandogatto/)
[![Languages](https://img.shields.io/github/languages/count/fernandogatto/go-commerce-api?color=%2bd361)](#)
[![Stars](https://img.shields.io/github/stars/fernandogatto/go-commerce-api?color=%2bd361)](https://github.com/fernandogatto/go-commerce-api/stargazers)
[![Forks](https://img.shields.io/github/forks/fernandogatto/go-commerce-api?color=%2bd361)](https://github.com/fernandogatto/go-commerce-api/network/members)
[![Contributors](https://img.shields.io/github/contributors/fernandogatto/go-commerce-api?color=%2bd361)](https://github.com/fernandogatto/go-commerce-api/graphs/contributors)
[![License](https://img.shields.io/badge/license-MIT-%2bd361)](https://choosealicense.com/licenses/mit/)

> This is the 9th challenge from GoStack Bootcamp, organized by [Rocketseat](https://rocketseat.com.br/). The objective is to create an application similiar to an ecommerce, that allow the creation of customers, products and orders, where the customer can generate new purchase orders for certain products.

## 🔗 Table of contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Starting](#starting)
- [Status codes](#status)
- [Contribute](#contribute)
- [License](#license)

## 📚 Features <a name="features"/>

- Customers | Create and Read
- Orders | Create and Read
- Products | Create and Read

## 📌 Technologies <a name="technologies"/>

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)

## 📂 Installation <a name="installation"/>

First of all, it is important that you have installed [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/).

So, run this command in terminal to clone the project via HTTPS:

```bash
git clone https://github.com/fernandogatto/go-commerce-api.git
```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have a SSH key registered in your Github account, clone the project using this command:

```bash
git@github.com:fernandogatto/go-commerce-api.git
```
## 🚀 Starting <a name="starting"/>

ORM configuration is on ```ormconfig.json```. There you can configure your database settings.

So, run the following command in order in terminal:

```bash
# Start the server
yarn dev:server

# Run tests
yarn test
```

## ⚙ Status codes <a name="status"/>

| Status   | Description           |
| ---      | ---                   |
| 200      | OK                    |
| 400      | BAD REQUEST           |
| 404      | NOT FOUND             |
| 500      | INTERNAL SERVER ERROR |

## 👍 Contribute <a name="contribute"/>

- Fork this repository.
- Create a branch with your resource: ```git checkout -b my-feature```
- Submit changes: ```git commit -m "feat: My new feature"```
- Push your branch: ```git push origin my-feature```

## 📕 License <a name="license"/>

Released in 2020. This project is under the [MIT License](https://choosealicense.com/licenses/mit/).

Build with 💜 by [Fernando Gatto](https://github.com/fernandogatto/).
