import React, { useState ,useEffect } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax';



// 問題文とヒントのテキスト
const questionTexts = [
  { text: "次の三角形の\\(\\sin\\theta\\)の値を求めなさい。", hint: "\\(\\sin\\theta = \\frac{\\text{対辺}}{\\text{斜辺}}\\)です！", id: 1 },
  { text: "次の三角形の\\(\\cos\\theta\\)の値を求めなさい。", hint: "\\(\\cos\\theta = \\frac{\\text{隣辺}}{\\text{斜辺}}\\)です！", id: 2 },
  { text: "次の三角形の\\(\\tan\\theta\\)の値を求めなさい。", hint: "\\(\\tan\\theta = \\frac{\\text{対辺}}{\\text{隣辺}}\\)です！", id: 3 }
];

// 問題のデータ
const questions = [
  { normalImg: "../../../public/question-img/normal/normal 1-1-√2.svg", hardImg: ["../../../public/question-img/hard/hard 1-1-√2 90.svg", "../../../public/question-img/hard/hard 1-1-√2 180.svg", "../../../public/question-img/hard/hard 1-1-√2 270.svg"], id: 112 },
  { normalImg: "../../../public/question-img/normal/normal 1-√3-2.svg", hardImg: ["../../../public/question-img/hard/hard 1-√3-2 90.svg", "../../../public/question-img/hard/hard 1-√3-2 180.svg", "../../../public/question-img/hard/hard 1-√3-2 270.svg"], id: 132 },
  { normalImg: "../../../public/question-img/normal/normal 1-2-√3.svg", hardImg: ["../../../public/question-img/hard/hard 1-2-√3 90.svg", "../../../public/question-img/hard/hard 1-2-√3 180.svg", "../../../public/question-img/hard/hard 1-2-√3 270.svg"], id: 123 },
  { normalImg: "../../../public/question-img/normal/normal 2-√5-3.svg", hardImg: ["../../../public/question-img/hard/hard 2-√5-3 90.svg", "../../../public/question-img/hard/hard 2-√5-3 180.svg", "../../../public/question-img/hard/hard 2-√5-3 270.svg"], id: 253 },
  { normalImg: "../../../public/question-img/normal/normal 2-3-√5.svg", hardImg: ["../../../public/question-img/hard/hard 2-3-√5 90.svg", "../../../public/question-img/hard/hard 2-3-√5 180.svg", "../../../public/question-img/hard/hard 2-3-√5 270.svg"], id: 235 },
  { normalImg: "../../../public/question-img/normal/normal 3-4-5.svg", hardImg: ["../../../public/question-img/hard/hard 3-4-5 90.svg", "../../../public/question-img/hard/hard 3-4-5 180.svg", "../../../public/question-img/hard/hard 3-4-5 270.svg"], id: 345 },
  { normalImg: "../../../public/question-img/normal/normal 3-5-4.svg", hardImg: ["../../../public/question-img/hard/hard 3-5-4 90.svg", "../../../public/question-img/hard/hard 3-5-4 180.svg", "../../../public/question-img/hard/hard 3-5-4 270.svg"], id: 354 },
  { normalImg: "../../../public/question-img/normal/normal 5-12-13.svg", hardImg: ["../../../public/question-img/hard/hard 5-12-13 90.svg", "../../../public/question-img/hard/hard 5-12-13 180.svg", "../../../public/question-img/hard/hard 5-12-13 270.svg"], id: 51213 },
  { normalImg: "../../../public/question-img/normal/normal 5-13-12.svg", hardImg: ["../../../public/question-img/hard/hard 5-13-12 90.svg", "../../../public/question-img/hard/hard 5-13-12 180.svg", "../../../public/question-img/hard/hard 5-13-12 270.svg"], id: 51312 }
];
// 選択肢のデータ
const choices = [
  { id: 112, choice: ["\\(\\frac{1}{\\sqrt{2}}\\)", "\\(\\frac{1}{1}=1\\)", "\\(\\frac{\\sqrt{2}}{1}=\\sqrt{2}\\)"], correctNumberSin: 0, correctNumbercos: 0, correctNumbertan: 1 },
  { id: 132, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\frac{\\sqrt{3}}{1}=\\sqrt{3}\\)", "\\(\\frac{2}{1}=2\\)", "\\(\\frac{2}{\\sqrt{3}}\\)"], correctNumberSin: 0, correctNumbercos: 1, correctNumbertan: 3 },
  { id: 123, choice: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\frac{\\sqrt{3}}{1}=\\sqrt{3}\\)", "\\(\\frac{2}{1}=2\\)", "\\(\\frac{2}{\\sqrt{3}}\\)"], correctNumberSin: 1, correctNumbercos: 0, correctNumbertan: 2 },
  { id: 253, choice: ["\\(\\frac{2}{3}\\)", "\\(\\frac{2}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{2}\\)", "\\(\\frac{3}{2}\\)", "\\(\\frac{3}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{3}\\)"], correctNumberSin: 0, correctNumbercos: 5, correctNumbertan: 1 },
  { id: 235, choice: ["\\(\\frac{2}{3}\\)", "\\(\\frac{2}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{2}\\)", "\\(\\frac{3}{2}\\)", "\\(\\frac{3}{\\sqrt{5}}\\)", "\\(\\frac{\\sqrt{5}}{3}\\)"], correctNumberSin: 5, correctNumbercos: 0, correctNumbertan: 2 },
  { id: 345, choice: ["\\(\\frac{3}{5}\\)", "\\(\\frac{3}{4}\\)", "\\(\\frac{4}{3}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{5}{4}\\)", "\\(\\frac{5}{3}\\)"], correctNumberSin: 0, correctNumbercos: 3, correctNumbertan: 1 },
  { id: 354, choice: ["\\(\\frac{3}{5}\\)", "\\(\\frac{3}{4}\\)", "\\(\\frac{4}{3}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{5}{4}\\)", "\\(\\frac{5}{3}\\)"], correctNumberSin: 3, correctNumbercos: 0, correctNumbertan: 2 },
  { id: 51213, choice: ["\\(\\frac{5}{13}\\)", "\\(\\frac{5}{12}\\)", "\\(\\frac{12}{5}\\)", "\\(\\frac{12}{13}\\)", "\\(\\frac{13}{12}\\)", "\\(\\frac{13}{5}\\)"], correctNumberSin: 0, correctNumbercos: 3, correctNumbertan: 1 },
  { id: 51312, choice: ["\\(\\frac{5}{13}\\)", "\\(\\frac{5}{12}\\)", "\\(\\frac{12}{5}\\)", "\\(\\frac{12}{13}\\)", "\\(\\frac{13}{12}\\)", "\\(\\frac{13}{5}\\)"], correctNumberSin: 3, correctNumbercos: 0, correctNumbertan: 2 }
];


const TrigonometricRationsApp = (props) => {
  const difficulty = props.difficulty;
  const [questionText,setQuestionTexts] = useState(questionTexts[0]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [question,setQuestion] = useState(getNextQuestion());
  const [questionImg,setQuestionImg] = useState(difficulty === "normal" ? question.normalImg : question.hardImg[Math.floor(Math.random() * 3)]);
  const [choice,setChoice] = useState(choices.find(choice => choice.id === question.id));
  
  
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


  // 問題の挙動を作る
  function displayQuestion() {
    handleQuestionTexts();
    setQuestion(getNextQuestion(usedQuestions));
  }



return (
  <MathJaxContext>
    <div>
      <MathJax>
        <div>{questionText.text}</div>
        <div>{questionText.hint}</div>
      </MathJax>
      <img src={questionImg}  />
      <MathJax>
      {choice.choice.map((c, index) => (
            <button key={index}>{c}</button>
      ))}
      </MathJax>
      <button onClick={() => { displayQuestion() }}>次の問題</button>
    </div>
  </MathJaxContext>
);
}

export { TrigonometricRationsApp };

