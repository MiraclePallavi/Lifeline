"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
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
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions"
 
export enum FormFieldType{
  INPUT='input',
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELTON = "skelton",
}
 
export function PatientForm() {
  const router = useRouter();
  const [isLoading,setLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone: "",
          },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setLoading(true);
  console.log("submitted");
    try {
      const userData = {
       name: values.name,
        email: values.email,
       phone: values.phone,
     };

      const user = await createUser(userData);

      if (user) {

       router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋🏻</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
     <CustomFormField
     fieldType={FormFieldType.INPUT}
     control={form.control}
     name="name"
     label="Full name"
     placeholder="Pallavi kumari"
     iconSrc="/assets/icons/user.svg"
     iconAlt="user"
      />
       <CustomFormField
     fieldType={FormFieldType.INPUT}
     control={form.control}
     name="email"
     label="Email"
     placeholder="Pallavi@gmail.com"
     iconSrc="/assets/icons/email.svg"
     iconAlt="email"
      />
          <CustomFormField
     fieldType={FormFieldType.PHONE_INPUT}
     control={form.control}
     
     name="phone"
     label="Phone number"
     placeholder="620 755 9251"
     
      />
        <SubmitButton  isLoading={isLoading} >Get started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm


