import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/login', {username, password}, );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProfile = async (student_id) => {
    try {
        console.log(student_id);
        const response = await axios.post('http://10.0.2.2:8000/api/profile', student_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getInstructorProfile = async (instructor_id) => {
    try {
        console.log(instructor_id);
        const response = await axios.post('http://10.0.2.2:8000/api/instructorprofile', instructor_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSectionDetails = async (instructorid) => {
    try {
        console.log(instructorid)
        const response = await axios.post('http://10.0.2.2:8000/api/sectionlist', instructorid);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const sendReport = async (account_id, report) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/sendreport', {account_id, report});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addSection = async (instructor_id, course_name, course_description, activityname, sectionname, sectioncode, actduedate) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/addsection', {instructor_id, course_name, course_description, activityname, sectionname, sectioncode, actduedate});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getEnrollSection = async (student_id) => {
    try {
        const response = await axios.post('http://10.0.2.2:8000/api/enrolledsection', student_id);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const enrollToSection = async (sectionCode, student_id) => {
    try {
        console.log(sectionCode);
        const response = await axios.post('http://10.0.2.2:8000/api/enroll', {sectionCode, student_id});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateStudent = async (account_id, username, password) => {
    try {
        console.log(account_id);
        const response = await axios.post('http://10.0.2.2:8000/api/updatestudent', {account_id, username, password});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateInstructor = async (account_id, username, password) => {
    try {
        console.log(account_id);
        const response = await axios.post('http://10.0.2.2:8000/api/updateinstructor', {account_id, username, password});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const unenroll = async (student_id, enrollId) => {
    try {
        console.log(student_id, enrollId);
        const response = await axios.post('http://10.0.2.2:8000/api/unenroll', {student_id, enrollId});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteSection = async (section_id) => {
    try {
        console.log(section_id);
        const response = await axios.post('http://10.0.2.2:8000/api/remove', {section_id});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const pointing = async (student_id, points) => {
    try {
        console.log(student_id);
        const response = await axios.post('http://10.0.2.2:8000/api/record', {student_id, points});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSectionStudents = async (section_id) => {
    try {
        console.log(section_id);
        const response = await axios.post('http://10.0.2.2:8000/api/sectionstudents', {section_id});
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchLesson = async (lessonId) => {
    try {
        
        const response = await axios.get(`http://10.0.2.2:8000/api/lessons/${lessonId}`);
        
        // Add better error handling
        if (!response.data) {
            throw new Error('No data received from server');
        }
        
        return response.data;
    } catch (error) {
        // More detailed error handling
        if (error.response) {
            // Server responded with an error
            throw new Error(`Server error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('No response received from server. Please check your connection.');
        } else {
            // Error in request setup
            throw new Error(`Request error: ${error.message}`);
        }
    }
};

export const getActivities = async () => {
    try {
        const response = await axios.get('http://10.0.2.2:8000/api/activities');
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
};
