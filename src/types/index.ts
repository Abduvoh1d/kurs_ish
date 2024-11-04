export interface IGroups {
    id: number,
    name: string,
    teacher: number,
    course_start_time: string,
    day: string
}

export interface IUsers {
    id: number,
    first_name: string,
    last_name: string,
    phone_number: string,
    role: string
}

export interface IUserCreate {
    first_name: string,
    last_name: string,
    phone_number: string,
    role: 'admin' | 'teacher',
    date_of_birth: string,
    gender: 'male' | 'female',
    photo: string
}

export interface IRooms {
    name: string,
    room_capacity: string,
    number_of_desks_and_chairs: string
}