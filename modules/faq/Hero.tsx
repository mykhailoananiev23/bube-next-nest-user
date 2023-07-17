interface HeroProps {
    children: JSX.Element;
}

export const HeroSection = ({ children }: HeroProps) => {
    return (
        <section className="bg-[#DCF0FB] border flex-col p-4 my-auto">
            {children}
        </section>
    );
}
  