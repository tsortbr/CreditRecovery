
function request(method, uri, data) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (ev) => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    res(JSON.parse(xhr.responseText));
                } else {
                    rej(xhr.responseText);
                }
            }
        };
        xhr.open(method, uri);
        xhr.send(data);
    });
}

function showNoteList(arr){
    bodyNote = document.querySelector('#noteBody');
    for (const nota of arr) {
        let line = document.createElement('tr');
        line.innerHTML = `
            <td>${nota.createdAt.split('T')[0]}</td>
            <td class="text-truncate">${nota.id}</td>
            <td>${nota.detPag_vPag}</td>
        `;
        bodyNote.appendChild(line); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cnpj = location.href.split('/').pop();
    const uri = '/api/v1/clients/' + cnpj;
    var client = null;
    var notas = [];
    request('GET', uri)
        .then(cli => {
            client = cli;
            document.querySelector('#breadcrumbClientName').innerHTML = client.xNome;
            return request('GET','/api/v1/notes/client/'+client.id);
        }).then(nts =>{
            notas = nts;
            showNoteList(notas.rows);
        })
        .catch(err => {
            console.log(err);
        });
});