import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full flex flex-col'>
      <Outlet />
    </div>

  )
}

export default RootLayout