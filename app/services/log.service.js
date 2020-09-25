// Libraries
const filesystem = require('fs');
const path = require('path');

// Services
const UtilService = require('./util.service');


function info(message, body) {
    write(`[${UtilService.getDateTime()}][INFO]: ${message}`);

    if (body) {
        write(`[${UtilService.getDateTime()}][INFO]: Body: ${JSON.stringify(body)}`);
    }

    write('');
}

function warn(message, body) {
    write(`[${UtilService.getDateTime()}][WARN]: ${message}`);

    if (body) {
        write(`[${UtilService.getDateTime()}][WARN]: Body: ${JSON.stringify(body)}`);
    }

    write('');
}

function error(message, path, error) {
    write(`[${UtilService.getDateTime()}][ERROR]: ${message}`);
    write(`[${UtilService.getDateTime()}][ERROR]: Path: ${path}`);

    if (error && error.stack) {
        const stack = error.stack.split('\n');

        write(`[${UtilService.getDateTime()}][ERROR]: Error: ${error.message}`);
        write(`[${UtilService.getDateTime()}][ERROR]: Stack: ${stack[0]}`);

        for (let index = 1; index < stack.length; index++) {
            write(stack[index]);
        }
    } else {
        write(`[${UtilService.getDateTime()}][ERROR]: Error: ${JSON.stringify(error)}`);
    }

    write('');
}

function write(message) {
    // A mensagem também deve ser exibida no console
    log(message);

    filesystem.appendFileSync(path.resolve('logs', `${UtilService.getDate()}.txt`), `${message}\n`, (error) => {
        if (error) {
            log(error);
        }
    });
}

function log(message) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(message);
    }
}

module.exports = {
    info,
    warn,
    error,
    log
}
