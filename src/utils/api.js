import request from './request'

const api = {
    // 课程模块
    getActivityDetails: (param) => request.get('/lumenapi/v4/common/class/class_activity_details', param),
    getTeacherInfo: (param) => request.get('lumenapi/v4/common/teacher/teacher_info', param)

}

export default api