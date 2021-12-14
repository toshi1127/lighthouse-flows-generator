# lighthouse-flows-generator

This CLI tool allows you to merge Lighthouse measurements and view them in the Lighthouse user flows view.


### Installing
```
$ npm install -g lighthouse-flows-generator
```

### How to use
```
$ lighthouse-flows-generator --urls "https://web.dev/" --files "https://web.dev/blog/"  --files "https://web.dev/compat2021-holiday-update/"

or

$ lighthouse-flows-generator --files "./1.json" --files "./2.json"  --files "./3.json"
```
