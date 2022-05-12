// FUNCIONES FLECHAS

// Características (diferencias con las funciones comunes):

// si solo hay una expresión, la retornan. Si tienen {sentencias}, no retornan nada al menos que coloquemos un return (no adivinan mágicamente qué o cuándo quieres "volver").
/*	const decirNombre = ()=> nombre = "Pedro";
	console.log(decirNombre()) // Muestra "Pedro"
*/

// Paréntesis opcionales ante un solo parámetro (sin parámetros se requiere paréntesis)
/*	const saludar = res => saludo = res;
	let resultado = saludar("hola gastón")
	console.log(resultado);
*/

// No son adecuadas para ser usadas como métodos y no pueden ser usadas como constructores (no nos permite).
	// Como método:
/*	const objeto = {	// Los objetos no crean nuevos contextos de ejecución (por más que estén delimitados con {})
		nombre : "Gastón",
		saludar : ()=>{console.log(`Hola ${this.nombre}`)} // La función se carga en memoria cuando se crea el objeto (en el contexto global), y en ese momento this=window.
	}
	objeto.saludar(); // nos dirá "Hola undefined"
*/
	// Como constructor:
/*	const Persona = (nombre, apellido)=>{
		this.nombre = nombre;
		this.apellido = apellido;
	}
	const persona = new Persona("Gastón", "Villarruel");
	console.log(persona.nombre);
	// Esto nos lanza un TypeError diciendo que Persona no es un constructor.
*/
/*Nota para apunte: los string que se hacen con `` se llaman template strings*/

// This contextual: no tienen propio this, sino que toman el de la función que los envuelve (por eso no puede ser constructor)
	// This usado afuera de cualquier función, hace referencia a window
	// Dentro de una función tradicional que no sea un constructor, this hace referencia a window.
/*		window.age = 10; 
		function Person() {
		  this.age = 42; // this acá es “p” porque está enlazado por new.
		  setTimeout(function () {// <-- La función tradicional se está ejecutando en el ámbito de window
		    console.log(this.age); // genera "10" porque la función se ejecuta en el ámbito de window (porque queda suelta, no la enlaza el new)
		  }, 100);
		}
		const p = new Person();

	// Las funciones flecha no predeterminan this al ámbito de window, más bien se ejecutan en el ámbito en que se crean.
		window.age = 10; 
		function Person() {
		  this.age = 42; 
		  setTimeout(()=> {// <--Función flecha ejecutándose en el ámbito de "p" (una instancia de Person)
		    console.log(this.age); // genera "42" porque la función se ejecuta en el ámbito de Person
		  }, 100);
		}
		const p1 = new Person();
*/



// FUNCIONES RECURSIVAS (Recursividad)
	// Cuando una función se llama a sí misma.
/*	const validarEdad = (msg)=>{
		let edad;
		try {
			if (msg) edad = prompt(msg); // si existe el parámetro, lo mostramos como mensaje pidiendo el dato.
			else edad = prompt("Introduce tu edad");
			edad = parseInt(edad);
			if (isNaN(edad)) throw "Introduce un número para la edad";
			if (edad>18) console.log("sos mayor de edad");
			else console.log("sos menor de edad");
		}
		catch (e){
			validarEdad(e) // si existe un error, se ejecuta nuevamente la función con el error como parámetro.
		}
	}
	validarEdad();
*/




// CLAUSURAS (o cierres)
	// Son funciones que retornan otras funciones
