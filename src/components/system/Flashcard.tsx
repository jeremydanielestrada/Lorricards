interface Flashcard {
  question: string;
  answer: string;
}

function Flashcard({ question, answer }: Flashcard) {
  return (
    <div className="card border border-slate-400/35 m-2">
      <h2 className="text-lg font-extrabold border-b-slate-600">{question}</h2>
      <p className="font-semibold">answer: {answer}</p>
    </div>
  );
}

export default Flashcard;
