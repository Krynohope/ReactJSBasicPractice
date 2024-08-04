import { CartItem } from "../redux/cartSlice";

export interface ValidationErrors {
    [key: string]: string;
}

export interface FormData {
    [key: string]: string;
}

export interface Order {
    id?: string;
    status?: string;
    userId: string
    email: string;
    addr: string;
    phone: string;
    receiver: string;
    time: number
    method: string,
    cart: CartItem[]
    total: number;
}

const validationRules: { [key: string]: (value: string, formData?: FormData) => string } = {
    username: (value: string) => {
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        return '';
    },
    email: (value: string) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/
        if (!value) return 'Email is required';
        if (!regex.test(value)) return 'Invalid email';
        return '';
    },
    password: (value: string) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
    },
    confirmPassword: (value: string, formData?: FormData) => {
        if (!value) return 'Confirm Password is required';
        if (formData && value !== formData.password) return 'Confirm password does not match';
        return '';
    },
    fullname: (value: string) => {
        if (!value) return 'Fullname is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        return '';
    },
    phone: (value: string) => {
        const regex = /^0[0-9]{9}$/
        if (!value) return 'Phone is required';
        if (!regex.test(value)) return 'Phonenumber at must be 10 characters';
        return '';
    },
    addr: (value: string) => {
        if (!value) return 'Address is required';
        return '';
    }
};

export const validateField = (fieldName: string, value: string, formData?: FormData): string => {
    const rule = validationRules[fieldName];
    return rule ? rule(value, formData) : '';
};

export const validateForm = (formData: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};
    Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key], formData);
        if (error) {
            errors[key] = error;
        }
    });
    return errors;
};