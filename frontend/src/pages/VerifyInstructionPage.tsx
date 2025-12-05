import { MailCheck } from 'lucide-react';

export function VerifyInstructionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
        <MailCheck className="text-blue-700 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Check your inbox 📬</h1>
        <p className="text-gray-600">
          We've sent a confirmation email to your inbox. Please click the link inside to complete your registration.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          You can close this tab after confirming. A new window will open automatically once you're verified.
        </p>
      </div>
    </div>
  );
}