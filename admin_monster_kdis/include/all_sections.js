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

let content = document.querySelector(".content");

async function loadeSections() {
    
    try {

        const querySnapshot = await getDocs(collection(db,"sections"));

        if (querySnapshot.empty) {

            let noSections = document.createElement("div");
            noSections.classList.add("nosections");
            noSections.textContent = "لا توجد اصناف حاليا";
            document.querySelector("body").appendChild(noSections);

        } else {

            querySnapshot.forEach(mysection => {
                //content.innerHTML = "";
                const sectionData = mysection.data();
                const sectionId = mysection.id;
                const sName = sectionData.name;
                const sImage = sectionData.image.split('/').pop().split('?')[0];

                const sectionbody = document.createElement("div");
                sectionbody.classList.add("sectionbody");

                const viewNmae = document.createElement("div");
                viewNmae.classList.add("sectionName");
                viewNmae.textContent = sName;

                const viewIcone = document.createElement("i");
                viewIcone.classList.add("fa","fa-trash");

                const editIcone = document.createElement("i");
                editIcone.classList.add("fa","fa-pencil" , "i2");
                editIcone.style.color = "green";

                viewIcone.addEventListener("click", async () => {
                    try {

                        let loding = document.querySelector(".loader-container");
                        loding.style.display = "flex";

                        const itemQuery = query(collection(db,"items"), where("section_id" , "==" ,sectionId));
                        const itemSnapshot = await getDocs(itemQuery);
                        const deletItemsOne = itemSnapshot.docs.map(async (items) => {
                            await deleteDoc(doc(db,"items",items.id));
                        });
                        await Promise.all(deletItemsOne);

                        const {error : storageaerror } = await supabase.storage.from('MenuImage').remove([sImage]);

                        await deleteDoc(doc(db,"sections",sectionId));
                        sectionbody.remove();

                        if (querySnapshot.empty) {
                            let noSections = document.createElement("div");
                            noSections.classList.add("nosections");
                            noSections.textContent = "لا توجد اصناف حاليا";
                            document.querySelector("body").appendChild(noSections);
                        }

                        loding.style.display = "none";
                        
                    } catch (error) {
                        console.log(sectionId);
                    }
                    
                });

                editIcone.addEventListener("click", () => {
                    window.location.href = `edit_section.html?id=${sectionId}`;
                });

                sectionbody.appendChild(editIcone);
                sectionbody.appendChild(viewIcone);
                sectionbody.appendChild(viewNmae);
                content.appendChild(sectionbody);

            });
        }

    } catch (error) {
        console.log("saad");
    }
}

loadeSections();