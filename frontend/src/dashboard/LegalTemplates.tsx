import { useNavigate } from 'react-router-dom';

const templates = [
  { type: 'rent-agreement', label: 'Rent Agreement' },
  { type: 'loan-agreement', label: 'Loan Agreement' },
  { type: 'loan-agreement-security', label: 'Loan Agreement with Security' },
  { type: 'cheque-bounce-notice', label: 'Cheque Bounce Notice' },
  { type: 'legal-notice', label: 'Legal Notice' },
  { type: 'simple-money-bond', label: 'Simple Money Bond' },
  { type: 'bond-bail-bond', label: 'Bond & Bail Bond (CrPC)' },
  { type: 'employee-bond-noncompete', label: 'Employee Bond of Non-Compete' },
  { type: 'performance-bond', label: 'Performance Bond (Contract)' },
  { type: 'security-bond-surety', label: 'Security Bond by a Surety' },
  { type: 'security-bond-succession', label: 'Security Bond for Succession Certificate' },
  { type: 'leave-license-agreement', label: 'Leave and License Agreement' },
  { type: 'simple-mortgage-deed', label: 'Simple Mortgage Deed' },
  { type: 'agreement-sale-house', label: 'Agreement for Sale of a House' },
  { type: 'independent-contractor-agreement', label: 'Independent Contractor Agreement' },
  { type: 'shareholders-agreement', label: 'Shareholders Agreement' },
  { type: 'joint-venture-shareholders-agreement', label: 'Joint Venture/Shareholders Agreement' },
  { type: 'memorandum-of-understanding', label: 'Memorandum of Understanding (MOU)' },
  { type: 'franchise-agreement', label: 'Franchise Agreement' },
  { type: 'employee-service-agreement', label: 'Employee Service Agreement' },
  { type: 'confidential-nda', label: 'Confidential & Non-Disclosure Agreement (NDA)' },
  { type: 'business-service-agreement', label: 'Business Service Agreement' },
  { type: 'partnership-agreement', label: 'Partnership Agreement' },
  { type: 'retainership-agreement', label: 'Retainership Agreement' },
  { type: 'deed-of-guarantee', label: 'Deed of Guarantee' },
  { type: 'agreement-for-sale', label: 'Agreement for Sale' },
  { type: 'affidavit-indemnity', label: 'Affidavit and Indemnity' },
  
  // Add more templates as needed
];

export default function LegalTemplates() {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Legal Templates</h2>
      <ul className="space-y-4">
        {templates.map(t => (
          <li key={t.type}>
            <button
              className="bg-[#14532D] text-white px-6 py-3 rounded-lg shadow hover:bg-[#1e3d25] transition"
              onClick={() => navigate(`/legal-templates/${t.type}`)}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}