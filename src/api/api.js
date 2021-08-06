// import axios from "axios";
//
// const instance = axios.create({
//     withCredentials: true,
//     baseURL: `https://todolist-831f7-default-rtdb.firebaseio.com`,
//     headers: {"API-KEY": "AIzaSyDYqVveT6hQg6Jofcz_TZJ9gQqQrRjGMJk"}
// })
//
// export const taskBoardAPI = {
//     getTaskBoard() {
//         return instance.get().then(response => response.data)
//     }
// }

// export const profileAPI = {
//     getUserProfile(userId) {
//         return instance.get(`profile/` + userId)
//     },
//     getStatus(userId) {
//         return instance.get(`profile/status/` + userId)
//     },
//     updateStatus(status) {
//         return instance.put(`profile/status`, {status: status})
//     },
//     savePhoto(photoFile) {
//         const formData = new FormData()
//         formData.append("image", photoFile)
//         return instance.put(`profile/photo`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//     },
//     saveProfile(profile) {
//         return instance.put(`profile`, profile)
//     }
// }