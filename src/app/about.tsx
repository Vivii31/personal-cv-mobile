
import AboutSection from '../components/AboutSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import PageLayout from '../components/PageLayout';
import profileData from '../components/data/profile.json';

export default function AboutScreen() {
  return (
    <PageLayout
      title="About Me"
      subtitle="Kenali lebih jauh tentang diri dan perjalanan saya."
    >
      <AboutSection data={profileData} />

      <ExperienceTimeline />
    </PageLayout>
  );
}
