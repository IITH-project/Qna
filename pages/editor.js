import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';


import dynamic from 'next/dynamic';
const Editor =dynamic(()=>import('@/components/editor'),{
  ssr:false
})

export default function editor() {

  return (
    <Editor
		/>
  )
}
