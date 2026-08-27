import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";

const PURPLE = "#8b7cff";
const BG = "#090b10";
const CARD = "#151821";
const CARD2 = "#181b24";
const TEXT = "#ffffff";
const MUTED = "#9da3b4";
const GREEN = "#45d483";
const RED = "#ff6b7a";
const BORDER = "#292d39";

const IDEAS = [
  {
    title: "Gaming Clip Package",
    category: "Gaming",
    customer: "Small gaming creators",
    problem:
      "Creators need more short-form content but don't have time to edit it.",
    product:
      "10 edited gaming clips ready for TikTok, YouTube Shorts, or Instagram Reels.",
    price: 59,
    premium: 133,
    recurring: 129,
    startup: 0,
    source: "TikTok, YouTube, Discord, gaming communities",
    skills: ["gaming", "editing", "content", "social media"],
  },
  {
    title: "Social Media Caption Service",
    category: "Content",
    customer: "Small businesses and creators",
    problem:
      "Businesses have pictures and videos but struggle to write posts.",
    product:
      "30 ready-to-post captions with hooks, calls to action, and hashtags.",
    price: 49,
    premium: 99,
    recurring: 79,
    startup: 0,
    source: "Facebook, Instagram, local business groups",
    skills: ["writing", "social media", "marketing"],
  },
  {
    title: "Local Business Lead Finder",
    category: "Marketing",
    customer: "Small businesses",
    problem:
      "Businesses need new customers but don't have time to find prospects.",
    product:
      "A researched list of potential customers and businesses to contact.",
    price: 59,
    premium: 129,
    recurring: 149,
    startup: 0,
    source: "Google, Facebook, local directories",
    skills: ["research", "organization", "sales"],
  },
  {
    title: "Facebook Marketplace Listing Service",
    category: "Sales",
    customer: "People selling items locally",
    problem:
      "People don't know how to create attractive Marketplace listings.",
    product:
      "Optimized titles, descriptions, pricing suggestions, and listing copy.",
    price: 39,
    premium: 79,
    recurring: 0,
    startup: 0,
    source: "Facebook Marketplace, local groups",
    skills: ["writing", "sales", "research"],
  },
  {
    title: "Resume Rewrite Service",
    category: "Career",
    customer: "Job seekers",
    problem:
      "People struggle to make their resumes clear and professional.",
    product:
      "A rewritten, organized resume customized to the customer's goals.",
    price: 49,
    premium: 99,
    recurring: 0,
    startup: 0,
    source: "Facebook, LinkedIn, local groups",
    skills: ["writing", "editing", "career"],
  },
  {
    title: "Job Application Helper",
    category: "Career",
    customer: "People looking for work",
    problem:
      "Applying to many jobs takes time and can become overwhelming.",
    product:
      "Help organizing applications, tailoring resumes, and preparing responses.",
    price: 39,
    premium: 89,
    recurring: 0,
    startup: 0,
    source: "Facebook groups, local communities",
    skills: ["writing", "organization", "research"],
  },
  {
    title: "Research Assistant Service",
    category: "Research",
    customer: "Students, creators, and small businesses",
    problem:
      "People need information researched but don't have time to gather it.",
    product:
      "A researched information packet organized into an easy-to-use document.",
    price: 49,
    premium: 119,
    recurring: 99,
    startup: 0,
    source: "Facebook, creator communities, freelance groups",
    skills: ["research", "writing", "organization"],
  },
  {
    title: "Product Description Writer",
    category: "Writing",
    customer: "Online sellers",
    problem:
      "Weak product descriptions can make products harder to sell.",
    product:
      "Professional product titles, descriptions, benefits, and calls to action.",
    price: 39,
    premium: 99,
    recurring: 89,
    startup: 0,
    source: "Facebook, Etsy communities, seller groups",
    skills: ["writing", "sales", "marketing"],
  },
  {
    title: "Marketplace Flipping Research",
    category: "Reselling",
    customer: "People who want to resell items",
    problem:
      "New sellers don't know what products are worth buying and reselling.",
    product:
      "Research on profitable local items, estimated resale prices, and demand.",
    price: 29,
    premium: 79,
    recurring: 59,
    startup: 0,
    source: "Facebook Marketplace, local groups",
    skills: ["research", "pricing", "reselling"],
  },
  {
    title: "Personal Errand Finder",
    category: "Service",
    customer: "Busy people",
    problem:
      "People don't have time to research services, prices, or local options.",
    product:
      "Research and comparison of local services based on the customer's needs.",
    price: 29,
    premium: 69,
    recurring: 49,
    startup: 0,
    source: "Facebook, local communities",
    skills: ["research", "organization", "communication"],
  },
  {
    title: "Digital Organization Service",
    category: "Organization",
    customer: "Busy individuals and small businesses",
    problem:
      "Files, notes, links, and information become difficult to manage.",
    product:
      "A cleaned-up and organized digital filing system.",
    price: 59,
    premium: 129,
    recurring: 49,
    startup: 0,
    source: "Facebook, local groups, referrals",
    skills: ["organization", "technology"],
  },
  {
    title: "AI Prompt Creation Service",
    category: "AI",
    customer: "Creators and small businesses",
    problem:
      "People want to use AI but don't know how to write effective prompts.",
    product:
      "Customized AI prompts for content, marketing, research, and business tasks.",
    price: 49,
    premium: 129,
    recurring: 99,
    startup: 0,
    source: "Facebook, Discord, creator communities",
    skills: ["AI", "writing", "research"],
  },
  {
    title: "Gaming Thumbnail Service",
    category: "Gaming",
    customer: "YouTubers and streamers",
    problem:
      "Creators need better thumbnails but don't have time to design them.",
    product:
      "10 custom thumbnails designed around the creator's videos and brand.",
    price: 49,
    premium: 99,
    recurring: 99,
    startup: 0,
    source: "YouTube, TikTok, Discord, creator communities",
    skills: ["gaming", "design", "YouTube", "editing"],
  },
  {
    title: "Short-Form Content Pack",
    category: "Content",
    customer: "Creators and small businesses",
    problem:
      "They need more short videos but don't know what to post.",
    product:
      "20 short-form content ideas with hooks, captions, and posting instructions.",
    price: 59,
    premium: 133,
    recurring: 129,
    startup: 0,
    source: "TikTok, Instagram, Facebook",
    skills: ["writing", "content", "social media"],
  },
  {
    title: "Social Media Starter Pack",
    category: "Marketing",
    customer: "Local businesses",
    problem:
      "Small businesses struggle to keep their social media active.",
    product:
      "30 posts with captions, hooks, hashtags, and a simple posting calendar.",
    price: 79,
    premium: 159,
    recurring: 149,
    startup: 0,
    source: "Facebook, Instagram, local business groups",
    skills: ["marketing", "writing", "social media"],
  },
  {
    title: "Local Business Flyer Pack",
    category: "Design",
    customer: "Restaurants and local shops",
    problem:
      "Businesses need promotional graphics but don't have a designer.",
    product:
      "10 promotional flyers optimized for social media and printing.",
    price: 69,
    premium: 149,
    recurring: 99,
    startup: 0,
    source: "Facebook, local groups, direct outreach",
    skills: ["design", "marketing"],
  },
  {
    title: "Restaurant Social Pack",
    category: "Food",
    customer: "Restaurants and food trucks",
    problem:
      "Food businesses need constant promotional content.",
    product:
      "15 social posts featuring specials, menus, promotions, and calls to action.",
    price: 89,
    premium: 179,
    recurring: 149,
    startup: 0,
    source: "Facebook, Instagram, local food groups",
    skills: ["food", "design", "marketing"],
  },
  {
    title: "Real Estate Content Pack",
    category: "Real Estate",
    customer: "Real estate agents",
    problem:
      "Agents need consistent social content to generate leads.",
    product:
      "20 real estate posts with captions, hooks, and calls to action.",
    price: 99,
    premium: 199,
    recurring: 179,
    startup: 0,
    source: "Facebook, Instagram, realtor groups",
    skills: ["real estate", "content", "marketing"],
  },
  {
    title: "Small Business Logo Kit",
    category: "Design",
    customer: "New small businesses",
    problem:
      "New businesses need professional branding without agency prices.",
    product:
      "Logo concept, profile image, cover image, and basic brand colors.",
    price: 89,
    premium: 179,
    recurring: 49,
    startup: 0,
    source: "Facebook, local groups, Instagram",
    skills: ["design", "branding"],
  },
  {
    title: "Digital Menu Design",
    category: "Food",
    customer: "Restaurants and food trucks",
    problem:
      "Old menus look unprofessional and are difficult to update.",
    product:
      "A clean digital menu optimized for phones and social media.",
    price: 59,
    premium: 119,
    recurring: 39,
    startup: 0,
    source: "Local Facebook groups and direct outreach",
    skills: ["design", "food"],
  },
  {
    title: "Pet Business Content Pack",
    category: "Pets",
    customer: "Pet groomers and pet businesses",
    problem:
      "Pet businesses need engaging content to attract local customers.",
    product:
      "20 social posts with captions and promotional ideas.",
    price: 69,
    premium: 139,
    recurring: 119,
    startup: 0,
    source: "Facebook, Instagram, local groups",
    skills: ["pets", "content", "social media"],
  },
  {
    title: "Auto Dealer Social Pack",
    category: "Automotive",
    customer: "Small car dealerships",
    problem:
      "Dealerships need frequent vehicle promotions.",
    product:
      "20 vehicle promotion graphics with captions and calls to action.",
    price: 99,
    premium: 199,
    recurring: 179,
    startup: 0,
    source: "Facebook, local dealer groups",
    skills: ["automotive", "design", "marketing"],
  },
];

