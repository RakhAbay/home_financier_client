export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

export interface UserUpdateRequest {
    firstName: string;
    lastName: string;
    email: string;
} 
