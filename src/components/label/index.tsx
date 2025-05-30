"use client";

import { RegisterOptions, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";

interface LabelProps {
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  error?: string;
  rules?: RegisterOptions;
  asTextArea?: boolean;
};

export function Label({ label, type, placeholder, name, register, setValue, watch, error, rules, asTextArea }: LabelProps) {
  const value = watch(name);

  const handleClear = () => {
    setValue(name, ""); // zera no RHF também
  };
  
  return (
    <label className="flex flex-col flex-1">
      <p className="text-sm md:text-base transition-colors duration-300 hover:text-blue-500">{ label }</p>
      <div className="relative">
        { asTextArea ? (
          <textarea
            className={`border-2 border-black p-1 rounded w-full text-sm md:text-base h-24 resize-none ${!error && 'mb-4'}`}
            placeholder={ placeholder }
            { ...register(name, rules) }
          ></textarea>
        ) : (
          <input 
            type={ type } 
            placeholder={ placeholder } 
            className={`border-2 border-black p-1 rounded w-full text-sm md:text-base ${!error && 'mb-4'}`}
            { ...register(name,rules) }
            id = { name }
          />
        )}
        {
          value && (
            <IoMdCloseCircle className="absolute top-[2px] right-[2px]" onClick={ handleClear } />
          )
        }
      </div>
      { error && <p className="text-red-500 text-xs sm:text-right pr-1">{ error }</p> }
    </label>
  )
};