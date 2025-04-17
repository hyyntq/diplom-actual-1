

import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React from 'react'

const LayoutCategory = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <div className="flex flex-col container mx-auto px-4">
      <div className="">
        <Breadcrumbs />
      </div>
      <div className="py-15 ">{children}</div>
    </div>
  );
}

export default LayoutCategory