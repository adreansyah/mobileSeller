const modulePath = 'src/store/reducers/index.js'
const moduleEpic = 'src/store/epics/index.js'
module.exports = function(plop) {
    // create your generators here
    plop.setGenerator('create_component_artisan', {
        description: 'create page component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'type PATH_NAME/FILE_NAME or FILE_NAME',
            },
        ],
        actions: [
            {
                type: 'add',
                path: `src/page/{{name}}.js`,
                templateFile: 'plop-templates/component.js.hbs',
            },
        ],
    })
    plop.setGenerator('create_actions_artisan', {
        description: 'crate action Redux',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'type store action name',
            },
        ],
        actions: [
            {
                type: 'add',
                path: `src/store/actions/{{name}}.js`,
                templateFile: 'plop-templates/actions.js.hbs',
            },
        ],
    })
    plop.setGenerator('create_epics_artisan', {
        description: 'create epic Redux',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'type store epic name',
            },
        ],
        actions: [
            {
                type: 'add',
                path: `src/store/epics/epic{{pascalCase name}}.js`,
                templateFile: 'plop-templates/epics.js.hbs',
            },
            {
                type: 'modify',
                path: moduleEpic,
                pattern: /(\/\/ IMPORT MODULE FILES)/g,
                template:
                    '$1\nimport { Request{{pascalCase name}} } from "./epic{{pascalCase name}}";',
            },
            {
                type: 'modify',
                path: moduleEpic,
                pattern: /(\/\/ MODULES VARIABLE)/g,
                template: '$1\n\tRequest{{pascalCase name}},',
            },
        ],
    })
    plop.setGenerator('create_reducers_artisan', {
        description: 'create reducer Redux',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'type store reducer name',
            },
        ],
        actions: [
            {
                type: 'add',
                path: `src/store/reducers/{{name}}.js`,
                templateFile: 'plop-templates/reducers.js.hbs',
            },
            {
                type: 'modify',
                path: modulePath,
                pattern: /(\/\/ IMPORT MODULE FILES)/g,
                template: '$1\nimport { {{name}} } from "./{{name}}";',
            },
            {
                type: 'modify',
                path: modulePath,
                pattern: /(\/\/ MODULES VARIABLE)/g,
                template: '$1\n\t{{name}},',
            },
        ],
    })
    plop.setGenerator('create_store_artisan', {
        description: 'create action, epic, and reducer Redux',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'type store name',
            },
        ],
        actions: [
            {
                type: 'add',
                path: `src/store/actions/{{name}}.js`,
                templateFile: 'plop-templates/actions.js.hbs',
            },
            {
                type: 'add',
                path: `src/store/epics/epic{{pascalCase name}}.js`,
                templateFile: 'plop-templates/epics.js.hbs',
            },
            {
                type: 'add',
                path: `src/store/reducers/{{name}}.js`,
                templateFile: 'plop-templates/reducers.js.hbs',
            },
            {
                type: 'modify',
                path: moduleEpic,
                pattern: /(\/\/ IMPORT MODULE FILES)/g,
                template:
                    '$1\nimport { Request{{pascalCase name}} } from "./epic{{pascalCase name}}";',
            },
            {
                type: 'modify',
                path: moduleEpic,
                pattern: /(\/\/ MODULES VARIABLE)/g,
                template: '$1\n\tRequest{{pascalCase name}},',
            },
            {
                type: 'modify',
                path: modulePath,
                pattern: /(\/\/ IMPORT MODULE FILES)/g,
                template: '$1\nimport { {{name}} } from "./{{name}}";',
            },
            {
                type: 'modify',
                path: modulePath,
                pattern: /(\/\/ MODULES VARIABLE)/g,
                template: '$1\n\t{{name}},',
            },
        ],
    })
}