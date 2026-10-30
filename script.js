// ========================================
// STUDY WITH SALWA
// MAIN JAVASCRIPT
// ========================================

const $ = (id) => document.getElementById(id);


// ========================================
// DATA STORAGE
// ========================================

function readTasks() {
    try {
        return JSON.parse(localStorage.getItem("salwaTasks")) || [];
    } catch {
        return [];
    }
}

let tasks = readTasks();

let sessions = Number(localStorage.getItem("salwaSessions")) || 0;

let currentLanguage =
    localStorage.getItem("salwaLanguage") || "en";

let currentPage = "dashboard";

let timerInterval = null;

let timerSeconds = 25 * 60;

let totalTimerSeconds = 25 * 60;

let timerRunning = false;

let timerMode = "focus";

let toastTimeout;


// ========================================
// TRANSLATIONS
// ========================================

const translations = {

    en: {
        workspace: "My workspace",
        menu: "MENU",
        dashboard: "Dashboard",
        myTasks: "My Tasks",
        focus: "Focus",
        preferences: "PREFERENCES",
        settings: "Settings",
        quote: "Small steps every day lead to big results.",
        student: "Student",
        welcome: "Welcome to Study with Salwa!",
        newTask: "New Task",
        dailyMotivation: "YOUR DAILY MOTIVATION",
        heroTitle: "Make today count.",
        heroText: "Organize your tasks, stay focused and achieve your goals.",
        totalTasks: "Total Tasks",
        allTasks: "All your tasks",
        completed: "Completed",
        wellDone: "Well done!",
        pending: "Pending",
        keepGoing: "Keep going!",
        focusSessions: "Focus Sessions",
        pomodoroSessions: "Pomodoro sessions",
        tasksOverview: "Tasks Overview",
        progressSubtitle: "Your productivity progress",
        quickFocus: "Quick Focus",
        focusSubtitle: "Time to concentrate",
        startFocus: "Start focus",
        recentTasks: "Recent Tasks",
        recentSubtitle: "A look at what you need to do",
        viewAll: "View all →",
        searchPlaceholder: "Search tasks...",
        allTasksFilter: "All tasks",
        pendingFilter: "Pending",
        completedFilter: "Completed",
        addTask: "Add Task",
        focusMode: "FOCUS MODE",
        focusBigTitle: "It's time to focus.",
        focusBigText: "One task at a time. You've got this!",
        shortBreak: "Short Break",
        longBreak: "Long Break",
        readyToFocus: "Ready to focus",
        start: "Start",
        pause: "Pause",
        resume: "Resume",
        reset: "Reset",
        completedSessions: "Completed sessions:",
        linkTask: "What are you working on?",
        noTaskSelected: "No task selected",
        generalSettings: "General Settings",
        settingsDescription: "Customize your study space.",
        language: "Language",
        languageDescription: "Choose your preferred language.",
        appearance: "Appearance",
        appearanceDescription: "Switch between light and dark mode.",
        toggleTheme: "Toggle theme",
        dataManagement: "Data Management",
        dataDescription: "Your tasks are saved in this browser.",
        clearTasks: "Clear all tasks",
        aboutText: "A personal space to organize your studies, build good habits and stay productive.",
        footerText: "Your journey, your progress.",
        createTask: "Create a task",
        editTask: "Edit task",
        modalSubtitle: "Add something you want to accomplish.",
        taskTitle: "Task title",
        taskPlaceholder: "e.g. Study Java",
        description: "Description",
        descriptionPlaceholder: "Add some details...",
        dueDate: "Study date",
        dueTime: "Start time",
        priority: "Priority",
        low: "Low",
        medium: "Medium",
        high: "High",
        category: "Category",
        study: "Study",
        personal: "Personal",
        work: "Work",
        other: "Other",
        cancel: "Cancel",
        saveTask: "Save Task",
        noTasks: "No tasks yet. Add your first task!",
        noSearchResults: "No tasks match your search.",
        deleteConfirm: "Are you sure you want to delete this task?",
        clearConfirm: "Delete all tasks? This cannot be undone.",
        taskAdded: "Task added successfully!",
        taskUpdated: "Task updated successfully!",
        taskDeleted: "Task deleted.",
        taskCompleted: "Task completed!",
        taskReopened: "Task marked as pending.",
        tasksCleared: "All tasks cleared.",
        timerFinished: "Timer completed!",
        focusCompleted: "Focus session completed! Great work!",
        breakFinished: "Break completed. Ready to focus?",
        themeDark: "Dark mode enabled",
        themeLight: "Light mode enabled",
        today: "Today",
        overdue: "Overdue",
        noDate: "No date",
        completedLabel: "Completed",
        pendingLabel: "Pending"
    },


    fr: {
        workspace: "Mon espace",
        menu: "MENU",
        dashboard: "Tableau de bord",
        myTasks: "Mes tâches",
        focus: "Concentration",
        preferences: "PRÉFÉRENCES",
        settings: "Paramètres",
        quote: "Chaque petit pas mène à de grands résultats.",
        student: "Étudiante",
        welcome: "Bon retour, Salwa !",
        newTask: "Nouvelle tâche",
        dailyMotivation: "VOTRE MOTIVATION DU JOUR",
        heroTitle: "Faites de cette journée une réussite.",
        heroText: "Organisez vos tâches et atteignez vos objectifs.",
        totalTasks: "Total des tâches",
        allTasks: "Toutes vos tâches",
        completed: "Terminées",
        wellDone: "Bravo !",
        pending: "En attente",
        keepGoing: "Continuez !",
        focusSessions: "Sessions de focus",
        pomodoroSessions: "Sessions Pomodoro",
        tasksOverview: "Aperçu des tâches",
        progressSubtitle: "Votre progression",
        quickFocus: "Focus rapide",
        focusSubtitle: "C'est le moment de se concentrer",
        startFocus: "Commencer",
        recentTasks: "Tâches récentes",
        recentSubtitle: "Voici ce que vous devez faire",
        viewAll: "Voir tout →",
        searchPlaceholder: "Rechercher des tâches...",
        allTasksFilter: "Toutes les tâches",
        pendingFilter: "En attente",
        completedFilter: "Terminées",
        addTask: "Ajouter",
        focusMode: "MODE CONCENTRATION",
        focusBigTitle: "C'est le moment de se concentrer.",
        focusBigText: "Une tâche à la fois. Vous pouvez le faire !",
        shortBreak: "Petite pause",
        longBreak: "Longue pause",
        readyToFocus: "Prête à commencer",
        start: "Démarrer",
        pause: "Pause",
        resume: "Reprendre",
        reset: "Réinitialiser",
        completedSessions: "Sessions terminées :",
        linkTask: "Sur quoi travaillez-vous ?",
        noTaskSelected: "Aucune tâche sélectionnée",
        generalSettings: "Paramètres généraux",
        settingsDescription: "Personnalisez votre espace d'étude.",
        language: "Langue",
        languageDescription: "Choisissez votre langue préférée.",
        appearance: "Apparence",
        appearanceDescription: "Choisissez le mode clair ou sombre.",
        toggleTheme: "Changer le thème",
        dataManagement: "Gestion des données",
        dataDescription: "Vos tâches sont enregistrées dans ce navigateur.",
        clearTasks: "Supprimer toutes les tâches",
        aboutText: "Un espace personnel pour organiser vos études et rester productive.",
        footerText: "Votre parcours, vos progrès.",
        createTask: "Créer une tâche",
        editTask: "Modifier la tâche",
        modalSubtitle: "Ajoutez un objectif à accomplir.",
        taskTitle: "Titre de la tâche",
        taskPlaceholder: "Ex. : Étudier Java",
        description: "Description",
        descriptionPlaceholder: "Ajoutez des détails...",
        dueDate: "Date d'étude",
        dueTime: "Heure de début",
        priority: "Priorité",
        low: "Basse",
        medium: "Moyenne",
        high: "Haute",
        category: "Catégorie",
        study: "Études",
        personal: "Personnel",
        work: "Travail",
        other: "Autre",
        cancel: "Annuler",
        saveTask: "Enregistrer",
        noTasks: "Aucune tâche. Ajoutez votre première tâche !",
        noSearchResults: "Aucune tâche trouvée.",
        deleteConfirm: "Voulez-vous supprimer cette tâche ?",
        clearConfirm: "Supprimer toutes les tâches ?",
        taskAdded: "Tâche ajoutée avec succès !",
        taskUpdated: "Tâche modifiée avec succès !",
        taskDeleted: "Tâche supprimée.",
        taskCompleted: "Tâche terminée !",
        taskReopened: "Tâche remise en attente.",
        tasksCleared: "Toutes les tâches supprimées.",
        timerFinished: "Temps écoulé !",
        focusCompleted: "Session terminée ! Bravo !",
        breakFinished: "Pause terminée.",
        themeDark: "Mode sombre activé",
        themeLight: "Mode clair activé",
        today: "Aujourd'hui",
        overdue: "En retard",
        noDate: "Sans date",
        completedLabel: "Terminée",
        pendingLabel: "En attente"
    }

};


