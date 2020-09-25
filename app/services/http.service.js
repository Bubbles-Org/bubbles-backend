
function ok(res, content = {}) {
    res.status(200);
    res.json(content);
}

function badRequest(res, error) {
    res.status(400);
    res.json({ error });
}

function unauthorized(res, error) {
    res.status(401);
    res.json({ error });
}

function forbidden(res, error) {
    res.status(403);
    res.json({ error });
}

function notFound(res, error) {
    res.status(404);
    res.json({ error });
}

function internalServerError(res, error = 'Erro interno do servidor') {
    res.status(500);
    res.json({ error });
}

module.exports = {
    ok,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    internalServerError
}