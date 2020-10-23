import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import '../styles/style.css';

// for locally downloaded intent data and tracker from npm
import { localTracker } from '../lib/local-tracker';
import MainHero from '../components/Hero';
import CallToAction from '../components/CallToAction';
import { PersonalizedHero } from '../components/PersonalizedHero';
import { ComponentMapping } from '../lib/ComponentMapping';
import TalkList from '../components/TalkList';
import { RegisterForm } from '../components/RegisterForm';

const componentMapping: ComponentMapping = {
  hero: MainHero,
  cta: CallToAction,
  // that's 'personalized hero' to you, sir.
  '3zPkEj1KqeSn4QdsdnNKO3': PersonalizedHero,
  talksList: TalkList,
  registrationForm: RegisterForm,
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UniformTracker trackerInstance={localTracker} componentMapping={componentMapping}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </UniformTracker>
    </>
  );
}

export default MyApp;
