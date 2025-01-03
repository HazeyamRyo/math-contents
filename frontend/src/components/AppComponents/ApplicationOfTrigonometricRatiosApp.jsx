import React, { useState ,useEffect } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { IsCorrect } from '../GameSetting/IsCorrect';
import "./App.css";

const hintSin = "ヒント：今わかっている辺は斜辺と対辺です。この２つの辺の長さから導けるのはどれだろう。";
const hintCos = "ヒント：今わかっている辺は斜辺と隣辺です。この２つの辺の長さから導けるのはどれだろう。";
const hintTan = "ヒント：今わかっている辺は対辺と隣辺です。この２つの辺の長さから導けるのはどれだろう。";

// 問題のデータ
const questions = [
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-1-√2-sin.svg", 
        type : "sin", 
        step : "\\(\\frac{1}{\\sqrt{2}}\\)",
        answer: "45", 
        hint1: hintSin , 
        hint2: `ヒント：\\(\\sin\\theta\\)の値が\\(\\frac{1}{\\sqrt{2}}\\)であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 112
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-1-√2-cos.svg", 
        type : "cos", 
        step : "\\(\\frac{1}{\\sqrt{2}}\\)",
        answer: "45", 
        hint1: hintCos , 
        hint2: `ヒント：\\(\\cos\\theta\\)の値が"\\(\\frac{1}{\\sqrt{2}}\\)"であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 112
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-1-√2-tan.svg", 
        type : "tan", 
        step : "1",
        answer: "45", 
        hint1: hintTan , 
        hint2: `ヒント：\\(\\tan\\theta\\)の値が1であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 112
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-√3-2-sin60.svg",
        type : "sin",
        step : "\\(\\frac{\\sqrt{3}}{2}\\)",
        answer: "60",
        hint1: hintSin,
        hint2: `ヒント：\\(\\sin\\theta\\)の値が\\(\\frac{\\sqrt{3}}{2}\\)であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 132
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-√3-2-cos60.svg",
        type : "cos",
        step : "\\(\\frac{1}{2}\\)",
        answer: "60",
        hint1: hintCos,
        hint2: `ヒント：\\(\\cos\\theta\\)の値が\\(\\frac{1}{2}\\)であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 132
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-√3-2-tan60.svg",
        type : "tan",
        step : "\\(\\sqrt{3}\\)",
        answer: "60",
        hint1: hintTan,
        hint2: `ヒント：\\(\\tan\\theta\\)の値が\\(\\sqrt{3}\\)であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 132
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-2-√3-sin30.svg",
        type : "sin",
        step : "\\(\\frac{1}{2}\\)",
        answer: "30",
        hint1: hintSin,
        hint2: `ヒント：\\(\\sin\\theta\\)の値が\\(\\frac{1}{2}\\)であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 123
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-2-√3-cos30.svg",
        type : "cos",
        step : "\\(\\frac{\\sqrt{3}}{2}\\)",
        answer: "30",
        hint1: hintCos,
        hint2: `ヒント：\\(\\cos\\theta\\)の値が\\(\\frac{\\sqrt{3}}{2}\\)であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 123
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/1-2-√3-tan30.svg",
        type : "tan",
        step : "\\(\\frac{1}{\\sqrt{3}}\\)",
        answer: "30",
        hint1: hintTan,
        hint2: `ヒント：\\(\\tan\\theta\\)の値が\\(\\frac{1}{\\sqrt{3}}\\)であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`,
        id: 123
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/3-4-5-sin.svg",
        type : "sin",
        step : "\\(\\frac{3}{5}\\)",
        answer: "37",
        hint1: hintSin,
        hint2: `ヒント：\\(\\sin\\theta\\)の値が\\(\\frac{3}{5}\\)であるときの\\(\\theta\\)に当てはまる角度は知らない→分数を少数に直して、三角比の表に頼ろう！`,
        id: 345
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/3-4-5-cos.svg",
        type : "cos",
        step : "\\(\\frac{4}{5}\\)",
        answer: "37",
        hint1: hintCos,
        hint2: `ヒント：\\(\\cos\\theta\\)の値が\\(\\frac{4}{5}\\)であるときの\\(\\theta\\)に当てはまる角度は知らない→分数を少数に直して、三角比の表に頼ろう！`,
        id: 345
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/3-4-5-tan.svg",
        type : "tan",
        step : "\\(\\frac{3}{4}\\)",
        answer: "37",
        hint1: hintTan,
        hint2: `ヒント：\\(\\tan\\theta\\)の値が\\(\\frac{3}{4}\\)であるときの\\(\\theta\\)に当てはまる角度は知らない→分数を少数に直して、三角比の表に頼ろう！`,
        id: 345
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/5-12-13-sin.svg",
        type : "sin",
        step : "\\(\\frac{5}{13}\\)",
        answer: "23",
        hint1: hintSin,
        hint2: `ヒント：\\(\\sin\\theta\\)の値が\\(\\frac{5}{13}\\)であるときの\\(\\theta\\)に当てはまる角度は知らない→分数を少数に直して、三角比の表に頼ろう！`,
        id: 51213
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/5-12-13-cos.svg",
        type : "cos",
        step : "\\(\\frac{12}{13}\\)",
        answer: "23",
        hint1: hintCos,
        hint2: `ヒント：\\(\\cos\\theta\\)の値が\\(\\frac{12}{13}\\)であるときの\\(\\theta\\)に当てはまる角度は知らない→分数を少数に直して、三角比の表に頼ろう！`,
        id: 51213
    },
    {   Img : import.meta.env.BASE_URL + "application-question-img/find-the-angle/5-12-13-tan.svg",
        type : "tan",
        step : "\\(\\frac{5}{12}\\)",
        answer: "23",
        hint1: hintTan,
        hint2: `ヒント：\\(\\tan\\theta\\)の値が\\(\\frac{5}{12}\\)であるときの\\(\\theta\\)に当てはまる角度は知らない→分数を少数に直して、三角比の表に頼ろう！`,
        id: 51213
    },
];

