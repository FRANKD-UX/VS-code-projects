// Global variables
let currentLessonIndex = 0;
let editor; // Will store the CodeMirror editor instance

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize CodeMirror editor
  editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: "htmlmixed",
    theme: "monokai",
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    tabSize: 2,
    extraKeys: {"Tab": "indentMore", "Shift-Tab": "indentLess"}
  });

  // Set up event listeners
  document.getElementById('run-code-btn').addEventListener('click', runCode);
  document.getElementById('next-lesson-btn').addEventListener('click', loadNextLesson);
  document.getElementById('reset-code-btn').addEventListener('click', resetCode);
  document.getElementById('hint-btn').addEventListener('click', showHint);
  document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

  // Load the first lesson
  loadLesson(currentLessonIndex);

  // Load dark mode preference
  loadDarkModePreference();

  // Load progress
  loadProgress();

  // Populate lessons sidebar
  populateLessonsSidebar();

  // Update progress bar
  updateProgressBar();
});

// Function to load a lesson by index
function loadLesson(index) {
  if (index < 0 || index >= lessons.length) {
    console.error('Invalid lesson index');
    return;
  }
  
  const lesson = lessons[index];
  
  // Update lesson title and content
  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-explanation').textContent = lesson.explanation;
  document.getElementById('lesson-instructions').textContent = lesson.instructions;
  
  // Set the initial code in the editor
  editor.setValue(lesson.initialCode);
  
  // Reset the preview
  document.getElementById('html-preview').srcdoc = '';
  
  // Hide the next lesson button initially
  document.getElementById('next-lesson-btn').style.display = 'none';
  
  // Reset hint counter
  currentHintIndex = 0;
  
  // Update progress indicator
  updateProgressIndicator();
}

// Run the code in the editor
function runCode() {
  showLoadingSpinner();
  setTimeout(() => {
    const code = editor.getValue();
    const htmlPreview = document.getElementById('html-preview');
    htmlPreview.srcdoc = code;
    validateCode(code);
    hideLoadingSpinner();
  }, 500); // Simulate a delay for demonstration
}

// Validate the user's code
function validateCode(code) {
  const lesson = lessons[currentLessonIndex];
  let isValid = true;
  let errorMessage = '';
  
  // Check each validation rule
  for (const rule of lesson.validationRules) {
    if (!rule.pattern.test(code)) {
      isValid = false;
      errorMessage = rule.message;
      break;
    }
  }
  
  // Check expected output if defined
  if (isValid && lesson.expectedOutput && !lesson.expectedOutput(code)) {
    isValid = false;
    errorMessage = "Your HTML doesn't include all the required elements. Check the instructions again.";
  }
  
  // Show validation result
  const validationResult = document.getElementById('validation-result');
  
  if (isValid) {
    validationResult.textContent = '✅ Great job! You completed this lesson successfully.';
    validationResult.className = 'validation-success';
    document.getElementById('next-lesson-btn').style.display = 'block';
    saveProgress(); // Save progress when a lesson is completed
    updateProgressBar(); // Update the progress bar
  } else {
    validationResult.textContent = `❌ ${errorMessage}`;
    validationResult.className = 'validation-error';
  }
}

// Load the next lesson
function loadNextLesson() {
  currentLessonIndex++;
  
  if (currentLessonIndex < lessons.length) {
    loadLesson(currentLessonIndex);
  } else {
    // All lessons completed
    document.getElementById('lesson-container').innerHTML = `
      <h2>Congratulations! 🎉</h2>
      <p>You've completed all the HTML lessons in this tutorial. Well done!</p>
      <button id="restart-btn" class="btn btn-primary">Start Over</button>
    `;
    document.getElementById('restart-btn').addEventListener('click', function() {
      currentLessonIndex = 0;
      location.reload();
    });
  }
}

// Reset the code to its initial state
function resetCode() {
  editor.setValue(lessons[currentLessonIndex].initialCode);
}

// Hint system
let currentHintIndex = 0;

function showHint() {
  const lesson = lessons[currentLessonIndex];
  
  if (!lesson.hints || lesson.hints.length === 0) {
    alert('No hints available for this lesson.');
    return;
  }
  
  if (currentHintIndex < lesson.hints.length) {
    const hint = lesson.hints[currentHintIndex];
    document.getElementById('validation-result').textContent = `Hint: ${hint}`;
    document.getElementById('validation-result').className = 'validation-hint';
    currentHintIndex++;
  } else {
    currentHintIndex = 0; // Reset to first hint
    showHint();
  }
}

// Update progress indicator
function updateProgressIndicator() {
  const progressContainer = document.getElementById('progress-indicator');
  progressContainer.innerHTML = '';
  
  for (let i = 0; i < lessons.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    if (i === currentLessonIndex) {
      dot.classList.add('current');
    } else if (i < currentLessonIndex) {
      dot.classList.add('completed');
    }
    progressContainer.appendChild(dot);
  }
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  // Save dark mode preference
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
function loadDarkModePreference() {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
  }
}

// Save progress with localStorage
function saveProgress() {
  localStorage.setItem('currentLessonIndex', currentLessonIndex);
}

// Load progress with localStorage
function loadProgress() {
  const savedIndex = localStorage.getItem('currentLessonIndex');
  if (savedIndex !== null) {
    currentLessonIndex = parseInt(savedIndex, 10);
    loadLesson(currentLessonIndex);
  }
}

// Show loading spinner
function showLoadingSpinner() {
  document.getElementById('loading-spinner').style.display = 'block';
}

// Hide loading spinner
function hideLoadingSpinner() {
  document.getElementById('loading-spinner').style.display = 'none';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'Enter') {
    runCode();
  } else if (event.ctrlKey && event.key === 'r') {
    resetCode();
  }
});

// Function to calculate progress percentage
function calculateProgress() {
  const completedLessons = lessons.filter((lesson, index) => index < currentLessonIndex).length;
  const totalLessons = lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;
  return progressPercentage;
}

// Function to update the progress bar
function updateProgressBar() {
  const progressPercentage = calculateProgress();
  const progressBar = document.getElementById('progress-bar');
  const progressPercentageText = document.getElementById('progress-percentage');

  progressBar.style.width = `${progressPercentage}%`;
  progressPercentageText.textContent = `${Math.round(progressPercentage)}%`;
}

// Populate lessons sidebar
function populateLessonsSidebar() {
  const lessonsList = document.getElementById('lessons-list');
  lessons.forEach(lesson => {
    const listItem = document.createElement('li');
    const lessonLink = document.createElement('a');
    lessonLink.href = '#';
    lessonLink.textContent = lesson.title;
    lessonLink.addEventListener('click', function(event) {
      event.preventDefault();
      currentLessonIndex = lesson.id - 1; // Adjust for zero-based index
      loadLesson(currentLessonIndex);
      updateProgressBar(); // Update the progress bar
    });
    listItem.appendChild(lessonLink);
    lessonsList.appendChild(listItem);
  });
}

// Function to toggle the dropdown menu
function toggleDropdown() {
  const dropdownMenu = document.getElementById('dropdown-menu');
  dropdownMenu.classList.toggle('active');
}

// Close the dropdown menu if the user clicks outside of it
document.addEventListener('click', function(event) {
  const profileContainer = document.querySelector('.profile-container');
  const dropdownMenu = document.getElementById('dropdown-menu');

  if (!profileContainer.contains(event.target)) {
    dropdownMenu.classList.remove('active');
  }
});