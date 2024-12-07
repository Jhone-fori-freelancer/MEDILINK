'use client'

import clsx from "clsx";
import { IconBackArrow } from "./icons";
import { useRouter } from "next/navigation";

interface Prop {
  className?: string
}

export function BackButton({ className }: Prop) {
  const router = useRouter()

  return (
    <button onClick={router.back} type="button" className={clsx("size-10 absolute top-28 sm:left-2 md:left-4 lg:left-8 xl:left-[146px]", className)}>
      <IconBackArrow />
    </button>
  )
}