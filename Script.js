// এই কোডটি আপনার script.js ফাইলের একদম উপরে যুক্ত করুন
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// আপনার নিজস্ব Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyByqTyOvO8JkS1C8EQUz6R16xHTBNSIQ",
    authDomain: "cybersafe-bd-6a72b.firebaseapp.com",
    projectId: "cybersafe-bd-6a72b",
    storageBucket: "cybersafe-bd-6a72b.appspot.com",
    messagingSenderId: "1026958212236",
    appId: "1:1026958212236:web:6ad47a8ba4f99c9ce48fa9"
};

// Firebase অ্যাপ ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// কুইজের প্রশ্ন এবং সঠিক উত্তর
const quizQuestions = [
    {
        question: "সাইবার বুলিং বলতে কী বোঝায়?",
        options: ["অনলাইনে কাউকে হুমকি দেওয়া", "ইন্টারনেট ব্যবহার করা", "গেম খেলা", "ভিডিও দেখা"],
        answer: "অনলাইনে কাউকে হুমকি দেওয়া",
        name: "q1"
    },
    {
        question: "পাসওয়ার্ড শক্তিশালী করার সবচেয়ে ভালো উপায় কোনটি?",
        options: ["একটি সহজ শব্দ ব্যবহার করা", "আপনার নাম ব্যবহার করা", "সংখ্যা, অক্ষর এবং প্রতীক ব্যবহার করা", "শুধুমাত্র সংখ্যা ব্যবহার করা"],
        answer: "সংখ্যা, অক্ষর এবং প্রতীক ব্যবহার করা",
        name: "q2"
    },
    {
        question: "ফিশিং কী?",
        options: ["অনলাইনে পণ্য কেনা", "আপনার ব্যক্তিগত তথ্য চুরি করার জন্য প্রতারণামূলক কৌশল", "সোশ্যাল মিডিয়ায় বন্ধু খোঁজা", "অনলাইন গেম খেলা"],
        answer: "আপনার ব্যক্তিগত তথ্য চুরি করার জন্য প্রতারণামূলক কৌশল",
        name: "q3"
    },
    {
        question: "অপরিচিত কারো কাছ থেকে আসা লিংকে ক্লিক করা কি নিরাপদ?",
        options: ["হ্যাঁ, সবসময়", "শুধুমাত্র যদি তারা আপনার বন্ধু হতে চায়", "না, এটি বিপজ্জনক হতে পারে", "হ্যাঁ, যদি লিংকটি আকর্ষণীয় হয়"],
        answer: "না, এটি বিপজ্জনক হতে পারে",
        name: "q4"
    },
    {
        question: "ব্যক্তিগত তথ্য (যেমন ঠিকানা, ফোন নম্বর) অনলাইনে শেয়ার করা কি উচিত?",
        options: ["হ্যাঁ, সব ধরনের ওয়েবসাইটে", "না, এটি আপনার নিরাপত্তার জন্য ঝুঁকিপূর্ণ", "শুধুমাত্র আপনার প্রোফাইল ছবিতে", "হ্যাঁ, যদি আপনি জনপ্রিয় হতে চান"],
        answer: "না, এটি আপনার নিরাপত্তার জন্য ঝুঁকিপূর্ণ",
        name: "q5"
    },
    {
        question: "সোশ্যাল মিডিয়ায় কোন ধরনের ছবি পোস্ট করা উচিত নয়?",
        options: ["আপনার পোষা প্রাণীর ছবি", "আপনার ব্যক্তিগত বা সংবেদনশীল ছবি", "আপনার স্কুলের ছবি", "ছুটিতে তোলা ছবি"],
        answer: "আপনার ব্যক্তিগত বা সংবেদনশীল ছবি",
        name: "q6"
    },
    {
        question: "অনলাইন গেমিং-এ অপরিচিতদের সাথে কথা বলা কি নিরাপদ?",
        options: ["হ্যাঁ, যদি তারা একটি ভালো গেমার হয়", "না, কারণ তারা হয়তো ভালো লোক নাও হতে পারে", "হ্যাঁ, যদি আপনি একটি গ্রুপে খেলেন", "শুধুমাত্র যদি তারা আপনার নাম জিজ্ঞাসা করে"],
        answer: "না, কারণ তারা হয়তো ভালো লোক নাও হতে পারে",
        name: "q7"
    },
    {
        question: "ম্যালওয়্যার কী?",
        options: ["একটি কম্পিউটার ভাইরাস যা আপনার ডিভাইসকে ক্ষতিগ্রস্ত করতে পারে", "একটি অনলাইন গেমের নাম", "একটি নতুন ধরণের সফটওয়্যার", "একটি নিরাপদ ওয়েবসাইট"],
        answer: "একটি কম্পিউটার ভাইরাস যা আপনার ডিভাইসকে ক্ষতিগ্রস্ত করতে পারে",
        name: "q8"
    },
    {
        question: "একটি শক্তিশালী পাসওয়ার্ডের উদাহরণ কোনটি?",
        options: ["123456", "password", "H@rvard-2025!", "Studentname"],
        answer: "H@rvard-2025!",
        name: "q9"
    },
    {
        question: "সাইবার নিরাপত্তা কেন গুরুত্বপূর্ণ?",
        options: ["এটি আপনাকে অনলাইনে সুরক্ষিত রাখে", "এটি আপনাকে অনলাইনে বন্ধু তৈরি করতে সাহায্য করে", "এটি আপনাকে ভালো গ্রেড পেতে সাহায্য করে", "এটি আপনাকে বেশি গেম খেলতে দেয়"],
        answer: "এটি আপনাকে অনলাইনে সুরক্ষিত রাখে",
        name: "q10"
    },
    {
        question: "আপনার অনলাইন অ্যাকাউন্ট সুরক্ষিত রাখার জন্য কী করা উচিত?",
        options: ["একই পাসওয়ার্ড সব জায়গায় ব্যবহার করা", "নিয়মিত পাসওয়ার্ড পরিবর্তন করা", "পাসওয়ার্ড কারো সাথে শেয়ার করা", "শুধুমাত্র সহজ পাসওয়ার্ড ব্যবহার করা"],
        answer: "নিয়মিত পাসওয়ার্ড পরিবর্তন করা",
        name: "q11"
    },
    {
        question: "স্পাইওয়্যার কী?",
        options: ["একটি সফটওয়্যার যা আপনার ডিভাইসের তথ্য গোপনে সংগ্রহ করে", "একটি অ্যান্টিভাইরাস প্রোগ্রাম", "একটি অনলাইন চ্যাট অ্যাপ্লিকেশন", "একটি অনলাইন গেমিং প্লাটফর্ম"],
        answer: "একটি সফটওয়্যার যা আপনার ডিভাইসের তথ্য গোপনে সংগ্রহ করে",
        name: "q12"
    },
    {
        question: "অপরিচিতদের সাথে ব্যক্তিগত ছবি শেয়ার করা কি নিরাপদ?",
        options: ["হ্যাঁ, কারণ তারা আপনার বন্ধু হতে পারে", "না, কারণ তারা এই ছবিগুলি অপব্যবহার করতে পারে", "হ্যাঁ, যদি আপনি তাদের বিশ্বাস করেন", "হ্যাঁ, এটি একটি ভালো ধারণা"],
        answer: "না, কারণ তারা এই ছবিগুলি অপব্যবহার করতে পারে",
        name: "q13"
    },
    {
        question: "কীভাবে আপনি একটি ফিশিং ইমেল চিনতে পারবেন?",
        options: ["ইমেইলটি একটি পরিচিত কোম্পানি থেকে আসে", "এটি আপনার ব্যক্তিগত তথ্য চায়", "এতে কোনো ছবি নেই", "এতে একটি বড় ফাইল যুক্ত থাকে"],
        answer: "এটি আপনার ব্যক্তিগত তথ্য চায়",
        name: "q14"
    },
    {
        question: "অনলাইন শপিং করার সময় কী লক্ষ্য রাখা উচিত?",
        options: ["শুধুমাত্র সবচেয়ে সস্তা পণ্য", "শুধুমাত্র পরিচিত ওয়েবসাইট", "ওয়েবসাইটের URL-এ একটি তালা চিহ্ন (HTTPS) আছে কিনা", "কোনো কিছু না"],
        answer: "ওয়েবসাইটের URL-এ একটি তালা চিহ্ন (HTTPS) আছে কিনা",
        name: "q15"
    },
    {
        question: "একটি শক্তিশালী পাসওয়ার্ডের দৈর্ঘ্য সাধারণত কত হওয়া উচিত?",
        options: ["৪-৬ অক্ষর", "৮-১২ অক্ষর", "১৫+ অক্ষর", "কোনো নির্দিষ্ট দৈর্ঘ্য নেই"],
        answer: "১৫+ অক্ষর",
        name: "q16"
    },
    {
        question: "সোশ্যাল মিডিয়ায় আপনার অবস্থান (Location) শেয়ার করা কি নিরাপদ?",
        options: ["হ্যাঁ, সব সময়", "না, এটি আপনার নিরাপত্তার ঝুঁকি বাড়াতে পারে", "শুধুমাত্র পরিবারের সাথে", "হ্যাঁ, যদি আপনি একটি আকর্ষণীয় জায়গায় থাকেন"],
        answer: "না, এটি আপনার নিরাপত্তার ঝুঁকি বাড়াতে পারে",
        name: "q17"
    },
    {
        question: "একটি অনলাইন অ্যাকাউন্টের জন্য দ্বি-স্তর যাচাইকরণ (Two-factor authentication) কেন গুরুত্বপূর্ণ?",
        options: ["এটি আপনাকে দ্রুত লগইন করতে সাহায্য করে", "এটি আপনার পাসওয়ার্ড ছাড়াও একটি অতিরিক্ত নিরাপত্তা স্তর যোগ করে", "এটি আপনাকে আরও বন্ধু পেতে সাহায্য করে", "এটি আপনার অ্যাকাউন্টকে ধীর করে দেয়"],
        answer: "এটি আপনার পাসওয়ার্ড ছাড়াও একটি অতিরিক্ত নিরাপত্তা স্তর যোগ করে",
        name: "q18"
    },
    {
        question: "পাবলিক ওয়াইফাই ব্যবহার করার সময় কী ধরনের ঝুঁকি থাকতে পারে?",
        options: ["এটি আপনার ইন্টারনেট গতি বাড়ায়", "হ্যাকাররা সহজেই আপনার ডেটা চুরি করতে পারে", "এতে কোনো ঝুঁকি নেই", "এটি আপনাকে বিনামূল্যে ইন্টারনেট ব্যবহার করতে দেয়"],
        answer: "হ্যাকাররা সহজেই আপনার ডেটা চুরি করতে পারে",
        name: "q19"
    },
    {
        question: "আপনার ডিভাইসে অ্যান্টিভাইরাস সফটওয়্যার থাকা কেন গুরুত্বপূর্ণ?",
        options: ["এটি আপনাকে ভিডিও দেখতে সাহায্য করে", "এটি আপনার ডিভাইসকে ম্যালওয়্যার থেকে রক্ষা করে", "এটি আপনার ব্যাটারির চার্জ দ্রুত শেষ করে", "এটি আপনার কম্পিউটারের গতি বাড়ায়"],
        answer: "এটি আপনার ডিভাইসকে ম্যালওয়্যার থেকে রক্ষা করে",
        name: "q20"
    },
    {
        question: "একটি ফিশিং ওয়েবসাইটের URL কেমন হতে পারে?",
        options: ["এটি একটি পরিচিত ওয়েবসাইটের মতো দেখতে, কিন্তু বানানে ভুল থাকে", "এটি খুবই সহজ এবং সংক্ষিপ্ত হয়", "এটি সবসময় HTTPS দিয়ে শুরু হয়", "এটিতে কোনো ডোমেইন নাম থাকে না"],
        answer: "এটি একটি পরিচিত ওয়েবসাইটের মতো দেখতে, কিন্তু বানানে ভুল থাকে",
        name: "q21"
    },
    {
        question: "আপনি যদি অনলাইনে কোনো বাজে মন্তব্য দেখেন, তাহলে কী করা উচিত?",
        options: ["পাল্টা বাজে মন্তব্য করা", "এটি রিপোর্ট করা বা ব্লক করা", "এটি উপেক্ষা করা", "মন্তব্যটি আপনার বন্ধুদের সাথে শেয়ার করা"],
        answer: "এটি রিপোর্ট করা বা ব্লক করা",
        name: "q22"
    },
    {
        question: "হ্যাকারেরা আপনার ব্যক্তিগত তথ্য কী কাজে লাগাতে পারে?",
        options: ["তারা আপনার হয়ে গেম খেলতে পারে", "তারা আপনার পরিচয় চুরি করতে পারে বা আপনার অ্যাকাউন্ট হ্যাক করতে পারে", "তারা আপনাকে অনলাইনে সাহায্য করতে পারে", "তারা আপনার জন্য একটি নতুন প্রোফাইল তৈরি করতে পারে"],
        answer: "তারা আপনার পরিচয় চুরি করতে পারে বা আপনার অ্যাকাউন্ট হ্যাক করতে পারে",
        name: "q23"
    },
    {
        question: "আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে নিচের কোনটি সবচেয়ে গুরুত্বপূর্ণ?",
        options: ["প্রতিদিন ইন্টারনেট ব্যবহার করা", "শুধুমাত্র পরিচিত ওয়েবসাইট ব্রাউজ করা", "আপনার ব্যক্তিগত তথ্য সবার সাথে শেয়ার করা", "অপরিচিত উৎস থেকে ফাইল ডাউনলোড করা"],
        answer: "শুধুমাত্র পরিচিত ওয়েবসাইট ব্রাউজ করা",
        name: "q24"
    },
    {
        question: "সফটওয়্যার আপডেট করা কেন গুরুত্বপূর্ণ?",
        options: ["এটি নতুন গেম যুক্ত করে", "এটি সফটওয়্যারের দুর্বলতাগুলো ঠিক করে এবং নিরাপত্তা বাড়ায়", "এটি আপনার কম্পিউটারকে ধীর করে দেয়", "এটি নতুন ইউজার ইন্টারফেস দেয়"],
        answer: "এটি সফটওয়্যারের দুর্বলতাগুলো ঠিক করে এবং নিরাপত্তা বাড়ায়",
        name: "q25"
    }
];

