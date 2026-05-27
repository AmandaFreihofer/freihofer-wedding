import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gnyyrbcafszyfqymmsjz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueXlyYmNhZnN6eWZxeW1tc2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDYzMDAsImV4cCI6MjA5NTM4MjMwMH0.jBsBu4RhRYG9Uu8EosnnVjYX93x9cVB4YRQR2r5UIL8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tabs = ["Welcome", "Events", "RSVP", "Accommodations", "Registry"];
const ADMIN_PASSWORD = "freihofer2027";

const initialRegistry = [];

const initialWeddingDetails = {
  coupleDisplayName: "Future Mr. & Mrs. Freihofer",
  coupleFullNames: "Charles Freihofer & Amanda Esposito",
  weddingDateDisplay: "April 17, 2027",
  ceremonyTimeDisplay: "4:30 PM",
  weddingDateTime: "2027-04-17T16:30:00",
  venueName: "Harbour House",
  venueAddressLine1: "1901 Jimmy Buffett Memorial Highway",
  venueAddressLine2: "Indian Harbour Beach, FL 32937",
  welcomeHeadline: "Tides are changing...We’re getting married!",
  welcomeMessage:
    "Please join us for a weekend of sunsets, sea breeze, cocktails and seaside I do's. We cannot wait to celebrate this next chapter with you.",
  eventsIntro: "Everything guests need to know for the ceremony, reception, attire, colors, and dinner.",
  cocktailHourDisplay: "5:15 PM",
  receptionNote: "Dinner and dancing to follow",
  attire: "Upscale coastal cocktail. Linen, light suits, maxi dresses, and comfortable shoes are encouraged.",
  colorTheme: "Sea glass, warm sand, ivory, driftwood brown, sage, and ocean blues.",
  food: "Passed coastal bites, seasonal salad, herb-roasted chicken, local seafood, vegetarian pasta, and late-night s'mores.",
  accommodationsIntro: "Our favorite places to stay close to the venue.",
  accommodation1Name: "The Dune House Inn",
  accommodation1Description: "Boutique coastal inn, 0.4 miles from the venue, breakfast included.",
  accommodation2Name: "Harborlight Hotel",
  accommodation2Description: "Waterfront rooms, pool, shuttle-friendly location, 1.2 miles away.",
  accommodation3Name: "Saltgrass Cottages",
  accommodation3Description: "Private cottages for families or groups, full kitchens, 2 miles away.",
  registryIntro: "Keep track of which gifts are purchased and available.",
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #bcd7e3, transparent 32%), radial-gradient(circle at bottom right, #d8c2a8, transparent 34%), linear-gradient(135deg, #f3efe7, #eef5f1)",
    color: "#2f2b26",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  container: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "24px",
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    background: "rgba(255,255,255,0.72)",
    borderRadius: "999px",
    padding: "8px",
    boxShadow: "0 10px 30px rgba(79, 124, 149, 0.12)",
  },
  navButton: {
    border: "none",
    borderRadius: "999px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
  },
  card: {
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(176,139,104,0.25)",
    borderRadius: "28px",
    padding: "24px",
    boxShadow: "0 18px 45px rgba(79, 124, 149, 0.12)",
  },
  gradientCard: {
    background: "linear-gradient(135deg, #4f7c95, #6f9b8f, #b08b68)",
    color: "white",
    borderRadius: "28px",
    padding: "24px",
    boxShadow: "0 18px 45px rgba(79, 124, 149, 0.18)",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d6c7b5",
    borderRadius: "16px",
    padding: "12px 14px",
    fontSize: "15px",
    background: "white",
  },
  primaryButton: {
    border: "none",
    borderRadius: "999px",
    background: "#4f7c95",
    color: "white",
    padding: "12px 18px",
    cursor: "pointer",
    fontWeight: 700,
  },
};

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <p style={{ color: "#5d7f6f", textTransform: "uppercase", letterSpacing: "0.28em", fontSize: 13 }}>{eyebrow}</p>
      <h2 style={{ fontSize: 42, margin: "8px 0", color: "#2f2b26" }}>{title}</h2>
      {children && <p style={{ maxWidth: 680, margin: "12px auto", color: "#6f665e", lineHeight: 1.7 }}>{children}</p>}
    </div>
  );
}

