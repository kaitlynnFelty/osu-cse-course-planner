
const dependencyData = {
  ASC_1100: { prereqs: [], postreqs: [] },
  MATH_1151: { prereqs: [], postreqs: [] },
  PHYSICS_1250: { prereqs: ["MATH_1151_OR_CONCURRENT"], postreqs: [] },
  CSE_1223: { prereqs: [], postreqs: ["CSE_2221"] },
  GE_LAUNCH_SEMINAR: { prereqs: [], postreqs: [] },
  CSE_2221: {
    prereqs: ["CSE_1223_OR_EQUIVALENT", "MATH_1151_CONCURRENT"],
    postreqs: ["CSE_2231", "CSE_2321", "CSE_2421", "CSE_3241", "CSE_2501"],
  },
  MATH_1152: { prereqs: ["MATH_1151"], postreqs: [] },
  GE_WRITING: { prereqs: [], postreqs: ["CSE_2501"] },
  SCIENCE: { prereqs: [], postreqs: [] },
  CSE_2231: { prereqs: ["CSE_2221", "MATH_1151"], postreqs: ["CSE_2331", "CSE_390X"] },
  CSE_2321: {
    prereqs: ["CSE_2221", "MATH_1151"],
    postreqs: ["CSE_2331", "CSE_2421", "CSE_390X", "CSE_3241", "CSE_2501"],
  },
  STAT_3470: { prereqs: ["MATH_1152"], postreqs: ["CSE_2331"] },
  FOREIGN_LANG_1: { prereqs: [], postreqs: ["FOREIGN_LANG_2"] },
  CSE_2331: { prereqs: ["CSE_2231", "CSE_2321", "STAT_3470"], postreqs: [] },
  CSE_2421: { prereqs: ["CSE_2231", "CSE_2321"], postreqs: ["CSE_2431", "CSE_390X"] },
  MATH_3345: { prereqs: ["MATH_1152"], postreqs: [] },
  FOREIGN_LANG_2: { prereqs: ["FOREIGN_LANG_1"], postreqs: ["FOREIGN_LANG_3"] },
  CSE_2431: { prereqs: ["CSE_2421"], postreqs: [] },
  CSE_390X: { prereqs: ["CSE_2231", "CSE_2321", "CSE_2421"], postreqs: ["CSE_3231", "CSE_3541", "CSE_591X"] },
  ECE_2060: { prereqs: [], postreqs: [] },
  FOREIGN_LANG_3: { prereqs: ["FOREIGN_LANG_2"], postreqs: [] },
  CSE_32X1: { prereqs: ["CSE_2231", "CSE_2321"], postreqs: [] },
  CSE_34X1: { prereqs: ["CSE_2231", "CSE_2321"], postreqs: [] },
  CSE_35X1: { prereqs: ["CSE_2231", "CSE_2321"], postreqs: [] },
  GE_SBS: { prereqs: [], postreqs: [] },
  CSE_2501_OR_PHIL_2338: {
    prereqs: ["CSE_2221", "CSE_2321", "GE_WRITING"],
    postreqs: ["CSE_591X"],
  },
  CSE_3341: { prereqs: ["CSE_2321", "CSE_2331"], postreqs: [] },
  TECH_ELECTIVE: { prereqs: ["CSE_2231", "CSE_2321"], postreqs: [] },
  GE_LIT_VPA: { prereqs: [], postreqs: [] },
  GE_DIVERSITY: { prereqs: [], postreqs: [] },
  GE_HISTORY: { prereqs: [], postreqs: [] },
  CSE_591X: {
    prereqs: ["CSE_390X", "CSE_2501_OR_PHIL_2338", "GEN_ED_WRITING_LEVEL_2", "SPECIALIZATION_COURSE"],
    postreqs: [],
  },
};

