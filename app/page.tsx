import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";

export default function Home({searchParams}:SearchParamProps) {
  const isAdmin = searchParams.admin==='true';
  return (
    <div className="flex h-screen max-h-screen">
     {isAdmin && <PasskeyModal />}
 <section className="remove-scrollbar my-auto container">
  <div className="sub-container max-w-[496px]">
    <Image
    src="/assets/icons/logo-full.svg"
    height={1000}
    width={1000}
    alt="patient"
    className="mb-12 h-10 w-fit" />
    <PatientForm />
    <div className="text-14-regular mt-20 flex justify-center">
      <p className="justify-items-end text-dark-600 xl:text-left">
      © 2024 lifeline
      </p>
      <Link  href="/?admin=true" className="text-green-400">
      Admin
      </Link>
    </div>
  </div>
  </section> 
  <Image
    src="/assets/images/onboarding-img.png"
    height={1000}
    width={1000}
    alt="patient"
    className="side-img h-10 max-w-[50%]" />
  </div>
    
  );
}
