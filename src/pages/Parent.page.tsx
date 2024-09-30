import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"

type Props = {}

function ParentPage({}: Props) {
  const dispatch = useDispatch<AppDispatch>()


  return (
    <div>ParentPage</div>
  )
}

export default ParentPage