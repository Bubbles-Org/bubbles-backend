function getDate(date, type) {
    if (!date) {
        date = new Date();
    } else {
        if (typeof (date) === 'string') {

            const format = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

            // Quando a data estiver no formato dd/mm/yyyy, não é possível utilizar
            // o construtor do new Date() para criar a data esperada
            if (date.match(format)) {
                date = new Date(date);
            } else {
                const elements = date.split('/');

                date = new Date(`${elements[2]}-${elements[1]}-${elements[0]}`);

                // TODO: Verificar melhor forma de corrigir UTC
                date = new Date(date.setHours(date.getHours() + 3));
            }
        }
    }

    let result;

    switch (type) {
        case 2:
            result = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
            break;

        default:
            result = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
            break;
    }

    return result;
}

function getDateTime(date, type) {
    if (!date)
        date = new Date();

    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
}

function check24Hours(date) {
    // Obtendo timestamp atual
    const current = Math.round(new Date().getTime() / 1000);

    // Obtendo timestamp das últimas 24 horas
    const yesterday = current - (24 * 3600);

    // Verificando se a data informada está inclusa nas últimas 24 horas
    return date >= new Date(yesterday * 1000).getTime();
}

function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports = {
    getDate,
    getDateTime,
    check24Hours,
    paginate
}
