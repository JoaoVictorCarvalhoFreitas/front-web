
function validaSenha(senha){

if (senha.test('')) {
    
}


    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumbers = /\d/.test(senha);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(senha);

     if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar ) {
        console.log('Senha válida');
        document.getElementById('senhaRegex').style.display = 'none'; 
        return true;
    } else {
        console.log('Senha inválida');
        document.getElementById('senhaRegex').style.display = 'block'; // Exibe a mensagem de erro se a senha for inválida
    }

}

function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    //se nao houver nada nos campos ele exibe a mensagem de campo obrigatorio
    if (!email || !senha) {
        document.getElementById('campoObrigatorio').style.display = 'block';
        return;
    } else {
        document.getElementById('campoObrigatorio').style.display = 'none';
    }

    console.log("Email: " + email);
    console.log("Senha: " + senha);

    //verifica se a senha contem letras maiusculas, minusculas e numeros


    if (senha.length < 8 || senha.length > 16) {
        document.getElementById('tamanhoSenha').style.display = 'block';
        return;
    } else {
        document.getElementById('tamanhoSenha').style.display = 'none';
    }



    console.log('chamou realizar login');
}
function mostrarSenha() {
    var campoSenha = document.getElementById('senha');
    var campoSenha2 = document.getElementById('senha2');

    if (campoSenha.type == 'text') {
        campoSenha.type = 'password';
        campoSenha2.type = 'password';

    } else {
        campoSenha.type = 'text';
        campoSenha2.type = 'text';
    }
}
async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;
    

    if (senha != senha2) {
        document.getElementById('senhaDiferente').style.display = 'block';
        return;
    }

    const validacao = validaSenha(senha);


    if(!validacao){
        return;
    }
    const data = {
        email: email,
        name: nome,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:3000/Usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        
        }

        const result = await response.json();
        console.log('Usuário criado com sucesso:', result);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
};