function t(key) {
    return translations[currentLanguage][key]
        || translations.en[key]
        || key;
}


// ========================================
// SAVE DATA
// ========================================

function saveTasks() {

    localStorage.setItem(
        "salwaTasks",
        JSON.stringify(tasks)
    );

}

function saveSessions() {

    localStorage.setItem(
        "salwaSessions",
        sessions
    );

}


// ========================================
// LANGUAGE
// ========================================

function applyLanguage() {

    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        if (translations[currentLanguage][key]) {
            element.textContent = t(key);
        }

    });


    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.dataset.i18nPlaceholder;

        element.placeholder = t(key);

    });


    $("pageTitle").textContent = t(currentPage);

    $("timerStart").textContent = timerRunning
        ? t("pause")
        : t("start");

    renderTasks();

    updateStats();

    updateFocusTaskOptions();

    updateStudyDayPreview();

    updateDate();

}

$("languageSelect").addEventListener("change", event => {

    currentLanguage = event.target.value;

    localStorage.setItem(
        "salwaLanguage",
        currentLanguage
    );

    applyLanguage();

});


// ========================================
// NAVIGATION
// ========================================

function showPage(page) {

    currentPage = page;

    document.querySelectorAll(".page").forEach(section => {

        section.classList.remove("active");

    });

    $(page + "Page").classList.add("active");


    document.querySelectorAll(".nav-item[data-page]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });

    $("pageTitle").textContent = t(page);

    if (page === "tasks" || page === "dashboard") {

        renderTasks();

    }

}

document.querySelectorAll(".nav-item[data-page]").forEach(button => {

    button.addEventListener("click", () => {

        showPage(button.dataset.page);

    });

});

$("settingsButton").addEventListener("click", () => {

    showPage("settings");

});

$("viewAllTasks").addEventListener("click", () => {

    showPage("tasks");

});


// ========================================
// TASK MODAL
// ========================================

function openModal(task = null) {

    $("taskForm").reset();

    $("taskId").value = "";


    if (task) {

        $("modalTitle").textContent = t("editTask");

        $("taskId").value = task.id;

        $("taskTitle").value = task.title;

        $("taskDescription").value =
            task.description || "";

        $("taskDate").value =
            task.date || "";

        $("taskTime").value =
            task.time || "";

        $("taskDurationHours").value =
            Number(task.durationHours ?? 1);

        $("taskDurationMinutes").value =
            String(Number(task.durationMinutes ?? 30));

        $("taskPriority").value =
            task.priority || "medium";

        $("taskCategory").value =
            task.category || "Study";

    } else {

        $("modalTitle").textContent = t("createTask");

        $("taskPriority").value = "medium";

        $("taskCategory").value = "Study";

        $("taskDurationHours").value = "1";

        $("taskDurationMinutes").value = "30";

    }


    updateStudyDayPreview();

    $("taskModal").classList.add("show");

    $("taskTitle").focus();

}


function closeModal() {

    $("taskModal").classList.remove("show");

}


$("addTaskTop").addEventListener("click", () => {

    openModal();

});

$("addTaskButton").addEventListener("click", () => {

    openModal();

});

$("closeModal").addEventListener("click", closeModal);

$("cancelModal").addEventListener("click", closeModal);


$("taskModal").addEventListener("click", event => {

    if (event.target === $("taskModal")) {

        closeModal();

    }

});


// ========================================
// ADD AND EDIT TASKS
// ========================================

$("taskForm").addEventListener("submit", event => {

    event.preventDefault();


    const id = $("taskId").value;


    const taskData = {

        id: id || Date.now().toString(),

        title: $("taskTitle").value.trim(),

        description: $("taskDescription").value.trim(),

        date: $("taskDate").value,

        time: $("taskTime").value,

        durationHours: Math.max(
            0,
            Math.min(24, Number($("taskDurationHours").value) || 0)
        ),

        durationMinutes:
            Number($("taskDurationMinutes").value) || 0,

        priority: $("taskPriority").value,

        category: $("taskCategory").value,

        completed: false,

        createdAt: new Date().toISOString()

    };


    if (!taskData.title) return;


    if (id) {

        const oldTask = tasks.find(task => task.id === id);

        if (oldTask) {

            taskData.completed = oldTask.completed;

            taskData.createdAt = oldTask.createdAt;

            taskData.updatedAt = new Date().toISOString();

            tasks = tasks.map(task =>
                task.id === id ? taskData : task
            );

        }

        showToast(t("taskUpdated"));

    } else {

        tasks.unshift(taskData);

        showToast(t("taskAdded"));

    }


    saveTasks();

    closeModal();

    renderTasks();

    updateStats();

    updateFocusTaskOptions();

});


// ========================================
// TASK DATE
// ========================================

function getTaskDateText(task) {

    if (!task.date) return t("noDate");


    const dueDate = new Date(task.date + "T00:00:00");

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    if (dueDate.getTime() === today.getTime()) {

        return t("today");

    }


    if (dueDate < today && !task.completed) {

        return t("overdue");

    }


    return new Intl.DateTimeFormat(
        currentLanguage === "fr" ? "fr-FR" : "en-US",
        {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    ).format(dueDate);

}


// ========================================
// CREATE TASK ELEMENT
// ========================================

function createTaskElement(task) {

    const item = document.createElement("div");

    item.className =
        "task-item" + (task.completed ? " done" : "");


    // CHECKBOX

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className = "task-check";

    checkbox.checked = task.completed;

    checkbox.setAttribute(
        "aria-label",
        t("completedLabel")
    );

    checkbox.addEventListener("change", () => {

        toggleTask(task.id);

    });


    // TASK INFORMATION

    const info = document.createElement("div");

    info.className = "task-info";


    const title = document.createElement("h4");

    title.textContent = task.title;


    const description = document.createElement("p");

    description.textContent =
        task.description || getTaskDateText(task);


    // TASK DETAILS

    const meta = document.createElement("div");

    meta.className = "task-meta";


    const priority = document.createElement("span");

    priority.className =
        "priority " + task.priority;

    priority.textContent =
        t(task.priority);


    const category = document.createElement("span");

    category.className = "category-tag";

    category.textContent =
        t(task.category.toLowerCase()) || task.category;


    const date = document.createElement("span");

    date.className = "category-tag";

    date.textContent =
        "◷ " + getTaskDateText(task) +
        (task.time ? " · " + task.time : "");


    const totalMinutes =
        (Number(task.durationHours) || 0) * 60 +
        (Number(task.durationMinutes) || 0);


    const duration = document.createElement("span");

    duration.className = "category-tag";

    duration.textContent =
        "⏱ " +
        Math.floor(totalMinutes / 60) +
        "h " +
        (totalMinutes % 60) +
        "min";


    meta.append(
        priority,
        category,
        date,
        duration
    );


    info.append(
        title,
        description,
        meta
    );


    // EDIT AND DELETE BUTTONS

    const actions = document.createElement("div");

    actions.className = "task-actions";


    const editButton = document.createElement("button");

    editButton.type = "button";

    editButton.textContent = "✎";

    editButton.title = t("editTask");

    editButton.addEventListener("click", () => {

        openModal(task);

    });


    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.textContent = "×";

    deleteButton.title = "Delete";

    deleteButton.addEventListener("click", () => {

        deleteTask(task.id);

    });


    actions.append(
        editButton,
        deleteButton
    );


    item.append(
        checkbox,
        info,
        actions
    );


    return item;

}


// ========================================
// DISPLAY TASKS
// ========================================

function renderTasks() {

    const recentContainer = $("recentTasksList");

    const allContainer = $("allTasksList");


    recentContainer.innerHTML = "";

    allContainer.innerHTML = "";


    const search =
        $("searchInput").value.toLowerCase();

    const filter =
        $("filterSelect").value;


    const filteredTasks = tasks.filter(task => {

        const matchesSearch =

            String(task.title || "")
                .toLowerCase()
                .includes(search)

            ||

            String(task.description || "")
                .toLowerCase()
                .includes(search);


        const matchesFilter =

            filter === "all"

            ||

            (filter === "completed" && task.completed)

            ||

            (filter === "pending" && !task.completed);


        return matchesSearch && matchesFilter;

    });


    const recentTasks = tasks.slice(0, 5);


    // RECENT TASKS

    if (recentTasks.length === 0) {

        recentContainer.innerHTML =
            `<div class="empty-state">${t("noTasks")}</div>`;

    } else {

        recentTasks.forEach(task => {

            recentContainer.appendChild(
                createTaskElement(task)
            );

        });

    }


    // ALL TASKS

    if (filteredTasks.length === 0) {

        allContainer.innerHTML =
            `<div class="empty-state">${
                search || filter !== "all"
                    ? t("noSearchResults")
                    : t("noTasks")
            }</div>`;

    } else {

        filteredTasks.forEach(task => {

            allContainer.appendChild(
                createTaskElement(task)
            );

        });

    }

}


$("searchInput").addEventListener("input", renderTasks);

$("filterSelect").addEventListener("change", renderTasks);


// ========================================
// COMPLETE TASK
// ========================================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

            showToast(
                task.completed
                    ? t("taskCompleted")
                    : t("taskReopened")
            );

        }

        return task;

    });


    saveTasks();

    renderTasks();

    updateStats();

    updateFocusTaskOptions();

}


