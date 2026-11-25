export type PortalRole = "FILMMAKER" | "ARTIST" | "VENUE_OWNER";
export type DemoApplicationReceipt = { reference: string; submittedAt: string };

export const demoAccounts: Record<PortalRole, { label: string; email: string; password: string; name: string }> = {
  FILMMAKER: { label: "Filmmaker", email: "director@cinebridge.demo", password: "Cinema@2026", name: "Arun Prakash" },
  ARTIST: { label: "Artist", email: "artist@cinebridge.demo", password: "Cinema@2026", name: "Kavya Raman" },
  VENUE_OWNER: { label: "Event Partner", email: "venue@cinebridge.demo", password: "Cinema@2026", name: "Meena Studios" },
};

export const auditions = [
  { id: "marudham", name: "Marudham — A Tamil Feature Film", role: "Lead Actress · Meera", type: "Feature film", image: "/posters/marudham.jpg", city: "Chennai", language: "Tamil", age: "22–30", date: "Dec 08, 2026", fee: "Free", deadline: "Dec 02", description: "A rooted drama about a young agricultural scientist returning to her native village. The production is looking for a performer fluent in Tamil with strong emotional range. Screen test at a Chennai studio.", skills: ["Acting", "Tamil", "Emotional range"], color: "from-rose-950 via-red-950 to-stone-950" },
  { id: "isaikuyil", name: "Isaikuyil — Independent Music Video", role: "Dancers · Ensemble", type: "Music video", image: "/posters/isaikuyil.jpg", city: "Coimbatore", language: "Tamil", age: "18–32", date: "Dec 12, 2026", fee: "Free", deadline: "Dec 06", description: "A contemporary folk fusion video celebrating Kongu culture. Seeking trained dancers for a two-day shoot. Folk and contemporary experience are welcome.", skills: ["Dance", "Folk", "Movement"], color: "from-amber-950 via-orange-950 to-stone-950" },
  { id: "vadamalli", name: "Vadamalli — Limited Series", role: "Supporting Artist · Selvam", type: "Web series", image: "/posters/vadamalli.jpg", city: "Madurai", language: "Tamil", age: "30–48", date: "Dec 16, 2026", fee: "Free", deadline: "Dec 10", description: "A character-driven mystery series set in the streets of Madurai. Looking for a grounded performer with a natural Madurai Tamil dialect. Audition scenes are provided after shortlisting.", skills: ["Acting", "Dialect", "Theatre"], color: "from-indigo-950 via-slate-950 to-stone-950" },
  { id: "kaatru", name: "Kaatru — Travel Brand Campaign", role: "Models · 2 openings", type: "Advertisement", image: "/posters/kaatru.jpg", city: "Chennai", language: "Tamil / English", age: "20–35", date: "Dec 19, 2026", fee: "Free", deadline: "Dec 14", description: "A travel and lifestyle campaign shooting across Tamil Nadu's coast. Selected talent will receive the project brief and confirmed day rate before accepting.", skills: ["Modelling", "On-camera", "Tamil"], color: "from-cyan-950 via-slate-950 to-stone-950" },
  { id: "therukoothu", name: "Therukoothu — Documentary Short", role: "Voice artist · Narrator", type: "Short film", image: "/posters/therukoothu.jpg", city: "Thanjavur", language: "Tamil", age: "25–60", date: "Dec 22, 2026", fee: "Free", deadline: "Dec 16", description: "An independent documentary preserving the art of street theatre. Seeking a warm, expressive Tamil voice for a recorded narration session.", skills: ["Voice", "Narration", "Tamil"], color: "from-emerald-950 via-teal-950 to-stone-950" },
  { id: "nizhal", name: "Nizhal — Crime Drama", role: "Cinematographer", type: "Feature film", image: "/posters/nizhal.jpg", city: "Tiruchirappalli", language: "Tamil", age: "All ages", date: "Jan 05, 2027", fee: "Free", deadline: "Dec 28", description: "An independent crime drama is inviting cinematographers to share a reel and join a creative conversation with the director and producer.", skills: ["Cinematography", "Lighting", "Colour"], color: "from-violet-950 via-fuchsia-950 to-stone-950" },
];

export const artists = [
  { id: "kavya-raman", name: "Kavya Raman", role: "Actor · Dancer", city: "Chennai", languages: "Tamil, English, Malayalam", skills: ["Screen acting", "Bharatanatyam", "Dialect"], initials: "KR", color: "bg-rose-950" },
  { id: "aravind-kumar", name: "Aravind Kumar", role: "Actor · Theatre artist", city: "Madurai", languages: "Tamil, English", skills: ["Theatre", "Comedy", "Madurai dialect"], initials: "AK", color: "bg-blue-950" },
  { id: "nithya-s", name: "Nithya S.", role: "Playback singer · Voice artist", city: "Coimbatore", languages: "Tamil, Kannada, English", skills: ["Playback", "Carnatic", "Voice-over"], initials: "NS", color: "bg-emerald-950" },
  { id: "surya-dev", name: "Surya Dev", role: "Cinematographer", city: "Chennai", languages: "Tamil, Telugu, English", skills: ["Cinematography", "Colour grading", "Lighting"], initials: "SD", color: "bg-amber-950" },
  { id: "priya-mani", name: "Priya Mani", role: "Model · Actor", city: "Salem", languages: "Tamil, English", skills: ["Commercial", "Print", "Screen acting"], initials: "PM", color: "bg-violet-950" },
  { id: "vijay-anand", name: "Vijay Anand", role: "Editor · Assistant director", city: "Tiruchirappalli", languages: "Tamil, English", skills: ["Editing", "Storyboarding", "DaVinci Resolve"], initials: "VA", color: "bg-teal-950" },
];

