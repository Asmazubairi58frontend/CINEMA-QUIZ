import { useState } from 'react';
import './App.css';

const questions = {
  Easy: [
    { question: 'Which movie features a young lion named Simba?', options: ['Madagascar', 'The Lion King', 'Finding Nemo', 'Ice Age'], answer: 1, note: 'The Lion King was released by Disney in 1994.' },
    { question: 'What do we call the person who leads the making of a film?', options: ['Director', 'Composer', 'Editor', 'Costume designer'], answer: 0, note: 'The director guides the creative vision of a film.' },
    { question: 'Which object is traditionally used to say “Action!” on a film set?', options: ['Microphone', 'Clapperboard', 'Spotlight', 'Camera lens'], answer: 1, note: 'A clapperboard marks scenes and helps sync sound with picture.' },
    { question: 'Which film series follows a young wizard at Hogwarts?', options: ['The Hobbit', 'The Hunger Games', 'Harry Potter', 'Fantastic Beasts'], answer: 2, note: 'The Harry Potter film series is based on J. K. Rowling’s novels.' },
    { question: 'What is the name for the music written for a movie?', options: ['A soundtrack', 'A storyboard', 'A subtitle', 'A trailer'], answer: 0, note: 'A soundtrack can include the score and songs featured in a film.' }
  ],
  Medium: [
    { question: 'Which director made the films Inception and Interstellar?', options: ['Denis Villeneuve', 'Christopher Nolan', 'David Fincher', 'James Cameron'], answer: 1, note: 'Christopher Nolan is known for intricate stories and practical filmmaking.' },
    { question: 'In film, what does “montage” usually mean?', options: ['A single long take', 'A sequence of edited shots', 'A voice-over', 'A camera movement'], answer: 1, note: 'A montage compresses time or builds an idea through a series of shots.' },
    { question: 'Which 1950 film is famous for its Hollywood story and the line “I am big. It’s the pictures that got small.”?', options: ['All About Eve', 'Sunset Boulevard', 'Rebecca', 'Casablanca'], answer: 1, note: 'Sunset Boulevard is a classic film about fame and the movie business.' },
    { question: 'What is a “MacGuffin” in storytelling?', options: ['A hidden camera', 'A plot device that drives the story', 'A type of film lighting', 'An alternate ending'], answer: 1, note: 'A MacGuffin motivates characters, even if the object itself is not important.' },
    { question: 'Which country is home to the film industry known as Bollywood?', options: ['Egypt', 'Japan', 'India', 'South Korea'], answer: 2, note: 'Bollywood is based in Mumbai and is part of Indian cinema.' }
  ],
  Hard: [
    { question: 'Who directed the 1927 science-fiction classic Metropolis?', options: ['F. W. Murnau', 'Fritz Lang', 'Sergei Eisenstein', 'Charlie Chaplin'], answer: 1, note: 'Fritz Lang’s Metropolis became a landmark of German Expressionist cinema.' },
    { question: 'The “Kuleshov effect” demonstrates the power of what?', options: ['Sound mixing', 'Editing and context', 'Colour grading', 'Wide-angle lenses'], answer: 1, note: 'The meaning of a shot can change depending on the shot placed beside it.' },
    { question: 'Which cinematographer shot Roger Deakins’ Oscar-winning work on 1917?', options: ['Emmanuel Lubezki', 'Hoyte van Hoytema', 'Roger Deakins', 'Greig Fraser'], answer: 2, note: 'Roger Deakins won the cinematography Oscar for 1917.' },
    { question: 'What is the French term for a film’s overall visual composition?', options: ['Mise-en-scène', 'Film noir', 'Nouvelle vague', 'Cinéma vérité'], answer: 0, note: 'Mise-en-scène refers to what is arranged within the frame: sets, lighting, actors and more.' },
    { question: 'Which film won the first Academy Award for Best Picture under the name “Best Picture”?', options: ['Wings', 'Sunrise', 'The Broadway Melody', 'All Quiet on the Western Front'], answer: 2, note: 'The Broadway Melody won at the 2nd Academy Awards in 1930.' }
  ]
};

