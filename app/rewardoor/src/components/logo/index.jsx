import { Link } from 'react-router-dom'
import logo from '@/images/icon/logo.svg'

export default function Logo () {
  return (
    <Link to='/' className='absolute top-8 left-10'>
      <img src={logo} className='h-10 w-8' />
    </Link>
  )
}
