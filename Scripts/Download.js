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
const InfoRef= ref(db,"Table")
const InfoSnapshot = await get(InfoRef);
const InfoData=[];
InfoSnapshot.forEach((childSnapshot) => {
const redkostRef= ref(db, `Table_info/${childSnapshot.key}/1`); 
const dateRef = ref(db, `Table_info/${childSnapshot.key}/2`);
const bannerRef = ref(db, `Table_info/${childSnapshot.key}/3`);
const classRef = ref(db, `Table_info/${childSnapshot.key}/4`);
const typeRef = ref(db, `Table_info/${childSnapshot.key}/5`);
const damageRef = ref(db, `Table_info/${childSnapshot.key}/6`);
const roleRef = ref(db, `Table_info/${childSnapshot.key}/7`);
const fractionRef = ref(db, `Table_info/${childSnapshot.key}/8`);
const rostRef = ref(db, `Table_info/${childSnapshot.key}/9`);
InfoData.push({
redkostRef,dateRef,bannerRef,classRef,typeRef,damageRef,roleRef,fractionRef,rostRef
});
});
async function createInfoBlock(data) {
    try{
        const InfoList=document.getElementById('List');
        const InfoBlock = document.createElement('tbody');
        createInfoBlock.className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 xl:w-1/3 md:w-1/2";
        InfoBlock.innerHTML=`
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white redkostOne" >
        </th>
        <td class="px-6 py-4 dateOne">   
        </td>   
        <td class="px-6 py-4 bannerOne">   
        </td>     
        <td class="px-6 py-4 classOne">   
        </td> 
        </td>     
        <td class="px-6 py-4 typeOne">   
        </td> 
        </td>     
        <td class="px-6 py-4 damageOne">   
        </td> 
        </td>     
        <td class="px-6 py-4 roleOne">   
        </td> 
         </td>     
        <td class="px-6 py-4 fractionOne">   
        </td> 
         </td>     
        <td class="px-6 py-4 rostOne">   
        </td> 
        </tr>
`
InfoList.appendChild(InfoBlock);
const redkost1=InfoBlock.querySelector('.redkostOne')
const date1=InfoBlock.querySelector('.dateOne')
const banner1=InfoBlock.querySelector('.bannerOne')
const class1=InfoBlock.querySelector('.classOne')
const type1=InfoBlock.querySelector('.typeOne')
const damage1=InfoBlock.querySelector('.damageOne')
const role1=InfoBlock.querySelector('.roleOne')
const fraction1=InfoBlock.querySelector('.fractionOne')
const rost1=InfoBlock.querySelector('.rostOne')
if(true){
    const redkostSnapshot=await get(data.redkostRef);
    const dateSnapshot=await get(data.dateRef);
    const bannerSnapshot=await get(data.bannerRef);
    const classSnapshot=await get(data.classRef);
    const typeSnapshot=await get(data.typeRef);
    const damageSnapshot=await get(data.damageRef);
    const roleSnapshot=await get(data.roleRef);
    const fractionSnapshot=await get(data.fractionRef);
    const rostSnapshot=await get(data.rostRef);
    redkost1.textContent=redkostSnapshot.val()
    date1.textContent=dateSnapshot.val()
    banner1.textContent= bannerSnapshot.val()
    class1.textContent=classSnapshot.val()
    type1.textContent=typeSnapshot.val()
    damage1.textContent=damageSnapshot.val() 
    role1.textContent=roleSnapshot.val() 
    fraction1.textContent=fractionSnapshot.val()
    rost1.textContent=rostSnapshot.val()
}

    }
   catch(error)
{
 console.error("Error download");
}
}
InfoData.forEach(createInfoBlock);


