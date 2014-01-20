![image_squidhome@2x.png](http://i.imgur.com/mvNmZcr.jpg)

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)

# MagentoAdapter

Magento Adapter for Sails 

## Installation

Install from NPM.

```bash
$ npm install sails-magento
```

## Sails Configuration

Add the magento config to the config/adapters.js file:

```javascript
module.exports.adapters = {
  'default': 'magento',

  // sails v.0.9.0
  magento: {
    host: 'www.mystore.com',
    port: 80,
    path: '/api/xmlrpc/',
    login: 'myuser',
    pass: 'mypassowrd'
  }
};
```

## Sails.js

http://sailsjs.org


## Sails.js License

### The MIT License (MIT)

Copyright © 2012-2013 Mike McNeil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8d00ec327691e4a1ad89332d659bbf0c "githalytics.com")](http://githalytics.com/mayconheerdt/sails-magento)