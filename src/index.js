const wrapper = document.querySelector(".wrapper");
const carrossel = document.querySelector(".carrossel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carrossel.querySelector(".card").offsetWidth;
const carrosselChildrens = [...carrossel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carrossel.offsetWidth / firstCardWidth);

carrosselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carrossel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carrosselChildrens.slice(0, cardPerView).forEach(card => {
    carrossel.insertAdjacentHTML("beforeend", card.outerHTML);
});


arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carrossel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    carrossel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carrossel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    carrossel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrossel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carrossel.scrollLeft += firstCardWidth, 2500);
} 

autoPlay();

const infiniteScroll = () => {
    if(carrossel.scrollLeft === 0) {
        carrossel.classList.add("no-transition");
        carrossel.scrollLeft = carrossel.scrollWidth - ( 2 * carrossel.offsetWidth);
        carrossel.classList.remove("no-transition");
    } 
    
    
    else if(Math.ceil(carrossel.scrollLeft) === carrossel.scrollWidth - carrossel.offsetWidth){
        carrossel.classList.add("no-transition");
        carrossel.scrollLeft = carrossel.offsetWidth;
        carrossel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carrossel.addEventListener("mousedown", dragStart);
carrossel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carrossel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);




const botaoFormularioParceiro = document.querySelector(".bntOpen");

const modal = document.querySelector(".modal");

botaoFormularioParceiro.addEventListener("click", () => {
    modal.classList.add("aberto");
});

const botaoFecharModal = document.querySelector(".fechar-modal1");

botaoFecharModal.addEventListener("click", () => {
    modal.classList.remove("aberto");
});





const botaoFormularioCliente = document.querySelector(".bntOpen2");

const modal2 = document.querySelector(".modal2");


botaoFormularioCliente.addEventListener("click", () => {
    modal2.classList.add("aberto2");
});

const botaoFecharModal2 = document.querySelector(".fechar-modal2");

botaoFecharModal2.addEventListener("click", () => {
    modal2.classList.remove("aberto2");
});




const confirmarCadastro = document.querySelector(".botao-formulario");

confirmarCadastro.addEventListener("click", () => {
    alert("Cadastro Feito com sucesso!");
})


// BANCO DE DADOS


function fazPost(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}

function cadastraUsuario() {
    event.preventDefault()
    let url = "https://the-help-api-824b4d905b15.herokuapp.com/thehelp/auth/criar-usuario"
    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    console.log(nome)
    console.log(email)

    body = {
        "nome": nome,
        "email": email,
        "tipo": "CLIENTE"
    }

    fazPost(url, body)
}


 



