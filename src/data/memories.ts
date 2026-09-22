import type { MemoryItem, YearChapterData } from '../types/timeline';

export const MEMORIES_DATA: MemoryItem[] = [
  // ==========================================
  // YEAR 2022: THE BEGINNING
  // ==========================================
  {
    id: 'dha-first-meeting-2022',
    year: 2022,
    date: '2022',
    title: 'The First Meeting (DHA)',
    subtitle: 'Where an introduction at DHA set off our story.',
    description:
      'I met Prachi for the first time at DHA. I was sitting with a friend when a friend introduced us. This was the beginning of a story that I did not know would become such a big part of my life.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2022/Dha 1.png',
    location: 'DHA Grounds',
    quote: "Some beginnings don't look important at first.",
    cardStyle: 'print',
    rotation: -1.5,
    aspectRatio: '16/9',
    featured: true
  },
  {
    id: 'dha-moments-2022',
    year: 2022,
    date: '2022',
    title: 'Moments at DHA',
    subtitle: 'Quiet beginnings before we understood what they would become.',
    description:
      'Conversations and quiet moments near the ground. An early memory that stayed with me for a long time.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2022/Dha 2.png',
    location: 'DHA',
    quote: 'Quiet beginnings in familiar places.',
    cardStyle: 'polaroid',
    rotation: 1.2,
    aspectRatio: '16/9'
  },
  {
    id: 'school-reliance-2022',
    year: 2022,
    date: '2022',
    title: 'KD Reliance Foundation School',
    subtitle: 'Class 10 days, corridors, and board exams.',
    description:
      'Class 10 days at Kokilaben Dhirubhai Ambani Reliance Foundation School. Preparing for board exams while friendships began to quietly take shape.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2022/School 1.png',
    location: 'KDARFS School',
    quote: 'Everyday halls that witnessed the earliest chapters.',
    cardStyle: 'print',
    rotation: -1.0,
    aspectRatio: '16/9'
  },
  {
    id: 'school-grounds-2022',
    year: 2022,
    date: '2022',
    title: 'School Grounds',
    subtitle: 'Everyday moments between classes and corridors.',
    description:
      'Walking across the school grounds after exams and results, stepping forward into Class 11.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2022/School 2.png',
    location: 'School Grounds',
    quote: 'The places we passed through every single day.',
    cardStyle: 'polaroid',
    rotation: 1.8,
    aspectRatio: '16/9'
  },

  // ==========================================
  // YEAR 2023: FINDING OUR WAY BACK
  // ==========================================
  {
    id: 'navratri-21-oct-2023',
    year: 2023,
    date: '21 October 2023',
    title: 'Navratri Night',
    subtitle: 'After a long gap, we met again.',
    description:
      'We met again during Navratri after a long period of silence. This was the first time we took photos together.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2023/21 oct 23.jpg',
    location: 'Navratri Grounds',
    quote: 'After a long gap, we met again.',
    cardStyle: 'polaroid',
    rotation: -2.0,
    aspectRatio: '3/4',
    featured: true
  },
  {
    id: 'navratri-22-oct-2023',
    year: 2023,
    date: '22 October 2023',
    title: 'The Next Evening',
    subtitle: 'Relearning each other, step by step.',
    description:
      'We took another photo together the next day. We started talking again and slowly got to know each other again.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2023/22 oct 23.jpg',
    location: 'Navratri Grounds',
    quote: 'Relearning each other, step by step.',
    cardStyle: 'print',
    rotation: 1.5,
    aspectRatio: '3/4'
  },
  {
    id: 'navratri-motion-2023',
    year: 2023,
    date: 'October 2023',
    title: 'Navratri in Motion',
    subtitle: 'The energy, music, and lights of Garba.',
    description:
      'A short snapshot of Navratri festival night — the atmosphere, music, and moments that made that week unforgettable.',
    category: 'video',
    type: 'video',
    media: '/memories/2023/navratri 1.mp4',
    location: 'Garba Pavilion',
    quote: 'The rhythm and lights of festival nights.',
    cardStyle: 'strip',
    rotation: -1.2,
    aspectRatio: '9/16',
    duration: '00:04'
  },

  // ==========================================
  // YEAR 2024: THE QUIET GAP
  // Note: No synthetic memories are invented for 2024.
  // The year gap is represented naturally in the timeline.
  // ==========================================

  // ==========================================
  // YEAR 2025: FINDING THE CONNECTION AGAIN
  // Chronological Order:
  // 27 April 2025 -> 1 August 2025 -> 27 September 2025 -> 23 November 2025 -> 15 December 2025 -> 30 December 2025
  // ==========================================
  {
    id: 'first-ever-video-call-27-apr-2025',
    year: 2025,
    date: '27 April 2025',
    title: 'First Ever Video Call',
    subtitle: 'For the first time, we saw each other through a screen.',
    description: '27 April 2025 was our first ever Instagram video call.',
    category: 'video',
    type: 'video',
    media: '/memories/2025/27 april 2025 .mp4',
    location: 'Instagram Video Call',
    quote: 'For the first time, we saw each other through a screen.',
    cardStyle: 'strip',
    rotation: -1.2,
    aspectRatio: '9/16',
    duration: '00:15',
    featured: true
  },
  {
    id: 'video-call-1-aug-2025',
    year: 2025,
    date: '1 August 2025',
    title: 'Video Call',
    subtitle: 'Showing photos across the video call.',
    description:
      'Showing photos across the video call. One of those small moments that stayed.',
    category: 'video',
    type: 'video',
    media: '/memories/2025/1 video call.mp4',
    location: 'Video Call',
    quote: 'Finding each other across phone screens again.',
    cardStyle: 'strip',
    rotation: 1.5,
    aspectRatio: '9/16',
    duration: '00:06'
  },
  {
    id: 'navratri-27-sep-2025',
    year: 2025,
    date: '27 September 2025',
    title: 'Navratri 2025',
    subtitle: '"Kuch bhi karke aaja" — meeting in the crowd.',
    description:
      'I told Prachi I couldn\'t come because of exams. She told me: "Kuch bhi karke aaja." Eventually, I went. When she saw me, she became very happy and hugged me.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2025/Navratri 25.jpeg',
    location: 'Navratri Grounds',
    quote: '"Kuch bhi karke aaja."',
    cardStyle: 'polaroid',
    rotation: 2.0,
    aspectRatio: '3/4',
    featured: true
  },
  {
    id: 'video-calls-aksh-23-nov-2025',
    year: 2025,
    date: '23 November 2025',
    title: 'Video Calls',
    subtitle: 'Just another ordinary moment.',
    description:
      'On 23 November 2025, Aksh, Prachi and I were on a video call. She was showing us different outfits and we were checking them.',
    category: 'video',
    type: 'video',
    media: '/memories/2025/video calls with aksh and her.mp4',
    location: 'Video Call with Aksh & Her',
    quote: 'Just another ordinary moment.',
    cardStyle: 'strip',
    rotation: -1.0,
    aspectRatio: '9/16',
    duration: '00:10'
  },
  {
    id: 'baby-filter-15-dec-2025',
    year: 2025,
    date: '15 December 2025',
    title: 'Snapchat Baby Filter',
    subtitle: 'A goofy filter call and shared laughter.',
    description:
      'We were on a Snapchat video call. I used a baby filter. Prachi asked me to take a video and send it. Spontaneous silliness preserved in time.',
    category: 'video',
    type: 'video',
    media: '/memories/2025/baby filter.mp4',
    location: 'Snapchat Video Call',
    quote: 'The unscripted silliness that feels like home.',
    cardStyle: 'strip',
    rotation: 1.2,
    aspectRatio: '9/16',
    duration: '00:15'
  },
  {
    id: 'food-night-30-dec-2025',
    year: 2025,
    date: '30 December 2025',
    title: 'Food Night & Waffles',
    subtitle: 'Food, banter, and late night waffles at Oval Park.',
    description:
      'During the New Year weekend, we met for food. Banter while waiting, followed by waffles at Oval Park.',
    category: 'video',
    type: 'video',
    media: '/memories/2025/food night.mp4',
    location: 'Oval Park',
    quote: 'Ordinary evenings that turn into lasting memories.',
    cardStyle: 'strip',
    rotation: -1.4,
    aspectRatio: '9/16',
    duration: '00:07'
  },
  {
    id: 'laughter-2025',
    year: 2025,
    date: '2025',
    title: 'Unfiltered Laughter',
    subtitle: 'The spontaneous moments you wish you could replay.',
    description:
      'Pure, unforced laughter during a quick call. A small video that captures the lighthearted energy we shared.',
    category: 'video',
    type: 'video',
    media: '/memories/2025/laughter.mp4',
    location: 'Video Call',
    quote: 'The sound of genuine laughter.',
    cardStyle: 'strip',
    rotation: 1.8,
    aspectRatio: '9/16',
    duration: '00:06'
  },

  // ==========================================
  // YEAR 2026: A NEW CHAPTER
  // ==========================================
  {
    id: 'new-year-1-jan-2026',
    year: 2026,
    date: '1 January 2026',
    title: '1st January',
    subtitle: 'Welcoming another year together.',
    description:
      'Photos clicked on the first day of the year. Starting 2026 while holding onto familiar bonds.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2026/1 january.jpeg',
    location: 'New Year Celebration',
    quote: 'Welcoming the new year together.',
    cardStyle: 'polaroid',
    rotation: -1.6,
    aspectRatio: '9/16'
  },
  {
    id: 'makar-sankranti-2026',
    year: 2026,
    date: '14 January 2026',
    title: 'Makar Sankranti',
    subtitle: 'Township reflections and mirror photographs at Oval Park.',
    description:
      'Meeting at the township. Going to the mirrors to take pictures together, capturing quiet reflections.',
    category: 'photo',
    type: 'photo',
    media: '/memories/2026/makar sankranti.jpeg',
    location: 'Oval Park Township',
    quote: 'Standing before the mirrors, capturing quiet reflections.',
    cardStyle: 'print',
    rotation: 1.2,
    aspectRatio: '3/4'
  },
  {
    id: 'hospital-2026',
    year: 2026,
    date: 'July 2026',
    title: 'Hospital Room',
    subtitle: 'When feeling unwell and needing care.',
    description:
      'A quiet memory from a difficult day when health was down and the absence of someone was deeply felt.',
    category: 'general',
    type: 'photo',
    media: '/memories/2026/hospital.jpeg',
    location: 'Hospital Room',
    quote: 'Sometimes one small moment makes you notice everything.',
    cardStyle: 'polaroid',
    rotation: -1.0,
    aspectRatio: '3/4'
  },
  {
    id: 'chat-priority-23-july-part1',
    year: 2026,
    date: '23 July 2026 · 12:40 AM',
    title: 'The Priority Question',
    subtitle: 'Asking for honesty and clarity about where we stand.',
    description:
      'A direct message asking why communication became so distant after college started in Baroda, and expressing how one-sided the friendship began to feel.',
    category: 'chat_screenshot',
    type: 'photo',
    media: '/memories/2026/23 july 26.jpeg',
    location: 'Instagram DM',
    quote: 'Shayad main hi is friendship ko lekar zyada serious tha.',
    cardStyle: 'phone',
    rotation: 1.0,
    aspectRatio: '9/16',
    sender: 'xox.prachi',
    transcript:
      'Prachi, ek baat puchni thi aur is baar please ignore mat kar. Jab tu township mein thi tab tune bola tha ki Baroda aake college start hoga to zyada baat kar payenge. Maine teri baat pe trust kiya aur wait bhi kiya. Ab tu Baroda aa gayi hai, lekin sab pehle jaisa hi hai.\n\nMain maanta hu college busy hota hai. Main bhi college jaata hu, isliye mujhe pata hai ki poora din free nahi rehta. Lekin agar story daalne ka time hai, baaki sabke saath interact karne ka time hai, to mere message ya reel ka ek chhota sa reply dene ka bhi time nahi milta? Bas ye baat samajh nahi aati.\n\nAur honestly agar mujhe tujhse baat karne ke liye Krishna ke through baat karni pade, to usse zyada awkward aur kya hoga. Main aisa karna nahi chahta, isliye pehle tujhe hi directly message kar raha hu.\n\nEk baat ab dheere-dheere samajh aa rahi hai... shayad main kabhi teri priority tha hi nahi. Shayad main hi is friendship ko lekar zyada serious tha.'
  },
  {
    id: 'chat-clarity-23-july-part2',
    year: 2026,
    date: '23 July 2026 · 8:13 AM',
    title: 'Seeking Clarity',
    subtitle: '"Bas ek honest reply de de."',
    description:
      'Asking for a straightforward answer: if life has moved in different directions, having clarity is better than uncertainty.',
    category: 'chat_screenshot',
    type: 'photo',
    media: '/memories/2026/23 july 26 2.jpeg',
    location: 'Instagram DM',
    quote: 'Bas ek honest reply de de... kam se kam clarity to mil jayegi.',
    cardStyle: 'phone',
    rotation: -1.2,
    aspectRatio: '9/16',
    sender: 'xox.prachi',
    transcript:
      'Aur kabhi-kabhi to ye bhi feel hota hai ki tujhe meri yaad sirf tab aati thi jab koi kaam hota tha. Uske baad na message, na reply, na koi effort. Main hi hamesha baat continue karne ki koshish karta raha.\n\nMain ye sab tujhe blame karne ke liye nahi bol raha. Mujhe bas sach jaana hai. Agar tu mujhse baat nahi karna chahti, ya teri life mein meri koi importance nahi hai, to bas ek baar seedha bol de. Bura zarur lagega, lekin kam se kam clarity to mil jayegi.\n\nAur agar is message ka bhi reply nahi aata, to main ye hi samjhunga ki tu mujhse directly baat nahi karna chahti. Phir agar kabhi baat karni padi, to shayad mujhe Krishna ke through hi baat karni padegi, kyunki aur koi option bachta hi nahi.\n\nBas ek honest reply de de. Uske baad main tujhe is topic pe dobara disturb nahi karunga.'
  },
  {
    id: 'chat-reply-23-july-part3',
    year: 2026,
    date: '23 July 2026 · 7:06 PM',
    title: 'The Reply',
    subtitle: '"Main tujhe bhi time dungi."',
    description:
      'Her responses to the messages: "Asia kuch nahi hai", "I know", and "Main tujhe bhi time dungi". A moment of seeking mutual understanding without conflict.',
    category: 'chat_screenshot',
    type: 'photo',
    media: '/memories/2026/23 july 26 3.jpeg',
    location: 'Instagram DM',
    quote: '"Main genuinely samajhna chahta hu, ladai nahi karni."',
    cardStyle: 'phone',
    rotation: 1.5,
    aspectRatio: '9/16',
    sender: 'xox.prachi',
    transcript:
      'xox.prachi: "Asia kuch nahi hai"\nxox.prachi: "I know"\n\nYou (7:06 PM): "Theek hai To phir mujhe samjha de Mujhe aisa feel kyu hua Main genuinely samajhna chahta hu, ladai nahi karni"\n\nxox.prachi: "Asia Kuch hai... Main tujhe bhi time dungi"'
  },
  {
    id: 'unsaid-letter-paragraphs-2026',
    year: 2026,
    date: 'Late July 2026 · 10:04 PM',
    title: 'A Silent Distance',
    subtitle: 'Stepping back to heal — an unsaid private letter.',
    description:
      'A deeply personal message expressing emotional exhaustion, the pain of unreciprocated care, and the painful decision to take a step back from the friendship.',
    category: 'document_screenshot',
    type: 'photo',
    media: '/memories/2026/longp paragraphs.jpeg',
    location: 'Private Notes',
    quote: 'Mujhe kisi se ladna nahi hai... bas thoda door rehna hai aur khud ko sambhalna hai.',
    cardStyle: 'diary',
    rotation: -0.8,
    aspectRatio: '9/16',
    featured: true,
    transcript:
      'Prachi honestly ab mai pura exhaust ho chuka hu har way se. Ab mujhe lagta hai ki mujhe humari friendship se thoda break lena chahiye, jab tak mai khud recover nahi ho jata ya fir mujhe koi aisa friend nahi mil jata jo genuinely meri care kare.\n\nMujhe bas itna chahiye tha ki mai apni feelings kisi aise insaan ke saamne rakh saku jisko actually care ho. Sirf "aur bol aur bol" bol dene se care nahi hoti. Agar tujhe bas meri baatein sunni hain bina actually care kiye, toh mere liye uska koi matlab nahi hai. Best friend hone ka matlab mere liye ye nahi hai ki bas meri baatein sun li aur khatam.\n\nHo sakta hai mujhe tere naye friends pasand na ho, aur shayad maine bohot baar try kiya ki mai tere liye woh sab ban saku jo tu chahti thi. But tu woh nahi ban payi jo mujhe apni best friend se chahiye tha. Isliye sorry agar mai teri life me aake tere liye useless ban gaya ya tujhe kabhi laga ki mai bas ek burden hu.\n\nTera college ka schedule tight ho sakta hai, but mai bhi 3 saal se college me hu, mujhe pata hai kaun kitna busy hota hai aur kaun kitna time nikal sakta hai. Isliye ab tu apni studies pe focus kar, mujhe koi hard feelings nahi hain.\n\nAur agar tujhe lagta hai ki "ye ladka bas attention ke liye beg kar raha hai", toh theek hai, waise hi samajh le. At least shayad tab tujhe samajh aaye ki jab koi insaan genuinely kisi ki attention aur care ke liye beg karta hai aur saamne wala kuch nahi deta, toh andar se kaisa feel hota hai.\n\nMai abhi bas thak gaya hu. Mujhe kisi se ladna nahi hai, kisi ko blame nahi karna hai. Bas thoda door rehna hai aur khud ko sambhalna hai.'
  },

  // ==========================================
  // PRESENT / CURRENT: SEPTEMBER 2026
  // ==========================================
  {
    id: 'where-things-stand-sep-2026',
    year: 'CURRENT',
    date: 'September 2026',
    title: 'Where Things Stand',
    subtitle: 'Some stories don\'t end. They simply become quiet.',
    description:
      'Right now, there are no texts, no messages, and no calls. For a long time, most of the effort to stay connected was coming from my side. I kept trying to contact her, but I realized that every time I did, my expectations started increasing again. I don\'t want to keep increasing those expectations. So, since last month, I stopped trying to contact her. Not because I suddenly stopped caring. Not because I hate her. I simply decided to stop forcing something from my side and let things exist as they naturally are. For now, there is silence. And I am letting the silence be.',
    category: 'present',
    type: 'photo',
    media: '',
    location: 'Present',
    quote: 'Some stories don\'t end. They simply become quiet.',
    transcript:
      'NO TEXTS.\nNO CALLS.\nNO MESSAGES.\n\nSince last month,\nI stopped reaching out.\n\nI didn\'t stop caring.\nI stopped expecting.\n\nSome stories don\'t end.\nThey simply become quiet.'
  }
];

