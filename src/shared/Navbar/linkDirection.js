import { useSelector }  from 'react-redux'
import { useParams }    from 'react-router-dom'

export default (text) => {
  const houseParam = useParams().houseId
  const { userId } = useSelector((state) => ({ ...state.auth }))
  return userId ? `/${houseParam}/${text}` : `/${text}`
}