export const venues = [
  { id: "meenakshi-stage", name: "Meenakshi Stage & Studio", city: "Chennai", category: "Film studio", image: "/venues/meenakshi-stage.jpg", imageAlt: "Camera filming performers on a dimly lit indoor set", imageCredit: "Nirvana Studios - Custom Circus", imageSource: "https://commons.wikimedia.org/wiki/File:Camera_set-up_for_the_indoor_filming.jpg", imageLicense: "CC BY 4.0", imageLicenseUrl: "https://creativecommons.org/licenses/by/4.0/", capacity: 120, rate: 3500, rating: "4.9", features: ["Cyclorama", "Lighting grid", "Makeup room"], initials: "MS", color: "from-amber-950 to-red-950" },
  { id: "vaigai-auditorium", name: "Vaigai Arts Auditorium", city: "Madurai", category: "Auditorium", image: "/venues/vaigai-auditorium.jpg", imageAlt: "Performers rehearsing together on a theatre stage", imageCredit: "Rakvereteater", imageSource: "https://commons.wikimedia.org/wiki/File:A_rehearsal_in_Rakvere_Theatre%27s_main_stage,_2014..jpg", imageLicense: "CC BY-SA 3.0", imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", capacity: 240, rate: 5000, rating: "4.8", features: ["Stage", "Green room", "Parking"], initials: "VA", color: "from-indigo-950 to-slate-900" },
  { id: "kongu-creative", name: "Kongu Creative House", city: "Coimbatore", category: "Photography studio", image: "/venues/kongu-creative.jpg", imageAlt: "Film crew shooting a scene beside a railway carriage", imageCredit: "Cecimercy Wanza (Ceci)", imageSource: "https://commons.wikimedia.org/wiki/File:Real_Strike_Studios_Film_crew_on_set_(2024).jpg", imageLicense: "CC0", imageLicenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", capacity: 45, rate: 2200, rating: "4.7", features: ["Natural light", "Soundproof", "AC"], initials: "KC", color: "from-emerald-950 to-teal-950" },
  { id: "cauvery-convention", name: "Cauvery Convention Hall", city: "Tiruchirappalli", category: "Event hall", image: "/venues/cauvery-convention.jpg", imageAlt: "A film crew and lighting rig on a Pinewood Studios set", imageCredit: "Ministry of Information Photo Division Photographer", imageSource: "https://commons.wikimedia.org/wiki/File:Coastal_Command-_the_Production_of_a_Ministry_of_Information_Film_at_Pinewood_Studios,_Iver_Heath,_Buckinghamshire,_England,_UK,_March_1942_D7204.jpg", imageLicense: "Public domain", imageLicenseUrl: "", capacity: 180, rate: 3000, rating: "4.6", features: ["Parking", "Projector", "Accessible"], initials: "CC", color: "from-rose-950 to-stone-900" },
  { id: "thanjai-open-air", name: "Thanjai Open-Air Courtyard", city: "Thanjavur", category: "Outdoor location", image: "/venues/thanjai-open-air.jpg", imageAlt: "Camera crew filming outdoors at a race track", imageCredit: "Don Ramey Logan", imageSource: "https://commons.wikimedia.org/wiki/File:Behind_the_Scene_Cameras_4_5_and_6_by_Don_Ramey_Logan_2.jpg", imageLicense: "CC BY-SA 4.0", imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", capacity: 80, rate: 1800, rating: "4.8", features: ["Heritage setting", "Power", "Changing room"], initials: "TO", color: "from-orange-950 to-amber-950" },
  { id: "yercaud-picture", name: "Yercaud Picture House", city: "Salem", category: "Production space", image: "/venues/yercaud-picture.jpg", imageAlt: "A production camera and lighting rig set up outdoors", imageCredit: "Tessa Bury", imageSource: "https://commons.wikimedia.org/wiki/File:Field_Production_Lighting_and_Camera_Rig_2.jpg", imageLicense: "CC BY 4.0", imageLicenseUrl: "https://creativecommons.org/licenses/by/4.0/", capacity: 60, rate: 2400, rating: "4.7", features: ["Hill views", "Green room", "Equipment"], initials: "YP", color: "from-sky-950 to-blue-950" },
];

export const tamilNaduCities = ["All cities", "Chennai", "Madurai", "Coimbatore", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Thanjavur", "Dindigul", "Vellore", "Kanyakumari"];

export function getStoredSession(): { role: PortalRole; name: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("cinebridge_demo_session");
    return stored ? JSON.parse(stored) as { role: PortalRole; name: string } : null;
  } catch {
    return null;
  }
}

export function setStoredSession(role: PortalRole, name: string) {
  localStorage.setItem("cinebridge_demo_session", JSON.stringify({ role, name }));
  window.dispatchEvent(new Event("cinebridge-session-change"));
}

export function clearStoredSession() {
  localStorage.removeItem("cinebridge_demo_session");
  window.dispatchEvent(new Event("cinebridge-session-change"));
}

export function dashboardForRole(role: PortalRole) {
  return `/dashboard/${role.toLowerCase().replace("_", "-")}`;
}

export function createDemoReference(kind: "APP" | "BKG") {
  return `CB-${kind}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}
