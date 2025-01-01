import React, { useState ,useEffect } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { IsCorrect } from '../GameSetting/IsCorrect';
import "./App.css";



// 問題文とヒントのテキスト
const questionTexts = [
  { text: "次の三角形の\\(\\sin\\theta\\)の値を求めなさい。", hint: "\\(\\sin\\theta = \\frac{\\text{対辺}}{\\text{斜辺}}\\)です！", id: 0 }, //idの値は問題のanswerのindexと対応している
  { text: "次の三角形の\\(\\cos\\theta\\)の値を求めなさい。", hint: "\\(\\cos\\theta = \\frac{\\text{隣辺}}{\\text{斜辺}}\\)です！", id: 1 },
  { text: "次の三角形の\\(\\tan\\theta\\)の値を求めなさい。", hint: "\\(\\tan\\theta = \\frac{\\text{対辺}}{\\text{隣辺}}\\)です！", id: 2 }
];

// 問題のデータ
const questions = [
  { normalImg: import.meta.env.BASE_URL + "question-img/normal/normal 1-1-√2.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 1-1-√2 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 1-1-√2 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 1-1-√2 270.svg"], id: 112 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 1-√3-2.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 1-√3-2 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 1-√3-2 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 1-√3-2 270.svg"], id: 132 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 1-2-√3.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 1-2-√3 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 1-2-√3 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 1-2-√3 270.svg"], id: 123 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 2-√5-3.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 2-√5-3 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 2-√5-3 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 2-√5-3 270.svg"], id: 253 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 2-3-√5.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 2-3-√5 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 2-3-√5 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 2-3-√5 270.svg"], id: 235 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 3-4-5.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 3-4-5 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 3-4-5 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 3-4-5 270.svg"], id: 345 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 3-5-4.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 3-5-4 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 3-5-4 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 3-5-4 270.svg"], id: 354 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 5-12-13.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 5-12-13 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 5-12-13 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 5-12-13 270.svg"], id: 51213 },
  { normalImg: import.meta.env.BASE_URL + "/question-img/normal/normal 5-13-12.svg", hardImg: [import.meta.env.BASE_URL + "/question-img/hard/hard 5-13-12 90.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 5-13-12 180.svg", import.meta.env.BASE_URL + "/question-img/hard/hard 5-13-12 270.svg"], id: 51312 }
];

// 選択肢のデータ
const choices = [
  { id: 112, choice: ["\\(\\frac{1}{\\sqrt{2}}\\)", "\\(\\frac{1}{1}=1\\)", "\\(\\frac{\\sqrt{2}}{1}=\\sqrt{2}\\)"], answer: [ 0, 0, 1] },
  { id: 132, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\frac{\\sqrt{3}}{1}=\\sqrt{3}\\)", "\\(\\frac{2}{1}=2\\)", "\\(\\frac{2}{\\sqrt{3}}\\)"], answer: [ 0, 1, 3]  },
  { id: 123, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\frac{\\sqrt{3}}{1}=\\sqrt{3}\\)", "\\(\\frac{2}{1}=2\\)", "\\(\\frac{2}{\\sqrt{3}}\\)"], answer: [ 1, 0, 2]  },
  { id: 253, choice: ["\\(\\frac{2}{3}\\)", "\\(\\frac{2}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{2}\\)", "\\(\\frac{3}{2}\\)", "\\(\\frac{3}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{3}\\)"], answer: [ 0, 5, 1] },
  { id: 235, choice: ["\\(\\frac{2}{3}\\)", "\\(\\frac{2}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{2}\\)", "\\(\\frac{3}{2}\\)", "\\(\\frac{3}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{3}\\)"], answer: [ 5, 0, 2] },
  { id: 345, choice: ["\\(\\frac{3}{5}\\)", "\\(\\frac{3}{4}\\)", "\\(\\frac{4}{3}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{5}{4}\\)", "\\(\\frac{5}{3}\\)"], answer: [ 0, 3, 1] },
  { id: 354, choice: ["\\(\\frac{3}{5}\\)", "\\(\\frac{3}{4}\\)", "\\(\\frac{4}{3}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{5}{4}\\)", "\\(\\frac{5}{3}\\)"], answer: [ 3, 0, 2] },
  { id: 51213, choice: ["\\(\\frac{5}{13}\\)", "\\(\\frac{5}{12}\\)", "\\(\\frac{12}{5}\\)", "\\(\\frac{12}{13}\\)", "\\(\\frac{13}{12}\\)", "\\(\\frac{13}{5}\\)"], answer: [ 0, 3, 1] },
  { id: 51312, choice: ["\\(\\frac{5}{13}\\)", "\\(\\frac{5}{12}\\)", "\\(\\frac{12}{5}\\)", "\\(\\frac{12}{13}\\)", "\\(\\frac{13}{12}\\)", "\\(\\frac{13}{5}\\)"], answer: [ 3, 0, 2] }
];


const TrigonometricRationsApp = (props) => {
  const difficulty = props.difficulty;
  const [questionText,setQuestionTexts] = useState(questionTexts[0]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [question,setQuestion] = useState(getNextQuestion());
  const [questionImg,setQuestionImg] = useState(difficulty === "normal" ? question.normalImg : question.hardImg[Math.floor(Math.random() * 3)]);
  const [choice,setChoice] = useState(choices.find(choice => choice.id === question.id));
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  
  
  
  
  // 問題文のテキストを変更する関数
  function handleQuestionTexts() {
    setQuestionTexts(getNextQuestionText(questionText));
  };

  // 次の問題文のテキストを取得する関数
  function getNextQuestionText(text) {
    if (text === questionTexts[0]) {
      return questionTexts[1];
    } else if (text === questionTexts[1]) {
      return questionTexts[2];
    } else {
      return questionTexts[0];
    }
  };

  // 次の問題のデータを取得する関数
  function getNextQuestion() {
    const remainingQuestions = questions.filter(q => !usedQuestions.includes(q.id));
    const nextQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];    
    return nextQuestion;
  }

  // questionが更新されたときにquestionImgとchoiceを更新する
  useEffect(() => {
    setQuestionImg(difficulty === "normal" ? question.normalImg : question.hardImg[Math.floor(Math.random() * 3)]);
    setChoice(choices.find(choice => choice.id === question.id));
    setUsedQuestions([...usedQuestions, question.id]);
  }, [question, difficulty]);

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
        <div className='question-text'>{questionText.text}</div>
        {hintVisible && <div className="hint">ヒント: {questionText.hint}</div>}
      </MathJax>
      <img className='question-img' src={questionImg}  />
      <MathJax>
        <div className='question-choices'>
        {choice.choice.map((c, index) => (
              <button 
                className='question-button' 
                key={index} 
                onClick={ () => judgeAnswer(c) }
                disabled={isButtonDisabled} // disabled属性を追加
                >{c}</button>
        ))}
        </div>
      </MathJax>
    </div>
  </MathJaxContext>
);
}

export { TrigonometricRationsApp };

