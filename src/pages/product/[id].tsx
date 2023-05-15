
import {useRouter} from 'next/router';

export default function Ad() {

  const {query} = useRouter()

  return (
    <h1>E la vamos nos Product 16337: {JSON.stringify(query)}</h1>
  )
}
