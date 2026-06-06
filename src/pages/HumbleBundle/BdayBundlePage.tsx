import { useState } from 'react';
import './BdayBundlePage.css';

// ============================================================================
// CONFIGURATION - Edit everything here to customize your bundle page
// ============================================================================

const BUNDLE_CONFIG = {
  // Header & Hero Section
  bundleTitle: "🎂 FAKE Birthday Game Bundle 2026 🎂",
  bundleTagline: "NOT REAL - For Entertainment Only",
  heroImageUrl: "https://via.placeholder.com/1200x400?text=FAKE+BUNDLE+-+NOT+REAL&bg=FF6B6B&txtclr=FFFFFF&bold",
  
  // Bundle Details Section
  bundleDescription: "⚠️ THIS IS A FAKE PARODY BUNDLE - NOT AFFILIATED WITH ANY REAL COMPANY ⚠️ A silly collection of made-up indie games for your special birthday celebration. No actual purchase required - this is just a birthday card!",
  totalGameCount: 4,
  
  // Why This Bundle Section (optional expandable)
  whyThisBundleTitle: "Why This FAKE Bundle?",
  whyThisBundleContent: "Because someone thought it would be hilarious to create a fake game bundle as a birthday gift. This page is purely decorative and celebratory - enjoy the joke! 🎉",
  
  // Games Array - Add or remove games here
  games: [
    {
      id: 1,
      title: "🚀 Penguin Simulator 3000",
      shortDescription: "Waddle around as a confused penguin in the desert",
      imageUrl: "https://via.placeholder.com/300x200?text=Penguin+Simulator&bg=FFD93D",
      fullDescription: "A groundbreaking simulator where you play as a penguin who has no idea how it ended up in the Sahara Desert. Master the art of confused waddling, befriend confused camels, and question all your life choices. Winner of 'Most Bewildered AI' at the Fake Game Awards.",
      platforms: ["Windows", "Dreamcast"],
      externalLinks: [
        { text: "Not on Steam", url: "https://example.com" },
        { text: "Fake Website", url: "https://example.com" }
      ],
      videoEmbedUrl: null,
    },
    {
      id: 2,
      title: "🧀 Cheese Quest: The Adventure",
      shortDescription: "Search for the legendary Golden Cheddar",
      imageUrl: "https://via.placeholder.com/300x200?text=Cheese+Quest&bg=F4A261",
      fullDescription: "An epic fantasy RPG where your quest is to find the legendary Golden Cheddar. Recruit a party of sentient dairy products, defeat the Lactose Intolerant Dragon, and discover the terrible truth: it was all a dream.",
      platforms: ["GameBoy Color", "Toaster"],
      externalLinks: [
        { text: "Definitely Not Real", url: "https://example.com" },
      ],
      videoEmbedUrl: null,
    },
    {
      id: 3,
      title: "🎸 Guitar Hero: Tax Edition",
      shortDescription: "Rock out to sick beats about filing returns",
      imageUrl: "https://via.placeholder.com/300x200?text=Guitar+Hero+Tax&bg=E76F51",
      fullDescription: "Shred your way through hit songs like 'Deductible Dreams', 'Form 1040 (Acoustic)', and 'The Auditor's Ballad'. Features cameo performances by your CPA and a final boss battle against an angry IRS agent. E for Everyone (but especially CPAs).",
      platforms: ["Windows", "Graphing Calculator"],
      externalLinks: [
        { text: "Filing Status: ERROR", url: "https://example.com" },
      ],
      videoEmbedUrl: null,
    },
    {
      id: 4,
      title: "🌮 The Spaghetti Incident",
      shortDescription: "Uncover the mystery of the missing pasta",
      imageUrl: "https://via.placeholder.com/300x200?text=Spaghetti+Incident&bg=D62828",
      fullDescription: "A noir detective story where you play as Detective Alfredo Sauce investigating who stole the world's largest spaghetti noodle. Features questionable Italian accents, dramatic saxophone music, and a plot twist that makes no sense whatsoever. 'Better than a real mystery!' - Someone on the internet.",
      platforms: ["Nintendo Wii", "Calculator Watch"],
      externalLinks: [
        { text: "Pasta Not Included", url: "https://example.com" },
      ],
      videoEmbedUrl: null,
    },
  ],

  // Price Tiers - Fixed prices in kisses
  priceTiers: [5, 10, 25, 50],

  // Footer Section
  footerText: "Made with 💔 as a FAKE gift - Happy Birthday! (This is not a real Humble Bundle)",
  footerLinks: [
    { text: "Back to Reality", url: "#/" },
  ],
};

// ============================================================================
// COMPONENTS
// ============================================================================

interface GameCardProps {
  game: typeof BUNDLE_CONFIG.games[0];
  isExpanded: boolean;
  onToggle: (gameId: number) => void;
}

