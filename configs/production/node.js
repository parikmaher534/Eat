var port = process.env.WEB_PORT || process.env.PORT || process.env.VCAP_APP_PORT || 3000;

module.exports = {
    project: {
        name: 'Infowall'
    },

    mongodb: {
        host: '127.0.0.1',
        dbname: 'infowall',
        port: 27017
    },

    web: {
        port: port
    },

    files: {
        css: [
            'font-awesome.css',
            'normalize.min.css',
            'jcarousel.css',
            'base.css',
            'jquery.ui.css',
            'jquery.ui/jquery-ui-1.10.3.custom.css',
            'lightbox.css',
            'gallery.css',
            'screen.css',
            'list-edit-block.css',
            'new-list-block.css',
            'profile-edit-block.css',
            'list-filters-block.css'
        ],
        js: {
            top: [
                'vendor/modernizr-2.7.1.min.js',
                'vendor/handlebars-v1.3.0.js',
                'vendor/underscore-1.4.4.min.js'
            ],
            etc: [
                'vendor/jquery-1.10.2.min.js',
                'vendor/jquery-ui-1.10.3.custom.js',
                'vendor/jquery.customSelect.min.js',
                'vendor/jquery.validate.js',
                'vendor/jquery.jcarousel.min.js',
                'vendor/jquery.touchwipe.min.js',
                'vendor/jquery.ui.datepicker.validation.js',
                'vendor/backbone-1.0.0.js',
                'vendor/notify-custom.min.js',

                'views/AddNewList.js',
                'views/ListSettings.js',
                'views/InfowallHistory.js',
                'views/ItemComments.js',
                'views/ItemDelete.js',
                'views/HeaderMenuListView.js',
                'views/InfowallDefaultView.js',
                'views/SearchView.js',
                'views/MenuListView.js',
                'views/ListNewItemView.js',
                'views/ExcelUploaderView.js',
                'controllers/base.js',

                'vendor/masonry.pkgd.min.js',
                'vendor/imagesloaded.js',
                'vendor/classie.js',
                'vendor/AnimOnScroll.js',
                'vendor/uisearch.js'
            ]
        }
    },
    auth: {
        facebook: {
             clientID: '504795796256670',
             clientSecret: '83a12bf1eaf78c63d15332c073ccf296',
             callbackURL: 'http://127.0.0.1:' + port + '/login/facebook/callback',
             passReqToCallback: true
        }
    },
    images: {
        thumbnails:[
            {
                'title': 'x70 square',
                'width':  70,
                'height': 70,
                'ext': 'png',
                crop : true
            },
            {
                'title': 'x320 square',
                'width': 320,
                'ext': 'png',
                crop : true
            }
        ],
        listImageThumbnail : {
            //'title':  'x290 square',
            'title':  'x290',
            'width':  290,
            //'height': 290,
            'ext':    'png'
        },
        userAvatar : {
            'title':  'x92 square',
            'width':  92,
            'height': 92,
            'ext':    'png'
        },
        thumbnails_ext: 'jpg'
    },
    report :{
        reasons: ['Spam', 'Inappropriate Language', 'Inappropriate Image', 'Incorrect Information', 'Other']
    },

    owner : {
        name : 'Nick',
        email : 'kolya.p@speedandfunction.com'
    },

    smtpOptions : {
        host: "mail.gluzdov.com",
        auth: {
            user: "infowall@gluzdov.com",
            pass: "In3hiekeir9eesh"
        }
    },

    look_settings:{
        allowFonts : ['Arial', 'Tahoma', 'Verdana']
    },

    accessing_rights : [
        {
            right_name : 'Who will be viewing your list',
            right_field : 'content_review',

            rights : [
                {
                    label: 'The whole world',
                    value: 2
                },
                {
                    label: 'Only registered users',
                    value: 1
                },
                {
                    label: 'Only me',
                    value: 0
                },
            ]
        },
        {
            right_name : 'Who will be adding content to your list?',
            right_field : 'content_add',
            rights : [
                {
                    label: 'Only me',
                    value: 0
                },
                {
                    label: 'The whole world',
                    value: 2
                },
                {
                    label: 'Only registered users',
                    value: 1
                }

            ]
        },
        {
            right_name : 'Who can delete content from your list?',
            right_field : 'content_delete',
            rights : [
                {
                    label: 'Only me',
                    value: 0
                },
                {
                    label: 'The whole world',
                    value: 2
                },
                {
                    label: 'Only registered users',
                    value: 1
                }
            ]
        },
        {
            right_name : 'Who will be editing content in your list?',
            right_field : 'content_edit',
            rights : [
                {
                    label: 'Only me',
                    value: 0
                },
                {
                    label: 'The whole world',
                    value: 2
                },
                {
                    label: 'Only registered users',
                    value: 1
                }
            ]
        },
        {
            right_name : 'Do you want to allow users to comment and rate your content?',
            right_field : 'comment_and_rate',
            rights : [
                {
                    label: 'Registered users can comment and rate',
                    value: 1
                },
                {
                    label: 'Yes, allow anyone to comment',
                    value: 0
                },

                {
                    label: 'Only registered users can comment, no one can rate',
                    value: 2
                },
                {
                    label: 'Registered users can rate, no one can comment',
                    value: 3
                },
                {
                    label: 'No one can comment or rate',
                    value: 4
                }


            ]
        },


    ]
};