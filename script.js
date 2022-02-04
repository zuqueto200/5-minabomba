const click = new Audio('audio/click_mouse.wav');
const bomba_explodindo = new Audio('audio/bomba.wav');
const duplo_click_mouse = new Audio('audio/duplo_click_mouse.mp3');
const ping = new Audio('audio/ping.wav');
const money = new Audio('audio/money.wav');

let contador_diamante = 0;
let contador_bomba = 0;
let ganho_cada_click = 0;
let todos_botao = []
let n_bombas = 1;
let array_aleatorio = [];
let array_aleatorio_inverso = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let memoria_aposta = 0;
let trava = false;
var revela_bomba_diamante = "classe_diamante_aparecendo_revelado"

document.getElementById("saldo").innerHTML = parseFloat(document.getElementById("saldo").innerHTML).toFixed(2)

aplica_aleatorio_nos_arrays()

var des_campo = document.querySelector("#campo_aposta")

contador_bomba_diamante_som()
// arry botoes para o contador
function contador_bomba_diamante_som() {
    for (let x = 0; x <= 15; x++) {
        todos_botao[x] = document.getElementById("bm" + (x + 1));
        contador_diamante = 0;
        contador_bomba = 0;
    }
}

document.getElementById("dobrar").addEventListener("click", acao_botao_dobrar)
document.getElementById("dividir").addEventListener("click", acao_botao_dividir)
document.getElementById("bt_apostar").addEventListener("click", estado_aposta)
document.getElementById("bt_sacar").removeEventListener("click", estado_sacar)
document.getElementById("bt_sacar").classList.add("remover_botao")
document.getElementById("bt_apostar").classList.remove("remover_botao")
document.getElementById("coloca_bomba").addEventListener("click", coloca_bomba)
document.getElementById("coloca_diamante").addEventListener("click", coloca_diamante)

function estado_aposta() {
    ping.currentTime = 0;
    ping.play();

    for (let x = 1; x <= 16; x++) {

        document.getElementById("bm" + x).classList.remove("remover_botao_diamante_bomba")
        document.getElementById("bm" + x).classList.remove("classe_diamante_aparecendo_revelado");
        document.getElementById("bm" + x).classList.remove("classe_bomba_aparecendo_revelado");
    }

    if (parseFloat(document.getElementById("campo_aposta").value) > 0) {

        document.getElementById("dobrar").removeEventListener("click", acao_botao_dobrar)
        document.getElementById("dividir").removeEventListener("click", acao_botao_dividir)
        document.getElementById("bt_apostar").removeEventListener("click", estado_aposta)
        document.getElementById("bt_sacar").addEventListener("click", estado_sacar)
        document.getElementById("bt_sacar").classList.remove("remover_botao")
        document.getElementById("bt_apostar").classList.add("remover_botao")
        document.getElementById("coloca_bomba").removeEventListener("click", coloca_bomba)
        document.getElementById("coloca_diamante").removeEventListener("click", coloca_diamante)

        if (parseFloat(document.getElementById("campo_aposta").value) <= parseFloat(document.getElementById("saldo").innerHTML).toFixed(2)) {

            limpar_bomba_diamante();
            array_aleatorio = [];
            array_aleatorio_inverso = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            aplica_aleatorio_nos_arrays()
            contador_bomba_diamante_som()
            diamante_bomba();
            des_campo.readOnly = true; // traca o campo
            document.getElementById("saldo").innerHTML = parseFloat(parseFloat(document.getElementById("saldo").innerHTML).toFixed(2) - parseFloat(document.getElementById("campo_aposta").value)).toFixed(2)
            memoria_aposta = parseFloat(document.getElementById("campo_aposta").value)

        } else {
            document.getElementById("campo_aposta").value = parseFloat(document.getElementById("saldo").innerHTML).toFixed(2)
        }
    }

}

function estado_sacar() {

    money.currentTime = 0;
    money.play();
    document.getElementById("dobrar").addEventListener("click", acao_botao_dobrar)
    document.getElementById("dividir").addEventListener("click", acao_botao_dividir)
    document.getElementById("bt_apostar").addEventListener("click", estado_aposta)
    document.getElementById("bt_sacar").removeEventListener("click", estado_sacar)
    document.getElementById("bt_apostar").classList.remove("remover_botao")
    document.getElementById("bt_sacar").classList.add("remover_botao")
    document.getElementById("coloca_bomba").addEventListener("click", coloca_bomba)
    document.getElementById("coloca_diamante").addEventListener("click", coloca_diamante)
    document.getElementById("saldo").innerHTML = parseFloat(parseFloat(document.getElementById("saldo").innerHTML) + parseFloat(document.getElementById("campo_aposta").value)).toFixed(2)

    if (contador_diamante >= 1) {
        mostra_bomba_somente()
        mostra_diamante_somente()
        document.getElementById("campo_aposta").value = memoria_aposta;

    } else {

        des_campo.readOnly = false; // traca o campo

        for (let x = 1; x <= 16; x++) {
            document.getElementById("bm" + x).classList.add("remover_botao_diamante_bomba")
        }
    }
}








function coloca_bomba() {

    if (document.getElementById("coloca_bomba_numero").innerHTML <= 14) {
        document.getElementById("coloca_bomba_numero").innerHTML = parseInt(document.getElementById("coloca_bomba_numero").innerHTML) + 1
        document.getElementById("coloca_diamante_numero").innerHTML = parseInt(document.getElementById("coloca_diamante_numero").innerHTML) - 1
        n_bombas = parseInt(document.getElementById("coloca_bomba_numero").innerHTML)
        ping.currentTime = 0;
        ping.play();
    }
}

