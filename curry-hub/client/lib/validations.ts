import { z } from 'zod';

// Basic validation rules
export const ValidationRules = {
  // String validations
  email: z.string().email('Invalid email address'),
  url: z.string().url('Invalid URL'),
  
  // Length validations
  minLength: (min: number) => z.string().min(min, `Minimum ${min} characters required`),
  maxLength: (max: number) => z.string().max(max, `Maximum ${max} characters allowed`),
  lengthRange: (min: number, max: number) =>
    z.string().min(min, `Minimum ${min} characters`).max(max, `Maximum ${max} characters`),
  
  // Number validations
  min: (min: number) => z.number().min(min, `Minimum value is ${min}`),
  max: (max: number) => z.number().max(max, `Maximum value is ${max}`),
  numberRange: (min: number, max: number) =>
    z.number().min(min, `Minimum ${min}`).max(max, `Maximum ${max}`),
  
  // Password validation
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
  
  // Phone validation
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  
  // Required field
  required: z.string().min(1, 'This field is required'),
  
  // Date validation
  date: z.coerce.date(),
  
  // Optional variations
  optionalEmail: z.string().email('Invalid email').or(z.literal('')).optional(),
  optionalUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
} as const;

// Field types for dynamic form generator
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'file'
  | 'phone'
  | 'url';

// Field configuration for dynamic generation
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  
  // Text/Email/Password specific
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  
  // Number specific
  min?: number;
  max?: number;
  step?: number;
  
  // Textarea specific
  rows?: number;
  cols?: number;
  
  // Select/Radio/Checkbox specific
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  
  // File specific
  accept?: string;
  multiple?: boolean;
  
  // Validation
  validation?: z.ZodSchema;
  customValidation?: (value: any) => string | null;
  
  // UI
  className?: string;
  helpText?: string;
  icon?: React.ReactNode;
}

// Form configuration
export interface FormConfig {
  title?: string;
  description?: string;
  fields: FieldConfig[];
  submitButtonText?: string;
  cancelButtonText?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

// Form submission result
export interface FormSubmitResult {
  success: boolean;
  data?: Record<string, any>;
  errors?: Record<string, string>;
  message?: string;
}

// Validation error
export interface ValidationError {
  field: string;
  message: string;
}

// Helper function to get validation schema from field config
export const getValidationSchema = (fields: FieldConfig[]) => {
  const schema: Record<string, z.ZodSchema> = {};
  
  fields.forEach((field) => {
    let fieldSchema: z.ZodSchema = z.any();
    
    if (field.validation) {
      fieldSchema = field.validation;
    } else if (field.type === 'email') {
      fieldSchema = ValidationRules.email;
    } else if (field.type === 'password') {
      fieldSchema = ValidationRules.password;
    } else if (field.type === 'phone') {
      fieldSchema = ValidationRules.phone;
    } else if (field.type === 'url') {
      fieldSchema = ValidationRules.url;
    } else if (field.type === 'number') {
      if (field.min !== undefined && field.max !== undefined) {
        fieldSchema = ValidationRules.numberRange(field.min, field.max);
      } else if (field.min !== undefined) {
        fieldSchema = ValidationRules.min(field.min);
      } else if (field.max !== undefined) {
        fieldSchema = ValidationRules.max(field.max);
      } else {
        fieldSchema = z.number();
      }
    } else if (field.type === 'text' || field.type === 'textarea') {
      if (field.minLength !== undefined && field.maxLength !== undefined) {
        fieldSchema = ValidationRules.lengthRange(field.minLength, field.maxLength);
      } else if (field.minLength !== undefined) {
        fieldSchema = ValidationRules.minLength(field.minLength);
      } else if (field.maxLength !== undefined) {
        fieldSchema = ValidationRules.maxLength(field.maxLength);
      } else {
        fieldSchema = z.string();
      }
    } else if (field.type === 'date') {
      fieldSchema = ValidationRules.date;
    } else if (field.type === 'checkbox') {
      fieldSchema = z.boolean();
    } else if (field.type === 'file') {
      fieldSchema = z.instanceof(File).optional();
    } else {
      fieldSchema = z.string();
    }
    
    if (!field.required && field.type !== 'checkbox') {
      fieldSchema = fieldSchema.optional();
    }
    
    schema[field.name] = fieldSchema;
  });
  
  return z.object(schema);
};

// Common form schemas
export const CommonSchemas = {
  loginSchema: z.object({
    email: ValidationRules.email,
    password: z.string().min(1, 'Password is required'),
  }),
  
  registerSchema: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: ValidationRules.email,
    password: ValidationRules.password,
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
  
  profileSchema: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: ValidationRules.email,
    phone: ValidationRules.phone.optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  }),
  
  contactSchema: z.object({
    name: z.string().min(2, 'Name is required'),
    email: ValidationRules.email,
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
};
