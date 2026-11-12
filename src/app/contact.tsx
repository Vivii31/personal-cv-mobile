import ContactForm from '../components/ContactForm';
import PageLayout from '../components/PageLayout';
import profileData from '../components/data/profile.json';

export default function ContactScreen() {
  return (
    <PageLayout
      title="Contact Me"
      subtitle="Silakan hubungi saya melalui formulir berikut."
    >
      <ContactForm emailTujuan={profileData.email} />
    </PageLayout>
  );
}