import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal & Field Notes — The Still Point" },
      {
        name: "description",
        content:
          "Tactile contemplative journal and field notes board. Capture fleeting insights, inquiries, reflections, and quotes in stillness.",
      },
      { property: "og:title", content: "Journal & Field Notes — The Still Point" },
      {
        property: "og:description",
        content:
          "Tactile contemplative journal and field notes board. Capture fleeting insights, inquiries, reflections, and quotes in stillness.",
      },
      { property: "og:url", content: siteUrl("/journal") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/journal") }],
  }),
  component: StickyJournal,
});

export type NoteColor = "amber" | "charcoal" | "sage" | "indigo" | "rose" | "ivory";

export type NoteMood = "insight" | "inquiry" | "stillness" | "quote" | "cosmos";

export interface StickyNote {
  id: string;
  title?: string;
  content: string;
  color: NoteColor;
  mood: NoteMood;
  tags: string[];
  isPinned: boolean;
  createdAt: number;
  rotation?: number; // Organic tilt in degrees
}

const COLOR_MAP: Record<
  NoteColor,
  {
    name: string;
    bg: string;
    border: string;
    text: string;
    tape: string;
    accent: string;
    glow: string;
    fadeBg: string;
  }
> = {
  amber: {
    name: "Golden Amber",
    bg: "bg-[#241e17] dark:bg-[#1f1912]",
    border: "border-[#8a6834]/40 hover:border-[#c99c4e]/70",
    text: "text-[#f5e6d0]",
    tape: "bg-[#d8a85a]/25 border-[#d8a85a]/40",
    accent: "text-[#d8a85a]",
    glow: "shadow-[0_8px_30px_rgb(201,156,78,0.12)]",
    fadeBg: "from-[#241e17] via-[#241e17]/85 to-transparent",
  },
  charcoal: {
    name: "Obsidian Silence",
    bg: "bg-[#18181b] dark:bg-[#121214]",
    border: "border-border/80 hover:border-foreground/50",
    text: "text-foreground",
    tape: "bg-white/15 border-white/20",
    accent: "text-foreground/80",
    glow: "shadow-[0_8px_30px_rgb(0,0,0,0.35)]",
    fadeBg: "from-[#18181b] via-[#18181b]/85 to-transparent",
  },
  sage: {
    name: "Zen Sage",
    bg: "bg-[#16201b] dark:bg-[#111915]",
    border: "border-[#4e7d63]/40 hover:border-[#6da685]/70",
    text: "text-[#e0ede5]",
    tape: "bg-[#6da685]/20 border-[#6da685]/35",
    accent: "text-[#7ec29a]",
    glow: "shadow-[0_8px_30px_rgb(110,166,133,0.1)]",
    fadeBg: "from-[#16201b] via-[#16201b]/85 to-transparent",
  },
  indigo: {
    name: "Midnight Void",
    bg: "bg-[#151a28] dark:bg-[#101420]",
    border: "border-[#4d6394]/40 hover:border-[#718ec7]/70",
    text: "text-[#dce4f5]",
    tape: "bg-[#718ec7]/20 border-[#718ec7]/35",
    accent: "text-[#8aa7e3]",
    glow: "shadow-[0_8px_30px_rgb(113,142,199,0.1)]",
    fadeBg: "from-[#151a28] via-[#151a28]/85 to-transparent",
  },
  rose: {
    name: "Dusk Terracotta",
    bg: "bg-[#251719] dark:bg-[#1d1214]",
    border: "border-[#8f4f58]/40 hover:border-[#bf6e7a]/70",
    text: "text-[#fae4e7]",
    tape: "bg-[#bf6e7a]/20 border-[#bf6e7a]/35",
    accent: "text-[#db838f]",
    glow: "shadow-[0_8px_30px_rgb(191,110,122,0.1)]",
    fadeBg: "from-[#251719] via-[#251719]/85 to-transparent",
  },
  ivory: {
    name: "Antique Parchment",
    bg: "bg-[#22211f] dark:bg-[#1c1b18]",
    border: "border-[#968e7d]/40 hover:border-[#c4baaa]/70",
    text: "text-[#ede7dc]",
    tape: "bg-[#c4baaa]/20 border-[#c4baaa]/35",
    accent: "text-[#c4baaa]",
    glow: "shadow-[0_8px_30px_rgb(196,186,170,0.1)]",
    fadeBg: "from-[#22211f] via-[#22211f]/85 to-transparent",
  },
};

const MOOD_ICONS: Record<NoteMood, { label: string; icon: string }> = {
  insight: { label: "Insight", icon: "⚡" },
  inquiry: { label: "Inquiry", icon: "🪞" },
  stillness: { label: "Stillness", icon: "🕯️" },
  quote: { label: "Pointer", icon: "📜" },
  cosmos: { label: "Cosmos", icon: "🌌" },
};

const NEW_USER_NOTE_IDS = [
  "note-still-manifesto",
  "note-groundless-ground",
  "note-indian-philosophy-code",
  "note-vasana-reinforcement",
  "user-samadhi-shunyata",
  "note-a-ka-tha",
  "note-brahma-satyam",
  "note-binary-bodhi",
  "note-gap-in-conversation",
  "note-daily-return",
  "note-meeting-sensation",
];

