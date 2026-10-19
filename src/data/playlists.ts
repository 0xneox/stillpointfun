import type { RightsStatus } from "./rights";

export interface CuratedPlaylistTrack {
  index: number;
  id?: string; // Reference to CONTENT item if cataloged
  videoId: string;
  rights_status: RightsStatus;
  title: string;
  duration: string;
  speaker: string;
  description?: string;
}

export interface CuratedPlaylist {
  id: string;
  title: string;
  speaker: string;
  subtitle: string;
  description: string;
  playlistId: string;
  youtubeUrl: string;
  traditions: string[];
  tags: string[];
  tracks: CuratedPlaylistTrack[];
}

export const CURATED_PLAYLISTS: CuratedPlaylist[] = [
  {
    id: "alan-watts-discourses",
    title: "Alan Watts: The Collected Discourses & Lectures",
    speaker: "Alan Watts",
    subtitle: "Essential inquiries into Zen, Taoism, ego dissolution, and the cosmic game",
    description:
      "A comprehensive public archive of Alan Watts' seminal talks and radio broadcasts. Exploring Wu Wei (effortless action), the illusion of the separate ego, the Gateless Gate, Carl Jung's archetypes, and the playful dance of reality.",
    playlistId: "PLgzEnqcfCPgJivww8lJBSQMibr7KVCkE8",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLgzEnqcfCPgJivww8lJBSQMibr7KVCkE8",
    traditions: ["Zen Buddhism", "Taoism", "Advaita Vedanta", "Philosophy of Mind"],
    tags: ["alan-watts", "zen", "taoism", "wu-wei", "consciousness", "non-duality", "carl-jung"],
    tracks: [
      {
        index: 1,
        rights_status: "verify",
        videoId: "CqqeSVYc6Vw",
        title: "The Reality Prison - All The Things We Don’t Know",
        duration: "13 min",
        speaker: "Alan Watts",
      },
      {
        index: 2,
        rights_status: "verify",
        videoId: "_h-FswIACKE",
        title: "How to See Through the Game - The Secret to Life",
        duration: "10 min",
        speaker: "Alan Watts",
      },
      {
        index: 3,
        rights_status: "verify",
        videoId: "dYSQ1NF1hvw",
        title: "The Illusion of Money, Time & Ego",
        duration: "10 min",
        speaker: "Alan Watts",
      },
      {
        index: 4,
        rights_status: "verify",
        videoId: "cpYA5bYvxHM",
        title: "Psychedelics & Perception (Lecture - No Music)",
        duration: "4 min",
        speaker: "Alan Watts",
      },
      {
        index: 5,
        id: "watts-joyous-cosmology",
        rights_status: "verify",
        videoId: "AG-gCnHlM6Y",
        title: "The Joyous Cosmology Audiobook",
        duration: "1 hr 7 min",
        speaker: "Alan Watts",
      },
      {
        index: 6,
        rights_status: "verify",
        videoId: "X1U4WzqH3YM",
        title: "Falling In Love & Surrender",
        duration: "5 min",
        speaker: "Alan Watts",
      },
      {
        index: 7,
        id: "watts-the-real-you",
        rights_status: "verify",
        videoId: "mMRrCYPxD0I",
        title: "The Real You",
        duration: "4 min",
        speaker: "Alan Watts",
      },
      {
        index: 8,
        rights_status: "verify",
        videoId: "8aufuwMiKmE",
        title: "A Conversation with Myself - Part 1",
        duration: "7 min",
        speaker: "Alan Watts",
      },
      {
        index: 9,
        rights_status: "verify",
        videoId: "dZ8WeLrtFnY",
        title: "A Conversation with Myself - Part 2",
        duration: "7 min",
        speaker: "Alan Watts",
      },
      {
        index: 10,
        rights_status: "verify",
        videoId: "ioFG999aOCs",
        title: "Willing To Die & Letting Go",
        duration: "9 min",
        speaker: "Alan Watts",
      },
      {
        index: 11,
        rights_status: "verify",
        videoId: "aojDrM82CHk",
        title: "The Iceberg of Quantum Physics Explained",
        duration: "11 min",
        speaker: "Alan Watts",
      },
      {
        index: 12,
        rights_status: "verify",
        videoId: "mD6QGuT0PjQ",
        title: "What Happens After You Die",
        duration: "6 min",
        speaker: "Alan Watts",
      },
      {
        index: 13,
        rights_status: "verify",
        videoId: "G7uigXd4Py8",
        title: "The Nature of Desire",
        duration: "6 min",
        speaker: "Alan Watts",
      },
      {
        index: 14,
        rights_status: "verify",
        videoId: "21RwqnB8GrE",
        title: "Is There a Purpose to Living?",
        duration: "4 min",
        speaker: "Alan Watts",
      },
      {
        index: 15,
        rights_status: "verify",
        videoId: "alRNbesfXXw",
        title: "On The Book of Eli & Inner Vision",
        duration: "11 min",
        speaker: "Alan Watts",
      },
      {
        index: 16,
        rights_status: "verify",
        videoId: "hCOJnIysQ1A",
        title: "What Is It To See?",
        duration: "4 min",
        speaker: "Alan Watts",
      },
      {
        index: 17,
        rights_status: "verify",
        videoId: "I9O03lE8Boc",
        title: "Life Is a Dance of Pattern",
        duration: "8 min",
        speaker: "Alan Watts",
      },
      {
        index: 18,
        rights_status: "verify",
        videoId: "iZ8so-ld-l0",
        title: "The Secret of Life",
        duration: "4 min",
        speaker: "Alan Watts",
      },
      {
        index: 19,
        rights_status: "verify",
        videoId: "Q-tRXsteuRA",
        title: "Don't Try (The Art of Spontaneity)",
        duration: "6 min",
        speaker: "Alan Watts",
      },
      {
        index: 20,
        rights_status: "verify",
        videoId: "QXvoYGrnuv8",
        title: "Playing the Game of Life",
        duration: "6 min",
        speaker: "Alan Watts",
      },
      {
        index: 21,
        id: "watts-on-duality",
        rights_status: "verify",
        videoId: "LuZ1SqXjLmw",
        title: "It's Already Happening - Alan Watts on Duality",
        duration: "10 min",
        speaker: "Alan Watts",
      },
      {
        index: 22,
        id: "watts-backwards-law",
        rights_status: "verify",
        videoId: "O42tZse-P6w",
        title: "The Backwards Law: Stop Trying to Get It",
        duration: "11 min",
        speaker: "Alan Watts",
      },
      {
        index: 23,
        rights_status: "verify",
        videoId: "QdgTcxEKZ3E",
        title: "Most People Will Never See It - On Identity",
        duration: "8 min",
        speaker: "Alan Watts",
      },
      {
        index: 24,
        rights_status: "verify",
        videoId: "5sd0TiExRLs",
        title: "Falling in Love with Existence",
        duration: "8 min",
        speaker: "Alan Watts",
      },
      {
        index: 25,
        rights_status: "verify",
        videoId: "9vuqI2v2IRs",
        title: "Where the 1960s Psychedelic Vision Came From",
        duration: "6 min",
        speaker: "Alan Watts",
      },
      {
        index: 26,
        rights_status: "verify",
        videoId: "jkf27FItwfg",
        title: "The Ultimate Hallucination",
        duration: "9 min",
        speaker: "Alan Watts",
      },
      {
        index: 27,
        rights_status: "verify",
        videoId: "EDqqB8kh_Ek",
        title: "The Meaning Of Life",
        duration: "9 min",
        speaker: "Alan Watts",
      },
      {
        index: 28,
        rights_status: "verify",
        videoId: "e-k7b8Zmh70",
        title: "Follow No One, Trust Yourself",
        duration: "7 min",
        speaker: "Alan Watts",
      },
      {
        index: 29,
        rights_status: "verify",
        videoId: "fcPWU59Luoc",
        title: "You're It: The Hidden Center of the Universe",
        duration: "5 min",
        speaker: "Alan Watts",
      },
      {
        index: 30,
        id: "watts-principle-of-not-forcing",
        rights_status: "verify",
        videoId: "ZzaUGhhnlQ8",
        title: "The Principle Of Not Forcing (Wu Wei)",
        duration: "13 min",
        speaker: "Alan Watts",
      },
      {
        index: 31,
        id: "watts-wisdom-of-the-mountains",
        rights_status: "verify",
        videoId: "pToRQjnugFE",
        title: "Wisdom of the Mountains",
        duration: "1 hr 21 min",
        speaker: "Alan Watts",
      },
      {
        index: 32,
        id: "watts-sense-of-nonsense",
        rights_status: "verify",
        videoId: "rKkPqXRQXls",
        title: "Sense of Nonsense",
        duration: "22 min",
        speaker: "Alan Watts",
      },
      {
        index: 33,
        id: "watts-gateless-gate",
        rights_status: "verify",
        videoId: "N-Mav6EKxOc",
        title: "The Gateless Gate (Zen Koans & Presence)",
        duration: "30 min",
        speaker: "Alan Watts",
      },
      {
        index: 34,
        id: "watts-open-yourself",
        rights_status: "verify",
        videoId: "7tY387GiFvM",
        title: "Open Yourself To This Truth",
        duration: "40 min",
        speaker: "Alan Watts",
      },
      {
        index: 35,
        rights_status: "verify",
        videoId: "PVAPsEO-dEc",
        title: "The Direct Revelation of What You Are",
        duration: "11 min",
        speaker: "Alan Watts",
      },
      {
        index: 36,
        id: "watts-ways-of-liberation",
        rights_status: "verify",
        videoId: "RBGJ8uyAT24",
        title: "Ways of Liberation (Full Lecture)",
        duration: "29 min",
        speaker: "Alan Watts",
      },
      {
        index: 37,
        id: "watts-myth-of-myself",
        rights_status: "verify",
        videoId: "C48hI9Qb2q4",
        title: "The Myth of Myself (Full Lecture)",
        duration: "37 min",
        speaker: "Alan Watts",
      },
      {
        index: 38,
        rights_status: "verify",
        videoId: "hwZwqYc6KOc",
        title: "Finding The Real You",
        duration: "11 min",
        speaker: "Alan Watts",
      },
      {
        index: 39,
        rights_status: "verify",
        videoId: "mpQrrFXKaUQ",
        title: "Trust The Universe & Finding Connection",
        duration: "8 min",
        speaker: "Alan Watts",
      },
      {
        index: 40,
        rights_status: "verify",
        videoId: "wxDGtH-xYH4",
        title: "Life Lessons from the Great Way",
        duration: "11 min",
        speaker: "Alan Watts",
      },
      {
        index: 41,
        rights_status: "verify",
        videoId: "SSAUXLVqwzI",
        title: "The Chinese Farmer Parable",
        duration: "2 min",
        speaker: "Alan Watts",
      },
      {
        index: 42,
        rights_status: "verify",
        videoId: "FxK7IIiEyKI",
        title: "Where Technology Will Take Us",
        duration: "14 min",
        speaker: "Alan Watts",
      },
      {
        index: 43,
        id: "watts-god-pretending",
        rights_status: "verify",
        videoId: "FoN2duPT1gk",
        title: "What If You Are God Pretending to Be Human?",
        duration: "29 min",
        speaker: "Alan Watts",
      },
      {
        index: 44,
        id: "watts-why-nothing",
        rights_status: "verify",
        videoId: "ChL332SHTmo",
        title: "Why Nothing Is the Source of Everything",
        duration: "28 min",
        speaker: "Alan Watts",
      },
      {
        index: 45,
        id: "watts-dont-force-life",
        rights_status: "verify",
        videoId: "e4zySueaX28",
        title: "Don’t Force Life — Wu Wei, Zen Gardens & Solitude",
        duration: "30 min",
        speaker: "Alan Watts",
      },
      {
        index: 46,
        id: "watts-speaking-carl-jung",
        rights_status: "verify",
        videoId: "NNGfJgJz-T4",
        title: "Speaking on Carl Jung: Archetypes & The Unconscious",
        duration: "56 min",
        speaker: "Alan Watts",
      },
    ],
  },
  {
    id: "awakening-consciousness-samadhi",
    title: "Awakening Consciousness: Samadhi, Sages & Inner Worlds",
    speaker: "Ram Dass, Ramana Maharshi, Neem Karoli Baba & AwakenTheWorld",
    subtitle: "A journey through ego dissolution, kundalini, self-discovery, and the pathless path",
    description:
      "A curated contemplative collection bringing together documentary archives and lectures on Neem Karoli Baba, Ram Dass's talks on consciousness, Ramana Maharshi's direct inquiry (JNANI), Carl Jung's self-discovery, the seminal Samadhi documentary trilogy, and the Inner Worlds Outer Worlds series.",
    playlistId: "PLgzEnqcfCPgJFwToRYlcZuH9wZ2_7qPoW",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLgzEnqcfCPgJFwToRYlcZuH9wZ2_7qPoW",
    traditions: [
      "Bhakti & Neem Karoli Baba",
      "Advaita Vedanta",
      "Samadhi & Meditation",
      "Depth Psychology",
    ],
    tags: [
      "samadhi",
      "ram-dass",
      "ramana-maharshi",
      "neem-karoli-baba",
      "carl-jung",
      "inner-worlds",
      "maya",
    ],
    tracks: [
      {
        index: 1,
        id: "neem-karoli-baba-grace",
        rights_status: "verify",
        videoId: "kL9bJe_mnXY",
        title: "Neem Karoli Baba Film | Windfall of Grace",
        duration: "1 hr 30 min",
        speaker: "Windfall Grace / Neem Karoli Baba",
      },
      {
        index: 2,
        rights_status: "verify",
        videoId: "r4GNBw5cu8c",
        title: "Documentary Film on Neem Karoli Baba | Moved by Grace",
        duration: "2 hr 19 min",
        speaker: "Windfall Grace / Neem Karoli Baba",
      },
      {
        index: 3,
        rights_status: "verify",
        videoId: "G-qVpKQ_qeY",
        title: "Carl Jung and the Journey of Self Discovery (Part 1)",
        duration: "9 min",
        speaker: "Carl Gustav Jung",
      },
      {
        index: 4,
        rights_status: "verify",
        videoId: "u4PmR1PkVNo",
        title: "Carl Jung and the Journey of Self Discovery (Part 2)",
        duration: "9 min",
        speaker: "Carl Gustav Jung",
      },
      {
        index: 5,
        rights_status: "verify",
        videoId: "nXpmYx5PobI",
        title: "The Journey of Self Discovery: Uncovering Your True Identity",
        duration: "14 min",
        speaker: "Aperture",
      },
      {
        index: 6,
        id: "samadhi-part-1-maya",
        rights_status: "verify",
        videoId: "Bw9zSMsKcwk",
        title: "Samadhi (Part 1) — Maya, the Illusion of the Self",
        duration: "59 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 7,
        id: "samadhi-part-2-not-what-you-think",
        rights_status: "verify",
        videoId: "AQL6qcGqQ0Y",
        title: "Samadhi (Part 2) — It's Not What You Think",
        duration: "1 hr 10 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 8,
        id: "samadhi-part-3-pathless-path",
        rights_status: "verify",
        videoId: "Vu-Nw_ea9N4",
        title: "Samadhi (Part 3) — The Pathless Path",
        duration: "1 hr 30 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 9,
        id: "ram-dass-miracle-consciousness",
        rights_status: "verify",
        videoId: "LCiB9oMnIbI",
        title: "The Miracle of Consciousness — Full Lecture (1996)",
        duration: "2 hr 41 min",
        speaker: "Ram Dass",
      },
      {
        index: 10,
        id: "ramana-jnani-film",
        rights_status: "verify",
        videoId: "hVYv9ktilQw",
        title: "Sri Ramana Maharshi — JNANI",
        duration: "1 hr 20 min",
        speaker: "Advaita Productions",
      },
      {
        index: 11,
        rights_status: "verify",
        videoId: "aXuTt7c3Jkg",
        title: "Inner Worlds, Outer Worlds (Part 1) — Akasha",
        duration: "31 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 12,
        rights_status: "verify",
        videoId: "ZIMoxXO0XvM",
        title: "Inner Worlds, Outer Worlds (Part 2) — The Spiral",
        duration: "32 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 13,
        rights_status: "verify",
        videoId: "yNEruEsb5T4",
        title: "Inner Worlds, Outer Worlds (Part 3) — The Serpent and the Lotus",
        duration: "26 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 14,
        rights_status: "verify",
        videoId: "qmL4CeTENtw",
        title: "Inner Worlds, Outer Worlds (Part 4) — Beyond Thinking",
        duration: "32 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 15,
        rights_status: "verify",
        videoId: "uUZJea1UnS8",
        title: "Awakening Mind (Part 1) — Know Thyself",
        duration: "1 hr 07 min",
        speaker: "AwakenTheWorld & Lisa Natoli",
      },
      {
        index: 16,
        rights_status: "verify",
        videoId: "Kcp7RkRqG8k",
        title: "Awakening Mind (Part 2) — The Mind Unveiled",
        duration: "3 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 17,
        id: "pranava-om-meditation",
        rights_status: "verify",
        videoId: "K67iR6fKFJA",
        title: "Pranava — Deep Chant and Yantra Meditation (Aum / OM)",
        duration: "24 min",
        speaker: "AwakenTheWorld",
      },
      {
        index: 18,
        rights_status: "verify",
        videoId: "L4_Hnu9aHd8",
        title: "Daniel Schmidt — Reflections on Awakening the World",
        duration: "5 min",
        speaker: "Daniel Schmidt",
      },
      {
        index: 19,
        id: "daniel-schmidt-batgap",
        rights_status: "verify",
        videoId: "NxAINV06U6w",
        title: "Daniel Schmidt on Kundalini, Ego Dissolution & Samadhi",
        duration: "2 hr 19 min",
        speaker: "Buddha at the Gas Pump (BATGAP)",
      },
      {
        index: 20,
        rights_status: "verify",
        videoId: "-nm9bQpLQ5E",
        title: "Invitation to Stillness — Presence & Meditation",
        duration: "2 min",
        speaker: "AwakenTheWorld",
      },
    ],
  },
  {
    "id": "sanatana-dharma-hinduism-english",
    "title": "Sanātana Dharma (Hinduism) in English: Advaita & Vedic Wisdom",
    "speaker": "Swami Dayananda, Adi Shankara, Chinmayananda, Abhinavagupta & Acharyas",
    "subtitle": "Expositions on the Upanishads, Bhagavad Gita, Shankara Bhashyas, and Kashmir Shaivism",
    "description": "A comprehensive spoken audio archive on Sanātana Dharma in the English language. Featuring Swami Dayananda Saraswati on the Upanishads and Bhagavad Gita, the life and works of Adi Shankaracharya, the Mandukya Upanishad, traditional Vedic chanting, and the philosophy of Kashmir Shaivism.",
    "playlistId": "PL3eMcg42CrI638xOhuwoB3C1-T72aGGpD",
    "youtubeUrl": "https://www.youtube.com/playlist?list=PL3eMcg42CrI638xOhuwoB3C1-T72aGGpD",
    "traditions": [
      "Advaita Vedanta",
      "Upanishads",
      "Sanātana Dharma",
      "Kashmir Shaivism",
      "Veda"
    ],
    "tags": [
      "hinduism",
      "vedanta",
      "upanishad",
      "shankara",
      "bhagavad-gita",
      "dayananda",
      "kashmir-shaivism",
      "advaita"
    ],
    "tracks": [
      {
        "index": 1,
        "rights_status": "verify",
        "videoId": "Esku8cflGT0",
        "title": "Sri Swami Dayananda Sarasvati : Le profond voyage de la compassion",
        "duration": "17 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 2,
        "id": "dayananda-intro-upanishad",
        "rights_status": "verify",
        "videoId": "uzNdQ8uKVIQ",
        "title": "Śrī Svāmī Dayānanda Sarasvatī: Introduction to Upanishad",
        "duration": "1 hr, 6 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 3,
        "rights_status": "verify",
        "videoId": "junYqOX6ewI",
        "title": "Swami Dayananda Sarasvati : Satsang",
        "duration": "1 hr, 49 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 4,
        "rights_status": "verify",
        "videoId": "GU6fnZvTJ3Y",
        "title": "Anantanand Rambachan : Consider Forgiveness",
        "duration": "4 min",
        "speaker": "Anantanand Rambachan"
      },
      {
        "index": 5,
        "rights_status": "verify",
        "videoId": "uGOQ5m3A3eQ",
        "title": "Hilarious small clay pot story by Śrī Svāmī Dayānanda Sarasvatī",
        "duration": "34 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 6,
        "rights_status": "verify",
        "videoId": "XIJT5J2WK74",
        "title": "Śrī Svāmī Dayānanda Sarasvatī: How to handle an argument?",
        "duration": "50 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 7,
        "rights_status": "verify",
        "videoId": "vjsNNDFT2jU",
        "title": "Is happiness inherent to the objects of desire? by Svāmī Dayānanda Sarasvatī (1976)",
        "duration": "6 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 8,
        "rights_status": "verify",
        "videoId": "PQdBmgWUGd0",
        "title": "Śrī Svāmī Dayānanda Sarasvatī: Ādi Śaṅkarācārya Bhagavatpāda (788-820)",
        "duration": "53 min",
        "speaker": "Adi Shankaracharya Tradition"
      },
      {
        "index": 9,
        "rights_status": "verify",
        "videoId": "Ie42OpYMY_Y",
        "title": "Svāmī Tattvavidānanda Sarasvatī: Contribution of Ādi Śaṅkarācārya",
        "duration": "23 min",
        "speaker": "Swami Tattvavidananda Saraswati"
      },
      {
        "index": 10,
        "rights_status": "verify",
        "videoId": "ik_HXDpblcQ",
        "title": "Film I H.H. Śri Abhinava Vidyātīrtha Mahāsvāmigal: Quintessence of Vedānta (Eng. Sub)",
        "duration": "5 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 11,
        "rights_status": "verify",
        "videoId": "91S5Q5bO0tA",
        "title": "Swami Dayananda speaks on why one must learn Vedanta",
        "duration": "3 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 12,
        "id": "dayananda-bhagavad-gita-1",
        "rights_status": "verify",
        "videoId": "RrDghAJpjpc",
        "title": "Bhagavad Gita Part 1 by Swami Dayananda Saraswati",
        "duration": "1 hr, 7 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 13,
        "rights_status": "verify",
        "videoId": "OhXCgHRHm2Y",
        "title": "Swami Dayananda Saraswati ji - Action & Reaction (21st Gurukulam Anniversary Talk)",
        "duration": "1 hr, 5 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 14,
        "rights_status": "verify",
        "videoId": "CwL30dZrLZg",
        "title": "#1 - Are we concerned to know who this \"I\" is?",
        "duration": "29 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 15,
        "rights_status": "verify",
        "videoId": "6RY9JGdUwKY",
        "title": "#4 The Image of the Upside-Down Tree",
        "duration": "26 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 16,
        "rights_status": "verify",
        "videoId": "AT9ewOiTDF0",
        "title": "Adhyasa Bhashyam - 1 - By Swami Paramananda Bharati",
        "duration": "1 hr",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 17,
        "rights_status": "verify",
        "videoId": "Zd24g3fWqr8",
        "title": "Adhyasa Bhashyam - 2 - By Swami Paramananda Bharati",
        "duration": "1 hr, 23 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 18,
        "rights_status": "verify",
        "videoId": "D1kqQ39q7O0",
        "title": "Adhyasa Bhashyam - 3 - By Swami Paramananda Bharati",
        "duration": "1 hr, 31 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 19,
        "rights_status": "verify",
        "videoId": "jTHY5DRZtXA",
        "title": "Adhyasa Bhashyam - 4 - By Swami Paramananda Bharati",
        "duration": "1 hr, 44 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 20,
        "rights_status": "verify",
        "videoId": "t6rSy0uqG8w",
        "title": "Adhyasa Bhashyam - 5 - By Swami Paramananda Bharati",
        "duration": "1 hr, 36 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 21,
        "rights_status": "verify",
        "videoId": "JPw7WQ_3Rfs",
        "title": "Adhyasa Bhashyam - 6 - By Swami Paramananda Bharati",
        "duration": "1 hr, 20 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 22,
        "rights_status": "verify",
        "videoId": "Cwdz9IGHUCM",
        "title": "Adhyasa Bhashyam - 7 - By Swami Paramananda Bharati",
        "duration": "1 hr, 28 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 23,
        "rights_status": "verify",
        "videoId": "Cwdz9IGHUCM",
        "title": "Adhyasa Bhashyam - 7 - By Swami Paramananda Bharati",
        "duration": "1 hr, 28 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 24,
        "id": "mandukya-upanishad-essential",
        "rights_status": "verify",
        "videoId": "Awtk2M2u22M",
        "title": "001 Mandukya Upanishad",
        "duration": "1 hr, 25 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 25,
        "rights_status": "verify",
        "videoId": "LGpHozTDL4M",
        "title": "002 Mandukya Upanishad",
        "duration": "1 hr, 41 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 26,
        "rights_status": "verify",
        "videoId": "8DRzkB1WbI8",
        "title": "003 Talk Mandukya Upanishad",
        "duration": "1 hr, 28 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 27,
        "rights_status": "verify",
        "videoId": "8pLOAPyE4rM",
        "title": "004 Talk Mandukya Upanishad",
        "duration": "1 hr, 28 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 28,
        "rights_status": "verify",
        "videoId": "rXrskgToMkw",
        "title": "005 Talk Mandukya Upanishad",
        "duration": "1 hr, 29 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 29,
        "rights_status": "verify",
        "videoId": "QqksDOKYJxc",
        "title": "006 Talk Mandukya Upanishad",
        "duration": "1 hr, 31 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 30,
        "rights_status": "verify",
        "videoId": "xI1B2HLP3_E",
        "title": "007 Talk Mandukya Upanishad",
        "duration": "1 hr, 29 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 31,
        "rights_status": "verify",
        "videoId": "oL9m67-mPtA",
        "title": "008 Talk Mandukya Upanishad",
        "duration": "1 hr, 32 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 32,
        "rights_status": "verify",
        "videoId": "gJs4ywIyvp4",
        "title": "009 Talk Mandukya Upanishad",
        "duration": "1 hr, 32 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 33,
        "rights_status": "verify",
        "videoId": "093AJ4mPWUA",
        "title": "010 Talk Mandukya Upanishad",
        "duration": "1 hr, 29 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 34,
        "rights_status": "verify",
        "videoId": "tCQNj3-YH00",
        "title": "011 Mandukya Upanishad",
        "duration": "1 hr, 29 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 35,
        "rights_status": "verify",
        "videoId": "hgr9aHbDlQE",
        "title": "012 Talk Mandukya Upanishad",
        "duration": "1 hr, 31 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 36,
        "rights_status": "verify",
        "videoId": "kSbxEEvg8Po",
        "title": "014 Mandukya Upanishad",
        "duration": "1 hr, 27 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 37,
        "id": "gurukulam-vedantic-path",
        "rights_status": "verify",
        "videoId": "WHO7kaeUtEY",
        "title": "\"Guru and Disciple\" : Documentary on the Vedantic Path of Self Realization",
        "duration": "56 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 38,
        "rights_status": "verify",
        "videoId": "QnD3DfVJ4JM",
        "title": "Śrī Mani Dravid Śāstrī interviewed about his traditional learning of Śāstra",
        "duration": "32 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 39,
        "rights_status": "verify",
        "videoId": "Z1ZW3BCkkOA",
        "title": "Swami Dayananda: Self-Acceptance",
        "duration": "5 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 40,
        "rights_status": "verify",
        "videoId": "MSR36hh8Wws",
        "title": "Darshan of Tat Wale Baba - A tribute (rare footages plus discourse)",
        "duration": "15 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 41,
        "rights_status": "verify",
        "videoId": "7FNDth7fajY",
        "title": "Life and work of Pujya Swami Dayananda Saraswati",
        "duration": "13 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 42,
        "rights_status": "verify",
        "videoId": "U7e0QbyGa4w",
        "title": "Early Years of Swami Tapovan Maharaj (1889-1957)",
        "duration": "7 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 43,
        "rights_status": "verify",
        "videoId": "zfdMqL7EyuY",
        "title": "Gurukulam (2016) Trailer",
        "duration": "2 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 44,
        "rights_status": "verify",
        "videoId": "D-tWecVxm1o",
        "title": "Swami Chinmayananda meeting Ramana Maharshi",
        "duration": "7 min",
        "speaker": "Swami Chinmayananda"
      },
      {
        "index": 45,
        "id": "chinmayananda-un-address",
        "rights_status": "verify",
        "videoId": "WUAQ5nmvrnU",
        "title": "Excerpt of \"Planet in crisis\" : Swami Chinmayananda speaks at United Nations (1992)",
        "duration": "10 min",
        "speaker": "Swami Chinmayananda"
      },
      {
        "index": 46,
        "rights_status": "verify",
        "videoId": "P-f7jdq4fys",
        "title": "Swami Sivananda: Self-analysis",
        "duration": "7 min",
        "speaker": "Swami Sivananda"
      },
      {
        "index": 47,
        "rights_status": "verify",
        "videoId": "vyJsZvZ4uiA",
        "title": "Vedic Chanting Demonstration - Dr Sastry Memorial Lecture",
        "duration": "1 hr, 30 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 48,
        "rights_status": "verify",
        "videoId": "kEa_Wmy_Ac0",
        "title": "Ammaji - Swamini Pramananda",
        "duration": "6 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 49,
        "rights_status": "verify",
        "videoId": "qPcasmn0cRU",
        "title": "The Tradition of Vedic Chanting",
        "duration": "4 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 50,
        "rights_status": "verify",
        "videoId": "ag2N5KAWm4Q",
        "title": "Swami Ramdas, Mother Krishnabai, Sw Satchidananda World Tour",
        "duration": "57 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 51,
        "rights_status": "verify",
        "videoId": "ltXaLlAkoDQ",
        "title": "Ma Anandamayi talks at Suktal in 1961 (English subtitles).",
        "duration": "20 min",
        "speaker": "Sri Anandamayi Ma"
      },
      {
        "index": 52,
        "rights_status": "verify",
        "videoId": "7b-G9jhuqP0",
        "title": "Himalayas: The Spiritual Hub",
        "duration": "12 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 53,
        "rights_status": "verify",
        "videoId": "1OOxm0KCFRw",
        "title": "The Jagadguru Shankaracharya of Sringeri (Full Film)",
        "duration": "1 hr, 23 min",
        "speaker": "Adi Shankaracharya Tradition"
      },
      {
        "index": 54,
        "id": "adi-shankaracharya-kalady",
        "rights_status": "verify",
        "videoId": "HaYfoghV-n8",
        "title": "Kalady: The Triumph of Faith Over Time (Rediscovery of Sri Adi Shankaracharya's Birth Place)",
        "duration": "1 hr, 21 min",
        "speaker": "Adi Shankaracharya Tradition"
      },
      {
        "index": 55,
        "rights_status": "verify",
        "videoId": "JuAAL150Khs",
        "title": "Swami Dayananda ji & Paramarthananda ji on Sringeri Jagadguru",
        "duration": "10 min",
        "speaker": "Swami Dayananda Saraswati"
      },
      {
        "index": 56,
        "rights_status": "verify",
        "videoId": "ajnitE3uWDU",
        "title": "Sannidhanam narrates Moral Story on Which among our Fingers is the Greatest (Hindi)",
        "duration": "12 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 57,
        "rights_status": "verify",
        "videoId": "MHpEeDBgAXI",
        "title": "Śṛṅgeri Jagadguru conferring the 1st Adi Śaṅkarācārya award to Śrī Svāmī Dayānanda (26th April 2012)",
        "duration": "5 min",
        "speaker": "Adi Shankaracharya Tradition"
      },
      {
        "index": 58,
        "rights_status": "verify",
        "videoId": "TS6GoZckDs8",
        "title": "Short biography of H.H. Śrī Abhinava Vidyātīrtha Mahāsvāmigal",
        "duration": "4 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 59,
        "rights_status": "verify",
        "videoId": "R9pemPIBhLE",
        "title": "Advaita: Non-Dual Spirituality - from Ancient India to our Global Age",
        "duration": "1 hr, 12 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 60,
        "rights_status": "verify",
        "videoId": "hVYv9ktilQw",
        "title": "Sri Ramana Maharshi - JNANI",
        "duration": "1 hr, 20 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 61,
        "id": "sadhana-panchakam-forty-steps",
        "rights_status": "verify",
        "videoId": "NtTO7nI_vFc",
        "title": "Life's Spiritual Journey in Forty Steps - Sadhana Panchakam",
        "duration": "20 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 62,
        "rights_status": "verify",
        "videoId": "Zb1mLzRL3wc",
        "title": "Reincarnation: WHO is it that Travels? Atma? Jiva? Subtle body?",
        "duration": "28 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 63,
        "rights_status": "verify",
        "videoId": "5CfAY8tGEmQ",
        "title": "Symbolism in the Bhagavad Gita: Battlefield & Chariot",
        "duration": "26 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 64,
        "rights_status": "verify",
        "videoId": "peCdOBRQLKI",
        "title": "Jist of ShantiMantras in English by Mahamahopadhyaya Dr.K.G.Subraya Sharmaji",
        "duration": "58 min",
        "speaker": "Dr. K.G. Subraya Sharmaji"
      },
      {
        "index": 65,
        "rights_status": "verify",
        "videoId": "Sm6maQCOYTY",
        "title": "BHAGAVATPAADA SHANKARACHARYA, In English ಭಗವತ್ಪಾದ ಶಂಕರಾಚಾರ್ಯMahamahopadhyaya Dr.K.G.SUBRAYASHARMAJI",
        "duration": "54 min",
        "speaker": "Adi Shankaracharya Tradition"
      },
      {
        "index": 66,
        "rights_status": "verify",
        "videoId": "wGGlAbNu-gw",
        "title": "GFO2020: Śaṅkarācārya: The Visionary by Prof. Rukmani T.S.",
        "duration": "31 min",
        "speaker": "Adi Shankaracharya Tradition"
      },
      {
        "index": 67,
        "rights_status": "verify",
        "videoId": "Ilycpat6Vt8",
        "title": "Gurukulam (FULL MOVIE)",
        "duration": "1 hr, 49 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 68,
        "rights_status": "verify",
        "videoId": "yotJNn-5OBM",
        "title": "VANDE LOKAGURUM / EPISODE 01",
        "duration": "18 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 69,
        "rights_status": "verify",
        "videoId": "0sN8mNiK8Yc",
        "title": "VANDE LOKAGURUM / EPISODE 02",
        "duration": "19 min",
        "speaker": "Traditional Acharya"
      },
      {
        "index": 70,
        "rights_status": "verify",
        "videoId": "mhzP-y2t-y8",
        "title": "GFO2021: The Logic of Advaita Vedanta by Swami Ishwarananda",
        "duration": "1 hr, 2 min",
        "speaker": "Swami Ishwarananda"
      },
      {
        "index": 71,
        "id": "abhinavagupta-kashmir-shaivism",
        "rights_status": "verify",
        "videoId": "vATdYXIBSnc",
        "title": "A Documentary film on \"Acharya Abhinavagupta: The Light of Kashmir Shaivism\"",
        "duration": "46 min",
        "speaker": "Acharya Abhinavagupta Archive"
      }
    ]
  },
  {
    "id": "advaita-ramana-nochur",
    "title": "Advaita Vedanta: Ramana Maharshi, Nochur & Direct Realization",
    "speaker": "Sri Ramana Maharshi, Pujyashri Nochur Venkataraman, Nisargadatta & Masters",
    "subtitle": "Direct inquiries into the Self, dialogues in Arunachala, and classical non-duality",
    "description": "An audio archive dedicated to Advaita Vedanta and the direct path of Self-knowledge. Featuring the teachings of Bhagavan Sri Ramana Maharshi, Pujyashri Nochur Venkataraman's Dialogues in Arunachala, Sri Nisargadatta Maharaj, Adi Shankaracharya, J. Krishnamurti, and Swami Sarvapriyananda.",
    "playlistId": "PLgzEnqcfCPgKRRnD4C8mxIAGHLcQaGBp2",
    "youtubeUrl": "https://www.youtube.com/playlist?list=PLgzEnqcfCPgKRRnD4C8mxIAGHLcQaGBp2",
    "traditions": [
      "Advaita Vedanta",
      "Self-Inquiry (Vichara)",
      "Arunachala Satsang",
      "Jnana Yoga",
      "Non-Duality"
    ],
    "tags": [
      "advaita",
      "ramana-maharshi",
      "nochur-venkataraman",
      "nisargadatta",
      "arunachala",
      "self-inquiry",
      "non-duality",
      "vedanta"
    ],
    "tracks": [
      {
        "index": 1,
        "id": "nisargadatta-destruction-false",
        "rights_status": "verify",
        "videoId": "ErcEYmAGpQA",
        "title": "Nisargadatta ~ Destruction of the False ~ Advaita - Non-Duality",
        "duration": "27 min",
        "speaker": "Sri Nisargadatta Maharaj"
      },
      {
        "index": 2,
        "rights_status": "verify",
        "videoId": "jDtzpkffu7E",
        "title": "Padmasambhava ~ 𝐅𝐫𝐞𝐞𝐝𝐨𝐦 𝐟𝐫𝐨𝐦 𝐋𝐚𝐛𝐞𝐥𝐥𝐢𝐧𝐠 ~ Dzogchen",
        "duration": "17 min",
        "speaker": "Padmasambhava"
      },
      {
        "index": 3,
        "id": "ramana-self-liberation",
        "rights_status": "verify",
        "videoId": "Lij5LFHfUJY",
        "title": "Ramana Maharshi ~ Teachings on Self-Liberation ~ (No Music)",
        "duration": "58 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 4,
        "rights_status": "verify",
        "videoId": "-1oPl1zeulY",
        "title": "J. Krishnamurti ~ What is Meditation?",
        "duration": "15 min",
        "speaker": "J. Krishnamurti"
      },
      {
        "index": 5,
        "id": "adi-shankara-atma-bodha",
        "rights_status": "verify",
        "videoId": "X2vg4548hPs",
        "title": "Ātma-bodha ~ Self-Knowledge ~ Adi Shankara (Advaita-Vedanta)",
        "duration": "43 min",
        "speaker": "Adi Shankaracharya Tradition"
      },
      {
        "index": 6,
        "rights_status": "verify",
        "videoId": "sT1jeUK4aeA",
        "title": "The Thirty-Seven Things that Bodhisattvas Do ~ Mahayana Buddhism",
        "duration": "33 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 7,
        "rights_status": "verify",
        "videoId": "j-CLuV9dFTg",
        "title": "Paramahansa Yogananda - \"Samadhi\" - Kriya Yoga",
        "duration": "13 min",
        "speaker": "Paramahansa Yogananda"
      },
      {
        "index": 8,
        "rights_status": "verify",
        "videoId": "s6YDe5TzNY8",
        "title": "Kashmir Shaivism ~ Anuttarāṣṭikā by Abhinavagupta ~ Trika Shaivism",
        "duration": "20 min",
        "speaker": "Acharya Abhinavagupta"
      },
      {
        "index": 9,
        "id": "ramana-forty-verses-reality",
        "rights_status": "verify",
        "videoId": "l0GKtZpe_Zg",
        "title": "Ramana Maharshi - Reality in Forty 40 Verses - Supplement - Advaita-Vedanta",
        "duration": "36 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 10,
        "id": "sarvapriyananda-kashmir-shaivism",
        "rights_status": "verify",
        "videoId": "91p0gciQwJ4",
        "title": "Meditation in Kashmir Shaivism - विज्ञान भैरव | Swami Sarvapriyananda",
        "duration": "1 hr, 47 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 11,
        "rights_status": "verify",
        "videoId": "Y3Q0q-qTiQY",
        "title": "Are there two states for a Realised Being? — Dialogue in Arunachala",
        "duration": "4 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 12,
        "rights_status": "verify",
        "videoId": "I-WVucwDS_4",
        "title": "Is everything only a thought? — Dialogue in Arunachala",
        "duration": "23 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 13,
        "rights_status": "verify",
        "videoId": "r9D-dF4pYNU",
        "title": "Is not a loving family-like atmosphere needed for Spiritual Life? — Dialogue in Arunachala",
        "duration": "28 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 14,
        "rights_status": "verify",
        "videoId": "F5KObMOGbvc",
        "title": "Sri Lalitha Sahasranaamam: Pujyashri Ramanacharana Tirtha Swamigal at Madipakkam Sri Ayyappan Temple",
        "duration": "1 hr, 2 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 15,
        "rights_status": "verify",
        "videoId": "B9qNwyqYPlA",
        "title": "Not able to maintain inner purity — Dialogue in Arunachala",
        "duration": "16 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 16,
        "rights_status": "verify",
        "videoId": "QJXmpUM7nnA",
        "title": "How will yoga end suffering? — Dialogue in Arunachala",
        "duration": "14 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 17,
        "rights_status": "verify",
        "videoId": "XhSprvuA-UE",
        "title": "Guidance for Women Seekers — Dialogue in Arunachala",
        "duration": "15 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 18,
        "rights_status": "verify",
        "videoId": "l9UvLv4FBSk",
        "title": "ആത്മജ്ഞാനം ഉണ്ടായാൽ എങ്ങിനെ അറിയാം? | പ്രശ്നോത്തരി",
        "duration": "4 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 19,
        "rights_status": "verify",
        "videoId": "_dYbE51MFtE",
        "title": "How to experience 'I am not the body'? — Dialogue in Arunachala",
        "duration": "22 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 20,
        "rights_status": "verify",
        "videoId": "l6hs364QxeE",
        "title": "Brahma-sampatti — Absorption in Brahman — Dialogue in Arunachala",
        "duration": "18 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 21,
        "rights_status": "verify",
        "videoId": "Fgp3B9-f_SQ",
        "title": "Devotee shares a Spontaneous Experience — Dialogue in Arunachala",
        "duration": "19 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 22,
        "rights_status": "verify",
        "videoId": "ElZXsgLk_4I",
        "title": "யோக கீதம் | Bring Yoga Alive in your Life | Tamil | Chennai | 2026",
        "duration": "1 hr, 25 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 23,
        "rights_status": "verify",
        "videoId": "ulgY5FVsZqM",
        "title": "Adi Sankaracharya | Siva Aparadha Kshamapana Stotram | O God, Forgive My Faults & Sins | In English",
        "duration": "11 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 24,
        "rights_status": "verify",
        "videoId": "ZcAq24kJwPs",
        "title": "Many Many Gurus — Dialogue in Arunachala",
        "duration": "32 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 25,
        "rights_status": "verify",
        "videoId": "2RxGyTfTw0k",
        "title": "The Door to Infinity — Dialogue in Arunachala",
        "duration": "12 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 26,
        "rights_status": "verify",
        "videoId": "XJfJ6SaPr00",
        "title": "Ekamevadvitiyam. 🌸",
        "duration": "4 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 27,
        "rights_status": "verify",
        "videoId": "wePNCnxlefc",
        "title": "How to understand the mantra ' īśāvāsyam idam sarvam - All this is filled with God’",
        "duration": "31 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 28,
        "rights_status": "verify",
        "videoId": "-lSM1Dm5jsY",
        "title": "Overwhelmed on the Path... — Dialogue in Arunachala",
        "duration": "40 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 29,
        "rights_status": "verify",
        "videoId": "u3qJr5XuzpU",
        "title": "All about INITIATION & JAPA — Dialogue in Arunachala",
        "duration": "59 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 30,
        "rights_status": "verify",
        "videoId": "7ewOU7fmBpU",
        "title": "The Fragrance of Self-Experience | Ramana Maharshi Shrine | Bengaluru | English | Mar 2025",
        "duration": "1 hr, 18 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 31,
        "rights_status": "verify",
        "videoId": "sVagFCAif5U",
        "title": "(16) Still Mind is the Sacred Temple | Forty Verses on Reality - Supplement | Verse 16 | Eng | 2024",
        "duration": "58 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 32,
        "rights_status": "verify",
        "videoId": "A-wvqTJq4fg",
        "title": "Turiya, \"The Life and Teachings of Ramana Maharshi\" - Full HD Film",
        "duration": "54 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 33,
        "rights_status": "verify",
        "videoId": "YFYKjG6jjZg",
        "title": "A seeker's question about material comforts — Dialogue in Arunachala",
        "duration": "26 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 34,
        "rights_status": "verify",
        "videoId": "1xveeGEKlOY",
        "title": "What Every Seeker Must Understand — Dialogue in Arunachala",
        "duration": "10 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 35,
        "rights_status": "verify",
        "videoId": "6l2C0sbal38",
        "title": "Do others exist because of My Existence? — Dialogue in Arunachala",
        "duration": "22 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 36,
        "rights_status": "verify",
        "videoId": "txRlqIdWnxU",
        "title": "How to invoke Grace? — Dialogue in Arunachala",
        "duration": "35 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 37,
        "rights_status": "verify",
        "videoId": "k_NLFJx2qf4",
        "title": "How to balance our life and spiritual practices — Dialogue in Arunachala",
        "duration": "26 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 38,
        "rights_status": "verify",
        "videoId": "wCo7QozGKWA",
        "title": "Hinduism, Consciousness and Advaita Vedanta - Swami Sarvapriyananda",
        "duration": "1 hr, 55 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 39,
        "rights_status": "verify",
        "videoId": "wXRTCdUid2c",
        "title": "Should I try to remove the veil of ignorance? — Dialogue in Arunachala",
        "duration": "17 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 40,
        "id": "nochur-dialogues-arunachala",
        "rights_status": "verify",
        "videoId": "xiQEdZiXFwk",
        "title": "What to do when someone speaks ill about us? — Dialogue in Arunachala",
        "duration": "15 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 41,
        "rights_status": "verify",
        "videoId": "WSNZn9LyW6g",
        "title": "Do This Daily for Self Realization | Swami Sarvapriyananda’s Practical Guide",
        "duration": "22 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 42,
        "rights_status": "verify",
        "videoId": "PIDWvYaNKDc",
        "title": "Nisargadatta ~ Be Like Space ~ The Final Talks",
        "duration": "26 min",
        "speaker": "Sri Nisargadatta Maharaj"
      },
      {
        "index": 43,
        "rights_status": "verify",
        "videoId": "k7PGkPmIG0A",
        "title": "(18) Heart is the Centre | Forty Verses on Reality - Supplement | Verse 18-19",
        "duration": "1 hr, 2 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 44,
        "rights_status": "verify",
        "videoId": "65oz0evCzpA",
        "title": "What comes first - GRACE Or EFFORT? — Dialogue in Arunachala",
        "duration": "20 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 45,
        "rights_status": "verify",
        "videoId": "FdfBitqP9Lg",
        "title": "Vidya (Knowing) vs Avidya (Not Knowing) — Dialogue in Arunachala w Hindi subtitles | 2025",
        "duration": "16 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 46,
        "rights_status": "verify",
        "videoId": "VxvjS_qUAYw",
        "title": "Atman — Is it the infinite space or a throb? — Dialogue in Arunachala",
        "duration": "9 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 47,
        "rights_status": "verify",
        "videoId": "F3j-hzTho00",
        "title": "Ecstasy — Dialogue in Arunachala",
        "duration": "13 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 48,
        "rights_status": "verify",
        "videoId": "GM8dQJBoRe8",
        "title": "How to meditate",
        "duration": "34 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 49,
        "rights_status": "verify",
        "videoId": "Kg0RSE8m1uY",
        "title": "SRI. RAMANACHARANATIRTHA (NOCHUR) SWAMIGAL",
        "duration": "19 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 50,
        "rights_status": "verify",
        "videoId": "hRTn8SkA4bs",
        "title": "The Problem of Good vs. Bad — Dialogue in Arunachala",
        "duration": "11 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 51,
        "rights_status": "verify",
        "videoId": "l53HhMIhejA",
        "title": "How are Consciousness and Prāṇa related? — Dialogue in Arunachala",
        "duration": "15 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 52,
        "rights_status": "verify",
        "videoId": "QNgicro7z38",
        "title": "Is faith (śraddhā) enough to lead one to the highest? — Dialogue in Arunachala",
        "duration": "6 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 53,
        "rights_status": "verify",
        "videoId": "0KcyngpSfxc",
        "title": "Is 'I'-thought (aham vritti) also spandana (vibration)? — Dialogue in Arunachala",
        "duration": "14 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 54,
        "rights_status": "verify",
        "videoId": "matmwLcwauU",
        "title": "Are the teachings ‘sarvārambha parityāgī’ & ‘chummā iru’ the same? Dialogue in Arunachala | Eng 2024",
        "duration": "12 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 55,
        "rights_status": "verify",
        "videoId": "gNp2MXv0_O8",
        "title": "Why is it so rare for people to wake up / realise? — Dialogue in Arunachala",
        "duration": "4 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 56,
        "rights_status": "verify",
        "videoId": "YMmcPRBkj6A",
        "title": "Not progressing in spiritual path — Dialogue in Arunachala",
        "duration": "3 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 57,
        "rights_status": "verify",
        "videoId": "4o6wRr33PVU",
        "title": "ഞാൻ ശരിയായ വഴിയിലാണോ എന്ന് എങ്ങിനെ അറിയും? | പ്രശ്നോത്തരി",
        "duration": "2 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 58,
        "rights_status": "verify",
        "videoId": "PoPUwR5QQiQ",
        "title": "മനുഷ്യന്റെ ശ്രേഷ്ഠ ജന്മത്തിന് ഗുരു ആവശ്യമല്ലേ ? | പ്രശ്നോത്തരി",
        "duration": "6 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 59,
        "rights_status": "verify",
        "videoId": "qdxBEJ1ejic",
        "title": "ഒരു തീവ്ര മുമുക്ഷുവിന്റെ ചോദ്യം | പ്രശ്നോത്തരി",
        "duration": "4 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 60,
        "rights_status": "verify",
        "videoId": "dWlt7ALD1oA",
        "title": "വഴി കാണിക്കാൻ ആളില്ല | പ്രശ്നോത്തരി",
        "duration": "3 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 61,
        "rights_status": "verify",
        "videoId": "SqfDn-zG7PU",
        "title": "മനസ്സ് , ചിത്ത് , ഹൃദയം - ഇതുമൂന്നിനും ഉള്ള വ്യത്യാസം? | പ്രശ്നോത്തരി",
        "duration": "6 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 62,
        "rights_status": "verify",
        "videoId": "cu-Esiy9zFY",
        "title": "ഒരു ജീവൻ പോകുമ്പോൾ ഇന്ദ്രിയങ്ങളെയും മനസ്സിനെയും എടുത്തു കൊണ്ട് പോകുമോ? | പ്രശ്നോത്തരി",
        "duration": "8 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 63,
        "rights_status": "verify",
        "videoId": "hWZw1v4Z8Cg",
        "title": "വിശ്രമം തന്നെ മൗനം | പ്രശ്നോത്തരി",
        "duration": "3 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 64,
        "rights_status": "verify",
        "videoId": "TTi1IpBXUZ8",
        "title": "ജീവൻമുക്തന് എപ്പോഴും സ്വസ്വരൂപാനന്ദം സാധ്യമാണോ ? | പ്രശ്നോത്തരി | 2025",
        "duration": "2 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 65,
        "rights_status": "verify",
        "videoId": "j01caJXqsSw",
        "title": "What is Self-Abidance? — Dialogue in Arunachala",
        "duration": "3 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 66,
        "rights_status": "verify",
        "videoId": "g49Uqpty0Vk",
        "title": "Destruction of Mind — Dialogue in Arunachala",
        "duration": "10 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 67,
        "rights_status": "verify",
        "videoId": "4Ve60uIgcOk",
        "title": "बद्रिकेशाष्टकम् | Badrikeshashtakam | Anandamakaranda",
        "duration": "6 min",
        "speaker": "Advaita Master"
      },
      {
        "index": 68,
        "rights_status": "verify",
        "videoId": "UWmXsXLAW2E",
        "title": "1/3 ശിവധ്യാനം | Sivadhyanam | Kozhikode | 2026",
        "duration": "1 hr, 15 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 69,
        "rights_status": "verify",
        "videoId": "xNrxWZNTlV8",
        "title": "2/3 ശിവധ്യാനം | Sivadhyanam | Kozhikode | 2026",
        "duration": "1 hr, 22 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 70,
        "rights_status": "verify",
        "videoId": "QtP4MTWLKaw",
        "title": "3/3 ശിവധ്യാനം | Sivadhyanam | Kozhikode | 2026",
        "duration": "1 hr, 25 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 71,
        "rights_status": "verify",
        "videoId": "c9IieSju7E8",
        "title": "Is it Zero or Nothing? — Dialogue in Arunachala",
        "duration": "9 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 72,
        "rights_status": "verify",
        "videoId": "XUdSD6wAtkU",
        "title": "A seeker explains his inner state — Dialogue in Arunachala",
        "duration": "11 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 73,
        "rights_status": "verify",
        "videoId": "NuDuY25ok28",
        "title": "Sapta Bhumika - The Seven Planes to Enlightenment | English | Bengaluru | June 2025",
        "duration": "1 hr, 36 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 74,
        "rights_status": "verify",
        "videoId": "TnBf4gTcbAE",
        "title": "What is Soonya (void/nothingness) as per Vedanta? — Dialogue in Arunachala w Hindi | 2025",
        "duration": "13 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 75,
        "rights_status": "verify",
        "videoId": "PoJP-ADywoE",
        "title": "How to remain in a no-mind state? — Dialogue in Arunachala w Hindi subtitles | 2024",
        "duration": "15 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 76,
        "rights_status": "verify",
        "videoId": "eNMYkWnJcZw",
        "title": "Attachment — Dialogue in Arunachala",
        "duration": "17 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 77,
        "rights_status": "verify",
        "videoId": "rqcslLyn8iw",
        "title": "What is 'pramāda’ ? (spiritual inadvertence) — Dialogue in Arunachala w Hindi... | 2025",
        "duration": "18 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 78,
        "rights_status": "verify",
        "videoId": "5EUiE03eeHI",
        "title": "How much scriptural knowledge is needed? — Dialogue in Arunachala",
        "duration": "17 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 79,
        "rights_status": "verify",
        "videoId": "c8vmZFX1d9U",
        "title": "Why is Turīya (the fourth state) needed? — Dialogue in Arunachala",
        "duration": "11 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 80,
        "rights_status": "verify",
        "videoId": "8mV7eTVnbAQ",
        "title": "Are our thoughts also pre-destined? — Dialogue in Arunachala w Hindi subtitles | 2024",
        "duration": "16 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 81,
        "rights_status": "verify",
        "videoId": "ku4yJDK6H-Y",
        "title": "Songs of Sadashiva Brahmendral",
        "duration": "55 min",
        "speaker": "Sadashiva Brahmendra"
      },
      {
        "index": 82,
        "rights_status": "verify",
        "videoId": "dPxPvfO769I",
        "title": "(26) Vivekachudamani | Verses 61-63 | English | Tiruvannamalai | 2026",
        "duration": "25 min",
        "speaker": "Adi Shankaracharya Tradition"
      }
    ]
  },
  {
    "id": "psychedelics-spiritual-consciousness",
    "title": "Psychedelics & Spiritual Consciousness: Portals to the Sacred",
    "speaker": "Terence McKenna, Hamilton Morris, Dennis McKenna & Paul Stamets",
    "subtitle": "Shamanic ethnobotany, plant sacraments, 5-MeO-DMT, and the frontiers of the mind",
    "description": "An archival exploration into sacred entheogens, plant intelligence, and non-dual awakenings through ethnobotany and psychonautics. Featuring classic Terence McKenna discourses, Hamilton Morris's field investigations into toad venom, mushrooms, and pharmahuasca, as well as dialogues on 5-MeO-DMT, Ayahuasca, and transcendent states.",
    "playlistId": "PLcneFc3nx0jo",
    "youtubeUrl": "https://www.youtube.com/playlist?list=PLcneFc3nx0jo",
    "traditions": [
      "Shamanism & Entheogens",
      "Psychonautics",
      "Philosophy of Mind",
      "Transpersonal Psychology"
    ],
    "tags": [
      "psychedelics",
      "terence-mckenna",
      "hamilton-morris",
      "dmt",
      "5-meo-dmt",
      "ayahuasca",
      "consciousness",
      "shamanism",
      "entheogens"
    ],
    "tracks": [
      {
        "index": 1,
        "rights_status": "verify",
        "videoId": "QHtt_QhsUUY",
        "title": "Terence McKenna - Existence Is An Illusion",
        "duration": "6 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 2,
        "rights_status": "verify",
        "videoId": "ru-WouAYQzM",
        "title": "Terence McKenna - No Place For True Believers",
        "duration": "14 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 3,
        "rights_status": "verify",
        "videoId": "zyU-susjUKc",
        "title": "Terence McKenna's Seven-Minute Flight Of Ideas",
        "duration": "7 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 4,
        "rights_status": "verify",
        "videoId": "RULqnCWhnvY",
        "title": "Psychedelic Explosion — Culture, Biology & Imagination",
        "duration": "3 hr 51 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 5,
        "rights_status": "verify",
        "videoId": "ixBPSX-gFP0",
        "title": "Terence McKenna - New Phase Of Human Existence",
        "duration": "59 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 6,
        "rights_status": "verify",
        "videoId": "vprIgkBGql4",
        "title": "Terence McKenna - Seeking Enlightenment",
        "duration": "4 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 7,
        "rights_status": "verify",
        "videoId": "R7tEDQFi7Po",
        "title": "Opening the Doors of Creativity",
        "duration": "1 hr",
        "speaker": "Terence McKenna"
      },
      {
        "index": 8,
        "rights_status": "verify",
        "videoId": "E8ocbqwSzP4",
        "title": "Terence McKenna - How To Talk To Elves",
        "duration": "9 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 9,
        "rights_status": "verify",
        "videoId": "_8UCpLZ7Nqc",
        "title": "Terence McKenna On DMT Elves & The Transcendent Dimension",
        "duration": "10 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 10,
        "rights_status": "verify",
        "videoId": "w0RtsN3dpTU",
        "title": "The Bizarre Science & Spiritual History of Ketamine",
        "duration": "43 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 11,
        "rights_status": "verify",
        "videoId": "5lLrkPCNdM4",
        "title": "The Biology of Marine Toxins and Psychoactive Dream Fish",
        "duration": "43 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 12,
        "rights_status": "verify",
        "videoId": "ZBNg9WIc-vQ",
        "title": "The Science of Cloning and Cultivating Magic Mushrooms",
        "duration": "43 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 13,
        "rights_status": "verify",
        "videoId": "ZUeWZTT1O9Q",
        "title": "Discovering the Strange Pharmacology of Nature's Most Iconic Fungus",
        "duration": "43 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 14,
        "rights_status": "verify",
        "videoId": "-glVLePrnPU",
        "title": "Hamilton Morris Made His Own “Pharmahuasca” and Spoke in Tongues",
        "duration": "6 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 15,
        "rights_status": "verify",
        "videoId": "ZU9t9ZCPUhw",
        "title": "Does the Human Brain Actually Produce DMT or is It a Myth?",
        "duration": "42 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 16,
        "rights_status": "verify",
        "videoId": "SzQ48JXQ57k",
        "title": "The Biological Science Behind Nature's Most Potent Psychedelic",
        "duration": "43 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 17,
        "rights_status": "verify",
        "videoId": "d76BEY5ejL8",
        "title": "The Shamanic San Pedro Cactus Ritual",
        "duration": "9 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 18,
        "rights_status": "verify",
        "videoId": "C3Yd7M3JNlw",
        "title": "Tripping on Hallucinogenic Frogs (Kambo / Phyllomedusa)",
        "duration": "24 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 19,
        "rights_status": "verify",
        "videoId": "kFmXs-TI39k",
        "title": "Hamilton's Pharmacopeia — Full Season 1 Investigation",
        "duration": "4 hr 19 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 20,
        "rights_status": "verify",
        "videoId": "bKdtgaTveJ4",
        "title": "This Rare Desert Toad Produces the Most Potent Psychedelic on Earth",
        "duration": "43 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 21,
        "rights_status": "verify",
        "videoId": "3WMA1_PdgRQ",
        "title": "The Toad Venom Pamphlet That Changed Psychedelia Forever",
        "duration": "8 min",
        "speaker": "Hamilton Morris"
      },
      {
        "index": 22,
        "rights_status": "verify",
        "videoId": "6j0_glRnJxI",
        "title": "The Nature of Ayahuasca — Plant Medicine Documentary",
        "duration": "58 min",
        "speaker": "Documentary / Sacred Plants"
      },
      {
        "index": 23,
        "rights_status": "verify",
        "videoId": "iwGiSe6WFqY",
        "title": "Terence McKenna On Magick & The Invisible Landscape",
        "duration": "19 min",
        "speaker": "Terence McKenna"
      },
      {
        "index": 24,
        "rights_status": "verify",
        "videoId": "A6xlmrRI8qE",
        "title": "Bufo Alvarius & 5-MeO-DMT — Documental 'Looking for Bufo Alvarius'",
        "duration": "45 min",
        "speaker": "Mario Garnier"
      },
      {
        "index": 25,
        "rights_status": "verify",
        "videoId": "oVduUbB6dxw",
        "title": "A Tribute to Terence McKenna: Dennis McKenna + Paul Stamets Interview",
        "duration": "1 hr 52 min",
        "speaker": "Dennis McKenna & Paul Stamets"
      },
      {
        "index": 26,
        "rights_status": "verify",
        "videoId": "rH1bfZ1p6sg",
        "title": "5-MeO-DMT — The Molecule, Non-Duality & Cosmic Consciousness",
        "duration": "1 hr",
        "speaker": "Leo Gura"
      }
    ]
  }
,
  {
    "id": "architecture-of-reality",
    "title": "Architecture of Reality: Physics, Mysticism & Non-Dual Cosmos",
    "speaker": "Swami Sarvapriyananda, Carl Jung, Donald Hoffman, Nochur Venkataraman & Thinkers",
    "subtitle": "Inquiries into the fabric of space-time, the illusion of reality, archetypes, and pure consciousness",
    "description": "A monumental compendium investigating the nature of existence across depth psychology, quantum ontology, cognitive science, and Advaita Vedanta. Featuring comprehensive lectures by Swami Sarvapriyananda, Carl Jung's esoteric insights, cognitive explorations into conscious realism, and profound contemplative expositions on the structure of the cosmos.",
    "playlistId": "PLgzEnqcfCPgINXNop3xi2AGxjPiOs2X_3",
    "youtubeUrl": "https://www.youtube.com/playlist?list=PLgzEnqcfCPgINXNop3xi2AGxjPiOs2X_3",
    "traditions": [
      "Advaita Vedanta",
      "Depth Psychology & Carl Jung",
      "Consciousness & Cognitive Science",
      "Quantum Ontology & Cosmology",
      "Philosophy of Mind"
    ],
    "tags": [
      "reality",
      "consciousness",
      "carl-jung",
      "sarvapriyananda",
      "nochur-venkataraman",
      "donald-hoffman",
      "advaita",
      "quantum-mechanics",
      "maya",
      "metaphysics"
    ],
    "tracks": [
      {
        "index": 1,
        "rights_status": "verify",
        "videoId": "VVV_uqTVoww",
        "title": "The Seven Sermons to the Dead (1916) by Carl Gustav Jung",
        "duration": "37 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 2,
        "rights_status": "verify",
        "videoId": "MnDEU96SdQ8",
        "title": "Carl Jung Documentary - Biography of the life of Carl Jung",
        "duration": "21 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 3,
        "rights_status": "verify",
        "videoId": "4sgTWKCXQs8",
        "title": "Carl Gustav Jung - In His Own Words Documentary 1990",
        "duration": "1 hr 2 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 4,
        "rights_status": "verify",
        "videoId": "0-hp5s9A-4k",
        "title": "Carl G. Jung or Lapis Philosphorum",
        "duration": "5 min",
        "speaker": "Mario Núñez-Molina"
      },
      {
        "index": 5,
        "rights_status": "verify",
        "videoId": "u4PmR1PkVNo",
        "title": "Carl Jung and the Journey of Self Discovery 2/2",
        "duration": "9 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 6,
        "rights_status": "verify",
        "videoId": "G-qVpKQ_qeY",
        "title": "Carl Jung and the Journey of Self Discovery 1/2",
        "duration": "9 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 7,
        "rights_status": "verify",
        "videoId": "UDyo1G6DlAM",
        "title": "C.G. Jung & Gnosis",
        "duration": "10 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 8,
        "rights_status": "verify",
        "videoId": "p3cd7eTniqo",
        "title": "Your Invisible Power, a Manual of Using Mental Energy [Occult Audiobook]",
        "duration": "1 hr 40 min",
        "speaker": "Esoteric Tower"
      },
      {
        "index": 9,
        "rights_status": "verify",
        "videoId": "uY-u1qyRM5w",
        "title": "Richard Feynman Lecture -- \"Los Alamos From Below\"",
        "duration": "1 hr 18 min",
        "speaker": "The Quagmire"
      },
      {
        "index": 10,
        "rights_status": "verify",
        "videoId": "xL_sMXfzzyA",
        "title": "A Conversation with Bertrand Russell (1952)",
        "duration": "31 min",
        "speaker": "Manufacturing Intellect"
      },
      {
        "index": 11,
        "rights_status": "verify",
        "videoId": "xdIjYBtnvZU",
        "title": "Feynman's Lost Lecture (ft. 3Blue1Brown)",
        "duration": "22 min",
        "speaker": "minutephysics"
      },
      {
        "index": 12,
        "rights_status": "verify",
        "videoId": "QkhBcLk_8f0",
        "title": "Great Minds: Richard Feynman - The Uncertainty Of Knowledge",
        "duration": "3 min",
        "speaker": "FFreeThinker"
      },
      {
        "index": 13,
        "rights_status": "verify",
        "videoId": "BU_gZZwlVoQ",
        "title": "Neville Goddard - God And I Are One - 1972 Lecture - Own Voice - Full Transcription - Subtitles 🙏 -",
        "duration": "46 min",
        "speaker": "Spiritual Mind"
      },
      {
        "index": 14,
        "rights_status": "verify",
        "videoId": "d2lJUOv0hLA",
        "title": "8. The Sumerians - Fall of the First Cities",
        "duration": "2 hr 28 min",
        "speaker": "Fall of Civilizations"
      },
      {
        "index": 15,
        "rights_status": "verify",
        "videoId": "Wp-WiNXH6hI",
        "title": "Carl Sagan testifying before Congress in 1985 on climate change",
        "duration": "17 min",
        "speaker": "carlsagandotcom"
      },
      {
        "index": 16,
        "rights_status": "verify",
        "videoId": "aL43l2SFVWQ",
        "title": "The Kybalion (1908) by Three Initiates",
        "duration": "4 hr 5 min",
        "speaker": "Master Key Society"
      },
      {
        "index": 17,
        "rights_status": "verify",
        "videoId": "bAX27XRHMH8",
        "title": "There's no such thing as MIRACLE, Richard Feynman advice to students | self-improvement video",
        "duration": "5 min",
        "speaker": "BTY 365"
      },
      {
        "index": 18,
        "rights_status": "verify",
        "videoId": "lUjoFzT0VNI",
        "title": "Becoming Who You Really Are - The Philosophy of Friedrich Nietzsche",
        "duration": "16 min",
        "speaker": "Pursuit of Wonder"
      },
      {
        "index": 19,
        "rights_status": "verify",
        "videoId": "ffNWoefuwPM",
        "title": "Feeling Is the Secret (1944) by Neville Goddard",
        "duration": "39 min",
        "speaker": "Master Key Society"
      },
      {
        "index": 20,
        "rights_status": "verify",
        "videoId": "ipRvjS7q1DI",
        "title": "Richard Feynman: Can Machines Think?",
        "duration": "18 min",
        "speaker": "Lex Clips"
      },
      {
        "index": 21,
        "rights_status": "verify",
        "videoId": "EKWGGDXe5MA",
        "title": "Richard Feynman Computer Science Lecture - Hardware, Software and Heuristics",
        "duration": "1 hr 16 min",
        "speaker": "Muon Ray"
      },
      {
        "index": 22,
        "rights_status": "verify",
        "videoId": "EYPapE-3FRw",
        "title": "Feynman on Scientific Method.",
        "duration": "10 min",
        "speaker": "seabala"
      },
      {
        "index": 23,
        "rights_status": "verify",
        "videoId": "o7w5r5PfBKo",
        "title": "How to Trick Your Brain to Like Doing Hard Things – Atomic Habits by James Clear",
        "duration": "23 min",
        "speaker": "FightMediocrity"
      },
      {
        "index": 24,
        "rights_status": "verify",
        "videoId": "3O9FFrLpinQ",
        "title": "294 The Five Laws Of Stupidity",
        "duration": "16 min",
        "speaker": "tvlpodcast"
      },
      {
        "index": 25,
        "rights_status": "verify",
        "videoId": "0T--WC4D1C0",
        "title": "String Theory and the End of Space and Time with Robbert Dijkgraaf",
        "duration": "46 min",
        "speaker": " The Science and Cocktails Foundation"
      },
      {
        "index": 26,
        "rights_status": "verify",
        "videoId": "NM-zWTU7X-k",
        "title": "Feynman: Knowing versus Understanding",
        "duration": "6 min",
        "speaker": "TehPhysicalist"
      },
      {
        "index": 27,
        "rights_status": "verify",
        "videoId": "s723-3hkUjA",
        "title": "THE VEDIC GEOMETRY - A film based on research about Ancient Indian Geometry || Project SHIVOHAM",
        "duration": "32 min",
        "speaker": "Project SHIVOHAM"
      },
      {
        "index": 28,
        "rights_status": "verify",
        "videoId": "FjHJ7FmV0M4",
        "title": "Richard Feynman talks about light",
        "duration": "6 min",
        "speaker": "sdfhsfh"
      },
      {
        "index": 29,
        "rights_status": "verify",
        "videoId": "Alj6q4Y0TNE",
        "title": "Today's Answers to Newton's Queries about Light -- Richard Feynman (1979)",
        "duration": "6 hr 9 min",
        "speaker": "Trev M"
      },
      {
        "index": 30,
        "rights_status": "verify",
        "videoId": "R7oyZGW99os",
        "title": "HIDDEN MATHEMATICS - Randall Carlson - Ancient Knowledge of Space, Time & Cosmic Cycles",
        "duration": "2 hr 3 min",
        "speaker": "After Skool"
      },
      {
        "index": 31,
        "rights_status": "verify",
        "videoId": "LCiB9oMnIbI",
        "title": "The Miracle of Consciousness - Ram Dass Full Lecture 1996",
        "duration": "2 hr 42 min",
        "speaker": "Baba Ram Dass"
      },
      {
        "index": 32,
        "rights_status": "verify",
        "videoId": "iBF0hP2_nGw",
        "title": "The Lost Ancient Humans of Antarctica",
        "duration": "33 min",
        "speaker": "After Skool"
      },
      {
        "index": 33,
        "rights_status": "verify",
        "videoId": "wJa5Ch0O4BI",
        "title": "The Game of Life and How to Play it (1925) by Florence Scovel Shinn",
        "duration": "2 hr 20 min",
        "speaker": "Master Key Society"
      },
      {
        "index": 34,
        "rights_status": "verify",
        "videoId": "ADiql3FG5is",
        "title": "Quantum Biology: The Hidden Nature of Nature | World Science Festival",
        "duration": "1 hr 36 min",
        "speaker": "World Science Festival"
      },
      {
        "index": 35,
        "rights_status": "verify",
        "videoId": "3ODfwJBDgBs",
        "title": "Kundalini Yoga -- as Envisioned by the Ancient Yogis",
        "duration": "1 hr 15 min",
        "speaker": "ArshaBodha - Swami Tadatmananda"
      },
      {
        "index": 36,
        "rights_status": "verify",
        "videoId": "3EyAKFi3_Xg",
        "title": "Hindu concept of the origin of the Universe",
        "duration": "7 min",
        "speaker": "defenderofHindus"
      },
      {
        "index": 37,
        "rights_status": "verify",
        "videoId": "hVYv9ktilQw",
        "title": "Sri Ramana Maharshi - JNANI",
        "duration": "1 hr 20 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 38,
        "rights_status": "verify",
        "videoId": "jOc90G_foUg",
        "title": "Неврони към нирвана / Neurons to Nirvana - Understanding Psychedelic Medicines (Субтитри)",
        "duration": "1 hr 9 min",
        "speaker": "The Spirit Molecule"
      },
      {
        "index": 39,
        "rights_status": "verify",
        "videoId": "GrWhX1BixBk",
        "title": "THE YOGIS OF TIBET - Rare Documentary Film",
        "duration": "1 hr 17 min",
        "speaker": "Nyishar"
      },
      {
        "index": 40,
        "rights_status": "verify",
        "videoId": "QX3M8Ka9vUA",
        "title": "The Third Industrial Revolution: A Radical New Sharing Economy",
        "duration": "1 hr 45 min",
        "speaker": "VICE"
      },
      {
        "index": 41,
        "rights_status": "verify",
        "videoId": "MrZ4197C1I0",
        "title": "One of my favourite Carl Sagan videos",
        "duration": "18 min",
        "speaker": "xphysicsx tv"
      },
      {
        "index": 42,
        "rights_status": "verify",
        "videoId": "OjN-eL2YNsM",
        "title": "Carl Sagan interview - Pale Blue Dot: A Vision of the Human Future in Space",
        "duration": "1 hr 30 min",
        "speaker": "pangea"
      },
      {
        "index": 43,
        "rights_status": "verify",
        "videoId": "Hez5MyKQIMs",
        "title": "The 1993 Bunyan Lecture: Carl Sagan - “Is There Intelligent Life on Earth?”",
        "duration": "2 hr 7 min",
        "speaker": "Stanford Physics"
      },
      {
        "index": 44,
        "rights_status": "verify",
        "videoId": "qTxC-yDOSgg",
        "title": "Climate as an Emerging 1990 by Carl Sagan   Documentary HD",
        "duration": "1 hr 5 min",
        "speaker": "Documentales Lo Mejor"
      },
      {
        "index": 45,
        "rights_status": "verify",
        "videoId": "mJIc2w6PvRg",
        "title": "The Story of Carl Gustav Jung  Laurens van der Post BBC 1972",
        "duration": "1 hr 33 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 46,
        "rights_status": "verify",
        "videoId": "1UVqoReWE4w",
        "title": "Carl Jung documentary",
        "duration": "1 hr 1 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 47,
        "rights_status": "verify",
        "videoId": "3tuqiTMSzkU",
        "title": "Carl Jung and the Archetypes - Dr Kevin Lu, PhD",
        "duration": "1 hr 10 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 48,
        "rights_status": "verify",
        "videoId": "Oy-x7BLlBYg",
        "title": "Carl Gustav Jung & The Red Book (part 1)",
        "duration": "2 hr 30 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 49,
        "rights_status": "verify",
        "videoId": "Pjh_Pdqjvxw",
        "title": "Carl Jung's Red Book: The STRANGEST Form of Self Help You'll Ever Encounter",
        "duration": "1 hr 37 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 50,
        "rights_status": "verify",
        "videoId": "IUWpr0gR81A",
        "title": "Interview with Dr Carl Jung 1957 ENHANCED AUDIO",
        "duration": "3 hr 3 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 51,
        "rights_status": "verify",
        "videoId": "NVLYIVg6_50",
        "title": "James Hillman - In Defense of Carl Jung",
        "duration": "7 hr 14 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 52,
        "rights_status": "verify",
        "videoId": "2AMu-G51yTY",
        "title": "Face To Face  |  Carl Gustav Jung (1959) HQ",
        "duration": "38 min",
        "speaker": "Carl Gustav Jung"
      },
      {
        "index": 53,
        "rights_status": "verify",
        "videoId": "2ETDM4YUcv4",
        "title": "Black Holes, Cosmology, and Space-Time Singularities",
        "duration": "34 min",
        "speaker": "The Royal Swedish Academy of Sciences"
      },
      {
        "index": 54,
        "rights_status": "verify",
        "videoId": "owppju3jwPE",
        "title": "Singularity Or Bust [Full Documentary]",
        "duration": "47 min",
        "speaker": "Roger Dye"
      },
      {
        "index": 55,
        "rights_status": "verify",
        "videoId": "GahXr5obyb4",
        "title": "Full Documentary 2016   Space Time General Relativity   Discovery Channel Documentaries",
        "duration": "1 hr 18 min",
        "speaker": "show project"
      },
      {
        "index": 56,
        "rights_status": "verify",
        "videoId": "UCP4P7yP7zM",
        "title": "Brahma Sutras Adhyasa Bhashya 1 English Explanation Narasimhananda",
        "duration": "15 min",
        "speaker": "Swami Narasimhananda, Ramakrishna Mission"
      },
      {
        "index": 57,
        "rights_status": "verify",
        "videoId": "tEMAVRZRNzI",
        "title": "Theory of #Superimposition – #Brahmasutra by Swami Ramakrishnananda – Discourse 3",
        "duration": "1 hr",
        "speaker": "Chinfo Channel"
      },
      {
        "index": 58,
        "rights_status": "verify",
        "videoId": "4eRCygdW--c",
        "title": "Richard Feynman \"Tiny Machines\" Nanotechnology Lecture - aka \"There's Plenty of Room at the Bottom\"",
        "duration": "1 hr 20 min",
        "speaker": "Muon Ray"
      },
      {
        "index": 59,
        "rights_status": "verify",
        "videoId": "nIhrygjzHQc",
        "title": "The Mystery of Time and How to Master It for Self Development [Occult Lecture]",
        "duration": "1 hr 21 min",
        "speaker": "Esoteric Tower"
      },
      {
        "index": 60,
        "rights_status": "verify",
        "videoId": "oIOGUYOPAsA",
        "title": "Jay Bhattacharya: The Case Against Lockdowns | Lex Fridman Podcast #254",
        "duration": "2 hr 22 min",
        "speaker": "Lex Fridman"
      },
      {
        "index": 61,
        "rights_status": "verify",
        "videoId": "1L0TKZQcUtA",
        "title": "MIT 6.S094: Introduction to Deep Learning and Self-Driving Cars",
        "duration": "1 hr 31 min",
        "speaker": "Lex Fridman"
      },
      {
        "index": 62,
        "rights_status": "verify",
        "videoId": "DxREm3s1scA",
        "title": "Elon Musk: SpaceX, Mars, Tesla Autopilot, Self-Driving, Robotics, and AI | Lex Fridman Podcast #252",
        "duration": "2 hr 32 min",
        "speaker": "Lex Fridman"
      },
      {
        "index": 63,
        "rights_status": "verify",
        "videoId": "5f-JlzBuUUU",
        "title": "Richard Dawkins: Evolution, Intelligence, Simulation, and Memes | Lex Fridman Podcast #87",
        "duration": "1 hr 7 min",
        "speaker": "Lex Fridman"
      },
      {
        "index": 64,
        "rights_status": "verify",
        "videoId": "ru-WouAYQzM",
        "title": "Terence McKenna - No Place For True Believers",
        "duration": "14 min",
        "speaker": "We Plants Are Happy Plants"
      },
      {
        "index": 65,
        "rights_status": "verify",
        "videoId": "h6OoaNPSZeM",
        "title": "The Multiverse Hypothesis Explained by Neil deGrasse Tyson",
        "duration": "10 min",
        "speaker": "Science Time"
      },
      {
        "index": 66,
        "rights_status": "verify",
        "videoId": "NxAINV06U6w",
        "title": "Daniel Schmidt on Kundalini, Ego Dissolution, and Samadhi - Buddha at the Gas Pump Interview",
        "duration": "2 hr 19 min",
        "speaker": "Buddha at the Gas Pump®"
      },
      {
        "index": 67,
        "rights_status": "verify",
        "videoId": "Cxiex0rXD0s",
        "title": "Zen Bones",
        "duration": "56 min",
        "speaker": "Brant Hindman"
      },
      {
        "index": 68,
        "rights_status": "verify",
        "videoId": "yUbz2KfKVZ4",
        "title": "sarvam khalv idam brahma : Swami Sarvapriyananda",
        "duration": "5 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 69,
        "rights_status": "verify",
        "videoId": "DkMRiiVJFWg",
        "title": "|| No Mind || by Swami Sarvapriyananda",
        "duration": "1 hr 13 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 70,
        "rights_status": "verify",
        "videoId": "su5ISL8zeSY",
        "title": "What Happens After Enlightenment | Swami Sarvapriyananda",
        "duration": "13 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 71,
        "rights_status": "verify",
        "videoId": "Bj5_lNQdJPw",
        "title": "Raja Yoga: The Path of Meditation (Part 1) | Swami Sarvapriyananda",
        "duration": "1 hr 40 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 72,
        "rights_status": "verify",
        "videoId": "eXXwKqh5aO8",
        "title": "Gospel of Sri Ramakrishna by Sw. Sarvapriyananda, August 1, 2022",
        "duration": "1 hr 19 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 73,
        "rights_status": "verify",
        "videoId": "vAZPWu084m4",
        "title": "Vedantic Self and Buddhist Non-Self | Swami Sarvapriyananda",
        "duration": "1 hr 33 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 74,
        "rights_status": "verify",
        "videoId": "V220xwiWeUs",
        "title": "Ajahn Chah ~ Developing Samadhi (One Pointedness) ~ Theravadin Buddhism Forest Tradition",
        "duration": "1 hr 2 min",
        "speaker": "Samaneri Jayasāra - Wisdom of the Masters"
      },
      {
        "index": 75,
        "rights_status": "verify",
        "videoId": "lW5WByctPsw",
        "title": "Rig Veda Chanting | Vedic Mantras | Vol 1-3",
        "duration": "2 hr 14 min",
        "speaker": "Bindu "
      },
      {
        "index": 76,
        "rights_status": "verify",
        "videoId": "-G2H8blmrNM",
        "title": "SHAMBHALA BUDDHIST CHANT : MAHAYANA SUTRAS",
        "duration": "46 min",
        "speaker": "Bansurio"
      },
      {
        "index": 77,
        "rights_status": "verify",
        "videoId": "rUfa450m_aQ",
        "title": "It from Bit from Chit | Swami Sarvapriyananda",
        "duration": "1 hr 3 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 78,
        "rights_status": "verify",
        "videoId": "uCldjIVqxAU",
        "title": "The No-Self Teaching | Buddhism",
        "duration": "21 min",
        "speaker": "SEEKER TO SEEKER"
      },
      {
        "index": 79,
        "rights_status": "verify",
        "videoId": "gWZ-OnmKl70",
        "title": "Are all things empty? - Nagarjuna & The Buddhist Middle Way",
        "duration": "24 min",
        "speaker": "Let's Talk Religion"
      },
      {
        "index": 80,
        "rights_status": "verify",
        "videoId": "C8IiIqE4F74",
        "title": "Ulladu Narpadu(Day9 - Last Day) - Tiruvannamalai Jan 2023",
        "duration": "1 hr 7 min",
        "speaker": "Voice of Rishis Swami Ramanacharanatirtha (Nochur)"
      },
      {
        "index": 81,
        "rights_status": "verify",
        "videoId": "Hx4TO-N6esc",
        "title": "ആത്മവിദ്യ...| Sri Nochur Swami | Athma Vidya (Kottayam 2012)",
        "duration": "33 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 82,
        "rights_status": "verify",
        "videoId": "gQWEh9AC1K8",
        "title": "Purnam - The Full | Swami Sarvapriyananda",
        "duration": "1 hr 19 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 83,
        "rights_status": "verify",
        "videoId": "yyOnFR81aY0",
        "title": "Upadesa Saram - Part 3 | Swami Sarvapriyananda",
        "duration": "1 hr 42 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 84,
        "rights_status": "verify",
        "videoId": "BV2oXx6-CX4",
        "title": "Upadesa Saram - Part 4 | Swami Sarvapriyananda",
        "duration": "1 hr 36 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 85,
        "rights_status": "verify",
        "videoId": "aaBeXwSsmtY",
        "title": "Upadesa Saram - Part 1 | Swami Sarvapriyananda",
        "duration": "1 hr 47 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 86,
        "rights_status": "verify",
        "videoId": "REt845hsxbI",
        "title": "Upadesa Saram - Part 2 | Swami Sarvapriyananda",
        "duration": "1 hr 36 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 87,
        "rights_status": "verify",
        "videoId": "zxUBnvw984s",
        "title": "Kathopanishad w/ Shankara Bhaashyam 061 2023-08-24 v1.3.16-17 (Class)",
        "duration": "1 hr 14 min",
        "speaker": "Arsha Seva Kendram"
      },
      {
        "index": 88,
        "rights_status": "verify",
        "videoId": "yr9E3AKzEJk",
        "title": "No Greater Gain | Swami Sarvapriyananda",
        "duration": "1 hr 13 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 89,
        "rights_status": "verify",
        "videoId": "IlBytzpLiu4",
        "title": "Hinduism Explained Logically",
        "duration": "1 hr 9 min",
        "speaker": "Krishna West in Germany"
      },
      {
        "index": 90,
        "rights_status": "verify",
        "videoId": "WITUOwi3EYk",
        "title": "Complete Bhagavad Gita Sanskrit Guided Chant with Meaning - All Chapters (Including Dhyanam)",
        "duration": "3 hr 11 min",
        "speaker": "The Sanskrit Channel"
      },
      {
        "index": 91,
        "rights_status": "verify",
        "videoId": "kSbTaIDYTb0",
        "title": "Knowing and Being - Swami Sarvapriyananda",
        "duration": "1 hr 32 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 92,
        "rights_status": "verify",
        "videoId": "WrceiKtKrHo",
        "title": "Our Real Nature    by Swami Sarvapriyananda",
        "duration": "1 hr 21 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 93,
        "rights_status": "verify",
        "videoId": "fnZoItTt2WE",
        "title": "Teachings of Sri Ramakrishna | Swami Sarvapriyananda",
        "duration": "1 hr 17 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 94,
        "rights_status": "verify",
        "videoId": "aqGTEA7EaDg",
        "title": "Upadesa Saram - Part 5 | Swami Sarvapriyananda",
        "duration": "1 hr 53 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 95,
        "rights_status": "verify",
        "videoId": "eGKFTUuJppU",
        "title": "Swami Sarvapriyananda at IITK - \"Who Am I?\" according to Mandukya Upanishad-Part 1",
        "duration": "1 hr 27 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 96,
        "rights_status": "verify",
        "videoId": "HgH_7ZA9Hnc",
        "title": "Rare Interview with a Himalayan Mystic - Kali Sadhaka",
        "duration": "34 min",
        "speaker": "Dr Sumit Kesarkar"
      },
      {
        "index": 97,
        "rights_status": "verify",
        "videoId": "pXODkbb-rVY",
        "title": "Practises For Enlightenment (Based on Chapter 13 of Bhagavad Gita)",
        "duration": "1 hr 19 min",
        "speaker": "Hindu Endowments Board"
      },
      {
        "index": 98,
        "rights_status": "verify",
        "videoId": "X6A5a_FZPak",
        "title": "Non-dualism: The Art of the Shortcut | Swami Sarvapriyananda",
        "duration": "1 hr 18 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 99,
        "rights_status": "verify",
        "videoId": "7ZfyZYuMSjE",
        "title": "2-Day Retreat on Ashtāvakra S̈aṁhitā, with Sw. Sarvapriyananda - Session 3 of 6",
        "duration": "1 hr 55 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 100,
        "rights_status": "verify",
        "videoId": "-Y8623O8ZuM",
        "title": "Oneness | Q&A | Swami Sarvapriyananda",
        "duration": "2 hr 12 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 101,
        "rights_status": "verify",
        "videoId": "l7m8vr14tDA",
        "title": "The Honey of Non-Duality | Swami Sarvapriyananda",
        "duration": "1 hr 19 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 102,
        "rights_status": "verify",
        "videoId": "oYN3hpNkX0E",
        "title": "Ramana Maharshi   Final Talks By Annamalai Swami Part 3",
        "duration": "1 hr",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 103,
        "rights_status": "verify",
        "videoId": "rC7i_uB0Z2I",
        "title": "The Power of Focus by Swami Sarvapriyananda (Vedanta Society of New York)",
        "duration": "1 hr 56 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 104,
        "rights_status": "verify",
        "videoId": "DVmWlRmOnSo",
        "title": "Non-Dual Awakening | Swami Sarvapriyananda",
        "duration": "1 hr 14 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 105,
        "rights_status": "verify",
        "videoId": "L5RXOLpLhvQ",
        "title": "Paramahansa Yogananda: The Secret Teachings of Jesus the Yogi | Jesus in India",
        "duration": "30 min",
        "speaker": "Paramahansa Yogananda"
      },
      {
        "index": 106,
        "rights_status": "verify",
        "videoId": "BKIkzvZ0Uqg",
        "title": "Fullness  - Swami Sarvapriyananda",
        "duration": "1 hr 4 min",
        "speaker": "Swami Sarvapriyananda"
      },
      {
        "index": 107,
        "rights_status": "verify",
        "videoId": "E53GuZ8NFQw",
        "title": "Bhagavad-gita Chant Series - Complete Version",
        "duration": "2 hr 41 min",
        "speaker": "Braja Beats"
      },
      {
        "index": 108,
        "rights_status": "verify",
        "videoId": "poLIZtOiqqo",
        "title": "Swami Sarvpriyananda ji on awareness, Ramana Ashram's centenary celebration by Arunachal Ashram, NY",
        "duration": "41 min",
        "speaker": "HerambaStudio"
      },
      {
        "index": 109,
        "rights_status": "verify",
        "videoId": "089-Icdu62w",
        "title": "2/3 Manisha Panchakam (English) w Hindi subtitles by PūjyaSri Ramanacharana Tirtha (Nochur) Swami",
        "duration": "1 hr 3 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 110,
        "rights_status": "verify",
        "videoId": "yjyq_ocjq3o",
        "title": "3/3 Manisha Panchakam (English w Hindi subtitles) by PūjyaSri Ramanacharana Tirtha (Nochur) Swami",
        "duration": "1 hr 12 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 111,
        "rights_status": "verify",
        "videoId": "g01bSuGXliI",
        "title": "ശിവാനന്ദലഹരി ... | Sri Nochur Swami |  Sivanandalahari 1 (Palakkad 2022)",
        "duration": "1 hr 30 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 112,
        "rights_status": "verify",
        "videoId": "j8doiMwzt7Q",
        "title": "Bhagavan Sri Ramana Maharshi Jayanthi Satsang (Tamil, 2023)",
        "duration": "1 hr 6 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 113,
        "rights_status": "verify",
        "videoId": "Y3k9gOIOld8",
        "title": "Kasi Panchakam (Malayalam)",
        "duration": "1 hr 10 min",
        "speaker": "Voice of Rishis Swami Ramanacharanatirtha (Nochur)"
      },
      {
        "index": 114,
        "rights_status": "verify",
        "videoId": "k4ihZvL4Qno",
        "title": "ഭഗവദ്ഗീത-Bangalore Satsang പൂജ്യശ്രീ രമണചരണതീർത്ഥ സ്വാമി|PujyaSri RamanacharanaTirtha (Nochur)Swami|",
        "duration": "1 hr 1 min",
        "speaker": "Pujyashri Nochur Venkataraman"
      },
      {
        "index": 115,
        "rights_status": "verify",
        "videoId": "ihEj9xi20EE",
        "title": "Talks With SRI RAMANA MAHARSHI - Muslim Visitors",
        "duration": "8 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 116,
        "rights_status": "verify",
        "videoId": "etLJnnGwtPM",
        "title": "Just Let It Go | Bob Proctor",
        "duration": "5 min",
        "speaker": "Proctor Gallagher Institute"
      },
      {
        "index": 117,
        "rights_status": "verify",
        "videoId": "wQGOYnWHnto",
        "title": "Naval: Uncomfortable Truth about Life | Lessons on Growth, Building Relationships, Spirituality",
        "duration": "1 hr 39 min",
        "speaker": "BeerBiceps"
      },
      {
        "index": 118,
        "rights_status": "verify",
        "videoId": "wawMjJUCMVw",
        "title": "Interview with Inventor of Neural Nets Warren McCulloch, neurologist who helped start it way back.",
        "duration": "10 min",
        "speaker": "trwappers"
      },
      {
        "index": 119,
        "rights_status": "verify",
        "videoId": "pyXouxa0WnY",
        "title": "Could AI models be conscious?",
        "duration": "44 min",
        "speaker": "Anthropic"
      },
      {
        "index": 120,
        "rights_status": "verify",
        "videoId": "PqD5f8M6oc4",
        "title": "How to understand 'jagat mithyā' THE WORLD IS UNREAL | Dialogue in Arunachala | 2025",
        "duration": "8 min",
        "speaker": "Voice of Rishis Swami Ramanacharanatirtha (Nochur)"
      },
      {
        "index": 121,
        "rights_status": "verify",
        "videoId": "h5G6Oc_V3Lw",
        "title": "All 325+ Competing Consciousness Theories In One Video.",
        "duration": "2 hr 56 min",
        "speaker": "Essentia Foundation"
      },
      {
        "index": 122,
        "rights_status": "verify",
        "videoId": "LGpHozTDL4M",
        "title": "002 Mandukya Upanishad",
        "duration": "1 hr 41 min",
        "speaker": "Swami Paramananda Bharati"
      },
      {
        "index": 123,
        "rights_status": "verify",
        "videoId": "KVjFSaFl1P4",
        "title": "Why Should We Learn How to Die? | Pravrajika Divyanandaprana",
        "duration": "13 min",
        "speaker": "Ramakrishna Math & Ramakrishna Mission Mangaluru"
      },
      {
        "index": 124,
        "rights_status": "verify",
        "videoId": "4dYnAQUigUE",
        "title": "Why Every Seeker Must Understand the Gayatri Mantra | Pravrajika Divyanandaprana",
        "duration": "27 min",
        "speaker": "Ramakrishna Math & Ramakrishna Mission Mangaluru"
      },
      {
        "index": 125,
        "rights_status": "verify",
        "videoId": "n3loVLvHZTc",
        "title": "Terence Mckenna - The Entire Schtick",
        "duration": "27 min",
        "speaker": "Infinite Flow"
      },
      {
        "index": 126,
        "rights_status": "verify",
        "videoId": "1xveeGEKlOY",
        "title": "What Every Seeker Must Understand | Dialogue in Arunachala | 2025",
        "duration": "11 min",
        "speaker": "Voice of Rishis Swami Ramanacharanatirtha (Nochur)"
      },
      {
        "index": 127,
        "rights_status": "verify",
        "videoId": "vJdVicQ047A",
        "title": "How to Think! - by Pravrajika Divyanandaprana",
        "duration": "19 min",
        "speaker": "Eternal Truth"
      },
      {
        "index": 128,
        "rights_status": "verify",
        "videoId": "xnOvQWYPXv8",
        "title": "OSHO: What Is Happening In Israel Is Nothing New",
        "duration": "8 min",
        "speaker": "OSHO"
      },
      {
        "index": 129,
        "rights_status": "verify",
        "videoId": "VpDbI2IYstM",
        "title": "OSHO: Where Are You Stuck?",
        "duration": "6 min",
        "speaker": "OSHO"
      },
      {
        "index": 130,
        "rights_status": "verify",
        "videoId": "BXJ7ltv6WDI",
        "title": "(38) Srimad Bhagavata Saptaha Yajnam | Skandham 11 - Navayogi Upakhyanam | Mattancherry | Jan 2026",
        "duration": "21 min",
        "speaker": "Voice of Rishis Swami Ramanacharanatirtha (Nochur)"
      },
      {
        "index": 131,
        "rights_status": "verify",
        "videoId": "D9gdod0ER0Y",
        "title": "ബോധാനന്ദം | Bodhanandam | Thiruvananthapuram | 2025",
        "duration": "1 hr 11 min",
        "speaker": "Voice of Rishis Swami Ramanacharanatirtha (Nochur)"
      },
      {
        "index": 132,
        "rights_status": "verify",
        "videoId": "gN0u5uu7RUM",
        "title": "The Lost Satsang Sri Nisargadatta Maharaj Archival Film 1979",
        "duration": "1 hr 33 min",
        "speaker": "Sri Nisargadatta Maharaj"
      },
      {
        "index": 133,
        "rights_status": "verify",
        "videoId": "gstT4WIDlwk",
        "title": "What is Kashmir Shaivism?",
        "duration": "50 min",
        "speaker": "Let's Talk Religion"
      },
      {
        "index": 134,
        "rights_status": "verify",
        "videoId": "V3kZwsysuqQ",
        "title": "How to Become Your Own ISP",
        "duration": "22 min",
        "speaker": "Data Slayer"
      },
      {
        "index": 135,
        "rights_status": "verify",
        "videoId": "xpIvtq55pgE",
        "title": "EXPOSED: The Real Words of Ramana Maharshi (And What Devotees Altered) | David Godman | Vinita Pande",
        "duration": "43 min",
        "speaker": "Bhagavan Sri Ramana Maharshi"
      },
      {
        "index": 136,
        "rights_status": "verify",
        "videoId": "_9DA8d144MQ",
        "title": "The Brihadaranyaka Upanishad | The Ultimate Teaching of the Self",
        "duration": "1 hr 48 min",
        "speaker": "The Inner Archive"
      },
      {
        "index": 137,
        "rights_status": "verify",
        "videoId": "W8DtuhSocho",
        "title": "baba neem karoli",
        "duration": "13 min",
        "speaker": "Kapil works"
      },
      {
        "index": 138,
        "rights_status": "verify",
        "videoId": "45SXp9JrDL8",
        "title": "The Upanishads Explained: The 13 Texts That Build a Three-Word Equation to Destroy Your Ego",
        "duration": "26 min",
        "speaker": "The East Made Simple"
      },
      {
        "index": 139,
        "rights_status": "verify",
        "videoId": "VzyDKR0gHdI",
        "title": "H.H. Sri Sri Ravi Shankar - A talk for Nature of enlightenment",
        "duration": "46 min",
        "speaker": "rajv234"
      },
      {
        "index": 140,
        "rights_status": "verify",
        "videoId": "h3mRsvFmWi0",
        "title": "How to Live on Earth | Feature Documentary | Presented by Benedict Cumberbatch",
        "duration": "1 hr 37 min",
        "speaker": "Open Planet and 4 more"
      }
    ]
  }
];
