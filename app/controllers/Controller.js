
// for testing
class Controller {

    constructor(model) {
        this.model = model;
        this.list = this.list.bind(this);
        this.create = this.create.bind(this);
        this.read = this.read.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    list(req, res) {
        return this.model.findAll({})
        .then(items => res.json(items));
    }

    create(req, res) {
        this.model.create(req.body)
            .then((item) => {
                res.json(item);
            });
    }

    read(req, res) {
        this.model.find({
            where: {
                id: req.params.id
            }
        }).then(function (item) {
            res.json(item);
        });
    }

    update(req, res) {
        this.model.findById(req.params.id)
            .then(function (item) {
                if (item) {
                    item.updateAttributes(req.body)
                        .then(function (item) {
                            res.send(item);
                        });
                }
            });
    }

    delete (req, res) {
        this.model.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (item) {
            res.json(item);
        });
    }

}

module.exports = Controller;