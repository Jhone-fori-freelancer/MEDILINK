import React, { useRef, useState, useEffect, ChangeEvent, FocusEvent, KeyboardEvent, ClipboardEvent } from 'react';

//Componente que saque de internet para no usar librerias
interface Props {
  callback: (code: string) => void;
  reset?: boolean;
  isLoading: boolean;
}

export default function EnterCode({ callback, reset, isLoading }: Props) {
  const [code, setCode] = useState('');

  // Refs to control each digit input element
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Reset all inputs and clear state
  const resetCode = () => {
    inputRefs.forEach(ref => {
      if (ref.current) {
        ref.current.value = '';
      }
    });
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
    setCode('');
  }

  // Call our callback when code = 6 chars
  useEffect(() => {
    if (code.length === 6) {
      if (typeof callback === 'function') callback(code);
      resetCode();
    }
  }, [code]); //eslint-disable-line

  // Listen for external reset toggle
  useEffect(() => {
    resetCode();
  }, [reset]); //eslint-disable-line

  // Handle input
  function handleInput(e: ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    // Update code state with single digit
    const newCode = [...code];
    // Convert lowercase letters to uppercase
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      if (inputRefs[index].current) {
        inputRefs[index].current.value = uc;
      }
    } else {
      newCode[index] = input.value;
    }
    setCode(newCode.join(''));

    input.select();

    if (input.value === '') {
      // If the value is deleted, select previous input, if exists
      if (previousInput && previousInput.current) {
        previousInput.current.focus();
      }
    } else if (nextInput && nextInput.current) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  }

  // Select the contents on focus
  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  // Handle backspace key
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];

    if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') {
      e.preventDefault();
      setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
      if (previousInput && previousInput.current) {
        previousInput.current.focus();
      }
    }
  }

  // Capture pasted characters
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedCode = e.clipboardData.getData('text');
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        if (inputRef.current) {
          inputRef.current.value = pastedCode.charAt(index);
        }
      });
    }
  };

  // Clear button deletes all inputs and selects the first input for entry
  const ClearButton = () => {
    return (
      <button
        onClick={resetCode}
        className="text-2xl absolute right-[-30px] top-3"
      >
        ✖
      </button>
    )
  }

  return (
    <div className="flex gap-2 relative my-6">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          className="text-2xl rounded-xl border-[#C2C2C2] bg-[#F6F7F7] border size-16 flex p-2 text-center"
          key={index}
          type="text"
          maxLength={1}
          onChange={(e) => handleInput(e, index)}
          ref={inputRefs[index]}
          autoFocus={index === 0}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={isLoading}
          placeholder='.'
        />
      ))}
      {
        code.length
          ?
          <ClearButton />
          :
          <></>
      }
    </div>
  );
}