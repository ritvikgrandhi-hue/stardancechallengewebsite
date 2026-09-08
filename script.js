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
const mediaViewer = document.getElementById("media-viewer");
const mediaContainer = document.getElementById("media-container");
const closeMediaButton = document.getElementById("close-media");
const logoutButton = document.getElementById("logout");

let isAdmin = true;//sessionStorage.getItem("isAdmin") === "true";; // Change this to false to simulate a non-admin user

logoutButton.addEventListener("click", function() {
    sessionStorage.removeItem("isAdmin");
    window.location.href = "admin.html";
});

const projects = [];
//sets project and devlog to null to ask whether editing project or saving
let currentProject = null;
let currentDevlog = null;

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
    //counts number of devlogs in each project and displays it on the project card
    const devlogCount = document.createElement("p");
    devlogCount.classList.add("devlog-count");
    devlogCount.textContent = `${project.devlogs.length} Devlogs`;

    newProject.appendChild(devlogCount);

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

    projectImage.value = "";
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
    currentDevlog = null;

    devlogForm.style.display = "block";
    devlogList.style.display = "none";

    devlogTitle.value = "";
    devlogContent.value = "";
    devlogPhotos.value = "";
    devlogVideos.value = "";
});

cancelDevlogButton.addEventListener("click", function() {
    devlogForm.style.display = "none";
    devlogList.style.display = "block";

    //prevents page from thinking we are still editing if we cancel and create a new one
    currentDevlog = null;

    devlogTitle.value = "";
    devlogContent.value = "";
    devlogPhotos.value = "";
    devlogVideos.value = "";
});

saveDevlogButton.addEventListener("click", function() {
    //if currentDevlog = devlog, it will edit, or else it will create

    if (currentDevlog) {
        currentDevlog.title = devlogTitle.value;
        currentDevlog.content = devlogContent.value;

        if (devlogPhotos.files.length > 0) {
            currentDevlog.photos = [];
            //imitates the for loop that changes the photos in variable "devlog" line 218
            for (const photo of devlogPhotos.files) {
            currentDevlog.photos.push(photo);
            }
        }
            
        if (devlogVideos.files.length > 0) {
            currentDevlog.videos = [];
            //imitates the for loop that changes the videos in variable "devlog" line idk
            for (const video of devlogVideos.files) {
            currentDevlog.videos.push(video);
            }   
        }   
        displayDevlogs();

        devlogForm.style.display = "none";
        devlogList.style.display = "block";
        currentDevlog = null;
        return;
        // edits it or creates new
    }
    const devlog = {
        id: Date.now(),
        title: devlogTitle.value,
        content: devlogContent.value,
        date: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }),
        photos: [],
        videos: []
    };
    for (const photo of devlogPhotos.files) {
        devlog.photos.push(photo);
    }

    for (const video of devlogVideos.files) {
        devlog.videos.push(video);
    }

    currentProject.devlogs.unshift(devlog);
    updateDevlogCount(currentProject);

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

        const devlogMedia = document.createElement("div");
        devlogMedia.classList.add("devlog-media");

        const contentElement = document.createElement("p");
        contentElement.textContent = devlog.content;

        devlogElement.appendChild(titleElement);
        devlogElement.appendChild(dateElement);
        devlogElement.appendChild(contentElement);
        //adding photos & videos, then appending them to a visible element
        devlog.photos.forEach(function(photo) {
            const imageElement = document.createElement("img");

            imageElement.src = URL.createObjectURL(photo);
            //if image is clicked, opens in a modal
            imageElement.addEventListener("click", function() {
                mediaContainer.innerHTML = "";

                const enlargedImage = document.createElement("img");
                enlargedImage.src = imageElement.src;

                mediaContainer.appendChild(enlargedImage);
                mediaViewer.showModal();
            });

            devlogMedia.appendChild(imageElement);
        });

        devlog.videos.forEach(function(video) {
            const videoElement = document.createElement("video");

            videoElement.src = URL.createObjectURL(video);
            videoElement.controls = true;
            //if video is clicked, opens in a modal
            videoElement.addEventListener("click", function() {
                mediaContainer.innerHTML = "";

                const enlargedVideo = document.createElement("video");
                enlargedVideo.src = videoElement.src;
                enlargedVideo.controls = true;

                mediaContainer.appendChild(enlargedVideo);
                mediaViewer.showModal();
            });
            
            devlogMedia.appendChild(videoElement);
        });
        devlogElement.appendChild(devlogMedia);
        //devlog actions tab
        const devlogActions = document.createElement("div");
        devlogActions.classList.add("devlog-actions");
        //creates edit button in devlog actions tab for html
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        devlogActions.appendChild(editButton);
        //creates edit button functionality
        editButton.addEventListener("click", function() {
            currentDevlog = devlog;
            devlogForm.style.display = "block";
            devlogList.style.display = "none";
            devlogTitle.value = devlog.title;
            devlogContent.value = devlog.content;
        });
        //creates delete button in devlog actions tab

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        devlogActions.appendChild(deleteButton);
        //creates delete button functionality
        deleteButton.addEventListener("click", function() {
            const index = currentProject.devlogs.indexOf(devlog);
            currentProject.devlogs.splice(index, 1);
            updateDevlogCount(currentProject);
            displayDevlogs();
        });

        devlogElement.appendChild(devlogActions);


        devlogList.appendChild(devlogElement);
    });
}

closeMediaButton.addEventListener("click", function() {
    mediaViewer.close();
});

function updateDevlogCount(project) {
    const devlogCount = project.card.querySelector(".devlog-count");

    devlogCount.textContent = `${project.devlogs.length} Devlog(s)`;
}

function updateAdminControls() {
    if (isAdmin) {
        addProjectButton.style.display = "block";
        editProjectButton.style.display = "block";
        deleteProjectButton.style.display = "block";
        addDevlogButton.style.display = "block";
        logoutButton.style.display = "block";
    } else {
        addProjectButton.style.display = "none";
        editProjectButton.style.display = "none";
        deleteProjectButton.style.display = "none";
        addDevlogButton.style.display = "none";
        logoutButton.style.display = "none";
    }
}

updateAdminControls();
