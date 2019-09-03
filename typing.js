'use strict';

{   
    const words = [
        'apple',
        'sky',
        'blue',
        'middle',
        'set',
    ];
    let word;
    let loc;//なんばんめを打っているかを管理
    let score;
    let miss;
    const timeLimit = 3 * 1000;//時間制限３分
    let startTime;
    let isPlaying = false;//ゲームが始まっている時の定義

    const target = document.getElementById('target');
    const scoreLabel = document.getElementById('score');
    const missLabel = document.getElementById('miss');
    const timerLabel = document.getElementById('timer');


    
    //正解した文字を_にしていく
    function updateTarget() {
        let placeholder = '';
        for (let i = 0; i < loc; i++) {
            placeholder += '_';
        }
        target.textContent = placeholder + word.substring(loc);
    }

    function updateTimer() {
        const timeLeft = startTime + timeLimit - Date.now();
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);//toFixedは小数点第二位まで表示（1000で割るのは秒単位で表示したいから）

        const timeoutId = setTimeout(() => {
            updateTimer();
        }, 10);//カウントダウンする

        //時間が０になったら終了するようにする
        if(timeLeft < 0){
            isPlaying = false;
            clearTimeout(timeoutId);
            timerLabel.textContent = '0.00';
            setTimeout(() => {
                showResult();
            }, 100);//0.01になるエラーの修正

            target.textContent = 'click to replay';
        }
    }

    function showResult(){
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
        alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
    }

    window.addEventListener('click', () => {
        if(isPlaying == true) {
            return;//ゲームが始まっていたらもうaddEventが機能しないようにする
        }
        isPlaying = true;

        loc = 0;
        score = 0;
        miss = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        word = words[Math.floor(Math.random() * words.length)];


        target.textContent = word;
        startTime = Date.now();
        updateTimer();
    })

window.addEventListener('keydown' , (e) => {
    if (isPlaying !== true) {
        return;//ゲームが始まっていなかったらキーを押しても反応しないようにする
    }
    console.log(e.key);//打っているキーをコンソールに出力

    //正誤を判断
    if (e.key === word[loc]) {
        console.log('score');
        loc++;
        if(loc === word.length){
            word = words[Math.floor(Math.random() * words.length)];
            loc = 0;
        }//正解したら次の文章を表示する
        updateTarget();
        score++;
        scoreLabel.textContent = score;
    } else {
        console.log('miss');
        miss++;
        missLabel.textContent = miss;
    }
});

}