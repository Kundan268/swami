'use client';

import { Language } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  language: Language;
}

export function Header({ language }: HeaderProps) {
  const headerContent = {
    en: {
      title: '||  Shree Swami Samarth  ||'
    },
    mr: {
      title: '|| श्री स्वामी समर्थ ||'
    }
  };

  const content = headerContent[language];

  return (
    <div className="relative border-b border-orange-200 overflow-hidden min-h-[320px] md:min-h-[380px] lg:min-h-[480px] xl:min-h-[55vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/data/IMG-20250918-WA0001.jpg"
          alt="Sacred Background"
          fill
          className="object-cover object-right md:object-[45%_45%]"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 min-h-[320px] md:min-h-[380px] lg:min-h-[480px] xl:min-h-[55vh] flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-full opacity-20 blur-sm"></div>
              <div className="relative bg-white p-2 rounded-full shadow-lg">
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-orange-200">
                  <Image
                    src="/data/shri-swami-samarth.jpg"
                    alt="Shri Swami Samarth"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Decorative Elements */}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="space-y-4">
              {/* Main Title */}
              <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 gradient-text py-4 drop-shadow-lg">
                {content.title}
              </h1>

              {/* Decorative Line */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="h-px bg-gradient-to-r from-orange-200 to-transparent w-16"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full shadow-md"></div>
                <div className="h-px bg-gradient-to-l from-orange-200 to-transparent w-16"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Border */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-orange-200 rounded-full opacity-80 shadow-md"></div>
            <div className="w-2 h-2 bg-amber-200 rounded-full opacity-80 shadow-md"></div>
            <div className="w-3 h-3 bg-yellow-200 rounded-full opacity-80 shadow-md"></div>
            <div className="w-2 h-2 bg-orange-200 rounded-full opacity-80 shadow-md"></div>
            <div className="w-3 h-3 bg-amber-200 rounded-full opacity-80 shadow-md"></div>
          </div>
        </div>

        {/* Manogat button */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/manogat"
            className="inline-block px-6 py-2.5 rounded-lg bg-orange-200/90 hover:bg-orange-300/90 text-orange-900 font-semibold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 border border-orange-300/80"
          >
            {language === 'mr' ? 'मनोगत' : 'Manogat'}
          </Link>
        </div>
      </div>
    </div>
  );
}
