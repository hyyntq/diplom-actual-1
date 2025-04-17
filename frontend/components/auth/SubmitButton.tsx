"use client"

import { SubmitButtonProps } from '@/lib/interface'
import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({text, className}: Readonly<SubmitButtonProps>) => {
  const status = useFormStatus()
  return (
    <button className={className}>
      {!status.pending && text }
    </button>
  )
}

export default SubmitButton