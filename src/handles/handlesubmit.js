import { addDoc, collection, query, where, getDocs, orderBy } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { clubeConverter } from "../objetos/clubes"

const handleSubmit = (testdata) => {
    const ref = collection(firestore, "test_data") // Firebase creates this automatically

    let data = {
        testData: testdata
    }

    try {
        addDoc(ref, data)
    } catch (err) {
        console.log(err)
    }
}


async function get_firebase_clubes(){

    

    const q = query(collection(firestore, "CLUBE"), orderBy("clubeNome")).withConverter(clubeConverter);

    const querySnapshot = await getDocs(q);

    var items = [];
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      items.push(doc.data());
      
      
    });

    return items;
}

export default get_firebase_clubes