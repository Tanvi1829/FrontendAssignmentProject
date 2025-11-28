import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import Navbar from '../../components/commonComponent/Navbar'
import Header from '../../components/catalogueComponent/Header'
import SideBar from '../../components/catalogueComponent/SideBar'
import ProductTable from '../../components/catalogueComponent/ProductTable'
import response1Data from '../../data/response1.json'
import response2Data from '../../data/response2.json'
import { AuthContext } from '../../App'

const CataloguePage = () => {
  const { isLoggedIn, currentUser } = useContext(AuthContext)
  const [currentDataset, setCurrentDataset] = useState('response1')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [bookmarkedIds, setBookmarkedIds] = useState(() => new Set())
  const [pinIds, setPinIds] = useState(() => new Set())

  // helper to build per-user storage keys
  const storageKey = useCallback((type) => {
    if (!currentUser) return null
    // encode the username/email so the key is safe for localStorage
    return `user:${encodeURIComponent(currentUser)}:${type}`
  }, [currentUser])

  // Load persisted sets for current user when they change / on login
  useEffect(() => {
    if (!currentUser) {
      // clear local selections when no user
      setBookmarkedIds(new Set())
      setSelectedIds(new Set())
      setPinIds(new Set())
      return
    }

    const loadSet = (type) => {
      try {
        const key = storageKey(type)
        const raw = key ? localStorage.getItem(key) : null
        console.log(`[Load] Loading ${type} from ${key}:`, raw)
        if (!raw) return new Set()
        const arr = JSON.parse(raw)
        const set = new Set(Array.isArray(arr) ? arr : [])
        console.log(`[Load] Loaded ${type} set:`, Array.from(set))
        return set
      } catch (e) {
        console.error(`[Load] Error loading ${type}:`, e)
        return new Set()
      }
    }

    setBookmarkedIds(loadSet('bookmarked'))
    setSelectedIds(loadSet('selected'))
    setPinIds(loadSet('pinned'))
  }, [currentUser])

  // Persist sets when they change (per-user)
  useEffect(() => {
    if (!currentUser) return
    try {
      const key = storageKey('bookmarked')
      if (key) {
        const jsonStr = JSON.stringify(Array.from(bookmarkedIds))
        localStorage.setItem(key, jsonStr)
        console.log(`[Persist] Saved bookmarks to ${key}:`, jsonStr)
      }
    } catch (e) { 
      console.error(`[Persist] Error saving bookmarks:`, e)
    }
  }, [bookmarkedIds, currentUser, storageKey])

  useEffect(() => {
    if (!currentUser) return
    try {
      const key = storageKey('selected')
      if (key) {
        const jsonStr = JSON.stringify(Array.from(selectedIds))
        localStorage.setItem(key, jsonStr)
        console.log(`[Persist] Saved selected to ${key}:`, jsonStr)
      }
    } catch (e) { 
      console.error(`[Persist] Error saving selected:`, e)
    }
  }, [selectedIds, currentUser, storageKey])

  useEffect(() => {
    if (!currentUser) return
    try {
      const key = storageKey('pinned')
      if (key) {
        const jsonStr = JSON.stringify(Array.from(pinIds))
        localStorage.setItem(key, jsonStr)
        console.log(`[Persist] Saved pinned to ${key}:`, jsonStr)
      }
    } catch (e) { 
      console.error(`[Persist] Error saving pinned:`, e)
    }
  }, [pinIds, currentUser, storageKey])

  // Get current dataset
  const data = currentDataset === 'response1' ? response1Data : response2Data

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(() => data.categories || [], [data])

  // Set initial selected category
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id)
    }
  }, [categories, selectedCategory])

  // Filter data by selected category
  const filteredData = useMemo(() => {
    if (!selectedCategory || !data.Frequent) return []
    const selectedCat = categories.find((c) => c.id === selectedCategory)
    if (!selectedCat) return data.Frequent

    // Filter by category name (case-insensitive partial match)
    const filtered = data.Frequent.filter((item) =>
      item.category.toLowerCase().includes(selectedCat.name.toLowerCase())
    )

    // Sort: pinned items first, then others
    return filtered.sort((a, b) => {
      const aIsPinned = pinIds.has(a.id)
      const bIsPinned = pinIds.has(b.id)
      if (aIsPinned && !bIsPinned) return -1
      if (!aIsPinned && bIsPinned) return 1
      return 0
    })
  }, [selectedCategory, data.Frequent, categories, pinIds])

  // Get bookmarked products
  const bookmarkedProducts = useMemo(() => {
    // show bookmarked products across both datasets so users see their saved items
    // regardless of which dataset is currently selected
    const all = []
    if (response1Data.Frequent) all.push(...response1Data.Frequent)
    if (response2Data.Frequent) all.push(...response2Data.Frequent)
    return all.filter((item) => bookmarkedIds.has(item.id)) || []
  }, [bookmarkedIds, data.Frequent])

  // Reset pagination when dataset or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [currentDataset, selectedCategory])

  // Handle category selection with debounce
  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategory(categoryId)
  }, [])

  // Handle dataset switch
  const onSwitchDataset = (dataset) => {
    setCurrentDataset(dataset);   // <- No fetch needed, switching imports only
  };
  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    // Scroll only the product table body to top (not the whole page)
    const el = document.getElementById('product-table-body')
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Called when ProductTable toggles the plus/share action for an item
  const handleShareToggle = useCallback((itemId, isActive) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (isActive) next.add(itemId)
      else next.delete(itemId)
      return next
    })

  }, [])

    const handleBookmarkToggle = useCallback((itemId, isActive) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
        if (isActive) next.add(itemId)
        else next.delete(itemId)
      return next
    })
  }, )


    const handlePinToggle = useCallback((itemId, isActive) => {
    setPinIds((prev) => {
      const next = new Set(prev)
        if (isActive) next.add(itemId)
        else next.delete(itemId)
      return next
    })
  }, )




  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
  <Header selectedCount={selectedIds.size} currentDataset={currentDataset} bookmarkCount={bookmarkedIds.size} pinCount={pinIds.size} onDatasetSwitch={onSwitchDataset} bookmarkedProducts={bookmarkedProducts} />
  {/* main content: constrain total height so page doesn't scroll; inner panes scroll */}
    <div className='m-2 md:m-4 max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-200px)] overflow-hidden'>
        {/* Main Layout: Sidebar + Table - Desktop/Tablet and Mobile */}
        <div className='flex flex-col md:flex-row gap-2 md:gap-4 h-full'>
          {/* Sidebar - Hidden on mobile (drawer toggle in SideBar component) */}
          <div className='hidden md:block md:flex-shrink-0'>
            <SideBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              onSwitchDataset={onSwitchDataset}
              currentDataset={currentDataset}
            />
          </div>

          {/* Mobile Sidebar - Handled by SideBar component's drawer */}
          <div className='md:hidden'>
            <SideBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              onSwitchDataset={onSwitchDataset}
              currentDataset={currentDataset}
            />
          </div>

          {/* ProductTable */}
          <div className='flex-1 min-w-0'>
            <ProductTable
              data={filteredData}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              onShareToggle={handleShareToggle}
              onBookmarkToggle={handleBookmarkToggle}
              onPinToggle={handlePinToggle}
              bookmarkedIds={bookmarkedIds}
              selectedIds={selectedIds}
              pinIds={pinIds}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CataloguePage