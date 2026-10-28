const $ = id => document.getElementById(id);
const sessao = JSON.parse(localStorage.getItem('sessao') || 'null');
if (!sessao) location.href = 'login.html';

const SERVICOS = [
    { nome: 'Corte', preco: 50 }, { nome: 'Escova', preco: 40 },
    { nome: 'Manicure', preco: 35 }, { nome: 'Coloração', preco: 120 }
];
const chave = 'agend_' + sessao.email;
const ler = () => JSON.parse(localStorage.getItem(chave) || '[]');
const salvar = l => localStorage.setItem(chave, JSON.stringify(l));

$('ola').textContent = 'Olá, ' + sessao.nome.split(' ')[0];
$('data').min = new Date().toISOString().split('T')[0];
$('servico').innerHTML = SERVICOS.map(s => `<option value="${s.nome}">${s.nome} - R$ ${s.preco}</option>`).join('');

function render() {
    const lista = ler().sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));
    $('total').textContent = lista.length;
    $('proximo').textContent = lista.length
        ? `${lista[0].servico} em ${lista[0].data.split('-').reverse().join('/')} às ${lista[0].hora}` : 'Nenhum agendamento';
    $('lista').innerHTML = lista.map(a => `
    <div class="card"><h3>${a.servico}</h3>
      <p>${a.data.split('-').reverse().join('/')} às ${a.hora}</p>
      <button class="btn" onclick="cancelar(${a.id})">Cancelar</button></div>`).join('');
}

$('formAg').onsubmit = e => {
    e.preventDefault();
    const novo = { id: Date.now(), servico: $('servico').value, data: $('data').value, hora: $('hora').value };
    if (ler().some(a => a.data === novo.data && a.hora === novo.hora)) {
        $('msg').textContent = 'Você já tem um agendamento nesse horário.'; return;
    }
    $('msg').textContent = '';
    salvar([...ler(), novo]); e.target.reset(); render();
};
window.cancelar = id => { salvar(ler().filter(a => a.id !== id)); render(); };
$('sair').onclick = () => { localStorage.removeItem('sessao'); location.href = 'index.html'; };
render();function ( {
