import peixes from "./peixes.js";

const peixe = document.querySelector("#peixe");

const botaoPescar = document.querySelector("#botao-pescar");
const botaoVender = document.querySelector("#botao-vender");

const elemCarteira = document.querySelector("#carteira");
const meusPeixes = document.querySelector("#mp");

var jaMando = false;
let Pescados = [];
let Carteira = 0;

botaoPescar.addEventListener("click", () => {
	if (Pescados.length == peixes.length)
		return alerta("Você já pescou todos os peixes!");

	let rand = Math.floor(Math.random() * 15);
	
	if(rand >= peixes.length){
		peixe.innerHTML = "";
		return alerta("Você não pegou nenhum peixe!");
	}
	
	while (Pescados.includes(peixes[rand]))
	rand = Math.floor(Math.random() * peixes.length);
	
	alerta(`Você pegou um <b>${peixes[rand]}!`, true);
	peixe.innerHTML = peixes[rand];

	Pescados.push(peixes[rand]);
	meusPeixes.innerHTML = Pescados.join(", ");
});

botaoVender.addEventListener("click", () => {
	if (Pescados.length == 0)
		return alerta("Você não tem nenhum peixe para vender!");

	Pescados.forEach(p => {
		const pos = peixes.indexOf(p);
		Carteira += 20*pos;
	});

	meusPeixes.innerHTML = "";
	Pescados = [];

	alerta("Você vendeu todos os peixes!", true);

	elemCarteira.innerHTML = `R$ ${Carteira},00`;
});


function alerta(str, green = false) {
	document.querySelector("#alerta").innerHTML = str;
	document.querySelector("#alerta").style.color = "#" + (green ? "00ff00" : "ff0000");
	if(jaMando) return;
	jaMando = true;
	setTimeout(() => {
		jaMando = false;
		document.querySelector("#alerta").innerHTML = "";
	}, 2000);
}