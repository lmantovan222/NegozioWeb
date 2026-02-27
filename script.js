/**
 * Progetto finale JS - Prodotti Negozio Online
 * Crea una pagina che mostra una lista di prodotti recuperati da un'API (es. http://localhost:5000/api/products)
 * Ogni prodotto ha: id, nome, descrizione, categoria, prezzo, immagine, disponibilità
 * 
 * FUNZIONALITÀ:
 * 1. Recupera i prodotti da API (fetch GET)
 * 2. Mostra i prodotti in una tabella con immagine, nome, prezzo e disponibilità
 * 3. Quando l'utente clicca su un prodotto, mostra i dettagli in una sezione a parte (usa le classi "modal" e "nascosto" nella sezione)
 * 4. Nella sezione dei dettagli, mostra TUTTE le info del prodotto e un pulsante "Chiudi" per nascondere la sezione
 * 
 * Suggerimenti per l'implementazione:
 * OK- Crea una funzione che genera una riga di un singolo prodotto 
 * OK- Crea una funzione che visualizza l'intera tabella dei prodotti (che richiama la funzione precedente per ogni prodotto)
 * - Crea una funzione che fa il toggle della sezione dei dettagli (mostra/nascondi)
 * - Aggiungi un event listener a ogni riga della tabella per mostrare i dettagli del prodotto cliccato (usa la funzione di toggle)
 * - Aggiungi un event listener al pulsante "Chiudi" per nascondere la sezione dei dettagli (richiama la stessa funzione di toggle)
 * 
 * Bonus:
 * - Aggiungi una barra di ricerca per filtrare i prodotti per nome (filtro testuale)
 * - Aggiungi un filtro per categoria (dropdown) per mostrare solo i prodotti di una certa categoria
 */

let URL_BASE = "http://192.168.1.131:500s0/api/products";
let modale = document.getElementById("modale");
let nomeProdotto = document.getElementById("prdottoNome");
let immagine = document.getElementById("prodottoImmagine");
let descrizione = document.getElementById("prodottoDescrizione");
let prezzo = document.getElementById("prodottoPrezzo");
let disponibilità = document.getElementById("prodottoDisponibilita");
let tabella = document.getElementById("tabellaProdotti");
let btnChiudi = document.getElementById("chiudi");
let listaProdotti = [];

function handleError(message) {
    tabella.innerHTML = '';

    let div = document.createElement('div');
    div.className = 'error';

    let strong = document.createElement('strong');
    strong.textContent = `❌ ${message}`;

    div.appendChild(strong);
    tabella.appendChild(div);
    console.error('Errore:', message);
}

function visualizzaProdotti(prodotti) {

    for (let prodotto of prodotti) {

        let rigaProdotto = document.createElement("tr");

        let cellaImmagine = document.createElement("td");
        let immagine = document.createElement("img");
        immagine.src = prodotto.immagine;
        cellaImmagine.appendChild(immagine);

        let cellaNome = document.createElement("td");
        cellaNome.textContent = prodotto.nome;

        let cellaPrezzo = document.createElement("td");
        cellaPrezzo.textContent = prodotto.prezzo;

        let cellaDisponibilita = document.createElement("td");
        cellaDisponibilita.textContent = prodotto.disponibilita;

        if (prodotto.disponibilita === true) {
            cellaDisponibilita.textContent = "✅"
        }
        else {
            cellaDisponibilita.textContent = "❌"
        }

        rigaProdotto.appendChild(cellaImmagine);
        rigaProdotto.appendChild(cellaNome);
        rigaProdotto.appendChild(cellaPrezzo);
        rigaProdotto.appendChild(cellaDisponibilita);

        tabella.appendChild(rigaProdotto);

        rigaProdotto.addEventListener("click", () => popolaModale(prodotto));

    }
}

async function creaRigheProdotti(prodotti) {
    try {
        let risposta = await fetch(`${URL_BASE}`);
        if (!risposta.ok) {
            handleError("errore");
            return;
        }
        
        let prodotti = await risposta.json();
        listaProdotti = prodotti;

        visualizzaProdotti(prodotti);


    } catch { handleError("errore") }
}

creaRigheProdotti()

function popolaModale(prodotto) {

    modale.classList.remove("nascosto");

    immagine.src = prodotto.immagine;
    nomeProdotto.textContent = prodotto.nome;
    descrizione.textContent = prodotto.descrizione;
    prezzo.textContent = prodotto.prezzo;
    disponibilità.textContent = prodotto.disponibilita;
    if (prodotto.disponibilita === true) {
        disponibilità.textContent = "✅"
    }
    else {
        disponibilità.textContent = "❌"
    }
}

function chiudiModale() {
    modale.classList.add("nascosto");
}

btnChiudi.addEventListener("click", chiudiModale);

/* Bonus:
 * OK!- Aggiungi una barra di ricerca per filtrare i prodotti per nome (filtro testuale)
 * - Aggiungi un filtro per categoria (dropdown) per mostrare solo i prodotti di una certa categoria
 *
*/

let container = document.getElementById("corpo");
let barraRicerca = document.createElement("div");
barraRicerca.innerHTML = `
    <div>
        <input type="text" id="keyword" placeholder="cerca..."></input>
            <button id="btnSearch">Cerca</button>
    </div>`;
container.prepend(barraRicerca);

let menuDropdown = document.createElement("div");
menuDropdown.innerHTML = '<div><select id="filtroCategoria"><option value="Tutte le categorie">Tutte le categorie</option><option value="computers">Computers</option><option value="telefonia">Telefonia</option><option value="accessori">Accessori</option></select></div>';
container.prepend(menuDropdown);

let filtroCategoria = document.querySelector("#filtroCategoria");


function ricercaPerNome() {
    let inputRicerca = document.querySelector("#keyword").value.trim().toLowerCase();
    tabella.innerHTML = "";
    listaProdottiFiltrata =[];

    for (let prodotto of listaProdotti) {
        if (prodotto.nome.toLowerCase().includes(inputRicerca) || prodotto.descrizione.toLowerCase().includes(inputRicerca))
            listaProdottiFiltrata.push(prodotto);

        filtroCategoria.addEventListener("change",() =>{
        let categoriaSelezionata = filtroCategoria.value;
        if(categoriaSelezionata === "tutte le categorie"){
        visualizzaProdotti(listaProdottiFiltrata);
    }
    else {
        let prodottiFiltrati = listaProdotti.filter(prodotto => prodotto.categoria === categoriaSelezionata);
        visualizzaProdotti(prodottiFiltrati);
    }
    })
    }

    visualizzaProdotti(listaProdottiFiltrata);
}

let btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", ricercaPerNome)
