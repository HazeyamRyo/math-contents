import React, { useState ,useEffect } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { IsCorrect } from '../GameSetting/IsCorrect';
import "./App.css";

const ApplicationOfTrigonometricRatiosApp = (props) => {
    const difficulty = props.difficulty;
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [question,setQuestion] = useState(getNextQuestion());
    const [step1Display,setStep1Display] = useState(false);
    const [step2Display,setStep2Display] = useState(false);
    const [step3Display,setStep3Display] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    // 問題文とヒントのテキスト
const questionText = "次の三角形の\\(\\theta\\)の値を求めなさい。";
const infoText = "一緒に解いてみよう！";
const step1 = "この直角三角形の辺の長さから求められるのは\\(\\sin\\theta\\),\\(\\cos\\theta\\),\\(\\tan\\theta\\)のうちどれだろう。まずは辺の長さが分かっている辺の名前を考えよう";
const step2 = `\\(\\${currentType}\\theta\\)の値を求めよう!以下の選択肢のうちどれだろうか。`;
const step3 = `\\(\\${currentType}\\theta=${question.step}\\)であることが分かりました！\\(\\theta\\)の値を求めよう`;
const hintSin = "今わかっている辺は斜辺と対辺です。この２つの辺の長さから導けるのはどれだろう。";
const hintCos = "今わかっている辺は斜辺と隣辺です。この２つの辺の長さから導けるのはどれだろう。";
const hintTan = "今わかっている辺は対辺と隣辺です。この２つの辺の長さから導けるのはどれだろう。";
const hint304560 = `\\(\\${question.type}\\theta\\)の値が${question.step}であるときの\\(\\theta\\)に当てはまる角度は覚えたような・・`;
const hintGeneral = `\\(\\${question.type}\\theta\\)の値が${question.step}であるときの\\(\\theta\\)に当てはまる角度は知らない→三角比の表に頼ろう！`;


// 問題のデータ
const questions = [
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-1-√2-sin.svg", 
        type : "sin", 
        step : "\\(\\frac{1}{\\sqrt{2}}\\)",
        answer: "45°", 
        hint1: hintSin , 
        hint2: hint304560,
        id: 112
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-1-√2-cos.svg", 
        type : "cos", 
        step : "\\(\\frac{1}{\\sqrt{2}}\\)",
        answer: "45°", 
        hint1: hintCos , 
        hint2: hint304560,
        id: 112
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-1-√2-tan.svg", 
        type : "tan", 
        step : "1",
        answer: "45°", 
        hint1: hintTan , 
        hint2: hint304560,
        id: 112
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-√3-2-sin60.svg",
        type : "sin",
        step : "\\(\\frac{\\sqrt{3}}{2}\\)",
        answer: "60°",
        hint1: hintSin,
        hint2: hint304560,
        id: 132
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-√3-2-cos60.svg",
        type : "cos",
        step : "\\(\\frac{1}{2}\\)",
        answer: "60°",
        hint1: hintCos,
        hint2: hint304560,
        id: 132
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-√3-2-tan60.svg",
        type : "tan",
        step : "\\(\\sqrt{3}\\)",
        answer: "60°",
        hint1: hintTan,
        hint2: hint304560,
        id: 132
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-2-√3-sin30.svg",
        type : "sin",
        step : "\\(\\frac{1}{2}\\)",
        answer: "30°",
        hint1: hintSin,
        hint2: hint304560,
        id: 123
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-2-√3-cos30.svg",
        type : "cos",
        step : "\\(\\frac{\\sqrt{3}}{2}\\)",
        answer: "30°",
        hint1: hintCos,
        hint2: hint304560,
        id: 123
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/1-2-√3-tan30.svg",
        type : "tan",
        step : "\\(\\frac{1}{\\sqrt{3}}\\)",
        answer: "30°",
        hint1: hintTan,
        hint2: hint304560,
        id: 123
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/3-4-5-sin.svg",
        type : "sin",
        step : "\\(\\frac{3}{5}\\)",
        answer: "37°",
        hint1: hintSin,
        hint2: hintGeneral,
        id: 345
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/3-4-5-cos.svg",
        type : "cos",
        step : "\\(\\frac{4}{5}\\)",
        answer: "37°",
        hint1: hintCos,
        hint2: hintGeneral,
        id: 345
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/3-4-5-tan.svg",
        type : "tan",
        step : "\\(\\frac{3}{4}\\)",
        answer: "37°",
        hint1: hintTan,
        hint2: hintGeneral,
        id: 345
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/5-12-13-sin.svg",
        type : "sin",
        step : "\\(\\frac{5}{13}\\)",
        answer: "23",
        hint1: hintSin,
        hint2: hintGeneral,
        id: 51213
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/5-12-13-cos.svg",
        type : "cos",
        step : "\\(\\frac{12}{13}\\)",
        answer: "23°",
        hint1: hintCos,
        hint2: hintGeneral,
        id: 51213
    },
    {   Img : import.meta.env.BASE_URL + "/application-questioin-img/find-the-angle/5-12-13-tan.svg",
        type : "tan",
        step : "\\(\\frac{5}{12}\\)",
        answer: "23°",
        hint1: hintTan,
        hint2: hintGeneral,
        id: 51213
    },
];


