
// prerequisites map
const prerequisites = {
  "CSE 2221": ["CSE 1223", "CSE 1222", "CSE 1224", "ENGR 1281"],
  "CSE 2231": ["CSE 2221"],
  "CSE 2321": ["CSE 2221"],
  "STAT 3470": ["CSE 2221"],
  "CSE 2421": ["CSE 2221", "CSE 2321"],
  "CSE 2331": ["CSE 2231", "CSE 2321", "STAT 3470"],
  "CSE 2431": ["CSE 2421"],
  "CSE 3901": ["CSE 2421"],
  "CSE 3902": ["CSE 2421"],
  "CSE 3903": ["CSE 2421"],
  "CSE 3341": ["CSE 2331", "CSE 3901", "CSE 3902", "CSE 3903"],
  "CSE 3231": ["CSE 3901", "CSE 3902", "CSE 3903"],
  "CSE 5911": ["CSE 2501", "CSE 3231", "CSE 3901", "CSE 3902", "CSE 3903"],
  "CSE 5912": ["CSE 2501", "CSE 3541", "CSE 3901", "CSE 3902", "CSE 3903"],
  "CSE 5914": ["CSE 2501", "CSE 3521", "CSE 3901", "CSE 3902", "CSE 3903"],
  "CSE 5915": ["CSE 2501", "CSE 3241", "CSE 3901", "CSE 3902", "CSE 3903"],
};

// create postrequisites map
const postreqs = {};
for (const [course, pres] of Object.entries(prerequisites)) {
  pres.forEach(pre => {
    if (!postreqs[pre]) postreqs[pre] = [];
    postreqs[pre].push(course);
  });
}

// utility funcs
function highlight(courseName, type) {
  document.querySelectorAll(".course").forEach(courseEl => {
    const nameEl = courseEl.querySelector(".course-name");
    if (!nameEl) return;
    const cNameText = nameEl.textContent.trim();
    if (cNameText.startsWith(courseName)) {
      courseEl.classList.add(type);
    }
  });
}

function clearHighlights() {
  document.querySelectorAll(".course").forEach(c => {
    c.classList.remove("hover", "prereq", "postreq");
  });
}

function highlightCourses(courseName) {
  clearHighlights();
  highlight(courseName, "hover");

    //   highlight prerequisites
  const pres = prerequisites[courseName] || [];
  pres.forEach(pre => highlight(pre, "prereq"));

  //   highlight postrequisites
  const posts = postreqs[courseName] || [];
  posts.forEach(post => highlight(post, "postreq"));
}

// event listeners for hover effects
document.addEventListener("DOMContentLoaded", () => {
  const courseEls = document.querySelectorAll(".course");
  courseEls.forEach(courseEl => {
    const nameEl = courseEl.querySelector(".course-name");
    if (!nameEl) return;
    const fullName = nameEl.textContent.trim();
    // get course code 
    const codeMatch = fullName.match(/^[A-Z]{3}\s*\d{4}/);
    const courseCode = codeMatch ? codeMatch[0] : fullName;

    courseEl.addEventListener("mouseenter", () => highlightCourses(courseCode));
    courseEl.addEventListener("mouseleave", clearHighlights);
  });
});
