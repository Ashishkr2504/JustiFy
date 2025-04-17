import React from 'react'
import Chatbot from '../dashboard/Chatbot'
import LegalTemplates from '../dashboard/LegalTemplates'
import DocumentAnalyzer from '../dashboard/DocumentAnalyzer'
import DocumentSearch from '../dashboard/DocumentSearch'
import CaseTracker from '../dashboard/CaseTracker'
import LocationServices from '../dashboard/LocationServices'

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <Chatbot />
      <LegalTemplates />
      <DocumentAnalyzer />
      <DocumentSearch />
      <CaseTracker />
      <LocationServices />
    </div>
  )
}

export default Dashboard
