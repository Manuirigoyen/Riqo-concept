let lista = document.getElementById("lista");
let totalText = document.getElementById("totalText");
let botonFin = document.getElementById("boton-fin");
let menuToggle = document.getElementById("menu-toggle");
let header = document.getElementById("header");
let total = 0;

menuToggle.addEventListener("click", () => {
    let menuAbierto = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", menuAbierto);
    menuToggle.setAttribute("aria-label", menuAbierto ? "Cerrar menú" : "Abrir menú");
});

document.querySelectorAll("#navbar a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
        header.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    });
});

const productos = [
    {imgSrc: "img/zapas/zapa1.png", nombre: "Nike Dunk Hi Retro", precio: 100000, stock: 3 },
    {imgSrc: "img/zapas/zapa2.png", nombre: "Nike Blazer Mid 77", precio: 110900, stock: 9 },
    {imgSrc: "img/zapas/zapa3.png", nombre: "Nike GTS 97", precio: 60000, stock: 2 },
    {imgSrc: "img/zapas/zapa4.png", nombre: "Nike Air Max Flyknit", precio: 200000, stock: 8 },
    {imgSrc: "img/zapas/zapa5.png", nombre: "Nike Air Force 1 High 07", precio: 250000, stock: 6 },
    {imgSrc: "img/zapas/zapa6.png", nombre: "Jordan Series 06", precio: 135000, stock: 2 }
];

function pintarProductos(arrayProductos) {
    for (let i = 0; i < arrayProductos.length; i++) {
        lista.innerHTML +=
            `<div class="forma">
              
                <img src="${arrayProductos[i].imgSrc}" alt="">
                <p class="nombre">${arrayProductos[i].nombre}</p>
                <p class="precio">$${arrayProductos[i].precio}</p>
                <input class="stock" type="number" id="stock${i}" value="${arrayProductos[i].stock}" readonly >
                <input class="cantidad" type="number" id="cantidad${i}" placeholder="Cant." min="1" >
                <button class="agregar" id="btn${i}">AGREGAR</button>
        
            </div>
           `
    }

    for(let i = 0; i< arrayProductos.length; i++){
        document.getElementById(`btn${i}`).addEventListener("click", ()=> {
            comprar(i, productos)
        } )
    }
}


function comprar(index, arrayProductos) {
    let stockElement = document.getElementById(`stock${index}`);
    let cantidadElement = document.getElementById(`cantidad${index}`);
    let stock = stockElement.value;
    let cantidad = cantidadElement.value;
    let precio = arrayProductos[index].precio;

    if(cantidad > 0 && cantidad <= stock){
        total += cantidad * precio;
        alert("Agregado exitosamente!. Total $" + total) ;
        totalText.innerHTML = `Total: $${total}`
        stockElement.value = stock - cantidad;
    } else {
        alert("Compra invalida. La cantidad debe ser mayor a 0 y menor o igual al stock")
    }

}

pintarProductos(productos);


botonFin.addEventListener("click", () => {
    if (total === 0) {
        alert("Seleccione algun producto para poder realizar la compra");
        return;
    }

    alert("Gracias por su compra 😊!!");
    total = 0;
    totalText.innerHTML = "Total: $0 👟";
});