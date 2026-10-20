
$(document).ready(function () {

    console.log("Homework 9: jQuery loaded successfully!");

    // ========================================
    // STEP 1: SKILLS ARRAY AND FORM VALIDATION
    // ========================================

    let skills = [
        "C++",
        "Python",
        "HTML",
        "JavaScript",
        "Understanding Networks",
        "Working with Computers",
        "Windows",
        "Linux",
        "Visual Studio Code",
        "Problem Solving",
        "Communication",
        "Teamwork",
        "Time Management"
    ];

    // Higher-order function using a callback
    function updateSkills(callback) {
        callback();
        renderSkills();
    }

    // Check whether a skill already exists
    function skillExists(skill, excludeIndex = -1) {
        return skills.some(function (item, index) {
            return index !== excludeIndex &&
                item.toLowerCase() === skill.toLowerCase();
        });
    }

    // Display a message to the user
    function showMessage(message, isError = false) {
        $("#skillMessage")
            .removeClass("success-message error-message")
            .addClass(isError ? "error-message" : "success-message")
            .text(message);
    }

    // Render the skills list dynamically
    function renderSkills() {
        const list = $("#skillsList");
        list.empty();

        skills.forEach(function (skill, index) {

            const listItem = $("<li>")
                .addClass(
                    "list-group-item d-flex " +
                    "justify-content-between align-items-center"
                )
                .hide();

            const skillName = $("<span>")
                .addClass("skill-name")
                .text(skill)
                .attr("title", "Click to edit this skill")
                .attr("tabindex", "0")
                .attr("role", "button")
                .attr("aria-label", "Edit " + skill);

            const deleteButton = $("<button>")
                .addClass("btn btn-danger btn-sm delete-skill")
                .text("Delete");

            // Edit skill when clicked
            skillName.on("click", function () {
                editSkill(index);
            });

            // Allow keyboard editing
            skillName.on("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    editSkill(index);
                }
            });

            // Remove skill when delete is clicked
            deleteButton.on("click", function () {
                removeSkill(index);
            });

            listItem.append(skillName, deleteButton);
            list.append(listItem);

            listItem.fadeIn(250);
        });
    }

    // Add a new skill
    function addSkill() {
        const newSkill = $("#skillInput").val().trim();

        if (newSkill === "") {
            showMessage("Please enter a skill.", true);
            return;
        }

        if (skillExists(newSkill)) {
            showMessage("This skill already exists!", true);
            return;
        }

        updateSkills(function () {
            skills.push(newSkill);
        });

        $("#skillInput").val("");
        showMessage(newSkill + " was added successfully!");
    }

    // Edit an existing skill
    function editSkill(index) {
        const currentSkill = skills[index];

        const updatedSkill = prompt(
            "Edit your skill:",
            currentSkill
        );

        if (updatedSkill === null) {
            return;
        }

        const trimmedSkill = updatedSkill.trim();

        if (trimmedSkill === "") {
            showMessage("Skill name cannot be empty.", true);
            return;
        }

        if (skillExists(trimmedSkill, index)) {
            showMessage("This skill already exists!", true);
            return;
        }

        updateSkills(function () {
            skills[index] = trimmedSkill;
        });

        showMessage("Skill updated successfully!");
    }

    // Remove a skill
    function removeSkill(index) {
        const removedSkill = skills[index];

        const listItem = $("#skillsList li").eq(index);

        listItem.slideUp(300, function () {
            updateSkills(function () {
                skills.splice(index, 1);
            });

            showMessage(removedSkill + " was removed.");
        });
    }

    // Form submission
    $("#skillForm").on("submit", function (event) {
        event.preventDefault();
        addSkill();
    });

    // Clear button
    $("#clearSkill").on("click", function () {
        $("#skillForm")
            .find("input")
            .val("");

        $("#skillMessage").text("");
    });

    // ========================================
    // STEP 2: DYNAMIC NAVIGATION MENU
    // ========================================

    const navigationItems = [
        { name: "About", section: "#about" },
        { name: "Skills", section: "#skills" },
        { name: "Projects", section: "#projects" },
        { name: "Education", section: "#education" },
        { name: "Contact", section: "#contact" }
    ];

    function renderNavigation() {
        const nav = $("#dynamicNav");
        nav.empty();

        navigationItems.forEach(function (item) {

            const navItem = $("<li>")
                .addClass("nav-item");

            const navLink = $("<a>")
                .addClass("nav-link")
                .attr("href", item.section)
                .text(item.name);

            navItem.append(navLink);
            nav.append(navItem);
        });
    }

    // Smooth scrolling with jQuery animate()
    $("#dynamicNav").on("click", "a", function (event) {
        event.preventDefault();

        const target = $(this).attr("href");
        const section = $(target);

        if (section.length) {
            $("html, body").animate({
                scrollTop: section.offset().top - 20
            }, 600);
        }
    });

    // ========================================
    // STEP 3: PROJECTS ARRAY AND SORTING
    // ========================================

    const projects = [
        {
            title: "Portfolio Website",
            description:
                "A personal website showcasing my " +
                "cybersecurity skills and experience.",
            deadline: new Date("2026-10-15"),
            imageURL:
                "https://placehold.co/600x350/174a7e/ffffff" +
                "?text=Portfolio+Website"
        },
        {
            title: "Calculator",
            description:
                "A calculator program that performs " +
                "basic arithmetic operations.",
            deadline: new Date("2026-09-20"),
            imageURL:
                "https://placehold.co/600x350/243b55/ffffff" +
                "?text=Calculator"
        },
        {
            title: "Student Management System",
            description:
                "A program designed to organize and " +
                "manage student information.",
            deadline: new Date("2026-11-10"),
            imageURL:
                "https://placehold.co/600x350/007bff/ffffff" +
                "?text=Student+Management"
        }
    ];

    // Dynamically display project cards
    function renderProjects() {
        const container = $("#projectsContainer");
        container.empty();

        for (let i = 0; i < projects.length; i++) {

            const project = projects[i];

            const column = $("<div>")
                .addClass("col-md-4");

            const card = $("<div>")
                .addClass("card project-card");

            const image = $("<img>")
                .addClass("card-img-top")
                .attr("src", project.imageURL)
                .attr("alt", project.title);

            const cardBody = $("<div>")
                .addClass("card-body");

            const title = $("<h5>")
                .addClass("card-title")
                .text(project.title);

            const description = $("<p>")
                .addClass("card-text")
                .text(project.description);

            const deadline = $("<p>")
                .addClass("project-deadline")
                .text(
                    "Completion Date / Deadline: " +
                    project.deadline.toLocaleDateString()
                );

            cardBody.append(title, description, deadline);
            card.append(image, cardBody);
            column.append(card);

            container.append(column);
        }
    }

    // Sort earliest to latest
    $("#sortEarliest").on("click", function () {
        projects.sort(function (a, b) {
            return a.deadline - b.deadline;
        });

        renderProjects();
    });

    // Sort latest to earliest
    $("#sortLatest").on("click", function () {
        projects.sort(function (a, b) {
            return b.deadline - a.deadline;
        });

        renderProjects();
    });

    // ========================================
    // STEP 4: KEYBOARD EVENT LISTENERS
    // ========================================

    $("#skillInput").on("keydown", function (event) {

        // Enter submits the form and adds the skill
        if (event.key === "Enter") {
            event.preventDefault();
            addSkill();
        }

        // Escape clears all input fields
        if (event.key === "Escape") {
            $("#skillForm")
                .find("input")
                .val("");

            $("#skillMessage").text("");
        }
    });

    // ========================================
    // INITIALIZE THE WEBSITE
    // ========================================

    renderSkills();
    renderNavigation();
    renderProjects();

});
