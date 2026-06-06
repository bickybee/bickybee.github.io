import React, { useState } from 'react';

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
    { text: "Back to Home", url: "/" },
  ],
};

// ============================================================================
// COMPONENT - Generally don't need to edit below here
// ============================================================================

const HumbleBundleGift = () => {
  const [expandedGameId, setExpandedGameId] = useState(null);
  const [expandedWhy, setExpandedWhy] = useState(false);

  const toggleGameExpand = (gameId) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.bundleTitle}>{BUNDLE_CONFIG.bundleTitle}</h1>
          <p style={styles.bundleTagline}>{BUNDLE_CONFIG.bundleTagline}</p>
        </div>
      </header>

      {/* Hero Image */}
      <div style={styles.heroSection}>
        <img src={BUNDLE_CONFIG.heroImageUrl} alt="Bundle Hero" style={styles.heroImage} />
      </div>

      {/* Bundle Details */}
      <section style={styles.detailsSection}>
        <div style={styles.detailsContent}>
          <h2 style={styles.detailsTitle}>About This Bundle</h2>
          <p style={styles.detailsDescription}>{BUNDLE_CONFIG.bundleDescription}</p>
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{BUNDLE_CONFIG.totalGameCount}</span>
              <span style={styles.statLabel}>Games Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Bundle Section */}
      <section style={styles.whySection}>
        <div style={styles.whyContent}>
          <button
            style={{
              ...styles.whyButton,
              backgroundColor: expandedWhy ? '#E85D04' : '#F9B233',
            }}
            onClick={() => setExpandedWhy(!expandedWhy)}
          >
            <span style={styles.whyButtonText}>{BUNDLE_CONFIG.whyThisBundleTitle}</span>
            <span style={styles.whyButtonIcon}>{expandedWhy ? '▼' : '▶'}</span>
          </button>
          {expandedWhy && (
            <div style={styles.whyExpandedContent}>
              <p>{BUNDLE_CONFIG.whyThisBundleContent}</p>
            </div>
          )}
        </div>
      </section>

      {/* Games Grid */}
      <section style={styles.gamesSection}>
        <div style={styles.gamesContainer}>
          <h2 style={styles.gamesTitle}>Games in This Bundle</h2>
          <div style={styles.gameGrid}>
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
      <footer style={styles.footer}>
        <p style={styles.footerText}>{BUNDLE_CONFIG.footerText}</p>
        <div style={styles.footerLinks}>
          {BUNDLE_CONFIG.footerLinks.map((link, idx) => (
            <a key={idx} href={link.url} style={styles.footerLink}>
              {link.text}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

// Game Card Component
const GameCard = ({ game, isExpanded, onToggle }) => {
  return (
    <div style={styles.gameCard}>
      {/* Collapsed View */}
      <div style={styles.gameCardHeader} onClick={() => onToggle(game.id)}>
        <img src={game.imageUrl} alt={game.title} style={styles.gameImage} />
        <div style={styles.gameInfo}>
          <h3 style={styles.gameTitle}>{game.title}</h3>
          <p style={styles.gameShortDesc}>{game.shortDescription}</p>
          <div style={styles.gamePlatforms}>
            {game.platforms.map((platform, idx) => (
              <span key={idx} style={styles.platformBadge}>
                {platform}
              </span>
            ))}
          </div>
        </div>
        <button style={styles.expandButton}>{isExpanded ? '▼' : '▶'}</button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div style={styles.gameCardExpanded}>
          <p style={styles.gameFullDesc}>{game.fullDescription}</p>

          {/* Video Embed if provided */}
          {game.videoEmbedUrl && (
            <div style={styles.videoContainer}>
              <iframe
                style={styles.videoEmbed}
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
            <div style={styles.linksContainer}>
              <p style={styles.linksLabel}>Learn More:</p>
              <div style={styles.linksList}>
                {game.externalLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" style={styles.externalLink}>
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
// STYLES - Humble Bundle inspired color scheme
// ============================================================================

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    minHeight: '100vh',
    overflowX: 'hidden',
  },

  // Header
  header: {
    backgroundColor: '#2d2d2d',
    padding: '40px 20px',
    textAlign: 'center',
    borderBottom: '4px solid #F9B233',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  bundleTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#F9B233',
    margin: '0 0 10px 0',
  },
  bundleTagline: {
    fontSize: '1.2rem',
    color: '#E85D04',
    margin: '0',
    fontWeight: '500',
  },

  // Hero Section
  heroSection: {
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // Details Section
  detailsSection: {
    backgroundColor: '#2d2d2d',
    padding: '40px 20px',
    borderBottom: '1px solid #444',
  },
  detailsContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  detailsTitle: {
    fontSize: '1.8rem',
    color: '#F9B233',
    marginBottom: '15px',
  },
  detailsDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '30px',
    color: '#c0c0c0',
  },
  statsRow: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#E85D04',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#a0a0a0',
    marginTop: '5px',
  },

  // Why Section
  whySection: {
    backgroundColor: '#1a1a1a',
    padding: '40px 20px',
    borderBottom: '1px solid #444',
  },
  whyContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  whyButton: {
    width: '100%',
    padding: '20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
  },
  whyButtonText: {
    color: '#1a1a1a',
  },
  whyButtonIcon: {
    marginLeft: '10px',
    color: '#1a1a1a',
  },
  whyExpandedContent: {
    padding: '20px',
    backgroundColor: '#2d2d2d',
    marginTop: '10px',
    borderRadius: '4px',
    lineHeight: '1.6',
  },

  // Games Section
  gamesSection: {
    backgroundColor: '#1a1a1a',
    padding: '40px 20px',
  },
  gamesContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  gamesTitle: {
    fontSize: '2rem',
    color: '#F9B233',
    marginBottom: '30px',
    textAlign: 'center',
  },
  gameGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },

  // Game Card
  gameCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #444',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  gameCardHeader: {
    padding: '15px',
    cursor: 'pointer',
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
    transition: 'background-color 0.2s ease',
  },
  gameImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
  },
  gameInfo: {
    flex: 1,
    minWidth: 0,
  },
  gameTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#F9B233',
    margin: '0 0 5px 0',
  },
  gameShortDesc: {
    fontSize: '0.85rem',
    color: '#a0a0a0',
    margin: '0 0 8px 0',
  },
  gamePlatforms: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  platformBadge: {
    backgroundColor: '#444',
    color: '#e0e0e0',
    padding: '3px 8px',
    borderRadius: '3px',
    fontSize: '0.75rem',
  },
  expandButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#F9B233',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0',
    flexShrink: 0,
  },

  // Expanded Game Card
  gameCardExpanded: {
    padding: '20px 15px',
    borderTop: '1px solid #444',
    backgroundColor: '#333',
  },
  gameFullDesc: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#c0c0c0',
    margin: '0 0 20px 0',
  },

  // Video Container
  videoContainer: {
    marginBottom: '20px',
  },
  videoEmbed: {
    width: '100%',
    height: '300px',
    borderRadius: '4px',
  },

  // Links
  linksContainer: {
    marginTop: '20px',
  },
  linksLabel: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#F9B233',
    margin: '0 0 10px 0',
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  externalLink: {
    color: '#E85D04',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
  },

  // Footer
  footer: {
    backgroundColor: '#2d2d2d',
    padding: '40px 20px',
    textAlign: 'center',
    borderTop: '1px solid #444',
  },
  footerText: {
    fontSize: '0.95rem',
    color: '#a0a0a0',
    margin: '0 0 15px 0',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#E85D04',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
  },
};

export default HumbleBundleGift;