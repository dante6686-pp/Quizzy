const quizzyData = {
  categories: [
    {
      id: "games",
      title: "Games",
      desc: "Gaming basics, iconic franchises, old school facts, and nerd damage.",
      quizzes: [
        {
          id: "gaming-basics",
          title: "Gaming Basics",
          desc: "A quick warm-up run for anyone who has touched a controller in their life.",
          pointsPerCorrect: 10,
          questions: [
            {
              question: "Which company created the PlayStation brand?",
              options: ["Sony", "Nintendo", "Sega", "Microsoft"],
              answer: 0
            },
            {
              question: "What is the best-selling sandbox game created by Mojang?",
              options: ["Terraria", "Roblox", "Minecraft", "Valheim"],
              answer: 2
            },
            {
              question: "In Pac-Man, what do the ghosts become after you eat a power pellet?",
              options: ["Invisible", "Blue and vulnerable", "Twice as fast", "Friendly"],
              answer: 1
            },
            {
              question: "Which series features the location called Hyrule?",
              options: ["Final Fantasy", "The Legend of Zelda", "Elden Ring", "Dragon Quest"],
              answer: 1
            },
            {
              question: "What does NPC usually stand for in games?",
              options: ["New Player Character", "Non-Playable Character", "Neutral Power Core", "Next Phase Controller"],
              answer: 1
            }
          ]
        }
      ]
    },
    {
      id: "movies",
      title: "Movies",
      desc: "Big hits, famous scenes, directors, and basic film trivia.",
      quizzes: [
        {
          id: "movie-trivia-starter",
          title: "Movie Trivia Starter",
          desc: "A short general movie quiz with easy mainstream questions.",
          pointsPerCorrect: 10,
          questions: [
            {
              question: "Which film features the quote 'I'll be back'?",
              options: ["Predator", "RoboCop", "The Terminator", "Die Hard"],
              answer: 2
            },
            {
              question: "Who directed Titanic?",
              options: ["James Cameron", "Christopher Nolan", "Steven Spielberg", "Ridley Scott"],
              answer: 0
            },
            {
              question: "What is the name of the lion cub in The Lion King?",
              options: ["Mufasa", "Scar", "Simba", "Timon"],
              answer: 2
            },
            {
              question: "Which franchise includes Hogwarts?",
              options: ["The Lord of the Rings", "Harry Potter", "Narnia", "Percy Jackson"],
              answer: 1
            },
            {
              question: "Which color pill does Neo take in The Matrix?",
              options: ["Blue", "Red", "Green", "Black"],
              answer: 1
            }
          ]
        }
      ]
    },
    {
      id: "science",
      title: "Science",
      desc: "General science questions without turning the page into school trauma.",
      quizzes: [
        {
          id: "science-basics",
          title: "Science Basics",
          desc: "Short science trivia run with general knowledge level questions.",
          pointsPerCorrect: 10,
          questions: [
            {
              question: "What planet is known as the Red Planet?",
              options: ["Venus", "Mars", "Jupiter", "Mercury"],
              answer: 1
            },
            {
              question: "What gas do plants absorb from the atmosphere?",
              options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
              answer: 2
            },
            {
              question: "How many legs does an insect have?",
              options: ["4", "6", "8", "10"],
              answer: 1
            },
            {
              question: "Water freezes at what temperature in Celsius?",
              options: ["0", "10", "32", "-10"],
              answer: 0
            },
            {
              question: "What star is at the center of our solar system?",
              options: ["Polaris", "The Moon", "The Sun", "Sirius"],
              answer: 2
            }
          ]
        }
      ]
    },
    {
      id: "geography",
      title: "Geography",
      desc: "Countries, capitals, landmarks, maps, and not embarrassing yourself.",
      quizzes: [
        {
          id: "world-capitals",
          title: "World Capitals",
          desc: "Five quick capital city questions to see whether your brain still works.",
          pointsPerCorrect: 10,
          questions: [
            {
              question: "What is the capital of Japan?",
              options: ["Seoul", "Tokyo", "Kyoto", "Osaka"],
              answer: 1
            },
            {
              question: "What is the capital of France?",
              options: ["Paris", "Lyon", "Marseille", "Nice"],
              answer: 0
            },
            {
              question: "What is the capital of Canada?",
              options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
              answer: 1
            },
            {
              question: "What is the capital of Australia?",
              options: ["Sydney", "Melbourne", "Canberra", "Perth"],
              answer: 2
            },
            {
              question: "What is the capital of Brazil?",
              options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
              answer: 1
            }
          ]
        }
      ]
    }
  ]
};

