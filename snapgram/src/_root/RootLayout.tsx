import { Outlet } from 'react-router-dom'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/lib/shared/LeftSidebar'
import Bottombar from '@/lib/shared/Bottombar'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

      <Bottombar /> 
    </div>
  )
}

export default RootLayout