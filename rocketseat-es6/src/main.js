import api from './api';

class App {
    constructor() {
        this.respositories = [];
        this.formEl = document.getElementById("repo-form");
        this.listEl = document.getElementById("repo-list");
        this.inputEl = document.querySelector('input[name=repository]');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if(loading){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('carregando'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault(); // Evita a requisição HTTP

        const repoInput = this.inputEl.value;
        if(repoInput.length === 0)
            return;

        this.setLoading();

        try{
            const response = await api.get(`/repos/${repoInput}`);
            const { name, description, html_url, owner: { avatar_url } } = response.data;

            this.respositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            this.inputEl.value = '';

            this.render();
        } catch (err) {
            alert('Repositório não existe!');
        }

        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.respositories.forEach(repo => {
            let img = document.createElement('img');
            img.setAttribute('src', repo.avatar_url);

            let strong = document.createElement('strong');
            strong.innerText = repo.name;

            let p = document.createElement('p');
            p.innerText = repo.description;

            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repo.html_url);
            a.innerText = 'Acessar';

            let li = document.createElement('li');
            li.appendChild(img);
            li.appendChild(strong);
            li.appendChild(p);
            li.appendChild(a);

            this.listEl.appendChild(li);
        });
    }
}

new App();