function coloca_diamante() {

    if (document.getElementById("coloca_diamante_numero").innerHTML <= 14) {
        document.getElementById("coloca_diamante_numero").innerHTML = parseInt(document.getElementById("coloca_diamante_numero").innerHTML) + 1
        document.getElementById("coloca_bomba_numero").innerHTML = parseInt(document.getElementById("coloca_bomba_numero").innerHTML) - 1
        n_bombas = parseInt(document.getElementById("coloca_bomba_numero").innerHTML)
        ping.currentTime = 0;
        ping.play();
    }
}

function diamante_bomba() {

    ganho_cada_click = (parseFloat(document.getElementById("campo_aposta").value / 16)) * 2 * n_bombas;

    for (let x = 1; x <= 16; x++) {

        document.getElementById("bm" + x).addEventListener("click", decide_animacao_diamante_bomba)

        function decide_animacao_diamante_bomba() {
            for (let i = 1; i <= 16; i++) {
                if (document.getElementById("bm" + array_aleatorio[i - 1]) === document.getElementById("bm" + x)) {
                    document.getElementById("bm" + x).classList.add("classe_bomba_aparecendo");

                    if (todos_botao[x - 1] === document.getElementById("bm" + x)) {
                        for (let x = 1; x <= 16; x++) {

                            todos_botao[x - 1] = ""
                        } // tira o som de todos outros botoes
                        bomba_explodindo.currentTime = 0;
                        bomba_explodindo.play();
                        contador_bomba++

                        mostra_bomba_somente();
                        mostra_diamante_somente();
                        document.getElementById("campo_aposta").value = memoria_aposta;
                        document.getElementById("dobrar").addEventListener("click", acao_botao_dobrar)
                        document.getElementById("dividir").addEventListener("click", acao_botao_dividir)
                        document.getElementById("bt_apostar").addEventListener("click", estado_aposta)
                        document.getElementById("bt_sacar").removeEventListener("click", estado_sacar)
                        document.getElementById("bt_apostar").classList.remove("remover_botao")
                        document.getElementById("bt_sacar").classList.add("remover_botao")
                        document.getElementById("coloca_bomba").addEventListener("click", coloca_bomba)
                        document.getElementById("coloca_diamante").addEventListener("click", coloca_diamante)

                        if (parseFloat(document.getElementById("campo_aposta").value) > parseFloat(document.getElementById("saldo").innerHTML)) {
                            document.getElementById("campo_aposta").value = parseFloat(document.getElementById("saldo").innerHTML).toFixed(2)

                        }

                    }
                }


                if (document.getElementById("bm" + array_aleatorio_inverso[i - 1]) === document.getElementById("bm" + x)) {
                    document.getElementById("bm" + x).classList.add("classe_diamante_aparecendo");
                    if (todos_botao[x - 1] === document.getElementById("bm" + x)) {
                        todos_botao[x - 1] = ""
                        click.currentTime = 0;
                        click.play();
                        contador_diamante++
                        //console.log("DIAMANTE " + contador_diamante)
                        document.getElementById("campo_aposta").value = parseFloat(parseFloat(document.getElementById("campo_aposta").value) + ganho_cada_click).toFixed(2)
                    }
                }
            }
        }
    }
}

function acao_botao_dobrar() {

    if ((document.getElementById("campo_aposta").value === '' || parseFloat(document.getElementById("campo_aposta").value) === 0) && parseFloat(document.getElementById("saldo").innerHTML) > 0) {
        document.getElementById("campo_aposta").value = parseFloat(0.01).toFixed(2)
        ping.currentTime = 0;
        ping.play();

    } else {

        document.getElementById("campo_aposta").value = parseFloat(document.getElementById("campo_aposta").value * 2).toFixed(2);
        if (parseFloat(document.getElementById("campo_aposta").value) > parseFloat(document.getElementById("saldo").innerHTML).toFixed(2)) { document.getElementById("campo_aposta").value = document.getElementById("saldo").innerHTML; }
        ping.currentTime = 0;
        ping.play();
    }
}

function acao_botao_dividir() {

    if (parseFloat(document.getElementById("campo_aposta").value / 2).toFixed(2) > 0) { document.getElementById("campo_aposta").value = parseFloat(document.getElementById("campo_aposta").value / 2).toFixed(2); }
    ping.currentTime = 0;
    ping.play();
}

function limpar_bomba_diamante() {
    for (let x = 1; x <= 16; x++) {
        document.getElementById("bm" + x).classList.remove("classe_diamante_aparecendo", "classe_bomba_aparecendo");
    }

}

function mostra_diamante_somente() {
    for (let x = 1; x <= 16; x++) {
        todos_botao[x - 1] = "" // tira o som
        if (document.getElementById("bm" + array_aleatorio_inverso[x - 1]) === document.getElementById("bm" + x)) {

            document.getElementById("bm" + x).classList.add("classe_diamante_aparecendo");
        }
    }
}

function mostra_bomba_somente() {
    for (let x = 1; x <= 16; x++) {
        todos_botao[x - 1] = "" // tira o som
        for (let y = 1; y <= 16; y++) {
            if (document.getElementById("bm" + array_aleatorio[y - 1]) === document.getElementById("bm" + x)) {
                document.getElementById("bm" + x).classList.add("classe_bomba_aparecendo");
            }
        }
    }
}

function aplica_aleatorio_nos_arrays() {
    for (var i = 0; i < n_bombas; i++) {
        let aleatorio = Math.floor(Math.random() * 16 + 1);
        if (array_aleatorio.indexOf(aleatorio) == -1) {
            array_aleatorio.push(aleatorio);
        } else
            i--;
    }

    for (let y = 0; y <= 15; y++) {
        for (let x = 0; x <= 15; x++) {
            if (array_aleatorio[x] === array_aleatorio_inverso[y]) {
                array_aleatorio_inverso[y] = "";
            }
        }
    }
}