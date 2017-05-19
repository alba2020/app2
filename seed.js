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
                isAdmin: false
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
                }),

                models.Todo.create({
                    title: "The Title 1",
                    UserId: 1
                }),
                models.Todo.create({
                    title: "The Title 2",
                    UserId: 1
                }),
                // ---------------------
                models.Document.create({
                    name: 'My Homework',
                    file: 'bla bla',
                    mime: 'text/plain',
                    size: 128
                }),

                models.Tag.create({
                    name: 'work',
                    rating: 0
                }),

                models.Tag.create({
                    name: 'music',
                    rating: 0
                })

            ])
        })
        .then(instances => {
            console.log('Instances seeded: ', instances.length);
        })
        .catch(e => console.log('Could not seed database', e));
}