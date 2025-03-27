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

// Load dark mode preference (improved version)
function loadDarkModePreference() {
  // Check localStorage, default to false if not set
  const darkMode = localStorage.getItem('darkMode') === 'true';
  
  // Always explicitly set the class (removes ambiguity)
  document.body.classList.toggle('dark-mode', darkMode);
  
  // Update the toggle button state if it exists
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = darkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    toggleBtn.setAttribute('aria-checked', darkMode);
  }
}

// Toggle function (more robust)
function toggleDarkMode() {
  const isDark = !document.body.classList.contains('dark-mode');
  
  // Set the class and storage simultaneously
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('darkMode', isDark);
  
  // Update UI immediately
  loadDarkModePreference();
  
  // Optional: Log for debugging
  console.log('Dark mode set to:', isDark);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadDarkModePreference();
  
  // Set up event listener (with error handling)
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleDarkMode);
  } else {
    console.warn('Dark mode toggle button not found');
  }
  
  // Force reset if needed (debugging only)
  // localStorage.removeItem('darkMode');
});

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

//APi integration
const API_BASE = 'http://localhost/your-project/api';

async function login(email, password) {
    const response = await fetch(`${API_BASE}/auth.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'login',
            email,
            password
        })
    });
    return await response.json();
}

async function register(email, password) {
    const response = await fetch(`${API_BASE}/auth.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'register',
            email,
            password
        })
    });
    return await response.json();
}

async function saveProgress(lessonId, completed) {
    const response = await fetch(`${API_BASE}/progress.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson_id: lessonId, completed })
    });
    return await response.json();
}

async function loadProgress() {
    const response = await fetch(`${API_BASE}/progress.php`);
    return await response.json();
}

