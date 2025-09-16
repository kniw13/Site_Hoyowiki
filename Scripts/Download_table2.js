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
const SborkaRef= ref(db,"Table_Sborka")
const SborkaSnapshot = await get(SborkaRef);
const SborkaData=[];
SborkaSnapshot.forEach((childSnapshot) => {
const kartinkaRef= ref(db, `Sborka/${childSnapshot.key}/Kartinka`); 
const nameRef = ref(db, `Sborka/${childSnapshot.key}/Name`);
const redkostRef = ref(db, `Sborka/${childSnapshot.key}/Redkost`);
const effectRef = ref(db, `Sborka/${childSnapshot.key}/Effect`);
const osobenostRef = ref(db, `Sborka/${childSnapshot.key}/Osobenost`);
SborkaData.push({
kartinkaRef,nameRef,redkostRef,effectRef,osobenostRef
});
});
async function createSborkaBlock(data) {
    try{
        const SborkaList=document.getElementById('List1');
        const SborkaBlock = document.createElement('tbody');
        createSborkaBlock.className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 xl:w-1/3 md:w-1/2";
        SborkaBlock.innerHTML=`
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white kartinkaOne" >
        </th>
        <td class="px-6 py-4 nameOne">   
        </td>   
        <td class="px-6 py-4 redkostOne">   
        </td>     
        <td class="px-6 py-4 effectOne">   
        </td> 
        </td>     
        <td class="px-6 py-4 osobenostOne">   
        </td> 
        </tr>
`
SborkaList.appendChild(SborkaBlock);
const kartinka1=SborkaBlock.querySelector('.kartinkaOne')
const name1=SborkaBlock.querySelector('.nameOne')
const redkost1=SborkaBlock.querySelector('.redkostOne')
const effect1=SborkaBlock.querySelector('.effectOne')
const osobenost1=SborkaBlock.querySelector('.osobenostOne')
if(true){
    const kartinkaSnapshot=await get(data.kartinkaRef);
    const nameSnapshot=await get(data.nameRef);
    const redkostSnapshot=await get(data.redkostRef);
    const effectSnapshot=await get(data.effectRef);
    const osobenostSnapshot=await get(data.osobenostRef);
     const img = document.createElement('img');
        img.src = kartinkaSnapshot.val();
        kartinka1.innerHTML = '';  
        kartinka1.appendChild(img); 
    name1.textContent=nameSnapshot.val()
    redkost1.textContent=redkostSnapshot.val()
    effect1.textContent=effectSnapshot.val()
    osobenost1.textContent=osobenostSnapshot.val()
}

    }
   catch(error)
{
 console.error("Error download");
}
}
SborkaData.forEach(createSborkaBlock);