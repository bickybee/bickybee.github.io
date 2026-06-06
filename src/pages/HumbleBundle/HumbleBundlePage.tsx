import { useState } from 'react';
import './HumbleBundlePage.css';

// ============================================================================
// CONFIGURATION - Edit everything here to customize your bundle page
// ============================================================================

const BUNDLE_CONFIG = {
  // Header & Hero Section
  bundleTitle: "Frosty Games Fest Showcase Bundle 2026",
  bundleTagline: "Made in ANZ",
  heroImageUrl: "https://via.placeholder.com/1200x400?text=Bundle+Hero+Image",
  
  // Bundle Details Section
  bundleDescription: "A curated collection of amazing indie games made in Australia and New Zealand. Support local developers with this exclusive bundle!",
  totalGameCount: 12,
  
  // Why This Bundle Section (optional expandable)
  whyThisBundleTitle: "Why This Bundle?",
  whyThisBundleContent: "Discover incredible games from talented developers across Australia and New Zealand. Every purchase supports the local gaming community.",
  
  // Games Array - Add or remove games here
  games: [
    {
      id: 1,
      title: "Game Title One",
      shortDescription: "A brief one-liner about this game",
      imageUrl: "https://via.placeholder.com/300x200?text=Game+1",
      fullDescription: "This is a longer description of the game. Include gameplay details, story, features, and what makes it special.",
      platforms: ["Windows", "Mac"],
      externalLinks: [
        { text: "View on Steam", url: "https://steam.com" },
        { text: "Developer Website", url: "https://example.com" }
      ],
      videoEmbedUrl: null, // Optional: YouTube embed URL like "https://www.youtube.com/embed/VIDEO_ID"
    },
    {
      id: 2,
      title: "Game Title Two",
      shortDescription: "Another amazing indie game",
      imageUrl: "https://via.placeholder.com/300x200?text=Game+2",
      fullDescription: "Detailed description goes here. Talk about what makes this game unique and why it should be played.",
      platforms: ["Windows", "Mac", "Linux"],
      externalLinks: [
        { text: "View on Steam", url: "https://steam.com" },
      ],
      videoEmbedUrl: null,
    },
    {
      id: 3,
      title: "Game Title Three",
      shortDescription: "A creative indie experience",
      imageUrl: "https://via.placeholder.com/300x200?text=Game+3",
      fullDescription: "More game description text. Highlight the key features, story elements, or gameplay mechanics.",
      platforms: ["Windows"],
      externalLinks: [
        { text: "Official Site", url: "https://example.com" },
      ],
      videoEmbedUrl: null,
    },
    {
      id: 4,
      title: "Game Title Four",
      shortDescription: "Adventure awaits",
      imageUrl: "https://via.placeholder.com/300x200?text=Game+4",
      fullDescription: "Description of this game and why it deserves to be in the bundle.",
      platforms: ["Windows", "Mac", "Linux"],
      externalLinks: [
        { text: "Learn More", url: "https://example.com" },
      ],
      videoEmbedUrl: null,
    },
  ],

  // Footer Section
  footerText: "Made with ❤️ for gaming",
  footerLinks: [
    { text: "Back to Home", url: "#/" },
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
              <p className="links-label">Learn More:</p>
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

export function HumbleBundlePage() {
  const [expandedGameId, setExpandedGameId] = useState<number | null>(null);
  const [expandedWhy, setExpandedWhy] = useState(false);

  const toggleGameExpand = (gameId: number) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  return (
    <div className="humble-bundle-container">
      {/* Header */}
      <header className="hb-header">
        <div className="hb-header-content">
          <h1 className="hb-bundle-title">{BUNDLE_CONFIG.bundleTitle}</h1>
          <p className="hb-bundle-tagline">{BUNDLE_CONFIG.bundleTagline}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div className="hb-hero-section">
        <img src={BUNDLE_CONFIG.heroImageUrl} alt="Bundle Hero" className="hb-hero-image" />
      </div>

      {/* Bundle Details */}
      <section className="hb-details-section">
        <div className="hb-details-content">
          <h2 className="hb-details-title">About This Bundle</h2>
          <p className="hb-details-description">{BUNDLE_CONFIG.bundleDescription}</p>
          <div className="hb-stats-row">
            <div className="hb-stat">
              <span className="hb-stat-number">{BUNDLE_CONFIG.totalGameCount}</span>
              <span className="hb-stat-label">Games Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Bundle Section */}
      <section className="hb-why-section">
        <div className="hb-why-content">
          <button
            className={`hb-why-button ${expandedWhy ? 'expanded' : ''}`}
            onClick={() => setExpandedWhy(!expandedWhy)}
          >
            <span className="hb-why-button-text">{BUNDLE_CONFIG.whyThisBundleTitle}</span>
            <span className="hb-why-button-icon">{expandedWhy ? '▼' : '▶'}</span>
          </button>
          {expandedWhy && (
            <div className="hb-why-expanded-content">
              <p>{BUNDLE_CONFIG.whyThisBundleContent}</p>
            </div>
          )}
        </div>
      </section>

      {/* Games Grid */}
      <section className="hb-games-section">
        <div className="hb-games-container">
          <h2 className="hb-games-title">Games in This Bundle</h2>
          <div className="hb-game-grid">
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

      {/* Footer */}
      <footer className="hb-footer">
        <p className="hb-footer-text">{BUNDLE_CONFIG.footerText}</p>
        <div className="hb-footer-links">
          {BUNDLE_CONFIG.footerLinks.map((link, idx) => (
            <a key={idx} href={link.url} className="hb-footer-link">
              {link.text}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
