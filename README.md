# Pops - 0.0.8-dev

A commandline client that is capable of generating styleguides, and styleguide
based workflows.

## Installation

Install globally for best use.

    $ npm install -g pops

Once installed you will have access to the pops commandline-client.

    $ pops

      ██████╗  ██████╗ ██████╗ ███████╗
      ██╔══██╗██╔═══██╗██╔══██╗██╔════╝
      ██████╔╝██║   ██║██████╔╝███████╗
      ██╔═══╝ ██║   ██║██╔═══╝ ╚════██║
      ██║     ╚██████╔╝██║     ███████║
      ╚═╝      ╚═════╝ ╚═╝     ╚══════╝

      Usage: pops <command> [options]

      Commands:
        serve            Serves Pops' styleguide
        init             Creates a pops.config.js in the current folder
        watch            Serves Pops' styleguide and watches for changes
        ----------------------------------------------------------------
        make::component  Creates one or multiple component/s
        make::overview   Creates one or multiple overview/s
        make::pattern    Creates one or multiple pattern/s
        make::page       Creates one or multiple page/s
        --------------------------------------------------------------------------
        version          Prints pops version

## Config

To start a pops styleguide you will first need a `pops.config.js` file.
After installing pops run `$ pops init` to generate a `pops.config.js` in the current
directory. It should look like the following.

```javascript
var path = require('path');

module.exports = {
    // folder where components, patterns, pages, and overviews will be placed
    src: path.join(__dirname, './styleguide'),
    // meta info that will be included in the api under the meta key
    meta: {
        // appears in styleguide
        name: '',
        // displayed under name in styleguide
        // keep short as overviews should be used for more substantial info
        summary: '',
        authors: [
            // list of developers who have worked on the project
        ]
    },
    // file extensions that will be used
    ext: {
        styles: 'scss',
        templates: 'twig',
        scripts: 'js'
    },
    // stylesheets and scripts that will be placed in styleguide head
    globals: {
        stylesheets: [
            // Include stylesheets
        ],
        javascripts: [
            // Include javascripts
        ]
    },
    // URL of custom styleguide stylesheets
    // will replace the pops default stylesheet
    customStylesheet: [
        // custom stylesheets
    ]
};
```

### src

The `src` option tells pops where it should place any generated items. It is also
where pops will look when serving it's styleguide.

### meta

Meta information displayed at the top of the styleguide.

### globals

The `globals` option refers to global stylesheets and javascripts that are used by
the styleguide items.

### ext

The `ext` option tells pops what file extension you wish to use. Pops will read this
and create files using these intructions.

Templates by default work in either handlebars or twig format.

### customStylesheet

An array of custom stylesheet urls. Will replace the pops styleguide's default stylesheets

## Contributing

See [CONTRIBUTING.md](https://github.com/BrianDGLS/pops/blob/develop/CONTRIBUTING.md)