// index.html এর জন্য কোড
if (document.getElementById('startForm')) {
    document.getElementById('startForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const studentId = document.getElementById('studentId').value;
        if (studentId) {
            localStorage.setItem('studentId', studentId);
            window.location.href = 'before-quiz.html';
        } else {
            alert("অনুগ্রহ করে আপনার আইডি দিন। Please enter your ID.");
        }
    });
}

// before-quiz.html এবং after-quiz.html উভয় ফাইলের জন্য কোড
if (document.getElementById('quizForm')) {
    document.getElementById('quizForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let score = 0;
        const form = event.target;
        const quizType = window.location.pathname.includes('before-quiz') ? 'before' : 'after';

        quizQuestions.forEach((q) => {
            const selectedOption = form.elements[q.name].value;
            // এইখানে আমরা সঠিক উত্তরের সাথে মিলিয়ে দেখছি
            if (q.options.indexOf(q.answer) === ['a', 'b', 'c', 'd'].indexOf(selectedOption)) {
                score++;
            }
        });

        const studentId = localStorage.getItem('studentId');
        if (studentId) {
            const docRef = doc(db, 'quiz_results', studentId);
            setDoc(docRef, {
                [quizType + '_score']: score,
                timestamp: new Date()
            }, { merge: true }).then(() => {
                console.log("Score saved successfully!");
                if (quizType === 'before') {
                    window.location.href = 'lesson.html';
                } else {
                    window.location.href = 'result.html';
                }
            }).catch((error) => {
                console.error("Error writing document: ", error);
                alert("An error occurred. Please try again.");
            });
        } else {
            alert("Student ID not found. Please go back to the homepage and enter your ID.");
        }
    });
}

// result.html এর জন্য কোড
if (window.location.pathname.includes('result.html')) {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
        const docRef = doc(db, 'quiz_results', studentId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                // এখানে নামের ভুল সংশোধন করা হয়েছে
                const beforeScore = data.before_score || 0;
                const afterScore = data.after_score || 0;

                document.getElementById('beforeScore').innerText = `Before Quiz Score: ${beforeScore}/25`;
                document.getElementById('afterScore').innerText = `After Quiz Score: ${afterScore}/25`;

                // Chart.js ব্যবহার করে চার্ট তৈরি
                const ctx = document.getElementById('improvementChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Before Quiz', 'After Quiz'],
                        datasets: [{
                            label: 'Student Score',
                            data: [beforeScore, afterScore],
                            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 25
                            }
                        }
                    }
                });
            } else {
                console.log("No data found for this student.");
            }
        }).catch((error) => {
            console.error("Error fetching document: ", error);
        });
    } else {
        window.location.href = 'index.html';
    }
}
