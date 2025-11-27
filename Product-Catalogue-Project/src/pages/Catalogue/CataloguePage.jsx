import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Navbar from '../../components/commonComponent/Navbar'
import Header from '../../components/catalogueComponent/Header'
import SideBar from '../../components/catalogueComponent/SideBar'
import ProductTable from '../../components/catalogueComponent/ProductTable'
import response1Data from '../../data/response1.json'
import response2Data from '../../data/response2.json'

const CataloguePage = () => {
  const [currentDataset, setCurrentDataset] = useState('response1')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10
  const [selectedIds, setSelectedIds] = useState(() => new Set())

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
    return data.Frequent.filter((item) =>
      item.category.toLowerCase().includes(selectedCat.name.toLowerCase())
    )
  }, [selectedCategory, data.Frequent, categories])

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




  return (
    <>
      <Navbar />
  <Header selectedCount={selectedIds.size} currentDataset={currentDataset} onDatasetSwitch={onSwitchDataset} />
  {/* main content: constrain total height so page doesn't scroll; inner panes scroll */}
    <div className='m-4 max-h-[calc(100vh-130px)] overflow-hidden'>
        {/* Dataset Switcher */}
        {/* <div className='mb-4 flex gap-2'>
          <button
            onClick={() => handleDatasetSwitch('response1')}
            className={`px-4 py-2 rounded-md font-medium transition ${
              currentDataset === 'response1'
                ? 'bg-blue-950 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}>
            India & States
          </button>
          <button
            onClick={() => handleDatasetSwitch('response2')}
            className={`px-4 py-2 rounded-md font-medium transition ${
              currentDataset === 'response2'
                ? 'bg-blue-950 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}>
            IMF
          </button>
        </div> */}

        {/* Main Layout: Sidebar + Table */}
        <div className='flex gap-4'>
          <SideBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
             onSwitchDataset={onSwitchDataset}
             currentDataset={currentDataset}
          />
          <ProductTable
            data={filteredData}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            onShareToggle={handleShareToggle}
          />
        </div>
      </div>
    </>
  )
}

export default CataloguePage