# Kirby Next: UI

## Build Setup

``` bash
# install fractal globally
npm i -g @frctl/fractal

# install dependencies
npm install

# run webpack 
npm run dev

# run fractal
fractal start --sync

# build for production with minification
npm run build
```

## Fractal

We use [Clearleft's Fractal](http://fractal.build/) to develop and preview our UI components. After running `fractal start --sync` components can be viewed in your browser at: `http://localhost:3000/`

## Development

To work on components, start webpack with `npm run dev`. Fractal will automatically watch for changes as well as webpack, so your component previews should automatically update. 

## Adding Components

When you add new components in Fractal, you also have to import them in the main.js and register them in Vue's components array.

## License 

<http://www.opensource.org/licenses/mit-license.php>

## Author

Bastian Allgeier
<bastian@getkirby.com>  
<http://getkirby.com>  
<http://twitter.com/getkirby>
