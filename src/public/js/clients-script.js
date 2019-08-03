
function request(method, uri, data) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (ev) => {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                res(JSON.parse(xhr.responseText));
            } else {
                rej(xhr.responseText);
            }
        };
        xhr.open(method, uri);
        xhr.send(data);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cnpj = location.href.split('/').pop();
    const uri = '/api/v1/clients/' + cnpj;
    request('GET', uri)
        .then(client => {
            document.querySelector('#breadcrumbClientName').innerHTML = client.xNome;
        })
        .catch(err => {
            console.log(err);
        });
});