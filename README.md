# Kirby Next: UI

[![Build Status](https://scrutinizer-ci.com/g/k-next/ui/badges/build.png?b=master)](https://scrutinizer-ci.com/g/k-next/ui/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/k-next/ui/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/k-next/ui/?branch=master)
[![Code Quality](https://scrutinizer-ci.com/g/k-next/ui/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/k-next/ui/?branch=master)

## Build Setup

``` bash
# install dependencies
npm install

# prepare Kirby installation
cd kirby
composer install

# run fractal and webpack
cd ../
npm run start

# build for production with minification
npm run build
```

## Troubleshooting

If installing Fractal fails, please try installing it globally. 

## Fractal

We use [Clearleft's Fractal](http://fractal.build/) to develop and preview our UI components. After running `fractal start --sync` components can be viewed in your browser at: `http://localhost:3000/`

## Development

To work on components, start webpack with `npm run dev`. Fractal will automatically watch for changes as well as webpack, so your component previews should automatically update.

## Adding Components

When you add new components in Fractal, you also have to import them in the main.js and register them in Vue's components array.

## Testing

[Karma](http://karma-runner.github.io/1.0/index.html), [PhantomJS](http://phantomjs.org/) are used as the test environment. The tests themselves are written with [Jasmine](https://jasmine.github.io/).

The watcher will look for files ending with `.spec.js` inside of `./components/`.

``` bash
# to run the tests once
npm test

# to run the tests and watch the files
npm run test:watch
```

## License

<http://www.opensource.org/licenses/mit-license.php>

## Author

Bastian Allgeier
<bastian@getkirby.com>
<http://getkirby.com>
<http://twitter.com/getkirby>
