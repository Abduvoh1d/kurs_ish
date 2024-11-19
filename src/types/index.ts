export interface IGroups {
    id: number
    name: string
    teacher: number
    course_start_time: string
    day: string
}

export interface IXodim {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    role: "admin" | "teacher" | "student" | "moderator"
    date_of_birth: string
    gender: "male" | "female"
}

export interface IStudent {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    balance: number
    branch: string
    date_of_birth: string
    gender: "male" | "female"
    photo: string
}

export interface IRooms {
    id: number
    name: string
    room_capacity: string
    number_of_desks_and_chairs: string
}