// ========================================
// DELETE TASK
// ========================================

function deleteTask(id) {

    if (!confirm(t("deleteConfirm"))) return;


    tasks = tasks.filter(task => task.id !== id);


    saveTasks();

    renderTasks();

    updateStats();

    updateFocusTaskOptions();

    showToast(t("taskDeleted"));

}


// ========================================
// STATISTICS
// ========================================

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;


    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);


    $("totalTasks").textContent = total;

    $("completedTasks").textContent = completed;

    $("pendingTasks").textContent = pending;

    $("focusSessions").textContent = sessions;


    $("progressPercent").textContent =
        percentage + "%";

    $("progressFill").style.width =
        percentage + "%";


    $("progressCompleted").textContent =
        completed + " " +
        t("completedLabel").toLowerCase();


    $("progressRemaining").textContent =
        pending + " " +
        t("pendingLabel").toLowerCase();


    $("sessionCount").textContent = sessions;

}


// ========================================
// FOCUS TASK SELECT
// ========================================

function updateFocusTaskOptions() {

    const select = $("focusTaskSelect");

    const selectedValue = select.value;


    select.innerHTML = "";


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        t("noTaskSelected");

    select.appendChild(defaultOption);


    tasks
        .filter(task => !task.completed)
        .forEach(task => {

            const option =
                document.createElement("option");

            option.value = task.id;

            option.textContent = task.title;

            select.appendChild(option);

        });


    if (
        tasks.some(task =>
            task.id === selectedValue && !task.completed
        )
    ) {

        select.value = selectedValue;

    }

}


