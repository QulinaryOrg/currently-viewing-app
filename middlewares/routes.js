"use strict";

module.exports = app => {
    app.use("/", app.routes.index);
    app.use("/users", app.routes.users);
};