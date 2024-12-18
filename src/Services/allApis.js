import { COMMON_API } from "./commonApi";
import base_url from "./base_url";


// Admin

// add tours api
export const addTours = async (data, header) => {
    return await COMMON_API("POST", `${base_url}/create-tour`, data, header)
}

// get all tour packages api
export const allTours = async (search) => {
    return await COMMON_API("GET", `${base_url}/all-tours?search=${search}`, "", "")
}

// to edit tour packages api
export const editTours = async (id, data, header) => {
    return await COMMON_API("PUT", `${base_url}/edit-tours/${id}`, data, header)
}

// delete-tour packages api
export const deleteTour = async (id, header) => {
    return await COMMON_API("DELETE", `${base_url}/delete-tours/${id}`, {}, header)
}

// get booking details api
export const getBooking = async () => {
    return await COMMON_API("GET", `${base_url}/all-booking`, "", "")
}

// to cancel bookings api
export const cancelBooking = async (id) => {
    console.log(id, "Booking")
    return await COMMON_API("DELETE", `${base_url}/cancel-booking/${id}`, {}, "")
}

// get client details  api
export const getUsers = async () => {
    return await COMMON_API("GET", `${base_url}/allusers`, "", "")
}


// User


// register api
export const userRegister = async (data) => {
    return await COMMON_API("POST", `${base_url}/register`, data, "")
}

// Login api
export const userLogin = async (data) => {
    return await COMMON_API("POST", `${base_url}/login`, data, "")
}

// Tours

// get all tour packages to users api
export const allUserTours = async (header, search) => {
    return await COMMON_API("GET", `${base_url}/all-usertours?search=${search}`, "", header)
}

// home-toursapi
export const homeTours = async (header) => {
    return await COMMON_API("GET", `${base_url}/home-tours`, "", header)
}

// to get single tour api
export const SingleTour = async (tid, header) => {
    return await COMMON_API("GET", `${base_url}/single-tour/${tid}`, "", header)
}

// Reviews

// to add reviews api
export const addReviews = async (tid, data, header) => {
    return await COMMON_API("POST", `${base_url}/add-review/${tid}`, data, header)
}

// to get single tour reviews api
export const getReview = async (tid, header) => {
    return await COMMON_API("GET", `${base_url}/single-tour/${tid}/reviews`, "", header)
}

//  Photos

// Add Photos
export const addPhoto = async (tid, data, header) => {
    return await COMMON_API("POST", `${base_url}/addphoto/${tid}`, data, header)
}

// Booking

export const addBooking = async (data) => {
    return await COMMON_API("POST", `${base_url}/addbooking`, data, "")
}

export const userBookings = async () => {
    return await COMMON_API("GET", `${base_url}/userBooking`, "")
}