import {
    db,
    supabase,
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where
} from "./config.js";

    // data from the feilds;
    document.querySelector("#login").addEventListener("submit",async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const pass = document.querySelector("#pass").value.trim();

        try {

            const userCredential = await signInWithEmailAndPassword(auth,email,pass);
            const user = userCredential.user;

            console.log(user.uid);

            console.log("done");
            document.querySelector("#login").reset();
            window.location.href = "user/home.html";

        } catch (error) {
            console.log("faild");
            console.error(error.code,error.message);
        }
    });