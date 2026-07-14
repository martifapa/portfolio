const technologies = {
    'TypeScript': 'typescript.png',
    'JavaScript': 'javascript.png',
    'React': 'react.svg',
    'Redux': 'redux.svg',
    'Node': 'node.svg',
    'Express': 'expressjs.svg',
    'SQL': 'sql.png',
    'Postgres': 'postgres.png',
    'MongoDB': 'mongodb.png',
    'Python': 'python.png',
    'Django': 'django.png',
    'FastAPI': 'fastapi.svg',
    'Docker': 'docker.png',
};

const techStack = document.querySelector('.tech-stack');

Object.keys(technologies).forEach(tech => {
    const card = document.createElement('div');
    card.classList.add('card');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('card-img-wrapper');
    const img = document.createElement('img');
    img.src = `images/techstack/${technologies[tech]}`;

    const techP = document.createElement('p');
    techP.textContent = tech;

    imgWrapper.appendChild(img);

    card.appendChild(imgWrapper);
    card.appendChild(techP);

    techStack.appendChild(card);
});

const possibleExtensions = ['.svg', '.png', '.jpeg', '.jpg'];

const displayProjectStack = async (project) => {
    const stack = project.stack;
    const projectDetails = document.querySelector('.project-details');

    const oldProjectStack = document.querySelector('.stack-details');
    oldProjectStack.classList.remove('up');
    oldProjectStack.classList.add('down');
    
    const newProjectStack = document.createElement('div');
    newProjectStack.classList.add('stack-details');
    newProjectStack.classList.add('up');
    
    for (const tech of stack) {
        const card = document.createElement('div');
        card.classList.add('card');

        if (tech === 'Recharts') {
            card.classList.add(tech.toLowerCase());
        }
    
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('card-img-wrapper');
        const img = document.createElement('img');
        const imgSrc = await findFile(tech, possibleExtensions);
        img.src = imgSrc;
    
        const techP = document.createElement('p');
        techP.textContent = tech;
    
        imgWrapper.appendChild(img);
    
        card.appendChild(imgWrapper);
        card.appendChild(techP);
    
        newProjectStack.appendChild(card);
    };

    setTimeout(() => {
        newProjectStack.classList.remove('up');
    }, 50);

    projectDetails.appendChild(newProjectStack);
    setTimeout(() => {
        oldProjectStack.remove();
    }, 350);
}

const checkFileExists = async (filename) => {
    return fetch(filename, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                return filename;
            }
            return null;
        })
        .catch(() => null);
}

const findFile = async (baseName, extensions) => {
    for (const extension of extensions) {
        const filename = `images/techstack/${baseName.toLowerCase()}${extension}`;
        const foundFile = await checkFileExists(filename);
        if (foundFile) {
            return foundFile;
        }
    }
    return null;
}


document.addEventListener('DOMContentLoaded', () => {
    fetch('/projects/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            return response.json();
        })
        .then(data => {
            const projects = data.projects;
            displayProjects(projects);
        })
        .catch(error => {
            console.error(error);
        });
})

const displayProjects = (projects) => {
    const container = document.querySelector('.projects-grid');

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('header-img-wrapper');
        const img = document.createElement('img');
        img.src = `/images/${project.hero}`;
        img.alt = 'Project header image';
        imgWrapper.appendChild(img);
        
        const h3 = document.createElement('h3');
        h3.textContent = project.title;

        const p = document.createElement('p');
        p.textContent = project.description;

        const projectLinksDiv = document.createElement('div');
        projectLinksDiv.classList.add('project-links');

        const codeProjectButton = document.createElement('button');
        codeProjectButton.classList.add('project-link');
        const code = document.createElement('a');
        if (project.code.length > 0) {
            codeProjectButton.classList.add('enabled');
            code.href = project.code;
            code.target = '_blank';
            code.rel = 'noopener noreferrer';
        };
        code.textContent = 'CODE';
        codeProjectButton.appendChild(code);

        const linkProjectButton = document.createElement('button');
        linkProjectButton.classList.add('project-link');
        const link = document.createElement('a');
        if (project.link.length > 0) {
            linkProjectButton.classList.add('enabled');
            link.href = project.link;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        };
        link.textContent = 'LINK';
        linkProjectButton.appendChild(link);

        const stackProjectButton = document.createElement('button');
        stackProjectButton.classList.add('project-link');
        if (project.stack.length > 0) {
            stackProjectButton.classList.add('enabled');
        };
        const stack = document.createElement('p');
        stack.textContent = 'STACK';
        stackProjectButton.appendChild(stack);
        stackProjectButton.addEventListener('click', () =>
            displayProjectStack(project)
        );

        projectLinksDiv.appendChild(codeProjectButton);
        projectLinksDiv.appendChild(linkProjectButton);
        projectLinksDiv.appendChild(stackProjectButton);

        projectDiv.appendChild(imgWrapper);
        projectDiv.appendChild(h3);
        projectDiv.appendChild(p);
        projectDiv.appendChild(projectLinksDiv);

        container.appendChild(projectDiv);
    });
}

// const dropdownCurrentOption = document.querySelector('.selected-view');
// const toggleViewDropdown = () => {
//     dropdownContent.classList.toggle('active');
// }

// const selectedViewText = document.querySelector('.selected-view');
// const setSelectedViewText = (text) => {
//     selectedViewText.textContent = text;
// }
// const dropdownContent = document.querySelector('.dropdown-content');
// dropdownCurrentOption.addEventListener('click', () => {
//     toggleViewDropdown();
// });

// const overlay = document.querySelector('.overlay');

// const standardView = document.querySelector('#standard-view');
// standardView.addEventListener('click', () =>{
//     overlay.classList.remove('active');
//     setSelectedViewText(standardView.textContent);
//     toggleViewDropdown();
// });

// const recruitersView = document.querySelector('#recruiters-view');
// recruitersView.addEventListener('click', () =>{
//     overlay.classList.add('active');
//     setSelectedViewText(recruitersView.textContent);
//     toggleViewDropdown();
// });