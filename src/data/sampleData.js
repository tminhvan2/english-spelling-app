export const sampleData = {
  topics: [
    {
      id: 'business',
      name: 'Business English',
      icon: '💼',
      description: 'Professional communication and business vocabulary',
      sentences: [
        {
          id: 'bus_1',
          text: 'We need to schedule a meeting to discuss the quarterly budget review.',
          difficulty: 'Intermediate',
          fillInBlank: 'We need to _____ a meeting to discuss the quarterly _____ review.',
          blanks: ['schedule', 'budget'],
          vocabulary: [
            { word: 'schedule', definition: 'to arrange for something to happen at a particular time' },
            { word: 'quarterly', definition: 'happening every three months' },
            { word: 'budget', definition: 'a plan for spending money' }
          ],
          grammar: 'Present tense with infinitive of purpose (to discuss)',
          category: 'meetings'
        },
        {
          id: 'bus_2',
          text: 'The company has implemented new policies to improve employee satisfaction.',
          difficulty: 'Advanced',
          fillInBlank: 'The company has _____ new policies to improve employee _____.',
          blanks: ['implemented', 'satisfaction'],
          vocabulary: [
            { word: 'implemented', definition: 'put a decision or plan into effect' },
            { word: 'policies', definition: 'courses or principles of action adopted by an organization' },
            { word: 'satisfaction', definition: 'fulfillment of one\'s wishes or expectations' }
          ],
          grammar: 'Present perfect tense with passive construction',
          category: 'human resources'
        },
        {
          id: 'bus_3',
          text: 'Our sales team exceeded their targets by twenty percent this month.',
          difficulty: 'Intermediate',
          fillInBlank: 'Our sales team _____ their targets by twenty _____ this month.',
          blanks: ['exceeded', 'percent'],
          vocabulary: [
            { word: 'exceeded', definition: 'went beyond a particular limit or target' },
            { word: 'targets', definition: 'goals or objectives to be achieved' },
            { word: 'percent', definition: 'a rate or proportion per hundred' }
          ],
          grammar: 'Past tense with possessive pronouns and prepositional phrases',
          category: 'sales'
        },
        {
          id: 'bus_4',
          text: 'The presentation should include detailed financial projections for next year.',
          difficulty: 'Advanced',
          fillInBlank: 'The presentation should include detailed _____ projections for next _____.',
          blanks: ['financial', 'year'],
          vocabulary: [
            { word: 'presentation', definition: 'a formal talk about a particular topic' },
            { word: 'detailed', definition: 'having many details; comprehensive' },
            { word: 'projections', definition: 'estimates or forecasts of future situations' }
          ],
          grammar: 'Modal verb (should) with complex noun phrases',
          category: 'finance'
        },
        {
          id: 'bus_5',
          text: 'We must analyze market trends before launching our new product line.',
          difficulty: 'Intermediate',
          fillInBlank: 'We must _____ market trends before launching our new _____ line.',
          blanks: ['analyze', 'product'],
          vocabulary: [
            { word: 'analyze', definition: 'examine methodically and in detail' },
            { word: 'trends', definition: 'general directions in which something is developing' },
            { word: 'launching', definition: 'introducing or starting something new' }
          ],
          grammar: 'Modal verb (must) with gerund phrases',
          category: 'marketing'
        },
        {
          id: 'bus_6',
          text: 'The contract negotiations require careful consideration of all terms and conditions.',
          difficulty: 'Advanced',
          fillInBlank: 'The contract _____ require careful consideration of all terms and _____.',
          blanks: ['negotiations', 'conditions'],
          vocabulary: [
            { word: 'negotiations', definition: 'discussions aimed at reaching an agreement' },
            { word: 'consideration', definition: 'careful thought about something' },
            { word: 'conditions', definition: 'circumstances or requirements that must be met' }
          ],
          grammar: 'Complex sentences with abstract nouns and prepositional phrases',
          category: 'legal'
        }
      ]
    },
    {
      id: 'travel',
      name: 'Travel & Tourism',
      icon: '✈️',
      description: 'Travel vocabulary and tourism-related communication',
      sentences: [
        {
          id: 'trav_1',
          text: 'Please check your passport expiration date before booking international flights.',
          difficulty: 'Beginner',
          fillInBlank: 'Please check your passport _____ date before booking international _____.',
          blanks: ['expiration', 'flights'],
          vocabulary: [
            { word: 'passport', definition: 'an official document for traveling abroad' },
            { word: 'expiration', definition: 'the end of validity period' },
            { word: 'international', definition: 'between different countries' }
          ],
          grammar: 'Imperative mood with possessive pronouns',
          category: 'documentation'
        },
        {
          id: 'trav_2',
          text: 'The hotel reservation includes breakfast and complimentary airport shuttle service.',
          difficulty: 'Intermediate',
          fillInBlank: 'The hotel reservation includes breakfast and _____ airport shuttle _____.',
          blanks: ['complimentary', 'service'],
          vocabulary: [
            { word: 'reservation', definition: 'an arrangement to have something kept for you' },
            { word: 'complimentary', definition: 'free of charge' },
            { word: 'shuttle', definition: 'a vehicle that travels regularly between two places' }
          ],
          grammar: 'Present tense with compound objects',
          category: 'accommodation'
        },
        {
          id: 'trav_3',
          text: 'Tourists should respect local customs and traditions while visiting foreign countries.',
          difficulty: 'Intermediate',
          fillInBlank: 'Tourists should respect local _____ and traditions while visiting foreign _____.',
          blanks: ['customs', 'countries'],
          vocabulary: [
            { word: 'tourists', definition: 'people who travel for pleasure' },
            { word: 'customs', definition: 'traditional practices of a community' },
            { word: 'traditions', definition: 'beliefs or behaviors passed down through generations' }
          ],
          grammar: 'Modal verb (should) with time clauses',
          category: 'culture'
        },
        {
          id: 'trav_4',
          text: 'The guided tour includes visits to historical landmarks and cultural museums.',
          difficulty: 'Intermediate',
          fillInBlank: 'The guided tour includes visits to historical _____ and cultural _____.',
          blanks: ['landmarks', 'museums'],
          vocabulary: [
            { word: 'guided', definition: 'led by a knowledgeable person' },
            { word: 'landmarks', definition: 'recognizable features of a landscape' },
            { word: 'cultural', definition: 'relating to arts and customs of a society' }
          ],
          grammar: 'Present tense with adjective-noun combinations',
          category: 'sightseeing'
        },
        {
          id: 'trav_5',
          text: 'Travel insurance provides coverage for medical emergencies and trip cancellations.',
          difficulty: 'Advanced',
          fillInBlank: 'Travel insurance provides _____ for medical emergencies and trip _____.',
          blanks: ['coverage', 'cancellations'],
          vocabulary: [
            { word: 'insurance', definition: 'protection against financial loss' },
            { word: 'coverage', definition: 'protection provided by insurance' },
            { word: 'emergencies', definition: 'serious, unexpected situations requiring immediate action' }
          ],
          grammar: 'Present tense with abstract nouns and prepositional phrases',
          category: 'insurance'
        },
        {
          id: 'trav_6',
          text: 'Currency exchange rates fluctuate daily, so check current rates before traveling.',
          difficulty: 'Advanced',
          fillInBlank: 'Currency exchange rates _____ daily, so check current rates before _____.',
          blanks: ['fluctuate', 'traveling'],
          vocabulary: [
            { word: 'currency', definition: 'money used in a particular country' },
            { word: 'fluctuate', definition: 'rise and fall irregularly' },
            { word: 'rates', definition: 'fixed prices or charges' }
          ],
          grammar: 'Complex sentences with adverbial clauses and imperatives',
          category: 'money'
        }
      ]
    },
    {
      id: 'daily',
      name: 'Daily Life',
      icon: '🏠',
      description: 'Everyday vocabulary and common life situations',
      sentences: [
        {
          id: 'daily_1',
          text: 'I usually prepare breakfast while listening to morning news on the radio.',
          difficulty: 'Beginner',
          fillInBlank: 'I usually prepare _____ while listening to morning news on the _____.',
          blanks: ['breakfast', 'radio'],
          vocabulary: [
            { word: 'prepare', definition: 'make ready for use or consideration' },
            { word: 'breakfast', definition: 'the first meal of the day' },
            { word: 'listening', definition: 'paying attention to sounds' }
          ],
          grammar: 'Present tense with time expressions and gerunds',
          category: 'morning routine'
        },
        {
          id: 'daily_2',
          text: 'The grocery store offers fresh vegetables and organic fruits every morning.',
          difficulty: 'Beginner',
          fillInBlank: 'The grocery store offers fresh _____ and organic fruits every _____.',
          blanks: ['vegetables', 'morning'],
          vocabulary: [
            { word: 'grocery', definition: 'a store selling food and household items' },
            { word: 'vegetables', definition: 'plants or parts of plants used as food' },
            { word: 'organic', definition: 'produced without artificial chemicals' }
          ],
          grammar: 'Present tense with adjectives and time expressions',
          category: 'shopping'
        },
        {
          id: 'daily_3',
          text: 'My neighbor helped me repair the broken fence in our backyard garden.',
          difficulty: 'Intermediate',
          fillInBlank: 'My neighbor helped me repair the broken _____ in our backyard _____.',
          blanks: ['fence', 'garden'],
          vocabulary: [
            { word: 'neighbor', definition: 'a person living nearby' },
            { word: 'repair', definition: 'fix something that is broken' },
            { word: 'fence', definition: 'a barrier enclosing an area' }
          ],
          grammar: 'Past tense with object complements and possessive pronouns',
          category: 'home maintenance'
        },
        {
          id: 'daily_4',
          text: 'The children enjoy playing outdoor games during their summer vacation.',
          difficulty: 'Beginner',
          fillInBlank: 'The children enjoy playing outdoor _____ during their summer _____.',
          blanks: ['games', 'vacation'],
          vocabulary: [
            { word: 'children', definition: 'young human beings' },
            { word: 'outdoor', definition: 'taking place outside' },
            { word: 'vacation', definition: 'time spent away from work or school' }
          ],
          grammar: 'Present tense with gerunds and possessive pronouns',
          category: 'family activities'
        },
        {
          id: 'daily_5',
          text: 'We decided to redecorate the living room with modern furniture and colorful artwork.',
          difficulty: 'Intermediate',
          fillInBlank: 'We decided to redecorate the living room with modern _____ and colorful _____.',
          blanks: ['furniture', 'artwork'],
          vocabulary: [
            { word: 'redecorate', definition: 'decorate again in a different way' },
            { word: 'furniture', definition: 'movable objects used to make a room suitable for living' },
            { word: 'artwork', definition: 'creative visual works' }
          ],
          grammar: 'Past tense with infinitives and compound objects',
          category: 'home decoration'
        },
        {
          id: 'daily_6',
          text: 'The community center organizes various activities including fitness classes and hobby workshops.',
          difficulty: 'Advanced',
          fillInBlank: 'The community center organizes various activities including fitness _____ and hobby _____.',
          blanks: ['classes', 'workshops'],
          vocabulary: [
            { word: 'community', definition: 'a group of people living in the same area' },
            { word: 'organizes', definition: 'arranges systematically' },
            { word: 'workshops', definition: 'brief intensive courses for a small group' }
          ],
          grammar: 'Present tense with participial phrases and compound objects',
          category: 'community activities'
        }
      ]
    }
  ]
};

export default sampleData;