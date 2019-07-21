class UploadController {
    constructor(idForm, idInputFile, idDivList, idButtonSend, idButtonClean) {
        this.form = document.querySelector(idForm);
        this.inputFile = document.querySelector(idInputFile);
        this.divFiles = document.querySelector(idDivList);
        this.btnSend = document.querySelector(idButtonSend);
        this.btnClean = document.querySelector(idButtonClean);

        this.files = [];
    }

    init() {
        this.loadEvents();
    }

    loadEvents() {
        const _self = this;
        this.form.addEventListener('submit',(ev)=>{
            ev.preventDefault();
        });
        this.inputFile.addEventListener('change', (ev) => {
            ev.preventDefault();
            _self.changeFile();
        });
        this.btnSend.addEventListener('click', (ev) => {
            ev.preventDefault();
            _self.btnSendClick();
        });
        this.btnClean.addEventListener('click', (ev) => {
            ev.preventDefault();
            _self.btnCleanClick();
        });
    }

    changeFile() {
        console.log('ChangeFiles');
        if (this.inputFile.files.length > 0) {
            this.files = this.inputFile.files;
            this.divFiles.innerHTML = '';
            const list = document.createElement('ul');
            for (const file of this.inputFile.files) {
                const item = document.createElement('li');
                item.innerHTML = file.name;
                list.appendChild(item);
            }
            this.divFiles.appendChild(list);
            this.btnClean.classList.remove('disabled');
            this.btnSend.classList.remove('disabled');
        }
    }

    btnSendClick() {
        if (!btnSend.classList.contains('disabled')) {
            this.uploadFiles();
        }
    }

    btnCleanClick() {
        if (!this.btnClean.classList.contains('disabled')) {
            this.clean();
        }
    }

    uploadFiles() {
        if (this.files.length > 0) {
            // const formData = new FormData();
            // formData.append('notes', this.files);
            // fetch('/upload', { method: 'POST', body: formData });
            document.querySelector('form').submit();
        }
    }

    clean() {
        console.log('asdfasfd');
        this.divFiles.innerHTML = '<div class="div" id="divFilesList"><p class="text-center text-secondary my-5">NO FILES</p></div>';
        this.btnClean.classList.add('disabled');
        this.btnSend.classList.add('disabled');
        this.files = [];
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const upload = new UploadController(
        '#formFiles',
        '#inputFiles',
        '#divFilesList',
        '#btnSend',
        '#btnClean'
    );
    upload.init();
});