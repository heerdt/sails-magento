/**
 * Module Dependencies
 */
// ...
// e.g.
// var _ = require('lodash');
var magento = require('magentojs');
// ...



/**
 * Sails Boilerplate Adapter
 *
 * Most of the methods below are optional.
 * 
 * If you don't need / can't get to every method, just implement
 * what you have time for.  The other methods will only fail if
 * you try to call them!
 * 
 * For many adapters, this file is all you need.  For very complex adapters, you may need more flexiblity.
 * In any case, it's probably a good idea to start with one file and refactor only if necessary.
 * If you do go that route, it's conventional in Node to create a `./lib` directory for your private submodules
 * and load them at the top of the file with other dependencies.  e.g. var update = `require('./lib/update')`;
 */
module.exports = (function () {


  // You'll want to maintain a reference to each collection
  // (aka model) that gets registered with this adapter.
  var _modelReferences = {};


  
  // You may also want to store additional, private data
  // per-collection (esp. if your data store uses persistent
  // connections).
  //
  // Keep in mind that models can be configured to use different databases
  // within the same app, at the same time.
  // 
  // i.e. if you're writing a MariaDB adapter, you should be aware that one
  // model might be configured as `host="localhost"` and another might be using
  // `host="foo.com"` at the same time.  Same thing goes for user, database, 
  // password, or any other config.
  //
  // You don't have to support this feature right off the bat in your
  // adapter, but it ought to get done eventually.
  // 
  // Sounds annoying to deal with...
  // ...but it's not bad.  In each method, acquire a connection using the config
  // for the current model (looking it up from `_modelReferences`), establish
  // a connection, then tear it down before calling your method's callback.
  // Finally, as an optimization, you might use a db pool for each distinct
  // connection configuration, partioning pools for each separate configuration
  // for your adapter (i.e. worst case scenario is a pool for each model, best case
  // scenario is one single single pool.)  For many databases, any change to 
  // host OR database OR user OR password = separate pool.
  var _dbPools = {};



  var adapter = {

    // Set to true if this adapter supports (or requires) things like data types, validations, keys, etc.
    // If true, the schema for models using this adapter will be automatically synced when the server starts.
    // Not terribly relevant if your data store is not SQL/schemaful.
    syncable: false,


    // Default configuration for collections
    // (same effect as if these properties were included at the top level of the model definitions)
    defaults: {

      // For example:
        host: 'www.mystore.com',
        port: 80,
        path: '/api/xmlrpc/',
        login: 'myuser',
        pass: 'mypassowrd'
      // host: 'localhost',
      // schema: true,
      // ssl: false,
      // customThings: ['eh']

      // If setting syncable, you should consider the migrate option, 
      // which allows you to set how the sync will be performed.
      // It can be overridden globally in an app (config/adapters.js)
      // and on a per-model basis.
      // 
      // IMPORTANT:
      // `migrate` is not a production data migration solution!
      // In production, always use `migrate: safe`
      //
      // drop   => Drop schema and data, then recreate it
      // alter  => Drop/add columns as necessary.
      // safe   => Don't change anything (good for production DBs)
        migrate: 'safe'
    },



    /**
     * 
     * This method runs when a model is initially registered
     * at server-start-time.  This is the only required method.
     * 
     * @param  {[type]}   collection [description]
     * @param  {Function} cb         [description]
     * @return {[type]}              [description]
     */
    registerCollection: function(collection, cb) {

      // Keep a reference to this collection
      _modelReferences[collection.identity] = collection;
      
      cb();
    },



    /**
     * 
     * REQUIRED method if users expect to call Model.find(), Model.findOne(),
     * or related.
     * 
     * You should implement this method to respond with an array of instances.
     * Waterline core will take care of supporting all the other different
     * find methods/usages.
     * 
     * @param  {[type]}   collectionName [description]
     * @param  {[type]}   options        [description]
     * @param  {Function} cb             [description]
     * @return {[type]}                  [description]
     */
    OrderInfo: function(collectionName, options, cb) {

      spawnConnection(function(connection, cb) {

        // Build find query
        var query = sql.selectQuery(dbs[collectionName].config.dbName+'.'+dbs[collectionName].identity, options);

        magento.sales_order.info(options.orderId, function(err,order) { 

          if(err) return cb(err);

          cb(err, order);

        });
      }, dbs[collectionName].config, cb);
    },


  };


  // Expose adapter definition
  return adapter;


  // Wrap a function in the logic necessary to provision a connection
  // (either grab a free connection from the pool or create a new one)
  // cb is optional (you might be streaming)
  function spawnConnection(logic, config, cb) {


    // Use a new connection each time
    //if (!config.pool) {
      magento.init(marshalConfig(config),function(err) {
        afterwards(err, magento);
      });
    //}

    // Use connection pooling
    //else {
     // adapter.pool.getConnection(afterwards);
    //}

    // Run logic using connection, then release/close it

    function afterwards(err, magento) {
      if (err) {
        console.error("Error spawning magento:");
        console.error(err);
        return cb(err);
      }

        logic(magento, function(err, result) {

          if (err) {
            cb(err,1)
            console.error("Logic error in Oracle ORM.");
            console.error(err);
            magento.close();
            return ;
          }

          magento.close();
            cb(err, result);
        });
    }
  }

  // Convert standard adapter config
  // into a custom configuration object for node-mysql
  function marshalConfig(config) {
    return {
      host: config.host,
      port: config.port,
      path: config.path,
      login: config.login,
      pass: config.pass
    };
  }
})();