const state = {
  selectedCategoryId: null,
  selectedQuizId: null,
  currentQuiz: null,
  questionIndex: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  correctCount: 0,
  locked: false
};

const el = {
  totalCategories: document.getElementById("totalCategories"),
  totalQuizzes: document.getElementById("totalQuizzes"),
  bestScoreValue: document.getElementById("bestScoreValue"),
  bestScoreMeta: document.getElementById("bestScoreMeta"),
  categoryGrid: document.getElementById("categoryGrid"),
  browseSection: document.getElementById("browseSection"),
  quizListSection: document.getElementById("quizListSection"),
  quizListTitle: document.getElementById("quizListTitle"),
  quizList: document.getElementById("quizList"),
  backToCategoriesBtn: document.getElementById("backToCategoriesBtn"),
  quizPlayerSection: document.getElementById("quizPlayerSection"),
  backToQuizListBtn: document.getElementById("backToQuizListBtn"),
  progressText: document.getElementById("progressText"),
  scoreText: document.getElementById("scoreText"),
  streakText: document.getElementById("streakText"),
  questionCategory: document.getElementById("questionCategory"),
  questionText: document.getElementById("questionText"),
  answersGrid: document.getElementById("answersGrid"),
  resultSection: document.getElementById("resultSection"),
  resultTitle: document.getElementById("resultTitle"),
  resultCopy: document.getElementById("resultCopy"),
  finalScore: document.getElementById("finalScore"),
  correctAnswers: document.getElementById("correctAnswers"),
  bestStreak: document.getElementById("bestStreak"),
  retryQuizBtn: document.getElementById("retryQuizBtn"),
  resultBackBtn: document.getElementById("resultBackBtn")
};

function getAllQuizzes() {
  return quizzyData.categories.flatMap((category) => category.quizzes);
}

function getCategoryById(categoryId) {
  return quizzyData.categories.find((category) => category.id === categoryId);
}

function getQuizById(categoryId, quizId) {
  const category = getCategoryById(categoryId);
  if (!category) return null;
  return category.quizzes.find((quiz) => quiz.id === quizId) || null;
}

function getLocalBest() {
  const saved = localStorage.getItem("quizzyBestScore");
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function setLocalBest(bestData) {
  localStorage.setItem("quizzyBestScore", JSON.stringify(bestData));
}

function updateHeroStats() {
  el.totalCategories.textContent = String(quizzyData.categories.length);
  el.totalQuizzes.textContent = String(getAllQuizzes().length);

  const best = getLocalBest();
  if (!best) {
    el.bestScoreValue.textContent = "0";
    el.bestScoreMeta.textContent = "No score yet. Go break something.";
    return;
  }

  el.bestScoreValue.textContent = String(best.score);
  el.bestScoreMeta.textContent = `${best.quizTitle} / ${best.categoryTitle}`;
}

function renderCategories() {
  el.categoryGrid.innerHTML = quizzyData.categories.map((category) => {
    const quizCount = category.quizzes.length;
    return `
      <article class="category-card">
        <p class="section-kicker">CATEGORY</p>
        <h3>${category.title}</h3>
        <p>${category.desc}</p>
        <div class="category-card__meta">
          <span class="meta-pill">${quizCount} quiz${quizCount === 1 ? "" : "zes"}</span>
        </div>
        <div class="result-actions">
          <button class="primary-btn" type="button" data-category-open="${category.id}">Open category</button>
        </div>
      </article>
    `;
  }).join("");
}

function showSection(sectionName) {
  el.browseSection.classList.add("hidden");
  el.quizListSection.classList.add("hidden");
  el.quizPlayerSection.classList.add("hidden");
  el.resultSection.classList.add("hidden");

  if (sectionName === "browse") el.browseSection.classList.remove("hidden");
  if (sectionName === "quizList") el.quizListSection.classList.remove("hidden");
  if (sectionName === "quizPlayer") el.quizPlayerSection.classList.remove("hidden");
  if (sectionName === "result") el.resultSection.classList.remove("hidden");
}

function openCategory(categoryId) {
  state.selectedCategoryId = categoryId;
  const category = getCategoryById(categoryId);
  if (!category) return;

  el.quizListTitle.textContent = `${category.title} quizzes`;
  el.quizList.innerHTML = category.quizzes.map((quiz) => `
    <article class="quiz-list-card">
      <p class="section-kicker">QUIZ</p>
      <h3>${quiz.title}</h3>
      <p>${quiz.desc}</p>
      <div class="quiz-card__meta">
        <span class="meta-pill">${quiz.questions.length} questions</span>
        <span class="meta-pill">+${quiz.pointsPerCorrect} per correct</span>
      </div>
      <div class="result-actions">
        <button class="primary-btn" type="button" data-quiz-open="${quiz.id}">Start quiz</button>
      </div>
    </article>
  `).join("");

  showSection("quizList");
}

function startQuiz(categoryId, quizId) {
  state.selectedCategoryId = categoryId;
  state.selectedQuizId = quizId;
  state.currentQuiz = getQuizById(categoryId, quizId);
  state.questionIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.correctCount = 0;
  state.locked = false;

  if (!state.currentQuiz) return;

  renderQuestion();
  showSection("quizPlayer");
}

function renderQuestion() {
  const quiz = state.currentQuiz;
  const category = getCategoryById(state.selectedCategoryId);
  if (!quiz || !category) return;

  const questionData = quiz.questions[state.questionIndex];
  el.questionCategory.textContent = `${category.title} / ${quiz.title}`;
  el.questionText.textContent = questionData.question;
  el.progressText.textContent = `Question ${state.questionIndex + 1} / ${quiz.questions.length}`;
  el.scoreText.textContent = `Score: ${state.score}`;
  el.streakText.textContent = `Streak: ${state.streak}`;

  el.answersGrid.innerHTML = questionData.options.map((option, index) => `
    <button class="answer-btn" type="button" data-answer-index="${index}">${option}</button>
  `).join("");
}

function handleAnswer(answerIndex) {
  if (state.locked || !state.currentQuiz) return;
  state.locked = true;

  const quiz = state.currentQuiz;
  const questionData = quiz.questions[state.questionIndex];
  const buttons = [...el.answersGrid.querySelectorAll(".answer-btn")];
  const correctIndex = questionData.answer;
  const clickedButton = buttons[answerIndex];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("is-correct");
  });

  if (answerIndex === correctIndex) {
    state.correctCount += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.score += quiz.pointsPerCorrect;
  } else {
    state.streak = 0;
    if (clickedButton) clickedButton.classList.add("is-wrong");
  }

  el.scoreText.textContent = `Score: ${state.score}`;
  el.streakText.textContent = `Streak: ${state.streak}`;

  window.setTimeout(() => {
    state.questionIndex += 1;
    state.locked = false;

    if (state.questionIndex >= quiz.questions.length) {
      finishQuiz();
      return;
    }

    renderQuestion();
  }, 900);
}

