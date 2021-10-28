<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo-new.svg">
    </a>
</p>

<h1>
iView Admin
    <h3>Vue.js 2.0 admin management system template based on iView.</h3>
</h1>

[![](https://img.shields.io/github/release/iview/iview-admin.svg)](https://github.com/iview/iview-admin/releases)
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.17-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-3.2.2-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)
[![npm](https://img.shields.io/npm/l/express.svg)]()

## Introduction

iView Admin is a front-end management background integration solution. It based on [Vue.js](https://github.com/vuejs/vue) and use the UI Toolkit [iView](https://github.com/iview/iview).

- [Document](https://lison16.github.io/iview-admin-doc/)
- [Preview](https://admin.iviewui.com/)
- [Base template recommends using](https://github.com/iview/iview-admin/tree/template)

![image](https://file.iviewui.com/admin-dist/admin-preview.png)

## Prototype

- link: https://www.xiaopiu.com/project?proid=61713e6168c1f7888b2d513f
- doc: [path](./docs/界面原型实现.docx)
- 用户反馈：符合用户预期

## Features

- Login / Logout
- Permission Authentication
    - A list of filters
    - Permission to switch
- i18n
- Components
    - Rich Text Editor
    - Markdown Editor
    - City Cascader
    - Photos preview and edit
    - Draggable list
    - File upload
    - Digital gradient
    - split-pane
- Form
    - The article published
    - Workflow
- Table
    - Drag-and-drop sort
    - Searchable form
    - Table export data
        - Export to Csv file
        - Export to Xls file
    - Table to picture
- Error Page
    - 403
    - 404
    - 500
- Router
    - Dynamic routing
    - With reference page
- Theme
- Shrink the sidebar
- Tag navigation
- Breadcrumb navigation
- Full screen / exit full screen
- Lock screen
- The message center
- Personal center

## Getting started
```bush
# clone the project
git clone https://github.com/iview/iview-admin.git

// install dependencies
npm install

// develop
npm run dev
```

## Build
```bush
npm run build
```

## Q&A

- ```shell
  Invalid options in vue.config.js: "baseUrl" is not allowed
  ```

  Since baseUrl was abolished after vue-cli.3.3 version, publicPath was used instead, just replace baseUrl with publicPath.

- ```shell
  TypeError: Cannot read property 'version' of undefined
  ```

  Delete node_modules and reinstall using ```npm install```

- ```shell
  Syntax Error: TypeError: eslint.CLIEngine is not a constructor
  ```

  Reinstall the ESLint with a low version or change lintOnSave to false in the vue.config.js file.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, TalkingData
