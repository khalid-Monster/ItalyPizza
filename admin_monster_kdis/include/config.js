import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deletDoc,
    query,
    where
    } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const firebaseConfig = {
    apiKey: "AIzaSyCRIU1A7daXgrs-5oVSKdibTPwxKg30utc",
    authDomain: "italypizza-f9e6d.firebaseapp.com",
    projectId: "italypizza-f9e6d",
    storageBucket: "italypizza-f9e6d.firebasestorage.app",
    messagingSenderId: "840926731170",
    appId: "1:840926731170:web:d5d7ae179dce0a9c2370fb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

 

const supabaseUrl = "https://qqhciqropekbcrquvsyx.supabase.co";
const supabaseKey = "sb_publishable_mKc8jHrNisqxx_BCP1uKzw_drs98CK0";
const supabase = createClient(supabaseUrl, supabaseKey);

export {
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
  };




  /*
  
    -- 1. السماح بقراءة وعرض الصور (SELECT)
    create policy "ItalyPizza_select_v2"
    on storage.objects for select
    to anon
    using (bucket_id = 'ItalyPizza');

    -- 2. السماح برفع الصور (INSERT)
    create policy "ItalyPizza_insert_v2"
    on storage.objects for insert
    to anon
    with check (bucket_id = 'ItalyPizza');

    -- 3. السماح بتعديل الصور (UPDATE)
    create policy "ItalyPizza_update_v2"
    on storage.objects for update
    to anon
    using (bucket_id = 'ItalyPizza')
    with check (bucket_id = 'ItalyPizza');

    -- 4. السماح بحذف الصور (DELETE)
    create policy "ItalyPizza_delete_v2"
    on storage.objects for delete
    to anon
    using (bucket_id = 'ItalyPizza');
  
  
  */