//　解答欄の入力規制
function checkMatch(event) {
    const text = event.value;
    const check = text.match(/[^0-9.]/);
    const checkButton = document.getElementById("checkButton");
    const res = document.getElementById("res");
    if (check !== null) {
        res.innerText = "※「" + check + "」は半角数字以外の文字です。半角数字を入力してください。";
        checkButton.disabled = true;
    } else {
        res.innerText = "";
        checkButton.disabled = false
    }
}

const ApplicationOfTrigonometricRatiosApp = (props) => {
    const difficulty = props.difficulty;
    const totalSteps = 3;
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [question,setQuestion] = useState(() => getNextQuestion());
    const [currentStep, setCurrentStep] = useState(1);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isButton2Disabled, setIsButton2Disabled] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [advise1, setAdvise1] = useState(false);
    const [advise2, setAdvise2] = useState(false);

    // 問題文とヒントのテキスト
    const questionText = "問　次の三角形の\\(\\theta\\)の値を求めなさい。";
    const infoText = "一緒に解いてみよう！";
    const step1 = "STEP1　この直角三角形の辺の長さから求められるのは\\(\\sin\\theta\\),\\(\\cos\\theta\\),\\(\\tan\\theta\\)のうちどれだろう。まずは辺の長さが分かっている辺の名前を考えよう";
    const step2 = `STEP2　\\(\\${question.type}\\theta\\)の値を求めよう!以下の選択肢のうちどれだろうか。`;
    const step3 = `STEP3　\\(\\${question.type}\\theta=\\)${question.step}であることが分かりました！\\(\\theta\\)の値を求めよう`;


// 選択肢のデータ
const choices1= ["\\(\\sin\\theta\\)","\\(\\cos\\theta\\)","\\(\\tan\\theta\\)"];

const choices2 = [
    { id: 112, choice: ["\\(\\frac{1}{\\sqrt{2}}\\)", "1", "\\(\\sqrt{2}\\)"],},
    { id: 132, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\sqrt{3}\\)", "2", "\\(\\frac{2}{\\sqrt{3}}\\)"]},
    { id: 123, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\sqrt{3}\\)", "2", "\\(\\frac{2}{\\sqrt{3}}\\)"]},
    { id: 345, choice: ["\\(\\frac{3}{5}\\)", "\\(\\frac{3}{4}\\)", "\\(\\frac{4}{3}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{5}{4}\\)", "\\(\\frac{5}{3}\\)"]},
    { id: 51213, choice: ["\\(\\frac{5}{13}\\)", "\\(\\frac{5}{12}\\)", "\\(\\frac{12}{5}\\)", "\\(\\frac{12}{13}\\)", "\\(\\frac{13}{12}\\)", "\\(\\frac{13}{5}\\)"]},
];

    // 問題をセットする
    function getNextQuestion() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }



      // MathJaxの再レンダリングを強制する
    useEffect(() => {
        window.MathJax && window.MathJax.typeset();
    }, [question]);


  // 問題の挙動を作る
    function displayQuestion() {
        setCurrentStep(1);
        setIsButtonDisabled(false);
        setIsButton2Disabled(false);
        if (usedQuestions.length +1 >= props.numberOfQuestions) {
            if (props.isTimeAttackMode) {
                props.endGame(); // リザルト画面を表示関数。GameSettingからpropsで受け取る
            } else {
                props.stopGame(); // ゲームを終了する関数。GameSettingからpropsで受け取る
            }
        } else { 
            const nextQuestion = getNextQuestion();
            setQuestion(nextQuestion);
            setUsedQuestions([...usedQuestions, nextQuestion]); // 使用済みリストに追加
            props.scoreChange(); //スコアを+1する関数。GameSettingからpropsで受け取る
            setUserAnswer(""); // ユーザーの解答をリセット
            }
    }

