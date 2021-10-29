<h1>
	Edge Calculating Software System
    <h3>Vue.js 2.0 frontend based on iView.</h3>
</h1>
[![npm](https://img.shields.io/npm/l/express.svg)]()
[![vue](https://img.shields.io/badge/vue-2.5.17-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-3.2.2-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)

## Prototype

- link: https://www.xiaopiu.com/project?proid=61713e6168c1f7888b2d513f
- doc: [path](./docs/界面原型实现.docx)
- User Feedback: The frontend design almost meets user’s expectation. It’s better to use bpmn.js as GUI for process configuration.

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
git clone https://github.com/AdvancedSoftwareDevelopment2021/frontend-cloud

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

Copyright (c) 2021, Shanghai Jiao Tong University





[![](https://img.shields.io/github/release/iview/iview-admin.svg)](https://github.com/iview/iview-admin/releases)
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
