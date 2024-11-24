enum Gender {
    male = "male",
    female = "female",
}

enum Role {
    admin = "admin",
    teacher = "teacher",
    student = "student",
    moderator = "moderator",
}

export interface Token {
    access: string
    refresh: string
}

export interface IUser {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    role: Role
    date_of_birth: string
    gender: Gender
    photo: string
}

export interface ILogin {
    phone_number: string
    password: string
}

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
    role: Role
    date_of_birth: string
    gender: Gender
    photo: string
}

export interface IStudent {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    balance: number
    branch: string
    date_of_birth: string
    gender: Gender
    photo: string
}

export interface IRooms {
    id: number
    name: string
    room_capacity: string
    number_of_desks_and_chairs: string
}
