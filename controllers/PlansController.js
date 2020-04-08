const PlansService = require("../services/PlansService");

class PlansController {

    // GET
    async index(req, res) {
        var plans = await PlansService.getAll();
        res.render("plans/index", { plans });
    }

    // GET
    create(req, res) {
        res.render("plans/create", { title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg') });
    }

    // GET
    async edit(req, res) {
        var plan = await PlansService.getById(req.params.id);
        res.render("plans/edit", { plan, title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg') });
    }

    // POST
    async update(req, res) {
        var { title, list, client, value, imports, id } = req.body;

        var plan = {
            title,
            list,
            client,
            value,
            import: imports
        }

        var result = await PlansService.update(id, plan);

        if (result == true) {
            res.redirect("/admin/plans");
        } else {
            req.flash('title_msg', result.title_msg);
            req.flash('list_msg', result.list_msg);
            res.redirect("/admin/plans/edit/"+id);
        }
    }

    // POST
    async store(req, res) {
        var { title, list, client, value, imports } = req.body;

        var plan = {
            title,
            list,
            client,
            value,
            import: imports
        }

        var result = await PlansService.store(plan);

        if (result == true) {

        } else {
            req.flash('title_msg', result.title_msg);
            req.flash('list_msg', result.list_msg);
            res.redirect("/admin/plans/create");
        }
    }

    async deactivate(req, res) {
        var id = req.params.id;
        await PlansService.deactivate(id);
        res.redirect("/admin/plans");
    }

    async activate(req, res) {
        var id = req.params.id;
        await PlansService.activate(id);
        res.redirect("/admin/plans");
    }
}

module.exports = new PlansController();