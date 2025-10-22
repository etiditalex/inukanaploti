'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ListingCard } from '@/components/ListingCard'
import { MapComponent } from '@/components/MapComponent'
import { Listing } from '@/types/listing'
import listingsData from '@/data/listings.json'

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>(listingsData as Listing[])
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listingsData as Listing[])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredListing, setHoveredListing] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const locations = ['all', ...Array.from(new Set(listings.map(l => l.location.split(' – ')[0])))]

  useEffect(() => {
    let filtered = listings

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(listing =>
        listing.location.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }

    // Price filter
    filtered = filtered.filter(listing =>
      listing.priceKES >= priceRange[0] && listing.priceKES <= priceRange[1]
    )

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(listing => listing.status === selectedStatus)
    }

    setFilteredListings(filtered)
  }, [searchTerm, selectedLocation, priceRange, selectedStatus, listings])

  const handleListingHover = (listingId: string) => {
    setHoveredListing(listingId)
  }

  const handleListingLeave = () => {
    setHoveredListing(null)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Property Listings</h1>
            <p className="text-body max-w-2xl mx-auto">
              Discover our premium land investments across Kenya's most promising locations. 
              Use filters to find the perfect property for your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden touch-manipulation"
                    style={{ minHeight: '44px', minWidth: '44px' }}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Search Properties
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <Input
                        placeholder="Search by name, location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Locations</option>
                      {locations.slice(1).map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Price Range (KES)
                    </label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000000])}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Status
                    </label>
                    <div className="space-y-2">
                      {['all', 'available', 'sold'].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={selectedStatus === status}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="mr-2"
                          />
                          <span className="capitalize">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedLocation('all')
                      setPriceRange([0, 5000000])
                      setSelectedStatus('all')
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">
                  {filteredListings.length} Properties Found
                </h2>
                <p className="text-neutral-600">
                  {searchTerm && `Search results for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="touch-manipulation"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="touch-manipulation"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Map Toggle */}
            <div className="mb-6">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Show on Map
              </Button>
            </div>

            {/* Listings Grid */}
            <div className={
              viewMode === 'grid' 
                ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
            }>
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onMarkerHover={() => handleListingHover(listing.id)}
                  onMarkerLeave={handleListingLeave}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredListings.length === 0 && (
              <Card className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  No Properties Found
                </h3>
                <p className="text-neutral-600 mb-4">
                  Try adjusting your search criteria or filters to find more properties.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedLocation('all')
                    setPriceRange([0, 5000000])
                    setSelectedStatus('all')
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Map Modal/Component would go here */}
      <MapComponent 
        listings={filteredListings}
        hoveredListing={hoveredListing}
        onListingHover={handleListingHover}
        onListingLeave={handleListingLeave}
      />
    </div>
  )
}
