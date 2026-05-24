export interface BioData {
  id: number;
  name: string;
  role: string;
  company: string;
  era: string;
  nationality: string;
  born: string;
  died?: string;
  bio: string;
  milestones: { year: string; event: string }[];
  quotes: string[];
  relatedIds: number[];
  image?: string;
}

export const bioData: Record<number, BioData> = {
  51: {
    id: 51, name: "Geoffrey Hinton", role: "Professor Emeritus", company: "Deep Learning Pioneer", era: "Cloud & AI", nationality: "British-Canadian", born: "December 6, 1947",
    bio: "One of the 'Godfathers of Deep Learning' who won the 2018 Turing Award. Hinton invented backpropagation, the algorithm that makes neural network training possible. He spent a decade at Google before resigning in 2023 to speak freely about AI risks. His 2012 ImageNet breakthrough (AlexNet) sparked the modern AI revolution. Hinton now warns that AI could pose an existential risk if not developed carefully.",
    quotes: ["I have suddenly switched my views on whether these things are going to be more intelligent than us.", "The alarm bell I'm ringing has to do with the existential threat."],
    milestones: [{ year: "1947", event: "Born" }],
    relatedIds: [52, 50, 47],
  },
  52: {
    id: 52, name: "Yoshua Bengio", role: "Professor", company: "Mila / Université de Montréal", era: "Cloud & AI", nationality: "Canadian", born: "March 5, 1964",
    bio: "Co-recipient of the 2018 Turing Award and one of the most cited researchers in deep learning. Bengio pioneered work on neural language models, attention mechanisms, and generative adversarial networks. His Mila lab in Montreal is one of the world's largest deep learning research centers. Bengio has become an increasingly vocal advocate for AI safety and governance, calling for international coordination on AI development.",
    quotes: ["We need to make sure that AI benefits everyone, not just a few.", "The development of AI should be guided by human values."],
    milestones: [{ year: "1964", event: "Born" }],
    relatedIds: [50, 51, 46],
  },
  53: {
    id: 53, name: "Andrej Karpathy", role: "AI Researcher", company: "Tesla AI / OpenAI", era: "The Frontier", nationality: "Slovak-Canadian", born: "October 23, 1986",
    bio: "Andrej Karpathy was the founding member of OpenAI and later led Tesla's Autopilot team. His CS231n course at Stanford became the definitive introduction to deep learning for computer vision. At Tesla, he built the neural network infrastructure that powers Full Self-Driving. Karpathy returned to OpenAI briefly before founding Eureka Labs, an AI-native education company. His technical blog posts and videos have educated a generation of AI engineers.",
    quotes: ["Neural networks are the most beautiful and elegant thing in computer science.", "Software 2.0 is written in the weights of neural networks."],
    milestones: [{ year: "1986", event: "Born" }],
    relatedIds: [47, 46, 37],
  },
  54: {
    id: 54, name: "Noam Shazeer", role: "Co-founder & CEO", company: "Character.AI", era: "The Frontier", nationality: "American", born: "1976",
    bio: "Noam Shazeer co-authored the landmark 'Attention Is All You Need' paper at Google in 2017, introducing the Transformer architecture that powers virtually all modern language models (GPT, BERT, Claude). He left Google in 2021 to co-found Character.AI, which lets users create and chat with AI characters. The company was acquired by Google in 2024 for $2.7 billion. Shazeer's work on Transformers, multi-head attention, and mixture-of-experts has been foundational to the AI revolution.",
    quotes: ["Attention is all you need.", "I want to make AI that people love to talk to."],
    milestones: [{ year: "1976", event: "Born" }],
    relatedIds: [47, 46, 55],
  },
  55: {
    id: 55, name: "Ilya Sutskever", role: "Co-founder", company: "SSI / OpenAI", era: "The Frontier", nationality: "Russian-Canadian-Israeli", born: "1986",
    bio: "Ilya Sutskever co-founded OpenAI and served as its Chief Scientist, playing a central role in GPT models and the landmark AlexNet. In 2023, he was a key figure in the boardroom drama that briefly ousted Sam Altman, later expressing regret. In 2024, he left OpenAI to found Safe Superintelligence Inc. (SSI), dedicated to building safe superintelligent AI. Sutskever's technical contributions to sequence-to-sequence models and the modern LLM architecture make him one of the most impactful AI researchers alive.",
    quotes: ["Superintelligence is coming. The question is whether it will be safe.", "The most important thing we can do is ensure AI benefits all of humanity."],
    milestones: [{ year: "1986", event: "Born" }],
    relatedIds: [47, 46, 48],
  },
  56: {
    id: 56, name: "Meg Whitman", role: "CEO", company: "eBay / HP", era: "The Dot-Com Boom", nationality: "American", born: "August 4, 1956",
    bio: "Meg Whitman transformed eBay from a 30-person startup to an 15,000-employee global commerce platform during her decade as CEO (1998-2008). She then led HP through its complex split into two companies and served as CEO of Quibi (a short-lived streaming venture). Her political ambitions included a California gubernatorial run in 2010 and serving as US Ambassador to Kenya. Whitman demonstrated that experienced business leadership could scale internet startups into global enterprises.",
    quotes: ["Run to the fire; don't hide from it.", "You can't stand on the sidelines and be successful."],
    milestones: [{ year: "1956", event: "Born" }],
    relatedIds: [40, 22, 26],
  },
  57: {
    id: 57, name: "Marissa Mayer", role: "CEO", company: "Yahoo / Google", era: "Mobile & Social", nationality: "American", born: "May 30, 1975",
    bio: "Marissa Mayer was Google's first female engineer (employee #20) and helped shape the search engine's user interface for over a decade. As CEO of Yahoo (2012-2017), she attempted to turn around the struggling internet pioneer through acquisitions (Tumblr) and product redesigns, though the company was eventually sold to Verizon. Mayer's tenure at Yahoo was controversial but her role as one of the first prominent women engineers in Silicon Valley made her an important trailblazer.",
    quotes: ["I always did something I was a little not ready to do.", "If you push through that feeling of being scared, that feeling of taking a risk, really amazing things can happen."],
    milestones: [{ year: "1975", event: "Born" }],
    relatedIds: [40, 26, 56],
  },
  58: {
    id: 58, name: "Safra Catz", role: "CEO", company: "Oracle", era: "Cloud & AI", nationality: "Israeli-American", born: "December 1, 1961",
    bio: "Safra Catz has been one of Oracle's most powerful executives for over two decades, becoming co-CEO in 2014 and sole CEO in 2019. An Israeli immigrant who arrived in the US at age six, Catz was a Wall Street banker before joining Oracle. She orchestrated some of tech's biggest acquisitions, including PeopleSoft, Siebel, Sun Microsystems, and Cerner. Known for her financial discipline and fierce negotiation style, Catz has kept Oracle relevant in the cloud computing era.",
    quotes: ["We don't care if we put our competitors out of business.", "I don't believe in trying to be something you're not."],
    milestones: [{ year: "1961", event: "Born" }],
    relatedIds: [13, 39, 59],
  },
  59: {
    id: 59, name: "Ginni Rometty", role: "CEO", company: "IBM", era: "Cloud & AI", nationality: "American", born: "July 29, 1957",
    bio: "Virginia 'Ginni' Rometty was the first woman to lead IBM, serving as CEO from 2012 to 2020. She pivoted the century-old company toward cloud computing, AI (Watson), and cybersecurity, while managing the decline of traditional hardware businesses. Her acquisition of Red Hat for $34 billion was the largest software acquisition in history at the time. Rometty also championed workforce re-skilling and diversity initiatives throughout the tech industry.",
    quotes: ["Growth and comfort do not coexist.", "I learned to always take on things I'd never done before."],
    milestones: [{ year: "1957", event: "Born" }],
    relatedIds: [58, 39, 60],
  },
  60: {
    id: 60, name: "Ursula Burns", role: "CEO", company: "Xerox", era: "The Personal Computer", nationality: "American", born: "September 20, 1958",
    bio: "Ursula Burns rose from an engineering intern to become the first Black woman CEO of a Fortune 500 company (Xerox, 2009-2016). Growing up in a Lower East Side housing project raised by a single mother from Panama, Burns earned a mechanical engineering degree from NYU and joined Xerox in 1980. She led Xerox's transformation from a copier company to a services business, splitting it into two companies. Burns now serves on numerous corporate boards and advocates for STEM education and diversity in corporate leadership.",
    quotes: ["Where you are is not who you are.", "I'm a black lady from the Lower East Side of New York. Not a lot intimidates me."],
    milestones: [{ year: "1958", event: "Born" }],
    relatedIds: [59, 40, 3],
  },
};

export function getBioById(id: number): BioData | undefined {
  return bioData[id];
}