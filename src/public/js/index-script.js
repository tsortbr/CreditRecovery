function prepareClients(){
    const clientListElement = document.querySelector('#clients-list');
    
    function addClient(client){
        console.log(client);
        const ele = document.createElement('a');
        ele.classList.add('list-group-item','list-group-item-action');
        ele.href = `/clients/${client.id}`;
        ele.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${client.xNome}</h5>
            <small>${new Date(client.updatedAt).toLocaleDateString('pt-br')}</small>
        </div>
        <small>
            <p class="mb-1">Fantasia: ${client.xFant}</p>
            <p class="mb-1">CNPJ: ${client.CNPJ}</p>
        </small>
        `;
        clientListElement.appendChild(ele);
    }
    

    function show(arr){
        for (const client of arr) {
            addClient(client);        
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.onload = () =>{
        if(xhr.DONE && xhr.status == 200){
            const arr = JSON.parse(xhr.responseText);
            show(arr);
        }
    };
    xhr.open('GET','/api/v1/clients');
    xhr.send();
}


window.addEventListener('DOMContentLoaded', (ev) => {
    prepareClients();
});