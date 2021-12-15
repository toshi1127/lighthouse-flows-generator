# lighthouse-flows-generator

This CLI tool allows you to merge Lighthouse measurements and view them in the Lighthouse user flows view.

![image](https://user-images.githubusercontent.com/32378535/146111296-a3cf6d2b-d3ae-4e4a-8615-05dd023689c2.png)


### Installing
```
$ npm install -g lighthouse-flows-generator
```

### How to use
```
$ lighthouse-flows-generator generate --urls "https://web.dev/" --urls "https://web.dev/blog/"  --urls "https://web.dev/compat2021-holiday-update/"

or

$ lighthouse-flows-generator generate --files "./1.json" --files "./2.json"  --files "./3.json"
```
