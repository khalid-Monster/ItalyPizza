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

// data from the feilds;
let errorStyle = document.querySelector(".allerror");
let myError = [];

document.querySelector("#creatSection").addEventListener("submit",async (e) => {

    e.preventDefault();
    errorStyle.innerHTML = "";

    let name = document.querySelector("#name").value.trim();
    const imageFile = document.getElementById("image").files[0];


    if (name === "") {
        myError.push("حقل الصنف فارغ");
    } else if (name.length >= 25) {
        myError.push("حقل الصنف طويل");
    } else if (name.length <= 2) {
        myError.push("حقل الصنف قصير");
    }

    if(myError.length <= 0) {

        try {

            let loding = document.querySelector(".loader-container");
            loding.style.display = "flex";

            // إنشاء اسم مميز للصورة
            const goodName = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${imageFile.goodName}`;

            // رفع الصورة
            const { data, error } = await supabase.storage
                .from("ItalyPizza")
                .upload(fileName, imageFile);

            if (error) throw error;

            // console.log("تم رفع الصورة بنجاح");
            // console.log("مسار الصورة:", data.path);

            // استخراج رابط الصورة
            const { data: imageData } = supabase.storage
                .from("MenuImage")
                .getPublicUrl(data.path);
            //console.log("رابط الصورة:", imageData.publicUrl);

            // ---------------------------------
            await addDoc(collection(db,"sections"),{
                name:name,
                image:imageData.publicUrl
            });

            console.log("done");
            document.querySelector("#creatSection").reset();

            //////////////////////////////
            const doneAdd = document.createElement("div");
            doneAdd.classList.add("goode");
            doneAdd.textContent = "تمت إضافة الصنف بنجاح";
            errorStyle.appendChild(doneAdd);
            //////////////////////////////

            loding.style.display = "none";

        } catch (error) {
            myError.push("عذرا حدث خطاء الرجاء المحاولة مرة اخرى");
        }

    } else {
        
        myError.forEach((er) => {

            const myBug = document.createElement("div");
            myBug.classList.add("error");
            myBug.textContent = er;

            errorStyle.appendChild(myBug);
            //console.log(er);
        });
        
        myError = [];
    }
    
});