// 選択肢のデータ
const choices1= ["\\(\\sin\\theta\\)","\\(\\cos\\theta\\)","\\(\\tan\\theta\\)"];

const choices2 = [
    { id: 112, choice: ["\\(\\frac{1}{\\sqrt{2}}\\)", "1", "\\(\\sqrt{2}\\)"],},
    { id: 132, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\sqrt{3}\\)", "2", "\\(\\frac{2}{\\sqrt{3}}\\)"]},
    { id: 123, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\sqrt{3}\\)", "2", "\\(\\frac{2}{\\sqrt{3}}\\)"]},
    { id: 345, choice: ["\\(\\frac{3}{5}\\)", "\\(\\frac{3}{4}\\)", "\\(\\frac{4}{3}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{5}{4}\\)", "\\(\\frac{5}{3}\\)"]},
    { id: 51213, choice: ["\\(\\frac{5}{13}\\)", "\\(\\frac{5}{12}\\)", "\\(\\frac{12}{5}\\)", "\\(\\frac{12}{13}\\)", "\\(\\frac{13}{12}\\)", "\\(\\frac{13}{5}\\)"]},
];


    // 問題文をセットする
function getNextQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    setUsedQuestions([...usedQuestions, question]);
    setQuestion(question);}


      // MathJaxの再レンダリングを強制する
      useEffect(() => {
        window.MathJax && window.MathJax.typeset();
    }, [questionText, questionImg, choice]);


  // 問題の挙動を作る
  function displayQuestion() {
    handleQuestionTexts();
    setHintVisible(false); //ヒントを非表示にする関数。GameSettingからpropsで受け取る
    if (questionText === questionTexts[2]) {
      if (usedQuestions.length >= props.numberOfQuestions) {
        if (props.isTimeAttackMode) {
          props.endGame(); // リザルト画面を表示関数。GameSettingからpropsで受け取る
          } else {
          props.stopGame(); // ゲームを終了する関数。GameSettingからpropsで受け取る
        }
      } else {
        setQuestion(getNextQuestion(usedQuestions));
        props.scoreChange(); //スコアを+1する関数。GameSettingからpropsで受け取る
      }
    }
    };
  

  //正誤判定する関数
  function judgeAnswer(answer) {
    if (isButtonDisabled) return; // ボタンが無効化されている場合は何もしない
    setIsButtonDisabled(true); // ボタンを無効化
    const currentAnswerIndex = choice.answer[questionText.id];
    const currentAnswer = choice.choice[currentAnswerIndex];
    if (answer === currentAnswer) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  };

  //正解した時の処理
  function correctAnswer() {
    setIsCorrect(true);
    setTimeout(() => {
      displayQuestion();
      setIsButtonDisabled(false); // ボタンを再度有効化
    }, 2000); // 2秒後に次の問題を表示
  }

  //不正解だった時の処理
  function wrongAnswer() {
    setIsWrong(true);
    props.setPenaltyTime(props.penaltyTime+5); // ペナルティタイムを5秒追加する関数。GameSettingからpropsで受け取る
    setHintVisible(true); //ヒントを表示する関数。GameSettingからpropsで受け取る
    setTimeout(() => {
      setIsButtonDisabled(false); // ボタンを再度有効化
    }, 2000); // 2秒後にボタンを再度有効化
  }

  


return (
<MathJaxContext>
    <div className='question-container'>
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
        {(step1Display && difficulty === "normal") && <div className='step1'>
            <p>{step1}</p>
            <p>{question.hint1}</p>
            {choices1.map((choice, index) => (
                <button
                    className='question-button'
                    key={index}
                    onClick={() => judgeAnswer(choice)}
                    disabled={isButtonDisabled}
                >
                    {choice}
                </button>
            ))}
        </div>}
    </MathJax>
    <MathJax>
        {(step2Display && difficulty === "normal")  && <div className='step2'>
            <p>{step2}</p>
            {choices2.map((choice, index) => (
                <button
                    className='question-button'
                    key={index}
                    onClick={() => judgeAnswer(choice)}
                    disabled={isButtonDisabled}
                >
                    {choice}
                </button>
            ))}      
        </div>}
    </MathJax>
    <MathJax>
        {(step3Display && difficulty === "normal")  && <div className='step3'>
            <p>{step3}</p>
            <p>{question.hint2}</p>
        </div>}
    </MathJax>
    <MathJax>
    {(step3  || difficulty === "hard" ) && <div className="answer">
        <input 
        type="text"
        className="user-answer" 
        placeholder="半角数字で答えてください"
        value={userAnswer}
        onChange={(e) => {
            setUserAnswer(e.target.value);
            checkMatch(e.target);
        }}
        ></input>
        <button className='question-button' onClick={() => judgeAnswer(userAnswer)} disabled={isButtonDisabled} id="checkButton">答え合わせ</button>
        <div id="res"></div>
    </div>}
    </MathJax>
</div>

</MathJaxContext>
);
}

export { ApplicationOfTrigonometricRatiosApp };

