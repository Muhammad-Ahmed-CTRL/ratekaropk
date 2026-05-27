import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,245,196,0.08)] bg-[#0A0A0F] py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" className="relative block h-12 w-[225px]">
              <Image
                src="/brand/ratekaro-wordmark.png"
                alt="RateKaro PK"
                fill
                className="object-contain object-left"
                sizes="225px"
              />
            </Link>
            <p className="text-[#8B8B9E] text-sm mt-1 max-w-xs">
              Pakistan&apos;s first freelancer rate intelligence platform.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold text-[#8B8B9E] uppercase tracking-widest">Tools</span>
              <Link href="/calculator" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">Rate Calculator</Link>
              <Link href="/tax" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">Tax Calculator</Link>
              <Link href="/proposals" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">Proposal Generator</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold text-[#8B8B9E] uppercase tracking-widest">Account</span>
              <Link href="/dashboard" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">Dashboard</Link>
              <Link href="/login" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">Login</Link>
              <Link href="/signup" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">Sign Up</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold text-[#8B8B9E] uppercase tracking-widest">Info</span>
              <a href="https://pseb.org.pk" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">PSEB</a>
              <a href="https://fbr.gov.pk" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8B8B9E] hover:text-[#00F5C4] transition-colors">FBR Pakistan</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#8B8B9E] text-xs">
            © {new Date().getFullYear()} RateKaro PK. Built for Pakistani freelancers.
          </p>
          <p className="text-[#8B8B9E] text-xs">
            Rate data is market-estimated. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