function money(value) {
  return `$${Number(value || 0).toLocaleString()}`;
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function SectionTitle({ icon, children }) {
  return (
    <Text style={styles.sectionTitle}>
      {icon} {children}
    </Text>
  );
}

function ActionButton({ title, onPress, secondary = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, secondary && styles.buttonSecondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function Step({ number, text, completed = false, onPress }) {
  return (
    <TouchableOpacity
      style={styles.step}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.stepNumber,
          completed && styles.stepNumberComplete,
        ]}
      >
        <Text style={styles.stepNumberText}>
          {completed ? "✓" : number}
        </Text>
      </View>

      <Text
        style={[
          styles.stepText,
          completed && styles.stepTextComplete,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

function NavButton({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity
      style={styles.navButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.navIcon, active && styles.navActive]}>
        {icon}
      </Text>

      <Text style={[styles.navLabel, active && styles.navActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [screen, setScreen] = useState("ideas");
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("0");
  const [goal, setGoal] = useState("1500");
  const [category, setCategory] = useState("All");

  // Launch dashboard data
  const [prospects, setProspects] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: "",
      contacted: false,
      sold: false,
    }))
  );

  const categories = [
    "All",
    "🔥 $0 STARTUP",
    ...new Set(IDEAS.map((x) => x.category)),
  ];

  const filteredIdeas = useMemo(() => {
    return IDEAS.filter((idea) => {
      const searchText =
        `${idea.title} ${idea.category} ${idea.customer} ${idea.product}`.toLowerCase();

      const matchesSearch =
        !search ||
        searchText.includes(search.toLowerCase());

      const matchesCategory =
        category === "All"
          ? true
          : category === "🔥 $0 STARTUP"
          ? idea.startup === 0
          : idea.category === category;

      const matchesBudget =
        Number(budget || 0) >= idea.startup;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBudget
      );
    });
  }, [search, category, budget]);

  const monthlySales = selectedIdea
    ? Math.ceil(
        Number(goal || 1500) / selectedIdea.price
      )
    : 0;

  const projectedRevenue = selectedIdea
    ? monthlySales * selectedIdea.price
    : 0;

  const contactedCount = prospects.filter(
    (p) => p.contacted
  ).length;

  const soldCount = prospects.filter(
    (p) => p.sold
  ).length;

  const actualRevenue = selectedIdea
    ? soldCount * selectedIdea.price
    : 0;

  const revenueProgress =
    Number(goal || 1500) > 0
      ? Math.min(
          actualRevenue / Number(goal || 1500),
          1
        )
      : 0;

  const outreachProgress =
    contactedCount / 10;

  function forge(idea) {
    setSelectedIdea(idea);
    setScreen("forge");
  }

  function startBusiness() {
    if (!selectedIdea) return;

    setScreen("launch");
  }

  function toggleSaved(idea) {
    const exists = saved.some(
      (x) => x.title === idea.title
    );

    if (exists) {
      setSaved(
        saved.filter(
          (x) => x.title !== idea.title
        )
      );
    } else {
      setSaved([...saved, idea]);
    }
  }

  function updateProspectName(id, name) {
    setProspects((current) =>
      current.map((prospect) =>
        prospect.id === id
          ? { ...prospect, name }
          : prospect
      )
    );
  }

  function toggleContacted(id) {
    setProspects((current) =>
      current.map((prospect) =>
        prospect.id === id
          ? {
              ...prospect,
              contacted: !prospect.contacted,
            }
          : prospect
      )
    );
  }

  function toggleSold(id) {
    setProspects((current) =>
      current.map((prospect) =>
        prospect.id === id
          ? {
              ...prospect,
              sold: !prospect.sold,
              contacted: true,
            }
          : prospect
      )
    );
  }

  function showPitch() {
    if (!selectedIdea) return;

    const pitch =
      `I help ${selectedIdea.customer.toLowerCase()} ` +
      `who need ${selectedIdea.category.toLowerCase()} help. ` +
      `I create ${selectedIdea.product.toLowerCase()} ` +
      `for ${money(selectedIdea.price)}. ` +
      `Would you like to see an example?`;

    Alert.alert(
      "YOUR SALES PITCH",
      pitch,
      [{ text: "OK" }]
    );
  }

  function resetProspects() {
    Alert.alert(
      "Reset Outreach?",
      "This will clear your 10 prospects and sales progress.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () =>
            setProspects(
              Array.from(
                { length: 10 },
                (_, index) => ({
                  id: index + 1,
                  name: "",
                  contacted: false,
                  sold: false,
                })
              )
            ),
        },
      ]
    );
  }

  function renderIdeas() {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            ⚒ FORGED BUSINESS
          </Text>

          <Text style={styles.heroTitle}>
            Build a business from what you have.
          </Text>

          <Text style={styles.heroText}>
            Find businesses you can start with little
            or no money and turn your available skills
            into income.
          </Text>
        </View>

        <Card>
          <Text style={styles.label}>
            MONTHLY INCOME GOAL
          </Text>

          <TextInput
            value={goal}
            onChangeText={setGoal}
            keyboardType="numeric"
            placeholder="1500"
            placeholderTextColor={MUTED}
            style={styles.input}
          />

          <Text
            style={[
              styles.label,
              { marginTop: 16 },
            ]}
          >
            MONEY AVAILABLE TO START
          </Text>

          <TextInput
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={MUTED}
            style={styles.input}
          />

          <Text style={styles.budgetNote}>
            Set this to $0 to see businesses requiring
            no startup money.
          </Text>
        </Card>

        <SectionTitle icon="🔎">
          FIND YOUR BUSINESS
        </SectionTitle>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search ideas..."
          placeholderTextColor={MUTED}
          style={styles.search}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 18 }}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.category,
                category === item &&
                  styles.categoryActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item &&
                    styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <SectionTitle icon="💡">
          {filteredIdeas.length} BUSINESS IDEAS
        </SectionTitle>

        {filteredIdeas.map((idea) => (
          <Card key={idea.title}>
            <View style={styles.ideaHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.ideaCategory}>
                  {idea.category}
                </Text>

                <Text style={styles.ideaTitle}>
                  {idea.title}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  toggleSaved(idea)
                }
              >
                <Text style={styles.star}>
                  {saved.some(
                    (x) =>
                      x.title === idea.title
                  )
                    ? "★"
                    : "☆"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.startupBadge}>
              <Text style={styles.startupBadgeText}>
                {idea.startup === 0
                  ? "✓ $0 STARTUP"
                  : `${money(
                      idea.startup
                    )} STARTUP`}
              </Text>
            </View>

            <Text style={styles.muted}>
              {idea.customer}
            </Text>

            <Text style={styles.problem}>
              {idea.problem}
            </Text>

            <View style={styles.priceRow}>
              <View>
                <Text style={styles.smallLabel}>
                  STARTING PRICE
                </Text>

                <Text style={styles.price}>
                  {money(idea.price)}
                </Text>
              </View>

              <View>
                <Text style={styles.smallLabel}>
                  PREMIUM
                </Text>

                <Text style={styles.priceSmall}>
                  {money(idea.premium)}
                </Text>
              </View>
            </View>

            <ActionButton
              title="⚒ FORGE THIS BUSINESS"
              onPress={() => forge(idea)}
            />
          </Card>
        ))}

        {filteredIdeas.length === 0 && (
          <Card>
            <Text style={styles.emptyTitle}>
              No businesses found
            </Text>

            <Text style={styles.muted}>
              Try increasing your available startup
              money or changing the category.
            </Text>
          </Card>
        )}
      </ScrollView>
    );
  }

  function renderForge() {
    if (!selectedIdea) {
      return renderIdeas();
    }

    const idea = selectedIdea;

    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setScreen("ideas")}
        >
          <Text style={styles.backText}>
            ‹ BACK TO BUSINESS
          </Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>
          🚀 BUSINESS LAUNCH
        </Text>

        <Text style={styles.forgeTitle}>
          {idea.title}
        </Text>

        <Text style={styles.heroText}>
          Your business is ready to launch. Follow
          the plan below to turn the idea into your
          first customer.
        </Text>

        <Card style={styles.readyCard}>
          <Text style={styles.readyIcon}>
            🚀
          </Text>

          <Text style={styles.readyTitle}>
            YOU'RE READY TO START
          </Text>

          <Text style={styles.readyText}>
            Start small. Create the offer. Find your
            first customer. Deliver the result. Then
            repeat.
          </Text>
        </Card>

        <SectionTitle icon="🎯">
          YOUR FIRST CUSTOMER
        </SectionTitle>

        <Card>
          <Step
            number="1"
            text={`Create one sample of your ${idea.product.toLowerCase()}`}
          />

          <Step
            number="2"
            text={`Create your offer at ${money(
              idea.price
            )}.`}
          />

          <Step
            number="3"
            text={`Find potential customers through ${idea.source}.`}
          />

          <Step
            number="4"
            text="Contact your first 10 potential customers."
          />

          <Step
            number="5"
            text="Ask directly for the first sale."
          />
        </Card>

        <ActionButton
          title="🚀 START TODAY"
          onPress={startBusiness}
        />

        <ActionButton
          title="📋 VIEW FULL BUSINESS PLAN"
          secondary
          onPress={() => setScreen("fullplan")}
        />

        <ActionButton
          title={
            saved.some(
              (x) =>
                x.title === idea.title
            )
              ? "★ REMOVE FROM SAVED"
              : "☆ SAVE THIS BUSINESS"
          }
          secondary
          onPress={() =>
            toggleSaved(idea)
          }
        />
      </ScrollView>
    );
  }

  function renderFullPlan() {
    if (!selectedIdea) {
      return renderIdeas();
    }

    const idea = selectedIdea;

    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setScreen("forge")}
        >
          <Text style={styles.backText}>
            ‹ BACK TO LAUNCH
          </Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>
          ⚒ FORGED BUSINESS
        </Text>

        <Text style={styles.forgeTitle}>
          {idea.title}
        </Text>

        <Text style={styles.heroText}>
          Complete business plan for launching this
          offer and building it into recurring income.
        </Text>

        <Card>
          <Text style={styles.cardLabel}>
            💵 STARTUP
          </Text>

          <Text style={styles.startupBig}>
            {idea.startup === 0
              ? "$0"
              : money(idea.startup)}
          </Text>

          <Text style={styles.muted}>
            {idea.startup === 0
              ? "You can begin without spending money."
              : "Estimated starting investment."}
          </Text>
        </Card>

        <Card>
          <Text style={styles.cardLabel}>
            🎯 CUSTOMER
          </Text>

          <Text style={styles.bigCardText}>
            {idea.customer}
          </Text>
        </Card>

        <Card>
          <Text style={styles.cardLabel}>
            ❗ THE PROBLEM
          </Text>

          <Text style={styles.bigCardText}>
            {idea.problem}
          </Text>
        </Card>

        <Card>
          <Text style={styles.cardLabel}>
            📦 EXACT PRODUCT
          </Text>

          <Text style={styles.bigCardText}>
            {idea.product}
          </Text>
        </Card>

        <SectionTitle icon="💰">
          PRICING LADDER
        </SectionTitle>

        <Card>
          <DetailRow
            label="Starter"
            value={money(idea.price)}
          />

          <DetailRow
            label="Premium"
            value={money(idea.premium)}
          />

          {idea.recurring > 0 && (
            <DetailRow
              label="Recurring"
              value={`${money(
                idea.recurring
              )}/month`}
            />
          )}
        </Card>

        <SectionTitle icon="🎯">
          YOUR INCOME GOAL
        </SectionTitle>

        <Card style={styles.goalCard}>
          <Text style={styles.goalNumber}>
            {money(goal)}
          </Text>

          <Text style={styles.goalSub}>
            {monthlySales} sales/month
          </Text>

          <Text style={styles.goalSub}>
            {money(projectedRevenue)}
            {" "}projected revenue
          </Text>
        </Card>

        <SectionTitle icon="🚀">
          FIRST 7 DAYS
        </SectionTitle>

        <Card>
          <Step
            number="1"
            text="Create one finished product sample."
          />

          <Step
            number="2"
            text="Define exactly what the customer receives."
          />

          <Step
            number="3"
            text="Create a simple sales post."
          />

          <Step
            number="4"
            text={`Set the starting price at ${money(
              idea.price
            )}.`}
          />

          <Step
            number="5"
            text="Publish the offer where your customers can find it."
          />

          <Step
            number="6"
            text="Contact 10 potential customers."
          />

          <Step
            number="7"
            text="Ask directly for the first sale."
          />
        </Card>

        <SectionTitle icon="📈">
          30-DAY GROWTH
        </SectionTitle>

        <Card>
          <Step
            number="1"
            text="Collect your first customer feedback."
          />

          <Step
            number="2"
            text="Improve the offer based on feedback."
          />

          <Step
            number="3"
            text="Create three strong examples."
          />

          <Step
            number="4"
            text="Increase daily outreach."
          />

          <Step
            number="5"
            text="Create a repeatable delivery process."
          />

          <Step
            number="6"
            text="Add a premium version."
          />

          {idea.recurring > 0 && (
            <Step
              number="7"
              text={`Offer the recurring package at ${money(
                idea.recurring
              )}/month.`}
            />
          )}
        </Card>

        <SectionTitle icon="🛠">
          HOW TO DELIVER IT
        </SectionTitle>

        <Card>
          <Step
            number="1"
            text="Create the finished product."
          />

          <Step
            number="2"
            text="Customize it for the customer."
          />

          <Step
            number="3"
            text="Send the finished digital product."
          />

          <Step
            number="4"
            text="Ask for feedback."
          />

          <Step
            number="5"
            text="Turn your best version into a repeatable process."
          />
        </Card>

        <SectionTitle icon="📣">
          SALES PITCH
        </SectionTitle>

        <Card style={styles.pitchCard}>
          <Text style={styles.pitch}>
            "I help{" "}
            {idea.customer.toLowerCase()} who need{" "}
            {idea.category.toLowerCase()} help. I create{" "}
            {idea.product.toLowerCase()} for{" "}
            {money(idea.price)}. Would you like to see
            an example?"
          </Text>
        </Card>

        <ActionButton
          title="📣 SHOW SALES PITCH"
          onPress={showPitch}
        />

        <SectionTitle icon="📍">
          CUSTOMER SOURCES
        </SectionTitle>

        <Card>
          <Text style={styles.bigCardText}>
            {idea.source}
          </Text>
        </Card>

        <SectionTitle icon="🧠">
          SKILLS USED
        </SectionTitle>

        <View style={styles.skills}>
          {idea.skills.map((skill) => (
            <View
              style={styles.skill}
              key={skill}
            >
              <Text style={styles.skillText}>
                {skill}
              </Text>
            </View>
          ))}
        </View>

        <ActionButton
          title="🚀 START THIS BUSINESS"
          onPress={startBusiness}
        />
      </ScrollView>
    );
  }

  function renderLaunch() {
    if (!selectedIdea) {
      return renderIdeas();
    }

    const idea = selectedIdea;

    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setScreen("forge")}
        >
          <Text style={styles.backText}>
            ‹ BUSINESS PLAN
          </Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>
          🚀 BUSINESS LAUNCH
        </Text>

        <Text style={styles.launchTitle}>
          {idea.title}
        </Text>

        <Text style={styles.heroText}>
          This is your action center. Don't just read
          the plan — use it to get customers.
        </Text>

        {/* GOAL */}
        <SectionTitle icon="🎯">
          YOUR MONTHLY GOAL
        </SectionTitle>

        <Card style={styles.goalCard}>
          <Text style={styles.goalNumber}>
            {money(goal)}
          </Text>

          <Text style={styles.goalSub}>
            Target: {monthlySales} sales/month
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    Math.min(
                      soldCount /
                        Math.max(
                          monthlySales,
                          1
                        ),
                      1
                    ) * 100
                  }%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {soldCount} / {monthlySales} customers
          </Text>
        </Card>

        {/* REVENUE */}
        <SectionTitle icon="💰">
          REVENUE
        </SectionTitle>

        <Card>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {money(actualRevenue)}
              </Text>

              <Text style={styles.statLabel}>
                EARNED
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {soldCount}
              </Text>

              <Text style={styles.statLabel}>
                CUSTOMERS
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    revenueProgress * 100
                  }%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {money(actualRevenue)} / {money(goal)}
          </Text>
        </Card>

        {/* TODAY */}
        <SectionTitle icon="📈">
          TODAY'S MISSION
        </SectionTitle>

        <Card style={styles.missionCard}>
          <Text style={styles.missionTitle}>
            Get your first customer.
          </Text>

          <Text style={styles.missionText}>
            Start with 10 potential customers.
            Contact them, make the offer, and track
            what happens.
          </Text>

          <View style={styles.missionStats}>
            <Text style={styles.missionStat}>
              {contactedCount}/10 contacted
            </Text>

            <Text style={styles.missionStat}>
              {soldCount} sold
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    outreachProgress * 100
                  }%`,
                },
              ]}
            />
          </View>
        </Card>

        {/* SALES PITCH */}
        <SectionTitle icon="📣">
          YOUR SALES PITCH
        </SectionTitle>

        <Card style={styles.pitchCard}>
          <Text style={styles.pitch}>
            "I help{" "}
            {idea.customer.toLowerCase()} who need{" "}
            {idea.category.toLowerCase()} help. I create{" "}
            {idea.product.toLowerCase()} for{" "}
            {money(idea.price)}. Would you like to see
            an example?"
          </Text>

          <ActionButton
            title="📣 SHOW FULL PITCH"
            secondary
            onPress={showPitch}
          />
        </Card>

        {/* PROSPECTS */}
        <SectionTitle icon="👥">
          YOUR 10 PROSPECTS
        </SectionTitle>

        <Text style={styles.sectionHint}>
          Add the people or creators you want to
          contact. Then track each conversation.
        </Text>

        {prospects.map((prospect) => (
          <Card
            key={prospect.id}
            style={
              prospect.sold
                ? styles.soldCard
                : prospect.contacted
                ? styles.contactedCard
                : null
            }
          >
            <View style={styles.prospectHeader}>
              <View style={styles.prospectNumber}>
                <Text style={styles.prospectNumberText}>
                  {prospect.id}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.prospectTitle}>
                  Prospect #{prospect.id}
                </Text>

                <Text style={styles.prospectStatus}>
                  {prospect.sold
                    ? "CUSTOMER"
                    : prospect.contacted
                    ? "CONTACTED"
                    : "NOT CONTACTED"}
                </Text>
              </View>
            </View>

            <TextInput
              value={prospect.name}
              onChangeText={(text) =>
                updateProspectName(
                  prospect.id,
                  text
                )
              }
              placeholder="Creator / customer name"
              placeholderTextColor={MUTED}
              style={styles.prospectInput}
            />

            <View style={styles.prospectButtons}>
              <TouchableOpacity
                style={[
                  styles.smallButton,
                  prospect.contacted &&
                    styles.smallButtonActive,
                ]}
                onPress={() =>
                  toggleContacted(
                    prospect.id
                  )
                }
              >
                <Text style={styles.smallButtonText}>
                  {prospect.contacted
                    ? "✓ CONTACTED"
                    : "CONTACT"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.smallButton,
                  prospect.sold &&
                    styles.smallButtonSold,
                ]}
                onPress={() =>
                  toggleSold(prospect.id)
                }
              >
                <Text style={styles.smallButtonText}>
                  {prospect.sold
                    ? "✓ SOLD"
                    : "MARK SOLD"}
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <ActionButton
          title="📋 VIEW FULL BUSINESS PLAN"
          secondary
          onPress={() => setScreen("fullplan")}
        />

        <ActionButton
          title="🔄 RESET OUTREACH"
          secondary
          onPress={resetProspects}
        />

        <Card style={styles.bottomMission}>
          {soldCount > 0 ? (
            <>
              <Text style={styles.bottomMissionTitle}>
                🔥 YOU MADE A SALE
              </Text>

              <Text style={styles.bottomMissionText}>
                You have generated{" "}
                {money(actualRevenue)} from{" "}
                {soldCount} customer
                {soldCount === 1
                  ? ""
                  : "s"}.
                Keep going.
              </Text>
            </>
          ) : contactedCount > 0 ? (
            <>
              <Text style={styles.bottomMissionTitle}>
                ⚡ KEEP GOING
              </Text>

              <Text style={styles.bottomMissionText}>
                You've contacted{" "}
                {contactedCount} of 10 prospects.
                Finish your first outreach round.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.bottomMissionTitle}>
                🚀 START TODAY
              </Text>

              <Text style={styles.bottomMissionText}>
                Add your first prospect above and
                make your first offer.
              </Text>
            </>
          )}
        </Card>
      </ScrollView>
    );
  }

  function renderSaved() {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>
          Saved Businesses
        </Text>

        <Text style={styles.heroText}>
          Your business ideas are stored here for
          quick access.
        </Text>

        {saved.length === 0 ? (
          <Card>
            <Text style={styles.emptyIcon}>
              ☆
            </Text>

            <Text style={styles.emptyTitle}>
              Nothing saved yet.
            </Text>

            <Text style={styles.muted}>
              Save a business idea and it will appear
              here.
            </Text>
          </Card>
        ) : (
          saved.map((idea) => (
            <Card key={idea.title}>
              <Text style={styles.ideaCategory}>
                {idea.category}
              </Text>

              <Text style={styles.ideaTitle}>
                {idea.title}
              </Text>

              <View style={styles.startupBadge}>
                <Text style={styles.startupBadgeText}>
                  ✓ $0 STARTUP
                </Text>
              </View>

              <Text style={styles.muted}>
                {idea.customer}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>
                  {money(idea.price)}
                </Text>

                <TouchableOpacity
                  onPress={() => forge(idea)}
                >
                  <Text style={styles.openLink}>
                    OPEN →
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    );
  }

  function renderTools() {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>
          Tools
        </Text>

        <Text style={styles.heroText}>
          Tools to help turn an idea into actual
          income.
        </Text>

        <Card>
          <Text style={styles.toolIcon}>
            🧮
          </Text>

          <Text style={styles.toolTitle}>
            Income Calculator
          </Text>

          <Text style={styles.muted}>
            Calculate how many customers you need to
            reach your monthly income goal.
          </Text>

          {selectedIdea ? (
            <View style={{ marginTop: 18 }}>
              <DetailRow
                label="Goal"
                value={money(goal)}
              />

              <DetailRow
                label="Price"
                value={money(
                  selectedIdea.price
                )}
              />

              <DetailRow
                label="Sales needed"
                value={`${monthlySales}/month`}
              />

              <DetailRow
                label="Projected"
                value={money(
                  projectedRevenue
                )}
              />

              <DetailRow
                label="Current revenue"
                value={money(actualRevenue)}
              />
            </View>
          ) : (
            <Text
              style={[
                styles.muted,
                { marginTop: 15 },
              ]}
            >
              Forge a business first to activate the
              calculator.
            </Text>
          )}
        </Card>

        <Card>
          <Text style={styles.toolIcon}>
            🚀
          </Text>

          <Text style={styles.toolTitle}>
            Launch Dashboard
          </Text>

          <Text style={styles.bigCardText}>
            Start a business, track prospects, record
            sales, and watch your revenue grow.
          </Text>

          {selectedIdea && (
            <ActionButton
              title="🚀 OPEN CURRENT BUSINESS"
              onPress={() =>
                setScreen("launch")
              }
            />
          )}
        </Card>

        <Card>
          <Text style={styles.toolIcon}>
            💰
          </Text>

          <Text style={styles.toolTitle}>
            $0 Startup Strategy
          </Text>

          <Text style={styles.bigCardText}>
            Sell the service first. Get paid. Then use
            the customer's money to fund anything you
            actually need.
          </Text>
        </Card>

        <Card>
          <Text style={styles.toolIcon}>
            📋
          </Text>

          <Text style={styles.toolTitle}>
            30-Day Checklist
          </Text>

          <Step
            number="1"
            text="Choose one $0-startup business."
          />

          <Step
            number="2"
            text="Create one sample."
          />

          <Step
            number="3"
            text="Make your first sales post."
          />

          <Step
            number="4"
            text="Contact potential customers every day."
          />

          <Step
            number="5"
            text="Get the first customer."
          />

          <Step
            number="6"
            text="Collect a testimonial."
          />

          <Step
            number="7"
            text="Repeat and raise your value."
          />
        </Card>

        <Card>
          <Text style={styles.toolIcon}>
            💬
          </Text>

          <Text style={styles.toolTitle}>
            Simple Sales Formula
          </Text>

          <Text style={styles.bigCardText}>
            Problem → Product → Proof → Price →
            Direct Ask
          </Text>
        </Card>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (
              screen === "launch" ||
              screen === "fullplan" ||
              screen === "forge"
            ) {
              setScreen("ideas");
            }
          }}
          activeOpacity={0.8}
        >
          <View>
            <Text style={styles.brand}>
              FORGED
            </Text>

            <Text style={styles.brandSub}>
              BUSINESS BUILDER
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>
            {IDEAS.length} IDEAS
          </Text>
        </View>
      </View>

      <View style={styles.main}>
        {screen === "ideas" &&
          renderIdeas()}

        {screen === "forge" &&
          renderForge()}

        {screen === "fullplan" &&
          renderFullPlan()}

        {screen === "launch" &&
          renderLaunch()}

        {screen === "saved" &&
          renderSaved()}

        {screen === "tools" &&
          renderTools()}
      </View>

      <View style={styles.nav}>
        <NavButton
          icon="◉"
          label="Ideas"
          active={
            screen === "ideas" ||
            screen === "forge" ||
            screen === "fullplan" ||
            screen === "launch"
          }
          onPress={() =>
            setScreen("ideas")
          }
        />

        <NavButton
          icon="★"
          label="Saved"
          active={screen === "saved"}
          onPress={() =>
            setScreen("saved")
          }
        />

        <NavButton
          icon="⚒"
          label="Tools"
          active={screen === "tools"}
          onPress={() =>
            setScreen("tools")
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    height: 76,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  brand: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
  },

  brandSub: {
    color: PURPLE,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 2,
  },

  headerBadge: {
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  headerBadgeText: {
    color: PURPLE,
    fontSize: 11,
    fontWeight: "900",
  },

  main: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 18,
    paddingBottom: 130,
  },

  hero: {
    paddingTop: 8,
    paddingBottom: 20,
  },

  eyebrow: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.3,
    marginBottom: 10,
  },

  heroTitle: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
    marginBottom: 12,
  },

  forgeTitle: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
    marginBottom: 12,
  },

  launchTitle: {
    color: TEXT,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    marginBottom: 12,
  },

  screenTitle: {
    color: TEXT,
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
  },

  heroText: {
    color: MUTED,
    fontSize: 16,
    lineHeight: 25,
  },

  card: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
  },

  label: {
    color: PURPLE,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 8,
  },

  budgetNote: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },

  input: {
    backgroundColor: CARD2,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    color: TEXT,
    fontSize: 20,
    fontWeight: "800",
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  search: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    color: TEXT,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },

  category: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
    marginRight: 8,
  },

  categoryActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  categoryText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: "800",
  },

  categoryTextActive: {
    color: TEXT,
  },

  sectionTitle: {
    color: PURPLE,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 12,
  },

  sectionHint: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    marginTop: -5,
    marginBottom: 12,
  },

  ideaHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  ideaCategory: {
    color: PURPLE,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },

  ideaTitle: {
    color: TEXT,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "900",
  },

  star: {
    color: PURPLE,
    fontSize: 28,
    paddingLeft: 10,
  },

  startupBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#11251b",
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  startupBadgeText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  startupBig: {
    color: GREEN,
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 4,
  },

  muted: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 21,
  },

  problem: {
    color: TEXT,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 13,
    marginBottom: 16,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  smallLabel: {
    color: MUTED,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 4,
  },

  price: {
    color: TEXT,
    fontSize: 25,
    fontWeight: "900",
  },

  priceSmall: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "900",
  },

  button: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  buttonSecondary: {
    backgroundColor: CARD2,
    borderWidth: 1,
    borderColor: PURPLE,
    marginTop: 10,
  },

  buttonText: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  backButton: {
    marginBottom: 18,
  },

  backText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: "900",
  },

  readyCard: {
    backgroundColor: CARD2,
    borderColor: PURPLE,
    alignItems: "center",
    paddingVertical: 25,
  },

  readyIcon: {
    fontSize: 45,
    marginBottom: 8,
  },

  readyTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },

  readyText: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },

  cardLabel: {
    color: PURPLE,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 9,
  },

  bigCardText: {
    color: TEXT,
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "800",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
  },

  detailLabel: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },

  detailValue: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
  },

  goalCard: {
    backgroundColor: CARD2,
  },

  goalNumber: {
    color: TEXT,
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 4,
  },

  goalSub: {
    color: MUTED,
    fontSize: 16,
    marginTop: 3,
  },

  progressTrack: {
    height: 10,
    backgroundColor: "#0c0e14",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 15,
  },

  progressFill: {
    height: "100%",
    backgroundColor: PURPLE,
    borderRadius: 10,
  },

  progressText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8,
    textAlign: "right",
  },

  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  stepNumber: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  stepNumberComplete: {
    backgroundColor: GREEN,
  },

  stepNumberText: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "900",
  },

  stepText: {
    color: TEXT,
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
  },

  stepTextComplete: {
    color: MUTED,
    textDecorationLine: "line-through",
  },

  pitchCard: {
    backgroundColor: CARD2,
  },

  pitch: {
    color: TEXT,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: "600",
  },

  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  skill: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginRight: 7,
    marginBottom: 7,
  },

  skillText: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "700",
  },

  /* LAUNCH DASHBOARD */

  missionCard: {
    borderColor: PURPLE,
    backgroundColor: CARD2,
  },

  missionTitle: {
    color: TEXT,
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 8,
  },

  missionText: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 23,
  },

  missionStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  missionStat: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "900",
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  statBox: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 15,
    marginHorizontal: 4,
  },

  statNumber: {
    color: TEXT,
    fontSize: 23,
    fontWeight: "900",
    marginBottom: 5,
  },

  statLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  prospectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  prospectNumber: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  prospectNumberText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "900",
  },

  prospectTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "900",
  },

  prospectStatus: {
    color: MUTED,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 3,
  },

  prospectInput: {
    backgroundColor: CARD2,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    color: TEXT,
    fontSize: 15,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 10,
  },

  prospectButtons: {
    flexDirection: "row",
    gap: 8,
  },

  smallButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD2,
    borderRadius: 11,
    paddingVertical: 11,
    alignItems: "center",
  },

  smallButtonActive: {
    borderColor: PURPLE,
    backgroundColor: "#211d3d",
  },

  smallButtonSold: {
    borderColor: GREEN,
    backgroundColor: "#11251b",
  },

  smallButtonText: {
    color: TEXT,
    fontSize: 10,
    fontWeight: "900",
  },

  contactedCard: {
    borderColor: PURPLE,
  },

  soldCard: {
    borderColor: GREEN,
  },

  bottomMission: {
    borderColor: PURPLE,
    backgroundColor: CARD2,
    marginTop: 5,
  },

  bottomMissionTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },

  bottomMissionText: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 23,
  },

  /* SAVED */

  emptyIcon: {
    color: PURPLE,
    fontSize: 45,
    marginBottom: 8,
  },

  emptyTitle: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 7,
  },

  openLink: {
    color: PURPLE,
    fontWeight: "900",
    fontSize: 13,
  },

  /* TOOLS */

  toolIcon: {
    fontSize: 28,
    marginBottom: 10,
  },

  toolTitle: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 8,
  },

  /* NAVIGATION */

  nav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: "#0c0e14",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
  },

  navIcon: {
    color: MUTED,
    fontSize: 22,
    marginBottom: 3,
  },

  navLabel: {
    color: MUTED,
    fontSize: 11,
    fontWeight: "800",
  },

  navActive: {
    color: PURPLE,
  },
});
