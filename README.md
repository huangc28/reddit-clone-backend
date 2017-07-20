# reddit-clone-backend

> Try to simulate the backend of reddit like services.

## ES6

All code are transpiled from ES6 to ES5 using babel hook on the fly before executed.

## Persist

Persist data in a javascript Hash.

### Topic Structure

```
{
  id: {Number},
  topic: {String},
  vote: {Number}
}
```

### Persist mechanism

All available methods are exists in `server/memCache.js`. All unit tests are in `server/memCache.test.js`

### Remark on memCache put method

As for updating data, only truthy value of an attribute (not '', undefined, null, NaN) will be updated into existing topic to prevent unecessary overwrite.


## Start dev

Start developing environment:

`npm run dev`

## Start hosting

Start hosting with node:

`npm run start`


## Start prod hosting on PM2

Start PM2 monitor / daemonize process.

`npm run start:prod`

## Tests

Test is suffixed with `*.test.js`

Test regards the following:

1. APIs testing (integration)
2. memCache testing (unit)

Run:

`npm run test`
