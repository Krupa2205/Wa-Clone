[33mcommit 15964d16969a84738f005ea79610bb0085a11444[m
Author: Krupa22 <krupakaklotar22@gmail.com>
Date:   Wed Nov 20 18:30:31 2024 +0530

    Commit for share

[1mdiff --git a/firebase.jsx b/firebase.jsx[m
[1mdeleted file mode 100644[m
[1mindex fe87079..0000000[m
[1m--- a/firebase.jsx[m
[1m+++ /dev/null[m
[36m@@ -1,26 +0,0 @@[m
[31m-// Import the functions you need from the SDKs you need[m
[31m-import { initializeApp } from "firebase/app";[m
[31m-//auth import ->step2[m
[31m-import { getAuth } from "firebase/auth";[m
[31m-import { getFirestore } from "firebase/firestore";[m
[31m-import { getStorage } from "firebase/storage";[m
[31m-// TODO: Add SDKs for Firebase products that you want to use[m
[31m-// https://firebase.google.com/docs/web/setup#available-libraries[m
[31m-[m
[31m-// Your web app's Firebase configuration[m
[31m-const firebaseConfig = {[m
[31m-  apiKey: "AIzaSyBPdsCDr8zQu8xB5bpgRHXLnJV7Te7mt-E",[m
[31m-  authDomain: "wa-clone-522b8.firebaseapp.com",[m
[31m-  projectId: "wa-clone-522b8",[m
[31m-  storageBucket: "wa-clone-522b8.appspot.com",[m
[31m-  messagingSenderId: "600572719910",[m
[31m-  appId: "1:600572719910:web:f8ef153605426f31d947e7"[m
[31m-};[m
[31m-[m
[31m-// Initialize Firebase[m
[31m-const app = initializeApp(firebaseConfig);[m
[31m-// auth step->2[m
[31m-const auth = getAuth(app);[m
[31m-const db = getFirestore();[m
[31m-const storage = getStorage();[m
[31m-export {auth,db,storage}[m
\ No newline at end of file[m

[33mcommit 2279ae42766b76711b12f0cde627f4bccd8086de[m
Author: Krupa22 <krupakaklotar22@gmail.com>
Date:   Wed Nov 20 18:20:20 2024 +0530

    Code Share commit

[1mdiff --git a/firebase.jsx b/firebase.jsx[m
[1mnew file mode 100644[m
[1mindex 0000000..fe87079[m
[1m--- /dev/null[m
[1m+++ b/firebase.jsx[m
[36m@@ -0,0 +1,26 @@[m
[32m+[m[32m// Import the functions you need from the SDKs you need[m
[32m+[m[32mimport { initializeApp } from "firebase/app";[m
[32m+[m[32m//auth import ->step2[m
[32m+[m[32mimport { getAuth } from "firebase/auth";[m
[32m+[m[32mimport { getFirestore } from "firebase/firestore";[m
[32m+[m[32mimport { getStorage } from "firebase/storage";[m
[32m+[m[32m// TODO: Add SDKs for Firebase products that you want to use[m
[32m+[m[32m// https://firebase.google.com/docs/web/setup#available-libraries[m
[32m+[m
[32m+[m[32m// Your web app's Firebase configuration[m
[32m+[m[32mconst firebaseConfig = {[m
[32m+[m[32m  apiKey: "AIzaSyBPdsCDr8zQu8xB5bpgRHXLnJV7Te7mt-E",[m
[32m+[m[32m  authDomain: "wa-clone-522b8.firebaseapp.com",[m
[32m+[m[32m  projectId: "wa-clone-522b8",[m
[32m+[m[32m  storageBucket: "wa-clone-522b8.appspot.com",[m
[32m+[m[32m  messagingSenderId: "600572719910",[m
[32m+[m[32m  appId: "1:600572719910:web:f8ef153605426f31d947e7"[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32m// Initialize Firebase[m
[32m+[m[32mconst app = initializeApp(firebaseConfig);[m
[32m+[m[32m// auth step->2[m
[32m+[m[32mconst auth = getAuth(app);[m
[32m+[m[32mconst db = getFirestore();[m
[32m+[m[32mconst storage = getStorage();[m
[32m+[m[32mexport {auth,db,storage}[m
\ No newline at end of file[m