function App() {
  const [theme, setTheme] = useState('light');
  const [level, setLevel] = useState('Easy');
  const [screen, setScreen] = useState('home');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showNote, setShowNote] = useState(false);

  const list = questions[level];
  const current = list[index];
  const score = answers.reduce((total, answer, i) => total + (answer === list[i].answer ? 1 : 0), 0);

  function startQuiz() {
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setShowNote(false);
    setScreen('quiz');
  }

  function chooseAnswer(optionIndex) {
    if (selected !== null) return;
    setSelected(optionIndex);
    setAnswers([...answers, optionIndex]);
    setShowNote(true);
  }

  function nextQuestion() {
    if (index === list.length - 1) {
      setScreen('result');
      return;
    }
    setIndex(index + 1);
    setSelected(null);
    setShowNote(false);
  }

  function goHome() {
    setScreen('home');
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setShowNote(false);
  }

  return (
    <main className={`app ${theme}`}>
      <header className="topbar">
        <button className="brand" onClick={goHome} aria-label="Go to home"><span className="brand-mark">F.</span><span>FRAME</span></button>
        <div className="topbar-right">
          <span className="edition">THE CINEMA QUIZ</span>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle color theme">
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      {screen === 'home' && (
        <section className="home-layout">
          <div className="intro-copy">
            <h1>How well do<br />you know <em>cinema?</em></h1>
            <p className="intro-text">From iconic scenes to the craft behind the camera. Choose your level and take the spotlight.</p>
            <div className="level-area">
              <p className="field-label">CHOOSE YOUR LEVEL</p>
              <div className="level-switch" role="group" aria-label="Choose difficulty">
                {Object.keys(questions).map((item) => (
                  <button key={item} className={`level-option ${level === item ? 'active' : ''}`} onClick={() => setLevel(item)}>{item}</button>
                ))}
              </div>
            </div>
            <button className="start-button" onClick={startQuiz}>Start the quiz <span>↗</span></button>
            <p className="small-note">5 QUESTIONS <span>·</span> 4 OPTIONS <span>·</span> ONE SCORE</p>
          </div>
          <div className="poster-wrap" aria-label="Decorative cinema poster">
            <div className="poster">
              <div className="poster-art">
                <div className="sun-disc" />
                <div className="arch arch-one" /><div className="arch arch-two" />
                <div className="film-strip strip-one" /><div className="film-strip strip-two" />
              </div>
              <div className="poster-title">THE<br /><i>ART</i> OF<br />CINEMA</div>
            </div>
          </div>
        </section>
      )}

      {screen === 'quiz' && (
        <section className="quiz-layout">
          <div className="quiz-heading">
            <button className="back-link" onClick={goHome}>← Back</button>
            <span className="quiz-level">{level.toUpperCase()} LEVEL</span>
          </div>
          <div className="progress-row"><span>QUESTION {String(index + 1).padStart(2, '0')} / 05</span><span>{Math.round(((index + 1) / list.length) * 100)}%</span></div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${((index + 1) / list.length) * 100}%` }} /></div>
          <article className="question-card">
            <p className="question-kicker">THE BIG SCREEN</p>
            <h2>{current.question}</h2>
            <div className="answers-grid">
              {current.options.map((option, optionIndex) => {
                let stateClass = '';
                if (selected !== null && optionIndex === current.answer) stateClass = 'correct';
                else if (selected === optionIndex) stateClass = 'incorrect';
                return <button key={option} className={`answer-option ${stateClass}`} onClick={() => chooseAnswer(optionIndex)} disabled={selected !== null}>
                  <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>
                  {selected !== null && optionIndex === current.answer && <span className="answer-mark">✓</span>}
                  {selected === optionIndex && optionIndex !== current.answer && <span className="answer-mark">×</span>}
                </button>;
              })}
            </div>
            {showNote && <div className="answer-note"><strong>{selected === current.answer ? 'That’s right.' : 'Not quite.'}</strong><span>{current.note}</span></div>}
            <div className="question-footer"><span>{selected === null ? 'SELECT ONE ANSWER' : 'ANSWER RECORDED'}</span><button className="next-button" onClick={nextQuestion} disabled={selected === null}>{index === list.length - 1 ? 'See result' : 'Next question'} <span>→</span></button></div>
          </article>
        </section>
      )}

      {screen === 'result' && (
        <section className="result-layout">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR SCREENING IS COMPLETE</p>
          <div className="result-card">
            <p className="question-kicker">{level.toUpperCase()} LEVEL</p>
            <h1>{score === 5 ? 'A perfect take.' : score >= 3 ? 'Well played.' : 'Keep exploring.'}</h1>
            <div className="score-display"><strong>{score}</strong><span>/ 5</span></div>
            <p className="result-copy">You got {score} out of 5 questions right.</p>
            <div className="result-actions"><button className="start-button" onClick={startQuiz}>Try again <span>↗</span></button><button className="text-button" onClick={goHome}>Change level</button></div>
          </div>
        </section>
      )}

      <footer className="footer"><span>FRAME © 2025</span><span>MADE FOR THE LOVE OF FILM</span></footer>
    </main>
  );
}

export default App;