// ========================================
// POMODORO TIMER
// ========================================

const circumference =
    2 * Math.PI * 98;


function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;


    return String(minutes).padStart(2, "0")
        + ":"
        + String(remainingSeconds).padStart(2, "0");

}


function updateTimerDisplay() {

    const time = formatTime(timerSeconds);


    $("mainTimer").textContent = time;

    $("quickTimer").textContent = time;


    const progress =
        timerSeconds / totalTimerSeconds;

    const offset =
        circumference * (1 - progress);


    $("timerProgress").style.strokeDasharray =
        circumference;

    $("timerProgress").style.strokeDashoffset =
        offset;

}


function setTimerMode(mode, minutes) {

    clearInterval(timerInterval);

    timerRunning = false;

    timerMode = mode;


    timerSeconds = minutes * 60;

    totalTimerSeconds = minutes * 60;


    document.querySelectorAll(".timer-tab").forEach(tab => {

        tab.classList.toggle(
            "active",
            tab.dataset.mode === mode
        );

    });


    $("timerStatus").textContent =
        mode === "focus"
            ? t("readyToFocus")
            : t("breakFinished");


    $("timerStart").textContent = t("start");


    updateTimerDisplay();

}


document.querySelectorAll(".timer-tab").forEach(tab => {

    tab.addEventListener("click", () => {

        setTimerMode(
            tab.dataset.mode,
            Number(tab.dataset.minutes)
        );

    });

});


