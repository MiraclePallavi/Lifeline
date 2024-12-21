import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Control, useForm } from "react-hook-form"
import { z } from "zod"
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


import { Input } from "@/components/ui/input"
import { FormFieldType } from './forms/PatientForm'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
interface CustomProps{
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

const RenderField = ({field,props}:{field:any ; props:CustomProps})=>{
  const {fieldType,iconSrc,iconAlt,placeholder} = props;
  switch(fieldType){
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
         {iconSrc &&
         <Image
         src = {iconSrc}
         height = {24}
         width = {24}
         alt = {iconAlt || 'icons'}
         className = 'ml-2'
         />
         } 
          <FormControl>
            <Input 
            placeholder={placeholder}
            {...field}
            className='shad-input border-0'
            />
          </FormControl>
        </div>
      )
      case FormFieldType.PHONE_INPUT:
        return(
          <FormControl>
             <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
            
          </FormControl>
        )
      default:
        return null;
  }

}

const CustomFormField = (props:CustomProps) => {
  const {control, fieldType, name,label} = props
  return (
   
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='flex-1'>
            {fieldType !== FormFieldType.CHECKBOX && label &&(
              <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>

        )}
      />
      
  
  )
}

export default CustomFormField
