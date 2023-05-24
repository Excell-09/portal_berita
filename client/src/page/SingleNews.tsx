import {useParams} from 'react-router-dom'


export default function SingleNews() {
  const {newsId} = useParams()
  return (
    <div>SingleNews : {newsId}</div>
  )
}
