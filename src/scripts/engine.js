// GEERENCIAR ESTADOS GLOBAIS:
const state = { 
  // ALTERANDO ELEMTNSO VISUAIS NA PÁGINA:
  view: { 
    squares: document.querySelectorAll(".square"), // Pegar elementos da classe "square no HTML"
    enemy: document.querySelector(".enemy"), // Para capturar a classe "enemy"
    timeLeft: document.querySelector("#time-left"), // Para manipular o id TIME
    score: document.querySelector("#score"), // Para manipular o id SCORE
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0, //Pontuação geral do usuário no game.
    curretTime: 60, //Manipula o tempo na contagem regressiva. 
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};


function countDown() {
  state.values.curretTime--; //Dimiui sempre um.
  state.view.timeLeft.textContent = state.values.curretTime; //Para atualizar o valor do contador no visual
  // Faltando dez segundos para acabar:
  if (state.values.curretTime === 10) {
    playSoundHurryUp("hurry-up");
  }
  //Para verificar se o tempo acabou:
  if (state.values.curretTime <= 0) {
    //Função "clearInterval" limpa os valores presentes nos interválos ou variáveis.
    clearInterval(state.actions.countDownTimerId); 
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    playSoundStageClear("stage clear");
  } 
}

// Tocar áudio sempre que o inimigo for acertado:
function playSoundHit(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`); // Instanciação de novo Áudio
  audio.volume = 0.1;
  audio.play(); //Executar a instância da classe Audio audio
}

//Tocar áudio quando o timer zera e o jogo termina:
function playSoundStageClear(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`)
  audio.volume = 0.1;
  audio.play();
}

//Tocar audio quando faltar dez segundos no timer:
function playSoundHurryUp(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`)
  audio.volume = 0.2;
  audio.play();
}
// SORTEANDO O INIMIGO EM UM QUADRADO ALEATÓRIO:
  // Para remover a classe "enemy" inicialmente. Não queremos que nenhum dos quuadrados tenha ele!
function randomSquare() { 
  state.view.squares.forEach((square) => { // Percorrendo os quadrados e limpando a classe "enemy"
    square.classList.remove("enemy");
  });
  //Sorteando o quadrado onde o Ralph deve aparecer!
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

//ADICIONANDO EVENTOS DE CLICK DE MOUSE:
//Listener: Recurso que fica esperando a ação a ser executada (os cliques do mouse no caso) 
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    //"addEventListener" é uma função do JS que cria um evento e o mantém em execução capturando todo o valor de entrada passado pelo usuário (que no caso serão os cliques do mouse).
    square.addEventListener("mousedown", () => { //"mousedown" é o evento de clique.
      //Se o usuário clicou (square.id) no mesmo quadrado onde o inimigo está (state.values.hitPosition)...
      if (square.id === state.values.hitPosition) {
        state.values.result++; //...acrescente um ponto na pontuação geral do usuário.
        state.view.score.textContent = state.values.result; // Para alterar o visual do score no texto
        state.values.hitPosition = null; // Para resetar o quadrado onde o inimigo está presente a fim de que o usuário não fique farmando pontos infinitamente depois de clicar uma vez. 
        playSoundHit("hit"); // Função recebe o nome do audio que deve ser tocado na função quando o clique no quadrado com o inimigo for acertado
      }
    });
  });
}

// Função de Início: Para chamar as outras funções do jogo (também chamada de INIT ou MAIN, mas o que importa é o conceito de chamar as outras funções para iniciar tudo).
function initialize() {
  addListenerHitBox();
}

initialize();
