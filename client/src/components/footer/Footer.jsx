import { Container } from "../../utils";

const Footer = () => {
  return (
    <footer className="mt-16 w-full bg-white py-20 shadow-lg">
        <Container>
        <div className="flex flex-col">
            <div className="flex items-start justify-between border-b-2 border-slate-300 pb-9">
            <div className="flex w-full max-w-[292px] flex-col items-start justify-between gap-4">
                <span className="text-[32px] font-bold text-[#3563e9]">MYRENT</span>
                <span className="text-base font-medium text-[#131313]">
                Our vision is to provide convenience and help increase your sales
                business.
                </span>
            </div>

            <div className="flex gap-14">
                <div className="flex w-[152px] flex-col gap-6">
                <span className="text-xl font-semibold text-[#1a202c]">
                    About
                </span>
                <div className="flex flex-col gap-3 text-base font-medium text-[#131313]">
                    <span className="text-base font-medium">How</span>
                    <span className="text-base font-medium">Featured</span>
                    <span className="text-base font-medium">Partnership</span>
                    <span className="text-base font-medium">
                    Bussiness Relation
                    </span>
                </div>
                </div>

                <div className="flex w-[152px] flex-col gap-6">
                <span className="text-xl font-semibold text-[#1a202c]">
                    Community
                </span>
                <div className="flex flex-col gap-3 text-base font-medium text-[#131313]">
                    <span className="text-base font-medium">Events</span>
                    <span className="text-base font-medium">Blog</span>
                    <span className="text-base font-medium">Podcast</span>
                    <span className="text-base font-medium">Invite a friend</span>
                </div>
                </div>

                <div className="flex w-[152px] flex-col gap-6">
                <span className="text-xl font-semibold text-[#1a202c]">
                    Socials
                </span>
                <div className="flex flex-col gap-3 text-base font-medium text-[#131313]">
                    <span className="text-base font-medium">Discord</span>
                    <span className="text-base font-medium">Instagram</span>
                    <span className="text-base font-medium">Twitter</span>
                    <span className="text-base font-medium">Facebook</span>
                </div>
                </div>
            </div>
            </div>

            <div className="flex w-full items-center justify-between pt-9">
            <span className="text-base font-semibold text-[#1a202c]">
                ©2024 MORENT. All rights reserved
            </span>
            <div className="flex items-center gap-14">
                <span className="text-base font-semibold text-[#1a202c]">
                Privacy & Policy
                </span>
                <span className="text-base font-semibold text-[#1a202c]">
                Terms & Condition
                </span>
            </div>
            </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;