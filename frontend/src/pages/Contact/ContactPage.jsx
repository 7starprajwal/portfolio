import ContactHero from "../../components/contact/ContactHero";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactForm from "../../components/contact/ContactForm";
import SocialLinks from "../../components/contact/SocialLinks";

function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <ContactHero />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-bold text-white">
              Let's Connect
            </h2>

            <p className="mb-10 leading-8 text-slate-400">
              Whether you're looking for a Full Stack Developer, want to
              discuss a project, collaborate on an idea, or simply connect,
              feel free to reach out. I'm always open to new opportunities
              and meaningful conversations.
            </p>

            <ContactInfo />

            <SocialLinks />
          </div>

          <div>
            <h2 className="mb-8 text-3xl font-bold text-white">
              Send a Message
            </h2>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;