function DetailCard({ title, children }) {
  return (
    <div style={styles.card}>
      <h3 style={{ fontSize: 26, marginTop: 0, color: "#4f7c95" }}>{title}</h3>
      <div style={{ color: "#6f665e", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Welcome");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [registry, setRegistry] = useState(initialRegistry);
  const [registryItemName, setRegistryItemName] = useState("");
  const [registryStoreName, setRegistryStoreName] = useState("");
  const [registryLink, setRegistryLink] = useState("");
  const [weddingDetails, setWeddingDetails] = useState(initialWeddingDetails);
  const [heroPhoto, setHeroPhoto] = useState(
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80"
  );

  useEffect(() => {
    async function loadWeddingDetails() {
      const { data, error } = await supabase
        .from("wedding_details")
        .select("details")
        .eq("id", "main")
        .single();

      if (data?.details) {
        const mergedDetails = {
          ...initialWeddingDetails,
          ...data.details,
        };

        setWeddingDetails(mergedDetails);

        if (mergedDetails.heroPhoto) {
          setHeroPhoto(mergedDetails.heroPhoto);
        }
      }

      if (error) {
        console.error("Error loading wedding details:", error);
      }
    }

    loadWeddingDetails();

    async function loadGuests() {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("id", { ascending: true });

      if (data) {
        setGuests(data);
      }

      if (error) {
        console.error("Error loading RSVPs:", error);
      }
    }

    loadGuests();

    async function loadRegistry() {
      const { data, error } = await supabase
        .from("registry")
        .select("*")
        .order("id", { ascending: true });

      if (data) {
        setRegistry(data);
      }

      if (error) {
        console.error("Error loading registry:", error);
      }
    }

    loadRegistry();
  }, []);

  const handleHeroPhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("wedding-photos")
      .upload(fileName, file);

    if (uploadError) {
      alert("Photo upload failed. Please try again.");
      console.error(uploadError);
      return;
    }

    const { data } = supabase.storage
      .from("wedding-photos")
      .getPublicUrl(fileName);

    const publicUrl = data.publicUrl;
    setHeroPhoto(publicUrl);

    const updatedDetails = {
      ...weddingDetails,
      heroPhoto: publicUrl,
    };

    setWeddingDetails(updatedDetails);

    const { error: saveError } = await supabase
      .from("wedding_details")
      .update({ details: updatedDetails })
      .eq("id", "main");

    if (saveError) {
      alert("Photo uploaded, but saving it to the website failed.");
      console.error(saveError);
      return;
    }

    alert("Photo saved!");
  }; 

  const weddingDate = useMemo(() => new Date(weddingDetails.weddingDateTime), [weddingDetails.weddingDateTime]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = weddingDate.getTime() - Date.now();
      if (distance <= 0) return;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const updateWeddingDetail = (field, value) => {
    setWeddingDetails((details) => ({ ...details, [field]: value }));
  };

  const saveWeddingDetails = async () => {
    const { error } = await supabase
      .from("wedding_details")
      .update({ details: weddingDetails })
      .eq("id", "main");

    if (error) {
      alert("Something went wrong saving your changes.");
      console.error(error);
      return;
    }

    alert("Wedding details saved!");
  }; 

  const rsvpSummary = useMemo(() => {
    return {
      accepted: guests.filter((g) => g.status === "Accepted").reduce((sum, g) => sum + Number(g.party), 0),
      pending: guests.filter((g) => g.status === "Pending").length,
      declined: guests.filter((g) => g.status === "Declined").length,
    };
  }, [guests]);

  const addGuest = async () => {
    if (!guestName.trim()) return;

    const newGuest = {
      name: guestName.trim(),
      party: Number(partySize),
      status: "Pending",
    };

    const { data, error } = await supabase
      .from("rsvps")
      .insert([newGuest])
      .select();

    if (error) {
      alert("Failed to save RSVP.");
      console.error(error);
      return;
    }

    if (data) {
      setGuests([...guests, data[0]]);
    }

    setGuestName("");
    setPartySize(1);
  };

  const updateGuest = async (id, status) => {
    const { error } = await supabase
      .from("rsvps")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Failed to update RSVP.");
      console.error(error);
      return;
    }

    setGuests(guests.map((guest) => (guest.id === id ? { ...guest, status } : guest)));
  };

  const removeGuest = async (id) => {
    const { error } = await supabase
      .from("rsvps")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to remove RSVP.");
      console.error(error);
      return;
    }

    setGuests(guests.filter((guest) => guest.id !== id));
  };


  const toggleRegistry = async (id) => {
    const gift = registry.find((item) => item.id === id);
    if (!gift) return;

    const { error } = await supabase
      .from("registry")
      .update({ bought: !gift.bought })
      .eq("id", id);

    if (error) {
      alert("Failed to update registry item.");
      console.error(error);
      return;
    }

    setRegistry(registry.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item)));
  };

  const addRegistryItem = async () => {
    if (!registryItemName.trim()) {
      alert("Please enter an item name.");
      return;
    }

    const newItem = {
      item: registryItemName.trim(),
      store: registryStoreName.trim(),
      link: registryLink.trim(),
      bought: false,
    };

    const { data, error } = await supabase
      .from("registry")
      .insert([newItem])
      .select();

    if (error) {
      alert("Failed to add registry item.");
      console.error(error);
      return;
    }

    if (data) {
      setRegistry([...registry, data[0]]);
    }

    setRegistryItemName("");
    setRegistryStoreName("");
    setRegistryLink("");
  };

  const removeRegistryItem = async (id) => {
    const { error } = await supabase
      .from("registry")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to remove registry item.");
      console.error(error);
      return;
    }

    setRegistry(registry.filter((item) => item.id !== id));
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminUnlocked(true);
      setShowAdminLogin(false);
      setActiveTab("Admin");
      setAdminPassword("");
      return;
    }

    alert("Incorrect password.");
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    setActiveTab("Welcome");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 56px)",
              lineHeight: 1.08,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {weddingDetails.coupleDisplayName}
          </h1>

          <nav
            style={{
              ...styles.nav,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "900px",
              borderRadius: "34px",
              padding: "14px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.navButton,
                  background: activeTab === tab ? "#4f7c95" : "transparent",
                  color: activeTab === tab ? "white" : "#6f665e",
                  padding: "13px 20px",
                  fontSize: "17px",
                }}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={() => {
                if (isAdminUnlocked) {
                  setActiveTab("Admin");
                } else {
                  setShowAdminLogin(true);
                }
              }}
              style={{
                ...styles.navButton,
                background: activeTab === "Admin" ? "#4f7c95" : "transparent",
                color: activeTab === "Admin" ? "white" : "#6f665e",
                padding: "13px 20px",
                fontSize: "17px",
              }}
            >
              Admin
            </button>
          </nav>
        </header>

        {activeTab === "Welcome" && (
          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 36, alignItems: "center" }}>
            <div>
              <h2
                style={{
                  fontSize: "clamp(44px, 6.5vw, 72px)",
                  lineHeight: 1.18,
                  textAlign: "center",
                  margin: "10px 0 24px",
                  paddingBottom: "10px",
                  background: "linear-gradient(90deg, #4f7c95, #6f9b8f, #b08b68)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {weddingDetails.welcomeHeadline}
              </h2>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 18, lineHeight: 1.8, color: "#6f665e" }}>
                {weddingDetails.welcomeMessage}
              </p>

              <div style={{ ...styles.gradientCard, marginTop: 28 }}>
                <p style={{ textTransform: "uppercase", letterSpacing: "0.25em", fontSize: 13, marginTop: 0 }}>Countdown to Forever</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {[
                    [timeLeft.days, "Days"],
                    [timeLeft.hours, "Hours"],
                    [timeLeft.minutes, "Minutes"],
                    [timeLeft.seconds, "Seconds"],
                  ].map(([value, label]) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.14)", borderRadius: 18, padding: 14, textAlign: "center" }}>
                      <div style={{ fontSize: 34 }}>{value}</div>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...styles.card, marginTop: 24 }}>
                <p style={{ color: "#5d7f6f", textTransform: "uppercase", letterSpacing: "0.24em", fontSize: 12 }}>We request the honor of your presence</p>
                <h3 style={{ fontSize: 30, marginBottom: 8 }}>{weddingDetails.venueName}</h3>
                <p style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.7, color: "#6f665e" }}>
                  {weddingDetails.venueAddressLine1}<br />
                  {weddingDetails.venueAddressLine2}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    justifyContent: "center",
                    marginTop: 16,
                  }}
                >
                  <span style={{ background: "#d8e7ee", color: "#4f7c95", borderRadius: 999, padding: "9px 13px", fontFamily: "Arial, sans-serif" }}>{weddingDetails.weddingDateDisplay}</span>
                  <span style={{ background: "#ece4d8", color: "#6f665e", borderRadius: 999, padding: "9px 13px", fontFamily: "Arial, sans-serif" }}>Ceremony Begins at {weddingDetails.ceremonyTimeDisplay}</span>
                </div>
              </div>
            </div>

            <div style={{ borderRadius: 36, overflow: "hidden", boxShadow: "0 24px 55px rgba(79, 124, 149, 0.2)", background: "#d8c2a8" }}>
              <img
                src={heroPhoto}
                alt="Engagement placeholder"
                style={{ width: "100%", height: 560, objectFit: "cover", display: "block" }}
              />
            <div style={{ padding: 18, background: "rgba(255,255,255,0.78)", fontFamily: "Arial, sans-serif" }}>
                <label style={{ display: "inline-block", ...styles.primaryButton }}>
                  Choose Your Photo
                  <input type="file" accept="image/*" onChange={handleHeroPhotoUpload} style={{ display: "none" }} />
                </label>
                <p style={{ margin: "10px 0 0", color: "#6f665e", fontSize: 13 }}>
                  This updates the preview photo instantly.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Events" && (
          <section>
            <SectionTitle eyebrow="Wedding Day" title="Event Details">
              {weddingDetails.eventsIntro}
            </SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18 }}>
              <DetailCard title="Venue">{weddingDetails.venueName}<br />{weddingDetails.venueAddressLine1}<br />{weddingDetails.venueAddressLine2}</DetailCard>
              <DetailCard title="Time">Ceremony begins at {weddingDetails.ceremonyTimeDisplay}<br />Cocktail hour at {weddingDetails.cocktailHourDisplay}<br />{weddingDetails.receptionNote}</DetailCard>
              <DetailCard title="Attire">{weddingDetails.attire}</DetailCard>
              <DetailCard title="Color Theme">{weddingDetails.colorTheme}</DetailCard>
              <DetailCard title="Food">{weddingDetails.food}</DetailCard>
            </div>
          </section>
        )}

        {activeTab === "RSVP" && (
          <section>
            <SectionTitle eyebrow="Kindly Reply" title="RSVP">
              Please find your name below and let us know whether you’ll be joining us to celebrate.
            </SectionTitle>

            <div style={{ ...styles.card, maxWidth: 860, margin: "0 auto 28px", display: "grid", gap: 14 }}>
              <h3 style={{ margin: 0, fontSize: 28, color: "#4f7c95", textAlign: "center" }}>Guest RSVP</h3>
              <p style={{ margin: 0, textAlign: "center", color: "#6f665e", fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
                Your name and party size have already been added. Just choose your response below.
              </p>

              <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
                {guests.length === 0 && (
                  <p style={{ textAlign: "center", color: "#6f665e", fontFamily: "Arial, sans-serif" }}>
                    Guest list is not available yet.
                  </p>
                )}

                {guests.map((guest) => (
                  <div
                    key={guest.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      flexWrap: "wrap",
                      border: "1px solid rgba(176,139,104,0.25)",
                      borderRadius: 20,
                      padding: 16,
                      background: "rgba(255,255,255,0.62)",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, fontSize: 22 }}>{guest.name}</h4>
                      <p style={{ margin: "6px 0 0", color: "#6f665e", fontFamily: "Arial, sans-serif" }}>
                        Party of {guest.party} · Current response: {guest.status}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        onClick={() => updateGuest(guest.id, "Accepted")}
                        style={{
                          ...styles.navButton,
                          background: guest.status === "Accepted" ? "#4f7c95" : "#ece4d8",
                          color: guest.status === "Accepted" ? "white" : "#6f665e",
                          padding: "12px 18px",
                        }}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        onClick={() => updateGuest(guest.id, "Declined")}
                        style={{
                          ...styles.navButton,
                          background: guest.status === "Declined" ? "#4f7c95" : "#ece4d8",
                          color: guest.status === "Declined" ? "white" : "#6f665e",
                          padding: "12px 18px",
                        }}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SectionTitle eyebrow="Admin View" title="RSVP Tracker">
              Add guests manually, remove guests, and update RSVP statuses.
            </SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 18 }}>
              <div style={styles.card}><p>Accepted Guests</p><h3>{rsvpSummary.accepted}</h3></div>
              <div style={styles.card}><p>Pending Parties</p><h3>{rsvpSummary.pending}</h3></div>
              <div style={styles.card}><p>Declined Parties</p><h3>{rsvpSummary.declined}</h3></div>
            </div>
            <div style={{ ...styles.card, display: "grid", gridTemplateColumns: "1fr 100px auto", gap: 12, marginBottom: 18 }}>
              <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Guest name" style={styles.input} />
              <input type="number" min="1" value={partySize} onChange={(e) => setPartySize(e.target.value)} style={styles.input} />
              <button onClick={addGuest} style={styles.primaryButton}>Add Guest</button>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {guests.map((guest) => (
                <div key={guest.id} style={{ ...styles.card, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div><h3 style={{ margin: 0 }}>{guest.name}</h3><p>Party of {guest.party}</p></div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Accepted", "Pending", "Declined"].map((status) => (
                      <button key={status} onClick={() => updateGuest(guest.id, status)} style={{ ...styles.navButton, background: guest.status === status ? "#4f7c95" : "#ece4d8", color: guest.status === status ? "white" : "#6f665e" }}>{status}</button>
                    ))}
                    <button onClick={() => removeGuest(guest.id)} style={{ ...styles.navButton, background: "#f8d7da", color: "#842029" }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Accommodations" && (
          <section>
            <SectionTitle eyebrow="Nearby Stays" title="Accommodations">{weddingDetails.accommodationsIntro}</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18 }}>
              {[
                [weddingDetails.accommodation1Name, weddingDetails.accommodation1Description],
                [weddingDetails.accommodation2Name, weddingDetails.accommodation2Description],
                [weddingDetails.accommodation3Name, weddingDetails.accommodation3Description],
              ].map(([name, desc]) => <DetailCard key={name} title={name}>{desc}</DetailCard>)}
            </div>
          </section>
        )}

        {activeTab === "Registry" && (
          <section>
            <SectionTitle eyebrow="Thank You" title="Registry">{weddingDetails.registryIntro}</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {registry.length === 0 && (
                <div style={{ ...styles.card, textAlign: "center", gridColumn: "1 / -1" }}>
                  <p style={{ color: "#6f665e", fontFamily: "Arial, sans-serif" }}>Registry items will be added soon.</p>
                </div>
              )}

              {registry.map((gift) => (
                <div key={gift.id} style={{ ...styles.card, display: "grid", gap: 12 }}>
                  <div>
                    <h3 style={{ marginTop: 0 }}>{gift.item}</h3>
                    {gift.store && <p style={{ color: "#6f665e", fontFamily: "Arial, sans-serif" }}>{gift.store}</p>}
                    <strong style={{ color: gift.bought ? "#5d7f6f" : "#4f7c95" }}>
                      {gift.bought ? "Purchased" : "Available for Purchase"}
                    </strong>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {gift.link && (
                      <a
                        href={gift.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ ...styles.navButton, background: "#ece4d8", color: "#6f665e", textDecoration: "none", fontFamily: "Arial, sans-serif" }}
                      >
                        View Item
                      </a>
                    )}
                    <button onClick={() => toggleRegistry(gift.id)} style={styles.primaryButton}>
                      {gift.bought ? "Mark Available" : "Mark Purchased"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {showAdminLogin && (
          <section>
            <div style={{ ...styles.card, maxWidth: 520, margin: "0 auto", display: "grid", gap: 16, textAlign: "center" }}>
              <h2 style={{ margin: 0, fontSize: 34, color: "#4f7c95" }}>Admin Access</h2>
              <p style={{ margin: 0, color: "#6f665e", fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
                Enter the admin password to edit wedding details.
              </p>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdminLogin();
                }}
                placeholder="Admin password"
                style={styles.input}
              />
              <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                <button onClick={handleAdminLogin} style={styles.primaryButton}>Unlock Admin</button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword("");
                  }}
                  style={{ ...styles.navButton, background: "#ece4d8", color: "#6f665e" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Admin" && isAdminUnlocked && (
          <section>
            <SectionTitle eyebrow="Private Editing" title="Wedding Details Admin">Update the main website details here.</SectionTitle>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
              <button onClick={lockAdmin} style={{ ...styles.navButton, background: "#ece4d8", color: "#6f665e" }}>
                Lock Admin
              </button>
            </div>
            <div style={{ ...styles.card, maxWidth: 760, margin: "0 auto 28px", display: "grid", gap: 16 }}>
              {[
                ["coupleDisplayName", "Header Name"],
                ["coupleFullNames", "Full Names"],
                ["weddingDateDisplay", "Wedding Date"],
                ["ceremonyTimeDisplay", "Ceremony Time"],
                ["weddingDateTime", "Countdown Date/Time"],
                ["venueName", "Venue Name"],
                ["venueAddressLine1", "Venue Address Line 1"],
                ["venueAddressLine2", "Venue Address Line 2"],
                ["welcomeHeadline", "Welcome Headline"],
                ["eventsIntro", "Events Page Intro"],
                ["cocktailHourDisplay", "Cocktail Hour Time"],
                ["receptionNote", "Reception Note"],
                ["attire", "Attire"],
                ["colorTheme", "Color Theme"],
                ["food", "Food Being Served"],
                ["accommodationsIntro", "Accommodations Page Intro"],
                ["accommodation1Name", "Accommodation 1 Name"],
                ["accommodation1Description", "Accommodation 1 Description"],
                ["accommodation2Name", "Accommodation 2 Name"],
                ["accommodation2Description", "Accommodation 2 Description"],
                ["accommodation3Name", "Accommodation 3 Name"],
                ["accommodation3Description", "Accommodation 3 Description"],
                ["registryIntro", "Registry Page Intro"],
              ].map(([field, label]) => (
                <label key={field} style={{ display: "grid", gap: 6, fontFamily: "Arial, sans-serif", color: "#5d7f6f", fontWeight: 700 }}>
                  {label}
                  <input value={weddingDetails[field]} onChange={(e) => updateWeddingDetail(field, e.target.value)} style={styles.input} />
                </label>
              ))}
              <label style={{ display: "grid", gap: 6, fontFamily: "Arial, sans-serif", color: "#5d7f6f", fontWeight: 700 }}>
                Welcome Message
                <textarea value={weddingDetails.welcomeMessage} onChange={(e) => updateWeddingDetail("welcomeMessage", e.target.value)} rows={4} style={styles.input} />
              </label>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <button
                  onClick={saveWeddingDetails}
                  style={{ ...styles.primaryButton, padding: "14px 28px", fontSize: "16px" }}
                >
                  Save Wedding Details
                </button>
              </div>
            </div>

            <div style={{ ...styles.card, maxWidth: 760, margin: "28px auto 0", display: "grid", gap: 16 }}>
              <h3 style={{ margin: 0, fontSize: 28, color: "#4f7c95", textAlign: "center" }}>Registry Admin</h3>
              <p style={{ margin: 0, textAlign: "center", color: "#6f665e", fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
                Add or remove registry items here. Guests can mark items as purchased from the Registry page.
              </p>

              <label style={{ display: "grid", gap: 6, fontFamily: "Arial, sans-serif", color: "#5d7f6f", fontWeight: 700 }}>
                Item Name
                <input value={registryItemName} onChange={(e) => setRegistryItemName(e.target.value)} placeholder="Example: KitchenAid Mixer" style={styles.input} />
              </label>

              <label style={{ display: "grid", gap: 6, fontFamily: "Arial, sans-serif", color: "#5d7f6f", fontWeight: 700 }}>
                Store Name
                <input value={registryStoreName} onChange={(e) => setRegistryStoreName(e.target.value)} placeholder="Example: Amazon" style={styles.input} />
              </label>

              <label style={{ display: "grid", gap: 6, fontFamily: "Arial, sans-serif", color: "#5d7f6f", fontWeight: 700 }}>
                Purchase Link
                <input value={registryLink} onChange={(e) => setRegistryLink(e.target.value)} placeholder="https://..." style={styles.input} />
              </label>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={addRegistryItem} style={{ ...styles.primaryButton, padding: "14px 28px", fontSize: "16px" }}>
                  Add Registry Item
                </button>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {registry.map((gift) => (
                  <div key={gift.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", border: "1px solid rgba(176,139,104,0.25)", borderRadius: 18, padding: 14 }}>
                    <div>
                      <strong>{gift.item}</strong>
                      <p style={{ margin: "4px 0 0", color: "#6f665e", fontFamily: "Arial, sans-serif" }}>
                        {gift.store || "No store listed"} · {gift.bought ? "Purchased" : "Available"}
                      </p>
                    </div>
                    <button onClick={() => removeRegistryItem(gift.id)} style={{ ...styles.navButton, background: "#f8d7da", color: "#842029" }}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
