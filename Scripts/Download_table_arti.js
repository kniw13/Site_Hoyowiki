import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
const firebaseConfig={
    apiKey: "AIzaSyA3Zqqw6GllUbGHP5EJ7hkHRgEp4ZQnFx4",
    authDomain: "tablessid.firebaseapp.com",
    projectId: "tablessid",
    storageBucket: "tablessid.firebasestorage.app",
    messagingSenderId: "926373798519",
    appId: "1:926373798519:web:c38e9f91205fa769875c72",
    measurementId: "G-EDFK2ZWMJN"
};
const app = initializeApp(firebaseConfig); 
const analytics = getAnalytics (app);
const db = getDatabase(app)
const storage = getStorage(app)
const ArtiRef= ref(db,"Table_Arti")
const ArtiSnapshot = await get(ArtiRef);
const ArtiData=[];
ArtiSnapshot.forEach((childSnapshot) => {
const kartinkaRef= ref(db, `Sborka_arti/${childSnapshot.key}/Kartinka`); 
const nameRef = ref(db, `Sborka_arti/${childSnapshot.key}/Name`);
const effectRef = ref(db, `Sborka_arti/${childSnapshot.key}/Effects`);
const osobenostRef = ref(db, `Sborka_arti/${childSnapshot.key}/Osobenost`);
ArtiData.push({
kartinkaRef,nameRef,effectRef,osobenostRef
});
});
async function createArtiBlock(data) {
    try{
        const ArtiList=document.getElementById('List2');
        const ArtiBlock = document.createElement('tbody');
        createArtiBlock.className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 xl:w-1/3 md:w-1/2";
        ArtiBlock.innerHTML=`
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white kartinkaOne" >
        </th>
        <td class="px-6 py-4 nameOne">   
        </td>      
        <td class="px-6 py-4 effectsOne">   
        </td> 
        </td>     
        <td class="px-6 py-4 osobenostOne">   
        </td> 
        </tr>
`
ArtiList.appendChild(ArtiBlock);
const kartinka1=ArtiBlock.querySelector('.kartinkaOne')
const name1=ArtiBlock.querySelector('.nameOne')
const effect1=ArtiBlock.querySelector('.effectsOne')
const osobenost1=ArtiBlock.querySelector('.osobenostOne')
if(true){
    const kartinkaSnapshot=await get(data.kartinkaRef);
    const nameSnapshot=await get(data.nameRef);
    const effectSnapshot=await get(data.effectRef);
    const osobenostSnapshot=await get(data.osobenostRef);
     const img = document.createElement('img');
        img.src = kartinkaSnapshot.val();
        kartinka1.innerHTML = '';  
        kartinka1.appendChild(img); 
    name1.textContent=nameSnapshot.val()
    effect1.textContent=effectSnapshot.val()
    osobenost1.textContent=osobenostSnapshot.val()
}

    }
   catch(error)
{
 console.error("Error download");
}
}
ArtiData.forEach(createArtiBlock);