/*	const cambiarTamaño = size=>{
		return ()=>{	// si no retornamos una función, el evento no funcionará porque requiere una función como segundo parámetro y no el resultado de la función.
			document.querySelector('p').style.fontSize = `${size}px`;
		}
	}

	let px12 = document.getElementById('12px');
	let px14 = document.getElementById('14px');
	let px16 = document.getElementById('16px');

	px12.addEventListener('click', cambiarTamaño(12));
	px14.addEventListener('click', cambiarTamaño(14));
	px16.addEventListener('click', cambiarTamaño(16));
*/
	//https://www.w3schools.com/js/js_function_closures.asp
	//https://www.youtube.com/watch?v=JXG_gQ0OF74
	//Re mil importante para entender Execution Context: https://gustavodohara.com/blogangular/execution-context-contexto-ejecucion-javascript/

	//para crear una clausura, necesitamos 3 ingredientes:
		// 1. Una función que se ejecute dentro de otra función (función anidada)
		// 2. Alguna variable que se encuentre en el scope de la función más grande y que la función de adentro la utilice de alguna manera
		// 3. Invocar a la función interna desde otro scope (no desde donde está escrita)


	function crearContador(){
		let contador = 0;
		return function incrementar(){
			contador++;
			console.log(contador)
			return contador;
		}
		
	}

	const contador1 = crearContador(); // como crearContador devuelve la función incrementar(), ahora contador es la función incrementar. La sacamos del scope interno y la llevamos al scope global con el nombre "contador1", pero sigue teniendo acceso a la variable contador que se encuentra en el scope padre, por más que luego la invoquemos desde otro scope.

	contador1();
	contador1(); // De esta manera, no se vuelve a llamar a la función crearContador (se vuelve a ejecutar la función anidada), y por lo tanto seguimos en el contexto de ejecución de esa función y el contador no volverá a 0.

	//las clausuras hacen posible que una función tenga variables "privadas".

	//Cada vez que se ejecuta una función en JS, se crea un nuevo contexto de ejecución con un nuevo enterno léxico (objeto dónde se almacenan las variables y sus valores). Por lo tanto si creo un contador2, éste empezará de 0 (mientras el otro contador seguirá intacto porque pertenece a otro entorno):

	const contador2 = crearContador();

	contador2();
	contador2();
	contador2();

	// En lugar de devolver una clausura, también podemos retornar un objeto que tenga como métodos varias clausuras (funciones):
		
		/*Nota para apunte: API (de un objeto) es la interfaz que tiene un objeto para interactuar con el mismo. Métodos que podemos invocar sobre el mismo y propiedades internas que nos permite acceder.*/

	function crearContador2(){
		let contador = 0;
		return {
			incremetar: function (){
			contador++;
			return contador;
			},
			decrementar: function (){
				contador--;
				return contador;
			},
			obtenerValor: function (){
				console.log('contador 3: ', contador);
				return contador;
			}
		}
	}

	const contador3 = crearContador2(); //ahora contador3 es un objeto con tres métodos.

	contador3.incremetar();		//contador = 1
	contador3.incremetar();		//contador = 2
	contador3.decrementar();	//contador = 1
	contador3.obtenerValor();	//muestra el valor de contador

	// Usos Principales de las clausuras: 

		//1. Proteger el acceso a las variables: la única manera que tengo de acceder al valor de contador es incrementándolo a través de la clausura. No podemos acceder de otra manera.

		//2. Fábrica de funciones: ya que podemos colocar la variable contador como parámetro y luego llamar a la función enviando como parámetro el valor inicial del contador.
	



// PARÁMETROS POR DEFECTO:
// Cuando llamamos a una función que requiere parámetros, sin pasarle los parámetros, el valor de éstos será 'undefined'. Para darle un valor por defecto, lo podemos hacer de la siguiente manera:
	const suma = (a = 0, b = 0)=>{
		let resultado = a + b;
		console.log('el resultado de la suma es: ', resultado);
	}
	suma(); // muestra '0'. (si no le configuraramos los parámetros por defecto, el resultado sería 'NaN' (undefined + undefined)).

 

 // PARÁMETRO REST
 // Permite representar un número indefinido de argumentos como un array.
 	const multiplicar = (...arg) => {
 		console.log(arg);	// muestra un array con los argumentos
 		let resultado = 1;
 		for (let i = arg.length - 1; i >= 0; i--) {
 			resultado *= arg[i] 
 		}
 		console.log('el resultado de la multiplicación es: ',resultado)
 	}
 	multiplicar(2,3,5,10);

 

// DESTRUCTURING (desestructuración)
// Expresión para hacer posible la extracción de datos desde arrays y objetos.
	//en objetos:
	const person = {
		name: "Gastón",
		age: 34,
		email: "gasnvillarruel@gmail.com"
	}

	const {name, age, email} = person; // si queremos cambiar el nombre de la variable que guarda la propiedad, deberíamos escribir, por ejemplo, "{name:nombre}"
	console.log(name, age, email);
	
	//en arrays:
	const numbers = [1, 2, 3, 4];

	const [one, two, three, four] = numbers;
	console.log(four);


	//Función destructuradora:
	const destructurarArray = ([a,b])=>{
		console.log('el segundo valor del array es: ', b)
	}

	destructurarArray(numbers);

	//desestructurar petición:
	const getUsers = async ()=>{
		const {data:users} = await axios('http://jsonplaceholder.typicode.com/users')
		console.log("la propiedad data de la petición realizada contiene el siguiente valor: ",users)
	}
	getUsers();