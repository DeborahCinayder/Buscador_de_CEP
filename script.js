function buscarCEP() {
    const cepInput = document.getElementById("cepInput");
    const resultado = document.getElementById("resultado");
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        resultado.innerHTML = "CEP inválido. Deve conter 8 dígitos.";
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = "CEP não encontrado.";
            } else {
                resultado.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade/Estado:</strong> ${data.localidade}/${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            resultado.innerHTML = "Ocorreu um erro ao buscar o CEP.";
        });
}