const DEFAULT_NOTES: StickyNote[] = [
  {
    id: "note-groundless-ground",
    title: "Reality Has No Ground — This Is Still Point",
    content: `Reality has no ground.  
That is not a problem.  
It is the nature of what is.

In a world addicted to movement, reaction, and noise,  
STILL is the quiet recognition that the center does not need to move.

We do not chase.  
We do not perform.  
We do not demand a foundation that was never required.

We remain.  

No rush.  
No noise.  
Conviction, not reaction.

This is the groundless ground.  
This is Still Point.`,
    color: "amber",
    mood: "stillness",
    tags: ["stillness", "groundless", "still-point", "conviction", "presence"],
    isPinned: true,
    createdAt: Date.now(),
    rotation: 0.6,
  },
  {
    id: "note-still-manifesto",
    title: "STILL: The Contemporary Recognition",
    content: `STILL is the contemporary form of that same recognition.

1. The Ground is Not Missing
For thousands of years the human mind has searched for a foundation — a first cause, an ultimate substance, a final explanation that would hold everything up.
That search itself is the error.
What-Is has no ontological ground.  
The category of support does not apply.  
Groundlessness is not emptiness or lack.  
It is the very nature of reality.
The demand for a ground creates the position of the seeker standing outside, looking for something more fundamental.  
That outside position is impossible.  
Its dissolution is liberation.

2. The Accumulator
Most of human life is run by a subtle posture:  
the one who stands apart from experience in order to claim it, own it, defend it, or improve it.
This posture is the karmic accumulator. It is also the root of chronic stress, the continuous simulation of a separate self, and the endless cycle of reaction.
Action itself does not bind. The claiming of action binds.
When attention rests in prāṇa — the living pulse of the present moment as it is felt in the body — the accumulator-position finds no foothold.  
The action completes. The field continues. Nothing accumulates.
This is not a technique to achieve a future state. It is the direct recognition of what is already the case.

3. The Still Center and the Moving Field
The market moves. Thoughts move. Emotions move. Bodies move. Civilizations rise and fall.
STILL does not ask any of this to stop. It simply refuses to be dragged into the center of the movement.
The still center is not a special attainment. It is What-Is wholly present as this first-person locus — not a fragment, not a construction, not an error.
When the demand for an outside standpoint falls silent, what remains is presence without position.

4. What We Practice
We practice remaining.
We practice placing attention on the living texture of the now.  
We practice noticing the moment the claimer appears, and letting the claim dissolve.  
We practice sitting at the center of the moving field without needing to manage it.
This is not withdrawal. It is the most intimate participation possible:  
participation without the extra layer of the one who must control, improve, or survive the experience.

5. What STILL Is Not
STILL is not a promise of wealth, health, or spiritual attainment. It is not a new belief system. It is not a personality cult. It is not an escape from the world.
It is the simple, rigorous, and ancient recognition that the ground was never required, and that the still center has always been available.

6. The Invitation
You do not need to believe anything. You do not need to become anyone.  
Simply notice: the market is moving. The mind is moving. The world is moving.
And something remains.
That something is not a thing. It is the groundless ground itself, appearing as this exact moment of awareness.

Welcome to Still Point.
No rush. No noise. Just presence.

STILL — Built for conviction, not reaction.`,
    color: "charcoal",
    mood: "stillness",
    tags: ["stillness", "manifesto", "accumulator", "prana", "presence", "still-point"],
    isPinned: true,
    createdAt: Date.now() - 1000 * 60 * 1,
    rotation: -1.0,
  },
  {
    id: "note-indian-philosophy-code",
    title: "The Computational Hierarchy of Indian Philosophy",
    content: `1. Kashmir Shaivism
Like Advaita, it is completely non-dual. But instead of calling the universe an illusion, it views reality as the vibrant, radiant, self-luminous expression of the Absolute. It doesn't delete the world; it swallows it whole.

2. Advaita Vedānta
1 - 1 = 0. There are no boundaries; individual souls and the Absolute are identical. The material universe is just a rendering error. Flawless reductionism, but it deletes the beauty of the code.

3. Sāṃkhya, Dvaita, Viśiṣṭādvaita
Sāṃkhya cleanly separates data (matter) from the processor (consciousness). Viśiṣṭādvaita beautifully models the cosmos as a single organism where we are the cells. Brilliant, but still bound by lines.

4. Nyāya, Vaiśeṣika, Carvāka
Essential hardware. Nyāya builds the logic gates; Vaiśeṣika maps the physical atoms for reality, but they mistake the system's syntax for its ultimate meaning.`,
    color: "indigo",
    mood: "cosmos",
    tags: ["shaivism", "advaita", "samkhya", "darshanas", "code", "non-duality"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 2,
    rotation: -1.3,
  },
  {
    id: "note-vasana-reinforcement",
    title: "Vasana Theory & Variable-Ratio Reinforcement",
    content: `B.F. Skinner's variable-ratio reinforcement is the closest Western behavioral-science cousin to what vasana theory described two thousand years earlier: the unpredictability of the reward is what makes the loop self-strengthening rather than self-extinguishing.

Craving arises → partial gratification → craving isn't resolved, it's primed → return visit
Each cycle strengthens the groove or the habit pathway
The relationship layer adds an emotional-attachment vasana on top of the sexual one, so you get two reinforcing loops instead of one — which is likely why parasocial engagement outperforms nudity alone as a revenue driver.

Tantra treats sexual energy as genuinely potent, worth cultivating and directing, not simply repressing or endlessly discharging.

Compulsive consumption of sexual content tends to escalate, not satisfy, and tends to correlate with scattered attention and diminished drive elsewhere.

Attention-economy platforms selling sexualized content aren't just extracting money for a service. They're operating a machine that is structurally identical to what contemplative traditions warned deepens bondage rather than resolves it — repetition without resolution, craving met with just enough gratification to regenerate itself. The "energy" being spent isn't well described as money-for-content; it's closer to attention and desire being harvested as the product, with the content itself functioning as the hook that keeps the loop running.`,
    color: "rose",
    mood: "insight",
    tags: ["vasanas", "skinner", "attention-economy", "tantra", "conditioning", "neuroscience"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 3,
    rotation: 1.1,
  },
  {
    id: "user-samadhi-shunyata",
    title: "Samadhi, Nirvana & Shunyata",
    content: `When you meditate, 
For a long period of time, { even time don't exist} 
Breath becomes more refined, 
More refined, 
and disappears, 
leaving just a still state, 
absolutely still, 
a state of awareness, 
with no sense of going forward, 
or backword, 

no sense of mind, 
no sense of body, 
no sense of breath, 
no sense of I, 
no sense of self, 
no sense of environment, 

Nothing Exists there, just nothingness. 
Void, Shunytha. 

and that is called Samadhi, Nirvana, Enlightment. 

However it is temporary, when we stops we again pullback to normality. 

But prolonged practice makes us to slide into that state very quickly without any efforts. 

Every humans are experiencing Nirvana Everyday, just not aware. 
Getting aware requires removing unwanted thoughts, 

mind should be purified, 
ego should be deminished, 
pure and complete concentration is required, 
Desires shoudn't be there. 
Thoughts shouldnt be there.`,
    color: "amber",
    mood: "stillness",
    tags: ["samadhi", "nirvana", "shunytha", "stillness", "breath", "meditation"],
    isPinned: true,
    createdAt: Date.now(),
    rotation: -0.8,
  },
  {
    id: "note-a-ka-tha",
    title: "A-KA-THA: The Triangle in Guru Chakra",
    content: `A-KA-THA is the triangle in the Guru Chakra, in which the entire creation is enclosed, symbolically it represents the Shabda-Brahman with its energies. It is also called Kama-kala.

At the corners of the triangle — Bindu of the Sun, Moon and Fire. 
From these three Bindu arise three Shakti, indicated by lines — these are the sides of the triangle. 
These three Shaktis — Vama, Jyestha and Raudri are will-power (iccha-shakti), knowledge (jnana-shakti) and action (kriya-shakti).
Brahma, Vishnu and Rudra, who are associated with three Gunas — rajas, sattva and tamas, are there with them.

The triangle lines also contain the entire matrix (Sanskrit letters (akshara), 
48 letters of the alphabet arise from three Bindu: 16 vowels, starting with "a", form the first line; 16 consonants, starting with "ka", form the second line, and the next 16 letters, starting with "tha", form the third line. Therefore, the triangle is called A-KA-THA. In the three inner corners of the triangle, there are the letters ha, la, ksha. This varna matrix that arises from their bindu is the body of the Kula-Kundalini.`,
    color: "indigo",
    mood: "cosmos",
    tags: ["tantra", "kama-kala", "shabda-brahman", "guru-chakra", "kundalini", "sanskrit"],
    isPinned: true,
    createdAt: Date.now() - 1000 * 60 * 2,
    rotation: 1.2,
  },
  {
    id: "note-brahma-satyam",
    title: "Brahma Satyam Jagat Mithya & The Philosophical Schools",
    content: `SHRUTI says BRAHMAN is real and world is illusory.

The LOKAYATAS --> World is real and BRAHMAN is unreal
The MADHYAMIKAS --> Both are unreal
The DVAITINS --> Both are real
The ADVAITINS --> BRAHMAN is real, world is illusory

The LOKAYATAS == CHARVAKAS >> Followers of doctrines of Brihaspati >> accept only perception { PRATYAKSHA } as PRAMANA.

The MADHYAMIKAS == disciples of Buddha, accept SHRUTI as PRAMANA 

The DVAITINS == VISHISHTADVAITA, SHUDDHADVAITA`,
    color: "charcoal",
    mood: "inquiry",
    tags: ["advaita", "brahman", "pramana", "lokayata", "madhyamika", "dvaita"],
    isPinned: true,
    createdAt: Date.now() - 1000 * 60 * 5,
    rotation: -1.5,
  },
  {
    id: "note-binary-bodhi",
    title: "What Binary Bodhi Actually Means",
    content: `I have been using the phrase Binary Bodhi for several years now. It has attracted a particular kind of misreading that I want to address.

The misreading is that it proposes a reconciliation: a clever synthesis of the technical mind and the spiritual mind, the digital and the contemplative, the builder and the meditator. That it says: you can have both. The code and the silence, held together.

That is not quite it.

Binary means two. Zero and one. Not one thing pretending to be two things. Actually two: the code that runs and the silence in which the code runs. The form and the formless. The wave and the ocean. The character in the story and the awareness in which the character appears.

Bodhi means awake. Clear seeing. Not a permanent state; the word doesn’t describe a destination. It describes a quality of meeting.

What I mean by Binary Bodhi is not the romantic notion that being a meditating technologist is a spiritually superior position. I don’t believe that. I mean something more specific and less flattering: the recognition that both registers are real, that neither cancels the other, and that the work of being fully human in the current age involves holding both without collapsing the tension between them.

At two in the morning, deep in a problem, there is no awareness of awareness. There is the problem and the movement toward it. The self that the rest of the book is concerned with has no relevance here. It is simply the moment and what needs to happen in it.

At four in the morning, sitting quietly while the problem has been set down, the problem is still real but the person who had the problem has become difficult to locate. The awareness that is present is not the person’s awareness. It is awareness, with no possessive.

These two experiences happen in the same body, in the same life, within hours of each other. They do not resolve into a unified experience. They are what they are. Both true. Neither final.

I no longer try to merge them. I no longer try to bring the contemplative awareness into the work, or the work into the silence. I let them be what they are.

This is the architecture: not synthesis, but the capacity to inhabit both without needing either to be the whole story.

One eye on the work. One eye on the ground in which the work is appearing.

Not as a technique. As the honest description of how it actually is.`,
    color: "amber",
    mood: "insight",
    tags: ["binary-bodhi", "craft", "awareness", "duality", "contemplation"],
    isPinned: true,
    createdAt: Date.now() - 1000 * 60 * 10,
    rotation: 0.8,
  },
  {
    id: "note-gap-in-conversation",
    title: "The Gap in Conversation",
    content: `1. Choose one conversation today, ideally one where something real is at stake emotionally. Not an argument, just an interaction that matters.

2. At some point in the conversation, before responding, take one breath. Literally one. Not as a pause technique, as a moment of genuine noticing: what is happening in me right now?

3. Notice whether the impulse to respond is coming from the content of what was said, or from what it means about you, about your worth, your position, your story.

4. You don’t have to change what you say. Just notice the source before you speak.

5. After the conversation, sit for two minutes. Notice what it felt like to have that small gap. Whether the conversation felt different from inside. Whether anything was less defended.

6. Do this once per day for a week. Not perfectly, once per day, one breath, one honest noticing. The gap is not about better performance. It is the practice of being present to what is actually happening rather than what the story says is happening.`,
    color: "sage",
    mood: "stillness",
    tags: ["practice", "presence", "speech", "listening", "inquiry"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 15,
    rotation: -1.1,
  },
  {
    id: "note-daily-return",
    title: "The Daily Return — A Simple Structure",
    content: `1. MORNING (5 minutes): Sit quietly before the day begins. Don’t meditate for a state. Just sit. Notice that you are here. Notice the room. Notice the breath without controlling it. Notice that awareness is already present before you’ve done anything to create it.

2. DURING THE DAY — one pause per hour, or as close as you can manage: Stop. Take one breath that is slower than your current breathing. Notice the body. Notice where you are. Not as a technique for calm. As a brief orientation to what is actually here, before the story about what is here.

3. MEETING CONTRACTION: When you notice the self tightening around something, a criticism, a disappointment, an uncertainty, pause before responding. Ask: what is this? Not as a philosophical inquiry. As direct sensation. Where is it in the body? Stay with the sensation for thirty seconds before deciding what the story says about it.

4. EVENING (5 minutes): Sit quietly again. Not to review the day. To let the day be over. Notice what remains when the activity stops. Don’t try to hold the noticing. Let it be what it is.

5. CONSISTENCY: The value of this structure is not in any individual session. It is in the daily return. The body learns what receives regular, consistent attention. A brief, consistent practice over months changes the default more reliably than an intense occasional retreat.`,
    color: "ivory",
    mood: "stillness",
    tags: ["daily-return", "routine", "meditation", "somatic", "practice"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 20,
    rotation: 1.4,
  },
  {
    id: "note-meeting-sensation",
    title: "Meeting Sensation Directly",
    content: `1. Sit comfortably. Close the eyes or soften the gaze downward.

2. Take a few breaths and let the body arrive in the room. Notice the weight of the body where it rests.

3. Now, scan for any area of the body where there is tension, discomfort, or tightness. Don’t search for something dramatic; even mild constriction will do.

4. Place your attention on the sensation itself. Not on the story about why it’s there. Not on what it means. On the actual physical sensation: its location, texture, temperature, quality.

5. Stay with it for thirty seconds to a minute. If the mind produces a story (”this is my anxiety about X”), notice that the story is there and return to the raw sensation.

6. Notice whether the sensation remains exactly the same over the minute, or whether it shifts, moves, intensifies, dissolves, or changes character. You are not trying to make it change. You are simply observing whether it does.

7. After a minute or two, open the eyes and sit quietly for a moment. Notice the quality of the room, whether there is any difference in how present or available it feels.

8. Do this regularly. Not as emergency intervention when overwhelmed, but as ordinary maintenance, the way you might clean your teeth. The regularity matters more than any individual session.`,
    color: "rose",
    mood: "stillness",
    tags: ["somatic", "sensation", "body-scan", "vipassana", "tension"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 25,
    rotation: -0.6,
  },
  {
    id: "seed-1",
    title: "The Ground Before Thought",
    content:
      "Before any concept arises: Who is aware? Not the thinker, but the boundless, unmoving space in which the thinker appears.",
    color: "charcoal",
    mood: "inquiry",
    tags: ["self-inquiry", "awareness", "witness"],
    isPinned: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    rotation: -1.2,
  },
  {
    id: "seed-2",
    title: "Market Motion vs. The Witness",
    content:
      "The marketplace moves at blinding speed — charts, volatility, headlines, greed, fear. Yet the witness has not moved a single millimeter since eternity.",
    color: "sage",
    mood: "stillness",
    tags: ["volatility", "witness", "still-point"],
    isPinned: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    rotation: 1.5,
  },
  {
    id: "seed-3",
    title: "Nisargadatta on Love & Wisdom",
    content:
      "“Wisdom tells me I am nothing. Love tells me I am everything. Between the two, my life flows effortlessly.”\n— I Am That",
    color: "ivory",
    mood: "quote",
    tags: ["nisargadatta", "wisdom", "love"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 18,
    rotation: -0.8,
  },
  {
    id: "seed-4",
    title: "The Breath Pause",
    content:
      "Notice the pause at the end of the exhalation, right before the body chooses to breathe in again. In that pregnant gap, there is no biography and no future.",
    color: "sage",
    mood: "stillness",
    tags: ["prana", "breath", "kumbhaka"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    rotation: 1.8,
  },
  {
    id: "seed-5",
    title: "The Mirror and the Reflection",
    content:
      "The mirror never retains the image. Fire does not burn it, blood does not stain it. Everything passes through without leaving a scratch on Pure Awareness.",
    color: "indigo",
    mood: "insight",
    tags: ["non-duality", "mirror", "spanda"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 36,
    rotation: -1.7,
  },
  {
    id: "seed-6",
    title: "Longchenpa's Direct Instruction",
    content:
      "“Since everything is but an apparition, perfect in being what it is, having nothing to do with good or bad, acceptance or rejection, one may well burst out in laughter.”",
    color: "rose",
    mood: "cosmos",
    tags: ["dzogchen", "longchenpa", "laughter"],
    isPinned: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    rotation: 0.9,
  },
];

function StickyJournal() {
  const [notes, setNotes] = useState<StickyNote[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("stillpoint_sticky_journal_notes");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const missingNotes = DEFAULT_NOTES.filter(
              (def) =>
                NEW_USER_NOTE_IDS.includes(def.id) &&
                !parsed.some((p: StickyNote) => p.id === def.id),
            );
            if (missingNotes.length > 0) {
              return [...missingNotes, ...parsed];
            }
            return parsed;
          }
        }
      } catch {}
    }
    return DEFAULT_NOTES;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMood, setActiveMood] = useState<NoteMood | "all">("all");
  const [activeTag, setActiveTag] = useState<string | "all">("all");
  const [activeColor, setActiveColor] = useState<NoteColor | "all">("all");
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"corkboard" | "linear">("corkboard");

  // Active Modals & Focus State
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<StickyNote | null>(null);
  const [focusedNote, setFocusedNote] = useState<StickyNote | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [readerFontSize, setReaderFontSize] = useState<"sm" | "base" | "lg">("base");

  // Esc key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (focusedNote) setFocusedNote(null);
        if (editingNote) setEditingNote(null);
        if (isCreating) setIsCreating(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedNote, editingNote, isCreating]);

  // New Note Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newColor, setNewColor] = useState<NoteColor>("amber");
  const [newMood, setNewMood] = useState<NoteMood>("insight");
  const [newTagsInput, setNewTagsInput] = useState("");
  const [newIsPinned, setNewIsPinned] = useState(false);

  // Persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("stillpoint_sticky_journal_notes", JSON.stringify(notes));
      } catch {}
    }
  }, [notes]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => set.add(t.toLowerCase().trim())));
    return Array.from(set).sort();
  }, [notes]);

  // Filtered and sorted notes
  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return notes
      .filter((note) => {
        if (pinnedOnly && !note.isPinned) return false;
        if (activeMood !== "all" && note.mood !== activeMood) return false;
        if (activeColor !== "all" && note.color !== activeColor) return false;
        if (activeTag !== "all" && !note.tags.map((t) => t.toLowerCase()).includes(activeTag)) {
          return false;
        }
        if (q) {
          const matchTitle = note.title?.toLowerCase().includes(q) || false;
          const matchContent = note.content.toLowerCase().includes(q);
          const matchTag = note.tags.some((t) => t.toLowerCase().includes(q));
          return matchTitle || matchContent || matchTag;
        }
        return true;
      })
      .sort((a, b) => {
        // Pinned notes always surface to the top
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.createdAt - a.createdAt;
      });
  }, [notes, searchQuery, activeMood, activeTag, activeColor, pinnedOnly]);

  // Add Note Handler
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const tags = newTagsInput
      .split(/[,\s]+/)
      .map((t) => t.replace(/^#/, "").trim().toLowerCase())
      .filter((t) => t.length > 0);

    const randomRotation = Number(((Math.random() - 0.5) * 3.2).toFixed(1));

    const note: StickyNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: newTitle.trim() || undefined,
      content: newContent.trim(),
      color: newColor,
      mood: newMood,
      tags: tags.length > 0 ? tags : ["contemplation"],
      isPinned: newIsPinned,
      createdAt: Date.now(),
      rotation: randomRotation,
    };

    setNotes((prev) => [note, ...prev]);

    // Reset Form
    setNewTitle("");
    setNewContent("");
    setNewTagsInput("");
    setNewIsPinned(false);
    setIsCreating(false);
  };

  // Toggle Pin
  const togglePin = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n)));
  };

  // Delete Note
  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm("Remove this journal note?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (focusedNote?.id === id) setFocusedNote(null);
      if (editingNote?.id === id) setEditingNote(null);
    }
  };

  // Copy Note Text
  const handleCopy = (note: StickyNote, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const text = `${note.title ? `${note.title}\n\n` : ""}${note.content}\n\n${note.tags
      .map((t) => `#${t}`)
      .join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Quick Change Color
  const handleColorChange = (id: string, color: NoteColor, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, color } : n)));
  };

  // Save Edit
  const handleSaveEdit = (updated: StickyNote) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setEditingNote(null);
    if (focusedNote?.id === updated.id) setFocusedNote(updated);
  };

  // Reset to default seed notes
  const handleResetDefaults = () => {
    if (window.confirm("Reset your board back to the curated contemplations?")) {
      setNotes(DEFAULT_NOTES);
    }
  };

  // Export Notes
  const handleExportJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `stillpoint-journal-notes-${new Date().toISOString().slice(0, 10)}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Relative Time Formatter
  const formatTimeAgo = (ts: number) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Editorial Header */}
      <section className="container-editorial pt-20 pb-12 border-b border-border">
        <Breadcrumbs items={[{ label: "Journal & Field Notes" }]} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-75">
                Contemplative Notebook · Private & Stored Locally
              </span>
            </div>

            <h1 className="font-display italic text-4xl md:text-6xl text-balance">
              Journal & Field Notes
            </h1>

            <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed">
              Capture flashes of insight, direct pointings, moments of silence, or sayings from
              masters. Notes remain in your browser storage — untouched, unindexed, and private.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all shadow-lg hover-lift press-scale flex items-center gap-2"
            >
              <span>✦</span>
              <span>New Sticky Note</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="px-4 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground transition-colors"
              title="Download backup"
            >
              📥 Backup
            </button>
          </div>
        </div>

        {/* Board Status & Mood Filters */}
        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Mood Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveMood("all")}
              className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-widest uppercase transition-all ${
                activeMood === "all"
                  ? "bg-foreground text-background font-medium"
                  : "border border-border/80 hover:bg-surface opacity-70 hover:opacity-100"
              }`}
            >
              All ({notes.length})
            </button>

            {(Object.keys(MOOD_ICONS) as NoteMood[]).map((m) => {
              const count = notes.filter((n) => n.mood === m).length;
              const isActive = activeMood === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setActiveMood(m)}
                  className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-foreground text-background font-medium shadow-sm"
                      : "border border-border/80 hover:bg-surface opacity-70 hover:opacity-100"
                  }`}
                >
                  <span>{MOOD_ICONS[m].icon}</span>
                  <span>{MOOD_ICONS[m].label}</span>
                  <span className="opacity-50 text-[9px]">({count})</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setPinnedOnly(!pinnedOnly)}
              className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                pinnedOnly
                  ? "bg-accent text-white font-medium shadow-sm"
                  : "border border-border/80 hover:bg-surface opacity-70 hover:opacity-100"
              }`}
            >
              <span>📌</span>
              <span>Pinned ({notes.filter((n) => n.isPinned).length})</span>
            </button>
          </div>

          {/* Search Input & Layout Mode */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search notes or #tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-1.5 pl-8 font-mono text-xs bg-surface/50 border border-border rounded focus:outline-none focus:border-foreground transition-colors"
              />
              <span className="absolute left-2.5 top-2 text-xs opacity-40">🔍</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1.5 font-mono text-xs opacity-50 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="border border-border rounded flex items-center overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode("corkboard")}
                className={`px-2.5 py-1.5 text-xs transition-colors ${
                  viewMode === "corkboard"
                    ? "bg-foreground text-background"
                    : "hover:bg-surface opacity-60"
                }`}
                title="Tactile Corkboard Grid"
              >
                ⊞
              </button>
              <button
                type="button"
                onClick={() => setViewMode("linear")}
                className={`px-2.5 py-1.5 text-xs transition-colors ${
                  viewMode === "linear"
                    ? "bg-foreground text-background"
                    : "hover:bg-surface opacity-60"
                }`}
                title="Clean Linear Stream"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Tag Pills Filter Cloud */}
        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2">
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 mr-1">
              Filter Tag:
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? "all" : tag)}
                className={`px-2 py-0.5 rounded font-mono text-[9px] transition-colors ${
                  activeTag === tag
                    ? "bg-accent text-white font-medium"
                    : "bg-surface/40 hover:bg-surface opacity-60 hover:opacity-100 border border-border/50"
                }`}
              >
                #{tag}
              </button>
            ))}
            {(activeTag !== "all" || activeMood !== "all" || pinnedOnly || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveTag("all");
                  setActiveMood("all");
                  setPinnedOnly(false);
                  setSearchQuery("");
                }}
                className="font-mono text-[9px] uppercase text-accent ml-2 hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* Main Sticky Notes Board */}
      <main className="container-editorial py-14">
        {filteredNotes.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-border rounded-xl space-y-4 my-8 bg-surface/10">
            <div className="text-4xl opacity-40">🪞</div>
            <h3 className="font-display text-2xl">The Board is Empty</h3>
            <p className="font-sans text-sm opacity-60 max-w-md mx-auto">
              No notes match your active filters. Clear your filters, or pin a new reflection to the
              board.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveMood("all");
                  setActiveTag("all");
                  setPinnedOnly(false);
                }}
                className="px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="px-4 py-2 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent"
              >
                + Create Note
              </button>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "corkboard"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-4"
                : "max-w-2xl mx-auto space-y-6 pt-4"
            }
          >
            {filteredNotes.map((note) => {
              const colorStyle = COLOR_MAP[note.color] || COLOR_MAP.amber;
              const moodInfo = MOOD_ICONS[note.mood] || MOOD_ICONS.insight;
              const isRotated = viewMode === "corkboard" && typeof note.rotation === "number";

              return (
                <div
                  key={note.id}
                  onClick={() => setFocusedNote(note)}
                  style={{
                    transform: isRotated ? `rotate(${note.rotation}deg)` : undefined,
                  }}
                  className={`group relative p-6 md:p-7 rounded-xl border cursor-pointer transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:z-20 hover:shadow-2xl ${
                    colorStyle.bg
                  } ${colorStyle.border} ${colorStyle.text} ${colorStyle.glow} flex flex-col justify-between overflow-hidden ${
                    viewMode === "corkboard" ? "h-[340px]" : "h-[260px]"
                  }`}
                >
                  {/* Frosted Washi Tape Strip at Top */}
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-xs backdrop-blur-md border rotate-[-1.5deg] pointer-events-none transition-transform group-hover:rotate-0 ${
                      colorStyle.tape
                    }`}
                  />

                  {/* Pinned Thumbtack Badge */}
                  {note.isPinned && (
                    <div
                      className="absolute -top-2 right-4 w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xs shadow-md z-10"
                      title="Pinned note"
                    >
                      📌
                    </div>
                  )}

                  {/* Top Bar: Mood Icon & Date */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span>{moodInfo.icon}</span>
                      <span
                        className={`text-[10px] tracking-wider uppercase font-semibold ${colorStyle.accent}`}
                      >
                        {moodInfo.label}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] opacity-45">
                      {formatTimeAgo(note.createdAt)}
                    </span>
                  </div>

                  {/* Note Body Content with Gradient Fade Out */}
                  <div className="relative flex-1 overflow-hidden my-3">
                    {note.title && (
                      <h3 className="font-display text-base md:text-[17px] font-semibold leading-snug tracking-tight mb-2 line-clamp-2">
                        {note.title}
                      </h3>
                    )}

                    <p className="font-sans text-xs md:text-[13px] opacity-80 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>

                    {/* Gradient Fade-Out & Click Prompt */}
                    <div
                      className={`absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t ${colorStyle.fadeBg} pointer-events-none flex items-end justify-between px-1 pb-0.5`}
                    >
                      <span
                        className={`font-mono text-[9px] tracking-widest uppercase font-semibold ${colorStyle.accent} opacity-85 group-hover:opacity-100 flex items-center gap-1 transition-opacity`}
                      >
                        <span>Open Note</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                      </span>
                      <span className="font-mono text-[9px] opacity-40">
                        {Math.max(1, Math.round(note.content.split(/\s+/).length / 180))}m read
                      </span>
                    </div>
                  </div>

                  {/* Bottom Footer: Tags & Quick Hover Actions */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 shrink-0">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] opacity-50 hover:opacity-100 transition-opacity"
                        >
                          #{tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="font-mono text-[9px] opacity-40">
                          +{note.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* Copy */}
                      <button
                        type="button"
                        onClick={(e) => handleCopy(note, e)}
                        className="p-1 rounded hover:bg-white/10 transition-colors text-xs font-mono"
                        title="Copy text"
                      >
                        {copiedId === note.id ? "✓" : "📋"}
                      </button>

                      {/* Pin Toggle */}
                      <button
                        type="button"
                        onClick={(e) => togglePin(note.id, e)}
                        className={`p-1 rounded hover:bg-white/10 transition-colors text-xs ${
                          note.isPinned ? "opacity-100" : "opacity-40 hover:opacity-100"
                        }`}
                        title={note.isPinned ? "Unpin" : "Pin to top"}
                      >
                        📌
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingNote(note);
                        }}
                        className="p-1 rounded hover:bg-white/10 transition-colors text-xs opacity-40 hover:opacity-100"
                        title="Edit note"
                      >
                        ✎
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(note.id, e)}
                        className="p-1 rounded hover:bg-red-500/20 text-red-400/60 hover:text-red-400 transition-colors text-xs"
                        title="Delete note"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Board Bottom Controls */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-60">
          <p>{notes.length} total reflections stored in local browser storage.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="hover:text-accent transition-colors underline"
            >
              Restore Curated Pointings
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={handleExportJson}
              className="hover:text-accent transition-colors underline"
            >
              Export JSON Backup
            </button>
          </div>
        </div>
      </main>

      {/* CREATE NOTE MODAL */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface/90 border border-border p-6 md:p-8 max-w-lg w-full rounded-xl shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="text-accent text-base">✦</span>
                <h3 className="font-display text-xl">New Journal Note</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="p-1 font-mono text-sm opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-4">
              {/* Note Title */}
              <div>
                <input
                  type="text"
                  placeholder="Note Title (Optional)..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 font-display text-lg bg-background border border-border rounded focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Note Content */}
              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your contemplation, quote, inquiry, or moment of stillness..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3.5 font-sans text-sm bg-background border border-border rounded focus:outline-none focus:border-accent transition-colors leading-relaxed"
                />
              </div>

              {/* Mood / Type Selector */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-widest uppercase opacity-60 block">
                  Mood / Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(MOOD_ICONS) as NoteMood[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setNewMood(m)}
                      className={`px-3 py-1.5 rounded font-mono text-xs transition-all flex items-center gap-1.5 ${
                        newMood === m
                          ? "bg-accent text-white font-medium shadow-sm"
                          : "border border-border hover:bg-background opacity-70"
                      }`}
                    >
                      <span>{MOOD_ICONS[m].icon}</span>
                      <span>{MOOD_ICONS[m].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatch Picker */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-widest uppercase opacity-60 block">
                  Parchment Tone
                </label>
                <div className="flex items-center gap-3">
                  {(Object.keys(COLOR_MAP) as NoteColor[]).map((c) => {
                    const col = COLOR_MAP[c];
                    const isSelected = newColor === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${col.bg} ${
                          isSelected
                            ? "border-accent scale-110 shadow-md ring-2 ring-accent/30"
                            : "border-border/60 hover:scale-105"
                        }`}
                        title={col.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Tags Input */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] tracking-widest uppercase opacity-60 block">
                  Tags (comma or space separated)
                </label>
                <input
                  type="text"
                  placeholder="#inquiry, #silence, #quote..."
                  value={newTagsInput}
                  onChange={(e) => setNewTagsInput(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-xs bg-background border border-border rounded focus:outline-none focus:border-accent"
                />
              </div>

              {/* Pin Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pin-note-checkbox"
                  checked={newIsPinned}
                  onChange={(e) => setNewIsPinned(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <label
                  htmlFor="pin-note-checkbox"
                  className="font-mono text-xs opacity-75 cursor-pointer"
                >
                  Pin to top of board
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent hover:text-white transition-colors"
                >
                  Pin Note ✦
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT NOTE MODAL */}
      {editingNote && (
        <div className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface/95 border border-border p-6 md:p-8 max-w-lg w-full rounded-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-xl">Edit Field Note</h3>
              <button
                type="button"
                onClick={() => setEditingNote(null)}
                className="p-1 font-mono text-sm opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editingNote);
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="Title (Optional)..."
                  value={editingNote.title || ""}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 font-display text-lg bg-background border border-border rounded focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  required
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  className="w-full p-3.5 font-sans text-sm bg-background border border-border rounded focus:outline-none focus:border-accent leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-widest uppercase opacity-60 block">
                  Mood
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(MOOD_ICONS) as NoteMood[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setEditingNote({ ...editingNote, mood: m })}
                      className={`px-3 py-1.5 rounded font-mono text-xs flex items-center gap-1.5 ${
                        editingNote.mood === m
                          ? "bg-accent text-white font-medium"
                          : "border border-border opacity-70"
                      }`}
                    >
                      <span>{MOOD_ICONS[m].icon}</span>
                      <span>{MOOD_ICONS[m].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] tracking-widest uppercase opacity-60 block">
                  Parchment Tone
                </label>
                <div className="flex items-center gap-3">
                  {(Object.keys(COLOR_MAP) as NoteColor[]).map((c) => {
                    const col = COLOR_MAP[c];
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setEditingNote({ ...editingNote, color: c })}
                        className={`w-7 h-7 rounded-full border-2 ${col.bg} ${
                          editingNote.color === c
                            ? "border-accent scale-110 ring-2 ring-accent/30"
                            : "border-border/60"
                        }`}
                        title={col.name}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] tracking-widest uppercase opacity-60 block">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editingNote.tags.join(", ")}
                  onChange={(e) =>
                    setEditingNote({
                      ...editingNote,
                      tags: e.target.value
                        .split(/[,\s]+/)
                        .map((t) => t.replace(/^#/, "").trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 font-mono text-xs bg-background border border-border rounded"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ZEN FOCUS CARD MODAL */}
      {focusedNote && (
        <div
          onClick={() => setFocusedNote(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-xl w-full p-8 md:p-12 rounded-2xl border shadow-2xl relative ${
              COLOR_MAP[focusedNote.color]?.bg || "bg-surface"
            } ${COLOR_MAP[focusedNote.color]?.border || "border-border"} ${
              COLOR_MAP[focusedNote.color]?.text || "text-foreground"
            }`}
          >
            {/* Top Close */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span>{MOOD_ICONS[focusedNote.mood]?.icon}</span>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                  {MOOD_ICONS[focusedNote.mood]?.label} · {formatTimeAgo(focusedNote.createdAt)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFocusedNote(null)}
                className="font-mono text-xs opacity-50 hover:opacity-100"
              >
                ✕ Close
              </button>
            </div>

            {/* Title */}
            {focusedNote.title && (
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 leading-tight">
                {focusedNote.title}
              </h2>
            )}

            {/* Body */}
            <p className="font-sans text-base md:text-lg opacity-90 leading-relaxed whitespace-pre-wrap mb-8">
              {focusedNote.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {focusedNote.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/10 opacity-75"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
