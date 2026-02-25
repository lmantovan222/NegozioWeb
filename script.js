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
 * - Crea una funzione che genera una riga di un singolo prodotto
 * - Crea una funzione che visualizza l'intera tabella dei prodotti (che richiama la funzione precedente per ogni prodotto)
 * - Crea una funzione che fa il toggle della sezione dei dettagli (mostra/nascondi)
 * - Aggiungi un event listener a ogni riga della tabella per mostrare i dettagli del prodotto cliccato (usa la funzione di toggle)
 * - Aggiungi un event listener al pulsante "Chiudi" per nascondere la sezione dei dettagli (richiama la stessa funzione di toggle)
 * 
 * Bonus:
 * - Aggiungi una barra di ricerca per filtrare i prodotti per nome (filtro testuale)
 * - Aggiungi un filtro per categoria (dropdown) per mostrare solo i prodotti di una certa categoria
 */

let URL_BASE = "http://192.168.1.131:5000/api/products";
let nomeProdotto = document.getElementById("prdottoNome");
let immagine = document.getElementById("prodottoImmagine");
let descrizione = document.getElementById("prodottoDescrizione");
let prezzo = document.getElementById("prodottoDescrizione");
let disponibilità = document.getElementById("prodottoDescrizione");
let tabella = document.getElementById("tabellaProdotti")

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

async function creaRigheProdotti(prodotti) {
    try {
        let risposta = await fetch(`${URL_BASE}`);
        if (!risposta.ok) {
            handleError("errore");
            return;
        }
        let prodotti = await risposta.json();

        for (let prodotto of prodotti) {

            let rigaProdotto = document.createElement("tr");

            let cellaImmagine = document.createElement("td");
            let immagine = document.createElement("img");
            immagine.src = prodotto.immagine;
            cellaImmagine.appendChild(immagine);

            let cellaNome = document.createElement("td");
            cellaNome.textContent = prodotto.nome;

            //let cellaDescrizione = document.createElement("td");
            //cellaDescrizione.textContent = prodotto.descrizione;

            let cellaPrezzo = document.createElement("td");
            cellaPrezzo.textContent = prodotto.prezzo;

            let cellaDisponibilita = document.createElement("td");
            cellaDisponibilita.textContent = prodotto.disponibilita
            if(prodotto.disponibilita === true){
                cellaDisponibilita.textContent = "✅"
            }
            else{
                cellaDisponibilita.textContent = "❌"
            }

            rigaProdotto.appendChild(cellaImmagine);
            rigaProdotto.appendChild(cellaNome);
            //rigaProdotto.appendChild(cellaDescrizione);
            rigaProdotto.appendChild(cellaPrezzo);
            rigaProdotto.appendChild(cellaDisponibilita);

            tabella.appendChild(rigaProdotto);
        }
    } catch { handleError("errore") }
}

creaRigheProdotti()

function mostraProdotti(prodotti) {

}

function toggleModal() {

}
