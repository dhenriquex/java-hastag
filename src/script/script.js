const botao = document.getElementById('play-pause');
const audio = document.getElementById('audio-capitulo');
const avancar_b = document.getElementById('proximo');
const anterior_b = document.getElementById('anterior');
const nome_c = document.getElementById('capitulo');
const progressBar = document.getElementById('progress');
const progressBall = document.getElementById('ball');
const progressContainer = document.querySelector('.progress-container'); // Adicionado
let atual =1;
const capitulo = 10;
let tocando = 0;

function mudar_faixa(){
  nome_c.innerText='Capitulo '+atual;
}

function tocar() {
  audio.play();
  botao.classList.remove('bi-play-circle-fill');
  botao.classList.add('bi-pause-circle-fill');
  
}

function pause() {
  audio.pause();
  botao.classList.remove('bi-pause-circle-fill');
  botao.classList.add('bi-play-circle-fill');
}

function alterar() {
  if (tocando === 0) {
    tocar();
    tocando = 1;
  } else {
    pause();
    tocando = 0;
  }
}

botao.addEventListener('click', alterar);

function proximo() {
  if(capitulo === atual ){
    atual=1;
  }
  else{
    atual = atual + 1;
  }
  audio.src="./src/img/books/dom-casmurro/" + atual + ".mp3"
  tocar();
  tocando=1;
  mudar_faixa()
}

function voltar() {
  if(atual === 1 ){
    atual=10;
  }
  else{
    atual = atual -1;
  }
  audio.src="./src/img/books/dom-casmurro/" + atual + ".mp3"
  tocar();
  tocando=1;
  mudar_faixa()
}

avancar_b.addEventListener('click',proximo);
anterior_b.addEventListener('click',voltar);

progressContainer.addEventListener('click', setAudioProgress);
audio.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
  const percent = (audio.currentTime / audio.duration) * 100; // Alterado para 'audio'
  progressBar.style.width = `${percent}%`;
  progressBall.style.left = `${percent}%`;
}

function setAudioProgress(e) {
  const clickX = e.clientX - progressContainer.getBoundingClientRect().left;
  const percent = (clickX / progressContainer.offsetWidth) * 100;
  audio.currentTime = (percent / 100) * audio.duration; // Alterado para 'audio'
}
