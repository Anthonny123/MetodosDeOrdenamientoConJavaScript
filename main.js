const elementos = document.querySelector(".datos");
const botonQuickSort = document.querySelector(".quickSort");
const botonGenerarElementos = document.querySelector(".generarArray");

function generarBloques(num = 20){
	if(num && typeof num !== "number"){
		alert("First argument must be a typeof Number");
		return;
	}

	for(let i = 0; i < num; i++){
		const valor = Math.floor(Math.random() * 100);
		const vela = document.createElement("div");
		vela.classList.add("cuadro");
		vela.style.height = `${valor * 3}px`;
		vela.style.transform = `translate(${i * 30}px)`;

		const etiquetaBloque = document.createElement("etiqueta");
		etiquetaBloque.classList.add("block__id");
		etiquetaBloque.innerHTML = valor;

		vela.appendChild(etiquetaBloque);
		elementos.appendChild(vela);
	}
}



function swap2(arr, a, b){
	let aux = arr[a];
	arr[a] = arr[b];
	arr[b] = aux;
}


function swap(el1, el2){
	return new Promise(resolve => {
		const estilo1 = window.getComputedStyle(el1);
		const estilo2 = window.getComputedStyle(el2);

		const transform1 = estilo1.getPropertyValue("transform");
		const transform2 = estilo2.getPropertyValue("transform");

		el1.style.transform = transform2;
		el2.style.transform = transform1;

		//Espera que la transicion termine
		window.requestAnimationFrame(function(){
			setTimeout(()=>{
				elementos.insertBefore(el2,el1);
				resolve();
			}, 250);
		});
	});
}


async function bubbleSort(delay = 100){
	let velas = document.querySelectorAll(".cuadro");
	for(let i = 0; i < velas.length - 1; i++){
		for(let j = 0; j< velas.length - i - 1; j++){
			velas[j].style.backgroundColor = "#FF4949";
			velas[j + 1].style.backgroundColor = "#FF4949";

			await new Promise(resolve =>
				setTimeout(() =>{
					resolve();
				}, delay)
			);

			const valor1 = Number(velas[j].childNodes[0].innerHTML);
			const valor2 = Number(velas[j+1].childNodes[0].innerHTML);

			if(valor1 > valor2){
				await swap(velas[j], velas[j+1]);
				velas = document.querySelectorAll(".cuadro");
			}

			velas[j].style.backgroundColor = "#58B7FF";
			velas[j + 1].style.backgroundColor = "#58B7FF";
		}
		velas[velas.length - i -1].style.backgroundColor = "#13CE66";
	}
	velas[0].style.backgroundColor = "#13CE66";
}

function quickSort(arr, izq, der){
	let elementosDelArray = document.querySelectorAll('.cuadro');
	if(izq>=der){
		return;
	}
	let piv = arr[izq];
	let m = izq;
	let n = der + 1;
	while(true){
		do{
			m++;
		}while((arr[m] <= piv) && (m<der));
		do{
			n--;
		}while((arr[n] >= piv) && (n>izq));
		if(m>=n)break;
		swap(arr, m, n);
	}
	swap(arr, izq, n);
	quickSort(arr, izq, n-1);
	quickSort(arr, n+1, der);
}

botonQuickSort.addEventListener("click", ()=>{
	bubbleSort();
});

botonGenerarElementos.addEventListener("click", ()=>{
	let elementosEliminar = document.querySelectorAll(".cuadro");
	for(let i = 0; i < elementosEliminar.length; i++){
		elementos.removeChild(elementosEliminar[i]);
	}
	generarBloques();
});

generarBloques();
