import React, { useState, useEffect } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { IsCorrect } from '../GameSetting/IsCorrect';
import "./App.css";

//難易度normalの問題
const normalQuestionsContaner = [{
    id: 1,
    angle: 30,
    choices: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\frac{\\sqrt{3}}{1}=\\sqrt{3}\\)", "\\(\\frac{2}{1}=2\\)", "\\(\\frac{2}{\\sqrt{3}}\\)"], 
    correctSin: 1,
    correctCos: 0,
    correctTan: 2,
},{
    id: 2,
    angle: 45,
    choices:["\\(\\frac{1}{\\sqrt{2}}\\)", "\\(\\frac{1}{1}=1\\)", "\\(\\frac{\\sqrt{2}}{1}=\\sqrt{2}\\)"],
    correctSin: 0,
    correctCos: 0,
    correctTan: 1,
},{
    id: 3,
    angle: 60,
    choices: ["\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(\\frac{\\sqrt{3}}{1}=\\sqrt{3}\\)", "\\(\\frac{2}{1}=2\\)", "\\(\\frac{2}{\\sqrt{3}}\\)"],
    correctSin: 0,
    correctCos: 1,
    correctTan: 3,
}];

//難易度normalの問題を生成
const normalQuestions = [];
normalQuestionsContaner.forEach((question) => {
    const sinValue = question.choices[question.correctSin];
    const cosValue = question.choices[question.correctCos];
    const tanValue = question.choices[question.correctTan];
    const angle = question.angle;
    const choices = question.choices;

    push(sinValue, angle, "sin", choices);
    push(cosValue, angle, "cos", choices);
    push(tanValue, angle, "tan", choices);
});

//normalの問題文を生成する関数たち
function selectTextNormal(value, angle, sct) {
    let questionText, correctAnswer;
    questionText = `\\(\\${sct}${angle}°\\)の値を求めなさい `;
    correctAnswer = value;
    return { questionText, correctAnswer };
}

function push(value, angle, sct, choices) {
    let { questionText, correctAnswer } = selectTextNormal(value, angle, `${sct}`);
    normalQuestions.push({
        id: angle,
        angle: angle,
        question: questionText,
        correctAnswer: correctAnswer,
        choices: choices
    });
}

//難易度hardの問題を生成
//1°から89°までの問題を生成。正弦，余弦、正接をランダムに尋ねる。answerは小数点以下4桁まで表示
const hardQuestions = [];
for (let angle = 1; angle < 90; angle++) {
    const sinValue = Math.sin(angle * Math.PI / 180).toFixed(4);
    const cosValue = Math.cos(angle * Math.PI / 180).toFixed(4);
    const tanValue = Math.tan(angle * Math.PI / 180).toFixed(4);

    const { questionText, correctAnswer } = selectTextHard(sinValue, cosValue, tanValue, angle);

    hardQuestions.push({
        id: angle,
        angle: angle,
        question: questionText,
        correctAnswer: correctAnswer
    });
}

//hardの問題文を生成する関数
function selectTextHard(sinValue, cosValue, tanValue, angle) {
    const questionType = Math.floor(Math.random() * 3); // 0: sin, 1: cos, 2: tan
    let questionText, correctAnswer;
    if (questionType === 0) {
        questionText = `\\(\\sin${angle}°\\)の値を求めなさい`;
        correctAnswer = sinValue;
    } else if (questionType === 1) {
        questionText = `\\(\\cos${angle}°\\)の値を求めなさい`;
        correctAnswer = cosValue;
    } else {
        questionText = `\\(\\tan${angle}°\\)の値を求めなさい`;
        correctAnswer = tanValue;
    }
    return { questionText, correctAnswer };
}

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
    }
}

export const TrigonometricRationsApp2 = (props) => {
    const difficulty = props.difficulty;
    const [question, setQuestion] = useState(null);
    const [questionText, setQuestionText] = useState(null);
    const [choices, setChoices] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // コンポーネントがマウントされたときに最初の問題を設定する
    useEffect(() => {
        const initialQuestion = getNextQuestion(difficulty);
        setQuestion(initialQuestion);
    }, [difficulty]);

    // questionが更新されたときにquestionTextとchoicesとcurrentAnswerを更新する
    useEffect(() => {
        if (question) {
            setQuestionText(question.question);
            setChoices(question.choices);
            setCurrentAnswer(question.correctAnswer);
        }
    }, [question]);

    //問題の難易度を取得し問題を選択してセットする
    function getNextQuestion(d) {
        if (d === "normal") {
            return selectQuestion(normalQuestions);
        } else {
            return selectQuestion(hardQuestions);
        }
    }

    //問題をランダムに選ぶ関数
    function selectQuestion(questions) {
        const questionIndex = Math.floor(Math.random() * questions.length);
        return questions[questionIndex];
    }


    // 問題の挙動を作る
    function displayQuestion() {
        if (props.score >= props.numberOfQuestions) {
            if (props.isTimeAttackMode) {
                props.endGame(); // リザルト画面を表示関数。GameSettingからpropsで受け取る
                } else {
                props.stopGame(); // ゲームを終了する関数。GameSettingからpropsで受け取る
            }
        } else {
            setQuestion(getNextQuestion(difficulty));
            props.scoreChange(); //スコアを+1する関数。GameSettingからpropsで受け取る
        }
    }

    //正誤判定する関数
    function judgeAnswer(answer) {
        if (isButtonDisabled) return; // ボタンが無効化されている場合は何もしない
        setIsButtonDisabled(true); // ボタンを無効化
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
                </MathJax>
                <MathJax>
                    {difficulty === "normal" && choices && (
                        <div className='question-choices'>
                            {choices.map((c, index) => (
                                <button
                                    className='question-button'
                                    key={index}
                                    onClick={() => judgeAnswer(c)}
                                    disabled={isButtonDisabled} // disabled属性を追加
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                    {difficulty === "hard" && (
                        <div className="answer">
                            <input type="text" id="userAnswer" placeholder="半角数字で答えてください"></input>
                            <button id="checkButton">解答</button>
                            <p><span id="res"></span></p>
                        </div>
                    )}
                </MathJax>
            </div>
        </MathJaxContext>
    );
}