function startTimer() {

    if (timerRunning) {

        clearInterval(timerInterval);

        timerRunning = false;

        $("timerStart").textContent = t("resume");

        $("timerStatus").textContent = t("pause");

        return;

    }


    if (timerSeconds <= 0) {

        timerSeconds = totalTimerSeconds;

    }


    timerRunning = true;

    $("timerStart").textContent = t("pause");

    $("timerStatus").textContent = t("focus");


    timerInterval = setInterval(() => {

        timerSeconds--;

        updateTimerDisplay();


        if (timerSeconds <= 0) {

            finishTimer();

        }

    }, 1000);

}


function finishTimer() {

    clearInterval(timerInterval);

    timerRunning = false;


    $("timerStart").textContent = t("start");


    if (timerMode === "focus") {

        sessions++;

        saveSessions();

        updateStats();

        showToast(t("focusCompleted"));

    } else {

        showToast(t("breakFinished"));

    }


    $("timerStatus").textContent =
        t("timerFinished");


    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification("Study with Salwa", {
            body: t("timerFinished")
        });

    }

}


function resetTimer() {

    clearInterval(timerInterval);

    timerRunning = false;

    timerSeconds = totalTimerSeconds;


    $("timerStart").textContent = t("start");

    $("timerStatus").textContent =
        timerMode === "focus"
            ? t("readyToFocus")
            : t("breakFinished");


    updateTimerDisplay();

}


