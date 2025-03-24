
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

export default async function NewAppointment({params:{userId}}:SearchParamProps) {
    const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
     
 <section className="remove-scrollbar my-auto container">
  <div className="sub-container max-w-[860px] flex-1 justify-between">
    <Image
    src="/assets/icons/logo-full.svg"
    height={1000}
    width={1000}
    alt="patient"
    className="mb-12 h-10 w-fit" />
    <AppointmentForm 
    type="create"
    patientId={patient.$id}
    userId={userId}
    />
    
      <p className="copyright mt-10 py-12">
      © 2024 lifeline
      </p>
     

  </div>
  </section> 
  <Image
    src="/assets/images/appointment-img.png"
    height={1000}
    width={1000}
    alt="Appointment"
    className="side-img h-10 max-w-[390px] bg-bottom" />
  </div>
    
  );
}
