import {useRouter} from 'next/router';
import Link from 'next/link'

export default function EditMyAdID() {

    const router = useRouter()
    const myProductDetailsID = router.query.myProductDetailsID
    const editMyAdID = router.query.editMyAdID

    return(
        <>
            <h1>Voce esta editando seu aunicio</h1>
            <Link href={`/myannouncement/${myProductDetailsID}/editMyAds`}></Link>
        </>
        
    )
}