import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const images = require.context("./img", false, /\.jpg$/);
const imageList = images.keys().map((image) => images(image));

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState("");

  const startDate = new Date("2023-12-18");

  const calculateWeek = () => {
    const currentDate = new Date();
    const diffInTime = currentDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.floor(diffInDays / 7) + 1;
  };

  const week = calculateWeek();

  const strengthExercises = [
    "Squat",
    "Bench Press",
    "KB Swing",
    "BB Row",
    "DB Lunges",
    "Bird Dog",
    "Dead Bug",
  ];

  const repsPerWeek = [10, 10, 20, 20, 30, 30, 40, 40];

  const calculateWorkout = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3); // set the date to tomorrow
    const dayOfWeek = currentDate.getDay();
    let workout = {};

    if (dayOfWeek === 1 || dayOfWeek === 4) {
      // 1 for Monday, 4 for Thursday
      workout.type = "strength";
      workout.exercise =
        strengthExercises[Math.floor(Math.random() * strengthExercises.length)];
      workout.sets = dayOfWeek === 1 ? 3 : 2;
      workout.reps = repsPerWeek[week - 1];
    } else {
      workout.type = "cardio";
      workout.exercise = "30 - 60 minutes"; // Modify this as per your exercise
    }

    return workout;
  };

  const workout = calculateWorkout();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // set the time to 00:00:00
  
  const savedDate = new Date(localStorage.getItem("savedDate"));
  
  if (savedDate.toString() !== currentDate.toString()) {
    localStorage.removeItem("completedExercises");
    localStorage.setItem("savedDate", currentDate.toString());
  }
  
  const [completedExercises, setCompletedExercises] = useState(() => {
    const savedExercises =
      JSON.parse(localStorage.getItem("completedExercises")) || {};
    return savedExercises;
  });

  const handleExerciseCompletion = (exercise) => {
    setCompletedExercises((prevState) => ({
      ...prevState,
      [exercise]: !prevState[exercise],
    }));
  };

  useEffect(() => {
    localStorage.setItem(
      "completedExercises",
      JSON.stringify(completedExercises)
    );
  }, [completedExercises]);

  const quotes = [
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "It's not about perfect. It's about effort.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream it. Wish it. Do it.",
    "“Success is not final, failure is not fatal: it is the courage to continue that counts.” – Winston Churchill",
    "“Believe you can and you're halfway there.” – Theodore Roosevelt",
    "“Strive not to be a success, but rather to be of value.” – Albert Einstein",
    "“I have not failed. I've just found 10,000 ways that won't work.” – Thomas Edison",
    "“The only way to do great work is to love what you do.” – Steve Jobs",
    "“Today I will do what others won't, so tomorrow I can accomplish what others can't.” – Jerry Rice",
    "“What seems impossible today will one day become your warm-up.”",
    "“Do something today that your future self will thank you for.”",
    "“Every new day is a new opportunity to improve yourself. Take it and make the most of it.”",
    "“Tough times don't last but tough people do.” – Robert Schuller",
    "“A little progress each day adds up to big results.”",
    "“You may not be there yet, but you are closer than you were yesterday.”",
    "“Strong people are harder to kill than weak people and are more useful in general.” – Mark Rippetoe",
    "“No man has the right to be an amateur in the matter of physical training. It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable.” – Socrates",
    "“The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.” – Arnold Schwarzenegger",
    "“The clock is ticking. Are you becoming the person you want to be?” – Greg Plitt",
    "“The only place where success comes before work is in the dictionary.” – Vidal Sassoon",
    "“Whether you think you can, or you think you can't, you're right.” – Henry Ford",
    "“All progress takes place outside the comfort zone.” – Michael John Bobak",
    "“If you think lifting is dangerous, try being weak. Being weak is dangerous.” – Bret Contreras",
    "“The only person you are destined to become is the person you decide to be.” – Ralph Waldo Emerson",
    "“There are no shortcuts to any place worth going.” – Beverly Sills",
    "“If something stands between you and your success, move it. Never be denied.” – Dwayne ‘The Rock’ Johnson",
    "“If you want something you've never had, you must be willing to do something you've never done.” – Thomas Jefferson",
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setImage(imageList[Math.floor(Math.random() * imageList.length)]);
  }, []);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className='App d-flex flex-column justify-content-center text-center'>
      <header className='App-header bg-primary text-white p-3'>
        <h1>Week: {week}</h1>
        <p>{quote}</p>
      </header>

      <section className='workout-section p-3'>
        <h2>Today's Workout</h2>
        <p className='font-weight-bold'>
          {workout.type === "strength" ? "Strength-Endurance" : "Endurance"}
        </p>
        {workout.type === "strength" && (
          <>
            {strengthExercises.map((exercise, index) => (
              <div key={index}>
                <button
                  style={{
                    backgroundColor: completedExercises[exercise]
                      ? "green"
                      : "white",
                    border: "1px solid black",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    boxSizing: "border-box",
                    marginRight: "10px",
                  }}
                  onClick={() => handleExerciseCompletion(exercise)}></button>
                {exercise} - {workout.sets} x {workout.reps}
              </div>
            ))}
          </>
        )}
        {workout.type === "cardio" && <p>Exercise: {workout.exercise}</p>}
      </section>

      <section className='timer-section p-3'>
        <h2>Timer</h2>
        <p>{formatTime(time)}</p>
        <div className='btn-group' role='group' aria-label='Timer controls'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => setTimerOn(true)}>
            Start
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => setTimerOn(false)}>
            Stop
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => setTime(0)}>
            Reset
          </button>
        </div>
      </section>

      <footer className='App-footer bg-dark text-white p-3'>
        <img
          src={image}
          alt='Motivational'
          style={{ width: "300px", height: "200px" }}
        />
      </footer>
    </div>
  );
}

export default App;
