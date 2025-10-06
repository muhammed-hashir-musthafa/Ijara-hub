import ArticlePage from '@/components/renter/containers/ArticlePage/ArticlePage'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Articles| Ijara Hub Premium Rental Service",
  description: "Read articles about Ijara Hub Rental Services and our offerings.",
  keywords: [
    "Ijara Hub",
    "News",
    "Blog",
    "News Page",
    "blog Page",
    "Rental Services",
    "Articles", 
    "Car Rental",
    "Vehicle Leasing",
    "Transportation Solutions",
    "Customer Service",
    "Affordable Rentals",
    "Reliable Vehicles",
    "Rental Fleet",
    "Long-term Rentals",
    "Short-term Rentals",
    "Rental Policies",
    "Sustainable Transportation",
  ],
}


const Article = () => {
  return (
    <div>
      <ArticlePage  />
    </div>
  )
}

export default Article
