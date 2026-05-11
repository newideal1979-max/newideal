import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import Courses from '@/components/sections/Courses'
import Curriculum from '@/components/sections/Curriculum'
import WhyNewIdeal from '@/components/sections/WhyNewIdeal'
import StudentResults from '@/components/sections/StudentResults'
import Instructor from '@/components/sections/Instructor'
import BatchAnnouncement from '@/components/sections/BatchAnnouncement'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import FAQ from '@/components/sections/FAQ'

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Courses />
      <Curriculum />
      <WhyNewIdeal />
      <StudentResults />
      <Instructor />
      <BatchAnnouncement />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
