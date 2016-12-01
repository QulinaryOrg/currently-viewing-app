"use strict";

function createErrorObject (data) {

    return {
        status: data.status || 500,
        error: true,
        message: data.message,
        details: {
            message: data.details || "Some error occurred"
        }
    };
}


module.exports = {
    createErrorObject
};