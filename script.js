const option =  document.querySelector('.option_list');
const btnAgain = document.querySelector('.btn-again');
const btnFinish = document.querySelector('.btn-finish');
const timeText = document.querySelector('.time-text');
const timeSecand = document.querySelector('.time-secand');
const timeLine = document.querySelector('.time-line');
const correctIcan = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcan = '<div class="icon"><i class="fas fa-times"></i></div>';
let dogruSoruSayısı = 0;

function Soru(soruMetni,cevapSecenekleri,dogruCevap){
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap){
    return cevap === this.dogruCevap;
}


let sorular = [
    new Soru("2+2 kaçtır?",{a: "1",b: "2",c: "3",d: "4"},"d"),
    new Soru("2+1 kaçtır?",{a: "1",b: "2",c: "3",d: "4"},"c"),
    new Soru("2*1 kaçtır?",{a: "1",b: "2",c: "3",d: "4"},"b"),
    new Soru("2*3 kaçtır?",{a: "3",b: "4",c: "5",d: "6"},"d"),

];

function Quiz(sorular){
    this.sorular = sorular;
    this.soruIndex = 0;
    this.dogruSoruSayısı = 0;
}


Quiz.prototype.soruGetir = function(){
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);


let btnStart = document.querySelector('.btn-start')

btnStart.addEventListener('click',function(){
        stratrTimeLine();
        document.querySelector('.quiz-box').classList.add('active');
        let soru = quiz.soruGetir();
        soruGöster(soru);
        startTime(10);        
});

function soruGöster(soru){
    let question = `<span>${soru.soruMetni}</span>`;
    let options = '';
    for(let cevap in soru.cevapSecenekleri){
        options += 
        `
            <div class="option">
                <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
            </div>
        `
    }
    document.querySelector('.question_text').innerHTML = question;
    option.innerHTML = options;
    let o = option.querySelectorAll('.option');

    for(let opt of o){
        opt.setAttribute("onclick" , "optionSelected(this)")
    }
    soruSayisi(quiz.soruIndex + 1,sorular.length);

}


document.querySelector('.btn-next').addEventListener('click',function(){
    clearInterval(counterLine);
    stratrTimeLine();
    document.querySelector('.btn-next').classList.remove('show');
    quiz.soruIndex += 1;
    startTime(10);
    if(quiz.soruIndex < sorular.length){    
        let soru = quiz.soruGetir();
        soruGöster(soru);
    }else{
        document.querySelector('.quiz-result').classList.add('active');
        document.querySelector('.quiz-box').classList.remove('active');

        let result_text = `<span class="theresult">Toplam ${sorular.length} Sorudan ${quiz.dogruSoruSayısı} Doğru Cevap Verdiniz.</span>`;
        document.querySelector('.text-result').innerHTML = result_text;
    }
    // document.querySelector('.btn-previous').classList.add('show');
})

function optionSelected(option) {
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();
    clearInterval(counter);
    clearInterval(counterLine);
    if(soru.cevabiKontrolEt(cevap)){
       option.classList.add('correct');
       option.insertAdjacentHTML('beforeend', correctIcan);
       quiz.dogruSoruSayısı += 1;
    }else{
       option.classList.add('incorrect');
       option.insertAdjacentHTML('beforeend', incorrectIcan);
    }
    document.querySelector('.btn-next').classList.add('show');
    for(let i=0 ; i < option.parentElement.children.length ; i++ ){
        option.parentElement.children[i].classList.add('disable');
    };
};

function soruSayisi(sira, toplamSoru){
    document.querySelector('.card-footer .question-index').innerHTML=`<div class="badge bg-warning">${sira}/${toplamSoru}</div>`;
}

// document.querySelector('.btn-previous').addEventListener('click',function(){
//     quiz.soruIndex  -= 1;
//     let soru = quiz.soruGetir();
//     soruGöster(soru);
// })

btnFinish.addEventListener('click',function(){
    window.location.reload();
});

btnAgain.addEventListener('click',function(){
    quiz.soruIndex = 0;
    quiz.dogruSoruSayısı = 0;
    clearInterval(counter);
    clearInterval(counterLine);
    btnStart.click();
    document.querySelector('.quiz-result').classList.remove('active');
    
})

let counter;

function startTime(time){
    counter = setInterval(timer, 1000);

    function timer(){
        timeSecand.textContent = time;
        time--;
        let timeText = `Kalan Süre`
        document.querySelector('.time-text').innerText = timeText;

        if(time < 0){
            let timeText = `Süre Bitti`
            document.querySelector('.time-text').innerText = timeText;
            clearInterval(counter);
            document.querySelector('.btn-next').classList.add('show');
            let opt = document.querySelectorAll('.option');
            for(o of opt){
                let cevap = o.querySelector("span b").textContent;
                let trueValue = sorular[quiz.soruIndex].dogruCevap;
                o.classList.add('disable');
                if(cevap === trueValue){
                    o.classList.add('correct');
                    o.insertAdjacentHTML('beforeend', correctIcan);

                }
            }
        }
    }
}
let counterLine;
function stratrTimeLine(){
    let width = 0;

    counterLine = setInterval(timer, 20);

    function timer(){
        width += 1; 
        timeLine.style.width = width + "px"; 

        if(width > 548){
            clearInterval(counterLine);
        }
    }
}
