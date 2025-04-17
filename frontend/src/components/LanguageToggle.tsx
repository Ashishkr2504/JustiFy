import React, { useState } from 'react'

const LanguageToggle = () => {
  const [lang, setLang] = useState('en')

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'))
  }

  return (
    <button onClick={toggleLang} className="bg-gray-200 px-4 py-1 rounded">
      {lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    </button>
  )
}

export default LanguageToggle