function getResultFlavor(score, maxScore) {
  const ratio = maxScore === 0 ? 0 : score / maxScore;
  if (ratio === 1) return "Perfect run. Disgusting. Go outside.";
  if (ratio >= 0.8) return "Strong score. Your brain is still doing its job.";
  if (ratio >= 0.5) return "Decent run. A little damaged, but functional.";
  if (ratio > 0) return "You survived. Barely. But points are points.";
  return "Absolute collapse. Maybe blame the questions.";
}

function finishQuiz() {
  const quiz = state.currentQuiz;
  const category = getCategoryById(state.selectedCategoryId);
  if (!quiz || !category) return;

  const maxScore = quiz.questions.length * quiz.pointsPerCorrect;
  const flavor = getResultFlavor(state.score, maxScore);

  el.resultTitle.textContent = `You scored ${state.score} / ${maxScore}`;
  el.resultCopy.textContent = flavor;
  el.finalScore.textContent = String(state.score);
  el.correctAnswers.textContent = `${state.correctCount}/${quiz.questions.length}`;
  el.bestStreak.textContent = String(state.bestStreak);

  const currentBest = getLocalBest();
  if (!currentBest || state.score > currentBest.score) {
    setLocalBest({
      score: state.score,
      quizTitle: quiz.title,
      categoryTitle: category.title
    });
  }

  updateHeroStats();
  showSection("result");
}

el.categoryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category-open]");
  if (!button) return;
  openCategory(button.dataset.categoryOpen);
});

el.quizList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quiz-open]");
  if (!button || !state.selectedCategoryId) return;
  startQuiz(state.selectedCategoryId, button.dataset.quizOpen);
});

el.answersGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer-index]");
  if (!button) return;
  handleAnswer(Number(button.dataset.answerIndex));
});

el.backToCategoriesBtn.addEventListener("click", () => showSection("browse"));
el.backToQuizListBtn.addEventListener("click", () => showSection("quizList"));
el.resultBackBtn.addEventListener("click", () => openCategory(state.selectedCategoryId));
el.retryQuizBtn.addEventListener("click", () => {
  if (!state.selectedCategoryId || !state.selectedQuizId) return;
  startQuiz(state.selectedCategoryId, state.selectedQuizId);
});

updateHeroStats();
renderCategories();
showSection("browse");