const GameCard = ({ game, isExpanded, onToggle }: GameCardProps) => {
  return (
    <div className="game-card">
      {/* Collapsed View */}
      <div className="game-card-header" onClick={() => onToggle(game.id)}>
        <img src={game.imageUrl} alt={game.title} className="game-image" />
        <div className="game-info">
          <h3 className="game-title">{game.title}</h3>
          <p className="game-short-desc">{game.shortDescription}</p>
          <div className="game-platforms">
            {game.platforms.map((platform, idx) => (
              <span key={idx} className="platform-badge">
                {platform}
              </span>
            ))}
          </div>
        </div>
        <button className="expand-button">{isExpanded ? '▼' : '▶'}</button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="game-card-expanded">
          <p className="game-full-desc">{game.fullDescription}</p>

          {/* Video Embed if provided */}
          {game.videoEmbedUrl && (
            <div className="video-container">
              <iframe
                className="video-embed"
                src={game.videoEmbedUrl}
                title={game.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* External Links */}
          {game.externalLinks && game.externalLinks.length > 0 && (
            <div className="links-container">
              <p className="links-label">Learn More (jk it's fake):</p>
              <div className="links-list">
                {game.externalLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="external-link">
                    {link.text} →
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export function BdayBundlePage() {
  const [expandedGameId, setExpandedGameId] = useState<number | null>(null);
  const [expandedWhy, setExpandedWhy] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [customPrice, setCustomPrice] = useState<string>('');

  const toggleGameExpand = (gameId: number) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  const handlePriceSelect = (price: number) => {
    setSelectedPrice(price);
    setCustomPrice(''); // Clear custom price when selecting a tier
  };

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomPrice(value);
    if (value) {
      setSelectedPrice(null); // Clear selected price tier when entering custom
    }
  };

  const currentPrice = selectedPrice || (customPrice ? parseInt(customPrice) : null);

  const handlePurchase = () => {
    if (!currentPrice) return;
    // TODO: Implement purchase logic
    console.log(`Purchase attempted with ${currentPrice} kisses`);
  };

  return (
    <div className="bday-bundle-container">
      {/* FAKE Banner */}
      <div className="fake-banner">
        ⚠️ THIS IS A PARODY/FAKE PAGE - NOT AFFILIATED WITH HUMBLE BUNDLE OR ANY REAL COMPANY ⚠️
      </div>

      {/* Header */}
      <header className="bb-header">
        <div className="bb-header-content">
          <h1 className="bb-bundle-title">{BUNDLE_CONFIG.bundleTitle}</h1>
          <p className="bb-bundle-tagline">{BUNDLE_CONFIG.bundleTagline}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="bb-hero-section">
        <img src={BUNDLE_CONFIG.heroImageUrl} alt="Bundle Hero" className="bb-hero-image" />
      </div>

      {/* Bundle Details */}
      <section className="bb-details-section">
        <div className="bb-details-content">
          <h2 className="bb-details-title">About This FAKE Bundle</h2>
          <p className="bb-details-description">{BUNDLE_CONFIG.bundleDescription}</p>
          <div className="bb-stats-row">
            <div className="bb-stat">
              <span className="bb-stat-number">{BUNDLE_CONFIG.totalGameCount}</span>
              <span className="bb-stat-label">Completely Made-Up Games</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Bundle Section */}
      <section className="bb-why-section">
        <div className="bb-why-content">
          <button
            className={`bb-why-button ${expandedWhy ? 'expanded' : ''}`}
            onClick={() => setExpandedWhy(!expandedWhy)}
          >
            <span className="bb-why-button-text">{BUNDLE_CONFIG.whyThisBundleTitle}</span>
            <span className="bb-why-button-icon">{expandedWhy ? '▼' : '▶'}</span>
          </button>
          {expandedWhy && (
            <div className="bb-why-expanded-content">
              <p>{BUNDLE_CONFIG.whyThisBundleContent}</p>
            </div>
          )}
        </div>
      </section>

      {/* Games Grid */}
      <section className="bb-games-section">
        <div className="bb-games-container">
          <h2 className="bb-games-title">Fictional Games in This Bundle</h2>
          <div className="bb-game-grid">
            {BUNDLE_CONFIG.games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isExpanded={expandedGameId === game.id}
                onToggle={toggleGameExpand}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="bb-price-section">
        <div className="bb-price-container">
          <h2 className="bb-price-title">Choose Your Price</h2>
          <p className="bb-price-subtitle">Pay What You Want - Get All Games!</p>
          
          <div className="bb-price-tiers">
            {BUNDLE_CONFIG.priceTiers.map((price) => (
              <button
                key={price}
                className={`bb-price-button ${selectedPrice === price ? 'selected' : ''}`}
                onClick={() => handlePriceSelect(price)}
              >
                <span className="bb-price-amount">{price}</span>
                <span className="bb-price-unit">💋</span>
              </button>
            ))}
          </div>

          <div className="bb-custom-price">
            <label htmlFor="custom-price" className="bb-custom-price-label">
              Or name your own price:
            </label>
            <input
              id="custom-price"
              type="number"
              min="0"
              value={customPrice}
              onChange={handleCustomPriceChange}
              placeholder="Enter number of kisses"
              className="bb-custom-price-input"
            />
            {customPrice && (
              <span className="bb-custom-price-display">{customPrice} 💋</span>
            )}
          </div>

          <button
            className={`bb-purchase-button ${!currentPrice ? 'disabled' : ''}`}
            onClick={handlePurchase}
            disabled={!currentPrice}
          >
            Get This Bundle for {currentPrice ? `${currentPrice} 💋` : 'Choose a Price'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bb-footer">
        <p className="bb-footer-text">{BUNDLE_CONFIG.footerText}</p>
        <div className="bb-footer-links">
          {BUNDLE_CONFIG.footerLinks.map((link, idx) => (
            <a key={idx} href={link.url} className="bb-footer-link">
              {link.text}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
