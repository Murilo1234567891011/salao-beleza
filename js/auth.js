const $ = id => document.getElementById(id);
const usuarios = () => JSON.parse(localStorage.getItem('usuarios') || '[]');

function mostrar(aba) {
    $('formLogin').hidden = aba !== 'login';
    $('formCad').hidden = aba !== 'cad';
    $('tabLogin').classList.toggle('ativo', aba === 'login');
    $('tabCad').classList.toggle('ativo', aba === 'cad');
    $('msg').textContent = '';
}
$('tabLogin').onclick = () => mostrar('login');
$('tabCad').onclick = () => mostrar('cad');

$('formCad').onsubmit = e => {
    e.preventDefault();
    const email = $('cEmail').value.trim().toLowerCase();
    if (usuarios().some(u => u.email === email)) {
        $('msg').textContent = 'E-mail já cadastrado.'; return;
    }
    const lista = usuarios();
    lista.push({ nome: $('cNome').value.trim(), email, senha: $('cSenha').value });
    localStorage.setItem('usuarios', JSON.stringify(lista));
    mostrar('login');
    $('msg').style.color = 'green';
    $('msg').textContent = 'Cadastro realizado! Faça login.';
};

$('formLogin').onsubmit = e => {
    e.preventDefault();
    const email = $('lEmail').value.trim().toLowerCase();
    const user = usuarios().find(u => u.email === email && u.senha === $('lSenha').value);
    if (!user) { $('msg').style.color = '#b91c1c'; $('msg').textContent = 'E-mail ou senha inválidos.'; return; }
    localStorage.setItem('sessao', JSON.stringify({ nome: user.nome, email: user.email }));
    location.href = 'sistema.html';
};