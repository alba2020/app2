const bCrypt = require('bcrypt-nodejs');

var hash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}

module.exports = (models) => {

    console.log('----------- seeding models... -----------');

    return Promise.all([

            models.User.create({
                fullname: "John O'Reilly",
                phone: '555-55-55',
                bornAt: new Date('04-12-1961 12:00'),
                isAdmin: false,
                avatarId: 1
            }),

            models.User.create({
                fullname: "Paul McCartney",
                phone: '111-11-11',
                bornAt: new Date('01-01-1980 12:00'),
                isAdmin: false
            }),

            models.User.create({
                fullname: "Mr Administrator",
                phone: '921',
                bornAt: new Date('08-03-1991 12:00'),
                isAdmin: true
            })

        ]).then((users) => {
            console.log('Users seeded: ', users.length);

            return Promise.all([
                models.LocalUser.create({
                    username: 'john',
                    password: hash('pass'),
                    UserId: 1 // ???
                }),

                models.LocalUser.create({
                    username: 'paul',
                    password: hash('secret'),
                    UserId: 2 // ???
                }),

                models.LocalUser.create({
                    username: 'admin',
                    password: hash('admin'),
                    UserId: 3 // ???
                })

            ])
        })
        .then(instances => {
            console.log('Instances seeded: ', instances.length);

            return Promise.all([
                models.Tag.create({
                    name: 'work',
                    rating: 0
                }),

                models.Tag.create({
                    name: 'music',
                    rating: 0
                })

            ]);

        })
        .then((tags) => {
            var tag1 = tags[0];
            var tag2 = tags[1];

            // console.log(tag1.dataValues);

            return models.Document.create({
                name: 'My Homework',
                file: 'bla bla',
                mime: 'text/plain',
                size: 128,
                creatorId: 1
            }).then(doc => {
                return Promise.all([
                    doc.addTag(tag1),
                    doc.addTag(tag2)
                ]);

            }).then(() => {
                return models.Document.create({
                    name: 'My Work',
                    file: 'bla',
                    mime: 'text/plain',
                    size: 128,
                    creatorId: 1
                })
            });
        })
        .then(instances => {
             console.log('Instances seeded: ', instances.length);

             return Promise.all([
                models.Comment.create({
                    text: 'Very good document!'
                }),

                models.Comment.create({
                    text: 'Another comment'
                }),

                models.Comment.create({
                    text: 'Yes!'
                })
            ]).then((comments => {
                var cs = comments;
                models.Document.findById(1).then(doc => {
                    doc.addComment(cs[0]);
                    doc.addComment(cs[1]);
                    doc.addComment(cs[2]);
                })
            }));

        })
        .then(instances => {
            // console.log('Instances seeded: ', instances.length);
          return Promise.all([
                models.Todo.create({
                    title: 'todo1',
                    complete: false
                }),
                models.Todo.create({
                    title: 'todo2',
                    complete: false
                }),
                models.Todo.create({
                    title: 'todo3',
                    complete: false
                })
            ])
        })
        .then(() => {
            // models.User.findById(1).then(user => {
            //     user.getAvatar(models, (avatar) => {
            //         console.log(avatar.dataValues);
            //     });
                
            // })
        })
        .catch(e => console.log('Could not seed database', e));
}

    // console.log('1111111111111')
    // return models.LocalUser.findOne({
    //     where: {
    //         username: 'paul'
    //     },
    //     include: [models.User]
    // }).then(localUser => {
    //     if (localUser) {
    //         console.log('user found')
    //         console.log('username: ', localUser.username);
    //         console.log('fullname: ', localUser.User.fullname);
    //     } else {
    //         console.log('user not found')
    //     }
    // })