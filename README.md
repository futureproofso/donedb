# DoneDb
> "Dundi B" like Cardi B

## The db wrapper that gets it done!

DoneDb is simple. It allows you to create counters that you can update and display anywhere.
Increment your counter on a button click from any web page, or multiple web pages at once.
Display the count on any web page, or multiple web pages at once.

![Alt Text](https://media.giphy.com/media/2siCeV5lKfYrRSYsaA/giphy-downsized.gif)

# Use Cases
> "A waitlist counter that updates in real time!"

# Roadmap
- [ ] Log each write
- [ ] Use streaming lambda event in addition to polling
- [ ] Publish spec for "donedbacks" aka donedb backend databases
- [ ] Mock donedback for tests

# Usage
DoneDb is _primarily_ designed for web browsers.

Use the jsdelivr CDN to import DoneDb into an html page.
```html
<script>
import {createConfig, createClient} from "https://cdn.jsdelivr.net/npm/donedb@0.0.3/lib/bin/web/index.min.js"
</script>
```

Use yarn or npm to install DoneDb into a web framework like React.js.
```
yarn add donedb
```
```
npm install donedb
```

DoneDb can also be used in Node.js. Just clone it. It has 0 dependencies and is super easy to read.
```
git clone <this_repo>
```
```
yarn install
```
```
yarn build
```
```
mv lib <anywhere_you_want_to_import_donedb>
```


# Testing
Tests use the Mocha test framework and Chai assertions.
```
yarn test:unit
```

# Building
Transpiled JS files are built to the `lib` directory.

```
tsc
```