const courseDisplayNames = {
  ASC_1100: "ASC 1100",
  MATH_1151: "Math 1151",
  PHYSICS_1250: "Physics 1250",
  CSE_1223: "CSE 1223",
  GE_LAUNCH_SEMINAR: "GE Launch Seminar",
  CSE_2221: "CSE 2221",
  MATH_1152: "Math 1152",
  GE_WRITING: "GE Writing",
  SCIENCE: "Science",
  CSE_2231: "CSE 2231",
  CSE_2321: "CSE 2321",
  STAT_3470: "STAT 3470",
  FOREIGN_LANG_1: "Foreign Language I",
  CSE_2331: "CSE 2331",
  CSE_2421: "CSE 2421",
  MATH_3345: "MATH 3345",
  FOREIGN_LANG_2: "Foreign Language II",
  CSE_2431: "CSE 2431",
  CSE_390X: "CSE 390X",
  ECE_2060: "ECE 2060",
  FOREIGN_LANG_3: "Foreign Language 3",
  CSE_32X1: "CSE 32X1",
  CSE_34X1: "CSE 34X1",
  CSE_35X1: "CSE 35X1",
  GE_SBS: "GE-SBS",
  CSE_2501_OR_PHIL_2338: "CSE 2501 / PHILOS 2338 / GE Theme",
  CSE_3341: "CSE 3341",
  TECH_ELECTIVE: "Technical Elective",
  GE_LIT_VPA: "GE Lit / VPA",
  GE_DIVERSITY: "GE Diversity",
  GE_HISTORY: "GE History",
  CSE_591X: "CSE 591X",
  CSE_3241: "CSE 3241",
  CSE_2501: "CSE 2501",
  CSE_3231: "CSE 3231",
  CSE_3541: "CSE 3541",
  GEN_ED_WRITING_LEVEL_2: "Gen Ed Writing Level 2",
  SPECIALIZATION_COURSE: "Specialization Course",
  MATH_1151_OR_CONCURRENT: "Math 1151 or concurrent enrollment",
  CSE_1223_OR_EQUIVALENT: "CSE 1223 or equivalent",
  MATH_1151_CONCURRENT: "Math 1151 concurrent enrollment",
};

const termLabels = {
  c1: "First Year - Fall",
  c2: "First Year - Spring",
  c3: "Second Year - Fall",
  c4: "Second Year - Spring",
  c5: "Third Year - Fall",
  c6: "Third Year - Spring",
  c7: "Fourth Year - Fall",
  c8: "Fourth Year - Spring",
};