$("timerStart").addEventListener("click", startTimer);

$("timerReset").addEventListener("click", resetTimer);


$("quickFocusButton").addEventListener("click", () => {

    showPage("focus");


    if (timerMode !== "focus") {

        setTimerMode("focus", 25);

    }


    if (!timerRunning) {

        startTimer();

    }

});


// ========================================
// DARK MODE
// ========================================

function toggleTheme() {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "salwaTheme",
        isDark ? "dark" : "light"
    );


    $("themeButton").textContent =
        isDark ? "☀" : "☾";


    showToast(
        isDark ? t("themeDark") : t("themeLight")
    );

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem("salwaTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        $("themeButton").textContent = "☀";

    } else {

        $("themeButton").textContent = "☾";

    }

}


$("themeButton").addEventListener("click", toggleTheme);

$("settingsThemeButton").addEventListener("click", toggleTheme);


// ========================================
// CLEAR ALL TASKS
// ========================================

$("clearTasksButton").addEventListener("click", () => {

    if (!confirm(t("clearConfirm"))) return;


    tasks = [];


    saveTasks();

    renderTasks();

    updateStats();

    updateFocusTaskOptions();


    showToast(t("tasksCleared"));

});


// ========================================
// TOAST MESSAGE
// ========================================

function showToast(message) {

    const toast = $("toast");


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ========================================
// LIVE DATE AND CLOCK
// ========================================

function updateDate() {

    const now = new Date();


    const locale =
        currentLanguage === "fr"
            ? "fr-FR"
            : "en-US";


    $("currentDate").textContent =
        new Intl.DateTimeFormat(locale, {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        }).format(now);


    $("liveClock").textContent =
        new Intl.DateTimeFormat("en-GB", {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit",

            hour12: false

        }).format(now);

}


// ========================================
// STUDY DAY PREVIEW
// ========================================

function updateStudyDayPreview() {

    const value = $("taskDate").value;

    const preview = $("studyDayPreview");


    if (!value) {

        preview.textContent =
            currentLanguage === "fr"
                ? "Choisissez une date pour afficher le jour."
                : "Choose a date to see the study day.";

        return;

    }


    const date =
        new Date(value + "T12:00:00");


    preview.textContent =
        new Intl.DateTimeFormat(

            currentLanguage === "fr"
                ? "fr-FR"
                : "en-US",

            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }

        ).format(date);

}


$("taskDate").addEventListener(
    "change",
    updateStudyDayPreview
);


// ========================================
// INITIALIZATION
// ========================================

function initializeApp() {

    loadTheme();


    $("languageSelect").value =
        currentLanguage;


    applyLanguage();

    updateDate();

    updateTimerDisplay();

    updateStats();

    renderTasks();

    updateFocusTaskOptions();

    updateStudyDayPreview();


    // Update the clock every second

    setInterval(updateDate, 1000);

}


initializeApp();
