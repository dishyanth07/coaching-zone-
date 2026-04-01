import React from 'react';
import { BookOpen, Users, Clock, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Courses = () => {
  const { courses } = useApp();

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-manrope font-bold mb-3">Empower every student's potential</h2>
        <p className="text-[#414754] leading-relaxed">
          Browse through our specialized coaching modules designed for cognitive development and linguistic mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="premium-card group hover:bg-primary transition-all duration-500">
            <div className="w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-primary group-hover:text-white mb-6 transition-colors">
              <BookOpen size={24} />
            </div>
            
            <h3 className="font-manrope font-bold text-xl mb-4 group-hover:text-white transition-colors">{course.name}</h3>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-[#414754] group-hover:text-white/80 transition-colors">
                <Users size={16} />
                <span>{course.students} Registered Students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#414754] group-hover:text-white/80 transition-colors">
                <Clock size={16} />
                <span>{course.timing}</span>
              </div>
            </div>
            
            <button className="flex items-center gap-2 text-primary group-hover:text-white font-bold text-sm tracking-wide group-hover:translate-x-1 transition-all">
              VIEW DETAILS <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="premium-card bg-secondary/10 border-none p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-secondary font-manrope font-bold text-2xl mb-2">Course Demand Growth</h3>
          <p className="text-[#414754]">
            Phonics and Abacus enrollment has increased by <span className="font-bold text-secondary">25%</span> this quarter. 
            Consider adding evening slots for working parents.
          </p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl shadow-premium text-center min-w-[180px]">
          <p className="text-xs uppercase tracking-widest text-surface-dim font-bold mb-1">Top Performing</p>
          <p className="font-manrope font-bold text-primary">English Phonics</p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