// utility funcs
function highlight(courseName, type) {
  document.querySelectorAll(".course").forEach(courseEl => {
    const courseData = getCourseData(courseEl);
    if (!courseData) return;

    if (courseData.courseKey === courseName) {
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

  const pres = dependencyData[courseName]?.prereqs || [];
  pres.forEach(pre => highlight(pre, "prereq"));

  const posts = dependencyData[courseName]?.postreqs || [];
  posts.forEach(post => highlight(post, "postreq"));
}

function findTermLabel(courseEl) {
  const termCol = courseEl.closest(".term-col");
  if (!termCol) return "Not listed";

  const termClass = Array.from(termCol.classList).find(className => termLabels[className]);
  return termClass ? termLabels[termClass] : "Not listed";
}

function formatList(items) {
  if (!items.length) return "None listed";
  return items.map(item => courseDisplayNames[item] || item.replaceAll("_", " ")).join(", ");
}

function updateDetailsPanel(courseEl, courseKey, fullName) {
  const titleEl = courseEl.querySelector(".course-extra");
  const creditsEl = courseEl.querySelector(".course-credits");

  document.getElementById("details-title").textContent = courseDisplayNames[courseKey] || fullName;
  document.getElementById("details-summary").textContent = "Course information and dependency highlights for the selected class.";
  document.getElementById("details-code").textContent = courseDisplayNames[courseKey] || fullName;
  document.getElementById("details-name").textContent = titleEl ? titleEl.textContent.trim() : fullName;
  document.getElementById("details-term").textContent = findTermLabel(courseEl);
  document.getElementById("details-credits").textContent = creditsEl ? creditsEl.textContent.trim() : "--";
  document.getElementById("details-prereqs").textContent = formatList(dependencyData[courseKey]?.prereqs || []);
  document.getElementById("details-postreqs").textContent = formatList(dependencyData[courseKey]?.postreqs || []);
}

function getCourseData(courseEl) {
  const nameEl = courseEl.querySelector(".course-name");
  if (!nameEl) return null;

  const fullName = nameEl.textContent.trim();
  const courseKey = inferCourseKey(fullName);
  if (!courseKey) return null;

  return { courseKey, fullName };
}

function inferCourseKey(fullName) {
  const normalizedName = fullName.trim();
  const directMappings = {
    "ASC 1100": "ASC_1100",
    "Math 1151": "MATH_1151",
    "Physics 1250": "PHYSICS_1250",
    "CSE 1223": "CSE_1223",
    "GE Launch Seminar": "GE_LAUNCH_SEMINAR",
    "Math 1152": "MATH_1152",
    "GE Writing": "GE_WRITING",
    Science: "SCIENCE",
    "STAT 3470": "STAT_3470",
    "Foreign Language I": "FOREIGN_LANG_1",
    "MATH 3345": "MATH_3345",
    "Foreign Language II": "FOREIGN_LANG_2",
    "Foreign Language 3": "FOREIGN_LANG_3",
    "ECE 2060": "ECE_2060",
    "GE-SBS": "GE_SBS",
    "Technical Elective": "TECH_ELECTIVE",
    "GE Lit / VPA": "GE_LIT_VPA",
    "GE Diversity": "GE_DIVERSITY",
    "GE History": "GE_HISTORY",
    "GE Theme": "GE_THEME",
    "CSE 2501 / PHILOS 2338 / GE Theme": "CSE_2501_OR_PHIL_2338",
  };

  if (directMappings[normalizedName]) {
    return directMappings[normalizedName];
  }

  const codeMatch = normalizedName.match(/^[A-Z]{3,6}\s*\d{4}[A-Z]?/);
  if (!codeMatch) return null;

  return codeMatch[0].replace(/\s+/g, "_");
}

document.addEventListener("DOMContentLoaded", () => {
  const courseEls = document.querySelectorAll(".course");
  const firstCourse = courseEls[0];

  courseEls.forEach(courseEl => {
    courseEl.tabIndex = 0;
  });

  if (firstCourse) {
    const firstCourseData = getCourseData(firstCourse);
    if (firstCourseData) {
      highlightCourses(firstCourseData.courseKey);
      updateDetailsPanel(firstCourse, firstCourseData.courseKey, firstCourseData.fullName);
    }
  }

  document.addEventListener("mouseover", event => {
    const courseEl = event.target.closest(".course");
    if (!courseEl) return;

    const courseData = getCourseData(courseEl);
    if (!courseData) return;

    highlightCourses(courseData.courseKey);
    updateDetailsPanel(courseEl, courseData.courseKey, courseData.fullName);
  });

  document.addEventListener("click", event => {
    const courseEl = event.target.closest(".course");
    if (!courseEl) return;

    const courseData = getCourseData(courseEl);
    if (!courseData) return;

    highlightCourses(courseData.courseKey);
    updateDetailsPanel(courseEl, courseData.courseKey, courseData.fullName);
  });

  document.addEventListener("focusin", event => {
    const courseEl = event.target.closest(".course");
    if (!courseEl) return;

    const courseData = getCourseData(courseEl);
    if (!courseData) return;

    highlightCourses(courseData.courseKey);
    updateDetailsPanel(courseEl, courseData.courseKey, courseData.fullName);
  });

  document.addEventListener("keydown", event => {
    const courseEl = event.target.closest(".course");
    if (!courseEl) return;

    if (event.key !== "Enter" && event.key !== " ") return;

    const courseData = getCourseData(courseEl);
    if (!courseData) return;

    event.preventDefault();
    highlightCourses(courseData.courseKey);
    updateDetailsPanel(courseEl, courseData.courseKey, courseData.fullName);
  });

  document.addEventListener("mouseleave", event => {
    if (event.target === document.documentElement || event.target === document.body) {
      return;
    }
  });
});
