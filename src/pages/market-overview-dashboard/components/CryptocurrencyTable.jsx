import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CryptocurrencyTable = () => {
  const [sortField, setSortField] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [watchlist, setWatchlist] = useState(['BTC', 'ETH', 'ADA']);
  const itemsPerPage = 20;

  const generateMockData = () => {
    const cryptos = [
      { symbol: 'BTC', name: 'Bitcoin', logo: '₿' },
      { symbol: 'ETH', name: 'Ethereum', logo: 'Ξ' },
      { symbol: 'BNB', name: 'Binance Coin', logo: 'BNB' },
      { symbol: 'ADA', name: 'Cardano', logo: 'ADA' },
      { symbol: 'SOL', name: 'Solana', logo: 'SOL' },
      { symbol: 'XRP', name: 'Ripple', logo: 'XRP' },
      { symbol: 'DOT', name: 'Polkadot', logo: 'DOT' },
      { symbol: 'AVAX', name: 'Avalanche', logo: 'AVAX' },
      { symbol: 'MATIC', name: 'Polygon', logo: 'MATIC' },
      { symbol: 'LINK', name: 'Chainlink', logo: 'LINK' },
      { symbol: 'UNI', name: 'Uniswap', logo: 'UNI' },
      { symbol: 'LTC', name: 'Litecoin', logo: 'LTC' },
      { symbol: 'ALGO', name: 'Algorand', logo: 'ALGO' },
      { symbol: 'VET', name: 'VeChain', logo: 'VET' },
      { symbol: 'ICP', name: 'Internet Computer', logo: 'ICP' },
      { symbol: 'FIL', name: 'Filecoin', logo: 'FIL' },
      { symbol: 'TRX', name: 'TRON', logo: 'TRX' },
      { symbol: 'ETC', name: 'Ethereum Classic', logo: 'ETC' },
      { symbol: 'XLM', name: 'Stellar', logo: 'XLM' },
      { symbol: 'THETA', name: 'Theta Network', logo: 'THETA' }
    ];

    return cryptos.map((crypto, index) => ({
      rank: index + 1,
      ...crypto,
      price: Math.random() * 50000 + 0.01,
      change1h: (Math.random() - 0.5) * 10,
      change24h: (Math.random() - 0.5) * 20,
      change7d: (Math.random() - 0.5) * 50,
      volume24h: Math.random() * 5000000000,
      marketCap: Math.random() * 800000000000,
      circulatingSupply: Math.random() * 1000000000,
      sparkline: Array.from({ length: 24 }, () => Math.random() * 100)
    }));
  };

  const [cryptoData, setCryptoData] = useState(generateMockData());

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.02),
        change1h: (Math.random() - 0.5) * 10,
        change24h: (Math.random() - 0.5) * 20,
        change7d: (Math.random() - 0.5) * 50,
        volume24h: Math.random() * 5000000000,
        sparkline: Array.from({ length: 24 }, () => Math.random() * 100)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const filteredData = cryptoData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const toggleWatchlist = (symbol) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const generateMiniChart = (data) => {
    if (!data || data.length === 0) return null;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    }).join(' ');

    const isPositive = data[data.length - 1] > data[0];

    return (
      <svg width="60" height="20" className="opacity-60">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? 'var(--color-success)' : 'var(--color-error)'}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  const formatNumber = (num, decimals = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatChange = (change) => {
    const color = change >= 0 ? 'text-success' : 'text-error';
    const sign = change >= 0 ? '+' : '';
    return (
      <span className={`${color} font-medium`}>
        {sign}{change.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg crypto-elevation-1">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Cryptocurrency Prices</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live data</span>
          </div>
        </div>
        
        {/* Search */}
        <div className="max-w-md">
          <Input
            type="search"
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('rank')}
                  iconName={getSortIcon('rank')}
                  iconPosition="right"
                  className="p-0 h-auto font-medium text-muted-foreground"
                >
                  #
                </Button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('price')}
                  iconName={getSortIcon('price')}
                  iconPosition="right"
                  className="p-0 h-auto font-medium text-muted-foreground"
                >
                  Price
                </Button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('change1h')}
                  iconName={getSortIcon('change1h')}
                  iconPosition="right"
                  className="p-0 h-auto font-medium text-muted-foreground"
                >
                  1h %
                </Button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('change24h')}
                  iconName={getSortIcon('change24h')}
                  iconPosition="right"
                  className="p-0 h-auto font-medium text-muted-foreground"
                >
                  24h %
                </Button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('change7d')}
                  iconName={getSortIcon('change7d')}
                  iconPosition="right"
                  className="p-0 h-auto font-medium text-muted-foreground"
                >
                  7d %
                </Button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('volume24h')}
                  iconName={getSortIcon('volume24h')}
                  iconPosition="right"
                  className="p-0 h-auto font-medium text-muted-foreground"
                >
                  Volume (24h)
                </Button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('marketCap')}
                  iconName={getSortIcon('marketCap')}
                  iconPosition="right"
                  className="p-0 h-auto font-medium text-muted-foreground"
                >
                  Market Cap
                </Button>
              </th>
              <th className="text-center p-4 font-medium text-muted-foreground">Last 7 Days</th>
              <th className="text-center p-4 font-medium text-muted-foreground">Watch</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((crypto) => (
              <tr
                key={crypto.symbol}
                className="border-b border-border hover:bg-muted/30 crypto-transition"
              >
                <td className="p-4 text-muted-foreground font-medium">{crypto.rank}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-xs font-bold text-primary">{crypto.logo}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{crypto.name}</div>
                      <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-mono text-foreground">
                  {formatNumber(crypto.price)}
                </td>
                <td className="p-4 text-right">{formatChange(crypto.change1h)}</td>
                <td className="p-4 text-right">{formatChange(crypto.change24h)}</td>
                <td className="p-4 text-right">{formatChange(crypto.change7d)}</td>
                <td className="p-4 text-right font-mono text-foreground">
                  {formatNumber(crypto.volume24h, 0)}
                </td>
                <td className="p-4 text-right font-mono text-foreground">
                  {formatNumber(crypto.marketCap, 0)}
                </td>
                <td className="p-4 text-center">
                  {generateMiniChart(crypto.sparkline)}
                </td>
                <td className="p-4 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleWatchlist(crypto.symbol)}
                    className="w-8 h-8"
                  >
                    <Icon
                      name="Star"
                      size={16}
                      color={watchlist.includes(crypto.symbol) ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptocurrencyTable;