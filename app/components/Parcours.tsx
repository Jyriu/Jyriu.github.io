'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BoxReveal } from '@/components/boxreveal';

interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  description?: string;
}

interface EducationItem {
  date: string;
  degree: string;
  school: string;
  description?: string;
}

const experiences: ExperienceItem[] = [
  {
    date: "Sept 2024 - Aujourd'hui",
    title: "IT Analyst",
    company: "Ubisoft",
    // description: "En alternance dans le cadre du Master Développement, Big Data et IA."
  },
  {
    date: "Oct 2023 - Août 2024",
    title: "Business Analyst",
    company: "LCL"
  },
  {
    date: "Sept 2021 - Sept 2023",
    title: "Chef de Projets SI",
    company: "EDF",
    // description: "En alternance dans le cadre du Master Management & Transformation Digitale."
  }
];

const education: EducationItem[] = [
  {
    date: "Sept 2024 - Sept 2026",
    degree: "Master Développement, Big Data et IA",
    school: "IPSSI",
    // description: "En cours, effectué en alternance chez Ubisoft."
  },
  {
    date: "Août 2024",
    degree: "Concepteur et développeur en science des données",
    school: "Jedha",
  },
  {
    date: "Sept 2021 - Sept 2023",
    degree: "Master Management & Transformation Digitale",
    school: "Université Paris-Est Créteil",
    // description: "Effectué en alternance chez EDF."
  }
];

const Parcours: React.FC = () => {
  return (
    <section id="parcours" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Expériences Professionnelles</h3>
            {experiences.map((exp, index) => (
              <BoxReveal key={index} width="100%" duration={0.5}>
                <div className="mb-8 transform-gpu">
                  <motion.div 
                    className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300"
                    whileHover={{ 
                      scale: 1.03,
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      zIndex: 10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <p className="text-sm text-gray-700 font-medium">{exp.date}</p>
                    <h4 className="text-xl font-semibold text-gray-900 mt-1">{exp.title}</h4>
                    <p className="text-gray-800 font-medium">{exp.company}</p>
                    {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
                  </motion.div>
                </div>
              </BoxReveal>
            ))}
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Formations</h3>
            {education.map((edu, index) => (
              <BoxReveal key={index} width="100%" duration={0.5}>
                <div className="mb-8 transform-gpu">
                  <motion.div 
                    className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300"
                    whileHover={{ 
                      scale: 1.03,
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      zIndex: 10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <p className="text-sm text-gray-700 font-medium">{edu.date}</p>
                    <h4 className="text-xl font-semibold text-gray-900 mt-1">{edu.degree}</h4>
                    <p className="text-gray-800 font-medium">{edu.school}</p>
                    {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                  </motion.div>
                </div>
              </BoxReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
  
  export default Parcours;