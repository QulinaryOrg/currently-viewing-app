/**
 * Created by shyam on 08/05/16.
 */

"use strict"
module.exports = (app) => {
    let logger = app.helpers.logger;
    let appPort = process.env.PORT || "3000";
    let server = app.listen(appPort, () => {
        logger.info(`Server started on port ${appPort}`);
    });
    return server;
}