export const CHAPTERS_DATA: YearChapterData[] = [
  {
    year: 2022,
    displayYear: '2022',
    title: 'THE BEGINNING',
    theme: 'Early Connections & First Beginnings',
    description:
      'Where a simple introduction at DHA set off a journey of memories, feelings, and early lessons.',
    memories: MEMORIES_DATA.filter((m) => m.year === 2022)
  },
  {
    year: 2023,
    displayYear: '2023',
    title: 'FINDING OUR WAY BACK',
    theme: 'Navratri, School Grounds & Everyday Routines',
    description:
      'Reconnecting under festival lights, walking the grounds, and sharing ordinary days that stayed.',
    memories: MEMORIES_DATA.filter((m) => m.year === 2023)
  },
  {
    year: 2024,
    displayYear: '2024',
    title: 'THE QUIET GAP',
    theme: 'Transitions & New Directions',
    description:
      'A quiet year with fewer photographs taken as life shifted into diploma studies and paths diverged.',
    memories: MEMORIES_DATA.filter((m) => m.year === 2024)
  },
  {
    year: 2025,
    displayYear: '2025',
    title: 'FINDING THE CONNECTION AGAIN',
    theme: 'Calls, Surprises & Unforgettable Moments',
    description:
      'Late night video calls, the surprise hug in the Navratri crowd, baby filter laughs, and waffles at Oval Park.',
    memories: MEMORIES_DATA.filter((m) => m.year === 2025)
  },
  {
    year: 2026,
    displayYear: '2026',
    title: 'A NEW CHAPTER',
    theme: 'College, Reality & Personal Reflections',
    description:
      'New year beginnings, mirror memories, shifting priorities, and understanding when to step back.',
    memories: MEMORIES_DATA.filter((m) => m.year === 2026)
  }
];
