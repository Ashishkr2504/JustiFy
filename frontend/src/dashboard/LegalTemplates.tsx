
 import { motion } from 'framer-motion'

const LegalTemplatesPage = () => { return ( 
<div className=" px-9">
  <h2 className="text-4xl font-extrabold mb-6  tracking-wide text-[#2E2E2E]" style={{ fontFamily: '"Playfair Display", serif' }}>
      Hey there, welcome to your <br />Dashboard!
  </h2>
  <p className="text-xl italic text-[#14532D] mb-6 ">
      You've just unlocked your personal legal toolkit.  <br />
      Dive in and make justice easy!
  </p>

  <motion.div className="bg-[#FFFAF0] p-6 rounded-2xl shadow w-full max-w-6xl mx-auto min-h-[60vh] mb-18"
    initial={{ opacity: 0, y: 40 }} 
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }} > 
    <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4">📄 Legal Templates</h2> 
    <p className="text-gray-700">Access a variety of legal document templates:</p>
    <div className="mt-6 space-y-3">
      {Array.from({ length: 29 }).map((_, i) => (
        <p key={i} className="text-gray-700">
          • Template #{i + 1}: Description of legal document template #{i + 1}.
        </p>
      ))}
    </div>
  </motion.div>
</div>
  
  ) }
  export default LegalTemplatesPage