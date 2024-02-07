document.addEventListener('DOMContentLoaded', function() {
    fetchProjects();
});

async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();

        const projectsContainer = document.getElementById('projects');
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <h2>${project['Project Name']}</h2>
                <p>${project.Description}</p>
                <img src="${project['Image URL']}" alt="${project['Project Name']}">
                <a href="${project['Project URL']}" target="_blank">Learn More</a>
            `;
            projectsContainer.appendChild(projectElement);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}
