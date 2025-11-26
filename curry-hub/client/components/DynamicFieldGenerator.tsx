import { Controller, Control, FieldValues } from 'react-hook-form';
import { FieldConfig } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface DynamicFieldGeneratorProps {
  field: FieldConfig;
  control: Control<FieldValues>;
  error?: string;
}

export const DynamicFieldGenerator = ({
  field,
  control,
  error,
}: DynamicFieldGeneratorProps) => {
  const renderField = (fieldValue: any, onChange: (value: any) => void) => {
    const commonInputProps = {
      id: field.name,
      placeholder: field.placeholder,
      disabled: field.disabled,
      className: field.className,
    };

    switch (field.type) {
      case 'text':
        return (
          <Input
            {...commonInputProps}
            type="text"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
            minLength={field.minLength}
            maxLength={field.maxLength}
          />
        );

      case 'email':
        return (
          <Input
            {...commonInputProps}
            type="email"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'password':
        return (
          <Input
            {...commonInputProps}
            type="password"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            {...commonInputProps}
            type="number"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.valueAsNumber)}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case 'phone':
        return (
          <Input
            {...commonInputProps}
            type="tel"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="+1234567890"
          />
        );

      case 'url':
        return (
          <Input
            {...commonInputProps}
            type="url"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'date':
        return (
          <Input
            {...commonInputProps}
            type="date"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={field.name}
            placeholder={field.placeholder}
            disabled={field.disabled}
            rows={field.rows || 4}
            cols={field.cols}
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              field.className
            )}
            minLength={field.minLength}
            maxLength={field.maxLength}
          />
        );

      case 'select':
        return (
          <Select value={fieldValue || ''} onValueChange={onChange}>
            <SelectTrigger id={field.name}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2 border rounded-lg p-3">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-${option.value}`}
                  checked={(fieldValue || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(fieldValue || []), option.value]
                      : (fieldValue || []).filter((v: string) => v !== option.value);
                    onChange(newValue);
                  }}
                  disabled={option.disabled}
                />
                <Label
                  htmlFor={`${field.name}-${option.value}`}
                  className="cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={fieldValue || false}
              onCheckedChange={onChange}
              disabled={field.disabled}
            />
            <Label htmlFor={field.name} className="cursor-pointer">
              {field.label}
            </Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup value={fieldValue || ''} onValueChange={onChange}>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.name}-${option.value}`}
                    disabled={option.disabled}
                  />
                  <Label
                    htmlFor={`${field.name}-${option.value}`}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'file':
        return (
          <Input
            {...commonInputProps}
            type="file"
            onChange={(e) => onChange(e.target.files?.[0])}
            accept={field.accept}
            multiple={field.multiple}
          />
        );

      default:
        return (
          <Input
            {...commonInputProps}
            type="text"
            value={fieldValue || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue}
      render={({ field: { value, onChange } }) => (
        <div className="space-y-2">
          {field.type !== 'checkbox' && field.label && (
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
          
          {renderField(value, onChange)}

          {field.helpText && (
            <p className="text-xs text-muted-foreground">{field.helpText}</p>
          )}

          {field.type === 'text' && (field.minLength || field.maxLength) && (
            <p className="text-xs text-muted-foreground">
              {field.minLength && `Min: ${field.minLength} `}
              {field.maxLength && `Max: ${field.maxLength}`}
            </p>
          )}

          {field.type === 'number' && (field.min !== undefined || field.max !== undefined) && (
            <p className="text-xs text-muted-foreground">
              {field.min !== undefined && `Min: ${field.min} `}
              {field.max !== undefined && `Max: ${field.max}`}
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    />
  );
};
