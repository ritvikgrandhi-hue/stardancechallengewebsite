const addProjectButton = document.getElementById("add-project");
const projectForm = document.getElementById("project-form");
const projectName = document.getElementById("project-name");
const projectDescription = document.getElementById("project-description");
const projectImage = document.getElementById("project-image");
const saveProjectButton = document.getElementById("save-project");
const projectCards = document.querySelector(".project-cards");
const projectView = document.getElementById("project-view");
const viewProjectTitle = document.getElementById("view-project-title");
const viewProjectDescription = document.getElementById("view-project-description");
const backToProjects = document.getElementById("back-to-projects");
const removeImageButton = document.getElementById("remove-image");
const cancelProjectButton = document.getElementById("cancel-project");
const deleteProjectButton = document.getElementById("delete-project");
const addDevlogButton = document.getElementById("add-devlog");
const devlogForm = document.getElementById("devlog-form");
const devlogTitle = document.getElementById("devlog-title");
const devlogContent = document.getElementById("devlog-content");
const saveDevlogButton = document.getElementById("save-devlog");
const cancelDevlogButton = document.getElementById("cancel-devlog");
const devlogList = document.getElementById("devlog-list");
const devlogPhotos = document.getElementById("devlog-photos");
const devlogVideos = document.getElementById("devlog-videos");

const projects = [];
let currentProject = null;

const editProjectButton = document.getElementById("edit-project");

addProjectButton.addEventListener("click", function() {
    projectForm.style.display = "block"
});

saveProjectButton.addEventListener("click", function() {
    if (currentProject) {
        currentProject.name = projectName.value;
        currentProject.description = projectDescription.value;

        if (projectImage.files[0]) {
            currentProject.image = projectImage.files[0];
        }

        currentProject.card.querySelector(".project-title").textContent = currentProject.name;
        currentProject.card.querySelector(".project-description").textContent = currentProject.description;
        
        const cardImage = currentProject.card.querySelector("img");

        if (currentProject.image) {

            if (cardImage) {
                cardImage.src = URL.createObjectURL(currentProject.image);
            } else {
                const newImage = document.createElement("img");

                newImage.src = URL.createObjectURL(currentProject.image);

                currentProject.card.insertBefore(
                    newImage,
                    currentProject.card.querySelector(".project-title")
                );
            }

        } else if (cardImage) {
            cardImage.remove();
        }

        viewProjectTitle.textContent = currentProject.name;
        viewProjectDescription.textContent = currentProject.description;

        projectForm.style.display = "none";

        return;
    }

    projectForm.style.display = "none"

    const project = {
        id: Date.now(),
        name: projectName.value,
        description: projectDescription.value,
        image: projectImage.files[0] || null,
        devlogs: [],
        card: null //just to remember: card isn't the data, it references the visual HTML representation of the data
    };
    projects.push(project);
    //creates project box
    const newProject = document.createElement("div");
    newProject.classList.add("project-card");

    if (project.image) {
        const projectImageElement = document.createElement("img");

        projectImageElement.setAttribute(
            "src",
            URL.createObjectURL(project.image)
        );

        newProject.appendChild(projectImageElement);
    }

    const title = document.createElement("h2");
    title.classList.add("project-title");
    title.textContent = projectName.value;

    newProject.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("project-description");
    description.textContent = projectDescription.value;
    newProject.appendChild(description);

    project.card = newProject;
    projectCards.appendChild(newProject);

    projectName.value = "";
    projectDescription.value = "";
    projectImage.value = "";

    newProject.addEventListener("click", function() {
        currentProject = project;
        projectCards.style.display = "none";
        projectView.style.display = "block";
        addProjectButton.style.display = "none";
        viewProjectTitle.textContent = project.name;
        viewProjectDescription.textContent = project.description;
    });
});

cancelProjectButton.addEventListener("click", function() {
    projectForm.style.display = "none";

    projectName.value = "";
    projectDescription.value = "";
    projectImage.value = "";
});

removeImageButton.addEventListener("click", function() {
    projectImage.value = "";

    if (currentProject) {
        currentProject.image = null;
    } else if (cardImage) {
    cardImage.remove();
    }
});

backToProjects.addEventListener("click", function() {
    projectView.style.display = "none";
    projectCards.style.display = "grid";
    addProjectButton.style.display = "block";
    currentProject = null;
});

editProjectButton.addEventListener("click", function() {
    projectForm.style.display = "block";

    projectName.value = currentProject.name;
    projectDescription.value = currentProject.description;
});

deleteProjectButton.addEventListener("click", function() {
    if (!currentProject) {
        return;
    }
    if (!confirm("Are you sure you want to delete this project?")) {
    return;
    }
    const projectIndex = projects.indexOf(currentProject);

    projects.splice(projectIndex, 1);

    currentProject.card.remove();

    currentProject = null;

    projectView.style.display = "none";
    projectCards.style.display = "grid";
    addProjectButton.style.display = "block";
});

addDevlogButton.addEventListener("click", function() {
    devlogForm.style.display = "block";
    devlogList.style.display = "none";
});

cancelDevlogButton.addEventListener("click", function() {
    devlogForm.style.display = "none";
    devlogList.style.display = "block";

    devlogTitle.value = "";
    devlogContent.value = "";
});

saveDevlogButton.addEventListener("click", function() {
    const devlog = {
        id: Date.now(),
        title: devlogTitle.value,
        content: devlogContent.value,
        date: new Date().toLocaleDateString(),
        photos: [],
        videos: []
    };
    for (const photo of devlogPhotos.files) {
        devlog.photos.push(photo);
    }

    for (const video of devlogVideos.files) {
        devlog.videos.push(video);
    }

    currentProject.devlogs.push(devlog);

    displayDevlogs();

    devlogForm.style.display = "none";
    devlogList.style.display = "block";

    devlogTitle.value = "";
    devlogContent.value = "";
});

function displayDevlogs() {
    devlogList.innerHTML = "";

    currentProject.devlogs.forEach(function(devlog) {
        const devlogElement = document.createElement("div");
        devlogElement.classList.add("devlog");

        const titleElement = document.createElement("h3");
        titleElement.textContent = devlog.title;

        const dateElement = document.createElement("p");
        dateElement.textContent = devlog.date;

        const contentElement = document.createElement("p");
        contentElement.textContent = devlog.content;

        devlogElement.appendChild(titleElement);
        devlogElement.appendChild(dateElement);
        devlogElement.appendChild(contentElement);
        //adding photos & videos, then appending them to a visible element
        devlog.photos.forEach(function(photo) {
            const imageElement = document.createElement("img");

            imageElement.src = URL.createObjectURL(photo);

            devlogElement.appendChild(imageElement);
        });

        devlog.videos.forEach(function(video) {
            const videoElement = document.createElement("video");

            videoElement.src = URL.createObjectURL(video);
            videoElement.controls = true;

            devlogElement.appendChild(videoElement);
        });

        devlogList.appendChild(devlogElement);
    });
}