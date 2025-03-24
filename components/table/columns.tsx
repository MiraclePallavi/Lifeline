"use client"

 
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { StatusBadge } from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import { Appointment } from "@/types/appwrite.types"

 

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({row})=><p className="text-14-medium">{row.index+1}</p>
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({row})=>{
      const appointment = row.original
      return <p className="text-14-medium">{appointment.patient.name}</p>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row})=>(
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status}/>
      </div>

    )
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell:({row})=>(
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    )
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );
    
      return (
        <div className="flex items-center gap-3">
          {doctor ? (
            <>
              <Image
                src={doctor.image}
                alt="doctor"
                width={100}
                height={100}
                className="size-8"
              />
              <p className="whitespace-nowrap">Dr. {doctor.name}</p>
            </>
          ) : (
            <p className="whitespace-nowrap">Doctor info not available</p>
          )}
        </div>
      );
    },
    
  },
  
]