//step2の選択肢を表示する関数
    function displayChoices2() {
        const choices = choices2.find(choice => choice.id === question.id);
        return choices.choice;
    }

  //正誤判定する関数
    function judgeAnswerStep1(answer) {
        if (isButtonDisabled) return; // ボタンが無効化されている場合は何もしない
        setIsButtonDisabled(true); // ボタンを無効化
        if (question.type === "sin" && answer === "\\(\\sin\\theta\\)"
            || question.type === "cos" && answer === "\\(\\cos\\theta\\)"
            || question.type === "tan" && answer === "\\(\\tan\\theta\\)") {
            setIsCorrect(true);
            setTimeout(() => {
                setCurrentStep(2);
            }, 2000);
        } else {
            wrongAnswer();
            setAdvise1(true);
        }
    };

    function judgeAnswer2(answer) {
        if (isButton2Disabled) return; // ボタンが無効化されている場合は何もしない
        setIsButton2Disabled(true); // ボタンを無効化
        if (question.step === answer) {
            setIsCorrect(true);
            setTimeout(() => {
                setCurrentStep(3);
            }, 2000);
        } else {
            wrongAnswer();
        }
    };

    function judgeAnswer3(answer) {
        if (question.answer === answer) {
            setIsCorrect(true);
            setTimeout(() => {
                displayQuestion();
            }, 2000);
        } else {
            wrongAnswer()
            setAdvise2(true);
        }
    }

  //不正解だった時の処理
    function wrongAnswer() {
        setIsWrong(true);
        props.setPenaltyTime(props.penaltyTime+5); // ペナルティタイムを5秒追加する関数。GameSettingからpropsで受け取る
        setTimeout(() => {
            if (currentStep === 1) {
                setIsButtonDisabled(false); // ボタンを再度有効化
            } else {
            setIsButton2Disabled(false); // ボタンを再度有効化
            } 
        }, 2000); // 2秒後にボタンを再度有効化
    }

    const openNewWindow = (e) => {
        e.preventDefault();
        window.open('https://www.webdentaku.com/', '', 'width=400,height=600,scrollbars=yes');
    };


    // MathJaxの再レンダリングを強制する
    useEffect(() => {
        window.MathJax && window.MathJax.typeset();
        console.log("useEffect");
    }, [question,currentStep,isCorrect,isWrong]);


return (
<MathJaxContext>
    <div className='question-container'>
        <div className="progress-bar">
        <div
        className="progress"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
    </div>

    <IsCorrect 
        isCorrect={isCorrect} 
        setIsCorrect={setIsCorrect} 
        iswrong={isWrong} 
        setIswrong={setIsWrong}
        isTimeAttackMode={props.isTimeAttackMode}
    />
    <MathJax>
        <div className='question-text'>{questionText}</div>
        {difficulty === "normal" && <div className='question-info'>{infoText}</div>}
    </MathJax>
        <img className='question-img' src={question.Img}  />
    <MathJax>
        {(currentStep >= 1 && difficulty === "normal") && <div className='step1'>
            <p className='step-text'>{step1}</p>
            {advise1 && <p>{question.hint1}</p>}
            <div className='hint-button-container'>
            {choices1.map((choice, index) => (
                <button
                    className='question-button'
                    key={index}
                    onClick={() => judgeAnswerStep1(choice)}
                    disabled={isButtonDisabled}
                >
                    {choice}
                </button>
            ))}
            {!advise1 && <button className='step-hint-button' onClick={() => setAdvise1(true)} >ヒントを表示</button>}
            </div>
        </div>}

    </MathJax>
    <MathJax>
        {(currentStep >= 2 && difficulty === "normal")  && <div className='step2'>
            <p className='step-text'>{step2}</p>
            <div className='hint-button-container'>
            {displayChoices2().map((choice, index) => (
                <button
                    className='question-button'
                    key={index}
                    onClick={() => judgeAnswer2(choice)
                    }
                    disabled={isButton2Disabled}
                >
                    {choice}
                </button>
            ))} 
            </div>     
        </div>}
    </MathJax>
    <MathJax>
        {(currentStep === 3 && difficulty === "normal")  && <div className='step3'>
            <p className='step-text'>{step3}</p>
            {advise2 && <p>{question.hint2}</p>}
            <div className='hint-button-container'>
                {!advise2 && <button className='hint-button' onClick={() => setAdvise2(true)} >ヒントを表示</button> }
                <a href="https://www.webdentaku.com/" onClick={openNewWindow} className='web-calculator'>
                    Web電卓を開く
                </a>
            </div>
        </div>}
    </MathJax>
    <MathJax>
    {( currentStep===3 || difficulty === "hard" ) && <div className="answer">
        <input 
        type="text"
        className="user-answer" 
        placeholder="半角数字で答えてください"
        value={userAnswer}
        onChange={(e) => {
            setUserAnswer(e.target.value);
            checkMatch(e.target);
        }}
        />
        <span>度</span>
        <div id="res"></div>
        <button className='step-hint-button' onClick={() => judgeAnswer3(userAnswer)} id="checkButton">答え合わせ</button>
    </div>}
    </MathJax>
</div>

</MathJaxContext>
);
}

export { ApplicationOfTrigonometricRatiosApp };

