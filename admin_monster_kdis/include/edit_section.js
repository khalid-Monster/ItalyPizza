import {
    db,
    supabase,
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deletDoc,
    query,
    where
} from "./config.js";

const urlParams = new URLSearchParams(window.location.search);
const myId = urlParams.get('id');

let sectionName = document.querySelector("#name");
let fexdName = "";

// data from the feilds;
let errorStyle = document.querySelector(".allerror");
let myError = [];

async function loadSectionData() {
    if(myId) {

        try {

            const oldSection = doc(db,"sections",myId);
            const docsectionSnap = await getDoc(oldSection);

            if (docsectionSnap.exists()) {
                const data = docsectionSnap.data();   
                sectionName.value = data.name;
                fexdName = data.name;
            }

        } catch (error) {
            myError.push("عذرا حدث خطاء الرجاء المحاولة مرة اخرى");
        }

    } else {

        const myBug = document.createElement("div");
        myBug.classList.add("error");
        myBug.textContent = "لم يتم تحديد قسم لتعديله";
        errorStyle.appendChild(myBug);

        setTimeout(function () {
            window.location.href = "creat_section.html";
        },2000);
        console.log("no");
    }
    
}

loadSectionData();

document.querySelector("#creatSection").addEventListener("submit",async (e) => {

    e.preventDefault();
    errorStyle.innerHTML = "";

    if (sectionName.value === "") {
        myError.push("حقل الصنف فارغ");
    } else if (sectionName.length >= 25) {
        myError.push("حقل الصنف طويل");
    } else if (sectionName.length <= 2) {
        myError.push("حقل الصنف قصير");
    }else if (sectionName.value === fexdName) {
        myError.push("لم تغير اسم الصنف بعد");
    }

    if (myError.length <= 0 ) {

        try {

            let loding = document.querySelector(".loader-container");
            loding.style.display = "flex";

            await updateDoc(doc(db,"sections",myId),{
                name:sectionName.value
            });

            console.log("done");
            document.querySelector("#creatSection").reset();

            //////////////////////////////
            const doneAdd = document.createElement("div");
            doneAdd.classList.add("goode");
            doneAdd.textContent = "تم تعديل الصنف بنجاح";
            errorStyle.appendChild(doneAdd);
            //////////////////////////////

            setTimeout(function () {
                window.location.href = "all_sections.html";
            } , 1500);

            loding.style.display = "none";

        } catch (error) {
            myError.push("عذرا حدث خطاء الرجاء المحاولة مرة اخرى");
        }

    } else {

        myError.forEach(() => {

            const myBug = document.createElement("div");
            myBug.classList.add("error");
            myBug.textContent = "لم يتم تحديد قسم لتعديله";

            errorStyle.appendChild(myBug);

        });
        
        myError = [];
    }
    
});

