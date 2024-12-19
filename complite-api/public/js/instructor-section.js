class SectionManager {
    constructor() {
        this.setupEventListeners();
        this.renderSections();
    }

    setupEventListeners() {
        const createSectionBtn = document.getElementById('createSectionBtn');
        const createSectionModal = document.getElementById('createSectionModal');
        const createSectionForm = document.getElementById('createSectionForm');

        createSectionBtn.addEventListener('click', () => {
            createSectionModal.style.display = 'flex';
        });

        createSectionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData();

            formData.append('sectionName', document.getElementById('sectionName').value);
            formData.append('courseName', document.getElementById('courseName').value);
            formData.append('activityName', document.getElementById('activityName').value);
            formData.append('actDueDate', document.getElementById('actDueDate').value);
            formData.append('courseDescription', document.getElementById('courseDescription').value);
            formData.append('sectionCode', this.generateSectionCode());

            fetch("/addsection", {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                credentials: 'include',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Section created succesfully');
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });
    }

    generateSectionCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    renderSections() {
        const tableBody = document.getElementById('sectionsTableBody');
        tableBody.innerHTML = '';

        fetch('/getsection')
            .then(response => response.json())
            .then(response => {
                response.data.forEach(section => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${section.sectionID}</td>
                        <td>${section.sectionCode}</td>
                        <td>${section.courseName}</td>
                        <td>${section.dateTime}</td>
                        <td>
                            <button class="action-btn view-btn" onclick="sectionManager.viewStudents(${section.sectionID})">
                                View Students
                            </button>
                            <button class="action-btn delete-btn" onclick="sectionManager.deleteSection(${section.sectionID})">
                                Delete
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }

    deleteSection(sectionId) {
        const formData = new FormData();

        formData.append('sectionId', sectionId);

        console.log(formData);

        fetch("/deletesection", {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
        this.renderSections();
    }

    viewStudents(sectionId) {
        const studentsModal = document.getElementById('studentsModal');
        const studentsTitle = document.getElementById('sectionStudentsTitle');
        const studentsList = document.getElementById('sectionStudentsList');

        studentsTitle.textContent = `Students Enrolled`;
        studentsList.innerHTML = '';

        const formData = new FormData();

        formData.append('sectionId', sectionId);

        fetch("/liststudent", {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())
            .then(response => {
                response.data.forEach(student => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student.firstName}</td>
                        <td>${student.grades}</td>
                        <td>${student.points}</td>
                        <td>
                            <button class="action-btn delete-btn">Remove</button>
                        </td>
                    `;
                    studentsList.appendChild(row);
                });
            });

        studentsModal.style.display = 'flex';
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
}

// Initialize section manager
const sectionManager = new SectionManager();