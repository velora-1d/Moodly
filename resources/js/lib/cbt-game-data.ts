export type Choice = {
  id: string;
  text: string;
  type: 'healthy' | 'unhealthy' | 'neutral';
  feedback: string;
  healthChange: number;
  scoreChange: number;
};

export type Monster = {
  name: string;
  image: string;
  description: string;
  negativeThoughtType: string;
};

export type Level = {
  id: number;
  monster: Monster;
  introDialogue: string;
  playerThought: string;
  choices: Choice[];
  background: string;
};

export const GAME_ASSETS = {
  background: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/fantasy-rpg-landscape-background-mystica-ce53bb6a-20251119104446.jpg",
  monsters: {
    shadow: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/shadowy-monster-representing-negative-th-7ff40395-20251119104446.jpg",
    ice: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/ice-golem-monster-representing-despair-b-17b64d48-20251119104446.jpg",
    fog: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/a-misty-swirling-dark-fog-phantom-monste-783273e9-20251119105126.jpg",
    chain: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/14c392b2-64cd-4001-acf1-c33ca006afc0/generated_images/a-heavy-stone-golem-monster-wrapped-in-h-857e59d2-20251119105126.jpg"
  }
};

export const LEVELS: Level[] = [
  {
    id: 1,
    monster: {
      name: "Bayangan Keputusasaan",
      image: GAME_ASSETS.monsters.shadow,
      description: "Massa asap gelap yang berputar-putar dan membisikkan kata-kata yang mematahkan semangat.",
      negativeThoughtType: "Memperburuk Keadaan (Catastrophizing)"
    },
    introDialogue: "Kamu menemui bayangan gelap yang menghalangi jalanmu. Ia menjulang di atasmu, membuat segalanya tampak mustahil.",
    playerThought: "Aku tidak akan pernah bisa menyelesaikan proyek ini. Semua orang akan menganggapku gagal dan aku akan kehilangan pekerjaanku.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Terima pikiran itu sebagai kebenaran dan menyerah.", type: "unhealthy", feedback: "Bayangan itu membesar. Kamu merasa terkuras. Menyerah memperkuat keyakinan negatif itu.", healthChange: -20, scoreChange: 0 },
      { id: "c2", text: "Katakan pada dirimu: 'Berhenti memikirkannya!' dan coba abaikan.", type: "neutral", feedback: "Bayangan itu berkedip tapi tetap ada. Menekan pikiran seringkali membuatnya kembali lebih kuat nanti.", healthChange: -5, scoreChange: 5 },
      { id: "c3", text: "Tantang pikiran itu: 'Aku pernah menangani proyek sulit sebelumnya. Aku bisa memecahnya menjadi langkah-langkah kecil.'", type: "healthy", feedback: "Bayangan itu menyusut drastis! Menggunakan bukti untuk menantang pikiran negatif melemahkan kekuatannya.", healthChange: 20, scoreChange: 50 }
    ]
  },
  {
    id: 2,
    monster: {
      name: "Golem Es Perfeksionis",
      image: GAME_ASSETS.monsters.ice,
      description: "Makhluk tajam yang terbuat dari es dingin, membekukan kepercayaan dirimu.",
      negativeThoughtType: "Pikiran Hitam-Putih (All-or-Nothing Thinking)"
    },
    introDialogue: "Angin dingin bertiup saat Golem melangkah maju. Ia menuntut kesempurnaan atau tidak sama sekali.",
    playerThought: "Jika aku membuat satu kesalahan dalam ujian ini, aku benar-benar bodoh dan tidak berharga.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Setuju dengan Golem. Kesempurnaan adalah satu-satunya hasil yang dapat diterima.", type: "unhealthy", feedback: "Hawa dingin semakin menusuk. Menetapkan standar mustahil membuatmu cemas dan rentan gagal.", healthChange: -25, scoreChange: 0 },
      { id: "c2", text: "Ingatkan diri: 'Kesalahan adalah bagian dari belajar. Satu kesalahan tidak menentukan harga diriku.'", type: "healthy", feedback: "Es mulai retak dan mencair! Mengakui nuansa abu-abu memungkinkan pertumbuhan dan kasih sayang pada diri sendiri.", healthChange: 25, scoreChange: 60 },
      { id: "c3", text: "Salahkan guru karena membuat ujian terlalu sulit.", type: "neutral", feedback: "Golem tetap berdiri tegak. Menyalahkan orang lain tidak membantumu mengatasi kecemasanmu.", healthChange: -10, scoreChange: 10 }
    ]
  },
  {
    id: 3,
    monster: {
      name: "Kabut Ketidakpastian",
      image: GAME_ASSETS.monsters.fog,
      description: "Kabut tebal yang membingungkan dan menyembunyikan jalan ke depan.",
      negativeThoughtType: "Meramal Nasib Buruk (Fortune Telling)"
    },
    introDialogue: "Kabut tebal mengelilingimu, membuatmu sulit melihat jalan ke depan. Bisikan-bisikan cemas memenuhi udara.",
    playerThought: "Bagaimana jika aku membuat keputusan yang salah? Semuanya akan hancur dan aku tidak akan pernah bahagia.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Hindari membuat keputusan sama sekali dan bersembunyi di dalam kabut.", type: "unhealthy", feedback: "Kabut semakin tebal. Menghindar hanya memperpanjang kecemasan dan membuatmu terjebak.", healthChange: -20, scoreChange: 0 },
      { id: "c2", text: "Coba alihkan perhatian dengan bermain ponsel untuk melupakan masalah.", type: "neutral", feedback: "Kabut tidak pergi. Pengalihan hanya bekerja sementara, masalah tetap menunggu.", healthChange: -5, scoreChange: 5 },
      { id: "c3", text: "Tantang pikiran: 'Aku tak bisa memprediksi masa depan, tapi aku bisa hadapi apa pun yang terjadi. Salah itu wajar.'", type: "healthy", feedback: "Kabut menipis, jalan terlihat kembali! Menerima ketidakpastian mengurangi kekuatannya.", healthChange: 20, scoreChange: 70 }
    ]
  },
  {
    id: 4,
    monster: {
      name: "Raksasa Rantai Penyesalan",
      image: GAME_ASSETS.monsters.chain,
      description: "Raksasa batu yang dililit rantai berat, setiap rantai mewakili kesalahan masa lalu.",
      negativeThoughtType: "Pelabelan Diri (Self-Labeling)"
    },
    introDialogue: "Setiap langkah Raksasa ini mengguncang tanah. Ia menunjukmu dengan tuduhan atas masa lalumu.",
    playerThought: "Aku seharusnya tahu lebih baik dulu. Aku orang jahat karena kesalahan itu.",
    background: GAME_ASSETS.background,
    choices: [
      { id: "c1", text: "Hukum diri sendiri dan percaya bahwa kamu tidak pantas bahagia.", type: "unhealthy", feedback: "Rantai semakin berat. Menyalahkan diri sendiri secara berlebihan melumpuhkanmu dari masa depan.", healthChange: -30, scoreChange: 0 },
      { id: "c2", text: "Berjanji untuk menjadi sempurna mulai sekarang.", type: "neutral", feedback: "Raksasa itu tertawa. Menjanjikan kesempurnaan hanyalah jebakan lain yang akan mengecewakanmu.", healthChange: -10, scoreChange: 10 },
      { id: "c3", text: "Ubah perspektif: 'Aku melakukan yang terbaik saat itu. Aku sudah belajar dan tumbuh dari pengalaman itu.'", type: "healthy", feedback: "Rantai-rantai itu hancur! Memaafkan diri sendiri membebaskanmu dari beban masa lalu.", healthChange: 30, scoreChange: 80 }
    ]
  }
];

export type Avatar = {
  id: string;
  name: string;
  class: 'Ksatria' | 'Penyihir' | 'Penyembuh';
  image: string;
};

export const AVATARS: Avatar[] = [
  { id: 'a1', name: 'Ksatria Ketangguhan', class: 'Ksatria', image: 'Sword' },
  { id: 'a2', name: 'Orang Bijak', class: 'Penyihir', image: 'Sparkles' },
  { id: 'a3', name: 'Penjaga Ketenangan', class: 'Penyembuh', image: 'Heart' },
];