var mongoConfig, db,

    http = require('http'),
    path = require('path'),
    fs = require('fs'),

    mongoose = require('mongoose'),
    mongooseIncr = require("mongoose-autoincr-base36"),
    timestamps = require('mongoose-timestamp'),

    logger = new (require('caterpillar').Logger)({ level: 7 }),
    loggerFilter = new (require('caterpillar-filter').Filter)(),
    loggerHuman  = new (require('caterpillar-human').Human)(),

    mailer = require('nodemailer'),
    querystring = require('querystring');


/* Глобальные переменые */
ENV_PROD = 'production';
ENV_DEV = 'development';
ENV = process.env.NODE_ENV || ENV_DEV;
_PAGE_PATH = '';
PATHS = {};
PATHS.APP = path.resolve(__dirname);
PATHS.LIBS = PATHS.APP + '/libs';


//Глобальные модули, которые часто используеся по всем проекте
Q = require('q');
_ = require('underscore');
config = require(PATHS.LIBS + '/config');


/**
 *  Единожды считываем все директории верхнего уровня приложения
 *  и запописываем полные пути к ним.
 */
fs.readdirSync(PATHS.APP).forEach(function(fileName) {
    var pathToFile = PATHS.APP + '/' + fileName,
        stat = fs.statSync(pathToFile);

    if (stat.isDirectory()) {
        PATHS[fileName.toUpperCase()] = pathToFile;
    }
});


http.globalAgent.maxSockets = 50;

/**
 *  Настраиваем логирование системы.
 *  Перехватываем stdout процесса и делаем красоту.
 */
logger.pipe(loggerFilter).pipe(loggerHuman).pipe(process.stdout);
log = logger.log.bind(logger);



/* Global  Caught exception handler*/
// var ejs = require("ejs");

// process.on('uncaughtException', function(err) {
//     var smtpTransport = mailer.createTransport("SMTP", config.smtpOptions),
//         templateOptions = {
//             message : err,
//             trace: err.stack
//         };

//     /* Send mail */
//     ejs.renderFile(PATHS.APP + '/views/email/error.html', templateOptions, function(err, html) {
//         var options = {
//             from: "infowall@speedandfunction.com",
//             to: 'kolya.p@speedandfunction.com, danchik@gmail.com, alexander.l@speedandfunction.com',
//             subject: config.project.name + ' EXCEPTION',
//             html : html
//         };

//         smtpTransport.sendMail(options);
//     });
// });







controllers = {};
models = {};

/* End GLOBALS */
;(function() {
    var appfogMongoData, appMongoData, mongourl;

    // console.log('runMongoDB');

    if (process.env.VCAP_SERVICES) {
        // console.log('\nAppfog DB');
        // console.log('\nVCAP_SERVICES', process.env.VCAP_SERVICES);

        appfogMongoData = JSON.parse(process.env.VCAP_SERVICES)['mongodb-1.8'][0]['credentials'];

        // console.log('\nappfogMongoData', appfogMongoData);

        mongourl = function(obj) {
            obj.hostname = obj.hostname || 'localhost';
            obj.port = obj.port || 27017;
            obj.db = obj.db || 'test';

            if (obj.username && obj.password) {
                return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
            }
            else {
                return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
            }
        }(appfogMongoData);

        // console.log('\nmongourl', mongourl);

        mongoose.connect(mongourl);

        db = mongoose.connection;
    }
    else {
        // console.log('\nNormal DB');

        appMongoData = config.mongodb;
        mongoose.connect(appMongoData.host, appMongoData.dbname, appMongoData.port);

        db = mongoose.connection;
    }

    // Base-36 alphanumeric indexing
    mongooseIncr.loadAutoIncr(db);

    db.once('open', function() {
        log('info', 'Mongoose was connected successfully.');

        require(PATHS.LIBS + '/dbMock');

        if (process.argv.indexOf('--mock-data') !== -1) {
            require(PATHS.LIBS + '/mockData.js').then(function() {
                require('server.js');
            });
        }
        else {

            require('./server.js');
        }
    });

    db.once('error', function(err) {
        log('error', 'Mongoose connection error');
        console.log(err);


        process.exit(); // todo: [1] [2]
    });
})();


(function() {
    //initControllers();
    initModels();

    // function initControllers() {
    //     var controllersDir = PATHS.CONTROLLERS;

    //     readDir(controllersDir, function(pathToFile) {
    //         var controller = require(pathToFile);

    //         // TODO: name is required
    //         // TODO: async init ?

    //         if (controller.init) {
    //             controller.init();
    //         }

    //         if (!controller.isAbstract) {
    //             controllers[controller.name] = controller;
    //         }
    //     });

    // }

    function initModels() {
        var modelsDir = PATHS.MODELS;

        readDir(modelsDir, function(pathToFile) {
            var model = require(pathToFile);

            models[model.name] = model.model;

            if (model.generator) models[model.name]._e_generator_ = model.generator;
        }, ['mocks']);
    }

    function readDir(dir, fileHandler, ignoredDirs) {
        var files = fs.readdirSync(dir);

        files.forEach(function(fileName) {
            var pathToFile = dir + '/' + fileName,
                stat = fs.statSync(pathToFile);

            if (stat.isFile()) {
                fileHandler(pathToFile);
            }
            else if (stat.isDirectory()) {
                if (!ignoredDirs || !~ignoredDirs.indexOf(path.basename(pathToFile))) {
                    readDir(pathToFile, fileHandler);
                }
            }
        });
    }
})();
