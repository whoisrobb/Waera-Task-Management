import React from 'react'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <div className='py-2 px-4 border-b flex items-center justify-between'>
        <div className="w-80">
            <Input
                placeholder='search'
            />
        </div>
        <ModeToggle />
    </div>
  )
}

export default Header