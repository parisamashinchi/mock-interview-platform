import React from 'react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues } from 'react-hook-form';

interface FormFieldTypes<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: string;
  placeholder: string;
  type?:  'text' | 'email' | 'password' ;
}
const FormField = ({control,label,name, placeholder, type = 'text'}: FormFieldTypes<T> ) => {
  return (
    <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} type={type} />
        </FormControl>
    
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default FormField