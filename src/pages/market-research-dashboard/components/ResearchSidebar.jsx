import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ResearchSidebar = () => {
  const [activeSection, setActiveSection] = useState('news');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'news', label: 'News Feed', icon: 'Newspaper' },
    { id: 'social', label: 'Social Mentions', icon: 'MessageCircle' },
    { id: 'notes', label: 'Research Notes', icon: 'FileText' }
  ];

  const newsData = [
    {
      id: 1,
      title: "Bitcoin ETF Approval Drives Market Sentiment Higher",
      source: "CryptoNews",
      sentiment: 85,
      time: "2 hours ago",
      impact: "high",
      summary: "SEC approval of Bitcoin ETF applications has significantly boosted market confidence..."
    },
    {
      id: 2,
      title: "Ethereum Network Upgrade Shows Promising Results",
      source: "BlockchainDaily",
      sentiment: 72,
      time: "4 hours ago",
      impact: "medium",
      summary: "Latest network upgrade demonstrates improved transaction throughput and reduced fees..."
    },
    {
      id: 3,
      title: "Regulatory Concerns Impact Altcoin Performance",
      source: "CryptoRegulator",
      sentiment: 35,
      time: "6 hours ago",
      impact: "high",
      summary: "New regulatory framework proposals have created uncertainty in the altcoin market..."
    },
    {
      id: 4,
      title: "DeFi Protocol Launches Innovative Yield Strategy",
      source: "DeFiInsider",
      sentiment: 78,
      time: "8 hours ago",
      impact: "medium",
      summary: "New yield farming protocol promises sustainable returns through innovative mechanisms..."
    }
  ];

  const socialData = [
    {
      id: 1,
      platform: "Twitter",
      mentions: 12450,
      sentiment: 68,
      trending: "#Bitcoin",
      change: "+15%",
      time: "Last hour"
    },
    {
      id: 2,
      platform: "Reddit",
      mentions: 8920,
      sentiment: 72,
      trending: "r/cryptocurrency",
      change: "+8%",
      time: "Last hour"
    },
    {
      id: 3,
      platform: "Telegram",
      mentions: 5680,
      sentiment: 81,
      trending: "ETH 2.0",
      change: "+22%",
      time: "Last hour"
    },
    {
      id: 4,
      platform: "Discord",
      mentions: 3240,
      sentiment: 65,
      trending: "NFT drops",
      change: "-5%",
      time: "Last hour"
    }
  ];

  const notesData = [
    {
      id: 1,
      title: "Q4 Market Analysis",
      content: "Key findings from quarterly market research including correlation patterns and sentiment analysis...",
      tags: ["analysis", "quarterly", "correlation"],
      lastModified: "2 days ago",
      author: "Research Team"
    },
    {
      id: 2,
      title: "DeFi Sector Deep Dive",
      content: "Comprehensive analysis of DeFi protocols, yield farming strategies, and risk assessment...",
      tags: ["defi", "yield", "risk"],
      lastModified: "1 week ago",
      author: "DeFi Analyst"
    },
    {
      id: 3,
      title: "Regulatory Impact Study",
      content: "Assessment of regulatory changes and their potential impact on cryptocurrency markets...",
      tags: ["regulation", "compliance", "impact"],
      lastModified: "2 weeks ago",
      author: "Compliance Team"
    }
  ];

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 70) return 'text-success';
    if (sentiment >= 40) return 'text-warning';
    return 'text-error';
  };

  const getImpactBadge = (impact) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-success text-success-foreground'
    };
    return colors[impact] || colors.medium;
  };

  const renderNewsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Live News Feed</h3>
        <Button variant="ghost" size="icon" iconName="RefreshCw" iconSize={16} />
      </div>
      
      <Input
        type="search"
        placeholder="Search news..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />
      
      <div className="space-y-3">
        {newsData.map((news) => (
          <div key={news.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 crypto-transition">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                  {news.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${getImpactBadge(news.impact)}`}>
                {news.impact}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {news.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={12} className={getSentimentColor(news.sentiment)} />
                <span className={`text-xs font-medium ${getSentimentColor(news.sentiment)}`}>
                  {news.sentiment}% Positive
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Social Mentions</h3>
        <Button variant="ghost" size="icon" iconName="RefreshCw" iconSize={16} />
      </div>
      
      <div className="space-y-3">
        {socialData.map((social) => (
          <div key={social.id} className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{social.platform}</span>
              </div>
              <span className={`text-sm font-medium ${social.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                {social.change}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Mentions</div>
                <div className="font-medium text-foreground">{social.mentions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Sentiment</div>
                <div className={`font-medium ${getSentimentColor(social.sentiment)}`}>
                  {social.sentiment}%
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Trending: {social.trending}</span>
                <span className="text-muted-foreground">{social.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotesSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Research Notes</h3>
        <Button variant="ghost" size="icon" iconName="Plus" iconSize={16} />
      </div>
      
      <div className="space-y-3">
        {notesData.map((note) => (
          <div key={note.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 crypto-transition">
            <h4 className="font-medium text-foreground mb-2">{note.title}</h4>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {note.content}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {note.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>By {note.author}</span>
              <span>{note.lastModified}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full" iconName="FileText" iconPosition="left">
        Create New Note
      </Button>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'news':
        return renderNewsSection();
      case 'social':
        return renderSocialSection();
      case 'notes':
        return renderNotesSection();
      default:
        return renderNewsSection();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg crypto-elevation-1 h-fit">
      {/* Section Navigation */}
      <div className="border-b border-border">
        <nav className="flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium crypto-transition ${
                activeSection === section.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      <div className="p-4">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default ResearchSidebar;