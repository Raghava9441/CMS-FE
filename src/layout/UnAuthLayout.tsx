import { Outlet } from 'react-router-dom'

type Props = {}

function UnAuthLayout({ }: Props) {

  //show loading screen if the user is details are loading
  //use it to show the common ui for all the unauth screens 
  //use to redirect the user to dashboard page if the user is alredy login

  return (
    <Outlet>

    </Outlet>
  )
}

export default UnAuthLayout