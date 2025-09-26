import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const firebaseConfig={
    apiKey: "AIzaSyA3Zqqw6GllUbGHP5EJ7hkHRgEp4ZQnFx4",
    authDomain: "tablessid.firebaseapp.com",
    projectId: "tablessid",
    storageBucket: "tablessid.firebasestorage.app",
    messagingSenderId: "926373798519",
    appId: "1:926373798519:web:c38e9f91205fa769875c72",
    measurementId: "G-EDFK2ZWMJN"
};
  const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
async function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Введите логин и пароль!",
          });
        return;
    }

    try {

        const snapshot = await get(ref(database, 'Authorization'));
        const users = snapshot.val();

        const filteredUsers = Object.values(users).filter(u => u);

        const user = filteredUsers.find(u => u.Login.toLowerCase() === email.toLowerCase() && u.Password === password);

        if (user) {

            const isAdmin = user.ID_Post == "1";


           if(isAdmin){
            window.location.href="glavnaya.html"
           }

        } else {

            console.error('Пользователь не найден или неверный логин/пароль.');
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Неправильный логин или пароль!",
              });
        }
    } catch (error) {

        console.error('Ошибка при получении данных пользователя:', error);
    }
}

document.getElementById('loginbutton').addEventListener('click', loginUser);



  

  
