"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

export default function TestNextAuthIssue() {
  const hook = useSession()

  console.log(hook)

  return (
    <div>TestNextAuthIssue</div>
  )
}
