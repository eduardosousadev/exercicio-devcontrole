"use client";

import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  error?: string;
}

export function Input({ type, name, placeholder, register, setValue, watch, error }: InputProps) {
  const value = watch(name);

  const handleClearInput = () => { return setValue(name, "") };

  return (
    <>
      <div className="relative">
        <input
          type={ type }
          placeholder={ placeholder }
          className={`w-full bg-white p-2 rounded-md text-sm md:text-base ${!error && 'mb-4'}`}
          { ...register(name) }
          id={ name }
        />
        {
          value && (
            <IoMdCloseCircle 
              className="absolute top-0.5 right-0.5"
              onClick={ handleClearInput }
            />
          )
        }
      </div>
      { error && <p className="text-red-500 text-xs sm:text-right pr-1">{ error }</p> }
    </>
  )
}